import { fetchListingById } from "@/app/lib/data";
import { formatCurrency } from '@/app/lib/utils';
import Card from "@/app/ui/invoices/cards";


export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const listing_id = params.id;
  

  const data = await fetchListingById(listing_id);


  if (data !== null) {
    return(
      <Card
        key={data.id}
        id={data.id}
        title={data.title}
        amount={formatCurrency(data.amount)}
        image_url={data.image_url}
        description = {data.product_description}
      />

    )
        
  } else {
    return <p>No data available</p>;
  }
}

