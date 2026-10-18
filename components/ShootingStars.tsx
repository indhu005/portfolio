'use client'

const STARS = [
  { top: '8%', left: '15%', delay: '0s', duration: '6s' },
  { top: '22%', left: '60%', delay: '2.4s', duration: '7s' },
  { top: '55%', left: '5%', delay: '4.5s', duration: '5.5s' },
  { top: '70%', left: '75%', delay: '1.2s', duration: '6.5s' },
  { top: '35%', left: '40%', delay: '5.8s', duration: '7.5s' },
]

/** A handful of ambient shooting stars streaking across a dark section.
 * Purely decorative — pointer-events none, respects reduced-motion by not
 * rendering at all (no useful fallback state for a star to "jump to"). */
export default function ShootingStars() {
  return (
    <div aria-hidden="true" className="shooting-stars-field">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}
