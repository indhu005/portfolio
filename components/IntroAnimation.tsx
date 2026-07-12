'use client'
import { useState, useEffect } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'name' | 'reveal' | 'complete'>('name')

  useEffect(() => {
    // Show name for 1.2s
    const nameTimer = setTimeout(() => {
      setStage('reveal')
    }, 1200)

    // Start circular reveal after name
    const revealTimer = setTimeout(() => {
      setStage('complete')
    }, 2000)

    // Complete animation
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2800)

    return () => {
      clearTimeout(nameTimer)
      clearTimeout(revealTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (stage === 'complete') return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: stage === 'complete' ? 'none' : 'auto',
      }}
    >
      {/* Black background with circular reveal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          clipPath: stage === 'reveal'
            ? 'circle(150% at 50% 50%)'
            : 'circle(0% at 50% 50%)',
          transition: 'clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        {/* Indhu text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-fraunces), serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            opacity: stage === 'name' ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          Indhu
        </div>
      </div>

      {/* Peek circle - reveals the site underneath */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: stage === 'reveal' ? '300vmax' : '0px',
          height: stage === 'reveal' ? '300vmax' : '0px',
          borderRadius: '50%',
          overflow: 'hidden',
          transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  )
}
