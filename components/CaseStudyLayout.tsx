'use client'
import { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import { CaseStudyStructuredData } from './StructuredData'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

interface Section {
  id: string
  title: string
  headline?: string
  content: string
  customComponent?: React.ReactNode
}

interface TldrData {
  role: string
  team: string
  timeline: string
  impact: string
  skills: string
}

interface BriefData {
  context: string
  constraint: string
  decision: string
  tradeoff: string
}

interface CaseStudy {
  title: string
  subtitle: string
  description: string
  tldr?: TldrData
  brief?: BriefData
  sections: Section[]
  heroImage?: string
  figmaPrototypeUrl?: string
}

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy
  slug: string
}

export default function CaseStudyLayout({ caseStudy, slug }: CaseStudyLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('snapshot')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  // Scroll to top on mount
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      ticking = false
      if (!contentRef.current) return

      const scrollPosition = contentRef.current.scrollTop + 150

      for (const section of caseStudy.sections) {
        const element = sectionRefs.current[section.id]
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetBottom = offsetTop + element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(prev => (prev === section.id ? prev : section.id))
          break
        }
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActiveSection)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true })
      return () => contentElement.removeEventListener('scroll', handleScroll)
    }
  }, [caseStudy.sections])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId] || document.getElementById(sectionId)
    if (element && contentRef.current) {
      const containerRect = contentRef.current.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const offsetTop = contentRef.current.scrollTop + (elementRect.top - containerRect.top) - 100
      contentRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <CaseStudyStructuredData
        title={`${caseStudy.title} — ${caseStudy.subtitle}`}
        description={caseStudy.description}
        url={`https://indhu.design/work/${slug}`}
        imageUrl={`https://indhu.design/og-${slug}.png`}
      />
      <div style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        width: '100vw',
      }}>
        {/* SIDEBAR - Hidden on mobile/tablet */}
        {!isTablet && (
          <Sidebar
            activeProject={slug}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            sections={caseStudy.sections}
          />
        )}

      {/* MOBILE MENU BUTTON */}
      {isTablet && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
        </button>
      )}

      {/* MOBILE/TABLET OVERLAY MENU */}
      {isTablet && mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFFFF',
            zIndex: 999,
            overflowY: 'auto',
            padding: '80px 20px 20px 20px',
          }}
        >
          <Sidebar
            activeProject={slug}
            activeSection={activeSection}
            onSectionClick={(sectionId) => {
              scrollToSection(sectionId)
              setMobileMenuOpen(false)
            }}
            sections={caseStudy.sections}
          />
        </div>
      )}

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        {/* CONTENT AREA - The "TV" that scrolls */}
        <div
          ref={contentRef}
          data-scroll-container
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '88px 20px 40px 20px' : isTablet ? '96px 32px 50px 32px' : '56px 48px 60px 48px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Case study header — replaces the old thin topbar */}
          <div style={{
            maxWidth: isMobile || isTablet ? '850px' : '1020px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: isMobile ? '40px' : isTablet ? '56px' : '64px',
          }}>
            <h1 style={{
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: isMobile ? '14px' : '18px',
            }}>{caseStudy.title}</h1>
            <p style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '28px' : isTablet ? '36px' : '46px',
              fontWeight: 600,
              color: '#1C1917',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {caseStudy.subtitle}
              {caseStudy.description ? ` — ${caseStudy.description}` : ''}
            </p>

            {caseStudy.figmaPrototypeUrl && (
              <a
                href={caseStudy.figmaPrototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: isMobile ? '20px' : '28px',
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  borderRadius: '0px',
                  padding: '10px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(28, 25, 23, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                See Prototype →
              </a>
            )}
          </div>

          {caseStudy.sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el }}
              style={{
                marginBottom: index === caseStudy.sections.length - 1 ? '0' : '112px',
                maxWidth: isMobile || isTablet ? '850px' : '1020px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* Hero Image for first section (Snapshot) */}
              {index === 0 && (
                caseStudy.heroImage ? (
                  <img
                    src={caseStudy.heroImage}
                    alt={`${caseStudy.title} hero`}
                    style={{
                      width: '100%',
                      maxWidth: isMobile || isTablet ? '850px' : '1020px',
                      height: 'auto',
                      borderRadius: '0px',
                      marginBottom: '50px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    maxWidth: isMobile || isTablet ? '850px' : '1020px',
                    height: '580px',
                    backgroundColor: '#7EB3F5',
                    borderRadius: '0px',
                    marginBottom: '50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '48px',
                    fontWeight: 700,
                  }}>
                    {caseStudy.title} Hero
                  </div>
                )
              )}

              {/* Brief Section - Context/Constraint/Decision/Tradeoff, appears before TL;DR. Fused into one card with the TL;DR block below it. */}
              {index === 0 && caseStudy.brief && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                  gap: isMobile ? '20px' : '0',
                  padding: isMobile ? '24px' : '28px 32px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderBottom: 'none',
                  borderRadius: '0px',
                  maxWidth: isMobile || isTablet ? '850px' : '1020px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  {([
                    ['Context', caseStudy.brief.context],
                    ['Constraint', caseStudy.brief.constraint],
                    ['Decision', caseStudy.brief.decision],
                    ['Tradeoff', caseStudy.brief.tradeoff],
                  ] as [string, string][]).map(([label, text], i) => (
                    <div key={label} style={{
                      padding: isMobile ? '0' : (i === 0 ? '0 20px 0 0' : '0 20px'),
                      borderLeft: !isMobile && i > 0 ? '1px solid #E5E7EB' : 'none',
                    }}>
                      <div style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: '#A8A29E',
                        marginBottom: '8px',
                      }}>{label}</div>
                      <div style={{
                        fontSize: '13.5px',
                        lineHeight: 1.5,
                        color: '#44403C',
                      }}>{text}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* TL;DR Section - appears after hero image */}
              {index === 0 && caseStudy.tldr && (
                <div style={{
                  marginBottom: '60px',
                  padding: isMobile ? '24px' : '32px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '0px',
                  border: '1px solid #E5E7EB',
                  borderTop: caseStudy.brief ? '1px solid #E5E7EB' : undefined,
                  maxWidth: isMobile || isTablet ? '850px' : '1020px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}>
                    <h2 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: 700,
                      color: '#1C1917',
                      margin: 0,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}>TL;DR</h2>

                    {/* Skip to Impact / See Prototype Button */}
                    <button
                      onClick={() => scrollToSection(slug === 'misinformation-center' ? 'prototype' : 'impact')}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '0px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(28, 25, 23, 0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {slug === 'misinformation-center' ? 'See Prototype →' : 'Skip to Impact →'}
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: isMobile ? '16px' : '24px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Role</div>
                      <div style={{ color: '#1C1917' }}>{caseStudy.tldr.role}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Team</div>
                      <div style={{ color: '#1C1917' }}>{caseStudy.tldr.team}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Timeline</div>
                      <div style={{ color: '#1C1917' }}>{caseStudy.tldr.timeline}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Impact</div>
                      <div className="tldr-impact-badge">{caseStudy.tldr.impact}</div>
                    </div>
                    <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Key Skills</div>
                      <div style={{ color: '#1C1917' }}>{caseStudy.tldr.skills}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Label */}
              <h2 style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                marginTop: 0,
                fontFamily: 'inherit',
                maxWidth: isMobile || isTablet ? '850px' : '1020px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                {section.title}
              </h2>

              {/* Section Headline */}
              {section.headline && (
                <h3 style={{
                  fontSize: isMobile ? '23px' : '28px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '24px',
                  lineHeight: '1.3',
                  fontFamily: 'var(--font-fraunces), serif',
                  maxWidth: isMobile || isTablet ? '850px' : '1020px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  {section.headline}
                </h3>
              )}

              {/* Section Text */}
              {section.customComponent ? (
                <div
                  className="case-study-content"
                  style={{
                    marginBottom: '32px',
                    maxWidth: isMobile || isTablet ? '850px' : '1020px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {section.customComponent}
                </div>
              ) : (
                <div
                  className="case-study-content"
                  style={{
                    marginBottom: '32px',
                    maxWidth: isMobile || isTablet ? '850px' : '1020px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}

              {/* Visual Content Area - Hidden for strategy, constraints, tradeoffs, context-problem, turning-point, snapshot, problem, research, and reflection sections, and for sections that already embed real media via customComponent */}
              {!section.customComponent && section.id !== 'strategy' && section.id !== 'constraints' && section.id !== 'tradeoffs' && section.id !== 'context-problem' && section.id !== 'turning-point' && section.id !== 'snapshot' && section.id !== 'problem' && section.id !== 'research' && section.id !== 'reflection' && section.id !== 'market' && section.id !== 'truemedia' && section.id !== 'credit-system' && section.id !== 'product-card' && section.id !== 'extension' && section.id !== 'feature-index' && section.id !== 'impact' && (
                <div style={{
                  width: '100%',
                  minHeight: '500px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '40px',
                  color: '#9CA3AF',
                  fontSize: '14px',
                }}>
                  <div>📸 Image / Video / Figma Embed</div>
                  <div style={{ fontSize: '12px', textAlign: 'center' }}>
                    Replace with: &lt;img&gt;, &lt;video&gt;, or &lt;iframe&gt; for Figma prototypes
                  </div>
                  <div style={{ fontSize: '12px', color: '#D1D5DB' }}>
                    Section: {section.title}
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* Next Case Study Navigation */}
          {(() => {
            const caseStudies = [
              { name: 'Keye', slug: 'keye', subtitle: 'Subscription Marketplace' },
              { name: 'LAT', slug: 'lat', subtitle: 'Lifecycle Assessment Tracker' },
              { name: 'Misinformation Center', slug: 'misinformation-center', subtitle: 'Media Literacy Tools' },
            ]
            const currentIndex = caseStudies.findIndex(cs => cs.slug === slug)
            const nextIndex = (currentIndex + 1) % caseStudies.length
            const nextStudy = caseStudies[nextIndex]

            return (
              <div style={{
                marginTop: '120px',
                paddingTop: '60px',
                borderTop: '1px solid rgba(0,0,0,0.08)',
              }}>
                <a
                  href={`/work/${nextStudy.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: '#1C1917',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div>
                    <div style={{
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>
                      Next Case Study
                    </div>
                    <div style={{
                      fontSize: isMobile ? '24px' : '32px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-fraunces), serif',
                      marginBottom: '4px',
                    }}>
                      {nextStudy.name}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 400,
                      color: '#6B7280',
                    }}>
                      {nextStudy.subtitle}
                    </div>
                  </div>
                  <div style={{
                    fontSize: isMobile ? '32px' : '48px',
                    fontWeight: 300,
                    color: 'var(--accent)',
                  }}>
                    →
                  </div>
                </a>
              </div>
            )
          })()}

          {/* Bottom bar — quick contact links */}
          <div style={{
            maxWidth: isMobile || isTablet ? '850px' : '1020px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '64px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            gap: isMobile ? '20px' : '32px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {[
              { label: 'Email', href: 'mailto:indhuve05@gmail.com' },
              { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/indhu05/' },
              { label: 'Resume ↗', href: '/resume.pdf' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                style={{
                  fontSize: isMobile ? '15px' : '16px',
                  fontWeight: 500,
                  color: '#1C1917',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'transparent' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
