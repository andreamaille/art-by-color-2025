# Art by Color

Discover color palettes by exploring art, powered by the Art Institute of Chicago.

Art by Color is a quiet gallery wall for loud paintings. The interface stays in ink on white so every color on the page comes from the art, and when you open a single work the whole page takes on that work's palette. It is made for designers, illustrators and web designers who want to borrow a palette with a provenance.

## Principles

1. **The art supplies the color.** UI chrome is `ink`, `graphite` and `hairline` on `wall`. The only UI accent is `focus`, used for focus rings and inline links. Never tint buttons or headers with a brand color in the gallery.
2. **Edited like a magazine.** Big Bodoni headlines, generous white space, asymmetric columns, and labels set like museum wall labels. Hierarchy comes from type size and space, not from boxes and shadows.
3. **Every color is copyable.** Any color value on screen is set in `hex` (IBM Plex Mono) and copies on click. Show HEX by default with RGB and HSL one tap away.
4. **Art is never cropped or rounded.** Images keep their full aspect ratio and `radius-none`. Cards have no border, fill or shadow.

## Voice

Plain, warm and specific, like a good gallery guide. Name things by what people recognize.

- Say "Search by pigment", "Copy", "Copied #41838C", "Show 48 works".
- Use painters' pigment names for the search swatches (Ultramarine, Viridian, Burnt Sienna) with the plain color word as the search term underneath. Our audience knows these names and they make the search feel like a paint box.
- Never write "Click here", "Oops" or exclamation marks.

## Color

Two themes: **Gallery** (light, default) and **Night gallery** (dark).

| Role | Token | Use |
| --- | --- | --- |
| Page | `wall` | Every page background in the gallery and filters. |
| Surface | `paper` | Drawers, the copied toast, a wall label laid over imagery. |
| Text | `ink`, `graphite` | Titles and body in `ink`; artists, dates and labels in `graphite`. |
| Lines | `hairline`, `field-border` | Section rules; borders on inputs and outline buttons. |
| Accent | `focus` | Focus rings and inline links only. |

**Pigments** (`pigment-*`) are the fixed search swatches. They are the same in both themes because they name real paints. `pigment-ultramarine` doubles as the brand's signature color on the cover and social images.

### The artwork page takes the art's colors

On an artwork's page the header and hero take the five extracted colors, and the hero ends on a full-bleed band of all five, each as wide as its share of the canvas. Everything below the fold goes back to the Gallery theme (`wall`, `ink`), where the palette is shown, studied and put to use: the copyable palette, the palette in use, a proportion study sized by coverage, and tints and shades (nine steps per color, 500 is the painting's color). In the hero the roles are:

| Palette role | Taken from | Used for |
| --- | --- | --- |
| Ground | the darkest color | Header and hero background |
| Text | the lightest color | Title, body, labels (check 4.5:1 against Ground; fall back to `ink` or `paper`) |
| Feature | the most saturated color | The primary button and secondary text |
| Support 1, 2 | the remaining two | Rules, and grounds in the "palette in use" examples |

If the lightest color is under 4.5:1 against the darkest, use `paper` for text on dark grounds and `ink` on light grounds. The palette section itself always shows all five at full value regardless.

## Typography

- **Display: Bodoni Moda** (Google Fonts, variable optical size). Artwork titles, headlines, section heads. Use the italic for one emphasized word per headline, never a whole paragraph.
- **Text: Schibsted Grotesk** (Google Fonts). Body, UI, labels.
- **Data: IBM Plex Mono** (Google Fonts). Every color value and nothing else.

Styles: `display-xl` 112px for the one headline per page, `display-l` 64px, `display-m` 40px, `title` 22px for gallery titles, `eyebrow` 12px uppercase with 1.6px tracking, `body-l` 18px, `body` 16px, `ui` 14px, `caption` 13px, `hex` 13px mono. Keep running text to about 65 characters.

## Layout

- Desktop: a 12-column grid with a 32px gutter (`space-6`) and 24px column gaps (`space-5`). Headlines start at column 1 and may run across 9 columns; intro text sits in columns 1 to 6.
- Gallery: a masonry of 3 columns on desktop, 2 on tablet and phone. Each card is the image, then five 36px rectangle swatches 4px below it (`abc-card__swatches`), then `title`, then `caption`. No hex codes on cards; those live on the artwork page.
- Phone: 16px gutters (`space-4`), the pigment row scrolls sideways, filters open as a full-height sheet.
- Section spacing: `space-8` (64px) on desktop, `space-7` (48px) on phone.

## Components

All components are plain CSS classes in `components/bundle.css` with an `abc-` prefix, so they drop into the Next.js app with or without Tailwind.

- **Button** (`abc-btn`): primary (ink pill), secondary (outline), ghost (underlined text).
- **Pigment swatch** (`abc-pigment`): the round search swatch with its pigment name.
- **Palette swatch** (`abc-swatch`): one extracted color with its value; copies on click.
- **Artwork card** (`abc-card`): image, five swatches, title and caption.
- **Filter chip** (`abc-chip`): medium filters, toggled with `aria-pressed`.
- **Search field** (`abc-field`): an underlined italic Bodoni input.
- **Wall label** (`abc-label`): artwork metadata as a definition list.

## Iconography

Line icons only, 1.5px stroke at 24px, square caps, drawn in `currentColor`: search, close, filter (three rules of decreasing length), copy, arrow. No filled icons and no emoji.

## Imagery

Artwork images come from the Art Institute of Chicago IIIF image API and are shown whole. Always credit "Art Institute of Chicago" in the footer and link each work to its page on artic.edu. Only show public domain works where the image is downloadable.
