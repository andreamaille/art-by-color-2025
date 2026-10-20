import Image from "next/image";
import Link from "next/link";
import type { SampleArtwork } from "@/app/data/sampleArtworks";

const ArtworkCard = ({ artwork }: { artwork: SampleArtwork }) => (
  <Link
    href="/artwork-details"
    className="mb-14 flex break-inside-avoid flex-col text-ink no-underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-focus [&:hover_h3]:underline [&:hover_h3]:decoration-1 [&:hover_h3]:underline-offset-4"
  >
    <Image
      src={artwork.src}
      alt={`${artwork.title} by ${artwork.artist}`}
      width={artwork.width}
      height={artwork.height}
      sizes="(min-width: 1024px) 300px, 50vw"
      className="block h-auto w-full"
    />
    <span
      role="img"
      aria-label="Palette"
      className="mt-1 grid grid-cols-5 gap-1"
    >
      {artwork.palette.map((color) => (
        <span
          key={color}
          className="h-6 md:h-9"
          style={{ background: color }}
        />
      ))}
    </span>
    <h3 className="m-0 mt-4 font-display text-xl leading-[1.25] font-normal">
      {artwork.title}
    </h3>
    <span className="mt-1.5 text-[13px] leading-[1.45] text-graphite">
      {artwork.artist}, {artwork.date}
    </span>
  </Link>
);

export default ArtworkCard;
