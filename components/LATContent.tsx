'use client'

import VideoPlayer from './VideoPlayer'

export default function LATContent() {
  return (
    <>
      <div style={{ marginBottom: '48px' }}>
        <VideoPlayer src="/videos/lat/Flow%2001.mp4" id="lat-video-1" />
      </div>

      <p>Universities manage billions in infrastructure with fragmented tools. A technician underground can't access repair history. A project manager stitches together spreadsheets, vendor calls, and invoices before capital planning meetings. Leadership makes decisions on partial data.</p>

      <p style={{ marginTop: '28px' }}>Without a unified system, everyone operates in their own flow with no common path:</p>

      <div style={{ marginTop: '32px', marginBottom: '48px' }}>
        <VideoPlayer src="/videos/lat/Flow%2003.mp4" id="lat-video-3" />
      </div>
    </>
  )
}
