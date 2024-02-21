'use client'
import { Input, Checkbox, Link, Button, } from "@nextui-org/react"
import { UserIcon, EnvelopeIcon, PhoneIcon, KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { z } from 'zod'
import validator from 'validator'
import { useForm, Controller } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordStrength } from "check-password-strength"
import PasswordStrength from "./PasswordStrength"
import { registerUser } from "@/lib/actions/authActions"
import { toast } from "react-toastify"

const FormSchema = z.object({
   firstName: z
      .string()
      .min(2, 'Имя должно быть минимум из 2 букв')
      .max(20, 'Не более 20 символов')
      .regex(new RegExp("^[a-zA-Z]+$"), "Нельзя символы"),

   lastName: z
      .string()
      .min(2, 'фамилия должно быть минимум из 2 букв')
      .max(20, 'Не более 20 символов'),
   email: z.string().email('Пожалуйста, введите корректный email'),
   phone: z.string().refine(validator.isMobilePhone, "Введите корректный телефон"),
   password: z
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .max(20, ' Пароль не должен привышать 20 символов'),
   confirmPassword: z
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .max(20, ' Пароль не должен привышать 20 символов'),
   accepted: z.literal(true, {
      errorMap: () => ({
         message: "Пожалуйста, примите все условия"
      })
   })
})
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword']
   });
type InputType = z.infer<typeof FormSchema>

const SignUpForm = () => {
   const { register,
      handleSubmit,
      reset,
      control,
      watch,
      formState: { errors } } = useForm<InputType>({
         resolver: zodResolver(FormSchema)
      })
   const [passStrength, setPassStrength] = useState(0)
   const [isVisiblePass, setIsVisiblePass] = useState(false)

   useEffect(() => {
      setPassStrength(passwordStrength(watch().password).id)
   }, [watch().password])

   const toggleVisblePass = () => setIsVisiblePass(prev => !prev)

   const saveUser: SubmitHandler<InputType> = async (data) => {
      const { accepted, confirmPassword, ...user } = data;
      try {
         const result = await registerUser(user)
         toast.success('Успешная регистрация')
      } catch (error) {
         toast.error('Возникла ошибка')
         console.error(error)
      }
   }

   return <>
      <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md">
         <Input
            errorMessage={errors.firstName?.message}
            isInvalid={!!errors.firstName}
            {...register('firstName')}
            label='Введите имя'
            startContent={< UserIcon className='w-4' />}
         />

         <Input
            errorMessage={errors.lastName?.message}
            isInvalid={!!errors.lastName}
            {...register('lastName')}
            label='Введите фамилию'
            startContent={<UserIcon className='w-4' />}
         />

         <Input
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            {...register('email')}
            className="col-span-2"
            label='Введите email'
            startContent={<EnvelopeIcon
               className='w-4' />}
         />

         <Input
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
            {...register('phone')}
            className="col-span-2"
            label='Введите телефон'
            startContent={<PhoneIcon className='w-4' />}
         />

         <Input
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register('password')}
            type={isVisiblePass ? 'text' : 'password'}
            className="col-span-2"
            label='Введите пароль'
            startContent={<KeyIcon className='w-4' />}
            endContent={
               isVisiblePass ? (<EyeSlashIcon className='w-4 cursor-pointer' onClick={toggleVisblePass} />) : (<EyeIcon className='w-4 cursor-pointer' onClick={toggleVisblePass} />)
            }
         />
         <PasswordStrength passStrength={passStrength} />
         <Input
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
            {...register('confirmPassword')}
            type={isVisiblePass ? 'text' : 'password'}
            className="col-span-2"
            label='Подтвердите пароль'
            startContent={<KeyIcon className='w-4' />}
         />
         <Controller
            control={control}
            name='accepted'
            render={({ field }) => (
               <Checkbox className="col-span-2"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
               >
                  Я принимаю условия
                  <Link href='/terms'>
                     Соглашения
                  </Link>
               </Checkbox>
            )} />
         {!!errors.accepted && <p className="text-red-500">{errors.accepted.message} </p>}
         <div className="flex justify-center col-span-2">
            <Button type='submit' color='primary' className="w-48"> Отправить
            </Button>
         </div>
      </form>
   </>
}
export default SignUpForm 