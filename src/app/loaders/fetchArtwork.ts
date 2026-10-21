export interface ArtworkDetails {
  id: number;
  title: string;
  artist_title: string | null;
  date_display: string | null;
  medium_display: string | null;
  place_of_origin: string | null;
  credit_line: string | null;
  description: string | null;
  short_description: string | null;
  image_id: string | null;
  is_public_domain: boolean;
  thumbnail: { alt_text: string | null; width: number; height: number } | null;
  color: { h: number; s: number; l: number; percentage: number } | null;
}

const FIELDS = [
  "id",
  "title",
  "artist_title",
  "date_display",
  "medium_display",
  "place_of_origin",
  "credit_line",
  "description",
  "short_description",
  "image_id",
  "is_public_domain",
  "thumbnail",
  "color",
];

/** Returns null when the work doesn't exist. */
export async function fetchArtwork(id: string): Promise<ArtworkDetails | null> {
  if (!/^\d+$/.test(id)) return null;

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=${FIELDS.join(",")}`,
    {
      headers: { "AIC-User-Agent": "art-by-color (andrea.maille@gmail.com)" },
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Art Institute API returned ${response.status}`);
  }

  return (await response.json()).data;
}
