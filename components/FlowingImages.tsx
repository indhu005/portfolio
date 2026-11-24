'use client'
import { useState, useEffect } from 'react'

/**
 * A folder of frames played like a gentle looping animation.
 *
 * No-flash crossfade: the incoming frame fades in ON TOP of the outgoing one,
 * which stays fully opaque underneath until it's covered — so the card
 * background never shows through (no black/white flash). Frames stay mounted
 * (no remount), so there's no decode hitch / jitter on each transition.
 */
export default function FlowingImages({
  images,
  frameMs = 3400,
  crossfadeMs = 1100,
  fit = 'cover',
}: {
  images: string[]
  frameMs?: number
  crossfadeMs?: number
  fit?: 'cover' | 'contain'
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, frameMs)
    return () => window.clearInterval(t)
  }, [images.length, frameMs])

  const len = images.length
  const prev = (idx - 1 + len) % len
  const next = (idx + 1) % len
  // Fast flipbook: preload every frame up front so playback doesn't stutter.
  const eagerAll = frameMs < 600

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {images.map((src, i) => {
        const isCurrent = i === idx
        const isPrev = i === prev
        return (
          <img
            key={src}
            src={src}
            alt=""
            // Keep the active few ready; let the rest load lazily (unless this is
            // a fast flipbook, where every frame must be preloaded).
            loading={eagerAll || isCurrent || isPrev || i === next ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: fit,
              // Current fades in on top; previous stays opaque beneath until
              // covered; everything else is hidden behind them.
              opacity: isCurrent || isPrev ? 1 : 0,
              zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
              transition: isCurrent ? `opacity ${crossfadeMs}ms ease` : 'none',
              willChange: 'opacity',
            }}
          />
        )
      })}
    </div>
  )
}
