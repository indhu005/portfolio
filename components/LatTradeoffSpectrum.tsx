'use client'
import { useState } from 'react'

type Tradeoff = {
  id: string
  leftLabel: string
  rightLabel: string
  chosenSide: 'left' | 'right'
  position: number // 0-100, how far the dot sits toward the chosen side
  title: string
  summary: string
  reasoning: string
  stat?: string
}

const tradeoffs: Tradeoff[] = [
  {
    id: 'automation-trust',
    leftLabel: 'Automation',
    rightLabel: 'Trust',
    chosenSide: 'right',
    position: 82,
    title: 'Automation vs. Trust',
    summary: 'Chose human-in-the-loop to protect adoption after the first mistake.',
    reasoning: 'The engine could have auto-scheduled maintenance. We chose human-in-the-loop instead — the first visible mistake would have collapsed adoption otherwise.',
    stat: '61% → 19% override rate, month 1 to 7',
  },
  {
    id: 'signal-speed',
    leftLabel: 'Signal Richness',
    rightLabel: 'Decision Speed',
    chosenSide: 'right',
    position: 70,
    title: 'Signal Richness vs. Decision Speed',
    summary: 'Showed top drivers only, buried the rest in drill-down.',
    reasoning: 'Engineering wanted 10+ predictive inputs per asset. Testing showed users only acted on risk, time-to-impact, and cost.',
  },
  {
    id: 'transparency-comfort',
    leftLabel: 'Org. Comfort',
    rightLabel: 'Transparency',
    chosenSide: 'right',
    position: 75,
    title: 'Transparency vs. Organizational Comfort',
    summary: 'Real-time visibility over curated weekly summaries.',
    reasoning: 'Some stakeholders wanted curated weekly summaries; real-time visibility exposed inefficiencies instead. Meetings became strategic, not status-driven.',
  },
  {
    id: 'minimal-disruption',
    leftLabel: 'Minimal Disruption',
    rightLabel: 'Full Reorg',
    chosenSide: 'left',
    position: 35,
    title: 'What "Minimal Disruption" Actually Meant',
    summary: 'The real ask was reorganizing five roles’ day-to-day work, not the interface.',
    reasoning: 'I first read it as designing within existing tools. The real ask was reorganizing how five roles worked day-to-day — selling that reframe was the actual work.',
  },
  {
    id: 'dashboard-roles',
    leftLabel: 'One Dashboard',
    rightLabel: 'Role-Based',
    chosenSide: 'right',
    position: 80,
    title: 'One Dashboard vs. Role-Based Views',
    summary: 'One shared view stalled decisions, so surfaces split by role.',
    reasoning: 'The first design was one dashboard for everyone. It stalled decisions, so I moved to role-based surfaces — re-litigating a decision executives had already approved.',
  },
  {
    id: 'ai-integrity',
    leftLabel: 'Data Integrity',
    rightLabel: 'AI Expansion',
    chosenSide: 'left',
    position: 25,
    title: 'AI Expansion vs. Data Integrity',
    summary: 'Slowed predictive rollout to fix validation first.',
    reasoning: 'Momentum wanted to widen predictive coverage fast. We slowed it for validation first. Data accuracy: 70% → 95%.',
  },
]

export default function LatTradeoffSpectrum() {
  const [openId, setOpenId] = useState<string | null>(tradeoffs[0].id)

  return (
    <div style={{ width: '100%', marginTop: '32px', marginBottom: '48px' }}>
      <div style={{
        fontSize: '13px',
        color: '#78716C',
        marginBottom: '28px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(28, 25, 23, 0.12)',
      }}>
        Dot position shows how decisively LAT landed on one side of each call — reasoning is one click away.
      </div>

      {tradeoffs.map((t, i) => {
        const open = openId === t.id
        return (
          <div
            key={t.id}
            style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(28, 25, 23, 0.12)',
              padding: '24px 0',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              fontWeight: 600,
              color: '#78716C',
              marginBottom: '12px',
            }}>
              <span style={{ color: t.chosenSide === 'left' ? '#1C1917' : '#78716C' }}>
                {t.chosenSide === 'left' ? `← ${t.leftLabel}` : t.leftLabel}
              </span>
              <span style={{ color: t.chosenSide === 'right' ? '#1C1917' : '#78716C' }}>
                {t.chosenSide === 'right' ? `${t.rightLabel} →` : t.rightLabel}
              </span>
            </div>

            <div style={{ position: 'relative', height: '3px', background: 'rgba(28, 25, 23, 0.12)', borderRadius: '2px', marginBottom: '14px' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${t.position}%`,
                background: '#FF6B35',
                borderRadius: '2px',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: `${t.position}%`,
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#FF6B35',
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 0 1px #FF6B35',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : t.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenId(open ? null : t.id)
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <div>
                <div style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-fraunces), serif',
                  color: '#1C1917',
                  marginBottom: '6px',
                }}>
                  {t.title}
                </div>
                <div style={{ fontSize: '14px', color: '#57534E', lineHeight: 1.5 }}>
                  {t.summary}
                </div>
              </div>
              <div style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '11px',
                color: '#9CA3AF',
                flexShrink: 0,
                marginTop: '4px',
                whiteSpace: 'nowrap',
              }}>
                {open ? '− why' : '+ why'}
              </div>
            </div>

            <div style={{
              maxHeight: open ? '160px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, margin-top 0.3s ease',
              marginTop: open ? '12px' : '0px',
            }}>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#57534E', margin: 0 }}>
                {t.reasoning}
              </p>
              {t.stat && (
                <span style={{
                  display: 'inline-block',
                  marginTop: '12px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '11.5px',
                  color: '#FF6B35',
                  background: 'rgba(255, 107, 53, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}>
                  {t.stat}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
