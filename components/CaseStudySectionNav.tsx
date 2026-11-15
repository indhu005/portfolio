'use client'

interface Section {
  id: string
  title: string
}

interface CaseStudySectionNavProps {
  sections: Section[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

/** Short nav labels for case-study sections — same mapping the old Sidebar
 * used for its CONTENTS list, moved here since Sidebar no longer exists. */
const getShortTitle = (fullTitle: string): string => {
  const withoutNumber = fullTitle.replace(/^\d+\s*[—\-\.]\s*/, '')

  const titleMap: Record<string, string> = {
    'Project Snapshot': 'Snapshot',
    'Context & Problem': 'Context & Problem',
    'Constraints & Design Responses': 'Constraints',
    'The Credit System: From Constraint to Intelligence': 'Credit System',
    'Features Built from Signal': 'Features',
    'The Chrome Extension: An 18-Month Problem Solved in Ten Days': 'Chrome Extension',
    "Design System: Built for a Team That Didn't Exist Yet": 'Design System',
    'Tradeoffs & Hard Calls': 'Tradeoffs',
    'Impact & Reflection': 'Impact & Reflection',
  }

  return titleMap[withoutNumber] || withoutNumber.split(':')[0]
}

/** Fixed panel where the old Sidebar used to live (left edge, vertically
 * centered) — not nested-scroll sticky, which breaks inside this layout's own
 * scrolling content column. A visible card rather than bare floating text so
 * it reads as a real nav element, not a sliver in the corner. */
export default function CaseStudySectionNav({ sections, activeSection, onSectionClick }: CaseStudySectionNavProps) {
  return (
    <div style={{
      position: 'fixed',
      // The header/content column is centered (maxWidth 1020px, auto margins),
      // not left-aligned to the viewport — so a fixed left offset leaves a huge
      // gap on wide screens. Anchor relative to that column's actual left edge
      // (50% - half the maxWidth) instead, so this panel tracks it directly.
      left: 'calc(50% - 510px - 24px - 230px)',
      width: '230px',
      boxSizing: 'border-box',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 900,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '20px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(28, 25, 23, 0.08)',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(28, 25, 23, 0.08)',
    }}>
      {sections.map((section) => {
        const active = section.id === activeSection
        return (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '7px 0',
            }}
          >
            <span style={{
              width: active ? '18px' : '8px',
              height: '2px',
              borderRadius: '1px',
              backgroundColor: active ? 'var(--accent)' : 'rgba(28, 25, 23, 0.25)',
              flexShrink: 0,
              transition: 'width 0.2s ease, background-color 0.2s ease',
            }} />
            <span style={{
              fontSize: '13.5px',
              fontWeight: active ? 700 : 500,
              color: active ? '#1C1917' : 'rgba(28, 25, 23, 0.45)',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease, font-weight 0.15s ease',
            }}>
              {getShortTitle(section.title)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
