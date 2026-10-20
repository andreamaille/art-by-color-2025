"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import Eyebrow from "@/app/components/Eyebrow";
import { pigments } from "@/app/data/pigments";

const facets = [
  { id: "color", label: "Color" },
  { id: "medium", label: "Medium", value: "Painting" },
  { id: "date", label: "Date", value: "1800 to 1950" },
  { id: "place", label: "Place", value: "Anywhere" },
  { id: "find", label: "Artist or title", value: "Anyone" },
] as const;

// UI only: opening rows and picking a pigment changes what the sidebar shows,
// not the gallery.
const IndexSidebar = () => {
  const [open, setOpen] = useState<string>("color");
  const [picked, setPicked] = useState<string>("ultramarine");
  const pigment = pigments.find((p) => p.slug === picked) ?? pigments[7];

  return (
    <aside
      aria-label="Search"
      className="flex max-w-[300px] flex-[1_1_260px] flex-col"
    >
      <Eyebrow className="pb-4">Index</Eyebrow>
      {facets.map((facet) => {
        const expanded = open === facet.id;
        const isColor = facet.id === "color";
        return (
          <div key={facet.id} className="flex flex-col">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`facet-${facet.id}`}
              onClick={() => setOpen(expanded ? "" : facet.id)}
              className="flex w-full cursor-pointer items-start justify-between gap-3 border-0 border-t border-hairline bg-transparent py-4 text-left text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span className="flex min-w-0 flex-col gap-1.5">
                <Eyebrow>{facet.label}</Eyebrow>
                <span className="flex items-center gap-2.5 font-display text-[22px] leading-[1.2] italic">
                  {isColor && (
                    <span
                      className="size-[18px] flex-none rounded-full"
                      style={{ background: pigment.hex }}
                    />
                  )}
                  {isColor ? pigment.name : facet.value}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pt-[22px] text-xl leading-none text-graphite"
              >
                {expanded ? "−" : "+"}
              </span>
            </button>
            {isColor && expanded && (
              <div id="facet-color" className="flex flex-col gap-3.5 pb-5">
                <div className="grid grid-cols-7 gap-0.5">
                  {pigments.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      className="group inline-flex h-11 w-10 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none"
                      aria-pressed={p.slug === picked}
                      aria-label={`${p.name}, ${p.term}`}
                      title={p.name}
                      onClick={() => setPicked(p.slug)}
                    >
                      <span
                        className="block size-7 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110 group-aria-pressed:shadow-[0_0_0_3px_var(--wall),0_0_0_4px_var(--ink)] group-focus-visible:shadow-[0_0_0_3px_var(--wall),0_0_0_5px_var(--focus)] motion-reduce:transition-none"
                        style={{ background: p.hex }}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex min-h-11 items-center gap-2 border-b border-field-border">
                  <Eyebrow as="label" htmlFor="hex-input" className="flex-none">
                    Or hex
                  </Eyebrow>
                  <input
                    id="hex-input"
                    key={pigment.hex}
                    defaultValue={pigment.hex}
                    spellCheck={false}
                    className="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-ink outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="border-t border-hairline pt-4">
        <Button variant="ghost">Clear all</Button>
      </div>
    </aside>
  );
};

export default IndexSidebar;
