import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../Component/Navbar/Navbar'
import ClientOnly from '../Component/ClientOnly'
import ToasterProvider from '../Provider/ToasterProvider'
import RegisterModal from '../Component/Modals/RegisterModal'
import LoginModal from '../Component/Modals/LoginModal'
import getCurrentUser from './action/getCurrentUser'
import RentModal from '../Component/Modals/RentModal'
import SearchModal from '../Component/Modals/SearchModal'
import {NextIntlClientProvider, useLocale} from 'next-intl'
import { getMessages } from 'next-intl/server'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Holidays Homes & Apartment Rentals - Airbnb',
}

export default async function RootLayout({
  children,
  params: {locale}

}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const currentUser = await getCurrentUser();
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>

        <ClientOnly>
            <ToasterProvider/>
            <RegisterModal />
            <LoginModal />
            <SearchModal />
            <RentModal />
            <Navbar currentUser={currentUser} />   
          </ClientOnly>
          <div className='pt-8 pb-8'>
            {children}
          </div>
      </NextIntlClientProvider>
          

      </body>
    </html>
  )
}
