import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchListingById, fetchUser } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Edit Listing',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const listing = await fetchListingById(id)

  const list = JSON.stringify(listing)
  console.log(`------------ EDIT PAGE${listing.id} ${id}`);
  
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
      <Form listing={listing}/>
    </main>
  );
}
