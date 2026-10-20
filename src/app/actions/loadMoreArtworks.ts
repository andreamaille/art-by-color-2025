"use server";

import { parseQueryString } from "@/app/lib/filters";
import { fetchArtworks } from "@/app/loaders/fetchArtworks";

// Takes the page's raw query string (not a parsed object) and re-validates it here.
export async function loadMoreArtworks(query: string, page: number) {
  return fetchArtworks(parseQueryString(query), Math.max(1, page));
}
