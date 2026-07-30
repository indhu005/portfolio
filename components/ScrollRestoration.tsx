'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Case study pages always start at the top (see CaseStudyLayout) —
    // restoring a saved position here fought that and caused a visible
    // double-jump to wherever the user last scrolled (e.g. Tradeoffs).
    if (pathname.startsWith('/work/')) return

    // Save scroll position before unload
    const handleBeforeUnload = () => {
      const scrollableElements = document.querySelectorAll('[data-scroll-container]')
      scrollableElements.forEach((element) => {
        const scrollTop = element.scrollTop
        sessionStorage.setItem(`scroll-${pathname}`, scrollTop.toString())
      })
    }

    // Restore scroll position on mount
    const restoreScroll = () => {
      const scrollableElements = document.querySelectorAll('[data-scroll-container]')
      scrollableElements.forEach((element) => {
        const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
        if (savedPosition) {
          element.scrollTop = parseInt(savedPosition, 10)
        }
      })
    }

    // Restore after a brief delay to ensure content is loaded
    const timer = setTimeout(restoreScroll, 100)

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [pathname])

  return null
}
