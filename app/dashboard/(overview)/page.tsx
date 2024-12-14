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

export const metadata: Metadata = {
  title: "Dashboard",
};

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
