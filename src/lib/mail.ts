import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { activationTemplate } from './emailTemplatess/activation';
import { reserPassword } from './emailTemplatess/resetPass';
export async function sendMail({ to, subject, body }: { to: string, subject: string, body: string }) {
   const { SMPT_EMAIL, SMPT_GMAIL_PASS, SMPT_USER, SMPT_PASS } = process.env
   // const transport = nodemailer.createTransport({
   //    service: 'gmail',
   //    auth: {
   //       user: SMPT_EMAIL,
   //       pass: SMPT_GMAIL_PASS
   //    },
   // })
   const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: SMPT_USER,
         pass: SMPT_PASS
      }
   });
   try {
      const testResult = await transport.verify();
      console.log('Test', testResult)
   } catch (error) {
      console.log(error)
   }
   try {
      const sendResult = await transport.sendMail({
         from: SMPT_EMAIL,
         to,
         subject,
         html: body
      })
      console.log({ sendResult })
   } catch (error) {
      console.log(error)
   }
}

export function compileActivationTemplate(name: string, url: string) {
   const template = Handlebars.compile(activationTemplate);
   const htmlBody = template({
      name,
      url,
   })
   return htmlBody
}
export function compileResetPassTemplate(name: string, url: string) {
   const template = Handlebars.compile(reserPassword);
   const htmlBody = template({
      name,
      url,
   })
   return htmlBody
}