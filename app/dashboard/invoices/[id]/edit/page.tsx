import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
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
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
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
