import FilterChip from "@/app/components/FilterChip";
import { MEDIA, type MediumSlug } from "@/app/lib/filters";

interface MediumPanelProps {
  media: MediumSlug[];
  onChange: (media: MediumSlug[]) => void;
}

const MediumPanel = ({ media, onChange }: MediumPanelProps) => {
  const toggle = (slug: MediumSlug) => {
    const selected = media.includes(slug);
    // At least one medium stays on, so the gallery is never empty by accident.
    if (selected && media.length === 1) return;
    onChange(
      MEDIA.map((m) => m.slug).filter((s) =>
        s === slug ? !selected : media.includes(s),
      ),
    );
  };

  return (
    <div className="flex flex-wrap gap-2 pb-5">
      {MEDIA.map((m) => (
        <FilterChip
          key={m.slug}
          aria-pressed={media.includes(m.slug)}
          onClick={() => toggle(m.slug)}
        >
          {m.label}
        </FilterChip>
      ))}
    </div>
  );
};

export default MediumPanel;
