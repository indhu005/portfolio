type Tradeoff = {
  id: string
  considered: string
  shippedTitle: string
  why: string
  stat?: string
}

const tradeoffs: Tradeoff[] = [
  {
    id: 'automation-trust',
    considered: 'Auto-scheduled maintenance, no human gate.',
    shippedTitle: 'Human-in-the-loop review',
    why: 'The first visible mistake would have collapsed adoption otherwise.',
    stat: '61% → 19% override rate',
  },
  {
    id: 'dashboard-roles',
    considered: 'One shared dashboard for every user.',
    shippedTitle: 'Role-based surfaces',
    why: 'One view stalled decisions — each role scanned for something different, so I split surfaces by role.',
  },
  {
    id: 'ai-integrity',
    considered: 'Widen predictive coverage fast after early results.',
    shippedTitle: 'Slowed for validation first',
    why: 'Data accuracy climbed as a result.',
    stat: '50% → 92% data accuracy',
  },
]

export default function LatTradeoffTable() {
  return (
    <div style={{ width: '100%', marginTop: '32px', marginBottom: '48px' }}>
      {tradeoffs.map((t, i) => (
        <div
          key={t.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            padding: '24px 0',
            borderTop: i === 0 ? 'none' : '1px solid rgba(28, 25, 23, 0.12)',
          }}
          className="lat-tradeoff-row"
        >
          <div>
            <div style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: '8px',
            }}>
              Considered
            </div>
            <div style={{
              fontSize: '13.5px',
              color: '#9CA3AF',
              lineHeight: 1.5,
              textDecoration: 'line-through',
              textDecorationColor: 'rgba(28, 25, 23, 0.2)',
              textDecorationThickness: '1.5px',
            }}>
              {t.considered}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FF7C5F',
              marginBottom: '8px',
            }}>
              Shipped
            </div>
            <div style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: '15.5px',
              fontWeight: 700,
              color: '#1C1917',
              marginBottom: '6px',
            }}>
              {t.shippedTitle}
            </div>
            <div style={{ fontSize: '13.5px', color: '#57534E', lineHeight: 1.5 }}>
              {t.why}
            </div>
            {t.stat && (
              <span style={{
                display: 'inline-block',
                marginTop: '10px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '11px',
                color: '#FF7C5F',
                background: 'rgba(255, 107, 53, 0.1)',
                padding: '3px 9px',
                borderRadius: '999px',
              }}>
                {t.stat}
              </span>
            )}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 600px) {
          .lat-tradeoff-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  )
}
