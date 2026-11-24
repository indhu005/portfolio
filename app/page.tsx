'use client'
import TopBar from '@/components/TopBar'
import LandingGameSimple from '@/components/LandingGameSimple'
import Typewriter from '@/components/Typewriter'
import { Reveal } from '@/components/ScrollReveal'
import AgenticPipelineConsole from '@/components/AgenticPipelineConsole'
import { useRouter } from 'next/navigation'
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

// Compact pill-shaped label above each case study video — title, category, year, and
// shipped status condensed into one line instead of a full header block.
const InfoPill = ({ title, meta, year, badge, isMobile }: { title: string; meta: string; year: string; badge?: string; isMobile: boolean }) => (
  isMobile ? (
    // Phone: two compact lines in a rounded tag instead of a stretched pill — a
    // single-line pill with this much text wraps into a tall blob at narrow widths.
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px',
      backgroundColor: 'rgba(120, 118, 112, 0.18)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(28, 25, 23, 0.14)',
      borderRadius: '12px',
      padding: '8px 12px',
      maxWidth: '100%',
    }}>
      <span style={{ fontFamily: 'var(--font-heading), serif', fontWeight: 700, fontSize: '13px', color: '#1C1917' }}>
        {title}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '10.5px', fontWeight: 600, color: 'rgba(28, 25, 23, 0.6)' }}>
        <span>{meta}</span>
        <span style={{ color: 'rgba(28, 25, 23, 0.3)' }}>·</span>
        <span>{year}</span>
        {badge && (
          <>
            <span style={{ color: 'rgba(28, 25, 23, 0.3)' }}>·</span>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1C1917' }}>
              {badge}
            </span>
          </>
        )}
      </span>
    </div>
  ) : (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: 'rgba(120, 118, 112, 0.18)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(28, 25, 23, 0.14)',
      borderRadius: '999px',
      padding: '6px 18px',
      maxWidth: '100%',
    }}>
      <span style={{ fontFamily: 'var(--font-heading), serif', fontWeight: 700, fontSize: '13px', color: '#1C1917' }}>
        {title}
      </span>
      <span style={{ color: 'rgba(28, 25, 23, 0.35)' }}>·</span>
      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(28, 25, 23, 0.65)' }}>{meta}</span>
      <span style={{ color: 'rgba(28, 25, 23, 0.35)' }}>·</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(28, 25, 23, 0.65)' }}>{year}</span>
      {badge && (
        <>
          <span style={{ color: 'rgba(28, 25, 23, 0.35)' }}>·</span>
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
  const [revealed, setRevealed] = useState(false)
  const [heroNameTyped, setHeroNameTyped] = useState(false)
  const [splashFading, setSplashFading] = useState(false)
  const [splashVisible, setSplashVisible] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1240px)')
  const isWideDesktop = useMediaQuery('(min-width: 2200px)')

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
      backgroundColor: '#FAF8F3',
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

      <TopBar />

      {/* MAIN COLUMN — the sidebar is gone; TopBar/BottomBar (fixed, overlaid) are
          the nav now, so this is just the full-width scroll container. */}
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
            padding: isMobile ? '72px 20px 100px 20px' : isTablet ? '72px 32px 110px 32px' : isWideDesktop ? '80px 64px 120px 56px' : '72px 40px 110px 36px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FAF8F3',
          }}
        >
          {/* Shared centered wrapper so intro and Selected Work share the same left edge */}
          <div style={{
            maxWidth: isWideDesktop ? '1100px' : '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {/* Home page content */}
          <main style={{
            // No card background here — only the title line below keeps one.
            // Same maxWidth as the shared wrapper (and the Selected Work section
            // below) so edges line up with the work section instead of leaving
            // a dead gutter on the right at normal desktop widths.
            position: 'relative',
            overflow: 'hidden',
            maxWidth: isWideDesktop ? '1100px' : '1000px',
            marginTop: '0px',
            marginLeft: '0',
            marginRight: 'auto',
            textAlign: 'left',
            backgroundColor: 'transparent',
            padding: isMobile ? '8px 4px' : '12px 4px',
          }}>
            {/* Ambient drifting blob behind the hero copy — same low-opacity/blurred
                treatment as the case-studies section blob, just a different hue/phase
                so the hero doesn't read as flat before you scroll to anything else. */}
            <div aria-hidden="true" className="cs-section-blob cs-section-blob--blue" />

            <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: 'var(--font-heading), serif',
              fontSize: isMobile ? '32px' : isTablet ? '40px' : isWideDesktop ? '54px' : '46px',
              fontWeight: 700,
              lineHeight: '1.08',
              color: '#1C1917',
              marginTop: '0',
              marginBottom: isMobile ? '16px' : '20px',
              letterSpacing: '-0.02em',
              ...revealStyle(0),
            }}>
              <Typewriter text="Hi, I'm Indhu" startDelayMs={150} onDone={() => setHeroNameTyped(true)} />
              <span style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}> Venkatachalam</span>
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
                { label: 'Product Manager / Builder', variant: 'solid', pin: false },
                { label: 'Seattle', variant: 'accent', pin: true },
                { label: '0→1, AI/ML & Trustworthy Systems', variant: 'solid', pin: false },
              ].map((item) => (
                <span
                  key={item.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: isMobile ? '10.5px' : '11px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: item.variant === 'solid' ? 'rgba(28, 25, 23, 0.85)' : '#4A6FD4',
                    backgroundColor: item.variant === 'solid' ? 'rgba(28, 25, 23, 0.06)' : 'rgba(74, 114, 229, 0.1)',
                    border: item.variant === 'solid' ? '1px solid rgba(28, 25, 23, 0.12)' : '1px solid rgba(74, 114, 229, 0.25)',
                    borderRadius: '7px',
                    padding: isMobile ? '5px 10px' : '6px 11px',
                  }}
                >
                  {item.pin && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.72 11.19 7.01 11.44a1.5 1.5 0 0 0 1.98 0C13.28 21.19 20 15.25 20 10c0-4.42-3.58-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                        fill="#4A6FD4"
                      />
                    </svg>
                  )}
                  {item.label}
                </span>
              ))}
            </div>

            <div style={{
              fontSize: isMobile ? '14px' : '15px',
              lineHeight: '1.6',
              color: 'rgba(28, 25, 23, 0.8)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading), serif',
                fontSize: isMobile ? '18px' : isWideDesktop ? '22px' : '20px',
                fontWeight: 700,
                lineHeight: '1.35',
                color: '#1C1917',
                marginBottom: isMobile ? '14px' : '16px',
                ...revealStyle(90),
              }}>
                {heroNameTyped && (
                  <Typewriter text="Deciding where AI should act and where people stay in control." startDelayMs={150} showCursor={false} />
                )}
              </p>

              <p style={{ marginBottom: isMobile ? '12px' : '14px', ...revealStyle(120) }}>
                8 years: Gensler, founding Keye, product leadership on LAT. A marketplace that went YC. An enterprise platform at 96% adoption inside a politically sensitive institution.
              </p>

              <p style={{ fontSize: isMobile ? '12.5px' : '13px', color: 'rgba(28, 25, 23, 0.5)', marginBottom: isMobile ? '4px' : '14px', ...revealStyle(140) }}>
                Building for AI agents since 2025.
              </p>
            </div>
            </div>
          </main>

          {/* Case Studies Section */}
          <section id="case-studies" style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: isMobile ? '32px' : isWideDesktop ? '56px' : '44px',
          }}>
            {/* Section Header — left-aligned to match the headline/intro above. */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
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
                  color: '#1C1917',
                  letterSpacing: '-0.01em',
                  lineHeight: '1',
                  margin: 0,
                }}>
                  Selected Work
                </h2>
              </div>
            </div>

            {/* Work — a plain, fully scannable vertical list. Simpler beats clever:
                a recruiter should see every case study at a glance, not have to
                interact to find them. */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '32px' : isWideDesktop ? '40px' : '36px',
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
                          // Crop rule for laptop screenshots: anchor to the top so the
                          // app's own header/nav chrome is always visible, cropping
                          // whatever's cut off from the bottom instead.
                          style={{ display: 'block', width: '100%', aspectRatio: '17 / 10', objectFit: 'cover', objectPosition: 'top center' }}
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

              {/* Card 2 - Agentic Pipeline Console (AI-native stealth work) */}
              <Reveal>
              <article
                onClick={() => router.push('/work/agentic-pipeline-console')}
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
                  title="Agentic Pipeline Console"
                  meta="AI Agent Orchestration"
                  year="2025–Present"
                  badge="In Stealth"
                />

                <div style={{
                  width: isMobile ? 'calc(100% + 48px)' : isTablet ? 'calc(100% + 80px)' : '84%',
                  marginTop: isMobile ? '24px' : '32px',
                  maxWidth: '640px',
                  pointerEvents: 'none',
                }}>
                  <AgenticPipelineConsole />
                </div>
              </article>
              </Reveal>

              {/* Card 3 - Keye */}
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
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label="Keye landing page hero"
                          style={{ display: 'block', width: '100%', aspectRatio: '17 / 10', objectFit: 'cover', objectPosition: 'top center' }}
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

              {/* Card 4 - Misinformation Center */}
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
                  badge="Published"
                />

                {/* Landing videos, side by side — bleeds past the card's own side
                    padding on mobile (negative margin cancels it) so the row gets the
                    full content-area width instead of being squeezed by it. */}
                <div className="cs-ambient-float" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: isMobile ? '10px' : '24px',
                  width: isMobile ? 'calc(100% + 48px)' : '100%',
                  marginLeft: isMobile ? '-24px' : 0,
                  marginRight: isMobile ? '-24px' : 0,
                  marginTop: isMobile ? '16px' : '20px',
                  justifyContent: 'center',
                  // Crop rule for these phone screen recordings (objectPosition
                  // on the videos below): anchor to the bottom so the status
                  // bar/notch stays flush with the frame — different from the
                  // laptop cards above because these have no fixed app header
                  // worth preserving, just whatever screen the loop lands on.
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
                      minWidth: 0,
                      width: '100%',
                      maxWidth: isMobile ? '220px' : isTablet ? '420px' : '460px',
                      // The source video is an 800x1020 canvas but the actual phone
                      // mockup only fills a centered 436x890 region (measured via
                      // ffmpeg cropdetect) — matching the box to that aspect ratio
                      // and letting cover zoom in crops out the baked-in black
                      // padding instead of leaving a visible gap around the phone.
                      aspectRatio: '436 / 890',
                      objectFit: 'cover',
                      objectPosition: '50% 100%',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Landing%20video%2005%20cropped.mp4" type="video/mp4" />
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
                      minWidth: 0,
                      width: '100%',
                      maxWidth: isMobile ? '220px' : isTablet ? '420px' : '460px',
                      // The source video is an 800x1020 canvas but the actual phone
                      // mockup only fills a centered 436x890 region (measured via
                      // ffmpeg cropdetect) — matching the box to that aspect ratio
                      // and letting cover zoom in crops out the baked-in black
                      // padding instead of leaving a visible gap around the phone.
                      aspectRatio: '436 / 890',
                      objectFit: 'cover',
                      objectPosition: '50% 100%',
                      borderRadius: '0px',
                    }}
                  >
                    <source src="/videos/misinformationcenter/Landing%20video%2006%20cropped.mp4" type="video/mp4" />
                  </video>
                </div>
              </article>
              </Reveal>

            </div>
          </section>

          {/* Landing Game — now sits after the Selected Work section; same
              maxWidth as the wrapper so the grid's left edge still lines up
              with the rest of the page. */}
          <div style={{
            marginTop: isMobile ? '40px' : isWideDesktop ? '64px' : '56px',
            marginBottom: isMobile ? '20px' : isWideDesktop ? '36px' : '28px',
          }}>
            <LandingGameSimple
              edgeLeft={isMobile ? 20 : isTablet ? 32 : isWideDesktop ? 56 : 36}
              edgeRight={isMobile ? 20 : isTablet ? 32 : isWideDesktop ? 64 : 40}
              edgeTop={0}
            />
          </div>

          </div>

          {/* Closing CTA — a deliberate last beat before the footer links, not just
              another section ending in silence */}
          <Reveal>
            <div style={{
              maxWidth: isWideDesktop ? '1100px' : '1000px',
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
                color: '#1C1917',
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
                  color: '#FFFFFF',
                  backgroundColor: '#1C1917',
                  border: '1px solid #1C1917',
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
            maxWidth: isWideDesktop ? '1100px' : '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: isMobile ? '60px' : isWideDesktop ? '100px' : '80px',
            paddingBottom: isMobile ? '40px' : '60px',
            display: 'flex',
            gap: isMobile ? '24px' : '32px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <a
              href="/about"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(28, 25, 23, 0.75)',
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
              href="https://calendly.com/indhuve05/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(28, 25, 23, 0.75)',
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
              Book a time
            </a>
            <a
              href="/Indhu-Venkatachalam-Senior-Product-Design-Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(28, 25, 23, 0.75)',
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(28, 25, 23, 0.75)',
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
              LinkedIn
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3.5 8.5L8.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M4.5 3.5H8.5V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="mailto:indhuve05@gmail.com"
              style={{
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: 500,
                color: 'rgba(28, 25, 23, 0.75)',
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

          {/* Fun sign-off — small, dry, in the same voice as the game's own
              copy rather than a generic "made with love" line. */}
          <p style={{
            maxWidth: isWideDesktop ? '1100px' : '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: isMobile ? '40px' : '60px',
            marginTop: isMobile ? '-20px' : '-40px',
            fontSize: isMobile ? '12.5px' : '13px',
            fontStyle: 'italic',
            color: 'rgba(28, 25, 23, 0.4)',
            textAlign: 'center',
          }}>
            No real cities were built or destroyed in the making of this page. 🌳
          </p>
        </div>


      </div>
    </div>
  )
}
