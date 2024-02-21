'use client'
import { Button } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link';
const SigninButton = () => {
   const { data: session } = useSession();
   console.log(session)
   return (
      <div className='flex items-center gap-2'>
         {session && session.user ? (
            <>
               <p>{`${session.user.firstName} ${session.user.lastName}`} <Button as={Link} href={'/pages/profile'}>Профиль</Button></p>
               <Link
                  href={'/api/auth/signout'}
                  className='text-sky-500 hover:text-sky-600
               transition-color'
               >
                  Sign Out
               </Link>
            </>
         ) : (
            <>
               <Button onClick={() => signIn()}>
                  Sign In
               </Button>
               <Button as={Link} href={'/auth/signup'}>
                  Sign Up
               </Button>
            </>
         )}
      </div>
   )
}

export default SigninButton