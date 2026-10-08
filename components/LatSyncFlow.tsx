'use client'
import { useState } from 'react'

type SyncResult = 'success' | 'failed'

const baseSteps = [
  { key: 'online', label: 'Online', desc: 'Technician opens the job with a connection. Updates can be sent immediately.' },
  { key: 'offline', label: 'Signal drops', desc: 'Connection is lost. The screen says so — work continues in an offline form.' },
  { key: 'saved', label: 'Saved locally', desc: 'The update is stored on the device first. The job stays locked until it syncs.' },
  { key: 'syncing', label: 'Signal returns', desc: 'Connection comes back. The app attempts to sync the saved update.' },
] as const

const cards = [
  {
    key: 'online',
    label: 'Online',
    color: '#16A34A',
    src: '/images/lat/LAT%20%C2%B7%20Boiler%20Unit%203%20job%20detail.png',
    alt: "Technician job detail with a live connection — the job can't close until an update is saved",
    caption: "Sees the job, sends updates. Can't close until saved.",
  },
  {
    key: 'offline',
    label: 'Offline form',
    color: '#D97706',
    src: '/images/lat/LAT%20%C2%B7%20Technician%20job%20%E2%80%94%20Offline%20form%20filled.png',
    alt: 'Technician job form filled out with no signal',
    caption: 'No signal — work continues, nothing lost.',
  },
  {
    key: 'saved',
    label: 'Saved locally',
    color: '#2563EB',
    src: '/images/lat/LAT%20%C2%B7%20Technician%20job%20%E2%80%94%20Saved%20locally.png',
    alt: 'Technician job update saved locally on the device, waiting to sync',
    caption: "Stored on-device first. Footer shows what's still waiting.",
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
  const [activeKey, setActiveKey] = useState<string>('online')
  const [hasInteracted, setHasInteracted] = useState(false)

  const branchSteps = result === 'success'
    ? [{ key: 'synced', label: 'Synced', desc: 'The update reaches the system. It shows as synced on the job.' }]
    : [
        { key: 'failed', label: 'Sync failed', desc: 'The banner turns red and says the data is safe. Retry sync is the only action.' },
        { key: 'retry', label: 'Retry sync', desc: 'Tapping retry sends the saved update again — loops back to the sync attempt.' },
      ]

  const closingStep = extraWork
    ? { key: 'approval', label: 'PM approval', desc: "The job can't close until the PM approves the extra work." }
    : { key: 'closed', label: 'Job closes', desc: 'No extra work requested — the job closes once the update is synced.' }

  const allSteps = [...baseSteps, ...branchSteps, closingStep]
  const active = allSteps.find((s) => s.key === activeKey) ?? allSteps[0]

  // Map diagram nodes to the matching screenshot card
  const cardKeyForStep: Record<string, string> = {
    online: 'online',
    offline: 'offline',
    saved: 'saved',
    failed: 'failed',
    retry: 'failed',
    approval: 'approval',
  }
  const highlightedCard = hasInteracted ? cardKeyForStep[activeKey] : undefined

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

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
        {allSteps.map((step, i) => (
          <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={() => { setActiveKey(step.key); setHasInteracted(true) }}
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: '0px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: activeKey === step.key ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
                backgroundColor: activeKey === step.key ? '#1C1917' : '#FFFFFF',
                color: activeKey === step.key ? '#FFFFFF' : '#44403C',
                transition: 'all 0.15s ease',
              }}
            >
              {step.label}
            </button>
            {i < allSteps.length - 1 && (
              <span style={{ color: step.key === 'retry' ? '#FF7C5F' : '#D1D5DB', fontSize: '16px' }}>
                {step.key === 'retry' ? '↺' : '→'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', marginBottom: '32px', padding: '18px 20px', backgroundColor: '#FFF9F5', borderLeft: '3px solid #FF7C5F' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FF7C5F', marginBottom: '6px' }}>{active.label}</div>
        <div style={{ fontSize: '14px', color: '#44403C', lineHeight: 1.6 }}>{active.desc}</div>
      </div>

      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '8px' }}>One job, five states</div>
      <div style={{ fontSize: '13px', color: '#78716C', marginBottom: '20px' }}>Cropped to the status bar and banner — the part that changes.</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '20px' }}>
        {cards.map((card) => {
          const isActive = highlightedCard === card.key
          return (
            <div key={card.key}>
              <div style={{
                width: '100%',
                height: '340px',
                overflow: 'hidden',
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
                    objectFit: 'cover',
                    objectPosition: 'top',
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
