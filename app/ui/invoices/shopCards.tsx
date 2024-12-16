import { playfair } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function CardWrapper() {
  let data;
  try {
    data = await fetchCardData();
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>Something went wrong. Please try again later.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((listing) => (
        <Card
          key={listing.id}
          id={listing.id}
          title={listing.title}
          amount={listing.amount}
          image_url={listing.image_url}
        />
      ))}
    </div>
  );
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
    <Link href={`/dashboard/invoices/${id}`} className="rounded-xl bg-gray-50 p-4 shadow-sm m-4">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
        <Image src={image_url} alt={title} width={500} height={500} />
      </div>
      <p
        className={`${playfair.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl mt-4`}
      >
        {amount}
      </p>
    </Link>
  );
}
