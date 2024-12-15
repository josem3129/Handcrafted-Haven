'use client';
import React, { useState } from "react";
import { fetchUserCards } from "@/app/lib/data";
import { Button } from "../button";


type Item = {
    id: number;
    title: string;
    amount: string;
    image_url:string;
};

type ReviewForm = {
    item: Item;
};

const ReviewForm: React.FC<ReviewForm> = ({ item }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState<number>(1);
  
    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReview(e.target.value);
    };
  
    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRating(Number(e.target.value));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Send the review to the backend
      const reviewData = {
        itemId: item.id,
        review: review,
        rating: rating,
      };
  
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        alert('Review submitted successfully!');
        setReview('');
        setRating(1);
      } else {
        alert('Error submitting review');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>

  
        <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review"
          required
        ></textarea>
  
        <select value={rating} onChange={handleRatingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
  
        <Button type="submit">Submit Review</Button>
      </form>
    );
  };
  
export default ReviewForm;