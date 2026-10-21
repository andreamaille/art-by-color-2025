/** A row of equal swatches under an artwork: five for a palette, one as a fallback. */
const PaletteStrip = ({ colors }: { colors: string[] }) => (
  <span
    role="img"
    aria-label={colors.length === 1 ? "Dominant color" : "Palette"}
    className="mt-1 flex gap-1"
  >
    {colors.map((color, i) => (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: a palette can repeat a color
        key={`${color}-${i}`}
        className="h-6 flex-1 md:h-9"
        style={{ background: color }}
      />
    ))}
  </span>
);

export default PaletteStrip;
