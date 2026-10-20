"use client";

import { useState, useTransition } from "react";
import { loadMoreArtworks } from "@/app/actions/loadMoreArtworks";
import Button from "@/app/components/Button";
import type { Artwork } from "@/app/loaders/fetchArtworks";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  initialArtworks: Artwork[];
  initialHasMore: boolean;
  /** The page's query string, used to ask for the next page. */
  query: string;
}

// Render with key={query} so a new color starts again from page 1.
const ArtworkGrid = ({
  initialArtworks,
  initialHasMore,
  query,
}: ArtworkGridProps) => {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  const showMore = () => {
    setFailed(false);
    startTransition(async () => {
      try {
        const next = await loadMoreArtworks(query, page + 1);
        setArtworks((current) => {
          const seen = new Set(current.map((a) => a.id));
          return [...current, ...next.artworks.filter((a) => !seen.has(a.id))];
        });
        setHasMore(next.hasMore);
        setPage(page + 1);
      } catch {
        setFailed(true);
      }
    });
  };

  return (
    <section
      aria-label="Results"
      className="flex min-w-0 flex-[999_1_640px] flex-col gap-6 pt-[34px]"
    >
      {artworks.length === 0 ? (
        <p className="m-0 max-w-[65ch] text-lg leading-[1.6] text-graphite">
          No works match those filters. Try widening them or clearing all.
        </p>
      ) : (
        <div className="columns-2 gap-x-6 md:columns-[220px_3] md:gap-x-8">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
      <p role="status" className="sr-only">
        {artworks.length > 0 && `Showing ${artworks.length} works`}
      </p>
      {failed && (
        <p role="alert" className="m-0 text-center text-sm text-graphite">
          We couldn't load more works. Try again.
        </p>
      )}
      {hasMore && (
        <div className="flex justify-center pb-16">
          <Button onClick={showMore} disabled={pending} aria-busy={pending}>
            {pending ? "Loading…" : "Show more works"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default ArtworkGrid;
