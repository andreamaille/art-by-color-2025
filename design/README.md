# design/

Design export for the Art by Color redesign: the final mock-ups and the design system they use. Start with `SPEC.md`.

| Path | What it is |
| --- | --- |
| `SPEC.md` | The build reference: tokens, type, components and the final layout decisions. Read this first. |
| `tokens.json` | Design tokens (colors in two themes, pigments, type, spacing, radius, shadow). Source of truth. |
| `tokens.css` | The same tokens as CSS custom properties. Dark theme via `[data-theme="dark"]`. The app maps them to Tailwind utilities in `globals.css` (`bg-wall`, `text-ink`, `font-display`, ...). |
| `components.css` | Reference only. The original `abc-*` component CSS the mock-ups and `system/components/*/preview.html` use. The app does not load it; it builds these with Tailwind (see `SPEC.md`, "Components"). |
| `system/README.md` | The full brand book: principles, voice, color, type, layout, components. |
| `system/components/<Name>/` | Per-component guidelines (`README.md`) and an HTML example (`preview.html`). |
| `mockups/*.dc.html` | Mock-up sources from the design canvas (see below). |
| `mockups/canvas.json` | Canvas index: board titles, sizes and order. |
| `images/` | Sample AIC artworks used in the mock-ups (public domain). |

## Mock-ups

| File | Board |
| --- | --- |
| `Main.dc.html` | 1 · Home: hero + index sidebar (variation D) + gallery |
| `Details.dc.html` | 2 · Artwork page in its own palette |
| `Mobile.dc.html` | 3 · Mobile gallery with the "Index" button |
| `MobileDetails.dc.html` | 4 · Mobile artwork page |
| `FacetsD.dc.html` | Index sidebar on its own |
| `CardsF.dc.html` | Gallery card: five rectangle swatches under the image (chosen) |

The `.dc.html` files are the canvas's component format: plain HTML with inline styles, `{{value}}` holes, `<sc-for>` loops and `<sc-if>` conditionals, and a `class Component extends DCLogic` script at the bottom that holds the sample data and interaction state. They need the canvas runtime (`support.js`, not included) to render, so read them as layout and styling references rather than opening them in a browser. Image and stylesheet paths have been pointed at `../images/` and `../components.css`. The `abc-*` classes in them (and in the component READMEs and previews) are the design-time names; implement them with Tailwind utilities in the app.

The live versions are on claude.ai: the [mock-ups canvas](https://claude.ai/artifact/1drj8FecsyFhJkgWFMX9oJ) and the [design system](https://claude.ai/artifact/A16pkbqv1L4Z8FSkNQnTmP) (both private to Andy). Exported 2026-10-20.
