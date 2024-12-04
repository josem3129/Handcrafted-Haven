import CardWarper from "@/app/ui/card";
import { Suspense } from "react";
export default function Page() {
    return (
    <main><p>Shop</p>;
    <Suspense>
    <CardWarper />
  </Suspense></main>
  )}