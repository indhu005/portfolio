'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchPortfolio, type SearchItem } from '@/lib/searchIndex'

function groupResults(items: SearchItem[]): [string, SearchItem[]][] {
  const groups = new Map<string, SearchItem[]>()
  for (const item of items) {
    const list = groups.get(item.group) ?? []
    list.push(item)
    groups.set(item.group, list)
  }
  return Array.from(groups.entries())
}

/** Minimal fixed top bar used sitewide in place of the old text sidebar —
 * a single compact floating pill (same dock treatment as BottomBar), not a
 * full-width spread bar. Wordmark/home link, search, Resume, LinkedIn, Work. */
export default function TopBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!searchOpen) return
    inputRef.current?.focus()
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setQuery('')
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [searchOpen])

  const results = searchPortfolio(query)

  const runAction = (item: SearchItem) => {
    if (item.external) {
      window.open(item.url, '_blank')
    } else {
      const [path, hash] = item.url.split('#')
      const targetPath = path || '/'
      if (targetPath === pathname && hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        router.push(item.url)
      }
    }
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <>
      {/* Focus scrim — dims and blurs the rest of the page while searching,
          so attention stays on the bar and its results. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 900,
          backgroundColor: 'rgba(250, 248, 243, 0.4)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: searchOpen ? 1 : 0,
          pointerEvents: searchOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      <div ref={wrapRef} style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '10px 18px',
            backgroundColor: 'rgba(120, 118, 112, 0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(28, 25, 23, 0.14)',
            borderRadius: '999px',
            boxShadow: '0 12px 32px rgba(28, 25, 23, 0.12)',
            overflow: 'hidden',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-heading), serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#1C1917',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              flexShrink: 0,
            }}
          >
            Indhu
          </Link>

          <span style={{ width: '1px', height: '14px', backgroundColor: 'rgba(28, 25, 23, 0.12)', flexShrink: 0 }} />

          <AnimatePresence mode="wait" initial={false}>
            {searchOpen ? (
              <motion.input
                key="input"
                ref={inputRef}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 260 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) runAction(results[0])
                }}
                placeholder="Search the portfolio — try “tradeoffs” or “keye”"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  color: '#1C1917',
                  fontFamily: 'inherit',
                }}
              />
            ) : (
              <motion.button
                key="icon"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="topbar-icon-btn"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" stroke="#1C1917" strokeWidth="1.4" />
                  <path d="M12 12L16 16" stroke="#1C1917" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!searchOpen && (
              <motion.div
                key="links"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                <span style={{ width: '1px', height: '14px', backgroundColor: 'rgba(28, 25, 23, 0.12)', flexShrink: 0 }} />

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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search dropdown — matches across every page and case-study section,
            not just a few hardcoded shortcuts. */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '340px',
                maxHeight: '420px',
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(28, 25, 23, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 16px 36px rgba(28, 25, 23, 0.14)',
                padding: '8px',
                zIndex: 1000,
              }}
            >
              {results.length === 0 ? (
                <div style={{ padding: '14px 12px', fontSize: '13px', color: 'rgba(28, 25, 23, 0.5)' }}>
                  No results for “{query}”.
                </div>
              ) : (
                groupResults(results).map(([group, items]) => (
                  <div key={group} style={{ marginBottom: '4px' }}>
                    <div style={{
                      padding: '8px 12px 4px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'rgba(28, 25, 23, 0.4)',
                    }}>
                      {group}
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => runAction(item)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.06)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                      >
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1C1917' }}>{item.label}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(28, 25, 23, 0.5)', marginTop: '2px' }}>{item.description}</div>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
