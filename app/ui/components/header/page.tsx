import Link from "next/link";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { LuChefHat } from "react-icons/lu";
import { TiContacts } from "react-icons/ti";
import styles from "./page.module.css";

export default function Header() {
   return (
      <header className={styles.header}>
         <div className={styles.logo}>
            ЛОГО
         </div>
         <nav className={styles.navLinks}>
            <Link href="/" className={styles.link}>
               <FaHome />
               Главная
            </Link>
            <Link href="../../../pages/catalog" className={styles.link}>
               <BiCategoryAlt />
               Каталог
            </Link>
            <Link href="/about" className={styles.link}>
               <LuChefHat />
               О нас
            </Link>
            <Link href="/contact" className={styles.link}>
               <TiContacts />
               Контакты
            </Link>
            <Link href="/cart" className={styles.link}>
               <FaShoppingCart />
               Корзина
            </Link>
         </nav>
         <div className={styles.buttons}>
            <Link href="/login">
               <button>Вход</button>
            </Link>
            <Link href="/register">
               <button>Регистрация</button>
            </Link>
         </div>
      </header>
   );
}