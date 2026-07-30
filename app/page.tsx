'use client'
import Sidebar from '@/components/Sidebar'
import LandingGameSimple from '@/components/LandingGameSimple'
import { useState, useEffect } from 'react'

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
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isWideDesktop = useMediaQuery('(min-width: 2200px)')

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
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 20px' : isWideDesktop ? '0 80px 80px 80px' : '0 48px 60px 20px',
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

          {/* Home page content */}
          <main style={{
            maxWidth: isWideDesktop ? '1100px' : '920px',
            marginTop: '0px',
            paddingLeft: isMobile ? '0' : isWideDesktop ? '64px' : '48px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '34px' : isTablet ? '45px' : isWideDesktop ? '67px' : '56px',
              fontWeight: 700,
              lineHeight: '1.1',
              color: '#1C1917',
              marginTop: isWideDesktop ? '20px' : '0',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '56px' : '48px',
              letterSpacing: '-0.02em',
            }}>
              Hi, I'm Indhu
            </h1>

            <div style={{
              fontSize: isMobile ? '17px' : isWideDesktop ? '20px' : '18px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px' }}>
                I'm a product designer based in Seattle, exploring the space between architecture and digital products. Currently working on projects that feel more like spaces you want to stay in than apps you have to use.
              </p>

              <p style={{ marginBottom: isWideDesktop ? '32px' : '28px' }}>
                My work lives somewhere between structure and storytelling — building systems that scale while keeping the details that make things feel human.
              </p>
            </div>
          </main>

          {/* Case Studies Section */}
          <section id="case-studies" style={{
            maxWidth: isWideDesktop ? '1400px' : '1200px',
            marginTop: isMobile ? '60px' : isWideDesktop ? '120px' : '100px',
            paddingLeft: isMobile ? '0' : isWideDesktop ? '64px' : '48px',
          }}>
            {/* Section Header */}
            <h2 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '22px' : isWideDesktop ? '39px' : '34px',
              fontWeight: 700,
              color: '#1C1917',
              marginBottom: isMobile ? '32px' : isWideDesktop ? '64px' : '48px',
              letterSpacing: '-0.01em',
            }}>
              Selected Work
            </h2>

            {/* Case Study Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '60px' : isWideDesktop ? '100px' : '80px',
            }}>
              {/* Card 1 - LAT */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Title */}
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

                {/* Description */}
                <p style={{
                  fontSize: isMobile ? '16px' : isWideDesktop ? '19px' : '18px',
                  lineHeight: '1.6',
                  color: '#57534E',
                  marginBottom: isMobile ? '24px' : isWideDesktop ? '40px' : '32px',
                  maxWidth: '800px',
                }}>
                  Turning fragmented campus maintenance into a trusted financial decision system through ML-driven lifecycle intelligence.
                </p>

                {/* Landing Image */}
                <a
                  href="/work/lat"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="/images/home/Landing LAT.png"
                    alt="LAT Platform"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: isMobile ? '280px' : isWideDesktop ? '600px' : '500px',
                      objectFit: 'cover',
                      backgroundColor: '#E5E5E5',
                      borderRadius: '12px',
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
              </article>

              {/* Card 2 - Keye */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Title */}
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

                {/* Description */}
                <p style={{
                  fontSize: isMobile ? '16px' : isWideDesktop ? '19px' : '18px',
                  lineHeight: '1.6',
                  color: '#57534E',
                  marginBottom: isMobile ? '24px' : isWideDesktop ? '40px' : '32px',
                  maxWidth: '800px',
                }}>
                  From three static screens to a YC-backed subscription marketplace — designing ClassPass for digital tools.
                </p>

                {/* Landing Video */}
                <a
                  href="/work/keye"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <video
                    src="/videos/Keye/Home page Landing.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: isMobile ? '280px' : isWideDesktop ? '600px' : '500px',
                      objectFit: 'cover',
                      backgroundColor: '#E5E5E5',
                      borderRadius: '12px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
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
              </article>

              {/* Card 3 - Misinformation Center */}
              <article style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Title */}
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

                {/* Description */}
                <p style={{
                  fontSize: isMobile ? '16px' : isWideDesktop ? '19px' : '18px',
                  lineHeight: '1.6',
                  color: '#57534E',
                  marginBottom: isMobile ? '24px' : isWideDesktop ? '40px' : '32px',
                  maxWidth: '800px',
                }}>
                  Media literacy tools for the AI age — equipping people to identify misinformation themselves through verification, education, and trust.
                </p>

                {/* Landing Image */}
                <a
                  href="/work/misinformation-center"
                  style={{
                    display: 'block',
                    width: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="/images/home/Landing misinformation.png"
                    alt="Misinformation Center"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: isMobile ? '280px' : isWideDesktop ? '600px' : '500px',
                      objectFit: 'cover',
                      backgroundColor: '#E5E5E5',
                      borderRadius: '12px',
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
              </article>
            </div>
          </section>

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
                e.currentTarget.style.borderBottomColor = '#1C1917'
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
                e.currentTarget.style.borderBottomColor = '#1C1917'
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
                e.currentTarget.style.borderBottomColor = '#1C1917'
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
