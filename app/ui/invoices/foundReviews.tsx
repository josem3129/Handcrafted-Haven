import { fetchReviewsById } from "@/app/lib/data";
import { formatDateToLocal} from '@/app/lib/utils';
export default async function ReviewTable({ id }: { id: string }) {
  try {
    const data = await fetchReviewsById(id);

    // Assuming data is an array of reviews
    return (
      <div>
        {data.map((review) => (
          <ReviewList 
            key={review.id}  // Use listing_id as key for the list
            id={review.id} 
            rating={review.rating} 
            review={review.review} 
            name={review.name}
            date={formatDateToLocal(review.date)}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching reviews</div>;
  }
}

interface ReviewProps {
    id: string;
    rating: number;
    review: string;
    name:string;
    date: string;
  }
  
  export function ReviewList({ id, name, rating, review, date}: ReviewProps) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2" key={id}>
  
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">{name}</th>
              <th className="px-6 py-3 text-left">{rating}</th>
              <th className="px-6 py-3 text-left">{review}</th>
              <th className="px-6 py-3 text-left">{date}</th>
            </tr>
          </thead>
          <tbody id="review-table-body" className="text-gray-600">
            {/* Add rows with review details */}
          </tbody>
        </table>
      </div>
    );
  }
  