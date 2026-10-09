import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import ScrollRestoration from '@/components/ScrollRestoration'
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
    default: 'Indhu V — Senior Product Designer, AI Products & 0→1 | Seattle',
    template: '%s | Indhu V'
  },
  description: 'Senior product designer with 8+ years taking 0→1 AI and enterprise products to launch. Founding designer at YC-backed Keye; lead designer on LAT, an enterprise AI platform for university operations. Based in Seattle.',
  keywords: ['senior product designer', '0 to 1 product designer', 'founding designer', 'AI product designer', 'enterprise SaaS design', 'Seattle product designer', 'San Francisco product designer', 'AI/ML product design', 'design systems', 'enterprise UX', 'YC designer'],
  authors: [{ name: 'Indhu V', url: 'https://indhu.design' }],
  creator: 'Indhu V',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://indhu.design',
    siteName: 'Indhu V — Senior Product Designer',
    title: 'Indhu V — Senior Product Designer, AI Products & 0→1',
    description: 'Senior product designer with 8+ years taking 0→1 AI and enterprise products to launch. Founding designer at YC-backed Keye; lead designer on LAT, an enterprise AI platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Indhu V — Senior Product Designer, AI Products & 0→1',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indhu V — Senior Product Designer, AI Products & 0→1',
    description: 'Senior product designer with 8+ years taking 0→1 AI and enterprise products to launch. Founding designer at YC-backed Keye; lead designer on LAT, an enterprise AI platform.',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
