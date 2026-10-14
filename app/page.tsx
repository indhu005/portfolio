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

// Compact pill-shaped label above each case study video — title, category, year, and
// shipped status condensed into one line instead of a full header block.
const InfoPill = ({ title, meta, year, badge, isMobile }: { title: string; meta: string; year: string; badge?: string; isMobile: boolean }) => (
  isMobile ? (
    // Phone: two compact lines in a rounded tag instead of a stretched pill — a
    // single-line pill with this much text wraps into a tall blob at narrow widths.
    <div className="cs-pill-hover" style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #1C1917',
      borderRadius: '12px',
      padding: '8px 12px',
      maxWidth: '100%',
      boxShadow: '0 3px 8px rgba(28, 25, 23, 0.12)',
    }}>
      <span style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 700, fontSize: '13px', color: '#1C1917' }}>
        {title}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '10.5px', fontWeight: 600, color: '#78716C' }}>
        <span>{meta}</span>
        <span style={{ color: '#D6D3D1' }}>·</span>
        <span>{year}</span>
        {badge && (
          <>
            <span style={{ color: '#D6D3D1' }}>·</span>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1C1917' }}>
              {badge}
            </span>
          </>
        )}
      </span>
    </div>
  ) : (
    <div className="cs-pill-hover" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      border: '1px solid #1C1917',
      borderRadius: '999px',
      padding: '10px 22px',
      maxWidth: '100%',
      boxShadow: '0 3px 8px rgba(28, 25, 23, 0.12)',
    }}>
      <span style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 700, fontSize: '15px', color: '#1C1917' }}>
        {title}
      </span>
      <span style={{ color: '#A8A29E' }}>·</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#57534E' }}>{meta}</span>
      <span style={{ color: '#A8A29E' }}>·</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#57534E' }}>{year}</span>
      {badge && (
        <>
          <span style={{ color: '#A8A29E' }}>·</span>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1C1917' }}>
            {badge}
          </span>
        </>
      )}
    </div>
  )
)

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
  const isTablet = useMediaQuery('(max-width: 1240px)')
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
      backgroundColor: '#FFFFFF',
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
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : isWideDesktop ? '0 64px 80px 56px' : '0 40px 60px 36px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
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
              Hi, I'm <span style={{ color: '#1C1917' }}>Indhu</span>
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
              <span style={{ fontWeight: 700, color: '#57534E' }}>0→1, AI/ML &amp; Trustworthy Systems</span>
            </div>

            <div style={{
              fontSize: isMobile ? '20px' : isWideDesktop ? '24px' : '22px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: isMobile ? '26px' : isWideDesktop ? '34px' : '30px',
                fontWeight: 700,
                lineHeight: '1.3',
                marginBottom: isWideDesktop ? '32px' : '28px',
                ...revealStyle(90),
              }}>
                I decide what AI gets to see and act on, and what stays a human call.
              </p>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(120) }}>
                I'm a senior product designer with 8 years of experience — from Gensler to founding Keye and senior product design on LAT. I design the trust layer between people and AI, from a 0→1 marketplace that later went YC, to an enterprise platform that reached 96% adoption inside a politically sensitive institution.
              </p>

              <p style={{ fontSize: isMobile ? '15px' : '16px', color: '#78716C', marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(140) }}>
                Since 2025, I've been building an AI-forward marketplace in stealth — prototyping, building, and shipping daily with AI agents and LLMs.
              </p>

              {/* Proof Strip — fast, scannable backing for the claims above */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '20px' : '24px',
                marginBottom: isWideDesktop ? '32px' : '28px',
                padding: isMobile ? '20px' : '24px 28px',
                border: '1px solid #E7E5E4',
                ...revealStyle(160),
              }}>
                {[
                  { stat: '95%→96% adoption', context: 'LAT — 43-person pilot to ~4,000-person rollout, measured by weekly active use of the core workflow' },
                  { stat: '0→20K MAUs · $1.5M raised', context: 'Keye — founding designer, team of 5; later went YC F24' },
                  { stat: "96% said they'd use it", context: 'Misinfo Center — 36 Gen Z/millennial testers, field-tested at Misinfo Day' },
                ].map((item, i) => (
                  <div key={item.stat} style={revealStyle(220 + i * 70)}>
                    <div style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '18px' : '20px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginBottom: '6px',
                      lineHeight: '1.3',
                    }}>
                      {item.stat}
                    </div>
                    <div style={{
                      fontSize: '13.5px',
                      lineHeight: '1.5',
                      color: '#78716C',
                    }}>
                      {item.context}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(220) }}>
                I obsess over how and why — and lately, why now. These days that means deciding what AI gets to see and act on, and what stays a human call.
              </p>
            </div>
          </main>

          {/* Case Studies Section */}
          <section id="case-studies" style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: isMobile ? '60px' : isWideDesktop ? '120px' : '100px',
          }}>
            {/* Ambient drifting blobs — just enough motion that the white background
                doesn't read as flat, kept low-opacity/blurred so it stays behind content */}
            <div aria-hidden="true" className="cs-section-blob cs-section-blob--coral" />

            {/* Section Header */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '40px',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '64px' : '48px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  lineHeight: '1',
                  margin: 0,
                }}>
                  Selected Work
                </h2>
              </div>
              <a
                href="/Indhu-Venkatachalam-Senior-Product-Designer.docx.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-pill-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#FFFFFF',
                  backgroundColor: '#1C1917',
                  border: '1px solid #1C1917',
                  borderRadius: '999px',
                  padding: isMobile ? '9px 16px' : '10px 22px',
                  textDecoration: 'none',
                  boxShadow: '0 3px 8px rgba(28, 25, 23, 0.12)',
                  flexShrink: 0,
                }}
              >
                Resume
              </a>
            </div>

            {/* Case Study Cards */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '63px' : isWideDesktop ? '112px' : '91px',
            }}>
              {/* Card 1 - LAT */}
              <article
                ref={latCardRef}
                onClick={() => router.push('/work/lat')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="LAT Platform"
                  meta="Enterprise AI · 0→1 Systems"
                  year="Jun 2023 – May 2024"
                  badge="Shipped"
                />

                <div className="cs-card-media" style={{
                  width: isMobile ? 'calc(100% + 48px)' : isTablet ? 'calc(100% + 80px)' : '84%',
                  marginTop: isMobile ? '24px' : '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label="LAT CapEx proposal workflow"
                    style={{ display: 'block', width: '100%', aspectRatio: '1536 / 1024', objectFit: 'cover', border: 'none', borderRadius: 0, boxShadow: 'none' }}
                  >
                    <source src="/videos/lat/LAT%20Landing%20-%20Laptop%20cropped.mp4" type="video/mp4" />
                  </video>
                </div>
              </article>

              {/* Card 2 - Keye */}
              <article
                onClick={() => router.push('/work/keye')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="Keye"
                  meta="Marketplace · B2C"
                  year="2021–2022"
                  badge="Shipped"
                />

                {/* Landing hero — same video + laptop treatment used as the hero in the Keye case study */}
                <div className="cs-card-media" style={{
                  width: isMobile ? 'calc(100% + 48px)' : isTablet ? 'calc(100% + 80px)' : '84%',
                  marginTop: isMobile ? '24px' : '32px',
                }}>
                  <div
                    className="cs-laptop-mockup"
                    style={{
                      width: '100%',
                      maxWidth: 'none',
                      margin: '0 auto',
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
                </div>
              </article>

              {/* Card 3 - Misinformation Center */}
              <article
                ref={misinfoCardRef}
                onClick={() => router.push('/work/misinformation-center')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: '#FFFFFF',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="Misinformation Center"
                  meta="Research · Media Literacy"
                  year="Jan–Dec 2024"
                />

                {/* Landing videos, side by side — cropped tight to the phone so they sit seamlessly on the black card */}
                <div className="cs-card-media" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: isMobile ? '34px' : '56px',
                  width: '100%',
                  marginTop: isMobile ? '24px' : '32px',
                  justifyContent: 'center',
                  padding: isMobile ? '24px 0' : '32px 0',
                }}>
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
                      maxWidth: isMobile ? '150px' : isTablet ? '220px' : '353px',
                      aspectRatio: '456 / 910',
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Literacyquiz.mp4" type="video/mp4" />
                  </video>
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
                      maxWidth: isMobile ? '150px' : isTablet ? '220px' : '353px',
                      aspectRatio: '464 / 912',
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Landing%20video%2002%20cropped3.mp4" type="video/mp4" />
                  </video>
                </div>
              </article>

              {/* Card 4 - Coming Soon (AI-native stealth work) */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px dashed #D6D3D1',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: 'transparent',
              }}>
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontSize: isWideDesktop ? '15px' : '13px',
                    fontWeight: 700,
                    color: '#A8A29E',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}>
                    04
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#A8A29E',
                      marginBottom: '6px',
                    }}>
                      AI-Native · 0→1 · In Stealth
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '22px' : isWideDesktop ? '30px' : '26px',
                      fontWeight: 700,
                      color: '#78716C',
                      letterSpacing: '-0.01em',
                      margin: 0,
                      marginBottom: isMobile ? '12px' : '16px',
                    }}>
                      Coming soon
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: '1.6',
                      color: '#A8A29E',
                      maxWidth: '640px',
                      margin: 0,
                    }}>
                      Since 2025, I've been building an AI-forward marketplace in stealth — prototyping, building, and shipping daily with AI agents and LLMs. More here once it ships.
                    </p>
                  </div>
                </div>
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
              href="/Indhu-Venkatachalam-Senior-Product-Designer.docx.pdf"
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
              Resume
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
