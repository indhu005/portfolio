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

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F7F4F0',
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
            backgroundColor: '#F7F4F0',
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
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : '0 48px 60px 0px',
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
            marginTop: isMobile ? '-36px' : '-20px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: 700,
              lineHeight: '1.1',
              color: '#1C1917',
              marginBottom: isMobile ? '32px' : '48px',
              letterSpacing: '-0.02em',
            }}>
              Hi, I'm Indhu
            </h1>

            <div style={{
              fontSize: isMobile ? '17px' : '18px',
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
        </div>

      </div>
    </div>
  )
}
