import Link from 'next/link';
import { Suspense } from 'react';
import LandingCardWrapper from './ui/landingCards';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      

<div className="flex flex-col h-screen justify-between bg-gray-50">
      {/* Header Section */}
      <header className="bg-green-600 text-white py-16 text-center rounded-lg">
        <h1 className=" text-5xl font-bold">Handcrafted Haven</h1>
        <p className="mt-4 text-lg">Your destination for unique, handcrafted products.</p>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <Suspense>
          <LandingCardWrapper/>
        </Suspense>
        <p className="text-xl text-gray-700 mb-6 text-center max-w-3xl mt-5">
          Discover beautiful, one-of-a-kind items that are carefully crafted by skilled artisans. 
          Whether you're looking for home decor, accessories, or gifts, Handcrafted Haven has something special for everyone.
        </p>
        <Link 
          // onClick={() => alert('Explore our collection!')} 
          href="/login"
          className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300"
        >
          Explore Now
        </Link>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center rounded-lg">
        <p>&copy; 2024 Handcrafted Haven. All Rights Reserved.</p>
      </footer>
    </div>
    </main>
  );
}
