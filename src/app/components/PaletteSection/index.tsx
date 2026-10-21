"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/app/components/Button/styles";
import Eyebrow from "@/app/components/Eyebrow";
import { type ColorFormat, formatColor } from "@/app/lib/colorFormats";

export interface PaletteSwatch {
  role: string;
  hex: string;
}

const FORMATS: { id: ColorFormat; label: string }[] = [
  { id: "hex", label: "HEX" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
];

const RANKS = ["Largest share", "Second", "Third", "Fourth", "Fifth"];

const slug = (role: string) => role.toLowerCase().replace(/\s+/g, "-");

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    aria-hidden="true"
    className="flex-none md:hidden"
  >
    <rect x="8" y="8" width="12" height="12" />
    <path d="M16 8V4H4v12h4" />
  </svg>
);

/** `swatches` arrive sorted by how much of the artwork each color covers. */
const PaletteSection = ({ swatches }: { swatches: PaletteSwatch[] }) => {
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [status, setStatus] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedBlock, setCopiedBlock] = useState<"css" | "tailwind" | null>(
    null,
  );
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text: string, message: string, mark: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setStatus(
        "We couldn't reach your clipboard. Select the value and copy it.",
      );
      return;
    }
    mark();
    setStatus(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopiedIndex(null);
      setCopiedBlock(null);
    }, 1400);
  };

  const inRoleOrder = ["Ground", "Text", "Feature", "Support 1", "Support 2"]
    .map((role) => swatches.find((s) => s.role === role))
    .filter((s): s is PaletteSwatch => Boolean(s));

  const cssVariables = `:root {\n${inRoleOrder
    .map((s) => `  --${slug(s.role)}: ${formatColor(s.hex, format)};`)
    .join("\n")}\n}`;
  const tailwindColors = `@theme {\n${inRoleOrder
    .map((s) => `  --color-${slug(s.role)}: ${formatColor(s.hex, format)};`)
    .join("\n")}\n}`;

  return (
    <section
      aria-labelledby="palette"
      className="flex flex-col gap-5 border-t border-ink pt-6 pb-16 md:gap-8 md:pt-8 md:pb-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow className="hidden md:inline">
            Five colors, sorted by how much of the canvas they cover
          </Eyebrow>
          <h2
            id="palette"
            className="m-0 font-display text-[40px] leading-none font-normal tracking-[-0.5px] md:text-[64px] md:tracking-[-1px]"
          >
            The <em>palette</em>
          </h2>
        </div>
        <fieldset className="m-0 flex min-w-0 gap-1 rounded-full border border-field-border p-1">
          <legend className="sr-only">Color format</legend>
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={format === f.id}
              onClick={() => {
                setFormat(f.id);
                setCopiedIndex(null);
              }}
              className="min-h-10 min-w-16 cursor-pointer rounded-full border-0 bg-transparent px-3.5 font-mono text-[13px] font-medium text-ink aria-pressed:bg-ink aria-pressed:text-wall focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {f.label}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5">
        {swatches.map((swatch, i) => {
          const value = formatColor(swatch.hex, format);
          return (
            <button
              key={swatch.hex}
              type="button"
              aria-label={`Copy ${value}`}
              onClick={() =>
                copy(value, `Copied ${value} to your clipboard.`, () =>
                  setCopiedIndex(i),
                )
              }
              className="flex min-h-[72px] cursor-pointer items-center gap-4 border-0 border-t border-hairline bg-transparent py-2.5 text-left text-ink md:flex-col md:items-stretch md:gap-3.5 md:border-t-0 md:p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              <span
                className="block h-14 w-24 flex-none shadow-[inset_0_0_0_1px_var(--hairline)] md:h-[340px] md:w-full"
                style={{ background: `#${swatch.hex}` }}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-none md:gap-1 md:pr-4">
                <span className="font-display text-[19px] md:text-[22px]">
                  {swatch.role}
                </span>
                <span className="font-mono text-sm font-medium md:text-[15px]">
                  {copiedIndex === i ? "Copied" : value}
                </span>
                <span className="hidden text-[13px] text-graphite md:block">
                  {RANKS[i]}
                </span>
              </span>
              <CopyIcon />
            </button>
          );
        })}
      </div>

      <p
        role="status"
        aria-live="polite"
        className="m-0 min-h-5 text-[13px] text-graphite md:text-sm md:text-ink"
      >
        {status || "Click any color to copy it."}
      </p>

      <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3">
        <button
          type="button"
          className={buttonClass("feature")}
          onClick={() =>
            copy(cssVariables, "Copied the palette as CSS variables.", () =>
              setCopiedBlock("css"),
            )
          }
        >
          {copiedBlock === "css" ? "Copied" : "Copy CSS variables"}
        </button>
        <button
          type="button"
          className={buttonClass("secondary")}
          onClick={() =>
            copy(tailwindColors, "Copied the palette as Tailwind colors.", () =>
              setCopiedBlock("tailwind"),
            )
          }
        >
          {copiedBlock === "tailwind" ? "Copied" : "Copy Tailwind colors"}
        </button>
      </div>
    </section>
  );
};

export default PaletteSection;
