import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  ListingForm,
  ListingTable,
  listingTable,
  reviewTable,
} from "./definitions";
import { formatCurrency } from "./utils";
import { getSession } from "./session";

export async function fetchLatestInvoices() {
  try {
    const data = await sql<listingTable>`
      SELECT  listings.title, listings.image_url, listings.id, listings.amount
      FROM listings
      ORDER BY listings.date DESC
        LIMIT 5`;

    const latestListings = data.rows.map((listing) => ({
      id: listing.id,
      title: listing.title,
      image_url: listing.image_url,
      amount: listing.amount,
    }));

    return latestListings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    const data = await sql<listingTable>`
      SELECT  listings.title, listings.image_url, listings.id, listings.amount
      FROM listings
      ORDER BY listings.date DESC
        LIMIT 6`;

    const latestListings = data.rows.map((listing) => ({
      id: listing.id,
      amount: formatCurrency(listing.amount),
      title: listing.title,
      image_url: listing.image_url,
    }));

    return latestListings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchLandingPageCard() {
  try {
    const data = await sql<listingTable>`
      SELECT  listings.title, listings.image_url, listings.id, listings.amount
      FROM listings
      ORDER BY listings.date DESC
        LIMIT 3`;

    const latestListings = data.rows.map((listing) => ({
      id: listing.id,
      amount: formatCurrency(listing.amount),
      title: listing.title,
      image_url: listing.image_url,
    }));

    return latestListings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchUserCards() {
  try {
    let userInfo = await getSession();
    if (!userInfo) {
      return null;
    }
    let user: { id: string } = { id: "" };
    if (userInfo !== undefined) {
      user = JSON.parse(JSON.stringify(userInfo));
    }

    const data = await sql<listingTable>`
      SELECT  listings.title, listings.image_url, listings.id, listings.amount
      FROM listings
      WHERE listings.User_id = ${user.id}`;

    const latestListings = data.rows.map((listing) => ({
      id: listing.id,
      amount: formatCurrency(listing.amount),
      title: listing.title,
      image_url: listing.image_url,
    }));

    return latestListings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredListing(query: string, currentPage: number) {
  console.log(`WHY? ${query} ${currentPage}`);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  
  try {
    const listing = await sql<ListingTable>`
      SELECT
      listings.id,
      listings.title,
      listings.amount,
      listings.date,
      listings.image_url
      FROM listings
        WHERE
        listings.title ILIKE ${`%${query}%`} OR
    listings.name ILIKE ${`%${query}%`} OR
            listings.amount::text ILIKE ${`%${query}%`}
                  ORDER BY listings.date DESC
                        LIMIT  ${ITEMS_PER_PAGE} OFFSET ${offset} 
    `;
    
    return listing.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch listing.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM listings
    JOIN users ON listings.user_id = users.id
 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchListingById(id: string) {
  try {
    const data = await sql<ListingForm>`
      SELECT
        id, name, title, amount, image_url, product_description, date
      FROM listings
      WHERE listings.id = ${id};
    `;

    const listing = data.rows.map((listing) => ({
      ...listing,
      // Convert amount from cents to dollars
      amount: listing.amount,
    }));

    return listing[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchUser() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY id ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchUserById(id: string) {
  try {
    const data = await sql<CustomerField>`
      SELECT
        name
      FROM users
      WHERE users.id = ${id};
    `;

    const users = data.rows.map((found) => ({
      name: found.name,
    }));
    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}
export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  users.id,
		  users.name,
		  users.email,		
		  COUNT(listings.id) AS total_listings
		FROM users
		LEFT JOIN listings ON users.id = listings.customer_id
		WHERE
		  users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
		GROUP BY users.id, users.name, users.email,		
    ORDER BY users.name ASC
	  `;

    const users = data.rows.map((user) => ({
      ...user,
      total_pending: formatCurrency(user.total_pending),
      total_paid: formatCurrency(user.total_paid),
    }));

    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
export async function fetchReviewsById(id: string) {
  try {
    const data = await sql<
      reviewTable
    >`SELECT id, rating, name, date, review FROM reviews WHERE listing_id = ${id}`;
    const reviewFound = data.rows.map((review) => ({
      id: review.id,
      rating: review.rating,
      review: review.review,
      name: review.name,
      date: review.date,
    }));

    return reviewFound;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reviews.");
  }
}
