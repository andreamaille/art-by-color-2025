import { pigments } from "@/app/data/pigments";

export interface ColorSelection {
  /** Pigment slug when the selection is a named pigment. */
  slug?: string;
  name: string;
  hex: string;
}

type Range = [min: number, max: number];

/** What to ask the API for. Hue is in degrees (0-360); s and l are percent. */
export interface ColorWindow {
  /** Omitted for greys, blacks and whites, where hue is meaningless. */
  hue?: Range;
  s: Range;
  l: Range;
  /** The ideal match inside the window; results closer to it rank higher. */
  center: { hue?: number; l: number };
}

const HUE_RADIUS = 15;

export function normalizeHex(input: string): string | null {
  const raw = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(raw)) {
    return raw
      .split("")
      .map((c) => c + c)
      .join("")
      .toUpperCase();
  }
  return /^[0-9a-f]{6}$/i.test(raw) ? raw.toUpperCase() : null;
}

/** Returns h in 0-360, s and l in 0-100, matching the API's `color` field. */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l: l * 100 };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: s * 100, l: l * 100 };
}

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

// Pigments where plain "hue +/- 15" would be wrong: no real hue, or brown,
// which is dark orange. Everything else uses its own hue.
const windowOverrides: Record<string, ColorWindow> = {
  "ivory-black": { s: [0, 100], l: [0, 20], center: { l: 8 } },
  "titanium-white": { s: [0, 100], l: [88, 100], center: { l: 96 } },
  "paynes-grey": { s: [0, 20], l: [25, 60], center: { l: 40 } },
  "burnt-sienna": {
    hue: [10, 30],
    s: [30, 100],
    l: [15, 45],
    center: { hue: 20, l: 30 },
  },
};

export function colorWindow(selection: ColorSelection): ColorWindow {
  const override = selection.slug && windowOverrides[selection.slug];
  if (override) return override;

  const { h, s, l } = hexToHsl(selection.hex);
  if (s < 15) {
    // A typed grey: match on lightness only.
    return { s: [0, 20], l: [clamp(l - 12), clamp(l + 12)], center: { l } };
  }
  return {
    hue: [h - HUE_RADIUS, h + HUE_RADIUS],
    s: [25, 100],
    l: [clamp(l - 30), clamp(l + 30)],
    center: { hue: h, l },
  };
}

/** Resolves the `?color=` URL param: a pigment slug, or a 3 or 6 digit hex. */
export function parseColorParam(
  value: string | undefined,
): ColorSelection | undefined {
  if (!value) return undefined;
  const pigment = pigments.find((p) => p.slug === value);
  if (pigment) {
    return {
      slug: pigment.slug,
      name: pigment.name,
      hex: pigment.hex.slice(1),
    };
  }
  const hex = normalizeHex(value);
  return hex ? { name: `#${hex}`, hex } : undefined;
}
