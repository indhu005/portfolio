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
            borderRadius: '8px',
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
              }}>
                {/* Large Image Placeholder */}
                <a
                  href="/work/lat"
                  data-bird-target="true"
                  data-cursor-color="#1F5D3A"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: isMobile ? '320px' : isWideDesktop ? '760px' : '620px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '16px',
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

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginTop: isMobile ? '20px' : '28px',
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
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginBottom: isMobile ? '12px' : '16px',
                      letterSpacing: '-0.01em',
                    }}>
                      LAT Platform
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      Turning fragmented campus maintenance into a trusted financial decision system through ML-driven lifecycle intelligence.
                    </p>
                  </div>
                </div>
              </article>

              {/* Card 2 - Keye */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Large Image Placeholder */}
                <a
                  href="/work/keye"
                  data-bird-target="true"
                  data-cursor-color="#D97B29"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: isMobile ? '320px' : isWideDesktop ? '760px' : '620px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '16px',
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

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginTop: isMobile ? '20px' : '28px',
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
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginBottom: isMobile ? '12px' : '16px',
                      letterSpacing: '-0.01em',
                    }}>
                      Keye
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      From three static screens to a YC-backed subscription marketplace — designing ClassPass for digital tools.
                    </p>
                  </div>
                </div>
              </article>

              {/* Card 3 - Misinformation Center */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Large Image Placeholder */}
                <a
                  href="/work/misinformation-center"
                  data-bird-target="true"
                  data-cursor-color="#B23A3A"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: isMobile ? '320px' : isWideDesktop ? '760px' : '620px',
                    backgroundColor: '#E5E5E5',
                    borderRadius: '16px',
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

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '16px' : '32px',
                  alignItems: 'flex-start',
                  marginTop: isMobile ? '20px' : '28px',
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
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '24px' : isWideDesktop ? '34px' : '28px',
                      fontWeight: 700,
                      color: '#1C1917',
                      marginBottom: isMobile ? '12px' : '16px',
                      letterSpacing: '-0.01em',
                    }}>
                      Misinformation Center
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '19px' : isWideDesktop ? '23px' : '22px',
                      lineHeight: '1.6',
                      color: '#57534E',
                      maxWidth: '800px',
                    }}>
                      Media literacy tools for the AI age — equipping people to identify misinformation themselves through verification, education, and trust.
                    </p>
                  </div>
                </div>
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
                { title: 'Independent Product Designer', company: 'Freelance', years: '2024 – Present' },
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
