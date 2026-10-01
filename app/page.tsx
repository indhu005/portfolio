'use client'
import Sidebar from '@/components/Sidebar'
import LandingGameSimple from '@/components/LandingGameSimple'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, type CSSProperties } from 'react'

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
const TldrStrip = ({ cells, isMobile, isTablet, offset, dark, onLight }: { cells: TldrCell[]; isMobile: boolean; isTablet: boolean; offset: number; dark?: boolean; onLight?: boolean }) => {
  const columns = isMobile ? 1 : isTablet ? 2 : 4
  const borderColor = dark ? 'rgba(255,255,255,0.3)' : onLight ? 'rgba(28,25,23,0.25)' : '#F1F0EE'
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : onLight ? 'rgba(28,25,23,0.65)' : '#57534E'
  const valueColor = dark ? '#FFFFFF' : '#1C1917'
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      marginTop: isMobile ? '24px' : '32px',
      marginLeft: offset,
      borderTop: `1px solid ${borderColor}`,
      borderBottom: `1px solid ${borderColor}`,
    }}>
      {cells.map((cell, i) => {
        const isFirstInRow = i % columns === 0
        const isFirstRow = i < columns
        return (
          <div key={cell.label} style={{
            paddingTop: isMobile ? '16px' : '20px',
            paddingRight: isMobile ? 0 : '20px',
            paddingBottom: isMobile ? '16px' : '20px',
            paddingLeft: isFirstInRow ? 0 : '20px',
            borderLeft: isFirstInRow ? 'none' : `1px solid ${borderColor}`,
            borderTop: isFirstRow ? 'none' : `1px solid ${borderColor}`,
          }}>
            <div style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: labelColor,
              marginBottom: '8px',
            }}>
              {cell.label}
            </div>
            <div style={{
              fontSize: '14.5px',
              lineHeight: '1.55',
              color: valueColor,
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
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [splashFading, setSplashFading] = useState(false)
  const [splashVisible, setSplashVisible] = useState(true)
  const [inGameZone, setInGameZone] = useState(true)
  const [overDarkCard, setOverDarkCard] = useState(false)
  const gameWrapperRef = useRef<HTMLDivElement>(null)
  const latCardRef = useRef<HTMLElement>(null)
  const misinfoCardRef = useRef<HTMLElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isWideDesktop = useMediaQuery('(min-width: 2200px)')

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Brand-color splash on first paint, fades into the page shortly after
  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 650)
    const removeTimer = setTimeout(() => setSplashVisible(false), 1250)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  // Tracks whether the fixed hamburger button still overlaps the game hero (mirrors its accent
  // color there) or a dark product card (LAT/Misinfo are near-black, so the icon needs to go white
  // to stay visible instead of a black icon disappearing against a black background)
  useEffect(() => {
    if (!isTablet) return
    const container = document.querySelector('[data-scroll-container]')
    if (!container) return
    const buttonCenterY = 40 // button sits at top:20px, height:40px
    const checkZones = () => {
      const wrapper = gameWrapperRef.current
      if (wrapper) setInGameZone(wrapper.getBoundingClientRect().bottom > 60)

      const isOverCard = (ref: React.RefObject<HTMLElement | null>) => {
        if (!ref.current) return false
        const rect = ref.current.getBoundingClientRect()
        return rect.top < buttonCenterY && rect.bottom > buttonCenterY
      }
      setOverDarkCard(isOverCard(latCardRef) || isOverCard(misinfoCardRef))
    }
    checkZones()
    container.addEventListener('scroll', checkZones, { passive: true })
    return () => container.removeEventListener('scroll', checkZones)
  }, [isTablet])

  const revealStyle = (delayMs: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  })

  return (

    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#FAF8F3',
      overflow: 'hidden',
      width: '100vw',
    }}>

      {/* Splash screen - brand green flash before the page fades in */}
      {splashVisible && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#8CC751',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: splashFading ? '50%' : '0%',
          transform: splashFading ? 'scale(0.03)' : 'scale(1)',
          transition: 'transform 0.55s cubic-bezier(0.6, 0, 0.35, 1), border-radius 0.55s ease-in',
          animation: 'splashPulse 0.6s ease-out',
          pointerEvents: splashFading ? 'none' : 'auto',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            opacity: splashFading ? 0 : 1,
            transition: 'opacity 0.2s ease-out',
          }}>
            <img
              src="/images/home/tree 01 (3).svg"
              alt=""
              style={{
                width: '72px',
                height: '72px',
                objectFit: 'contain',
                animation: 'splashSproutPop 0.5s 0.08s cubic-bezier(0.34, 1.56, 0.64, 1) both',
              }}
            />
          </div>
        </div>
      )}

      {/* SIDEBAR - Hidden on mobile/tablet */}
      {!isTablet && <Sidebar />}

      {/* MOBILE MENU BUTTON */}
      {isTablet && (() => {
        const iconIsWhite = inGameZone || overDarkCard
        return (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: inGameZone ? '#F2955A' : 'transparent',
            backdropFilter: inGameZone ? 'none' : 'blur(12px)',
            WebkitBackdropFilter: inGameZone ? 'none' : 'blur(12px)',
            border: inGameZone ? 'none' : '1px solid rgba(28, 25, 23, 0.1)',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: inGameZone ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {mobileMenuOpen ? (
              <>
                <path d="M4 4L14 14" stroke={iconIsWhite ? '#FFFFFF' : '#1C1917'} strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 4L4 14" stroke={iconIsWhite ? '#FFFFFF' : '#1C1917'} strokeWidth="1.6" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M2.5 5H15.5" stroke={iconIsWhite ? '#FFFFFF' : '#1C1917'} strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2.5 9H15.5" stroke={iconIsWhite ? '#FFFFFF' : '#1C1917'} strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2.5 13H15.5" stroke={iconIsWhite ? '#FFFFFF' : '#1C1917'} strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
        )
      })()}

      {/* MOBILE/TABLET OVERLAY MENU */}
      {isTablet && mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FAF8F3',
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
            backgroundColor: '#FAF8F3',
          }}
        >
          {/* Landing Game — same maxWidth/centering as the wrapper below so the grid can align its
              left edge to "Hi, I'm Indhu" instead of centering in the full (wider) content area */}
          <div ref={gameWrapperRef} style={{
            maxWidth: isWideDesktop ? '1400px' : '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: isMobile ? '48px' : isWideDesktop ? '96px' : '80px',
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
              marginBottom: isMobile ? '16px' : '20px',
              letterSpacing: '-0.02em',
              ...revealStyle(0),
            }}>
              Hi, I'm <span style={{ color: 'var(--accent)' }}>Indhu</span>
            </h1>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: isMobile ? '8px' : '10px',
              fontSize: isMobile ? '14px' : '15px',
              letterSpacing: '0.01em',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '56px' : '48px',
              ...revealStyle(60),
            }}>
              <span style={{ fontWeight: 700, color: '#57534E' }}>Senior Product Designer</span>
              <span style={{ color: '#D6D3D1' }}>·</span>
              <span style={{ fontWeight: 500, color: '#57534E' }}>Seattle</span>
              <span style={{ color: '#D6D3D1' }}>·</span>
              <span style={{ fontWeight: 700, color: '#57534E' }}>0→1 &amp; AI/ML Product Trust</span>
            </div>

            <div style={{
              fontSize: isMobile ? '20px' : isWideDesktop ? '24px' : '22px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(120) }}>
                I'm a product designer with 8+ years of experience taking products from 0 to 1. I build trust into systems, from a founding role at Keye that took a marketplace from three screens to a funded company, to LAT, an enterprise ML platform that reached 95% adoption inside a politically sensitive institution.
              </p>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(220) }}>
                I think in the how and the why, and lately the why now. Most recently, that's meant figuring out what accessibility and safety guardrails should look like as AI decides more of what people see and trust.
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
              <article
                ref={latCardRef}
                onClick={isMobile ? () => router.push('/work/lat') : undefined}
                style={{
                cursor: isMobile ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid #1C1917',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#1C1917',
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
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    01
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: isMobile ? 'wrap' : 'nowrap',
                      alignItems: 'center',
                      gap: isMobile ? '8px 10px' : '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#FFFFFF',
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
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.4)',
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
                        color: 'rgba(255,255,255,0.85)',
                        flexShrink: 0,
                      }}>
                        Jun 2023 – May 2024
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: 'rgba(255,255,255,0.9)',
                      maxWidth: '800px',
                    }}>
                      Turning fragmented campus maintenance into a trusted financial decision system through ML-driven lifecycle intelligence.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
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
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#D9662B',
                        textDecoration: 'none',
                        padding: '10px 18px',
                        borderRadius: '999px',
                        flexShrink: 0,
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C2571F'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#D9662B'
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
                  dark
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
                    backgroundColor: '#293133',
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
                  }}>
                    <a
                      href="/work/lat"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#D9662B',
                        textDecoration: 'none',
                        padding: '14px 18px',
                        borderRadius: '999px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C2571F'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#D9662B'
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
              <article
                onClick={isMobile ? () => router.push('/work/keye') : undefined}
                style={{
                cursor: isMobile ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid #4F7DDD',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#4F7DDD',
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
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    02
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: isMobile ? 'wrap' : 'nowrap',
                      alignItems: 'center',
                      gap: isMobile ? '8px 10px' : '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#FFFFFF',
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
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.4)',
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
                        color: 'rgba(255,255,255,0.85)',
                        flexShrink: 0,
                      }}>
                        2021–2022
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: 'rgba(255,255,255,0.9)',
                      maxWidth: '800px',
                    }}>
                      From three static screens to a YC-backed subscription marketplace — designing ClassPass for digital tools.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
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
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#FF7A1A',
                        textDecoration: 'none',
                        padding: '10px 18px',
                        borderRadius: '999px',
                        flexShrink: 0,
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E8650A'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF7A1A'
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
                  dark
                  cells={[
                    { label: 'Role & Team', value: 'Founding Designer · team of 5 — 2 engineers, 1 PM, 2 designers I hired' },
                    { label: 'Constraint', value: "Engineering was 12 time zones away; a co-founder's exit erased backend capacity for planned integrations." },
                    { label: 'Impact', value: '0→20K MAUs · $1.5M raised · YC W2024' },
                    { label: 'Tech & Approach', value: 'Design systems · Chrome extension · Credit-based economics' },
                  ]}
                />

                {/* Landing hero — same video + laptop treatment used as the hero in the Keye case study */}
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
                  <div
                    className="cs-laptop-mockup"
                    style={{
                      width: '100%',
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
                    <div className="cs-laptop-lid">
                      <div className="cs-laptop-camera"></div>
                      <div className="cs-laptop-screen">
                        <div className="cs-browser-chrome">
                          <div className="cs-browser-dots"><span></span><span></span><span></span></div>
                          <div className="cs-browser-url">🔒 unlockkeye.com</div>
                        </div>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label="Keye landing page hero"
                          style={{ display: 'block', width: '100%', height: 'auto' }}
                        >
                          <source src="/videos/Keye/Keye%20hero%20cropped.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    <div className="cs-laptop-hinge"></div>
                    <div className="cs-laptop-base"><div className="cs-laptop-notch"></div></div>
                  </div>
                </a>

                {/* CTA — mobile only; desktop CTA lives in the title row */}
                {isMobile && (
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                  }}>
                    <a
                      href="/work/keye"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#FF7A1A',
                        textDecoration: 'none',
                        padding: '14px 18px',
                        borderRadius: '999px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E8650A'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FF7A1A'
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
              <article
                ref={misinfoCardRef}
                onClick={isMobile ? () => router.push('/work/misinformation-center') : undefined}
                style={{
                cursor: isMobile ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid #000000',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#000000',
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
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    03
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: isMobile ? 'wrap' : 'nowrap',
                      alignItems: 'center',
                      gap: isMobile ? '8px 10px' : '10px',
                      marginBottom: isMobile ? '8px' : '10px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}>
                        Misinformation Center
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#FFFFFF',
                        flexShrink: 0,
                      }}>
                        Jan–Dec 2024
                      </span>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: 'rgba(255,255,255,0.75)',
                      maxWidth: '800px',
                    }}>
                      Media literacy tools for the AI age — equipping people to identify misinformation themselves through verification, education, and trust.
                    </p>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
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
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#D9662B',
                        textDecoration: 'none',
                        padding: '10px 18px',
                        borderRadius: '999px',
                        flexShrink: 0,
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C2571F'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#D9662B'
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
                  dark
                  cells={[
                    { label: 'Role & Team', value: 'Sole Designer (Graduate Capstone) · solo post-Feb 2024, contributed to user research for TrueMedia.org' },
                    { label: 'Impact', value: '~1,800 testers at Misinfo Day · 2,000-respondent survey · Concept validation' },
                    { label: 'Tech & Approach', value: 'Concept design · Gamification · Platform strategy' },
                  ]}
                />

                {/* Landing videos, side by side — cropped tight to the phone so they sit seamlessly on the black card */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: isMobile ? '48px' : '140px',
                  width: isMobile ? '100%' : 'calc(100% - 56px)',
                  marginLeft: isMobile ? 0 : '56px',
                  marginTop: isMobile ? '24px' : '32px',
                  marginBottom: isMobile ? '24px' : '32px',
                  justifyContent: 'center',
                  padding: isMobile ? '24px 0' : '32px 0',
                }}>
                  <a
                    href="/work/misinformation-center"
                    style={{ display: 'block', width: '100%', maxWidth: '300px', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Misinformation Center landing feature 1"
                      style={{
                        display: 'block',
                        width: '100%',
                        aspectRatio: '680 / 1340',
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
                    >
                      <source src="/videos/misinformationcenter/Landing%20video%2001%20cropped.mp4" type="video/mp4" />
                    </video>
                  </a>
                  <a
                    href="/work/misinformation-center"
                    style={{ display: 'block', width: '100%', maxWidth: '300px', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Misinformation Center landing feature 2"
                      style={{
                        display: 'block',
                        width: '100%',
                        aspectRatio: '680 / 1340',
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
                    >
                      <source src="/videos/misinformationcenter/Landing%20video%2002%20cropped.mp4" type="video/mp4" />
                    </video>
                  </a>
                </div>

                {/* CTA — mobile only; desktop CTA lives in the title row */}
                {isMobile && (
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                  }}>
                    <a
                      href="/work/misinformation-center"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#D9662B',
                        textDecoration: 'none',
                        padding: '14px 18px',
                        borderRadius: '999px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C2571F'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) svg.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#D9662B'
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
