import React from 'react';

const SideNav: React.FC = () => {
  return (
    <nav className="w-64 bg-green-600 text-white min-h-screen p-5">
      <ul>
        <li className="mb-6">
          <a href="#you" className="text-xl">You</a>
        </li>
        <li className="mb-6">
          <a href="#shop" className="text-xl">Shop</a>
        </li>
        <li>
          <a href="#profile" className="text-xl">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
