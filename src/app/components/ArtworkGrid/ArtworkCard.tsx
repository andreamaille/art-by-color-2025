import Image from "next/image";
import Link from "next/link";
import PaletteStrip from "@/app/components/PaletteStrip";
import { luminance } from "@/app/lib/colorFormats";
import type { Artwork } from "@/app/loaders/fetchArtworks";

const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  // Dark to light, like the mock-up. If the palette couldn't be read, fall back
  // to the API's single dominant color.
  const swatches = artwork.palette
    ? [...artwork.palette]
        .sort((a, b) => luminance(a) - luminance(b))
        .map((hex) => `#${hex}`)
    : artwork.color
      ? [`hsl(${artwork.color.h} ${artwork.color.s}% ${artwork.color.l}%)`]
      : [];
  const meta = [artwork.artist_title, artwork.date_display]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/artworks/${artwork.id}`}
      className="mb-14 flex break-inside-avoid flex-col text-ink no-underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-focus [&:hover_h3]:underline [&:hover_h3]:decoration-1 [&:hover_h3]:underline-offset-4"
    >
      <Image
        src={`/api/image/${artwork.image_id}?w=400`}
        alt={
          artwork.artist_title
            ? `${artwork.title} by ${artwork.artist_title}`
            : artwork.title
        }
        width={artwork.thumbnail.width}
        height={artwork.thumbnail.height}
        sizes="(min-width: 1024px) 300px, 50vw"
        unoptimized
        className="block h-auto w-full"
      />
      {swatches.length > 0 && <PaletteStrip colors={swatches} />}
      <h3 className="m-0 mt-4 font-display text-xl leading-[1.25] font-normal">
        {artwork.title}
      </h3>
      <span className="mt-1.5 text-[13px] leading-[1.45] text-graphite">
        {meta}
      </span>
    </Link>
  );
};

export default ArtworkCard;
