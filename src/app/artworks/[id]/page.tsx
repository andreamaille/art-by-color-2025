import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import ArtworkCard from "@/app/components/ArtworkGrid/ArtworkCard";
import BackLink from "@/app/components/BackLink";
import { buttonClass } from "@/app/components/Button/styles";
import Eyebrow from "@/app/components/Eyebrow";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Headline from "@/app/components/Headline";
import PaletteInUse from "@/app/components/PaletteInUse";
import PaletteSection from "@/app/components/PaletteSection";
import WallLabel from "@/app/components/WallLabel";
import { hslToHex } from "@/app/lib/color";
import { DEFAULT_MEDIA } from "@/app/lib/filters";
import { fetchPalette } from "@/app/lib/palette";
import { buildTheme } from "@/app/lib/paletteRoles";
import { htmlToText } from "@/app/lib/text";
import { fetchArtwork } from "@/app/loaders/fetchArtwork";
import { fetchArtworks } from "@/app/loaders/fetchArtworks";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const artwork = await fetchArtwork((await params).id);
  if (!artwork) return { title: "Work not found · Art by Color" };
  return {
    title: `${artwork.title} · Art by Color`,
    description: summary(artwork),
  };
}

/** The short description, or the first paragraph of the long one. */
function summary(artwork: {
  short_description: string | null;
  description: string | null;
}) {
  const text = htmlToText(
    artwork.short_description ?? artwork.description ?? "",
  );
  return text.split("\n\n")[0] || undefined;
}

/** Long titles get a smaller headline so they stay readable. */
function titleSize(title: string) {
  if (title.length > 40) return "text-[clamp(32px,4vw,56px)]";
  if (title.length > 24) return "text-[clamp(40px,5.5vw,80px)]";
  return "text-[clamp(48px,8vw,104px)]";
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = await fetchArtwork(id);
  if (!artwork) notFound();

  const showImage = artwork.is_public_domain && artwork.image_id;
  const museumUrl = `https://www.artic.edu/artworks/${artwork.id}`;
  const description = summary(artwork);
  const eyebrow = [artwork.artist_title, artwork.date_display]
    .filter(Boolean)
    .join(" · ");

  // The page takes the art's own colors. If the palette can't be read, the
  // page keeps the site theme and skips the palette section.
  const palette =
    showImage && artwork.image_id
      ? await fetchPalette(artwork.image_id).catch(() => null)
      : null;
  const theme = palette ? buildTheme(palette) : null;

  // Works in a similar key: around this work's dominant color, minus itself.
  const similar = artwork.color
    ? (
        await fetchArtworks(
          {
            color: {
              name: "",
              hex: hslToHex(artwork.color.h, artwork.color.s, artwork.color.l),
            },
            media: DEFAULT_MEDIA,
          },
          1,
          4,
        )
      ).artworks
        .filter((a) => a.id !== artwork.id)
        .slice(0, 3)
    : [];

  return (
    <div
      className="min-h-screen bg-wall text-ink"
      style={theme?.vars as CSSProperties | undefined}
    >
      <div className="mx-auto max-w-[1376px] px-4 md:px-8">
        <Header>
          <BackLink />
        </Header>
        <main>
          <section className="flex flex-wrap items-center gap-x-[72px] gap-y-12 pt-12 pb-16 md:pt-[72px] md:pb-24">
            <figure className="m-0 flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
              {showImage && artwork.thumbnail ? (
                <>
                  <Image
                    src={`/api/image/${artwork.image_id}?w=843`}
                    alt={
                      artwork.thumbnail.alt_text ??
                      `${artwork.title}${artwork.artist_title ? ` by ${artwork.artist_title}` : ""}`
                    }
                    width={artwork.thumbnail.width}
                    height={artwork.thumbnail.height}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    unoptimized
                    priority
                    className="block h-auto w-full"
                  />
                  <figcaption className="text-[13px] text-graphite">
                    Image courtesy of the Art Institute of Chicago, public
                    domain
                  </figcaption>
                </>
              ) : (
                <p className="m-0 border border-hairline p-8 text-sm leading-normal text-graphite">
                  This image isn't available to show here.{" "}
                  <a href={museumUrl}>See it at the museum</a>.
                </p>
              )}
            </figure>

            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <h1
                className={`m-0 text-balance break-words font-display leading-[0.95] font-normal tracking-[-1px] md:tracking-[-2px] ${titleSize(artwork.title)}`}
              >
                <Headline title={artwork.title} />
              </h1>
              {description && (
                <p className="m-0 max-w-[520px] text-lg leading-[1.6]">
                  {description}
                </p>
              )}
              <WallLabel
                rows={[
                  { label: "Medium", value: artwork.medium_display },
                  { label: "Origin", value: artwork.place_of_origin },
                  {
                    label: "Credit",
                    value: artwork.credit_line && (
                      <>
                        {artwork.credit_line}.{" "}
                        <a href={museumUrl}>Art Institute of Chicago</a>
                      </>
                    ),
                  },
                ]}
              />
              <div>
                <a href={museumUrl} className={buttonClass("feature")}>
                  View at the museum
                </a>
              </div>
            </div>
          </section>

          {theme && palette && (
            <PaletteSection
              swatches={palette.map((c) => ({
                hex: c.hex,
                role: theme.roles.find((r) => r.hex === c.hex)?.role ?? "",
              }))}
            />
          )}

          {theme && (
            <PaletteInUse
              title={artwork.title}
              artist={artwork.artist_title}
              roles={theme.roles}
            />
          )}

          {similar.length > 0 && (
            <section
              aria-labelledby="similar"
              className="flex flex-col gap-10 border-t border-ink pt-8 pb-16"
            >
              <h2
                id="similar"
                className="m-0 font-display text-[40px] leading-[1.05] font-normal"
              >
                Works in a <em>similar key</em>
              </h2>
              <div className="grid grid-cols-2 items-start gap-x-6 md:grid-cols-3 md:gap-x-10">
                {similar.map((work) => (
                  <ArtworkCard key={work.id} artwork={work} />
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
