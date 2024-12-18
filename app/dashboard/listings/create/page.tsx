import Form from '@/app/ui/listings/create-form';
import Breadcrumbs from '@/app/ui/listings/breadcrumbs';
import { fetchUser } from '@/app/lib/data';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Create listing',
};

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Listings', href: '/dashboard/invoices' },
          {
            label: 'Create listing',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}