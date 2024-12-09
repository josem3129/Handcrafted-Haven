import { playfair } from "@/app/ui/fonts";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Customers',
};
export default function Page(){
    return <h1 className={`${playfair.className} text-2xl`}>Add Listing</h1>
}