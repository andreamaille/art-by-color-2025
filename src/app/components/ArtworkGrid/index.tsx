import Button from "@/app/components/Button";
import { sampleArtworks } from "@/app/data/sampleArtworks";
import ArtworkCard from "./ArtworkCard";

const ArtworkGrid = () => (
  <section
    aria-label="Results"
    className="flex min-w-0 flex-[999_1_640px] flex-col gap-6 pt-[34px]"
  >
    <div className="columns-2 gap-x-6 md:columns-[220px_3] md:gap-x-8">
      {sampleArtworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
    <div className="flex justify-center pb-16">
      <Button>Show more works</Button>
    </div>
  </section>
);

export default ArtworkGrid;
