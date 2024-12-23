import Image from "next/image";
import styles from "./page.module.css";
export default function Card() {
   return <>
      <div className={styles.div}>
         <Image src="" alt="" width={100} height={100}/>
         <p>Пельмени</p>
         <p>1000р <span>1кг</span></p>
         <button>Подробнее</button>
         <button>В корзину</button>
      </div>
   </>
}