'use client'

import VideoPlayer from './VideoPlayer'

export default function LATContent() {
  return (
    <>
      <img
        src="/videos/lat/Flow-01.gif"
        alt="Flow 01"
        style={{
          width: '100%',
          borderRadius: '8px',
          display: 'block',
          marginBottom: '32px',
          border: 'none',
          outline: 'none',
          verticalAlign: 'middle'
        }}
      />

      <p>Universities manage billions in infrastructure with fragmented tools. A technician underground can't access repair history. A project manager stitches together spreadsheets, vendor calls, and invoices before capital planning meetings. Leadership makes decisions on partial data.</p>

      <p style={{ marginTop: '28px' }}>Without a unified system, everyone operates in their own flow with no common path:</p>

      <div style={{ marginTop: '32px', marginBottom: '48px' }}>
        <VideoPlayer src="/videos/lat/Flow%2003%20compressed.webm" id="lat-video-3" />
      </div>
    </>
  )
}
