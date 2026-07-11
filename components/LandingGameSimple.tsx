'use client'
import { useState, useEffect } from 'react'

const GRID_ROWS = 4
const GRID_COLS_DESKTOP = 8
const GRID_COLS_MOBILE = 6

// Simple ground marker component
const GroundMarker = ({ size = 60 }: { size?: number }) => {
  const ellipseWidth = size * 0.7 * 0.2
  const ellipseHeight = size * 0.3 * 0.2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <ellipse
        cx={size / 2}
        cy={size * 0.8}
        rx={ellipseWidth / 2}
        ry={ellipseHeight / 2}
        fill="#D1D1D1"
        opacity="0.4"
      />
    </svg>
  )
}

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

  const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
  const cellSize = isMobile ? 48 : 80
  const gap = isMobile ? 8 : 16

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      padding: isMobile ? '16px' : '20px',
      paddingBottom: isMobile ? '90px' : '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '40px' : '60px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <div style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 600,
          color: '#1C1917',
          marginBottom: '12px',
          fontFamily: 'var(--font-fraunces), serif',
        }}>
          Plant faster than the city can build. Good luck.
        </div>
        <div style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#6B7280',
        }}>
          {isMobile ? 'Tap' : 'Click'} to plant trees.
        </div>
      </div>

      {/* Grid */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: `${gap}px`,
        zIndex: 10,
      }}>
        {Array.from({ length: GRID_ROWS * cols }).map((_, index) => {
          const row = Math.floor(index / cols)
          const col = index % cols

          return (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'relative',
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <GroundMarker size={cellSize} />
            </div>
          )
        })}
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          const workSection = document.getElementById('case-studies')
          if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        style={{
          marginTop: '40px',
          padding: '12px 24px',
          backgroundColor: 'rgba(28, 25, 23, 0.9)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'DM Sans, sans-serif',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1C1917'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.9)'}
      >
        Skip to Work →
      </button>
    </div>
  )
}
