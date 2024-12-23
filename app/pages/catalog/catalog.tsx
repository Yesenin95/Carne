'use client'
import Card from "@/app/ui/components/card/card";
import styles from "./page.module.css";
export default function Catalog() {
   return <>
      <section className={styles.section}>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
      </section>
   </>
}