'use client'
import Link from 'next/link'

/** Minimal fixed top bar used sitewide in place of the old text sidebar —
 * a single compact floating pill (same dock treatment as BottomBar), not a
 * full-width spread bar. Wordmark/home link, Resume, LinkedIn, Work. */
export default function TopBar() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '10px 18px',
      backgroundColor: 'rgba(250, 248, 243, 0.7)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(28, 25, 23, 0.08)',
      borderRadius: '999px',
      boxShadow: '0 4px 16px rgba(28, 25, 23, 0.08)',
    }}>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-heading), serif',
          fontSize: '15px',
          fontWeight: 700,
          color: '#1C1917',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        Indhu
      </Link>

      <span style={{ width: '1px', height: '14px', backgroundColor: 'rgba(28, 25, 23, 0.12)' }} />

      <Link
        href="/#case-studies"
        className="topbar-link"
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(28, 25, 23, 0.75)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Work
      </Link>

      <a
        href="/Indhu-Venkatachalam-Senior-Product-Designer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="topbar-link"
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(28, 25, 23, 0.75)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Resume
      </a>

      <a
        href="https://www.linkedin.com/in/indhu05/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="topbar-icon-btn"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="16" height="16" rx="3" stroke="#1C1917" strokeWidth="1.3" />
          <circle cx="5.2" cy="5.4" r="1.05" fill="#1C1917" />
          <path d="M5.2 7.8V13" stroke="#1C1917" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M8.3 13V9.8C8.3 8.6 9 7.8 10.1 7.8C11.1 7.8 11.7 8.5 11.7 9.8V13" stroke="#1C1917" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.3 13V8.1" stroke="#1C1917" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  )
}
