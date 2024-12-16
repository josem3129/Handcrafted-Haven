import { playfair } from "@/app/ui/fonts";
import Image from "next/image";
import { Suspense } from "react";
import ReviewForm from "app/ui/invoices/review";
import ReviewTable from "@/app/ui/invoices/foundReviews"; 

export default function Card({
    id,
    amount,
    title,
    image_url,
    description
  }: {
    id: string;
    amount: string;
    title: string;
    image_url: string;
    description: string;
  }) {
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm .m-4 text-center" key={id}>
          <h3 className="ml-2 text-2xl font-bold m-5">{title}</h3>
        <div className="flex p-4 text-center">
          <Image src={image_url} alt={title} width={500} height={500} />
          <p className="text-2xl m-auto">{description}</p>
        </div>
        <p
          className={`${playfair.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {amount}
        </p>
        <div className=" flex text-center m-5">
          <div>
            <ReviewForm
              listing_id={id}
            />
          </div>
        </div>
        <div>
        <h1 className="text-3xl font-bold text-center mb-6">Product Reviews</h1>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewTable id={id} />
        </Suspense>
        </div>
      </div>
    );
  }
  