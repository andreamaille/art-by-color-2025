# Artwork card

A gallery item: the whole image, a row of five rectangle swatches right under it, then the title in Bodoni and the artist and date.

The card is one `<a class="abc-card" href>` to the artwork page. No border, fill, radius or shadow; the space around it does the work. Image `alt` is "Title by Artist". The swatches (`abc-card__swatches`, five `<span>`s) sit 4px under the image, 36px tall (24px on phones), in palette order, with no hex labels. Cards sit in a CSS columns masonry: 3 columns on desktop, 2 on phone.
