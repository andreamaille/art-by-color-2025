export async function fetchArt() {
  const fieldsArray = [
    "artist_title",
    "title",
    "date_display",
    "image_id",
    "thumbnail",
    "id",
    "medium_display",
    "color",
    "place_of_origin",
    "department_title",
    "classification_title",
  ];

  const fields = fieldsArray.join(",");

  const searchQueries = [
    "blue",
    "yellow",
    "red",
    "flowers",
    "fruit",
    "green",
    "design",
    "rainbow",
    "modern",
  ];

  const selectedSearchQuery =
    searchQueries[Math.floor(Math.random() * searchQueries.length)];

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${selectedSearchQuery}&fields=${fields}&page=1&limit=25`
  );
  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return result.data;
}
