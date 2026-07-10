'use client'
import Sidebar from '@/components/Sidebar'
import LandingGame from '@/components/LandingGame'
import { useState, useEffect } from 'react'

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1600px)')

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
            background: '#F42E5F',
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
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 20px' : '0 48px 60px 20px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Landing Game */}
          <div style={{
            marginBottom: isMobile ? '40px' : '64px',
          }}>
            <LandingGame />
          </div>

          {/* Home page content */}
          <div style={{
            maxWidth: '920px',
            marginTop: isMobile ? '0px' : '-20px',
            paddingLeft: isMobile ? '0' : '48px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '48px' : isTablet ? '64px' : isLargeDesktop ? '104px' : '80px',
              fontWeight: 700,
              lineHeight: '1.1',
              color: '#1C1917',
              marginBottom: isMobile ? '32px' : isLargeDesktop ? '64px' : '48px',
              letterSpacing: '-0.02em',
            }}>
              Hi, I'm Indhu
            </h1>

            <div style={{
              fontSize: isMobile ? '17px' : isLargeDesktop ? '23px' : '18px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{ marginBottom: '28px' }}>
                I'm a product designer based in Seattle, exploring the space between architecture and digital products. Currently working on projects that feel more like spaces you want to stay in than apps you have to use.
              </p>

              <p style={{ marginBottom: '28px' }}>
                My work lives somewhere between structure and storytelling — building systems that scale while keeping the details that make things feel human.
              </p>
            </div>
          </div>

          {/* Case Studies Section */}
          <div id="case-studies" style={{
            maxWidth: isLargeDesktop ? '1600px' : '1200px',
            marginTop: isMobile ? '60px' : isLargeDesktop ? '140px' : '100px',
            paddingLeft: isMobile ? '0' : '48px',
          }}>
            {/* Section Header */}
            <h2 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '32px' : isLargeDesktop ? '62px' : '48px',
              fontWeight: 700,
              color: '#1C1917',
              marginBottom: isMobile ? '32px' : isLargeDesktop ? '64px' : '48px',
              letterSpacing: '-0.01em',
            }}>
              Selected Work
            </h2>

            {/* Case Study Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '40px' : '60px',
            }}>
              {/* Card 1 - LAT */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '20px' : isLargeDesktop ? '56px' : '40px',
                alignItems: isMobile ? 'flex-start' : 'center',
              }}>
                {/* Image Placeholder */}
                <div style={{
                  width: isMobile ? '100%' : isLargeDesktop ? '640px' : '480px',
                  height: isMobile ? '240px' : isLargeDesktop ? '426px' : '320px',
                  backgroundColor: '#E5E5E5',
                  borderRadius: '8px',
                  flexShrink: 0,
                }} />

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: isMobile ? '24px' : isLargeDesktop ? '42px' : '32px',
                    fontWeight: 600,
                    color: '#1C1917',
                    marginBottom: '8px',
                  }}>
                    LAT Platform
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '16px' : isLargeDesktop ? '23px' : '18px',
                    lineHeight: '1.6',
                    color: '#57534E',
                  }}>
                    Redesigning mental health assessment tools to reduce clinician burnout and improve patient care outcomes.
                  </p>
                  <a
                    href="/work/lat"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: isLargeDesktop ? '21px' : '16px',
                      fontWeight: 500,
                      color: '#1C1917',
                      textDecoration: 'none',
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none'
                    }}
                  >
                    View Case Study ↗
                  </a>
                </div>
              </div>

              {/* Card 2 - Keye */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '20px' : isLargeDesktop ? '56px' : '40px',
                alignItems: isMobile ? 'flex-start' : 'center',
              }}>
                {/* Image Placeholder */}
                <div style={{
                  width: isMobile ? '100%' : isLargeDesktop ? '640px' : '480px',
                  height: isMobile ? '240px' : isLargeDesktop ? '426px' : '320px',
                  backgroundColor: '#E5E5E5',
                  borderRadius: '8px',
                  flexShrink: 0,
                }} />

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: isMobile ? '24px' : isLargeDesktop ? '42px' : '32px',
                    fontWeight: 600,
                    color: '#1C1917',
                    marginBottom: '8px',
                  }}>
                    Keye
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '16px' : isLargeDesktop ? '23px' : '18px',
                    lineHeight: '1.6',
                    color: '#57534E',
                  }}>
                    Building a community-driven platform that helps people discover and share authentic local experiences.
                  </p>
                  <a
                    href="/work/keye"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: isLargeDesktop ? '21px' : '16px',
                      fontWeight: 500,
                      color: '#1C1917',
                      textDecoration: 'none',
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none'
                    }}
                  >
                    View Case Study ↗
                  </a>
                </div>
              </div>

              {/* Card 3 - Misinformation Center */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '20px' : isLargeDesktop ? '56px' : '40px',
                alignItems: isMobile ? 'flex-start' : 'center',
              }}>
                {/* Image Placeholder */}
                <div style={{
                  width: isMobile ? '100%' : isLargeDesktop ? '640px' : '480px',
                  height: isMobile ? '240px' : isLargeDesktop ? '426px' : '320px',
                  backgroundColor: '#E5E5E5',
                  borderRadius: '8px',
                  flexShrink: 0,
                }} />

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: isMobile ? '24px' : isLargeDesktop ? '42px' : '32px',
                    fontWeight: 600,
                    color: '#1C1917',
                    marginBottom: '8px',
                  }}>
                    True Media
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '16px' : isLargeDesktop ? '23px' : '18px',
                    lineHeight: '1.6',
                    color: '#57534E',
                  }}>
                    Designing tools to help users identify and combat misinformation through AI-powered fact checking.
                  </p>
                  <a
                    href="/work/misinformation-center"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: isLargeDesktop ? '21px' : '16px',
                      fontWeight: 500,
                      color: '#1C1917',
                      textDecoration: 'none',
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none'
                    }}
                  >
                    View Case Study ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
