import style from "@/app/ui/style.module.css";
import Image from "next/image";

import { fetchCardData } from "@/lib/data";

export default async function CardWarper() {
  const data = await fetchCardData();

  return data.map(
    (listing: { title: string; id: string; image_url: string }) => {
      return (
        <>
          <Card
            title={listing.title}
            id={listing.id}
            image_url={listing.image_url}
          />
        </>
      );
    }
  );
}

export function Card({
  id,
  title,
  image_url,
}: {
  id: string;
  title: string;
  image_url: string;
}) {
  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <h3 className={style.title}>{title}</h3>
        <Image
          src={image_url}
          width={500}
          height={500}
          sizes="fill"
          className={style.listingImg}
          alt={title}
        />
        <span className={style.span}>{id}</span>
      </div>
    </div>
  );
}
