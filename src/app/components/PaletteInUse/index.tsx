import Eyebrow from "@/app/components/Eyebrow";
import Headline from "@/app/components/Headline";
import { contrastRatio } from "@/app/lib/colorFormats";
import type { RoledColor } from "@/app/lib/paletteRoles";

interface PaletteInUseProps {
  title: string;
  artist: string | null;
  roles: RoledColor[];
}

/** WCAG 2.2 thresholds, in words a designer can act on. */
function verdict(ratio: number) {
  if (ratio >= 7) return "Body text, AAA";
  if (ratio >= 4.5) return "Body text, AA";
  if (ratio >= 3) return "Large text and shapes";
  return "Decoration only";
}

// Sizes inside the example cards use container units (cqw) so each one scales
// with its card, from a phone-width slide to a desktop column.
const PAPER = "FFFFFF";
const INK = "141413";

const card = "@container relative aspect-[3/4] overflow-hidden";

const PaletteInUse = ({ title, artist, roles }: PaletteInUseProps) => {
  const hex = (role: string) => roles.find((r) => r.role === role)?.hex;
  const ground = hex("Ground") ?? "000000";
  const text = hex("Text") ?? "FFFFFF";
  const feature = hex("Feature") ?? text;
  const support1 = hex("Support 1");
  const support2 = hex("Support 2");

  // Text on an example background: Text or Ground if either reads at 4.5:1.
  // If neither does, fall back to paper or ink, as the design system says.
  const readableOn = (background: string) => {
    const options = [text, ground, PAPER, INK];
    return (
      options.slice(0, 2).find((c) => contrastRatio(c, background) >= 4.5) ??
      options
        .slice(2)
        .reduce((best, c) =>
          contrastRatio(c, background) > contrastRatio(best, background)
            ? c
            : best,
        )
    );
  };

  const posterGround = support1 ?? ground;
  const posterText = readableOn(posterGround);
  const landingButton = support1 ?? feature;

  const pairs = [
    { name: "Text on Ground", fg: text, bg: ground },
    { name: "Ground on Feature", fg: ground, bg: feature },
    ...(support1
      ? [
          { name: "Text on Support 1", fg: text, bg: support1 },
          { name: "Feature on Support 1", fg: feature, bg: support1 },
        ]
      : []),
    ...(support2
      ? [{ name: "Support 2 on Ground", fg: support2, bg: ground }]
      : []),
  ].map((pair) => ({ ...pair, ratio: contrastRatio(pair.fg, pair.bg) }));

  return (
    <section
      aria-labelledby="in-use"
      className="flex flex-col gap-5 border-t border-ink pt-6 pb-16 md:gap-10 md:pt-8 md:pb-24"
    >
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow className="hidden md:inline">
          Try it before you take it
        </Eyebrow>
        <h2
          id="in-use"
          className="m-0 font-display text-[40px] leading-none font-normal tracking-[-0.5px] md:text-[64px] md:tracking-[-1px]"
        >
          <span className="md:hidden">
            In <em>use</em>
          </span>
          <span className="hidden md:inline">
            The palette <em>in use</em>
          </span>
        </h2>
      </div>

      <div className="-mx-4 grid snap-x snap-mandatory auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
        <figure className="m-0 flex min-w-0 snap-center flex-col gap-3.5">
          <div
            aria-hidden="true"
            className={card}
            style={{ background: `#${posterGround}`, color: `#${posterText}` }}
          >
            {support2 && (
              <div
                className="absolute top-[11.5cqw] right-[-14cqw] size-[62cqw] rounded-full"
                style={{ background: `#${support2}` }}
              />
            )}
            <div
              className="absolute right-0 bottom-[29cqw] left-0 h-[4.3cqw]"
              style={{ background: `#${feature}` }}
            />
            <div className="absolute top-[6.7cqw] left-[6.7cqw] text-[max(10px,2.9cqw)] font-semibold tracking-[1.6px] uppercase">
              {artist ?? "Art Institute of Chicago"}
            </div>
            <div className="absolute bottom-[5.8cqw] left-[5.8cqw] line-clamp-3 max-w-[85%] font-display text-[10cqw] leading-[0.95]">
              <Headline title={title} />
            </div>
          </div>
          <figcaption className="flex justify-between gap-3 text-sm">
            <span>Poster</span>
            <span className="text-graphite">
              Ground: {support1 ? "Support 1" : "Ground"}
            </span>
          </figcaption>
        </figure>

        <figure className="m-0 flex min-w-0 snap-center flex-col gap-3.5">
          <div
            aria-hidden="true"
            className={`${card} flex flex-col`}
            style={{ background: `#${text}`, color: `#${readableOn(text)}` }}
          >
            <div
              className="flex items-center justify-between border-b px-[5.3cqw] py-[4.3cqw] text-[max(9px,2.9cqw)] font-semibold"
              style={{ borderColor: `#${support2 ?? feature}` }}
            >
              <span className="font-display text-[4.3cqw] font-normal">
                Studio
              </span>
              <span>Work · About · Contact</span>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-[3.8cqw] px-[5.3cqw] py-[6.7cqw]">
              <div className="font-display text-[10.5cqw] leading-none">
                Quiet rooms, <em>bright</em> ideas.
              </div>
              <div className="text-[max(10px,3.4cqw)] leading-normal">
                A small studio working in color and light.
              </div>
              <span
                className="self-start rounded-full px-[4.8cqw] py-[2.9cqw] text-[max(10px,3.1cqw)] font-semibold"
                style={{
                  background: `#${landingButton}`,
                  color: `#${readableOn(landingButton)}`,
                }}
              >
                Book a visit
              </span>
            </div>
            <div className="flex h-[15cqw]">
              <span className="flex-[2]" style={{ background: `#${ground}` }} />
              {support2 && (
                <span
                  className="flex-1"
                  style={{ background: `#${support2}` }}
                />
              )}
              <span className="flex-1" style={{ background: `#${feature}` }} />
            </div>
          </div>
          <figcaption className="flex justify-between gap-3 text-sm">
            <span>Landing page</span>
            <span className="text-graphite">Ground: Text</span>
          </figcaption>
        </figure>

        <figure className="m-0 flex min-w-0 snap-center flex-col gap-3.5">
          <div className="box-border flex flex-1 flex-col border border-hairline p-6 md:aspect-[3/4] md:flex-none">
            <Eyebrow className="pb-4">Pairs and contrast</Eyebrow>
            <ul className="m-0 flex list-none flex-col p-0">
              {pairs.map((pair) => (
                <li
                  key={pair.name}
                  className="flex items-center gap-2.5 border-t border-hairline py-3 md:gap-3.5 md:py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-10 flex-none items-center justify-center font-display text-xl md:h-10 md:w-14"
                    style={{ background: `#${pair.bg}`, color: `#${pair.fg}` }}
                  >
                    Aa
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] leading-[1.35] md:text-sm">
                    {pair.name}
                    <br />
                    <span className="text-[13px] text-graphite">
                      {verdict(pair.ratio)}
                    </span>
                  </span>
                  <span className="font-mono text-sm font-medium md:text-[15px]">
                    {pair.ratio.toFixed(1)}:1
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figcaption className="flex justify-between gap-3 text-sm">
            <span>Text pairs</span>
            <span className="text-graphite">WCAG 2.2 ratios</span>
          </figcaption>
        </figure>
      </div>

      <p className="m-0 text-[13px] text-graphite md:hidden">
        Swipe for the landing page and contrast pairs.
      </p>
    </section>
  );
};

export default PaletteInUse;
