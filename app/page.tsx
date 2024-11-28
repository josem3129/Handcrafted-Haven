import styles from "./page.module.css";
import CardWarper from "./ui/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense>
       <CardWarper/>
        </Suspense>
      </main>
    </div>
  );
}
