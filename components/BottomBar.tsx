'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  key: string
  href: string
  label: string
  icon: (active: boolean) => React.ReactNode
  external?: boolean
}

const ICON_COLOR_ACTIVE = '#FFFFFF'
const ICON_COLOR_INACTIVE = 'rgba(255, 255, 255, 0.5)'

const items: NavItem[] = [
  {
    key: 'home',
    href: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 19 19" fill="none" aria-hidden="true">
        <path d="M2.5 9.2L9.5 3.5L16.5 9.2" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 8V15H14.5V8" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'work',
    href: '/#case-studies',
    label: 'Work',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 19 19" fill="none" aria-hidden="true">
        <rect x="2.5" y="6" width="14" height="9.5" rx="1.6" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" />
        <path d="M7 6V4.8C7 4 7.6 3.5 8.4 3.5H10.6C11.4 3.5 12 4 12 4.8V6" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'about',
    href: '/about',
    label: 'About',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 19 19" fill="none" aria-hidden="true">
        <circle cx="9.5" cy="6.3" r="2.6" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" />
        <path d="M3.8 15.2C4.4 12 6.6 10.3 9.5 10.3C12.4 10.3 14.6 12 15.2 15.2" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'contact',
    href: 'mailto:indhuve05@gmail.com',
    label: 'Contact',
    external: true,
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 19 19" fill="none" aria-hidden="true">
        <rect x="2.5" y="4.5" width="14" height="10" rx="1.6" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" />
        <path d="M3 5.5L9.5 10.5L16 5.5" stroke={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

/** Fixed, icon-only dock that replaces the old text sidebar as the primary
 * site-wide nav. Dark, so it reads as a distinct floating element against the
 * light page rather than blending into it like TopBar does. */
export default function BottomBar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname?.startsWith(href)
  }

  return (
    <div className="siri-outline" style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      boxShadow: '0 8px 24px rgba(28, 25, 23, 0.16)',
    }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 20px',
      backgroundColor: 'rgba(28, 25, 23, 0.92)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: '999px',
    }}>
      {items.map((item) => {
        const active = isActive(item.href)
        const content = (
          <div
            aria-label={item.label}
            className={`bottombar-icon-btn${active ? ' active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            {item.icon(active)}
          </div>
        )

        if (item.external) {
          return (
            <a key={item.key} href={item.href} aria-label={item.label}>
              {content}
            </a>
          )
        }

        return (
          <Link key={item.key} href={item.href} aria-label={item.label}>
            {content}
          </Link>
        )
      })}
    </div>
    </div>
  )
}
