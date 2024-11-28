// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Linda',
    email: 'user@nextmail.com',
    password: '123456',
    tear : 'admin' 
  },
  {
    id: '831faef7-a554-4f02-a324-e20baa0a16f6',
    name: 'Micheal',
    email: 'user1@nextmail.com',
    password: '123456', 
    tear : 'seller'
  },
  {
    id: 'ee0a18e1-35cf-45bb-b77f-69394649be55',
    name: 'Luis',
    email: 'user2@nextmail.com',
    password: '123456', 
    tear: 'buyer'
  },
  {
    id: '33a7ff86-921c-4aa6-aadf-3ca83f336159',
    name: 'Amanda',
    email: 'user3@nextmail.com',
    password: '123456',
    tear: 'seller' 
  },
  {
    id: 'cbe6813d-bb4f-4b9a-bab4-ef05b2aaa1d0',
    name: 'Chloe',
    email: 'user4@nextmail.com',
    password: '123456',
    tear: 'buyer' 
  },
];

const listing = [
  {
    id: 'd4aeb11c-8a8b-48d4-9391-85fd1002a00c',
    user_id: users[0].id,
    name: users[0].name,
    title: 'Handcrafted Paper Flower Painting',
    amount: 999,
    image_url: 'images/ai-generated-8510943_1280.webp',
    product_description: 'A beautiful handcrafted paper flower artwork, perfect for home decoration.',
    date: '2023-06-09',
  },
  {
    id: 'a23721e4-098a-4534-adac-f9c8484c0e77',
    user_id: users[1].id,
    name: users[1].name,
    title: 'Vintage Wooden Chess Set',
    amount: 1999,
    image_url: 'images/chess-634366_1280.webp',
    product_description: 'A vintage wooden chess set with intricate carvings, a collector’s dream.',
    date: '2023-06-17',
  },
  {
    id: '6dc2869e-5c94-49f6-8632-167c4f2b0e2f',
    user_id: users[2].id,
    name: users[2].name,
    title: 'Handmade Cloth Heart Sculpture',
    amount: 499,
    image_url: 'images/heart-6972452_640.webp',
    product_description: 'A charming handmade cloth heart, perfect for gifting to loved ones.',
    date: '2023-06-07',
  },
  {
    id: '092086e1-f6a0-4ff1-a023-bf4122872fb1',
    user_id: users[3].id,
    name: users[3].name,
    title: 'Ceramic Cat Mug',
    amount: 399,
    image_url: 'images/mug-1699076_1280.webp',
    product_description: 'A cute ceramic mug with a hand-painted cat design.',
    date: '2023-08-19',
  },
  {
    id: '3b08fcd8-75bf-4277-95da-277755c548fa',
    user_id: users[4].id,
    name: users[4].name,
    title: 'Plush Dolls Collection',
    amount: 799,
    image_url: 'images/plush-dolls-228885_1280.webp',
    product_description: 'A set of colorful and soft plush dolls for children.',
    date: '2023-06-03',
  },
];

const review = [
  {
    listing_id: listing[0].id,
    rating: 3,
    review: "Best art ever! A lovely piece of artwork to brighten up the home.",
  },
  {
    listing_id: listing[1].id,
    rating: 4,
    review: "I’m absolutely in love with this handcrafted leather wallet! The quality is outstanding—every stitch is perfect, and the leather feels rich and durable. I’ll be recommending it to all my friends!",
  },
  {
    listing_id: listing[2].id,
    rating: 5,
    review: "A beautiful piece of art that brings warmth and love to my home. Highly recommended.",
  },
  {
    listing_id: listing[4].id,
    rating: 4,
    review: "I couldn't be more pleased with this beautiful handcrafted ceramic mug. The glaze is smooth and vibrant, and the craftsmanship is top-notch. Highly recommend!",
  },
  {
    listing_id: listing[4].id,
    rating: 3,
    review: "Love it!! A perfect addition to my collection of ceramic mugs.",
  },
  {
    listing_id: listing[3].id,
    rating: 5,
    review: "I’m absolutely in love with this handcrafted wooden jewelry box! The craftsmanship is incredible and the intricate carvings are stunning. Worth every penny!",
  },
  {
    listing_id: listing[2].id,
    rating: 3,
    review: "It’s ok. The heart sculpture is cute, but it doesn’t quite match my home decor.",
  },
];

export { users, listing, review };
