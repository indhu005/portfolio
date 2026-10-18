'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

/** Fades + slides children up once they scroll into view. Fires once, like the
 * homepage's on-load reveal, but triggered by IntersectionObserver instead of
 * a mount timer — for content that starts below the fold. */
export function Reveal({
  children,
  delayMs = 0,
  style,
  className,
}: {
  children: ReactNode
  delayMs?: number
  style?: CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Counts a number up from 0 to `to` once it scrolls into view. */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  durationMs = 1100,
}: {
  to: number
  prefix?: string
  suffix?: string
  durationMs?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setValue(to)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let start: number | null = null
        const step = (ts: number) => {
          if (start === null) start = ts
          const progress = Math.min((ts - start) / durationMs, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(to * eased))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [to, durationMs])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{value}{suffix}
    </span>
  )
}

/** Thin fixed progress rail on the left edge, filling as the page scrolls. */
export function ScrollProgressRail() {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Most pages scroll an inner [data-scroll-container] div rather than
    // the window (see app/page.tsx, CaseStudyLayout.tsx) — re-queried on
    // every tick since the container remounts on client-side navigation.
    const getScroller = () => document.querySelector<HTMLElement>('[data-scroll-container]')

    const update = () => {
      const scroller = getScroller()
      const scrollTop = scroller ? scroller.scrollTop : window.scrollY
      const scrollHeight = scroller ? scroller.scrollHeight : document.documentElement.scrollHeight
      const clientHeight = scroller ? scroller.clientHeight : window.innerHeight
      const docHeight = scrollHeight - clientHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (fillRef.current) fillRef.current.style.height = `${pct}%`
    }

    update()
    const interval = window.setInterval(update, 200)
    document.addEventListener('scroll', update, { capture: true, passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('scroll', update, { capture: true })
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '3px',
        height: '100vh',
        background: 'rgba(28, 25, 23, 0.08)',
        zIndex: 300,
      }}
    >
      <div
        ref={fillRef}
        style={{
          width: '100%',
          height: '0%',
          background: '#4A72E5',
        }}
      />
    </div>
  )
}
