// Static sample data from the design mock-up. Replace with API data later.
export interface SampleArtwork {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  artist: string;
  date: string;
  palette: [string, string, string, string, string];
}

export const sampleArtworks: SampleArtwork[] = [
  {
    id: "blue-and-green-music",
    src: "/images/blue-and-green-music.jpg",
    width: 379,
    height: 399,
    title: "Blue and Green Music",
    artist: "Georgia O'Keeffe",
    date: "1919/21",
    palette: ["#322C30", "#335E4A", "#41838C", "#8BB881", "#AFD1CF"],
  },
  {
    id: "arrival-of-the-normandy-train",
    src: "/images/arrival-of-the-normandy-train.jpg",
    width: 369,
    height: 276,
    title: "Arrival of the Normandy Train, Gare Saint-Lazare",
    artist: "Claude Monet",
    date: "1877",
    palette: ["#252E33", "#536457", "#5E737D", "#7F8F92", "#ABB1B2"],
  },
  {
    id: "machu-picchu-morning-light",
    src: "/images/machu-picchu-morning-light.jpg",
    width: 384,
    height: 527,
    title: "Peru – Machu Picchu, Morning Light",
    artist: "Georgia O'Keeffe",
    date: "1957",
    palette: ["#13341F", "#2E5398", "#809FCD", "#B5AD2C", "#E9F4EA"],
  },
  {
    id: "abiquiu-sand-hills-and-mesa",
    src: "/images/abiquiu-sand-hills-and-mesa.jpg",
    width: 438,
    height: 200,
    title: "Abiquiu Sand Hills and Mesa",
    artist: "Georgia O'Keeffe",
    date: "1945",
    palette: ["#494C41", "#6D6A56", "#8D8269", "#9FBDC5", "#CFB792"],
  },
  {
    id: "woman-mending",
    src: "/images/woman-mending.jpg",
    width: 377,
    height: 247,
    title: "Woman Mending",
    artist: "Camille Pissarro",
    date: "1895",
    palette: ["#4F4A4F", "#6B6A6A", "#858178", "#AB9E8E", "#C7C1B0"],
  },
  {
    id: "thanksgiving",
    src: "/images/thanksgiving.jpg",
    width: 385,
    height: 237,
    title: "Thanksgiving",
    artist: "Doris Lee",
    date: "c. 1935",
    palette: ["#2A1B1B", "#62382A", "#625244", "#9A795D", "#A7A189"],
  },
];
