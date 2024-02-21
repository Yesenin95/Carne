'use client'
import { resetPassword } from "@/lib/actions/authActions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod"
import PasswordStrength from "./PasswordStrength";

interface Props {
   jwtUserId: string
}
const FormSchema = z.object({
   password: z
      .string()
      .min(6, 'Пароль меньше 6 символов')
      .max(24, 'Не более 24 символов'),
   confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
   message: 'Пароли не совпадают',
   path: ['confirmPassword']
});

type InputType = z.infer<typeof FormSchema>
const ResetPasswordForm = ({ jwtUserId }: Props) => {
   const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<InputType>({
      resolver: zodResolver(FormSchema)
   })
   const [visiblePass, setVisiblePass] = useState(false)
   const [passStrength, setPassStrength] = useState(0)

   useEffect(() => {
      setPassStrength(passwordStrength(watch().password).id)
   }, [watch().password])

   const resetPass: SubmitHandler<InputType>
      = async (data) => {

         try {
            const result = await resetPassword(jwtUserId, data.password)
            if (result === 'success') {
               toast.success('Пароль успешно сброшен')
               
            }
         } catch (error) {
            toast.error('Что-то пошло не так')
            console.log(error)
         }

      }
   return <>
      <form className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow" onSubmit={handleSubmit(resetPass)}>
         <div className='text-center p-3'> Сбросить пароль </div>
         <Input
            type={visiblePass ? 'text' : 'password'}
            label='password'
            {...register('password')}
            errorMessage={errors.password?.message}
            endContent={
               <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                  {visiblePass ? (<EyeSlashIcon className="w-4" />) : (<EyeIcon className="w-4" />)}
               </button>}
         />
         <PasswordStrength passStrength={passStrength} />
         <Input
            type={visiblePass ? 'text' : 'password'}
            label='confirmPassword'
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
         />
         <div className="flex justify-center">
            <Button type='submit' isLoading={isSubmitting} disabled={isSubmitting} color='primary'>
               {isSubmitting ? 'Пожалуйста, подождите' : 'Отправить'}
            </Button>
         </div>
      </form>
   </>
}
export default ResetPasswordForm