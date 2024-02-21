import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
   searchParams: {
      callbackUrl?: string
   }
}

const SigninPage = ({ searchParams }: Props) => {

   return <>
      <div className="flex items-center justify-center flex-col">
         <SignInForm callbackUrl={searchParams.callbackUrl} />
         <Link href={'/auth/forgotPassword'}>
            Забыли пароль?
         </Link>
      </div>
   </>
}
export default SigninPage;