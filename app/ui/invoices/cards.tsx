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
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <div className="flex flex-col items-center p-4 mb-4">
          <Image src={image_url} alt={title} width={500} height={500} className="rounded-lg shadow-md" />
          <p className="text-lg mt-4 max-w-xl">{description}</p>
        </div>
        <p
          className={`${playfair.className}
            truncate rounded-xl bg-white px-6 py-4 text-center text-2xl font-semibold text-gray-700 mt-6`}
        >
          {amount}
        </p>
        <div className="flex justify-center px-6 py-4">
          <div>
            <ReviewForm
              listing_id={id}
            />
          </div>
        </div>
        <div className="bg-gray-100 py-6 w-full">
        <h1 className="text-3xl font-bold text-center mt-14">Product Reviews</h1>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewTable id={id} />
        </Suspense>
        </div>
      </div>
    );
  }
  