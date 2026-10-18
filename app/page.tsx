'use client'
import Sidebar from '@/components/Sidebar'
import LandingGameSimple from '@/components/LandingGameSimple'
import { Reveal, CountUp } from '@/components/ScrollReveal'
import ShootingStars from '@/components/ShootingStars'
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
      backgroundColor: '#000000',
      border: '1px solid #FFFFFF',
      borderRadius: '12px',
      padding: '8px 12px',
      maxWidth: '100%',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
    }}>
      <span style={{ fontFamily: 'var(--font-heading), serif', fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>
        {title}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '10.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>
        <span>{meta}</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>
        <span>{year}</span>
        {badge && (
          <>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#FFFFFF' }}>
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
      backgroundColor: '#000000',
      border: '1px solid #FFFFFF',
      borderRadius: '999px',
      padding: '10px 22px',
      maxWidth: '100%',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
    }}>
      <span style={{ fontFamily: 'var(--font-heading), serif', fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
        {title}
      </span>
      <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>·</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.65)' }}>{meta}</span>
      <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>·</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.65)' }}>{year}</span>
      {badge && (
        <>
          <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>·</span>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#FFFFFF' }}>
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
  const [splashVisible, setSplashVisible] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1240px)')
  const isWideDesktop = useMediaQuery('(min-width: 2200px)')
  // Laptop-range screens (sidebar + hero column together hit the 1200px wrapper's
  // max-width here) — used to widen the hero text column so it doesn't leave a dead
  // gutter next to "Selected Work" below it.
  const isLaptop = useMediaQuery('(min-width: 1241px) and (max-width: 1799px)')

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Black loading fade — only on a user's first visit this session, not every
  // time they navigate back to the homepage.
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('entry-splash-shown')
    if (alreadyShown) return
    sessionStorage.setItem('entry-splash-shown', '1')
    setSplashVisible(true)
    const fadeTimer = setTimeout(() => setSplashFading(true), 400)
    const removeTimer = setTimeout(() => setSplashVisible(false), 850)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  const revealStyle = (delayMs: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(18px)',
    filter: revealed ? 'blur(0px)' : 'blur(6px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  })

  return (

    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      width: '100vw',
    }}>

      {/* Entry loading fade — plain black curtain, first visit only */}
      {splashVisible && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 9999,
          opacity: splashFading ? 0 : 1,
          transition: 'opacity 0.45s ease-in',
          pointerEvents: splashFading ? 'none' : 'auto',
        }} />
      )}

      {/* SIDEBAR - Hidden on mobile/tablet */}
      {!isTablet && <Sidebar dark />}


      {/* MOBILE MENU BUTTON — one consistent style regardless of scroll position/what's
          behind it (previously switched background/icon color based on being over the
          game hero or a dark card; that made it blend into the game-end grey overlay).
          Opaque white keeps it legible everywhere, and zIndex:1000 sits above the
          game-end overlay's zIndex:100 so it's never visually buried under it. */}
      {isTablet && (
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
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(28, 25, 23, 0.12)',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {mobileMenuOpen ? (
              <>
                <path d="M4 4L14 14" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 4L4 14" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M2.5 5H15.5" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2.5 9H15.5" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2.5 13H15.5" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
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
          <Sidebar dark />
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
            backgroundColor: '#000000',
          }}
        >
          {/* Landing Game — same maxWidth/centering as the wrapper below so the grid can align its
              left edge to "Hi, I'm Indhu" instead of centering in the full (wider) content area */}
          <div style={{
            maxWidth: isWideDesktop ? '1400px' : '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: isMobile ? '20px' : '32px',
            marginBottom: isMobile ? '20px' : isWideDesktop ? '36px' : '28px',
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
            // Laptop-range screens hit the 1200px wrapper's max-width (the sidebar no
            // longer leaves enough room left over for it to keep growing), so the 920px
            // hero cap left a large dead gutter between the hero text and "Selected Work"
            // below it — widen it here to close that gap. Still narrower than the 1200px
            // wrapper to avoid an overlong reading line.
            position: 'relative',
            overflow: 'hidden',
            maxWidth: isWideDesktop ? '1240px' : isLaptop ? '1150px' : '1000px',
            marginTop: '0px',
            marginLeft: '0',
            marginRight: 'auto',
            textAlign: 'left',
            backgroundColor: '#000000',
            borderRadius: isMobile ? '20px' : '28px',
            padding: isMobile ? '32px 24px' : isWideDesktop ? '64px 72px' : '56px 60px',
          }}>
            {/* Ambient drifting blob behind the hero copy — same low-opacity/blurred
                treatment as the case-studies section blob, just a different hue/phase
                so the hero doesn't read as flat before you scroll to anything else. */}
            <div aria-hidden="true" className="cs-section-blob cs-section-blob--blue" />
            <ShootingStars />

            <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: 'var(--font-heading), serif',
              fontSize: isMobile ? '38px' : isTablet ? '50px' : isWideDesktop ? '74px' : '62px',
              fontWeight: 700,
              lineHeight: '1.08',
              color: '#FFFFFF',
              marginTop: isWideDesktop ? '20px' : '0',
              marginBottom: isMobile ? '16px' : '20px',
              letterSpacing: '-0.02em',
              ...revealStyle(0),
            }}>
              Hi, I'm <span style={{ color: '#FFFFFF' }}>Indhu</span>
            </h1>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: isMobile ? '8px' : '10px',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '56px' : '48px',
              ...revealStyle(60),
            }}>
              {[
                { label: 'Senior Product Designer', variant: 'solid', pin: false },
                { label: 'Seattle', variant: 'accent', pin: true },
                { label: '0→1, AI/ML & Trustworthy Systems', variant: 'solid', pin: false },
              ].map((item) => (
                <span
                  key={item.label}
                  className="cs-pill-hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: isMobile ? '12px' : '12.5px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: item.variant === 'solid' ? 'rgba(255, 255, 255, 0.92)' : '#7C9BF0',
                    backgroundColor: item.variant === 'solid' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(74, 114, 229, 0.12)',
                    border: item.variant === 'solid' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(124, 155, 240, 0.3)',
                    borderRadius: '7px',
                    padding: isMobile ? '5px 10px' : '6px 11px',
                  }}
                >
                  {item.pin && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.72 11.19 7.01 11.44a1.5 1.5 0 0 0 1.98 0C13.28 21.19 20 15.25 20 10c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                        fill="#7C9BF0"
                      />
                    </svg>
                  )}
                  {item.label}
                </span>
              ))}
            </div>

            <div style={{
              fontSize: isMobile ? '20px' : isWideDesktop ? '24px' : '22px',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.85)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading), serif',
                fontSize: isMobile ? '26px' : isWideDesktop ? '34px' : '30px',
                fontWeight: 700,
                lineHeight: '1.3',
                color: '#FFFFFF',
                marginBottom: isWideDesktop ? '32px' : '28px',
                ...revealStyle(90),
              }}>
                I decide what AI gets to see and act on, and what stays a human call.
              </p>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(120) }}>
                8 years as a product designer — Gensler, founding Keye, senior design on LAT. I build the trust layer between people and AI: a 0→1 marketplace that went YC, an enterprise platform at 96% adoption in a politically sensitive institution.
              </p>

              <p style={{ fontSize: isMobile ? '15px' : '16px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(140) }}>
                Since 2025, building an AI-forward marketplace in stealth, shipping daily with AI agents.
              </p>

              {/* Proof Strip — fast, scannable backing for the claims above */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '20px' : '24px',
                marginBottom: isWideDesktop ? '32px' : '28px',
                padding: isMobile ? '20px' : '24px 28px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                ...revealStyle(160),
              }}>
                {[
                  {
                    key: 'lat',
                    stat: <>95%<CountUp to={96} prefix="→" suffix="%" /> adoption</>,
                    context: 'LAT — 43-person pilot to ~4,000-person rollout, measured by weekly active use',
                  },
                  {
                    key: 'keye',
                    stat: <>0<CountUp to={20} prefix="→" suffix="K" /> MAUs · $1.5M raised</>,
                    context: 'Keye — founding designer, team of 5; later went YC F24',
                  },
                  {
                    key: 'misinfo',
                    stat: <><CountUp to={96} suffix="%" /> said they&apos;d use it</>,
                    context: 'Misinfo Center — 36 Gen Z/millennial testers, field-tested at Misinfo Day',
                  },
                ].map((item, i) => (
                  <div key={item.key} style={revealStyle(220 + i * 70)}>
                    <div style={{
                      fontFamily: 'var(--font-heading), serif',
                      fontSize: isMobile ? '18px' : '20px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '6px',
                      lineHeight: '1.3',
                    }}>
                      {item.stat}
                    </div>
                    <div style={{
                      fontSize: '13.5px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                      {item.context}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px', ...revealStyle(220) }}>
                I obsess over how and why — and lately, why now.
              </p>
            </div>
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
            <ShootingStars />

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
                  fontFamily: 'var(--font-heading), serif',
                  fontSize: isMobile ? '22px' : isWideDesktop ? '39px' : '34px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                  lineHeight: '1',
                  margin: 0,
                }}>
                  Selected Work
                </h2>
              </div>
              <a
                href="/Indhu-Venkatachalam-Senior-Product-Designer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-pill-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading), serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#1C1917',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  borderRadius: '999px',
                  padding: isMobile ? '9px 16px' : '10px 22px',
                  textDecoration: 'none',
                  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
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
              gap: isMobile ? '64px' : isWideDesktop ? '112px' : '91px',
            }}>
              {/* Card 1 - LAT */}
              <Reveal>
              <article
                onClick={() => router.push('/work/lat')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: 'transparent',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="LAT Platform"
                  meta="Enterprise AI · 0→1 Systems"
                  year="Jun 2023 – May 2024"
                  badge="Shipped"
                />

                {/* Landing hero — same laptop mockup treatment as Keye, minus the
                    browser-chrome strip (LAT's own app already has its own header) */}
                <div className="cs-ambient-float" style={{
                  width: isMobile ? 'calc(100% + 48px)' : isTablet ? 'calc(100% + 80px)' : '84%',
                  marginTop: isMobile ? '24px' : '32px',
                  animationDelay: '0s',
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
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label="LAT CapEx proposal workflow"
                          style={{ display: 'block', width: '100%', height: 'auto' }}
                        >
                          <source src="/videos/lat/LAT%20Landing%20inner%20screen.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    <div className="cs-laptop-hinge"></div>
                    <div className="cs-laptop-base"><div className="cs-laptop-notch"></div></div>
                  </div>
                </div>
              </article>
              </Reveal>

              {/* Card 2 - Keye */}
              <Reveal>
              <article
                onClick={() => router.push('/work/keye')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: 'transparent',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="Keye"
                  meta="Marketplace · B2C"
                  year="2021–2022"
                  badge="Shipped"
                />

                {/* Landing hero — same video + laptop treatment used as the hero in the Keye case study */}
                <div className="cs-ambient-float" style={{
                  width: isMobile ? 'calc(100% + 48px)' : isTablet ? 'calc(100% + 80px)' : '84%',
                  marginTop: isMobile ? '24px' : '32px',
                  animationDelay: '-2s',
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
                          <div className="cs-browser-url">ðŸ”’ unlockkeye.com</div>
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
              </Reveal>

              {/* Card 3 - Misinformation Center */}
              <Reveal>
              <article
                onClick={() => router.push('/work/misinformation-center')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                padding: isMobile ? '24px' : isWideDesktop ? '48px' : '40px',
                backgroundColor: 'transparent',
              }}>
                <InfoPill
                  isMobile={isMobile}
                  title="Misinformation Center"
                  meta="Research · Media Literacy"
                  year="Jan–Dec 2024"
                />

                {/* Landing videos, side by side — cropped tight to the phone so they sit seamlessly on the card */}
                <div className="cs-ambient-float" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: isMobile ? '16px' : '24px',
                  width: '100%',
                  marginTop: isMobile ? '24px' : '32px',
                  justifyContent: 'center',
                  padding: isMobile ? '24px 0' : '32px 0',
                  animationDelay: '-4s',
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
                      flex: '1 1 0',
                      width: '100%',
                      maxWidth: isMobile ? '210px' : isTablet ? '300px' : '460px',
                      aspectRatio: '800 / 1020',
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Landing%20video%2003%20cropped.mp4" type="video/mp4" />
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
                      flex: '1 1 0',
                      width: '100%',
                      maxWidth: isMobile ? '210px' : isTablet ? '300px' : '460px',
                      aspectRatio: '800 / 1020',
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Landing%20video%2004%20cropped.mp4" type="video/mp4" />
                  </video>
                </div>
              </article>
              </Reveal>

              {/* Card 4 - Coming Soon (AI-native stealth work) */}
              <Reveal>
              <article style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px dashed rgba(255, 255, 255, 0.18)',
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
                    color: 'rgba(255, 255, 255, 0.35)',
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
                      color: 'rgba(255, 255, 255, 0.35)',
                      marginBottom: '6px',
                    }}>
                      AI-Native · 0→1 · In Stealth
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading), serif',
                      fontSize: isMobile ? '22px' : isWideDesktop ? '30px' : '26px',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '-0.01em',
                      margin: 0,
                      marginBottom: isMobile ? '12px' : '16px',
                    }}>
                      Coming soon
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.35)',
                      maxWidth: '640px',
                      margin: 0,
                    }}>
                      Since 2025, I've been building an AI-forward marketplace in stealth — prototyping, building, and shipping daily with AI agents and LLMs. More here once it ships.
                    </p>
                  </div>
                </div>
              </article>
              </Reveal>
            </div>
          </section>

          </div>

          {/* Closing CTA — a deliberate last beat before the footer links, not just
              another section ending in silence */}
          <Reveal>
            <div style={{
              maxWidth: isWideDesktop ? '1400px' : '1200px',
              marginTop: isMobile ? '80px' : isWideDesktop ? '140px' : '120px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: isMobile ? '0' : isWideDesktop ? '64px' : '48px',
              paddingRight: isMobile ? '0' : isWideDesktop ? '64px' : '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: isMobile ? '24px' : '32px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading), serif',
                fontSize: isMobile ? '28px' : isWideDesktop ? '44px' : '38px',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                lineHeight: '1.15',
                textAlign: 'center',
                margin: 0,
              }}>
                Let's build something people can trust.
              </h2>
              <a
                href="mailto:indhuve05@gmail.com"
                className="cs-pill-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--font-heading), serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '15px' : '16px',
                  color: '#0C0C0D',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  borderRadius: '999px',
                  padding: isMobile ? '12px 22px' : '14px 28px',
                  textDecoration: 'none',
                }}
              >
                Contact me
              </a>
            </div>
          </Reveal>

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
                color: 'rgba(255, 255, 255, 0.75)',
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
              href="/Indhu-Venkatachalam-Senior-Product-Designer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.75)',
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
                color: 'rgba(255, 255, 255, 0.75)',
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
                color: 'rgba(255, 255, 255, 0.75)',
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
