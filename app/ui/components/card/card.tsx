import styles from "./page.module.css";
export default function Card() {
   return <>
      <div className={styles.div}>
         <img src="" alt="" />
         <p>Пельмени</p>
         <p>1000р <span>1кг</span></p>
         <button>Подробнее</button>
         <button>В корзину</button>
      </div>
   </>
}