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

const photoCaptions = [
  "The road, in no hurry to become a metaphor",
  "A building on wheels, still deciding what it wants to be",
  "Even the fog stopped in for a little retail therapy",
  "Nature's way of saying there's a chance of drama",
  "The boots, doing their best impression of standing on water",
  "A serious meeting between sneakers and caution tape",
  "Grayland Beach, moonlighting as the actual moon",
  "A man, a path, and several thousand unbothered leaves",
  "A hundred tiny suns, none of them on speaking terms",
  "A corgi conducting urgent business at the shoreline",
  "Trees, holding a very tall and very quiet meeting",
  "Everyone waiting on a wave with other plans",
  "Birds, apparently the only ones with somewhere to be",
  "A man and a dog, both convinced they're winning",
  "A shipwreck, still dressed for the occasion",
  "Strangers, evenly spaced, pretending not to notice each other",
  "A parking lot, viewed through several hundred tiny lenses",
  "A barn, blurred just enough to seem like a good idea",
  "One person, a coastline, no immediate plans",
  "A parking lot, briefly forgiven by the light",
  "The sky, showing off in two places at once",
  "A room of puppets, mid-argument about who's in charge",
  "A building leaning in like it has gossip",
  "Snow, performing for an audience of one streetlamp",
  "A church that clearly did not believe in small gestures",
  "A commute reimagined as a trip down someone's throat",
  "A car, parked with tremendous confidence, in the middle of nowhere",
  "The city, refusing to hold still for the photo",
  "A cathedral that's been 'almost done' since 1882",
  "A library that looks mid-collapse and rather pleased about it",
  "Skyscrapers, playing a modest game of hide and seek",
  "One small human, negotiating with the entire Pacific",
  "A house quietly returning the property to the prairie",
  "A ceiling with clear main-character energy",
  "Another ceiling, equally sure of itself",
  "Foam, doing the most for a Tuesday",
]

const photos = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  src: `/images/about/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  caption: photoCaptions[i] ?? ''
}))

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    if (!selectedPhoto) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id)
        const delta = e.key === 'ArrowRight' ? 1 : -1
        const nextIndex = (currentIndex + delta + photos.length) % photos.length
        setSelectedPhoto(photos[nextIndex])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedPhoto])

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
            borderRadius: '0px',
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
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '24px 20px 40px 20px' : isTablet ? '32px 32px 50px 32px' : '40px 48px 60px 48px',
            minWidth: 0,
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile || isTablet ? '1fr' : '280px 1fr',
            gap: isMobile ? '40px' : isTablet ? '48px' : '64px',
            alignItems: 'start',
            maxWidth: isMobile || isTablet ? '850px' : '1160px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {/* RAIL — photo + key facts, sticky on desktop */}
            <div style={{
              position: isMobile || isTablet ? 'static' : 'sticky',
              top: isMobile || isTablet ? 'auto' : '0px',
              paddingBottom: isMobile || isTablet ? '24px' : '0',
              borderBottom: isMobile || isTablet ? '1px solid rgba(0,0,0,0.1)' : 'none',
            }}>
              <img
                src="/images/about/me.webp"
                alt="Indhu on a forest road trail"
                width={1200}
                height={1600}
                style={{
                  width: isMobile ? '200px' : '100%',
                  height: 'auto',
                  aspectRatio: '3 / 4',
                  objectFit: 'cover',
                  borderRadius: '0px',
                  display: 'block',
                  marginBottom: '24px',
                }}
              />

              {[
                { k: 'Based', v: 'Seattle, WA' },
                { k: 'Focus', v: 'Systems, trust, and AI guardrails' },
                { k: 'Cities lived in', v: '5 — Chicago, Milwaukee, LA, New York, Seattle' },
              ].map((field) => (
                <div key={field.k} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '10.5px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#78716C',
                    marginBottom: '4px',
                  }}>{field.k}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#1C1917' }}>{field.v}</div>
                </div>
              ))}
            </div>

            {/* MAIN — field notes */}
            <div>
              <div style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '15px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#1C1917',
                marginBottom: '4px',
              }}>Field notes</div>

              <div style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px',
                lineHeight: '1.4',
                color: '#1C1917',
                maxWidth: '18ch',
                margin: isMobile ? '0 0 40px' : '0 0 56px',
              }}>
                A product designer who thinks in systems.
              </div>

              {[
                {
                  n: '01',
                  label: 'The compulsion',
                  pull: true,
                  body: <>I still can't look at a product without asking <em>why</em> it exists, and lately, <em>why now</em>, before I let myself get excited about what it should be. It's a compulsion.</>,
                },
                {
                  n: '02',
                  label: 'Who decides',
                  body: <>What guardrails and accessibility should look like as AI decides more of what people see, trust, and act on. That's the harder question pulling me lately. Building an enterprise ML platform that had to earn trust inside a cautious institution, and a media literacy tool built on the idea that people should be equipped to judge for themselves, taught me the same lesson twice. <span style={{ color: '#1C1917', fontWeight: 500 }}>The interface is rarely the hard part. Deciding who the system should defer to is.</span></>,
                },
                {
                  n: '03',
                  label: 'The bar',
                  body: <>The best products I know are invisible. An Apple Watch that detects a heartbeat and calls for help. A tool that fits so naturally into someone's day they forget they're using it. That's the bar I actually care about. Pretty isn't enough. If someone notices they're using your product, it hasn't done its job yet. <span style={{ color: '#78716C', fontSize: '14px' }}>(I notice I'm using most apps about as much as I notice I'm wearing shoes with a rock in them. Constantly, and with growing resentment.)</span></>,
                },
                {
                  n: '04',
                  label: 'How I see',
                  body: <>I take a lot of photos of stuff most people just walk past. Fog swallowing a road through sequoias. A library that looks like it's about to unfold itself onto the sidewalk. I'm not sure why my eyes default to working that way, but I can't turn it off.</>,
                },
                {
                  n: '05',
                  label: 'What I collect',
                  body: <>Each city I've lived in left something behind, mostly strong opinions about public transit that nobody asked for. I collect things that make people lean in for a second look, and I lose sleep over problems that were never actually part of the assignment. A design superpower or a problem with setting boundaries, depending who you ask. Probably both.</>,
                },
                {
                  n: '06',
                  label: 'Coda',
                  italic: true,
                  body: <>When I'm in my 60s, I want a barn full of animals, surrounded by tall trees, reading every day. Until then, I'll be the one asking why the button needs to move at all.</>,
                },
              ].map((entry) => (
                <div key={entry.n} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '28px 1fr',
                  gap: isMobile ? '6px' : '20px',
                  paddingBottom: isMobile ? '32px' : '40px',
                  marginBottom: isMobile ? '32px' : '40px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}>
                  <div style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '12px',
                    color: '#A8A29E',
                    paddingTop: isMobile ? 0 : '3px',
                  }}>{entry.n}</div>
                  <div>
                    <div style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#78716C',
                      marginBottom: '10px',
                    }}>{entry.label}</div>
                    <p style={{
                      margin: 0,
                      maxWidth: entry.pull || entry.italic ? '56ch' : '62ch',
                      fontFamily: entry.pull || entry.italic ? 'var(--font-fraunces), serif' : 'inherit',
                      fontStyle: entry.italic ? 'italic' : 'normal',
                      fontWeight: entry.pull ? 600 : 400,
                      fontSize: entry.pull ? (isMobile ? '19px' : '21px') : entry.italic ? (isMobile ? '18px' : '20px') : (isMobile ? '16px' : '17px'),
                      lineHeight: entry.pull || entry.italic ? '1.55' : '1.75',
                      color: entry.pull || entry.italic ? '#1C1917' : '#44403C',
                    }}>
                      {entry.body}
                    </p>
                  </div>
                </div>
              ))}

              <div style={{
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
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

          {/* PHOTO GRID */}
          <div style={{
            marginTop: isMobile ? '60px' : '80px',
            maxWidth: isMobile || isTablet ? '850px' : '1160px',
            marginLeft: 'auto',
            marginRight: 'auto',
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
                      borderRadius: '0px',
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
                      {isExpanded && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedPhoto(null)
                          }}
                          aria-label="Close"
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#FFFFFF',
                            fontSize: '18px',
                            lineHeight: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ×
                        </button>
                      )}
                      {isExpanded && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const currentIndex = photos.findIndex((p) => p.id === photo.id)
                              setSelectedPhoto(photos[(currentIndex - 1 + photos.length) % photos.length])
                            }}
                            aria-label="Previous photo"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '12px',
                              transform: 'translateY(-50%)',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              color: '#FFFFFF',
                              fontSize: '18px',
                              lineHeight: 1,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            ‹
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const currentIndex = photos.findIndex((p) => p.id === photo.id)
                              setSelectedPhoto(photos[(currentIndex + 1) % photos.length])
                            }}
                            aria-label="Next photo"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              right: '12px',
                              transform: 'translateY(-50%)',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              color: '#FFFFFF',
                              fontSize: '18px',
                              lineHeight: 1,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>
                    {isExpanded && photo.caption && (
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
          </div>
        </div>
      </div>
    </div>
  )
}
