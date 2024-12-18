import { fetchReviewsById } from "@/app/lib/data";
import { formatDateToLocal } from '@/app/lib/utils';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons

export default async function ReviewTable({ id }: { id: string }) {
  try {
    const data = await fetchReviewsById(id);

    // Assuming data is an array of reviews
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-center">Reviewer</th>
              <th className="px-6 py-3 text-center">Rating</th>
              <th className="px-6 py-3 text-center">Review</th>
              <th className="px-6 py-3 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((review) => (
              <ReviewList
                key={review.id}
                id={review.id}
                rating={review.rating}
                review={review.review}
                name={review.name}
                date={formatDateToLocal(review.date)}
              />
            ))}
          </tbody>
        </table>
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
  name: string;
  date: string;
}

export function ReviewList({ id, name, rating, review, date }: ReviewProps) {
  // Create an array of filled stars and empty stars based on the rating
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < rating);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 font-semibold">{name}</td>
      <td className="px-6 py-4">
        {/* Render stars based on the rating */}
        <div className="flex space-x-1">
          {stars.map((isFilled, index) =>
            isFilled ? (
              <FaStar key={index} className="text-yellow-400" />
            ) : (
              <FaRegStar key={index} className="text-yellow-400" />
            )
          )}
        </div>
      </td>
      <td className="px-6 py-4 max-w-full break-words">{review}</td>
      <td className="px-6 py-4">{date}</td>
    </tr>
  );
}
