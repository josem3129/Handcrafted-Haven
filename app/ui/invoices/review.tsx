'use client';
import React, { useActionState, useState } from "react";
import { fetchUserCards } from "@/app/lib/data";
import { Button } from "../button";
import { createReview, StateReview } from "@/app/lib/actions";


export default function ReviewForm({ listing_id }: { listing_id: string }) {
  const initialState: StateReview = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);
  
    return (
      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Write a review
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                placeholder = "name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-auto text-sm outline-2 placeholder:text-gray-500"
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
        <select name="rating" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-3">
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
    );
  };
  