import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4">
      <h1 className="text-2xl font-semibold">Handcrafted Haven</h1>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
        {/*Icon Image */}
      </div>
    </header>
  );
};

export default Header;
