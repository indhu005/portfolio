'use client'
import { useState } from 'react'

const BORDER = '#E5E5E5'
const TEXT = '#141414'
const TEXT_SECONDARY = '#4C494D'
const BRAND = '#CC4412'

const PRIORITIES = {
  urgent: { solid: '#DC2626', tint: '#FEE4E2', text: '#9F1239', label: 'Urgent' },
  medium: { solid: '#F19024', tint: '#FFE5C1', text: '#9C5700', label: 'Medium' },
  low: { solid: '#2B7EC9', tint: '#DDEDFF', text: '#023F6F', label: 'Low' },
} as const

type PriorityKey = keyof typeof PRIORITIES

const ORDERS: { id: string; title: string; location: string; priority: PriorityKey }[] = [
  { id: 'WO-2041', title: 'Boiler Unit 3 vibration', location: 'Building 13 · Room B2', priority: 'urgent' },
  { id: 'WO-2048', title: 'AHU filter replacement', location: 'Roof plant', priority: 'medium' },
  { id: 'WO-2052', title: 'Pump inspection', location: 'Room B1', priority: 'low' },
]

export default function LatPriorityQueuePrototype() {
  const [selected, setSelected] = useState(0)
  const [reviewed, setReviewed] = useState<Set<number>>(new Set())

  const order = ORDERS[selected]
  const p = PRIORITIES[order.priority]
  const isReviewed = reviewed.has(selected)

  const review = () => {
    setReviewed((prev) => new Set(prev).add(selected))
  }

  return (
    <div style={{ width: '100%', maxWidth: '560px', border: `1px solid ${BORDER}`, borderRadius: '16px', backgroundColor: '#FFFFFF', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 220px', borderRight: `1px solid ${BORDER}`, padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: TEXT_SECONDARY, marginBottom: '12px' }}>Site work orders</div>
        {ORDERS.map((o, i) => {
          const op = PRIORITIES[o.priority]
          const active = i === selected
          const done = reviewed.has(i)
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setSelected(i)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                border: 'none', borderLeft: `3px solid ${op.solid}`, borderRadius: '6px',
                backgroundColor: active ? '#F5F5F4' : 'transparent',
                padding: '10px 12px', marginBottom: '6px', opacity: done ? 0.55 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase', color: op.text, backgroundColor: op.tint, padding: '2px 7px', borderRadius: '4px' }}>{op.label}</span>
                <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>{o.id}</span>
                {done && <span style={{ fontSize: '11px', color: '#16A34A', marginLeft: 'auto' }}>✓</span>}
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: TEXT }}>{o.title}</div>
              <div style={{ fontSize: '11.5px', color: TEXT_SECONDARY }}>{o.location}</div>
            </button>
          )
        })}
      </div>

      <div style={{ flex: '1 1 260px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: p.text, backgroundColor: p.tint, padding: '2px 8px', borderRadius: '4px' }}>{p.label}</span>
          <span style={{ fontSize: '12px', color: TEXT_SECONDARY }}>{order.id}</span>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: TEXT, marginTop: '8px' }}>{order.title}</div>
        <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginBottom: '18px' }}>{order.location}</div>

        <div style={{ height: '4px', borderRadius: '2px', backgroundColor: p.solid, marginBottom: '18px' }} />

        {!isReviewed ? (
          <button
            type="button"
            onClick={review}
            style={{ width: '100%', fontSize: '14px', fontWeight: 700, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: BRAND, color: '#FFFFFF' }}
          >
            Mark reviewed
          </button>
        ) : (
          <div style={{ fontSize: '13px', color: '#16A34A', fontWeight: 600, padding: '12px', textAlign: 'center', border: '1.5px solid #16A34A', borderRadius: '8px' }}>✓ Reviewed</div>
        )}
      </div>
    </div>
  )
}
