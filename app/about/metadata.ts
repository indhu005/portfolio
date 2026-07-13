import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Product designer who came to design from architecture. Based in Seattle, previously Chicago, Milwaukee, LA, and New York. Passionate about AI, user research, and design systems.',
  openGraph: {
    title: 'About Indhu Vasan',
    description: 'Product designer who came to design from architecture. Based in Seattle, previously Chicago, Milwaukee, LA, and New York.',
    url: 'https://indhu.design/about',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Indhu Vasan',
    description: 'Product designer who came to design from architecture. Based in Seattle.',
  }
}
