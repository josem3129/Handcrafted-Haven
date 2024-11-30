import styles from "@/app/ui/style.module.css";
import CardWarper from "./ui/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <Suspense>
       <CardWarper/>
        </Suspense>
      </main>
    </div>
  );
}
