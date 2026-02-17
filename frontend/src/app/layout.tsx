import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CurrencyProvider } from '@/contexts/CurrencyContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gamza Tounsia - Authentic Tunisian Handcrafted Products',
  description: 'Discover authentic Tunisian handcrafted products from Gamza Tounsia - traditional ceramics, textiles, jewelry and home decor made by skilled artisans',
  icons: {
    icon: '/gamza-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/gamza-logo.png" />
      </head>
      <body className={inter.className}>
        <CurrencyProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CurrencyProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
