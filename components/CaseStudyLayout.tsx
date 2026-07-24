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

interface CaseStudy {
  title: string
  subtitle: string
  description: string
  tldr?: TldrData
  sections: Section[]
  heroImage?: string
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
    const element = sectionRefs.current[sectionId]
    if (element && contentRef.current) {
      const offsetTop = element.offsetTop - 100
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
            borderRadius: '8px',
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
        {/* TOPBAR - Same as home page for "channel switching" feel */}
        <div style={{
          height: isMobile ? '60px' : '72px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 48px 0 48px',
          paddingBottom: isMobile ? '16px' : '20px',
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: isMobile ? 'center' : 'space-between',
            maxWidth: '850px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'inherit',
                fontSize: isMobile ? '14px' : isTablet ? '14px' : '16px',
                fontWeight: 700,
                color: '#1C1917',
                lineHeight: '1',
              }}>{caseStudy.title}</span>
              {!isMobile && !isTablet && (
                <span style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#9CA3AF',
                  lineHeight: '1',
                }}>— {caseStudy.subtitle}</span>
              )}
            </div>
            {!isMobile && !isTablet && (
              <span style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#9CA3AF',
                lineHeight: '1',
              }}>{caseStudy.description}</span>
            )}
          </div>
        </div>

        {/* CONTENT AREA - The "TV" that scrolls */}
        <div
          ref={contentRef}
          data-scroll-container
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : '0 48px 60px 48px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {caseStudy.sections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el }}
              style={{
                marginBottom: index === caseStudy.sections.length - 1 ? '0' : '112px',
                maxWidth: '850px',
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
                      maxWidth: '850px',
                      height: 'auto',
                      borderRadius: '12px',
                      marginBottom: '50px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    maxWidth: '850px',
                    height: '580px',
                    backgroundColor: '#7EB3F5',
                    borderRadius: '12px',
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

              {/* TL;DR Section - appears after hero image */}
              {index === 0 && caseStudy.tldr && (
                <div style={{
                  marginBottom: '60px',
                  padding: isMobile ? '24px' : '32px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  maxWidth: '850px',
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
                    <h3 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: 700,
                      color: '#1C1917',
                      margin: 0,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}>TL;DR</h3>

                    {/* Skip to Impact Button */}
                    <button
                      onClick={() => scrollToSection('impact')}
                      style={{
                        backgroundColor: '#1C1917',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Skip to Impact →
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
                      <div style={{ color: '#1C1917', fontWeight: 600 }}>{caseStudy.tldr.impact}</div>
                    </div>
                    <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
                      <div style={{ fontWeight: 600, color: '#6B7280', marginBottom: '4px' }}>Key Skills</div>
                      <div style={{ color: '#1C1917' }}>{caseStudy.tldr.skills}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Label */}
              <div style={{
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontFamily: 'inherit',
                maxWidth: '850px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                {section.title}
              </div>

              {/* Section Headline */}
              {section.headline && (
                <h2 style={{
                  fontSize: isMobile ? '22px' : '26px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '24px',
                  lineHeight: '1.3',
                  fontFamily: 'var(--font-fraunces), serif',
                  maxWidth: '850px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  {section.headline}
                </h2>
              )}

              {/* Section Text */}
              {section.customComponent ? (
                <div
                  className="case-study-content"
                  style={{
                    marginBottom: '32px',
                    maxWidth: '850px',
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
                    maxWidth: '850px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}

              {/* Visual Content Area - Hidden for strategy, constraints, tradeoffs, context-problem, turning-point, snapshot, problem, and reflection sections, and for sections that already embed real media via customComponent */}
              {!section.customComponent && section.id !== 'strategy' && section.id !== 'constraints' && section.id !== 'tradeoffs' && section.id !== 'context-problem' && section.id !== 'turning-point' && section.id !== 'snapshot' && section.id !== 'problem' && section.id !== 'reflection' && (
                <div style={{
                  width: '100%',
                  minHeight: '500px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '8px',
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
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <div>
                    <div style={{
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: 400,
                      color: '#6B7280',
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
                    color: '#1C1917',
                  }}>
                    →
                  </div>
                </a>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
    </>
  )
}
