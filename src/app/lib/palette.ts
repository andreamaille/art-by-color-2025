import sharp from "sharp";

export interface PaletteColor {
  /** Uppercase, no leading "#". */
  hex: string;
  /** Fraction of the image (0-1) this color stands for. */
  share: number;
}

const PALETTE_SIZE = 5;
const SAMPLE_SIZE = 80;
const ITERATIONS = 25;

type Lab = [l: number, a: number, b: number];

// Clustering happens in Lab, where distance roughly matches how different two
// colors look. In RGB, k-means over-weights greens and under-weights dark tones.
const toLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

function rgbToLab(r: number, g: number, b: number): Lab {
  const [R, G, B] = [toLinear(r), toLinear(g), toLinear(b)];
  const x = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047;
  const y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function labToHex([L, a, b]: Lab): string {
  const y = (L + 16) / 116;
  const f = (t: number) =>
    t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787;
  const x = f(a / 500 + y) * 0.95047;
  const z = f(y - b / 200) * 1.08883;
  const yy = f(y);
  const linear = [
    3.2406 * x - 1.5372 * yy - 0.4986 * z,
    -0.9689 * x + 1.8758 * yy + 0.0415 * z,
    0.0557 * x - 0.204 * yy + 1.057 * z,
  ];
  return linear
    .map((c) => {
      const v = Math.max(0, Math.min(1, c));
      const s = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
      return Math.round(s * 255)
        .toString(16)
        .padStart(2, "0");
    })
    .join("")
    .toUpperCase();
}

const distance = (p: Lab, q: Lab) =>
  Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);

/**
 * Plain k-means. Seeds are picked farthest-first (not at random) so the result
 * is the same every time and small vivid accents still get their own cluster.
 */
function kmeans(points: Lab[], k: number): { center: Lab; count: number }[] {
  const centers: Lab[] = [points[0]];
  while (centers.length < k) {
    let best = points[0];
    let bestDistance = -1;
    for (const p of points) {
      const d = Math.min(...centers.map((c) => distance(p, c)));
      if (d > bestDistance) {
        bestDistance = d;
        best = p;
      }
    }
    if (bestDistance === 0) break; // fewer distinct colors than clusters
    centers.push(best);
  }

  const assignment = new Array<number>(points.length).fill(0);
  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    points.forEach((p, i) => {
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      centers.forEach((c, j) => {
        const d = distance(p, c);
        if (d < nearestDistance) {
          nearestDistance = d;
          nearest = j;
        }
      });
      assignment[i] = nearest;
    });
    const sums = centers.map(() => [0, 0, 0, 0]);
    points.forEach((p, i) => {
      const s = sums[assignment[i]];
      s[0] += p[0];
      s[1] += p[1];
      s[2] += p[2];
      s[3] += 1;
    });
    sums.forEach((s, j) => {
      if (s[3] > 0) centers[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]];
    });
  }

  const counts = centers.map(() => 0);
  for (const a of assignment) counts[a] += 1;
  return centers.map((center, j) => ({ center, count: counts[j] }));
}

/** Five dominant colors from an encoded image, most covered first. */
export async function extractPalette(image: Buffer): Promise<PaletteColor[]> {
  const { data } = await sharp(image)
    .resize({ width: SAMPLE_SIZE, height: SAMPLE_SIZE, fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const points: Lab[] = [];
  for (let i = 0; i < data.length; i += 3) {
    points.push(rgbToLab(data[i], data[i + 1], data[i + 2]));
  }
  if (points.length === 0) return [];

  return kmeans(points, PALETTE_SIZE)
    .filter((cluster) => cluster.count > 0)
    .map(({ center, count }) => ({
      hex: labToHex(center),
      share: count / points.length,
    }))
    .sort((a, b) => b.share - a.share);
}

const cache = new Map<string, Promise<PaletteColor[]>>();

/**
 * Palette for an Art Institute work, from its IIIF image. Results are kept in
 * memory per image id; a failure isn't cached, so it can be retried.
 */
export function fetchPalette(imageId: string): Promise<PaletteColor[]> {
  const cached = cache.get(imageId);
  if (cached) return cached;

  const pending = (async () => {
    const response = await fetch(
      `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`,
      {
        headers: { "AIC-User-Agent": "art-by-color (andrea.maille@gmail.com)" },
        next: { revalidate: 60 * 60 * 24 * 30 },
      },
    );
    if (!response.ok) {
      throw new Error(`Art Institute image returned ${response.status}`);
    }
    return extractPalette(Buffer.from(await response.arrayBuffer()));
  })();

  cache.set(imageId, pending);
  pending.catch(() => cache.delete(imageId));
  return pending;
}
