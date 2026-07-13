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

// Placeholder photo data - replace with your actual image URLs
const photos = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `https://via.placeholder.com/400x400/E5D9C6/1C1917?text=Photo+${i + 1}`,
  caption: `Photo caption ${i + 1} — replace with your tagline`
}))

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)
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
          padding: isMobile ? '0 20px' : isTablet ? '0 32px' : '0 48px 0 0px',
          paddingTop: isMobile ? '20px' : '24px',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'inherit',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 700,
            color: '#1C1917',
          }}>About</span>
        </div>

        {/* CONTENT AREA */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '0 20px 40px 20px' : isTablet ? '0 32px 50px 32px' : '0 48px 60px 0px',
            minWidth: 0,
          }}
        >
          {/* Blue placeholder - same as home page */}
          <div style={{
            width: '100%',
            height: '580px',
            backgroundColor: '#7EB3F5',
            borderRadius: '4px',
            marginBottom: isMobile ? '48px' : '64px',
          }} />

          <div style={{
            maxWidth: '920px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: 700,
              lineHeight: '1.1',
              color: '#1C1917',
              marginBottom: isMobile ? '48px' : '64px',
              letterSpacing: '-0.02em',
            }}>
              Hello there!
            </h1>

            <div style={{
              fontSize: isMobile ? '17px' : '18px',
              lineHeight: '1.8',
              color: '#1C1917',
            }}>
              <p style={{ marginBottom: '36px' }}>
                I'm a product designer who came to design from architecture — which mostly means I spent five years learning to care about how a space <em>feels</em> before I cared about how it looks, then showed up to my first UX job and got asked to move a button 4 pixels to the left. I adapted.
              </p>

              <p style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontWeight: 600,
                fontSize: isMobile ? '18px' : '19px',
                lineHeight: '1.7',
                marginBottom: '36px',
              }}>
                I still can't look at a product without asking <em>why</em> it exists before I let myself get excited about what it should be. It's a compulsion.
              </p>

              <p style={{ marginBottom: '36px' }}>
                The best products I know are invisible. An Apple Watch that detects a heartbeat and calls for help. A tool that fits so naturally into someone's day they forget they're using it. That's the bar. Pretty isn't enough — if someone notices they're using your product, it hasn't done its job yet. (I notice I'm using most apps roughly the way I notice I'm wearing shoes with a rock in them.)
              </p>

              <p style={{ marginBottom: '36px' }}>
                I take a lot of photos of things most people walk past — fog swallowing a road through sequoias, a library that looks like it's about to unfold itself onto the sidewalk. I'm drawn to structure and stillness before I notice anything else, which is either the architecture background talking or just how my eyes default to working.
              </p>

              <p style={{ marginBottom: '36px' }}>
                I'm endlessly curious about AI quietly rewriting how the world works, about what users actually do versus what we confidently assumed they'd do in the last design review, about tall trees, water reflections, and whatever strange little object made someone stop and go "wait, what is that."
              </p>

              <p style={{ marginBottom: '36px' }}>
                I've lived in Chicago, Milwaukee, Los Angeles, New York, and now Seattle, and each city left something behind in how I see people and places — mostly opinions about public transit. I collect things that make people lean in for a second look. And I lose sleep over problems that were never actually part of the assignment, which is either a design superpower or a boundary-setting problem, depending on who you ask.
              </p>

              <p style={{ marginBottom: '48px' }}>
                When I'm in my 60s, I want a barn full of animals, surrounded by tall trees, reading every day. Until then, I'll be the one asking why the button needs to move at all.
              </p>

              <div style={{
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                marginBottom: '80px',
              }}>
                <a
                  href="mailto:indhuve05@gmail.com"
                  style={{
                    color: '#1C1917',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Email →
                </a>
                <a
                  href="https://www.linkedin.com/in/indhu05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#1C1917',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>

          {/* PHOTO GRID - FULL WIDTH */}
          <div style={{
            marginTop: isMobile ? '60px' : '80px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
              gap: isMobile ? '16px' : isTablet ? '24px' : '32px',
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              {photos.map((photo) => {
                const isExpanded = selectedPhoto?.id === photo.id
                const isOtherPhoto = selectedPhoto && !isExpanded

                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(isExpanded ? null : photo)}
                    style={{
                      gridColumn: isExpanded
                        ? (isMobile ? 'span 2' : isTablet ? 'span 3' : 'span 3')
                        : 'span 1',
                      gridRow: isExpanded
                        ? (isMobile ? 'span 2' : 'span 2')
                        : 'span 1',
                      cursor: 'pointer',
                      overflow: 'visible',
                      position: 'relative',
                      transition: isExpanded
                        ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: isExpanded ? 10 : 1,
                    }}
                  >
                    <div style={{
                      aspectRatio: '1',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      transform: isOtherPhoto ? 'scale(0.95)' : 'scale(1)',
                      opacity: isOtherPhoto ? 0.3 : 1,
                      filter: isOtherPhoto ? 'grayscale(0.6)' : 'grayscale(0)',
                      transition: 'all 0.5s ease',
                      animation: isExpanded ? 'waterRise 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                      boxShadow: isExpanded
                        ? '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                        : '0 2px 8px rgba(0, 0, 0, 0.05)',
                    }}>
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>
                    {isExpanded && (
                      <div style={{
                        marginTop: '16px',
                        fontSize: isMobile ? '14px' : '15px',
                        color: '#1C1917',
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                        animation: 'waterRise 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s backwards',
                      }}>
                        {photo.caption}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* SHOE COLLECTION CAPTION */}
            <p style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: isMobile ? '16px' : '17px',
              lineHeight: '1.75',
              color: '#1C1917',
              marginTop: isMobile ? '40px' : '60px',
              maxWidth: '680px',
            }}>
              Same angle, same obsession, 2016–2024. I've apparently been doing user research on pavement the whole time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
