'use client'
import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  speedMs?: number
  startDelayMs?: number
  onDone?: () => void
  showCursor?: boolean
}

/** Types text out one character at a time, like someone typing it live.
 * Used for the homepage hero so it reads as being written rather than
 * just fading in. Respects reduced-motion by rendering the full text instantly. */
export default function Typewriter({ text, speedMs = 32, startDelayMs = 0, onDone, showCursor = true }: TypewriterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setCount(text.length)
      onDone?.()
      return
    }
    const startTimer = setTimeout(() => setStarted(true), startDelayMs)
    return () => clearTimeout(startTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!started || reduced) return
    if (count >= text.length) {
      onDone?.()
      return
    }
    const timer = setTimeout(() => setCount((c) => c + 1), speedMs)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, count, reduced])

  const done = count >= text.length

  return (
    <span>
      {text.slice(0, count)}
      {showCursor && !done && (
        <span style={{ opacity: 0.5, fontWeight: 400 }} aria-hidden="true">|</span>
      )}
    </span>
  )
}
