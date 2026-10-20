# Art by Color: design spec

The build reference for the redesign. Values come from `tokens.json` (CSS variables in `tokens.css`, component classes in `components.css`). The full brand book is `system/README.md`; this file is the short version plus the final layout decisions from the mock-ups.

## Principles

1. **The art supplies the color.** UI chrome is `ink`, `graphite` and `hairline` on `wall`. The only UI accent is `focus` (focus rings, inline links).
2. **Edited like a magazine.** Big Bodoni headlines, white space, asymmetric columns, museum wall labels. Hierarchy from type and space, not boxes and shadows.
3. **Every color value is copyable.** Set in IBM Plex Mono, copies on click. HEX by default, RGB and HSL one tap away.
4. **Art is never cropped or rounded.** Full aspect ratio, `radius-none`. Cards have no border, fill or shadow.

## Tokens

### Color: Gallery (light, default) / Night gallery (dark)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `wall` | `#FAFAF8` | `#121211` | Page background |
| `paper` | `#FFFFFF` | `#1B1B19` | Raised surfaces, toast, labels over imagery |
| `ink` | `#141413` | `#F2F1EC` | Primary text, primary buttons, selected states |
| `graphite` | `#5B5A55` | `#A7A59E` | Artists, dates, captions, eyebrows |
| `hairline` | `#DCDAD3` | `#34332F` | Dividers, index row rules |
| `field-border` | `#8C8A83` | `#77756E` | Input and outline-button borders |
| `focus` | `#2C3FC7` | `#8E9BFF` | Focus rings and inline links only |

### Pigments (search swatches, same in both themes)

| Pigment | Search term | Hex |
| --- | --- | --- |
| Cadmium Red | red | `#C8372D` |
| Cadmium Orange | orange | `#E0782B` |
| Cadmium Yellow | yellow | `#EDC12B` |
| Sap Green | olive | `#6E8B2E` |
| Viridian | green | `#2E7D63` |
| Cobalt Teal | teal | `#2A8E98` |
| Cerulean | light blue | `#3E8FD0` |
| Ultramarine | blue | `#2C3FC7` |
| Dioxazine Violet | violet | `#5B3A92` |
| Quinacridone Rose | pink | `#C94C7E` |
| Burnt Sienna | brown | `#8A4A2B` |
| Payne's Grey | grey | `#4E5A65` |
| Ivory Black | black | `#1E1D1B` |
| Titanium White | white | `#F4F2EC` |

Tokens are `--pigment-<slug>` (e.g. `--pigment-ultramarine`). Ultramarine is also the brand's signature color.

### Spacing

`space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 (phone gutter) · `space-5` 24 (gallery column gap) · `space-6` 32 (desktop gutter) · `space-7` 48 (sections on phone) · `space-8` 64 (sections on desktop) · `space-9` 96 · `space-10` 128 (px)

### Radius and shadow

`radius-none` 0 (art, cards) · `radius-sm` 2px (inputs, palette swatches) · `radius-pill` 999px (buttons, chips, pigment dots). `shadow-drawer` is the only shadow; with the filters drawer gone it is used just for the copied toast and the mobile Index sheet.

## Typography

All three families are on Google Fonts (the `@import` is at the top of `components.css`).

| Style | Family | Size / line height | Weight | Use |
| --- | --- | --- | --- | --- |
| `display-xl` | Bodoni Moda | 112px / 0.92, -2px | 400 | One per page: home headline, artwork title |
| `display-l` | Bodoni Moda | 64px / 1, -1px | 400 | Section openers; artwork title on mobile |
| `display-m` | Bodoni Moda | 40px / 1.05, -0.5px | 400 | Section heads |
| `title` | Bodoni Moda | 22px / 1.25 | 400 | Gallery card titles (20px in the home grid) |
| `eyebrow` | Schibsted Grotesk | 12px / 1.3, 1.6px, uppercase | 600 | Labels above sections and index rows |
| `body-l` | Schibsted Grotesk | 18px / 1.6 | 400 | Intros, descriptions |
| `body` | Schibsted Grotesk | 16px / 1.55 | 400 | Running text |
| `ui` | Schibsted Grotesk | 14px / 1.4 | 500 | Buttons, chips, nav, inputs |
| `caption` | Schibsted Grotesk | 13px / 1.45 | 400 | Artist and date under titles |
| `hex` | IBM Plex Mono | 13px / 1.4, 0.3px | 500 | Every color value, nothing else |

Use Bodoni italic for one emphasized word per headline (`Find the <em>palette</em> hiding in a painting.`). Keep running text near 65 characters.

## Components

Plain CSS classes in `components.css`, all prefixed `abc-`. Guidelines for each live in `system/components/<Name>/README.md`, with an HTML example in `preview.html`.

| Component | Class | Notes |
| --- | --- | --- |
| Button | `abc-btn` + `--primary` / `--secondary` / `--ghost` | Ink pill, outline, underlined text. 44px min height. |
| Pigment swatch | `abc-pigment`, `abc-pigment__dot` | Round search control, `aria-pressed`, label "Ultramarine, blue". One pressed at a time. |
| Palette swatch | `abc-swatch` | One extracted color, copies on click, "Copied" for 1.4s, announced via `aria-live`. |
| Artwork card | `abc-card`, `abc-card__img`, `abc-card__swatches`, `abc-card__title`, `abc-card__meta` | See "Gallery cards" below. |
| Filter chip | `abc-chip` | `aria-pressed` toggle for Medium values. |
| Search field | `abc-field` | Underlined italic Bodoni input; a hex value switches to color search. |
| Wall label | `abc-label` | `<dl>` of Artist, Date, Medium, Origin, Credit. |
| Eyebrow / rule / hex | `abc-eyebrow`, `abc-rule`, `abc-hex` | Utility text styles. |

## Final layout decisions

These are what Andy picked on the mock-ups canvas. Where they disagree with `system/README.md`, these win.

### Home page (`mockups/Main.dc.html`)

- **Header:** wordmark "Art by *Color*" (Bodoni 28px) left; nav Gallery, Saved palettes, About right; hairline below.
- **Hero:** eyebrow "The Art Institute of Chicago, by color", `display-xl` headline, `body-l` intro in `graphite`. On the right, "Palette of the day": one artwork, a 10px five-color strip, caption.
- **Under the hero: index sidebar + gallery**, separated from the hero by a 1px `ink` rule.
  - There is **no big color heading** (the "Ultramarine paintings" callout was removed). The current color only shows in the sidebar.
  - **Index sidebar (variation D)**, about 260–300px wide, left: eyebrow "Index", then one row per facet. Each row is a full-width `<button aria-expanded>` with a hairline top border, an eyebrow label, the current value in Bodoni italic 22px, and a `+` / `−` sign. Rows open one at a time.
  - Facets and defaults: **Color** (current pigment, with an 18px dot), **Medium** (Painting), **Date** (1800 to 1950), **Place** (Anywhere), **Artist or title** (Anyone).
  - The open Color row shows the 14 pigment dots in a 7-column grid (28px dots in 40×44 buttons, 2px gap), then an **"Or hex" field**: an eyebrow label and a mono input on one underlined row (`field-border`), prefilled with the current pigment's hex.
  - A ghost "Clear all" button ends the sidebar.
  - **Gallery:** CSS columns masonry, `columns: 3 220px`, 32px column gap; "Show more works" primary button centered under it.
- **Footer:** `ink` rule, wordmark, credit "Images and data from the Art Institute of Chicago API."

### Gallery cards (`mockups/CardsF.dc.html`, chosen option 6)

Image, then **five rectangle swatches right under it**, then title, then artist and date.

- Swatches: a 5-column grid, 4px gap, 36px tall (24px with a 3px gap on phones), 4px below the image, no radius, in palette order.
- **No hex codes on cards.** Values live on the artwork page.
- Title Bodoni 20px, 16px below the swatches; meta `caption` in `graphite`, 6px below. 56px between cards.
- The whole card is one `<a>` to the artwork page; `alt` is "Title by Artist".

### Filters drawer: removed

The index sidebar replaces it. Ignore the drawer and "full-height filters sheet" references in `system/README.md`.

### Mobile (`mockups/Mobile.dc.html`, 390px)

- Header with wordmark and a 44px search icon button; 16px gutters.
- Pigment row scrolls sideways (44px buttons, 34px dots, no names).
- Two-column masonry of cards with 24px swatches.
- A floating primary pill button labelled **"Index"** (filter icon) at the bottom center. It will open the index sidebar as a sheet; that sheet is not designed yet.
- The mobile mock-up still shows a large "Ultramarine" color heading above the grid. It predates the decision to drop the color heading on desktop, so check with Andy before building it.

### Artwork page (`mockups/Details.dc.html`, mobile: `MobileDetails.dc.html`)

The page takes the artwork's five extracted colors instead of the theme:

| Role | Taken from | Used for |
| --- | --- | --- |
| Ground | darkest color | Page background |
| Text | lightest color | Title, body, labels (needs 4.5:1 on Ground; else fall back to `paper` or `ink`) |
| Feature | most saturated | Primary button, one big color field |
| Support 1, 2 | the other two | "Palette in use" examples and rules |

Sections: header with "Back to <pigment>" link; image + title (`display-xl`), description, wall label, "Save palette" and "View at the museum"; **The palette** (five tall click-to-copy swatches with role, value, share; HEX/RGB/HSL toggle; Copy CSS variables, Copy Tailwind colors, Download palette PNG); **The palette in use** (poster, landing page, text pairs with WCAG ratios); **Works in a similar key** (three cards).

## Voice

Plain, warm, specific. "Search by pigment", "Copy", "Copied #41838C", "Show 48 works". Pigment names for swatches, plain color word as the search term. No "Click here", "Oops" or exclamation marks.

## Icons and imagery

Line icons only: 1.5px stroke at 24px, square caps, `currentColor` (search, close, filter, copy, arrow). No filled icons, no emoji. Artwork comes from the AIC IIIF image API, shown whole; credit the Art Institute of Chicago and link each work to artic.edu. Public domain works only.
