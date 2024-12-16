import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { playfair } from "@/app/ui/fonts";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next";
import CardWrapper from "@/app/ui/invoices/shopCards";
export const metadata: Metadata = {
  title: 'Shop',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${playfair.className} text-2xl`}>Shop</h1>
      </div>
      <div className="mt-4 mb-10 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <div className="flex">
      <Suspense fallback={<CardsSkeleton/>}>
          <CardWrapper/>
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
