import { Suspense } from "react"
import GetUserWelcome from "@/app/ui/dashboard/welcome"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Dashboard',
  };
export default function dashboard (){
    return (
        <Suspense>
           < GetUserWelcome/>
        </Suspense>
    )
}