import { hexToHsl } from "@/app/lib/color";
import { contrastRatio, luminance, mix } from "@/app/lib/colorFormats";

export type RoleName =
  | "Ground"
  | "Text"
  | "Feature"
  | "Support 1"
  | "Support 2";

export interface PaletteInput {
  hex: string;
  share: number;
}

export interface RoledColor extends PaletteInput {
  role: RoleName;
}

export interface ArtworkTheme {
  /** The palette in role order: Ground, Text, Feature, Support 1, Support 2. */
  roles: RoledColor[];
  /** CSS custom properties that replace the site theme for this page. */
  vars: Record<string, string>;
}

const MIN_BODY_CONTRAST = 4.5;
// Fallbacks from the design system: paper on dark grounds, ink on light ones.
const PAPER = "FFFFFF";
const INK = "141413";

// Ordered by how light a color looks, not HSL lightness, which rates yellows as dark.
const lightness = luminance;

/** How vivid a color looks: HSL saturation, discounted for near-black and near-white. */
function vividness(hex: string) {
  const { s, l } = hexToHsl(hex);
  return (s / 100) * (1 - Math.abs((2 * l) / 100 - 1));
}

const bestOn = (background: string, candidates: string[]) =>
  candidates.reduce((best, c) =>
    contrastRatio(c, background) > contrastRatio(best, background) ? c : best,
  );

/**
 * Gives each palette color a job, following the design spec:
 * Ground is the darkest, Text the lightest, Feature the most vivid of the
 * rest, and the last two are Support 1 and 2 (darker first).
 * Returns null when the palette is too small to build a page from.
 */
export function buildTheme(palette: PaletteInput[]): ArtworkTheme | null {
  if (palette.length < 3) return null;

  const byLightness = [...palette].sort(
    (a, b) => lightness(a.hex) - lightness(b.hex),
  );
  const ground = byLightness[0];
  const text = byLightness[byLightness.length - 1];
  const rest = byLightness.slice(1, -1);

  const feature = rest.reduce((best, c) =>
    vividness(c.hex) > vividness(best.hex) ? c : best,
  );
  const supports = rest.filter((c) => c !== feature);

  const roles: RoledColor[] = [
    { ...ground, role: "Ground" },
    { ...text, role: "Text" },
    { ...feature, role: "Feature" },
    ...supports.map((c, i) => ({ ...c, role: `Support ${i + 1}` as RoleName })),
  ];

  // Text needs 4.5:1 on Ground. If the lightest color can't manage it, fall
  // back to paper or ink, whichever reads better.
  const textColor =
    contrastRatio(text.hex, ground.hex) >= MIN_BODY_CONTRAST
      ? text.hex
      : bestOn(ground.hex, [PAPER, INK]);

  // Secondary text and borders: the lightest palette color that is still
  // readable on Ground, so the art keeps supplying the color. Otherwise a
  // softened Text.
  const secondary =
    [...rest, text]
      .map((c) => c.hex)
      .filter((hex) => hex !== textColor)
      .sort((a, b) => lightness(b) - lightness(a))
      .find((hex) => contrastRatio(hex, ground.hex) >= MIN_BODY_CONTRAST) ??
    [0.25, 0.15, 0.05]
      .map((t) => mix(textColor, ground.hex, t))
      .find((hex) => contrastRatio(hex, ground.hex) >= MIN_BODY_CONTRAST) ??
    textColor;

  const onFeature = bestOn(feature.hex, [ground.hex, textColor]);

  const vars: Record<string, string> = {
    "--wall": `#${ground.hex}`,
    "--paper": `#${mix(ground.hex, textColor, 0.08)}`,
    "--ink": `#${textColor}`,
    "--graphite": `#${secondary}`,
    "--hairline": `#${mix(ground.hex, textColor, 0.22)}`,
    "--field-border": `#${secondary}`,
    "--focus": `#${textColor}`,
    "--feature": `#${feature.hex}`,
    "--on-feature": `#${onFeature}`,
  };
  supports.forEach((c, i) => {
    vars[`--support-${i + 1}`] = `#${c.hex}`;
  });

  return { roles, vars };
}
