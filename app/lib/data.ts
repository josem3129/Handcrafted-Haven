import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  listingTable,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue>`SELECT * FROM revenue`;

//     console.log('Data fetch completed after 3 seconds.');

//     return data.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

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
      amount: listing.amount
    }));

    // console.log(latestListings);
    
    return latestListings;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const data = await sql<listingTable>`
      SELECT  listings.title, listings.image_url, listings.id, listings.amount
      FROM listings
      ORDER BY listings.date DESC
        LIMIT 5`;

    const latestListings = data.rows.map((listing) => ({
      id: listing.id,
      amount: listing.amount,
      title: listing.title,
      image_url: listing.image_url
    }));

    // console.log(latestListings.map(list => {
    //   return list
    // }));
    
    return latestListings;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        listings.id,
        listings.amount,
        listings.date,
        listings.status,
        users.name,
        users.email,
        users.image_url
      FROM listings
      JOIN users ON listings.customer_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        listings.amount::text ILIKE ${`%${query}%`} OR
        listings.date::text ILIKE ${`%${query}%`} OR
      ORDER BY listings.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM listings
    JOIN users ON listings.user_id = users.id
 
  `;
    // console.log(count);
    
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        listings.id,
        listings.customer_id,
        listings.amount,
      FROM listings
      WHERE listings.id = ${id};
    `;

    const listing = data.rows.map((listing) => ({
      ...listing,
      // Convert amount from cents to dollars
      amount: listing.amount / 100,
    }));
    // console.log(listing); // listing is an empty array []
    return listing[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
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
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
