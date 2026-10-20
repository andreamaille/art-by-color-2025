"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import Button from "@/app/components/Button";
import Eyebrow from "@/app/components/Eyebrow";
import { placeSuggestions } from "@/app/data/places";
import { parseColorParam } from "@/app/lib/color";
import { type Filters, MEDIA, toQueryString } from "@/app/lib/filters";
import ColorPanel from "./ColorPanel";
import DatePanel from "./DatePanel";
import MediumPanel from "./MediumPanel";
import TextPanel from "./TextPanel";

type FacetId = "color" | "medium" | "date" | "place" | "find";

function mediumSummary(media: Filters["media"]) {
  return MEDIA.filter((m) => media.includes(m.slug))
    .map((m) => m.label)
    .join(", ");
}

function dateSummary({ from, to }: Filters) {
  if (from !== undefined && to !== undefined) return `${from} to ${to}`;
  if (from !== undefined) return `From ${from}`;
  if (to !== undefined) return `Up to ${to}`;
  return "Any date";
}

// Every facet lives in the URL, so the page re-renders on the server with
// matching works and any combination can be shared.
const IndexSidebar = ({ filters }: { filters: Filters }) => {
  const router = useRouter();
  const [open, setOpen] = useState<FacetId | "">("color");

  const update = (patch: Partial<Filters>) => {
    const query = toQueryString({ ...filters, ...patch });
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  };

  const facets: {
    id: FacetId;
    label: string;
    value: string;
    dot?: string;
    panel: ReactNode;
  }[] = [
    {
      id: "color",
      label: "Color",
      value: filters.color?.name ?? "Any color",
      dot: filters.color && `#${filters.color.hex}`,
      panel: (
        <ColorPanel
          selection={filters.color}
          onChange={(value) =>
            update({ color: value ? parseColorParam(value) : undefined })
          }
        />
      ),
    },
    {
      id: "medium",
      label: "Medium",
      value: mediumSummary(filters.media),
      panel: (
        <MediumPanel
          media={filters.media}
          onChange={(media) => update({ media })}
        />
      ),
    },
    {
      id: "date",
      label: "Date",
      value: dateSummary(filters),
      panel: (
        <DatePanel
          from={filters.from}
          to={filters.to}
          onChange={(range) => update(range)}
        />
      ),
    },
    {
      id: "place",
      label: "Place",
      value: filters.place ?? "Anywhere",
      panel: (
        <TextPanel
          id="place-input"
          label="Place"
          placeholder="France"
          value={filters.place}
          suggestions={placeSuggestions}
          onChange={(place) => update({ place })}
        />
      ),
    },
    {
      id: "find",
      label: "Artist or title",
      value: filters.q ?? "Anyone",
      panel: (
        <TextPanel
          id="find-input"
          label="Search"
          placeholder="Monet, water lilies"
          value={filters.q}
          onChange={(q) => update({ q })}
        />
      ),
    },
  ];

  return (
    <aside
      aria-label="Search"
      className="flex max-w-[300px] flex-[1_1_260px] flex-col"
    >
      <Eyebrow className="pb-4">Index</Eyebrow>
      {facets.map((facet) => {
        const expanded = open === facet.id;
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
                  {facet.dot && (
                    <span
                      className="size-[18px] flex-none rounded-full"
                      style={{ background: facet.dot }}
                    />
                  )}
                  <span className="min-w-0 break-words">{facet.value}</span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pt-[22px] text-xl leading-none text-graphite"
              >
                {expanded ? "−" : "+"}
              </span>
            </button>
            {expanded && <div id={`facet-${facet.id}`}>{facet.panel}</div>}
          </div>
        );
      })}
      <div className="border-t border-hairline pt-4">
        <Button
          variant="ghost"
          onClick={() => router.replace("/", { scroll: false })}
        >
          Clear all
        </Button>
      </div>
    </aside>
  );
};

export default IndexSidebar;
