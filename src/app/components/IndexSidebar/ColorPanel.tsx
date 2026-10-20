import UnderlineField from "@/app/components/UnderlineField";
import { pigments } from "@/app/data/pigments";
import { type ColorSelection, normalizeHex } from "@/app/lib/color";

interface ColorPanelProps {
  selection?: ColorSelection;
  onChange: (value?: string) => void;
}

const ColorPanel = ({ selection, onChange }: ColorPanelProps) => {
  const submitHex = (input: string) => {
    const hex = normalizeHex(input);
    if (hex && hex !== selection?.hex) onChange(hex);
  };

  return (
    <div className="flex flex-col gap-3.5 pb-5">
      <div className="grid grid-cols-7 gap-0.5">
        {pigments.map((p) => (
          <button
            key={p.slug}
            type="button"
            className="group inline-flex h-11 w-10 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none"
            aria-pressed={p.slug === selection?.slug}
            aria-label={`${p.name}, ${p.term}`}
            title={p.name}
            onClick={() =>
              onChange(p.slug === selection?.slug ? undefined : p.slug)
            }
          >
            <span
              className="block size-7 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110 group-aria-pressed:shadow-[0_0_0_3px_var(--wall),0_0_0_4px_var(--ink)] group-focus-visible:shadow-[0_0_0_3px_var(--wall),0_0_0_5px_var(--focus)] motion-reduce:transition-none"
              style={{ background: p.hex }}
            />
          </button>
        ))}
      </div>
      <UnderlineField
        key={selection?.hex}
        id="hex-input"
        label="Or hex"
        mono
        defaultValue={selection ? `#${selection.hex}` : ""}
        placeholder="#2C3FC7"
        onBlur={(e) => submitHex(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submitHex(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default ColorPanel;
