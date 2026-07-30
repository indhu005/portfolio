import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import ScrollRestoration from '@/components/ScrollRestoration'
import PixelCursor from '@/components/PixelCursor'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
    default: 'Indhu V — Product Designer',
    template: '%s | Indhu V'
  },
  description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research. Previously founding designer at YC-backed Keye, enterprise UX for universities.',
  keywords: ['product designer', 'UX designer', 'UI designer', 'Seattle designer', 'AI product design', 'ML design', 'design systems', 'user research', 'enterprise UX', 'YC designer'],
  authors: [{ name: 'Indhu V', url: 'https://indhu.design' }],
  creator: 'Indhu V',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://indhu.design',
    siteName: 'Indhu V — Product Designer',
    title: 'Indhu V — Product Designer',
    description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Indhu V — Product Designer',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indhu V — Product Designer',
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
      <head>
        <link rel="dns-prefetch" href="https://embed.figma.com" />
        <link rel="preconnect" href="https://embed.figma.com" crossOrigin="anonymous" />
      </head>
      <body className={dmSans.className} style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#FFFFFF',
      }}>
        <PersonStructuredData />
        <PortfolioStructuredData />
        <ScrollRestoration />
        <PixelCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
