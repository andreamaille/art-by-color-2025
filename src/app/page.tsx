import ArtworkGrid from "@/app/components/ArtworkGrid";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import IndexSidebar from "@/app/components/IndexSidebar";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1376px] px-4 md:px-8">
      <Header />
      <main>
        <Hero />
        <div className="flex flex-wrap gap-x-16 gap-y-12 border-t border-ink pt-8">
          <IndexSidebar />
          <ArtworkGrid />
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
