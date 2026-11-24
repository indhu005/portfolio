'use client'
import TopBar from '@/components/TopBar'
import LandingGameSimple from '@/components/LandingGameSimple'
import HeroImageTrail from '@/components/HeroImageTrail'
import FlowingImages from '@/components/FlowingImages'
import { flowingCards, stillCards } from '@/lib/extraCards'
import Typewriter from '@/components/Typewriter'
import { Reveal } from '@/components/ScrollReveal'
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

// Plain-text label below each case study video — title, category, year, and
// status broken into a heading line plus a row of pill chips underneath.
const InfoPill = ({ title, meta, year, badge, isMobile, dark = false }: { title: string; meta: string; year: string; badge?: string; isMobile: boolean; dark?: boolean }) => {
  const headingColor = dark ? '#FFFFFF' : '#1C1917'
  const pillBase: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: isMobile ? '10.5px' : '11.5px',
    fontWeight: 600,
    color: dark ? 'rgba(255, 255, 255, 0.82)' : 'rgba(28, 25, 23, 0.7)',
    backgroundColor: dark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(28, 25, 23, 0.06)',
    border: dark ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(28, 25, 23, 0.1)',
    borderRadius: '999px',
    padding: '3px 10px',
    whiteSpace: 'nowrap',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '10px' }}>
      <span style={{ fontFamily: 'var(--font-heading), serif', fontWeight: 700, fontSize: isMobile ? '16px' : '19px', color: headingColor }}>
        {title}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={pillBase}>{meta}</span>
        <span style={pillBase}>{year}</span>
        {badge && (
          <span style={{ ...pillBase, color: headingColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {badge}
          </span>
        )}
      </div>
    </div>
  )
}

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
            padding: isMobile ? '150px 20px 100px 20px' : isTablet ? '170px 32px 110px 32px' : isWideDesktop ? '150px 64px 120px 56px' : '140px 40px 110px 36px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Shared centered wrapper so intro and Selected Work share the same left edge */}
          <div style={{
            maxWidth: isWideDesktop ? '1800px' : '1500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {/* Home page content */}
          <main style={{
            // Hero is a two-column row on desktop: intro copy on the left, the
            // tree game filling the space on the right (which used to sit empty).
            // Stacks to a single column on mobile/tablet.
            position: 'relative',
            overflow: 'visible',
            width: '100%',
            marginTop: '0px',
            marginLeft: '0',
            marginRight: 'auto',
            textAlign: 'left',
            backgroundColor: 'transparent',
            padding: isMobile ? '8px 4px' : '12px 4px',
            display: 'flex',
            flexDirection: isMobile || isTablet ? 'column' : 'row',
            alignItems: isMobile || isTablet ? 'stretch' : 'flex-start',
            gap: isMobile ? '40px' : isTablet ? '48px' : '32px',
          }}>
            {/* Ambient drifting blob behind the hero copy — same low-opacity/blurred
                treatment as the case-studies section blob, just a different hue/phase
                so the hero doesn't read as flat before you scroll to anything else. */}
            <div aria-hidden="true" className="cs-section-blob cs-section-blob--blue" />

            {/* Cursor image-trail — "photos I clicked" spawn + fade as the pointer
                moves across the hero. */}
            <HeroImageTrail />

            <div style={{
              position: 'relative',
              zIndex: 1,
              flex: isMobile || isTablet ? '1 1 auto' : '0 0 520px',
              maxWidth: isMobile || isTablet ? '100%' : '520px',
              // Drop the intro so its last line lands on the game grid's bottom row.
              marginTop: isMobile || isTablet ? 0 : '378px',
            }}>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: isMobile ? '64px' : isTablet ? '96px' : isWideDesktop ? '132px' : '112px',
                  fontWeight: 600,
                  lineHeight: '0.92',
                  color: '#1C1917',
                  marginTop: '0',
                  marginBottom: isMobile ? '20px' : '28px',
                  letterSpacing: '-0.03em',
                  ...revealStyle(0),
                }}>
                  <Typewriter text="Indhu" startDelayMs={150} onDone={() => setHeroNameTyped(true)} />
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
                  marginTop: isMobile ? '20px' : '28px',
                  fontSize: isMobile ? '15px' : isWideDesktop ? '17px' : '16px',
                  lineHeight: '1.75',
                  color: 'rgba(28, 25, 23, 0.78)',
                  maxWidth: '52ch',
                  ...revealStyle(90),
                }}>
                  <p style={{ margin: 0 }}>
                    Product manager and builder in Seattle, previously a product designer and, before that, an architect. Eight years taking <span style={{ color: '#1C1917', fontWeight: 600 }}>0→1 and AI products</span> to launch. Early product work on <span style={{ color: '#1C1917', fontWeight: 600 }}>Keye</span> (later YC) and product lead on <span style={{ color: '#1C1917', fontWeight: 600 }}>LAT</span>, an enterprise AI platform at 96% adoption.
                  </p>
                </div>

                <div style={{ marginTop: isMobile ? '20px' : '24px', fontSize: isMobile ? '13.5px' : '14px', color: 'rgba(28, 25, 23, 0.55)', fontStyle: 'italic', fontFamily: 'var(--font-fraunces), serif', ...revealStyle(130) }}>
                  Outside of work, you&apos;ll find me clicking photos of trees.
                </div>
              </div>
            </div>

            {/* Tree game — fills the right side of the hero on desktop; drops below
                the intro on narrower screens. Lifted up into the top padding so it
                sits higher than the intro copy. */}
            <div data-no-trail style={{
              position: 'relative',
              zIndex: 1,
              // Shrink to the game's natural width on desktop so no empty strip
              // trails to the right of the grid; full-width when stacked.
              flex: isMobile || isTablet ? '1 1 auto' : '0 0 auto',
              minWidth: 0,
              width: isMobile || isTablet ? '100%' : 'auto',
              marginLeft: isMobile || isTablet ? 0 : 'auto',
              // Lift the game so its instruction card's top meets the top-bar top.
              marginTop: isMobile || isTablet ? 0 : '-130px',
            }}>
              <LandingGameSimple
                edgeLeft={0}
                edgeRight={0}
                edgeTop={0}
              />
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

            {/* Work — a 2x2 grid (single column on mobile). Video/mockup leads
                each card, title + outcome sit below it, so the grid reads as a
                gallery of shipped work rather than a list of résumé lines. */}
            {/* Connected table grid — cells touch, with hairline dividers formed by
                the 1px gaps showing the container's line-colored background through.
                Scales to any number of projects: new cells just extend the grid. */}
            {/* Accordion row — flex cells that expand on hover (see .cs-work-cell).
                The 1px gaps over the line-colored background form the dividers. */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '16px' : '20px',
            }}>
              {/* Card 1 - LAT */}
              <Reveal className="cs-work-cell" style={{ backgroundColor: '#141210' }}>
              <article
                onClick={() => router.push('/work/lat')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                boxSizing: 'border-box',
                padding: isMobile ? '24px' : '32px',
                backgroundColor: 'transparent',
              }}>
                {/* Landing hero — laptop sits inside a soft orange rounded panel.
                    The panel's padding scales the laptop down so nothing reads as
                    cut, and a shared minHeight keeps LAT's and Keye's headings aligned
                    despite the two source videos differing in aspect ratio. */}
                <div className="cs-work-panel" style={{
                  width: '100%',
                  height: isMobile ? 'auto' : isWideDesktop ? '360px' : '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: '0',
                  padding: isMobile ? '16px' : '26px',
                }}>
                  <div
                    className="cs-laptop-mockup"
                    style={{
                      width: '100%',
                      maxWidth: isMobile ? 'none' : isWideDesktop ? '430px' : '360px',
                      margin: '0 auto',
                    }}
                  >
                    <div className="cs-laptop-lid">
                      <div className="cs-laptop-camera"></div>
                      <div className="cs-laptop-screen" style={{ backgroundColor: '#FFFFFF' }}>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label="LAT CapEx proposal workflow"
                          // Box aspect ratio matches the source video's own native
                          // 1216x752 exactly, so it fills the frame with no crop and
                          // no letterboxing either.
                          style={{ display: 'block', width: '100%', aspectRatio: '1216 / 752', objectFit: 'contain', objectPosition: 'top center' }}
                        >
                          <source src="/videos/lat/LAT%20Landing%20inner%20screen.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    <div className="cs-laptop-hinge"></div>
                    <div className="cs-laptop-base"><div className="cs-laptop-notch"></div></div>
                  </div>
                </div>

                <div style={{ marginTop: isMobile ? '20px' : '24px' }}>
                  <InfoPill
                    isMobile={isMobile}
                    dark
                    title="LAT Platform"
                    meta="Enterprise AI · 0→1 Systems"
                    year="Jun 2023 – May 2024"
                    badge="Shipped"
                  />
                </div>

                <p style={{
                  fontSize: isMobile ? '13px' : '14px',
                  color: 'rgba(255, 255, 255, 0.78)',
                  textAlign: 'left',
                  lineHeight: '1.7',
                  maxWidth: '100%',
                  marginTop: isMobile ? '12px' : '14px',
                  marginBottom: 0,
                }}>
                  Took an AI maintenance tool from a 1,000-person pilot to <strong style={{ color: '#FFFFFF' }}>30,000 users</strong> at <strong style={{ color: '#FFFFFF' }}>96% weekly active use</strong>, deciding which $180K repairs got approved.
                </p>
              </article>
              </Reveal>

              {/* Card 3 - Keye */}
              <Reveal className="cs-work-cell" style={{ backgroundColor: '#4F7DDD' }}>
              <article
                onClick={() => router.push('/work/keye')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                boxSizing: 'border-box',
                padding: isMobile ? '24px' : '32px',
                backgroundColor: 'transparent',
              }}>
                {/* Landing hero — laptop sits inside a soft blue rounded panel,
                    mirroring LAT's orange one (same radius, padding, and minHeight
                    so the two cards' headings line up). */}
                <div className="cs-work-panel" style={{
                  width: '100%',
                  height: isMobile ? 'auto' : isWideDesktop ? '360px' : '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: '0',
                  padding: isMobile ? '16px' : '26px',
                }}>
                  <div
                    className="cs-laptop-mockup"
                    style={{
                      width: '100%',
                      maxWidth: isMobile ? 'none' : isWideDesktop ? '430px' : '360px',
                      margin: '0 auto',
                    }}
                  >
                    <div className="cs-laptop-lid">
                      <div className="cs-laptop-camera"></div>
                      <div className="cs-laptop-screen" style={{ backgroundColor: '#FFFFFF' }}>
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label="Keye landing page hero"
                          // Box aspect ratio matches the source video's own native
                          // 2410x1374 exactly, so it fills the frame with no crop and
                          // no letterboxing either.
                          style={{ display: 'block', width: '100%', aspectRatio: '2410 / 1374', objectFit: 'contain', objectPosition: 'top center' }}
                        >
                          <source src="/videos/Keye/Keye%20hero%20cropped.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    <div className="cs-laptop-hinge"></div>
                    <div className="cs-laptop-base"><div className="cs-laptop-notch"></div></div>
                  </div>
                </div>

                <div style={{ marginTop: isMobile ? '20px' : '24px' }}>
                  <InfoPill
                    isMobile={isMobile}
                    dark
                    title="Keye"
                    meta="Marketplace · B2C"
                    year="2021–2022"
                    badge="Shipped"
                  />
                </div>

                <p style={{
                  fontSize: isMobile ? '13px' : '14px',
                  color: 'rgba(255, 255, 255, 0.82)',
                  textAlign: 'left',
                  lineHeight: '1.7',
                  maxWidth: '100%',
                  marginTop: isMobile ? '12px' : '14px',
                  marginBottom: 0,
                }}>
                  Built a credit marketplace from three static screens to <strong style={{ color: '#FFFFFF' }}>20,000 monthly users</strong> and a <strong style={{ color: '#FFFFFF' }}>$1.5M raise</strong> that later went YC.
                </p>
              </article>
              </Reveal>

              {/* Card 4 - Misinformation Center */}
              <Reveal className="cs-work-cell" style={{ backgroundColor: '#FFFFFF' }}>
              <article
                onClick={() => router.push('/work/misinformation-center')}
                style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                boxSizing: 'border-box',
                padding: isMobile ? '24px' : '32px',
                backgroundColor: 'transparent',
              }}>
                {/* Landing videos, side by side inside a neutral grey rounded
                    panel — same radius/padding treatment as the LAT and Keye
                    panels above, just a different fill. */}
                <div className="cs-work-panel" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: isMobile ? '12px' : '18px',
                  width: '100%',
                  height: isMobile ? 'auto' : isWideDesktop ? '360px' : '320px',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: '0',
                  padding: isMobile ? '16px' : '26px',
                }}>
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    flex: '1 1 0',
                    minWidth: 0,
                    width: '100%',
                    maxWidth: isMobile ? '130px' : isWideDesktop ? '150px' : '130px',
                    aspectRatio: '436 / 890',
                  }}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Misinformation Center scan feature"
                      style={{
                        display: 'block',
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        // This source is already a tight, true-white-bg crop of just
                        // the phone (448x906, near-identical aspect to the box below)
                        // — no canvas margin to crop out, unlike the old Landing-video
                        // exports which had the project's cream bg baked in.
                        objectFit: 'cover',
                        objectPosition: '50% 50%',
                        borderRadius: '0px',
                      }}
                    >
                      <source src="/videos/misinformationcenter/Scan.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    flex: '1 1 0',
                    minWidth: 0,
                    width: '100%',
                    maxWidth: isMobile ? '130px' : isWideDesktop ? '150px' : '130px',
                    aspectRatio: '436 / 890',
                  }}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Misinformation Center submit feature"
                      style={{
                        display: 'block',
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: '50% 50%',
                        borderRadius: '0px',
                      }}
                    >
                      <source src="/videos/misinformationcenter/Submit.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div style={{ marginTop: isMobile ? '20px' : '24px' }}>
                  <InfoPill
                    isMobile={isMobile}
                    title="Misinformation Center"
                    meta="Research · Media Literacy"
                    year="Jan–Dec 2024"
                    badge="Published"
                  />
                </div>

                <p style={{
                  fontSize: isMobile ? '13px' : '14px',
                  color: 'rgba(28, 25, 23, 0.7)',
                  textAlign: 'left',
                  lineHeight: '1.7',
                  maxWidth: '100%',
                  marginTop: isMobile ? '12px' : '14px',
                  marginBottom: 0,
                }}>
                  A grad-school capstone on helping people judge what&apos;s real online. Tested live with <strong style={{ color: '#1C1917' }}>~1,800 people</strong> at Misinfo Day, which reshaped the whole approach.
                </p>
              </article>
              </Reveal>

            </div>

            {/* Non-clickable visual cards — folders of work playing like GIFs and
                a few stills — in their own tighter 5-up grid below the studies. Flex
                so a short last row stretches to fill (no empty grey cells). */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '16px' : '20px',
              marginTop: isMobile ? '16px' : '20px',
            }}>
              {[
                ...flowingCards.map((c) => ({ key: c.title, images: c.images as string[] | undefined, image: undefined as string | undefined, fast: !!c.fast })),
                ...stillCards.map((c) => ({ key: c.title, images: undefined as string[] | undefined, image: c.image, fast: false })),
              ].map((card) => (
                <div
                  key={card.key}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    flex: isMobile ? '1 1 calc(50% - 8px)' : isTablet ? '1 1 calc(33.333% - 14px)' : '1 1 calc(20% - 16px)',
                    minWidth: 0,
                    height: isMobile ? '160px' : isWideDesktop ? '240px' : '200px',
                    backgroundColor: '#F2F0EB',
                  }}
                >
                  {card.images
                    ? (card.key === 'Site'
                        // Unlike images (site photo, Toronto map, diagrams) — hard-cut
                        // between them so dissimilar frames never blend into a "filter".
                        ? <FlowingImages images={card.images} frameMs={3200} crossfadeMs={0} fit="contain" />
                        : card.fast
                          ? <FlowingImages images={card.images} frameMs={420} crossfadeMs={240} />
                          : <FlowingImages images={card.images} frameMs={4200} />)
                    : <img src={card.image} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
              ))}
            </div>
          </section>

          </div>

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
