import Link from "next/link";

export default function Footer() {
   return <>
      <div>
         лого
      </div>
      <div>
         <Link href={''}>
            Главная
         </Link>
         <Link href={''}>
            Каталог
         </Link>
         <Link href={''}>
            О нас
         </Link>
         <Link href={''}>
            Контакты
         </Link>
         <Link href={''}>
            Корзина
         </Link>
      </div>
   </>
}