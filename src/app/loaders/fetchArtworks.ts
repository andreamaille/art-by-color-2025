import { colorWindow } from "@/app/lib/color";
import { type Filters, MEDIA } from "@/app/lib/filters";
import { fetchPalette } from "@/app/lib/palette";

export interface Artwork {
  id: number;
  title: string;
  artist_title: string | null;
  date_display: string;
  image_id: string;
  thumbnail: { alt_text: string | null; width: number; height: number };
  /** Null for works the API has not analyzed. */
  color: { h: number; s: number; l: number; percentage: number } | null;
  /** Five hex colors (no "#"), or null if the image couldn't be read. */
  palette: string[] | null;
}

type ArtworkRecord = Omit<Artwork, "palette">;

export const PAGE_SIZE = 24;
// Images are fetched a few at a time, to be kind to the museum's image server.
const PALETTE_CONCURRENCY = 6;

/** Adds each work's palette. One that can't be read just has none; the card falls back. */
async function withPalettes(records: ArtworkRecord[]): Promise<Artwork[]> {
  const artworks: Artwork[] = records.map((r) => ({ ...r, palette: null }));
  let next = 0;
  const worker = async () => {
    while (next < artworks.length) {
      const artwork = artworks[next++];
      artwork.palette = await fetchPalette(artwork.image_id)
        .then((colors) => colors.map((c) => c.hex))
        .catch(() => null);
    }
  };
  await Promise.all(Array.from({ length: PALETTE_CONCURRENCY }, worker));
  return artworks;
}

const FIELDS = [
  "id",
  "title",
  "artist_title",
  "date_display",
  "image_id",
  "thumbnail",
  "color",
];

const range = (field: string, [min, max]: [number, number]) => ({
  range: { [field]: { gte: min, lte: max } },
});

/** Hue is a circle, so a window like -15 to 15 becomes 345-360 plus 0-15. */
function hueFilter([min, max]: [number, number]) {
  if (min >= 0 && max <= 360) return range("color.h", [min, max]);
  return {
    bool: {
      should: [
        range("color.h", [min < 0 ? min + 360 : min, 360]),
        range("color.h", [0, max > 360 ? max - 360 : max]),
      ],
      minimum_should_match: 1,
    },
  };
}

/** Score by closeness to the ideal value; hue is circular, so also try +/-360. */
function closeness(
  field: string,
  origin: number,
  scale: number,
  wrap: boolean,
) {
  const origins = wrap ? [origin, origin + 360, origin - 360] : [origin];
  return origins.map((o) => ({
    gauss: { [field]: { origin: o, scale, decay: 0.5 } },
  }));
}

export async function fetchArtworks(
  filters: Filters,
  page = 1,
  limit = PAGE_SIZE,
): Promise<{ artworks: Artwork[]; hasMore: boolean }> {
  const types = MEDIA.filter((m) => filters.media.includes(m.slug)).map(
    (m) => m.type,
  );
  const filter: object[] = [
    { term: { is_public_domain: true } },
    { exists: { field: "image_id" } },
    { terms: { "artwork_type_title.keyword": types } },
  ];
  const must: object[] = [];

  if (filters.from !== undefined) {
    filter.push({ range: { date_start: { gte: filters.from } } });
  }
  if (filters.to !== undefined) {
    filter.push({ range: { date_end: { lte: filters.to } } });
  }
  if (filters.place) {
    filter.push({ match_phrase: { place_of_origin: filters.place } });
  }
  if (filters.q) {
    must.push({
      multi_match: {
        query: filters.q,
        fields: ["title^2", "artist_title^2", "artist_display"],
      },
    });
  }

  let functions: object[] = [];
  if (filters.color) {
    const window = colorWindow(filters.color);
    if (window.hue) filter.push(hueFilter(window.hue));
    filter.push(range("color.s", window.s), range("color.l", window.l));

    // Rank by relevance: closest to the picked color first.
    const { hue, l } = window.center;
    functions =
      hue === undefined
        ? closeness("color.l", l, 8, false)
        : closeness("color.h", hue, 8, true);
  }

  const bool = { bool: { filter, must } };
  // Multiplying keeps text relevance (artist or title) in play alongside color.
  const query =
    functions.length > 0
      ? {
          function_score: {
            query: bool,
            functions,
            score_mode: "max",
            boost_mode: "multiply",
          },
        }
      : bool;

  const response = await fetch("https://api.artic.edu/api/v1/artworks/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "AIC-User-Agent": "art-by-color (andrea.maille@gmail.com)",
    },
    body: JSON.stringify({ query, fields: FIELDS, limit, page }),
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Art Institute API returned ${response.status}`);
  }

  const result = await response.json();
  return {
    artworks: await withPalettes(result.data),
    hasMore: result.pagination.current_page < result.pagination.total_pages,
  };
}
