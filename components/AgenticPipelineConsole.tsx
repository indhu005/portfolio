'use client'
import { useEffect, useState } from 'react'

type RunStatus = 'running' | 'success' | 'failed' | 'queued'

interface Run {
  id: string
  pipeline: string
  status: RunStatus
  startedSecondsAgo: number
  detail: string
}

const STATUS_COLOR: Record<RunStatus, string> = {
  running: '#4A6FD4',
  success: '#22C55E',
  failed: '#FF6B35',
  queued: 'rgba(255, 255, 255, 0.4)',
}

const STATUS_LABEL: Record<RunStatus, string> = {
  running: 'Running',
  success: 'Success',
  failed: 'Failed',
  queued: 'Queued',
}

const INITIAL_RUNS: Run[] = [
  { id: 'r1', pipeline: 'Doc ingest → Extract → Validate → Route', status: 'running', startedSecondsAgo: 14, detail: 'Agent: extraction-v3 · step 3/4' },
  { id: 'r2', pipeline: 'Ticket triage → Classify → Assign', status: 'success', startedSecondsAgo: 142, detail: 'Completed in 8.2s · 0 retries' },
  { id: 'r3', pipeline: 'Doc ingest → Extract → Validate → Route', status: 'failed', startedSecondsAgo: 311, detail: 'Validation step failed · escalated to human review' },
  { id: 'r4', pipeline: 'Content review → Flag → Summarize', status: 'queued', startedSecondsAgo: 0, detail: 'Waiting on rate limit window' },
]

/** Live-ish preview of an internal console for monitoring agent pipeline runs —
 * status, elapsed time on the active run, and a human-escalation trail. Built
 * to demonstrate the actual interface rather than describe it; the bottom
 * portion is blurred since the real pipeline configuration is under NDA. */
export default function AgenticPipelineConsole() {
  const [elapsed, setElapsed] = useState(INITIAL_RUNS[0].startedSecondsAgo)
  const [selectedId, setSelectedId] = useState(INITIAL_RUNS[0].id)

  useEffect(() => {
    const timer = setInterval(() => setElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatElapsed = (base: number, status: RunStatus) => {
    const seconds = status === 'running' ? elapsed : base
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  }

  return (
    <div style={{
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#1C1917',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>
      {/* Console header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#22C55E',
          boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.02em' }}>
          Agentic Pipeline Console
        </span>
        <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.35)', marginLeft: 'auto', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Live
        </span>
      </div>

      {/* Run list */}
      <div style={{ padding: '6px 0' }}>
        {INITIAL_RUNS.map((run) => {
          const selected = run.id === selectedId
          return (
            <button
              key={run.id}
              onClick={() => setSelectedId(run.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 18px',
                border: 'none',
                borderLeft: selected ? '2px solid #4A6FD4' : '2px solid transparent',
                backgroundColor: selected ? 'rgba(74, 111, 212, 0.08)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: STATUS_COLOR[run.status],
                  flexShrink: 0,
                  minWidth: '56px',
                }}>
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: STATUS_COLOR[run.status],
                    animation: run.status === 'running' ? 'apcPulse 1.4s ease-in-out infinite' : 'none',
                  }} />
                  {STATUS_LABEL[run.status]}
                </span>
                <span style={{ fontSize: '12.5px', color: '#E7E5E4', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {run.pipeline}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.35)', flexShrink: 0 }}>
                  {formatElapsed(run.startedSecondsAgo, run.status)}
                </span>
              </div>
              {selected && (
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '6px', paddingLeft: '66px' }}>
                  {run.detail}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Blurred, NDA-restricted lower section */}
      <div style={{ position: 'relative', height: '140px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          padding: '14px 18px',
          filter: 'blur(6px)',
          opacity: 0.6,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '10px' }}>Agent config — extraction-v3</div>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.3)', lineHeight: '1.8' }}>
            model: gpt-5.2-mini · temperature: 0.1<br />
            retry_policy: exponential(3) · escalation_threshold: 0.72<br />
            routes: [crm_sync, finance_queue, human_review]
          </div>
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, rgba(28,25,23,0) 0%, rgba(28,25,23,0.85) 55%)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.75)',
            letterSpacing: '0.02em',
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4 5.5V3.8C4 2.8 4.8 2 5.8 2H6.2C7.2 2 8 2.8 8 3.8V5.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            Restricted — details under NDA
          </div>
        </div>
      </div>

      <style>{`
        @keyframes apcPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
