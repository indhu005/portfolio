'use client'
import { useEffect, useRef, useState } from 'react'

export default function PixelCursor() {
  const birdsLayerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const birdSpawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateEnabled = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches)
    }

    updateEnabled()
    pointerQuery.addEventListener('change', updateEnabled)
    motionQuery.addEventListener('change', updateEnabled)
    return () => {
      pointerQuery.removeEventListener('change', updateEnabled)
      motionQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const birdVariants = ['Birds.svg', 'birds 02.svg', 'birds 03.svg']

    const spawnBird = () => {
      const layer = birdsLayerRef.current
      if (!layer) return

      const targetX = mousePos.current.x
      const targetY = mousePos.current.y
      const angle = Math.random() * Math.PI * 2
      const radius = 260 + Math.random() * 140
      const startX = targetX + Math.cos(angle) * radius
      const startY = targetY + Math.sin(angle) * radius
      const rotation = (Math.atan2(targetY - startY, targetX - startX) * 180) / Math.PI

      const bird = document.createElement('img')
      bird.src = `/images/home/${birdVariants[Math.floor(Math.random() * birdVariants.length)]}`
      bird.alt = ''
      bird.className = 'pixel-hover-bird'
      bird.style.left = `${startX - 12}px`
      bird.style.top = `${startY - 9}px`
      bird.style.transform = `rotate(${rotation}deg)`
      layer.appendChild(bird)

      requestAnimationFrame(() => {
        bird.style.left = `${targetX - 12}px`
        bird.style.top = `${targetY - 9}px`
        bird.style.opacity = '0'
      })

      setTimeout(() => bird.remove(), 850)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cardTarget = target.closest<HTMLElement>('[data-bird-target]')
      if (!cardTarget) return

      if (birdSpawnIntervalRef.current) return
      spawnBird()
      birdSpawnIntervalRef.current = setInterval(spawnBird, 260)
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const related = e.relatedTarget as HTMLElement | null
      const cardTarget = target.closest('[data-bird-target]')
      if (!cardTarget) return
      if (related && related.closest('[data-bird-target]')) return

      if (birdSpawnIntervalRef.current) {
        clearInterval(birdSpawnIntervalRef.current)
        birdSpawnIntervalRef.current = null
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      if (birdSpawnIntervalRef.current) clearInterval(birdSpawnIntervalRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={birdsLayerRef} className="pixel-footsteps-layer" aria-hidden="true" />
}
