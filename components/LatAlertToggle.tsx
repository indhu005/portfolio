'use client'
import { useState, useEffect } from 'react'

type Framing = 'probability' | 'consequence'

const tiers = [
  { label: 'Critical', bg: '#DCFCE7', color: '#166534' },
  { label: 'Monitor', bg: '#FEF3C7', color: '#92400E' },
  { label: 'Safe', bg: '#F3F4F6', color: '#57534E' },
]

const frames: { key: Framing; label: string; content: React.ReactNode }[] = [
  { key: 'probability', label: 'Probability framing', content: 'Boiler failure risk: 68%' },
  {
    key: 'consequence',
    label: 'Consequence framing',
    content: <>High vibration + 9yr service &rarr; $18K if replaced now</>,
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    setIsMobile(media.matches)
    const listener = () => setIsMobile(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])
  return isMobile
}

export default function LatAlertToggle() {
  const [framing, setFraming] = useState<Framing>('probability')
  const isMobile = useIsMobile()

  return (
    <div style={{ width: '100%', marginTop: '40px', marginBottom: '40px' }}>
      <div style={{
        fontSize: '12px',
        color: '#9CA3AF',
        textAlign: 'center',
        marginBottom: '16px',
      }}>
        Click either card to compare
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px' }}>
        {frames.map((frame) => {
          const active = framing === frame.key
          return (
            <div key={frame.key} style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: active ? '#1C1917' : '#9CA3AF',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px',
                transition: 'color 0.25s ease',
              }}>
                {frame.label}
              </div>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => setFraming(frame.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setFraming(frame.key)
                  }
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  backgroundColor: active ? '#FFF9F5' : '#FAFAFA',
                  border: active ? '1.5px solid #FF6B35' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  cursor: 'pointer',
                  boxShadow: active ? '0 4px 16px rgba(255,107,53,0.12)' : 'none',
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                  outline: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF6B35',
                  opacity: active ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                }} />
                <p style={{
                  fontSize: '19px',
                  fontWeight: 600,
                  color: active ? '#1C1917' : '#B4B0AC',
                  margin: 0,
                  lineHeight: 1.4,
                  textAlign: 'center',
                  filter: active ? 'none' : 'blur(0.3px)',
                  transition: 'color 0.25s ease',
                }}>
                  {frame.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{
          backgroundColor: '#1C1917',
          color: '#FAFAF9',
          fontSize: '13px',
          fontWeight: 600,
          padding: '8px 16px',
          borderRadius: '999px',
        }}>
          Manager response: hesitated &rarr; acted immediately
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
        {tiers.map((tier) => (
          <span
            key={tier.label}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: tier.bg,
              color: tier.color,
              opacity: tier.label === 'Critical' ? 1 : 0.5,
              transform: tier.label === 'Critical' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            {tier.label}
          </span>
        ))}
      </div>
    </div>
  )
}
