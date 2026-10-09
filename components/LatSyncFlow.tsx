'use client'
import { useState } from 'react'

type SyncResult = 'success' | 'failed'

const cards = [
  {
    key: 'online',
    label: 'Online',
    color: '#16A34A',
    src: '/images/lat/LAT%20%C2%B7%20Boiler%20Unit%203%20job%20detail.png',
    alt: "Technician job detail with a live connection — the job can't close until an update syncs",
    caption: "Sees the job, sends updates. Can't close until synced.",
  },
  {
    key: 'offline',
    label: 'Offline',
    color: '#D97706',
    src: '/images/lat/LAT%20%C2%B7%20Technician%20job%20%E2%80%94%20Offline%20form%20filled.png',
    alt: 'Technician job form filled out with no signal',
    caption: 'No signal — work continues, nothing lost. Saved to the device until it syncs.',
  },
  {
    key: 'failed',
    label: 'Sync failed',
    color: '#DC2626',
    src: '/images/lat/LAT%20%C2%B7%20Technician%20job%20%E2%80%94%20Sync%20failed.png',
    alt: 'Technician job showing a failed sync with a red banner and Retry sync action',
    caption: 'Banner turns red, data stays safe. Retry is the only action.',
  },
  {
    key: 'approval',
    label: 'Extra work approved',
    color: '#D97706',
    src: '/images/lat/LAT%20%C2%B7%20Technician%20job%20%E2%80%94%20Extra%20work%20approval%20pending.png',
    alt: 'Technician job with synced updates, awaiting PM approval for extra work',
    caption: "Synced, but locked until the PM approves extra work.",
  },
] as const

export default function LatSyncFlow() {
  const [result, setResult] = useState<SyncResult>('success')
  const [extraWork, setExtraWork] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const label = result === 'failed' ? 'Sync fails' : extraWork ? 'Synced, approval needed' : 'Synced, job closes'

  const desc = result === 'failed'
    ? "The banner turns red and the data stays safe. Retry sync is the only action — if it fails again, this just repeats, and nothing is lost even if the app closes first."
    : extraWork
      ? "The update syncs. Because extra work was requested, the job stays locked until a PM approves it."
      : "The update syncs and the job closes — no extra approval needed."

  const highlightedCard = hasInteracted ? (result === 'failed' ? 'failed' : extraWork ? 'approval' : 'online') : undefined

  return (
    <div style={{ width: '100%', marginTop: '32px', marginBottom: '48px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => { setResult('success'); setHasInteracted(true) }}
          style={{
            fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
            border: result === 'success' ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
            backgroundColor: result === 'success' ? '#FFF9F5' : '#FAFAFA',
            color: result === 'success' ? '#1C1917' : '#9CA3AF',
          }}
        >
          Sync succeeds
        </button>
        <button
          type="button"
          onClick={() => { setResult('failed'); setHasInteracted(true) }}
          style={{
            fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
            border: result === 'failed' ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
            backgroundColor: result === 'failed' ? '#FFF9F5' : '#FAFAFA',
            color: result === 'failed' ? '#1C1917' : '#9CA3AF',
          }}
        >
          Sync fails
        </button>
        <span style={{ width: '1px', backgroundColor: 'rgba(0,0,0,0.12)', margin: '4px 4px' }} />
        <button
          type="button"
          onClick={() => { setExtraWork(false); setHasInteracted(true) }}
          style={{
            fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
            border: !extraWork ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
            backgroundColor: !extraWork ? '#FFF9F5' : '#FAFAFA',
            color: !extraWork ? '#1C1917' : '#9CA3AF',
          }}
        >
          No extra work
        </button>
        <button
          type="button"
          onClick={() => { setExtraWork(true); setHasInteracted(true) }}
          style={{
            fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
            border: extraWork ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
            backgroundColor: extraWork ? '#FFF9F5' : '#FAFAFA',
            color: extraWork ? '#1C1917' : '#9CA3AF',
          }}
        >
          Extra work requested
        </button>
      </div>

      <div style={{ padding: '18px 20px', backgroundColor: '#FFF9F5', borderLeft: '3px solid #FF7C5F' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FF7C5F', marginBottom: '6px' }}>{label}</div>
        <div style={{ fontSize: '14px', color: '#44403C', lineHeight: 1.6 }}>{desc}</div>
      </div>

      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '8px' }}>One job, four states</div>
      <div style={{ fontSize: '13px', color: '#78716C', marginBottom: '20px' }}>Click a state above or below to compare.</div>

      <div className="self-responsive-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${cards.length}, 1fr)`, gap: '20px' }}>
        {cards.map((card) => {
          const isActive = highlightedCard === card.key
          return (
            <div key={card.key}>
              <div style={{
                width: '100%',
                borderRadius: '12px',
                opacity: highlightedCard && !isActive ? 0.35 : 1,
                filter: highlightedCard && !isActive ? 'grayscale(60%)' : 'none',
                transition: 'opacity 0.25s ease, filter 0.25s ease',
              }}>
                <img
                  loading="lazy"
                  decoding="async"
                  src={card.src}
                  alt={card.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: card.color, marginTop: '10px' }}>{card.label}</div>
              <div style={{ fontSize: '12px', color: '#78716C', lineHeight: 1.45, marginTop: '5px' }}>{card.caption}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
