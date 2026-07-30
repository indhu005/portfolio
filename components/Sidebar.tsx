'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const projects = [
  { name: 'LAT', slug: 'lat' },
  { name: 'Keye', slug: 'keye' },
  { name: 'Misinformation Center', slug: 'misinformation-center' },
  { name: 'Play', slug: 'play' },
]

const toc = [
  { title: 'Project Snapshot', id: 'snapshot' },
  { title: 'Context & Problem', id: 'context-problem' },
  { title: 'Constraints', id: 'constraints' },
  { title: 'Strategy', id: 'strategy' },
  { title: 'Solution', id: 'solution' },
  { title: 'Tradeoffs & Trust', id: 'tradeoffs' },
  { title: 'Impact & Reflection', id: 'impact' },
]

interface Section {
  id: string
  title: string
  content: string
}

interface SidebarProps {
  activeProject?: string | null
  activeSection?: string | null
  onSectionClick?: (sectionId: string) => void
  sections?: Section[]
}

// Helper to create short navigation titles
const getShortTitle = (fullTitle: string): string => {
  // Remove numbering like "01 — " or "1. "
  const withoutNumber = fullTitle.replace(/^\d+\s*[—\-\.]\s*/, '')

  // Mapping for common patterns
  const titleMap: Record<string, string> = {
    'Project Snapshot': 'Snapshot',
    'Context & Problem': 'Context & Problem',
    'Where I Started: Evidence over Instinct': 'Where I Started',
    'The Credit System: From Constraint to Intelligence': 'Credit System',
    'Features Built from Signal': 'Features',
    'The Chrome Extension: An 18-Month Problem Solved in Ten Days': 'Chrome Extension',
    "Design System: Built for a Team That Didn't Exist Yet": 'Design System',
    'Tradeoffs & Hard Calls': 'Tradeoffs',
    'Impact & Reflection': 'Impact & Reflection',
  }

  return titleMap[withoutNumber] || withoutNumber.split(':')[0]
}

export default function Sidebar({
  activeProject: activeProjectProp = null,
  activeSection = null,
  onSectionClick,
  sections
}: SidebarProps = {}) {
  const router = useRouter()
  const [expandedProject, setExpandedProject] = useState<string | null>(activeProjectProp)
  const [isLargeDesktop, setIsLargeDesktop] = useState(false)

  useEffect(() => {
    const checkLargeDesktop = () => {
      setIsLargeDesktop(window.innerWidth >= 1600)
    }
    checkLargeDesktop()
    window.addEventListener('resize', checkLargeDesktop)
    return () => window.removeEventListener('resize', checkLargeDesktop)
  }, [])

  return (
    <div
      style={{
      flex: '0 0 320px',
      width: '320px',
      minWidth: '320px',
      maxWidth: '320px',
      height: '100vh',
      borderRight: '1px solid rgba(0,0,0,0.08)',
      backgroundColor: '#FFFFFF',
      padding: '0px 0px 40px 40px',
      paddingTop: '24px',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>

      {/* NAME */}
      <Link
        href="/"
        style={{
          fontSize: isLargeDesktop ? '20px' : '16px',
          fontWeight: 700,
          color: '#1C1917',
          cursor: 'pointer',
          transition: 'color 0.12s ease-out',
          textDecoration: 'none',
          display: 'block',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#1C1917'}
      >
        Indhu
      </Link>

      {/* SUBTITLE */}
      <div style={{ marginTop: '8px' }}>
        <div style={{
          fontSize: isLargeDesktop ? '18px' : '15px',
          fontWeight: 400,
          color: '#6B7280',
          marginBottom: '4px',
        }}>Product Designer</div>
        <div style={{
          fontSize: isLargeDesktop ? '18px' : '15px',
          fontWeight: 400,
          color: '#6B7280',
        }}>based in Seattle</div>
      </div>

      {/* WORK SECTION */}
      <div style={{ marginTop: '48px' }}>
        <div style={{
          fontSize: isLargeDesktop ? '18px' : '15px',
          fontWeight: 700,
          color: '#1C1917',
          marginBottom: '12px',
        }}>Work</div>

        {projects.map((project) => {
          const isActiveProject = activeProjectProp === project.slug
          const isExpanded = expandedProject === project.slug || isActiveProject

          return (
            <div key={project.name}>
              <Link
                href={project.slug === 'play' ? '/play' : `/work/${project.slug}`}
                onClick={() => {
                  setExpandedProject(
                    expandedProject === project.slug ? null : project.slug
                  )
                }}
                style={{
                  fontSize: isLargeDesktop ? '18px' : '15px',
                  fontWeight: isActiveProject ? 600 : 400,
                  color: isActiveProject ? 'var(--accent)' : '#6B7280',
                  cursor: 'pointer',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  paddingLeft: isActiveProject ? '10px' : '0px',
                  borderLeft: isActiveProject ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'color 0.12s ease-out, font-weight 0.12s ease-out, padding-left 0.12s ease-out, border-color 0.12s ease-out',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onMouseEnter={(e) => { if (!isActiveProject) e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { if (!isActiveProject) e.currentTarget.style.color = '#6B7280' }}
              >
                {project.name}
              </Link>

              {/* TOC */}
              {isExpanded && project.slug !== 'play' && (
                <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
                  {(sections || toc).map((item) => {
                    const isActiveSection = activeSection === item.id
                    const displayTitle = sections ? getShortTitle(item.title) : item.title

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (onSectionClick) {
                            onSectionClick(item.id)
                          }
                        }}
                        onMouseEnter={(e) => { if (!isActiveSection) e.currentTarget.style.color = '#1C1917' }}
                        onMouseLeave={(e) => { if (!isActiveSection) e.currentTarget.style.color = '#6B7280' }}
                        style={{
                          fontSize: isLargeDesktop ? '17px' : '14px',
                          color: isActiveSection ? '#1C1917' : '#6B7280',
                          fontWeight: isActiveSection ? 500 : 400,
                          paddingTop: '4px',
                          paddingBottom: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: onSectionClick ? 'pointer' : 'default',
                          transition: 'color 0.12s ease, font-weight 0.12s ease',
                        }}
                      >
                        <span style={{
                          color: isActiveSection ? 'var(--accent)' : '#9CA3AF',
                          fontWeight: isActiveSection ? 700 : 400,
                        }}>
                          —
                        </span>
                        {displayTitle}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ABOUT */}
      <div style={{ marginTop: '40px' }}>
        <Link
          href="/about"
          style={{
            fontSize: isLargeDesktop ? '18px' : '15px',
            fontWeight: 700,
            color: '#1C1917',
            marginBottom: '12px',
            cursor: 'pointer',
            transition: 'color 0.12s ease-out',
            textDecoration: 'none',
            display: 'block',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1C1917'}
        >
          About
        </Link>
        {[
          { label: 'Email', href: 'mailto:indhuve05@gmail.com' },
          { label: 'Resume', href: null },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/indhu05/' }
        ].map((item) => (
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              style={{
                fontSize: isLargeDesktop ? '18px' : '15px',
                fontWeight: 400,
                color: '#6B7280',
                paddingTop: '4px',
                paddingBottom: '4px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.12s ease',
              }}
            >
              {item.label}
            </a>
          ) : (
            <div
              key={item.label}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              style={{
                fontSize: isLargeDesktop ? '18px' : '15px',
                fontWeight: 400,
                color: '#6B7280',
                paddingTop: '4px',
                paddingBottom: '4px',
                cursor: 'pointer',
                transition: 'color 0.12s ease',
              }}
            >
              {item.label}
            </div>
          )
        ))}
      </div>

    </div>
  )
}
