import { playfair } from "@/app/ui/fonts";
import { fetchUserCards } from "@/app/lib/data";
import Image from "next/image";
import { Suspense } from "react";
import { UpdateInvoice } from "@/app/ui/invoices/buttons";
import { DeleteListing } from "./buttons";

export default async function CardWrapper() {
  try {
    let data = await fetchUserCards();
    if (data && data.length > 0) {
      return data.map(
        (listing: {
          id: string;
          title: string;
          amount: string;
          image_url: string;
        }) => (
          <Card
            key={listing.id}
            id={listing.id}
            title={listing.title}
            amount={listing.amount}
            image_url={listing.image_url}
          />
        )
      );
    } else {
      return <p>No listings available</p>; // Handle the case of no data
    }
  } catch (error) {
    console.error("Error fetching user cards:", error);
    return <p>Failed to load listings. Please try again later.</p>; // Error handling
  }
}

export function Card({
  id,
  amount,
  title,
  image_url,
}: {
  id: string;
  amount: string;
  title: string;
  image_url: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm m-4">
      <div className="flex-row p-4 text-center">
        <h3 className="ml-2 text-2xl font-bold m-5">{title}</h3>
        <Image src={image_url} alt={title} width={500} height={500} />
      </div>
      <p
        className={`${playfair.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {amount}
      </p>
      <div className="flex text-center m-5">
        <Suspense fallback={<div>Loading update...</div>}>
          <UpdateInvoice id={id} />
        </Suspense>
        <Suspense fallback={<div>Loading delete...</div>}>
          <DeleteListing id={id} />
        </Suspense>
      </div>
    </div>
  );
}
