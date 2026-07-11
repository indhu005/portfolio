'use client'
import { useState, useEffect } from 'react'

export default function LandingGameSimple() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '400px',
      backgroundColor: '#F0F0F0',
      borderRadius: '8px',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    }}>
      <h2 style={{
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: 700,
        color: '#1C1917',
        textAlign: 'center',
      }}>
        Plant faster than the city can build
      </h2>
      <p style={{
        fontSize: isMobile ? '16px' : '18px',
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        Interactive game coming soon. Small, deliberate choices under pressure — that's the whole job.
      </p>
      <button
        onClick={() => {
          const workSection = document.getElementById('case-studies')
          if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: '#FFF44F',
          color: '#1C1917',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF76B'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFF44F'}
      >
        View My Work →
      </button>
    </div>
  )
}
