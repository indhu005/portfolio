'use client'
import { useState } from 'react'

type SyncResult = 'success' | 'failed'

export default function LatSyncFlow() {
  const [result, setResult] = useState<SyncResult>('success')

  const label = result === 'failed' ? 'Sync fails' : 'Synced, job closes'
  const desc = result === 'failed'
    ? "The banner turns red and the data stays safe. Retry sync is the only action — if it fails again, this just repeats, and nothing is lost even if the app closes first."
    : "The update syncs and the job closes — no extra approval needed."

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#FF7C5F', padding: '3px 9px', borderRadius: '999px', flex: '0 0 auto' }}>Technician</div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setResult('success')}
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
            onClick={() => setResult('failed')}
            style={{
              fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
              border: result === 'failed' ? '1.5px solid #FF7C5F' : '1px solid rgba(0,0,0,0.12)',
              backgroundColor: result === 'failed' ? '#FFF9F5' : '#FAFAFA',
              color: result === 'failed' ? '#1C1917' : '#9CA3AF',
            }}
          >
            Sync fails
          </button>
        </div>

        <div style={{ flex: '1 1 220px', padding: '10px 16px', backgroundColor: '#FFF9F5' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FF7C5F', marginBottom: '4px' }}>{label}</div>
          <div style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.5 }}>{desc}</div>
        </div>
      </div>
    </div>
  )
}
