'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

// Autoplay videos otherwise start downloading and decoding the moment the
// page loads, even far below the fold — competing with fonts/JS on the
// critical path. This defers both the fetch and playback until the video
// is about to enter the viewport.
export default function LazyVideo({ src, alt, style }: { src: string; alt: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      autoPlay={shouldLoad}
      loop
      muted
      playsInline
      preload="none"
      aria-label={alt}
      style={style}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  )
}
