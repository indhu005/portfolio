'use client'

export function PersonStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Indhu V',
    jobTitle: 'Product Designer',
    url: 'https://indhu.design',
    email: 'indhu.vasven@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US'
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Washington'
      }
    ],
    sameAs: [
      'https://www.linkedin.com/in/indhu05/',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Independent'
    },
    knowsAbout: [
      'Product Design',
      'UX Design',
      'UI Design',
      'Design Systems',
      'User Research',
      'AI/ML Product Design',
      'Enterprise UX'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function PortfolioStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Indhu V — Product Designer',
    url: 'https://indhu.design',
    description: 'Product designer in Seattle specializing in AI/ML products, design systems, and user research.',
    author: {
      '@type': 'Person',
      name: 'Indhu V'
    },
    mainEntity: {
      '@type': 'Person',
      name: 'Indhu V',
      jobTitle: 'Product Designer'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface CaseStudyStructuredDataProps {
  title: string
  description: string
  datePublished?: string
  dateModified?: string
  url: string
  imageUrl?: string
}

export function CaseStudyStructuredData({
  title,
  description,
  datePublished = '2024-01-01',
  dateModified = new Date().toISOString().split('T')[0],
  url,
  imageUrl
}: CaseStudyStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Indhu V',
      url: 'https://indhu.design'
    },
    datePublished,
    dateModified,
    url,
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
