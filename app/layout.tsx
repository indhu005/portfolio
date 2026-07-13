import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import ScrollRestoration from '@/components/ScrollRestoration'
import { Analytics } from '@vercel/analytics/react'
import { PersonStructuredData, PortfolioStructuredData } from '@/components/StructuredData'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://indhu.design'),
  title: {
    default: 'Indhu Vasan — Product Designer',
    template: '%s | Indhu Vasan'
  },
  description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research. Previously founding designer at YC-backed Keye, enterprise UX for universities.',
  keywords: ['product designer', 'UX designer', 'UI designer', 'Seattle designer', 'AI product design', 'ML design', 'design systems', 'user research', 'enterprise UX', 'YC designer'],
  authors: [{ name: 'Indhu Vasan', url: 'https://indhu.design' }],
  creator: 'Indhu Vasan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://indhu.design',
    siteName: 'Indhu Vasan — Product Designer',
    title: 'Indhu Vasan — Product Designer',
    description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Indhu Vasan — Product Designer',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indhu Vasan — Product Designer',
    description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research.',
    images: ['/og-image.png'],
    creator: '@indhu_design'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className={dmSans.className} style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        <PersonStructuredData />
        <PortfolioStructuredData />
        <ScrollRestoration />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
