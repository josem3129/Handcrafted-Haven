import { playfair } from "@/app/ui/fonts";
import { fetchCardData, fetchFilteredListing } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";

export default async function CardWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let data;
  try {
    data = await fetchFilteredListing(query, currentPage);
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
          amount={formatCurrency(listing.amount)}
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
    <Link href={`/dashboard/listings/${id}`} className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="flex flex-col items-center p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{title}</h3>
        <Image src={image_url} alt={title} width={500} height={500} className="w-full h-64 object-cover rounded-t-xl transition duration-500 ease-in-out group-hover:scale-110" />
      </div>
      <p
        className={`${playfair.className} text-xl font-bold text-gray-900 px-4 py-4 bg-gray-50 rounded-b-xl text-center mt-4`}
      >
        {amount}
      </p>
    </Link>
  );
}
