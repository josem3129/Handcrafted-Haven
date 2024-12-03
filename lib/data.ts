import { sql } from "@vercel/postgres";
import { listingTable } from "./definitions";

export async function fetchCardData() {
    try {
        const data = await sql<listingTable>`
          SELECT  listings.title, listings.image_url, listings.id
          FROM listings
          ORDER BY listings.date DESC
            LIMIT 9`;
    
        const latestListings = data.rows.map((listing) => ({

          id: listing.id,
          title: listing.title,
          image_url: listing.image_url
        }));

        console.log(latestListings);
        
        return latestListings;

      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
      }
  }