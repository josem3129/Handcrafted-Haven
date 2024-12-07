import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import Image from "next/image";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const data = await fetchCardData();

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
  // const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm" key={id}>
      <div className="flex p-4">
        
        <Image
          src={image_url}
          alt={title}
          width={500}
          height={500}
        />
        {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {amount}
      </p>
    </div>
  );
}
