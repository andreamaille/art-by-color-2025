# Palette swatch

One of the five colors extracted from an artwork, shown tall and copied on click.

Markup: `<button class="abc-swatch">` with `abc-swatch__chip` (the color), `abc-swatch__name` (its role: Ground, Text, Feature, Support) and `abc-swatch__value` (the value in the chosen format, mono). On click, copy the value with `navigator.clipboard.writeText` and swap the value text to "Copied" for 1.4 seconds; announce it with an `aria-live="polite"` region. Set five in a row; on phones, a 3 + 2 grid.
