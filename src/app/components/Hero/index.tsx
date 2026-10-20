import Image from "next/image";
import Eyebrow from "@/app/components/Eyebrow";

// Static sample from the design mock-up; not driven by the API.
const paletteOfTheDay = {
  src: "/images/machu-picchu-morning-light.jpg",
  alt: "Peru – Machu Picchu, Morning Light by Georgia O'Keeffe",
  title: "Peru – Machu Picchu, Morning Light",
  meta: "Georgia O'Keeffe, 1957",
  palette: ["#13341F", "#2E5398", "#809FCD", "#B5AD2C", "#E9F4EA"],
};

const Hero = () => (
  <section className="flex flex-wrap items-end gap-x-16 gap-y-12 pt-14 pb-12 md:pt-22 md:pb-18">
    <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-8">
      <Eyebrow>The Art Institute of Chicago, by color</Eyebrow>
      <h1 className="m-0 text-balance font-display text-[clamp(48px,9vw,112px)] leading-[0.92] font-normal tracking-[-1px] md:tracking-[-2px]">
        Find the <em>palette</em> hiding in a painting.
      </h1>
      <p className="m-0 max-w-[560px] text-lg leading-[1.6] text-graphite">
        Pick a pigment or paste a hex code. We find works in the collection
        built from that color, then pull a five-color palette from each one for
        you to copy.
      </p>
    </div>

    <figure className="m-0 flex max-w-[340px] flex-[1_1_280px] flex-col gap-3">
      <Eyebrow>Palette of the day</Eyebrow>
      <Image
        src={paletteOfTheDay.src}
        alt={paletteOfTheDay.alt}
        width={384}
        height={527}
        priority
        className="block h-auto w-full"
      />
      <span className="flex h-2.5 w-full" aria-hidden="true">
        {paletteOfTheDay.palette.map((color) => (
          <span key={color} className="flex-1" style={{ background: color }} />
        ))}
      </span>
      <figcaption className="text-[13px] leading-[1.45] text-graphite">
        <span className="font-display text-[17px] text-ink">
          {paletteOfTheDay.title}
        </span>
        <br />
        {paletteOfTheDay.meta}
      </figcaption>
    </figure>
  </section>
);

export default Hero;
