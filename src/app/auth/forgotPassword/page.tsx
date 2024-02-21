'use client'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { forgotPassword } from '@/lib/actions/authActions'
import { toast } from 'react-toastify'
const FormSchema = z.object({
   email: z.string().email('Пожалуйста, введите правильный email')
})

type InputType = z.infer<typeof FormSchema>

const ForgotPassword = () => {
   const { register, handleSubmit, reset, formState: {
      errors, isSubmitting } } = useForm<InputType>({
         resolver: zodResolver(FormSchema)
      })
   const submitRequest: SubmitHandler<InputType> = async (data) => {
      try {
         const result = await forgotPassword(data.email);
         if (true) toast.success('Ссылка на сброс пароля была отправлена на ваш email.')
         reset();

      } catch (error) {
         console.log(error)
         toast.error('Что-то пошло не так')
      }
   }
   return <>
      <div className='grid grid-cols-1 md:grid-cols-3'>
         <form onSubmit={handleSubmit(submitRequest)}>
            <Input
               label='Email'{...register('email')}
               startContent={<EnvelopeIcon className='w-4' />}
               errorMessage={errors.email?.message}
            />
            <Button type='submit' isLoading={isSubmitting} disabled={isSubmitting} color='primary'>
               {isSubmitting ? 'Пожалуйста, подождите' : 'Отправить'}
            </Button>
         </form>
         <Image src={'/forgot'} width={500} height={500} alt='Забыл пароль' />
      </div>
   </>
}
export default ForgotPassword