# Art by Color design reference

The approved mock-ups and the design system for the app, exported so they can be read and opened alongside the code. Treat this folder as the source of truth for layout, type and color when building pages.

Live versions (private to the owner):

- Mock-ups canvas: https://claude.ai/artifact/1drj8FecsyFhJkgWFMX9oJ
- Design system: https://claude.ai/artifact/A16pkbqv1L4Z8FSkNQnTmP

## What's here

| Path | What it is |
| --- | --- |
| `mockups/home.html` | Home and gallery: hero, "Palette of the day", the Index sidebar (Color, Medium, Date, Place, Artist or title) and the results masonry. |
| `mockups/artwork.html` | Artwork page. Header and hero in the painting's palette; below the fold, the regular gallery theme with the palette, the palette in use, the proportion study, tints and shades, and works in a similar key. |
| `mockups/mobile-gallery.html` | Phone gallery at 390px: sideways pigment row, two-column cards, floating Index button. |
| `mockups/mobile-artwork.html` | Phone artwork page. Still the earlier fully themed version; follow `artwork.html` for the section order and theming. |
| `mockups/pattern-index-sidebar.html` | The Index sidebar on its own. |
| `mockups/pattern-artwork-card.html` | The gallery card on its own: image, five 36px swatches 4px below it, title, caption. No hex codes on cards. |
| `design-system/README.md` | Principles, voice, color roles, the artwork page theming rule, type scale, layout and component list. |
| `design-system/tokens.json` | All tokens with usage notes (color with light and dark values, type, spacing, radius, shadow). |
| `design-system/tokens.css` | The same tokens as CSS custom properties, generated from `tokens.json`. Dark values apply under `[data-theme="dark"]`. |
| `design-system/components/bundle.css` | Component classes with an `abc-` prefix (button, pigment, swatch, card, chip, field, wall label). |
| `design-system/components/*/` | A README per component and an HTML snippet showing it. |
| `images/` | The sample artwork images the mock-ups use. In the app these come from the AIC IIIF API. |

## Opening the mock-ups

Open any file in `mockups/` in a browser straight from disk. Each page is plain HTML and inline styles with a small template (`{{value}}`, `<sc-for>`, `<sc-if>`) and a `Component` class at the bottom that holds the sample data and interactions (color format toggle, click to copy, Index rows). `mockups/preview.js` renders that template; it is only for viewing and is not app code.

## Notes for building

- Fonts: Bodoni Moda (display), Schibsted Grotesk (text), IBM Plex Mono (color values only), all from Google Fonts.
- The palette data on each page is sample data. Coverage percentages in the proportion study are placeholders until the image analysis returns real shares.
- Tints and shades mix each color toward white at 80, 60, 40 and 20 percent (100 to 400) and toward black at 20, 40, 60 and 75 percent (600 to 900). The painting's color is 500. See `ramps` in `mockups/artwork.html`.
- Contrast ratios in the text pairs panel are worked out for the sample palette; compute them per artwork in the app.
