import { playfair } from "@/app/ui/fonts";
import { fetchUserCards } from "@/app/lib/data";
import Image from "next/image";
import { Suspense } from "react";
import { UpdateInvoice } from "@/app/ui/invoices/buttons";

export default async function CardWrapper() {
  const data = await fetchUserCards();

  return data.map(
    (listing: {
      id: string;
      title: string;
      amount: number;
      image_url: string;
    }) => {
      return (
        <Card
          key={listing.id}
          id={listing.id}
          title={listing.title}
          amount={listing.amount}
          image_url={listing.image_url}
        />
      );
    }
  );
}

export function Card({
  id,
  amount,
  title,
  image_url,
}: {
  id: string;
  amount: number;
  title: string;
  image_url: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm .m-4" key={id}>
      <div className="flex p-4">
        <Image src={image_url} alt={title} width={500} height={500} />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${playfair.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {amount}
      </p>
      <Suspense>
        <UpdateInvoice id={id}/>
      </Suspense>
    </div>
  );
}
