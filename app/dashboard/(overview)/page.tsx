import CardWrapper from "@/app/ui/dashboard/cards";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";
import GetUserWelcome from "@/app/ui/dashboard/welcome";
import { cookies } from "next/headers";
import { draftMode } from 'next/headers';

export const metadata: Metadata = { title, desc } = await getContent();;

 const contentUrl = isEnabled
    ? 'https://handcrafted-haven-one.vercel.app/dashboard?__vercel_draft=1'
    : 'https://handcrafted-haven-one.vercel.app/dashboard';
 
  // This line enables ISR, required for draft mode
  const res = await fetch(contentUrl, { next: { revalidate: 120 } });
 
  return res.json();
}
export default async function Page() {
  
  return (
    <main>

      <Suspense fallback={<RevenueChartSkeleton/>}>
        <GetUserWelcome />
      </Suspense>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper/>
        </Suspense>
      </div>
    
    </main>
  );
}
