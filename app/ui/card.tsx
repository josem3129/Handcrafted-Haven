import Image from "next/image";
import { fetchCardData } from "@/lib/data";

export default async function CardWarper() {

  const data = await fetchCardData();

  return (
    data. map((listing: { title: string; id: string; image_url: string; }) => {
      return(
        <>
          <Card title={listing.title} id={listing.id} image_url={listing.image_url} />
        </>
      )

    })
  );
}

export function Card({
  id,
  title,
  image_url,
}: {
  id: string;
  title: string;
  image_url : string;
}) {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <Image
        src={image_url}
        width={300}
        height={300}
        className="listingImg"
        alt={title}
        />
        <span>{id}</span>
      </div>
    </div>
  );
}
