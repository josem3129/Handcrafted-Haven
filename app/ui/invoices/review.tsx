'use client';
import React, { useActionState, useState } from "react";
import { fetchUserCards } from "@/app/lib/data";
import { Button } from "../button";
import { createReview, StateReview } from "@/app/lib/actions";


export default function ReviewForm({ listing_id }: { listing_id: string }) {
  const initialState: StateReview = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);
  

    
    return (
    <div className="flex place-items-center p3 bg-gray-50">
      <form action={formAction} className="bg-white p-6 rounded-xl shadow-md w-full sm:w-96">
        <input defaultValue={listing_id} name="listing_id" className="hidden" />
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
          Write a review
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                placeholder = "Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
                aria-describedby="name-error"
              />
            </div>
          </div>
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
          name="review"
          placeholder="Write your review"
          required
        ></textarea>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.review &&
                state.errors.review.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        <select name="rating" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mt-4">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.rating &&
                state.errors.rating.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        <Button type="submit">Submit Review</Button>

      </form>
    </div>
    );
  };
  