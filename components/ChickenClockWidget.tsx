'use client'

import { useEffect, useRef, useState } from 'react'

// Recreates a lock-screen screensaver reference: a chicken walks a clockwise
// loop around the inside of a clock face. At 7:00 AM it lays an egg that
// settles into an omelette; at 7:00 PM it falls and cooks through a few
// "hot" stages before landing as a baked roast chicken. Both holds resume
// the walk after HOLD_MS.

const asset = (name: string) => `/images/home/${name.replace(/ /g, '%20')}`

const BASE = asset('Chicken walking base.svg')
const FRONT_LEGS = asset('Chicken walking front legs.svg')
const BACK_LEGS = asset('Chicken walking back legs.svg')
const EGG = asset('Egg.svg')
const OMELETTE = asset('Omelette.svg')
const HOT = asset('hot chicken.svg')
const HOTTER = asset('hott hot chicken.svg')
const BURNT = asset('burnt chicken.svg')
const BAKED = asset('Baked Chicken.svg')

const CIRCLE_SIZE = 220
const RADIUS = 92
const CENTER = CIRCLE_SIZE / 2
const WALK_PERIOD_MS = 8000
const HOLD_MS = 5000

// Each of these three SVGs is a complete standalone chicken illustration
// (same body, different leg pose) — not a base layer + leg overlay. Cycling
// through them one at a time is the walk animation; a neutral BASE frame
// between each leg pose gives it a contact-pass-contact-pass bounce instead
// of a leg just snapping between two extremes.
const WALK_FRAMES = [BASE, FRONT_LEGS, BASE, BACK_LEGS]
const WALK_FRAME_MS = 160

const MORNING_STAGES: { src: string; atRim: boolean }[] = [
  { src: EGG, atRim: true },
  { src: OMELETTE, atRim: false },
]
const MORNING_DURATIONS = [550]

const EVENING_STAGES: { src: string; atRim: boolean }[] = [
  { src: HOT, atRim: true },
  { src: HOTTER, atRim: true },
  { src: BURNT, atRim: true },
  { src: BAKED, atRim: false },
]
const EVENING_DURATIONS = [280, 280, 420]

type Phase = 'walk' | 'morning' | 'evening'

export default function ChickenClockWidget({ theme }: { theme?: 'day' | 'night' } = {}) {
  const [now, setNow] = useState(() => new Date())
  const [walkFrame, setWalkFrame] = useState(0)
  const [angle, setAngle] = useState(-Math.PI / 2)
  // Measured from actual frame-to-frame x movement rather than derived from
  // the angle formula's sign — that way a sign mistake in the circular-motion
  // math can't also flip the facing direction the wrong way.
  const [facingLeft, setFacingLeft] = useState(true)
  const [phase, setPhase] = useState<Phase>('walk')
  const [step, setStep] = useState(0)
  // Set only during a click-triggered preview: shows a fake "6:59 -> 7:00"
  // readout so the clock visibly ticks over right as the transformation
  // starts, recreating the reference video's pacing on demand (a real
  // visitor landing at the actual 7am/7pm minute never needs this —
  // `now` already reads 7:00 then).
  const [previewMinute, setPreviewMinute] = useState<59 | 0 | null>(null)
  const previewingRef = useRef(false)
  const startRef = useRef(0)
  const prevXRef = useRef<number | null>(null)
  const facingLeftRef = useRef(true)
  const firedKeyRef = useRef<string | null>(null)
  const previewHourRef = useRef(7)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Keeps cycling even once phase leaves 'walk', so the chicken standing by
  // the falling egg/roast still waddles in place instead of freezing.
  useEffect(() => {
    const id = setInterval(() => setWalkFrame((f) => (f + 1) % WALK_FRAMES.length), WALK_FRAME_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (phase !== 'walk') return
    let raf: number
    const tick = (t: number) => {
      if (!startRef.current) startRef.current = t
      const elapsed = (t - startRef.current) % WALK_PERIOD_MS
      const a = (elapsed / WALK_PERIOD_MS) * Math.PI * 2 - Math.PI / 2
      setAngle(a)

      const x = CENTER + RADIUS * Math.cos(a)
      if (prevXRef.current !== null) {
        const dx = x - prevXRef.current
        if (dx !== 0) {
          const movingLeftNow = dx < 0
          if (movingLeftNow !== facingLeftRef.current) {
            facingLeftRef.current = movingLeftNow
            setFacingLeft(movingLeftNow)
          }
        }
      }
      prevXRef.current = x

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  // Forced-theme widgets (morning/night) run their own self-contained loop:
  // walk a lap, fake-tick 6:59->7:00, play the transform stages, hold, and
  // repeat — forever, driven by one recursive setTimeout chain rather than
  // several useEffects reacting to each other's state changes (that version
  // could silently stop re-arming after the first cycle).
  useEffect(() => {
    if (!theme) return
    let cancelled = false
    const targetHour = theme === 'night' ? 19 : 7
    previewHourRef.current = targetHour
    const stages = theme === 'night' ? EVENING_STAGES : MORNING_STAGES
    const durations = theme === 'night' ? EVENING_DURATIONS : MORNING_DURATIONS
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

    async function loop() {
      while (!cancelled) {
        setPhase('walk')
        setPreviewMinute(null)
        startRef.current = 0
        await wait(WALK_PERIOD_MS)
        if (cancelled) break

        setPreviewMinute(59)
        await wait(900)
        if (cancelled) break

        setPreviewMinute(0)
        setPhase(theme === 'night' ? 'evening' : 'morning')
        for (let s = 0; s < durations.length; s++) {
          setStep(s)
          await wait(durations[s])
          if (cancelled) break
        }
        if (cancelled) break

        setStep(stages.length - 1)
        await wait(HOLD_MS)
      }
    }

    loop()
    return () => {
      cancelled = true
    }
  }, [theme])

  // Real-time widget only: fires once per calendar hour when the actual
  // device clock crosses 7:00. Keying on date+hour (not just hour) stops a
  // second fire if the widget re-renders within the same minute.
  useEffect(() => {
    if (theme || phase !== 'walk') return
    const h = now.getHours()
    const m = now.getMinutes()
    if (m !== 0 || (h !== 7 && h !== 19)) return
    const key = `${now.toDateString()}-${h}`
    if (firedKeyRef.current === key) return
    firedKeyRef.current = key
    setPhase(h === 7 ? 'morning' : 'evening')
    setStep(0)
    startRef.current = 0
  }, [now, phase, theme])

  // Real-time widget only: advances through its own stage sequence once
  // triggered above, then resets back to walking.
  useEffect(() => {
    if (theme || phase === 'walk') return
    const stages = phase === 'morning' ? MORNING_STAGES : EVENING_STAGES
    const durations = phase === 'morning' ? MORNING_DURATIONS : EVENING_DURATIONS
    if (step >= stages.length - 1) {
      const id = setTimeout(() => {
        setPhase('walk')
        setPreviewMinute(null)
      }, HOLD_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setStep((s) => s + 1), durations[step])
    return () => clearTimeout(id)
  }, [phase, step, theme])

  // Click-to-preview — only wired up on the real-time widget, since the
  // forced-theme widgets already loop this automatically and a manual click
  // would otherwise race with their own self-driven timeout chain.
  const startSequence = () => {
    if (theme || phase !== 'walk' || previewingRef.current) return
    previewingRef.current = true
    previewHourRef.current = 7
    setPreviewMinute(59)
    setTimeout(() => {
      setPreviewMinute(0)
      setPhase('morning')
      setStep(0)
      startRef.current = 0
      previewingRef.current = false
    }, 900)
  }

  const hour = now.getHours()
  // theme forces the visuals regardless of real time, so a "day" and "night"
  // instance can sit side by side — each still ticks its own real clock and
  // fires its own 7am/7pm sequence independently.
  const isDaytime = theme ? theme === 'day' : hour >= 6 && hour < 18
  // Forced-theme widgets show a clock matching their theme (always "6:59"
  // while walking, same as the reference video) instead of the real device
  // time, which would otherwise clash with a widget visually themed for the
  // opposite time of day.
  const timeLabel =
    previewMinute !== null
      ? `${((previewHourRef.current + 11) % 12) + 1}:${previewMinute === 59 ? '59' : '00'} ${previewHourRef.current < 12 ? 'AM' : 'PM'}`
      : theme === 'night'
        ? '6:59 PM'
        : theme === 'day'
          ? '6:59 AM'
          : now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  // theme="day" (the always-visible morning preview widget) keeps the
  // reference video's pink/yellow sunrise look; the real-time center widget
  // shows blue sky to yellow during actual daytime hours instead.
  const background = !isDaytime
    ? 'linear-gradient(180deg, #5B5583 0%, #8C7A9B 55%, #C9A5A8 100%)'
    : theme === 'day'
      ? 'linear-gradient(180deg, #E8A7A0 0%, #F0C9A0 55%, #F3DE9E 100%)'
      : 'linear-gradient(180deg, #6EC3FF 0%, #BFE4FF 45%, #FCE68A 100%)'

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: CIRCLE_SIZE + 80,
        maxWidth: '100%',
        padding: '28px 24px 24px',
        borderRadius: '24px',
        background,
        overflow: 'hidden',
      }}
    >
      <div
        onClick={startSequence}
        title={phase === 'walk' ? 'Click to preview' : undefined}
        style={{
          position: 'relative',
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          cursor: phase === 'walk' ? 'pointer' : 'default',
        }}
      >
        <ClockTicks />
        {phase === 'walk' && (
          <WalkingChicken angle={angle} walkFrame={walkFrame} facingLeft={facingLeft} />
        )}
        {phase !== 'walk' && <StandingChicken walkFrame={walkFrame} />}
        {phase === 'morning' && (
          <StageIcon stage={MORNING_STAGES[step]} />
        )}
        {phase === 'evening' && (
          <StageIcon stage={EVENING_STAGES[step]} />
        )}
      </div>

      <div
        style={{
          marginTop: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: isDaytime ? '#3A2E2A' : '#FFFFFF',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {timeLabel}
      </div>

      {/* Below-circle landing spot for the omelette/roast chicken once it settles */}
      <div style={{ position: 'relative', width: '100%', height: '48px', marginTop: '4px' }}>
        {phase === 'morning' && !MORNING_STAGES[step].atRim && (
          <SettledIcon src={MORNING_STAGES[step].src} />
        )}
        {phase === 'evening' && !EVENING_STAGES[step].atRim && (
          <SettledIcon src={EVENING_STAGES[step].src} />
        )}
      </div>
    </div>
  )
}

// Stays put at the top of the rim through the whole egg/omelette or
// hot/baked sequence, next to the falling icon — the reference video has the
// chicken vanish at this point, but it reads better staying visible. Keeps
// cycling walkFrame so it waddles in place rather than freezing on one pose.
function StandingChicken({ walkFrame }: { walkFrame: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: CENTER - 20,
        top: CENTER - RADIUS,
        width: '30px',
        height: '30px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img src={WALK_FRAMES[walkFrame]} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

// Subtle hour-mark ticks at the circle's four cardinal points, matching the
// reference screensaver's minimal clock face.
const TICK_RADIUS = CIRCLE_SIZE / 2 - 14
const TICK_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]

function ClockTicks() {
  return (
    <>
      {TICK_ANGLES.map((a, i) => {
        const x = CENTER + TICK_RADIUS * Math.cos(a)
        const y = CENTER + TICK_RADIUS * Math.sin(a)
        const rotateDeg = (a * 180) / Math.PI + 90
        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: '2px',
              height: '8px',
              borderRadius: '1px',
              backgroundColor: 'rgba(28, 25, 23, 0.18)',
              transform: `translate(-50%, -50%) rotate(${rotateDeg}deg)`,
            }}
          />
        )
      })}
    </>
  )
}

function WalkingChicken({
  angle,
  walkFrame,
  facingLeft,
}: {
  angle: number
  walkFrame: number
  facingLeft: boolean
}) {
  const x = CENTER + RADIUS * Math.cos(angle)
  const y = CENTER + RADIUS * Math.sin(angle)

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '34px',
        height: '34px',
        transform: `translate(-50%, -50%) scaleX(${facingLeft ? 1 : -1})`,
      }}
    >
      <img src={WALK_FRAMES[walkFrame]} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

function StageIcon({ stage }: { stage: { src: string; atRim: boolean } }) {
  if (!stage.atRim) return null
  return (
    <img
      src={stage.src}
      alt=""
      style={{
        position: 'absolute',
        left: '50%',
        top: '8%',
        width: '32px',
        height: '32px',
        transform: 'translate(-50%, 0)',
        transition: 'opacity 0.25s ease',
      }}
    />
  )
}

function SettledIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        width: '44px',
        height: '44px',
        transform: 'translate(-50%, 0)',
      }}
    />
  )
}
