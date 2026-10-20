import ArtworkGrid from "@/app/components/ArtworkGrid";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import IndexSidebar from "@/app/components/IndexSidebar";
import { parseFilters, toQueryString } from "@/app/lib/filters";
import { fetchArtworks } from "@/app/loaders/fetchArtworks";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = parseFilters(await searchParams);
  const query = toQueryString(filters);
  const { artworks, hasMore } = await fetchArtworks(filters);

  return (
    <div className="mx-auto max-w-[1376px] px-4 md:px-8">
      <Header />
      <main>
        <Hero />
        <div className="flex flex-wrap gap-x-16 gap-y-12 border-t border-ink pt-8">
          <IndexSidebar filters={filters} />
          <ArtworkGrid
            key={query}
            initialArtworks={artworks}
            initialHasMore={hasMore}
            query={query}
          />
        </div>
      </main>
      <footer className="flex flex-wrap justify-between gap-4 border-t border-ink pt-7 pb-10 text-[13px] text-graphite">
        <span className="font-display text-xl text-ink">
          Art by <em>Color</em>
        </span>
        <span>
          Images and data from the{" "}
          <a href="https://www.artic.edu">Art Institute of Chicago</a> API. Made
          by andrea_codes.
        </span>
      </footer>
    </div>
  );
}
