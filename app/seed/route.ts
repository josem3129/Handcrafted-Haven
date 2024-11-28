import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { listing, users, review } from "@/lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      tear TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, tear)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.tear})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedListing() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS listings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      title TEXT NOT NULL,
      amount INT NOT NULL,
      image_url TEXT NOT NULL,
      product_description VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedListing = await Promise.all(
    listing.map(
      (listings) => client.sql`
        INSERT INTO listings (id, user_id, name, title, amount, image_url, product_description, date)
        VALUES (${listings.id}, ${listings.user_id}, ${listings.name},${listings.title}, ${listings.amount}, ${listings.image_url}, ${listings.product_description} , ${listings.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedListing;
}

async function seedReview() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      listing_id UUID NOT NULL,
      rating INT NOT NULL,
      review VARCHAR(255) NOT NULL
    );
  `;

  const insertedReviews = await Promise.all(
    review.map(
      (reviews) => client.sql`
        INSERT INTO reviews (listing_id, rating, review)
        VALUES (${reviews.listing_id}, ${reviews.rating}, ${reviews.review})
        ON CONFLICT (listing_id) DO NOTHING;
      `,
    ),
  );

  return insertedReviews;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedListing();
    await seedReview();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
