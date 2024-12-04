import React from "react";
import SideNav from "@/app/ui/sidenav";
import Header from "@/app/ui/header";
import '@/app/global.css'

export default function Home() {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <SideNav />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <Header />

        {/* Banner Section */}
        <section className="mt-6">
          <img src="https://fastly.picsum.photos/id/837/1196/250.jpg?hmac=MtjA6BAml2jxHCZLrEkY50WYrtSAtdX18cA39dbZI2g"/>
        </section>

        {/* Suggested Items */}
        <section className="mt-8 px-6">
          <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/*Item Image Here*/}
              <p>Item 1</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/*Item Image Here*/}
              <p>Item 2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/*Item Image Here*/}
              <p>Item 3</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8 px-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="w-[100px] h-[100px] bg-[#bcbcbc] rounded-full flex items-center justify-center mb-2"> {/*Category Image Here use <img>*/}
              <h3>Category 1</h3>
            </div>
            <div className="w-[100px] h-[100px] bg-[#bcbcbc] rounded-full flex items-center justify-center mb-2"> {/*Category Image Here use <img>*/}
              <h3>Category 2</h3>
            </div>
            <div className="w-[100px] h-[100px] bg-[#bcbcbc] rounded-full flex items-center justify-center mb-2"> {/*Category Image Here use <img>*/}
              <h3>Category 3</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
