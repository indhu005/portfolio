'use client'
import { useEffect, useRef } from 'react'

// All the "photos I clicked" from the About folder, cycled through as the cursor
// moves across the hero. Imperative DOM (no React state per frame) so the trail
// stays smooth.
const PHOTOS = [
  '01', '09', '11', '12', '13', '14', '15', '16', '17', '19',
  '21', '23', '24', '25', '26', '27', '29', '30', '31', '32',
  '33', '34', '35',
].map((n) => `/images/about/photo-${n}.jpg`)

/**
 * A cursor image-trail: as the pointer moves over the hero, a photo spawns at the
 * cursor every so often, fades/scales in, then drifts up and fades out. Overlay
 * is pointer-events:none; the mousemove is read from the parent element so the
 * intro links and the game underneath stay fully interactive.
 */
export default function HeroImageTrail() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const parent = overlay?.parentElement
    if (!overlay || !parent) return

    // Respect reduced-motion preference — no trail at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Pointer-only (skip touch, where there's no hover).
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let lastX = 0
    let lastY = 0
    let primed = false
    let idx = 0
    const MIN_DIST = 90 // px of travel between spawns

    const spawn = (x: number, y: number) => {
      const src = PHOTOS[idx % PHOTOS.length]
      idx += 1
      const img = document.createElement('img')
      img.src = src
      img.alt = ''
      img.decoding = 'async'
      const size = 120 + Math.round(Math.random() * 40) // 120–160px
      const rot = (Math.random() * 16 - 8).toFixed(1)
      img.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size * 0.74}px;object-fit:cover;border-radius:0;border:3px solid #fff;box-shadow:0 10px 30px rgba(23,21,15,0.22);transform:translate(-50%,-50%) rotate(${rot}deg) scale(0.6);opacity:0;will-change:transform,opacity;transition:transform 0.5s cubic-bezier(0.22,1,0.36,1),opacity 0.5s ease;pointer-events:none;`
      overlay.appendChild(img)
      // Animate in on the next frame.
      requestAnimationFrame(() => {
        img.style.opacity = '1'
        img.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(1)`
      })
      // Fade + drift out, then remove.
      window.setTimeout(() => {
        img.style.opacity = '0'
        img.style.transform = `translate(-50%,-78%) rotate(${rot}deg) scale(0.92)`
      }, 520)
      window.setTimeout(() => {
        img.remove()
      }, 1100)
    }

    const onMove = (e: MouseEvent) => {
      // Don't spawn over regions opted out of the trail (the game, etc.).
      if ((e.target as Element | null)?.closest('[data-no-trail]')) return
      // Convert to the overlay's own coordinate space so spawned images line up
      // with the cursor regardless of the overlay's offset from its parent.
      const rect = overlay.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (!primed) {
        lastX = x
        lastY = y
        primed = true
        return
      }
      const dist = Math.hypot(x - lastX, y - lastY)
      if (dist >= MIN_DIST) {
        lastX = x
        lastY = y
        spawn(x, y)
      }
    }

    parent.addEventListener('mousemove', onMove)
    return () => parent.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-240px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
