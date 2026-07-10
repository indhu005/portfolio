import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import ScrollRestoration from '@/components/ScrollRestoration'
import { Analytics } from '@vercel/analytics/react'

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
  title: 'Indhu — Product Designer',
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
        padding: '20px 0 0 0',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        <ScrollRestoration />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
