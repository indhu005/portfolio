'use client'
import { useRef, useState } from 'react'

type MicState = 'idle' | 'listening' | 'processing'
type PhotoState = 'empty' | 'uploaded' | 'failed'

const BRAND = '#CC4412'
const BORDER = '#E5E5E5'
const TEXT = '#141414'
const TEXT_SECONDARY = '#4C494D'
const URGENT_SOLID = '#DC2626'
const URGENT_TINT = '#FEE4E2'
const URGENT_TEXT = '#9F1239'

export default function LatWorkOrderPrototype() {
  const [assetName, setAssetName] = useState('')
  const [touched, setTouched] = useState(false)
  const [notes, setNotes] = useState('')
  const [mic, setMic] = useState<MicState>('idle')
  const [photo, setPhoto] = useState<PhotoState>('empty')
  const [approval, setApproval] = useState<'yes' | 'no' | null>(null)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const hasError = touched && assetName.trim() === ''

  const dictate = () => {
    if (mic !== 'idle') return
    setMic('listening')
    const t1 = setTimeout(() => {
      setMic('processing')
      const t2 = setTimeout(() => {
        setNotes((n) => (n ? n + ' ' : '') + 'Vibration increased during startup. Inspect the drive belt.')
        setMic('idle')
      }, 900)
      timers.current.push(t2)
    }, 1400)
    timers.current.push(t1)
  }

  const addPhoto = () => {
    if (photo === 'uploaded') return
    setPhoto('uploaded')
  }

  const retryPhoto = () => setPhoto('uploaded')

  const save = () => {
    setTouched(true)
    if (assetName.trim() === '') return
    setSaveState('saving')
    const t = setTimeout(() => setSaveState('saved'), 900)
    timers.current.push(t)
  }

  const reset = () => {
    clearTimers()
    setAssetName('')
    setTouched(false)
    setNotes('')
    setMic('idle')
    setPhoto('empty')
    setApproval(null)
    setSaveState('idle')
  }

  return (
    <div style={{ width: '100%', maxWidth: '340px', border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '20px', backgroundColor: '#FFFFFF', fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: URGENT_TEXT, backgroundColor: URGENT_TINT, padding: '2px 8px', borderRadius: '4px' }}>Urgent</span>
        <span style={{ fontSize: '12px', color: TEXT_SECONDARY }}>WO-2041</span>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 700, color: TEXT, marginTop: '8px' }}>Boiler Unit 3 vibration</div>
      <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginBottom: '16px' }}>Building 13 · Room B2</div>

      <div style={{ height: '4px', borderRadius: '2px', backgroundColor: URGENT_SOLID, marginBottom: '18px' }} />

      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '4px' }}>Asset name</label>
      <input
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Enter asset name"
        style={{
          width: '100%', fontSize: '14px', color: TEXT, padding: '10px 12px', borderRadius: '8px',
          border: `1.5px solid ${hasError ? URGENT_SOLID : BORDER}`, outline: 'none', marginBottom: '4px',
          boxSizing: 'border-box',
        }}
      />
      {hasError && <div style={{ fontSize: '11.5px', color: URGENT_SOLID, marginBottom: '12px' }}>Add the unit number to identify this asset</div>}
      {!hasError && <div style={{ height: '12px', marginBottom: '12px' }} />}

      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '4px' }}>Work notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Describe what you found and what to do."
        rows={3}
        style={{
          width: '100%', fontSize: '13.5px', color: TEXT, padding: '10px 12px', borderRadius: '8px',
          border: `1.5px solid ${BORDER}`, outline: 'none', resize: 'none', marginBottom: '8px',
          boxSizing: 'border-box', fontFamily: 'inherit',
        }}
      />

      <button
        type="button"
        onClick={dictate}
        disabled={mic !== 'idle'}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600,
          color: mic === 'idle' ? TEXT : BRAND, backgroundColor: '#FFFFFF', border: `1.5px solid ${mic === 'idle' ? BORDER : BRAND}`,
          borderRadius: '999px', padding: '7px 14px', cursor: mic === 'idle' ? 'pointer' : 'default', marginBottom: '18px',
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: mic === 'idle' ? '#A8A29E' : BRAND, animation: mic !== 'idle' ? 'lat-pulse 1s infinite' : 'none' }} />
        {mic === 'idle' && 'Dictate work notes'}
        {mic === 'listening' && 'Listening…'}
        {mic === 'processing' && 'Processing…'}
      </button>

      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '8px' }}>Photos</label>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
        <div
          onClick={photo === 'failed' ? retryPhoto : undefined}
          style={{
            width: '64px', height: '64px', borderRadius: '8px', border: `1.5px solid ${photo === 'failed' ? URGENT_SOLID : BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: photo === 'failed' ? 'pointer' : 'default',
            backgroundColor: photo === 'uploaded' ? '#F3F4F6' : '#FFFFFF', fontSize: '10px', color: photo === 'failed' ? URGENT_SOLID : '#A8A29E', textAlign: 'center',
          }}
        >
          {photo === 'empty' && '—'}
          {photo === 'uploaded' && '✓ Photo'}
          {photo === 'failed' && '↻ Retry'}
        </div>
        <div
          onClick={addPhoto}
          style={{
            width: '64px', height: '64px', borderRadius: '8px', border: `1.5px dashed ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#A8A29E', fontSize: '20px',
          }}
        >
          +
        </div>
      </div>

      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '8px' }}>Needs approval?</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['yes', 'no'] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setApproval(opt)}
            style={{
              fontSize: '13px', fontWeight: 600, padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize',
              border: `1.5px solid ${approval === opt ? TEXT : BORDER}`,
              backgroundColor: approval === opt ? TEXT : '#FFFFFF',
              color: approval === opt ? '#FFFFFF' : TEXT,
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saveState !== 'idle'}
        style={{
          width: '100%', fontSize: '14px', fontWeight: 700, padding: '12px', borderRadius: '8px', border: 'none', cursor: saveState === 'idle' ? 'pointer' : 'default',
          backgroundColor: saveState === 'saved' ? '#16A34A' : BRAND, color: '#FFFFFF',
        }}
      >
        {saveState === 'idle' && 'Save update'}
        {saveState === 'saving' && 'Saving…'}
        {saveState === 'saved' && 'Saved ✓'}
      </button>

      {saveState === 'saved' && (
        <button type="button" onClick={reset} style={{ display: 'block', margin: '10px auto 0', fontSize: '12px', color: TEXT_SECONDARY, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Reset
        </button>
      )}

      <style>{`@keyframes lat-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  )
}
