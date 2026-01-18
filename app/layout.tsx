import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AA Wheel & Truck Supply - Your Trusted Truck Parts Partner',
  description: 'Supplying Quality Truck & Trailer Parts Nationwide. Heavy-duty truck parts, air brake components, trailer axle components, and much more.',
  keywords: 'truck parts, trailer parts, heavy-duty parts, brake components, axle parts, truck supply',
  openGraph: {
    title: 'AA Wheel & Truck Supply',
    description: 'Your trusted partner for the right part, on time, every time!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

