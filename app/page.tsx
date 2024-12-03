import styles from "@/app/ui/style.module.css";
import CardWarper from "./ui/card";
import { Suspense } from "react";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="w-[1440px] h-[1024px] relative bg-white">
        <div className="w-[1196px] h-[248px] left-[244px] top-[123px] absolute bg-[#a5a5a5]" />
        <div className="w-[394px] h-[77px] left-[645px] top-[33px] absolute text-black text-[40px] font-normal font-['Inter'] leading-[48.45px]">
          Handcrafted Haven
        </div>
        <div className="w-[244px] h-[1024px] left-0 top-0 absolute bg-[#c8c8c8]" />
        <div className="w-[88px] h-[88px] left-[1299px] top-[13px] absolute bg-[#a5a5a5]" />
        <div className="w-[42px] h-[42px] left-[15px] top-[969px] absolute bg-[#e69f4e] rounded-full" />
        <div className="w-[42px] h-[42px] left-[1322px] top-[29px] absolute bg-[#59cf4e] rounded-full" />
        <div className="w-[42px] h-[42px] left-[1304px] top-[59px] absolute bg-[#59cf4e] rounded-full" />
        <div className="w-[148px] h-[148px] left-[333px] top-[466px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="w-[148px] h-[148px] left-[554px] top-[466px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="w-[147px] h-[148px] left-[775px] top-[466px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="w-[148px] h-[148px] left-[995px] top-[466px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="w-[148px] h-[148px] left-[1216px] top-[466px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="w-[65px] h-[65px] left-[23px] top-[13px] absolute bg-[#bcbcbc] rounded-full" />
        <div className="left-[285px] top-[740px] absolute justify-start items-center gap-[88px] inline-flex">
          <Suspense>
            <CardWarper />
          </Suspense>
        </div>
        <div className="w-[212px] h-[46px] left-[15px] top-[80px] absolute bg-[#a5a5a5] rounded-[39px]" />
        <div className="w-[198px] h-[30px] left-[285px] top-[691px] absolute text-black text-[32px] font-normal font-['Inter']">
          For You
        </div>
        <div className="w-[198px] h-[30px] left-[23px] top-[186px] absolute text-black text-[32px] font-normal font-['Inter']">
          For You
        </div>
        <div className="w-[198px] h-[30px] left-[22px] top-[247px] absolute text-black text-[32px] font-normal font-['Inter']">
          <h2>shop</h2>
        </div>
        <div className="w-[198px] h-[30px] left-[22px] top-[308px] absolute text-black text-[32px] font-normal font-['Inter']">
          Profile
        </div>
        <div className="w-[198px] h-[30px] left-[270px] top-[416px] absolute text-black text-[32px] font-normal font-['Inter']">
          Categories
        </div>
      </div>
    </main>
  );
}
