/** A row of equal swatches. Pass one color now, five once palettes are extracted. */
const PaletteStrip = ({ colors }: { colors: string[] }) => (
  <span
    role="img"
    aria-label={colors.length === 1 ? "Dominant color" : "Palette"}
    className="mt-1 flex gap-1"
  >
    {colors.map((color) => (
      <span
        key={color}
        className="h-6 flex-1 md:h-9"
        style={{ background: color }}
      />
    ))}
  </span>
);

export default PaletteStrip;
