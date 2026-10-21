# Pigment swatch

The round color search control, named after a painter's pigment.

Render the full set of 14 `pigment-*` tokens in spectrum order. Each is a `<button class="abc-pigment" aria-pressed>` holding `abc-pigment__dot` (background from the pigment token) and `abc-pigment__name`. The accessible name is the pigment plus the search term, for example "Ultramarine, blue". Only one is pressed at a time; pressing it again clears the color. On phones the row scrolls sideways and the names are hidden.
