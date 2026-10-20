const AIC_USER_AGENT = "art-by-color (andrea.maille@gmail.com)";
const ID_PATTERN = /^[0-9a-f-]{36}$/i;
const ALLOWED_WIDTHS = [200, 400, 843];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!ID_PATTERN.test(id)) {
    return new Response("Invalid image id", { status: 400 });
  }

  const requested = Number(new URL(request.url).searchParams.get("w"));
  const width = ALLOWED_WIDTHS.includes(requested) ? requested : 843;

  const upstream = await fetch(
    `https://www.artic.edu/iiif/2/${id}/full/${width},/0/default.jpg`,
    {
      headers: { "AIC-User-Agent": AIC_USER_AGENT },
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  if (!upstream.ok) {
    return new Response("Image unavailable", { status: upstream.status });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
