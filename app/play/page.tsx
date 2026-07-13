'use client'
import Sidebar from '@/components/Sidebar'
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

const projects = [
  {
    title: 'The Color Game',
    description: 'An interactive experiment exploring color theory and perception. Built to understand how context changes our perception of hue and saturation.',
    year: '2024',
    tags: ['Interactive', 'Web']
  },
  {
    title: 'Typography Playground',
    description: 'A tool for experimenting with type scales, rhythm, and hierarchy. Created while learning about vertical rhythm in web design.',
    year: '2024',
    tags: ['Tool', 'Typography']
  },
  {
    title: 'Generative Patterns',
    description: 'Algorithmic pattern generation using SVG and JavaScript. Inspired by Islamic geometric art and computational design.',
    year: '2023',
    tags: ['Generative', 'Art']
  },
  {
    title: 'Sound Visualizer',
    description: 'Real-time audio visualization using Web Audio API. An exploration of synesthesia and multi-sensory design.',
    year: '2024',
    tags: ['Audio', 'Interactive']
  },
  {
    title: 'Micro Interactions',
    description: 'A collection of delightful UI animations and transitions. Small details that make interfaces feel alive and responsive.',
    year: '2023',
    tags: ['Animation', 'UI']
  },
  {
    title: 'Data Stories',
    description: 'Narrative-driven data visualizations. Experiments in making complex information accessible and compelling.',
    year: '2024',
    tags: ['Data Viz', 'Story']
  },
]

export default function Play() {
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
            padding: isMobile ? '40px 20px 40px 20px' : isTablet ? '60px 32px 50px 32px' : isWideDesktop ? '80px 80px 80px 80px' : '80px 48px 60px 48px',
            minWidth: 0,
            scrollBehavior: 'smooth',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Container for everything - single alignment grid */}
          <div style={{
            maxWidth: isWideDesktop ? '1400px' : '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {/* Header */}
            <div style={{
              marginBottom: isMobile ? '48px' : isWideDesktop ? '80px' : '64px',
              width: isMobile ? '100%' : '48%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: isMobile ? '42px' : isTablet ? '56px' : isWideDesktop ? '72px' : '64px',
                fontWeight: 700,
                lineHeight: '1.1',
                color: '#1C1917',
                marginBottom: isMobile ? '20px' : '24px',
                letterSpacing: '-0.02em',
              }}>
                Play
              </h1>
              <p style={{
                fontSize: isMobile ? '17px' : isWideDesktop ? '20px' : '18px',
                lineHeight: '1.7',
                color: '#57534E',
              }}>
                Side projects and experiments. Some finished, some in progress, all made while learning something new or just having fun.
              </p>
            </div>

            {/* Projects - New Yorker style layout */}
            <div style={{
              position: 'relative',
            }}>
            {projects.map((project, index) => {
              // Alternate layout: even indices = image left, odd = image right
              const imageOnLeft = index % 2 === 0

              return (
                <div
                  key={index}
                  style={{
                    marginBottom: isMobile ? '64px' : isWideDesktop ? '120px' : '96px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: isMobile ? 'flex-start' : 'space-between',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Text - always on left, aligned with "Play" */}
                  <div style={{
                    flex: isMobile ? '0 0 auto' : '0 0 48%',
                    width: isMobile ? '100%' : '48%',
                    order: isMobile ? 2 : 1,
                    marginTop: isMobile ? '24px' : 0,
                  }}>
                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                    }}>
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#6B7280',
                            padding: '4px 10px',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '4px',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#9CA3AF',
                        padding: '4px 0',
                      }}>
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: isMobile ? '28px' : isTablet ? '32px' : isWideDesktop ? '42px' : '36px',
                      fontWeight: 700,
                      lineHeight: '1.2',
                      color: '#1C1917',
                      marginBottom: isMobile ? '16px' : '20px',
                      letterSpacing: '-0.01em',
                    }}>
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontSize: isMobile ? '16px' : isWideDesktop ? '18px' : '17px',
                      lineHeight: '1.7',
                      color: '#57534E',
                    }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Image - alternates left/right */}
                  <div style={{
                    flex: isMobile ? '0 0 auto' : '0 0 48%',
                    width: isMobile ? '100%' : '48%',
                    order: isMobile ? 1 : imageOnLeft ? 1 : 2,
                  }}>
                    <div style={{
                      width: '100%',
                      height: isMobile ? '280px' : isTablet ? '320px' : isWideDesktop ? '500px' : '420px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9CA3AF',
                      fontSize: '14px',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) e.currentTarget.style.transform = 'scale(1)'
                    }}
                    >
                      Image placeholder
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
