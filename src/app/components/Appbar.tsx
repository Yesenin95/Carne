import { Navbar, NavbarContent, NavbarItem, } from "@nextui-org/react"
import Link from "next/link"
import SigninButton from "./SigninButton"


const Appbar = () => {
   return <>
      <Navbar isBordered>
         <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
               <Link
                  color="foreground"
                  href="/"
                  className="hover:text-sky-500 "
               >
                  Home
               </Link>
            </NavbarItem>
         </NavbarContent>
         <NavbarContent justify="end">
            <NavbarItem>
               <SigninButton />
            </NavbarItem>
         </NavbarContent>
      </Navbar>
   </>
}
export default Appbar