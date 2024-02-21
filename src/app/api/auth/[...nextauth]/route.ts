import prisma from "@/lib/prisma"
import { AuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import { User } from "@prisma/client"

export const authOptions: AuthOptions = {
   pages: {
      signIn: '/auth/signin',
   },
   providers: [

      CredentialProvider({
         name: 'Credential',

         credentials: {
            username: {
               label: 'User Name',
               type: 'text',
               placeholder: 'User Name'
            },
            password: {
               label: 'Password',
               type: 'password',
            }
         },

         async authorize(credentials) {
            const user = await prisma.user.findUnique({
               where: {
                  email: credentials?.username
               },
            });
            if (!user) throw new Error('имя пользователя или пароль не найден ')
            if (!credentials?.password) throw new Error('Не корректный пароль')
            const isPasswordCurrent = await bcrypt.compare(credentials.password, user.password)
            if (!isPasswordCurrent) throw new Error('Имя пользователя или пароль не верный ')
            if (!user.emailVerified)
               throw new Error('Пожалуйста, подтвердите свой email.')
            const { password, ...userWithoutPass } = user
            return userWithoutPass;
         },
      }),

   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) token.user = user as User;
         return token;
      },
      async session({ token, session }) {
         session.user = token.user
         return session;
      }
   }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };