'use client'
import Sidebar from '@/components/Sidebar'
import LandingGameSimple from '@/components/LandingGameSimple'
import { useState, useEffect, type CSSProperties } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return mounted ? matches : false
}

const ArrowIcon = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ transition: 'transform 0.2s ease' }}>
    <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type TldrCell = { label: string; value: string }

// Mini-TLDR spec-table strip — same Context/Constraint/Decision/Tradeoff
// language as the case study Brief block, condensed to 4 cells. Column
// count folds 4 -> 2 -> 1 across breakpoints; border placement is derived
// from column count so dividers never end up on the wrong edge.
const TldrStrip = ({ cells, isMobile, isTablet, offset }: { cells: TldrCell[]; isMobile: boolean; isTablet: boolean; offset: number }) => {
  const columns = isMobile ? 1 : isTablet ? 2 : 4
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      marginTop: isMobile ? '24px' : '32px',
      marginLeft: offset,
      borderTop: '1px solid #F1F0EE',
      borderBottom: '1px solid #F1F0EE',
    }}>
      {cells.map((cell, i) => {
        const isFirstInRow = i % columns === 0
        const isFirstRow = i < columns
        return (
          <div key={cell.label} style={{
            padding: isMobile ? '16px 0' : '20px',
            paddingLeft: isFirstInRow ? 0 : '20px',
            borderLeft: isFirstInRow ? 'none' : '1px solid #F1F0EE',
            borderTop: isFirstRow ? 'none' : '1px solid #F1F0EE',
          }}>
            <div style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#57534E',
              marginBottom: '8px',
            }}>
              {cell.label}
            </div>
            <div style={{
              fontSize: '14.5px',
              lineHeight: '1.55',
              color: '#1C1917',
            }}>
              {cell.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isWideDesktop = useMediaQuery('(min-width: 2200px)')

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const revealStyle = (delayMs: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  })

  return (

    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      width: '100vw',
    }}>

      {/* SIDEBAR - Hidden on mobile/tablet */}
      {!isTablet && <Sidebar />}

      {/* MOBILE MENU BUTTON */}
      {isTablet && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            background: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '0px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
          onClick={() => setMobileMenuOpen(false)}
        >
          <Sidebar />
        </div>
      )}

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>

        {/* CONTENT AREA */}
        <div
          data-scroll-container
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : isWideDesktop ? '0 80px 80px 80px' : '0 48px 60px 48px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Landing Game */}
          <div style={{
            marginBottom: '20px',
          }}>
            <LandingGameSimple />
          </div>

          {/* Shared centered wrapper so intro and Selected Work share the same left edge */}
          <div style={{
            maxWidth: isWideDesktop ? '1400px' : '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {/* Home page content */}
          <main style={{
            maxWidth: isWideDesktop ? '1100px' : '920px',
            marginTop: '0px',
            marginLeft: '0',
            marginRight: 'auto',
            textAlign: 'left',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '38px' : isTablet ? '50px' : isWideDesktop ? '74px' : '62px',
              fontWeight: 700,
              lineHeight: '1.08',
              color: '#1C1917',
              marginTop: isWideDesktop ? '20px' : '0',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '56px' : '48px',
              letterSpacing: '-0.02em',
              ...revealStyle(0),
            }}>
              Hi, I'm <span style={{ color: 'var(--accent)' }}>Indhu</span>
            </h1>

            <div style={{
              fontSize: isMobile ? '20px' : isWideDesktop ? '24px' : '22px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(120) }}>
                I'm a product designer who builds trust into systems — from a founding role that took a marketplace from three screens to funded, to an enterprise ML platform that earned 95% adoption inside a politically sensitive institution.
              </p>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(220) }}>
                I think in the how and the why, and lately the why now — most recently, what accessibility and safety guardrails should look like as AI decides more of what people see and trust.
              </p>
            </div>
          </main>

          {/* Case Studies Section */}
          <section id="case-studies" style={{
            marginTop: isMobile ? '60px' : isWideDesktop ? '120px' : '100px',
          }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '64px' : '48px',
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                flexShrink: 0,
              }} />
              <h2 style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: isMobile ? '22px' : isWideDesktop ? '39px' : '34px',
                fontWeight: 700,
                color: '#1C1917',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                Selected Work
              </h2>
            </div>

            {/* Case Study Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '90px' : isWideDesktop ? '160px' : '130px',
            }}>
              {/* Card 1 - LAT */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E5E7EB',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                {/* Header: index + title + description */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginBottom: isMobile ? '20px' : '28px',
                }}>
                  <div style={{
                    fontSize: isWideDesktop ? '15px' : '13px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    01
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#1C1917',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}>
                        LAT Platform
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#57534E',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0px',
                        padding: '4px 10px',
                        flexShrink: 0,
                      }}>
                        Shipped
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#57534E',
                        flexShrink: 0,
                      }}>
                        Jun 2023 – May 2024
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      Turning fragmented campus maintenance into a trusted financial decision system through ML-driven lifecycle intelligence.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginTop: isMobile ? '12px' : '16px',
                    }}>
                      95% pilot adoption
                    </div>
                  </div>
                  {!isMobile && (
                    <a
                      href="/work/lat"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingTop: '10px',
                        paddingBottom: '2px',
                        flexShrink: 0,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  )}
                </div>

                <TldrStrip
                  isMobile={isMobile}
                  isTablet={isTablet && !isMobile}
                  offset={isMobile ? 0 : 56}
                  cells={[
                    { label: 'Role & Team', value: 'Lead Designer (60% design, 40% strategy) · team of 4 — PM, 2 external engineers, client stakeholders' },
                    { label: 'Constraint', value: "Legacy CMMS/ERP stack couldn't be disrupted, data integrity had hard boundaries, capital decisions were politically sensitive." },
                    { label: 'Impact', value: '95% pilot adoption · 70%→95% data accuracy · 25% cost reduction projected' },
                    { label: 'Tech & Approach', value: 'ML/AI design · API-first architecture · Human-in-the-loop approval gates' },
                  ]}
                />

                {/* Large Image Placeholder */}
                <a
                  href="/work/lat"
                  style={{
                    display: 'block',
                    width: isMobile ? '100%' : 'calc(100% - 56px)',
                    marginLeft: isMobile ? 0 : '56px',
                    marginTop: isMobile ? '24px' : '32px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: isMobile ? '320px' : isWideDesktop ? '760px' : '620px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '0px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  />
                </a>

                {/* CTA — mobile only; desktop CTA lives in the title row */}
                {isMobile && (
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                    <a
                      href="/work/lat"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingBottom: '2px',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  </div>
                )}
              </article>

              {/* Card 2 - Keye */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E5E7EB',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                {/* Header: index + title + description */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginBottom: isMobile ? '20px' : '28px',
                }}>
                  <div style={{
                    fontSize: isWideDesktop ? '15px' : '13px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    02
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#1C1917',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}>
                        Keye
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#57534E',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0px',
                        padding: '4px 10px',
                        flexShrink: 0,
                      }}>
                        Shipped
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#57534E',
                        flexShrink: 0,
                      }}>
                        2021–2022
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      From three static screens to a YC-backed subscription marketplace — designing ClassPass for digital tools.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginTop: isMobile ? '12px' : '16px',
                    }}>
                      0→20K MAUs
                    </div>
                  </div>
                  {!isMobile && (
                    <a
                      href="/work/keye"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingTop: '10px',
                        paddingBottom: '2px',
                        flexShrink: 0,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  )}
                </div>

                <TldrStrip
                  isMobile={isMobile}
                  isTablet={isTablet && !isMobile}
                  offset={isMobile ? 0 : 56}
                  cells={[
                    { label: 'Role & Team', value: 'Founding Designer · team of 5 — 2 engineers, 1 PM, 2 designers I hired' },
                    { label: 'Constraint', value: "Engineering was 12 time zones away; a co-founder's exit erased backend capacity for planned integrations." },
                    { label: 'Impact', value: '0→20K MAUs · $1.5M raised · YC W2024' },
                    { label: 'Tech & Approach', value: 'Design systems · Chrome extension · Credit-based economics' },
                  ]}
                />

                {/* Large Image Placeholder */}
                <a
                  href="/work/keye"
                  style={{
                    display: 'block',
                    width: isMobile ? '100%' : 'calc(100% - 56px)',
                    marginLeft: isMobile ? 0 : '56px',
                    marginTop: isMobile ? '24px' : '32px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '2400 / 1351',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <img
                      src="/images/home/keye-landing.webp"
                      alt="Keye landing page preview"
                      style={{
                        width: '85%',
                        height: '85%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                </a>

                {/* CTA — mobile only; desktop CTA lives in the title row */}
                {isMobile && (
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                    <a
                      href="/work/keye"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingBottom: '2px',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  </div>
                )}
              </article>

              {/* Card 3 - Misinformation Center */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E5E7EB',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                {/* Header: index + title + description */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginBottom: isMobile ? '20px' : '28px',
                }}>
                  <div style={{
                    fontSize: isWideDesktop ? '15px' : '13px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    03
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#1C1917',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}>
                        Misinformation Center
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#57534E',
                        flexShrink: 0,
                      }}>
                        Jan–Dec 2024
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      Media literacy tools for the AI age — equipping people to identify misinformation themselves through verification, education, and trust.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginTop: isMobile ? '12px' : '16px',
                    }}>
                      ~1,800 testers at Misinfo Day
                    </div>
                  </div>
                  {!isMobile && (
                    <a
                      href="/work/misinformation-center"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingTop: '10px',
                        paddingBottom: '2px',
                        flexShrink: 0,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  )}
                </div>

                <TldrStrip
                  isMobile={isMobile}
                  isTablet={isTablet && !isMobile}
                  offset={isMobile ? 0 : 56}
                  cells={[
                    { label: 'Role & Team', value: 'Sole Designer (Graduate Capstone) · solo post-Feb 2024, contributed to user research for TrueMedia.org' },
                    { label: 'Constraint', value: 'No engineering resourcing beyond a prototype; testing showed users rejected any platform-integrated solution outright.' },
                    { label: 'Impact', value: '~1,800 testers at Misinfo Day · 2,000-respondent survey · Concept validation' },
                    { label: 'Tech & Approach', value: 'Concept design · Gamification · Platform strategy' },
                  ]}
                />

                {/* Large Image Placeholder */}
                <a
                  href="/work/misinformation-center"
                  style={{
                    display: 'block',
                    width: isMobile ? '100%' : 'calc(100% - 56px)',
                    marginLeft: isMobile ? 0 : '56px',
                    marginTop: isMobile ? '24px' : '32px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: isMobile ? '8px' : '12px',
                    width: '100%',
                    height: isMobile ? '320px' : isWideDesktop ? '760px' : '620px',
                  }}>
                    <div
                      style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <img
                        src="/images/misinformation-center/Langing%20page%201%20of%202%20images.gif"
                        alt="Misinformation Center landing preview, 1 of 2"
                        style={{
                          width: '70%',
                          height: '70%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label="Misinformation Center landing preview, 2 of 2"
                        style={{
                          width: '93%',
                          height: '93%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      >
                        <source src="/videos/misinformationcenter/Landing%20page%20Image%2002%20of%2002%20cropped.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </a>

                {/* CTA — mobile only; desktop CTA lives in the title row */}
                {isMobile && (
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                    <a
                      href="/work/misinformation-center"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        color: '#1C1917',
                        textDecoration: 'none',
                        paddingBottom: '2px',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#1C1917'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(0)'
                      }}
                    >
                      View case study
                      <ArrowIcon />
                    </a>
                  </div>
                )}
              </article>
            </div>
          </section>

          {/* Experience */}
          <section style={{
            marginTop: isMobile ? '80px' : isWideDesktop ? '140px' : '120px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: isMobile ? '28px' : '40px',
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                flexShrink: 0,
              }} />
              <h2 style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: isMobile ? '22px' : isWideDesktop ? '39px' : '34px',
                fontWeight: 700,
                color: '#1C1917',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                Experience
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { title: 'Independent Product Designer', company: 'Freelance', years: '2025 – Present' },
                { title: 'Senior Product Designer', company: 'Amento', years: '2023 – 2024' },
                { title: 'Graduate Capstone Designer', company: 'University of Washington', years: '2024 – 2025' },
                { title: 'Product Designer II', company: 'Handel Architects', years: '2022 – 2023' },
                { title: 'Founding Product Designer', company: 'Keye', years: '2021 – 2022' },
                { title: 'Senior Product Designer', company: 'Flock.ai', years: '2021 – 2022' },
                { title: 'Product Designer (Volunteer)', company: 'Distribute Aid', years: '2020' },
                { title: 'User Experience Designer', company: 'Gensler', years: '2018 – 2020' },
              ].map((role, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '24px',
                    padding: isMobile ? '18px 0' : '22px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '10px', rowGap: '2px' }}>
                    <span style={{
                      fontSize: isMobile ? '16px' : isWideDesktop ? '19px' : '17px',
                      fontWeight: 600,
                      color: '#1C1917',
                    }}>
                      {role.title}
                    </span>
                    <span style={{
                      fontSize: isMobile ? '16px' : isWideDesktop ? '19px' : '17px',
                      fontWeight: 400,
                      color: '#6B7280',
                    }}>
                      — {role.company}
                    </span>
                  </div>
                  <span style={{
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: 500,
                    color: '#9CA3AF',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}>
                    {role.years}
                  </span>
                </div>
              ))}
            </div>
          </section>
          </div>

          {/* Footer Links */}
          <footer style={{
            maxWidth: isWideDesktop ? '1400px' : '1200px',
            marginTop: isMobile ? '60px' : isWideDesktop ? '100px' : '80px',
            paddingLeft: isMobile ? '0' : isWideDesktop ? '64px' : '48px',
            paddingBottom: isMobile ? '40px' : '60px',
            display: 'flex',
            gap: isMobile ? '24px' : '32px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <a
              href="/about"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: '#1C1917',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}
            >
              About
            </a>
            <a
              href="https://www.linkedin.com/in/indhu05/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: '#1C1917',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:indhuve05@gmail.com"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: '#1C1917',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}
            >
              Email
            </a>
          </footer>
        </div>

      </div>
    </div>
  )
}
