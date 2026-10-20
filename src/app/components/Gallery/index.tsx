import { fetchArt } from "@/app/loaders/fetchArt";

interface itemProps {
  artist_title: string;
  title: string;
  date_display: string;
  image_id: string;
  thumbnail: {
    alt_text: string;
    height: number;
    lqip: string;
    width: number;
  };
  id: number;
  medium_display: string;
  color: {
    h: number;
    l: number;
    percentage: number;
    population: number;
    s: number;
  };
  place_of_origin: string;
  department_title: string;
  classification_title: string;
}

const Gallery = async () => {
  const galleryItems = await fetchArt();

  console.log("gallery", galleryItems);

  return (
    <div>
      {galleryItems.map((item: itemProps) => (
        <div key={item.id}>
          <div>Test: {item.artist_title}</div>
          <img
            src={`/api/image/${item.image_id}?w=400`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
