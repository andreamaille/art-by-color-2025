import { type ColorSelection, parseColorParam } from "@/app/lib/color";

/** The mediums we search by default, as the API's `artwork_type_title` values. */
export const MEDIA = [
  { slug: "painting", label: "Painting", type: "Painting" },
  {
    slug: "miniature-painting",
    label: "Miniature painting",
    type: "Miniature Painting",
  },
  { slug: "print", label: "Print", type: "Print" },
  {
    slug: "drawing-and-watercolor",
    label: "Drawing and watercolor",
    type: "Drawing and Watercolor",
  },
  { slug: "photograph", label: "Photograph", type: "Photograph" },
] as const;

export type MediumSlug = (typeof MEDIA)[number]["slug"];

/** What the gallery shows until someone picks otherwise. */
export const DEFAULT_MEDIA: MediumSlug[] = ["painting", "miniature-painting"];

export interface Filters {
  color?: ColorSelection;
  /** Never empty. DEFAULT_MEDIA unless changed. */
  media: MediumSlug[];
  from?: number;
  to?: number;
  place?: string;
  q?: string;
}

type Params = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

function parseYear(value: string | undefined): number | undefined {
  if (!value || !/^-?\d{1,4}$/.test(value)) return undefined;
  const year = Number(value);
  return year >= -3000 && year <= 2100 ? year : undefined;
}

const clean = (value: string | undefined, max: number) =>
  value?.trim().slice(0, max) || undefined;

export function parseFilters(params: Params): Filters {
  const requested = (first(params.medium) ?? "").split(",");
  const media = MEDIA.filter((m) => requested.includes(m.slug)).map(
    (m) => m.slug,
  );

  let from = parseYear(first(params.from));
  let to = parseYear(first(params.to));
  if (from !== undefined && to !== undefined && from > to)
    [from, to] = [to, from];

  return {
    color: parseColorParam(first(params.color)),
    media: media.length > 0 ? media : DEFAULT_MEDIA,
    from,
    to,
    place: clean(first(params.place), 60),
    q: clean(first(params.q), 100),
  };
}

/** Everything at its default is left out, so the home page stays at "/". */
export function toQueryString(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.color)
    params.set("color", filters.color.slug ?? filters.color.hex);
  const isDefault =
    filters.media.length === DEFAULT_MEDIA.length &&
    DEFAULT_MEDIA.every((m) => filters.media.includes(m));
  if (!isDefault) {
    params.set("medium", filters.media.join(","));
  }
  if (filters.from !== undefined) params.set("from", String(filters.from));
  if (filters.to !== undefined) params.set("to", String(filters.to));
  if (filters.place) params.set("place", filters.place);
  if (filters.q) params.set("q", filters.q);
  return params.toString();
}

export function parseQueryString(query: string): Filters {
  return parseFilters(Object.fromEntries(new URLSearchParams(query)));
}
