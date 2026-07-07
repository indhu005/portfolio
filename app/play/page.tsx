'use client'
import Sidebar from '@/components/Sidebar'
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

export default function Play() {
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

        {/* TOPBAR */}
        <div style={{
          height: isMobile ? '60px' : '72px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 48px 0 0px',
          paddingTop: isMobile ? '20px' : '24px',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'inherit',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 700,
            color: '#1C1917',
          }}>Play</span>
          {!isMobile && (
            <span style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#9CA3AF',
            }}>Experiments & Side Projects</span>
          )}
        </div>

        {/* CONTENT AREA */}
        <div
          data-scroll-container
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : '0 48px 60px 0px',
            minWidth: 0,
            scrollBehavior: 'smooth',
          }}
        >
          {/* Gallery grid - 4x2 (8 items) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '16px' : '24px',
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                style={{
                  width: '100%',
                  height: isMobile ? '200px' : '280px',
                  backgroundColor: '#7EB3F5',
                  borderRadius: '4px',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
