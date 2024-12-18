import Form from "@/app/ui/listings/edit-form";
import Breadcrumbs from "@/app/ui/listings/breadcrumbs";
import { fetchListingById } from '@/app/lib/data';
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Edit Listing',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const listing = await fetchListingById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/listings" },
          {
            label: "Edit Invoice",
            href: `/dashboard/listings/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form listing={listing} />
      <div>
      </div>
    </main>
  );
}
