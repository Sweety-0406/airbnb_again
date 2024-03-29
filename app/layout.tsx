import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Component/Navbar/Navbar'
import ClientOnly from './Component/ClientOnly'
import ToasterProvider from './Provider/ToasterProvider'
import RegisterModal from './Component/Modals/RegisterModal'
import LoginModal from './Component/Modals/LoginModal'
import getCurrentUser from './action/getCurrentUser'
import RentModal from './Component/Modals/RentModal'
import { ThemeProvider } from './Component/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holidays Homes & Apartment Rentals - Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
            <ToasterProvider/>
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <Navbar currentUser={currentUser} />   
          </ClientOnly>
          <div className='pt-8 pb-8'>
            {children}
          </div>
          

      </body>
    </html>
  )
}
