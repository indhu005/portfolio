'use client'

const stages = [
  { v: 'V1 → V2', title: 'Cut the graphs', img: '/images/lat/dashboard-v2.webp', alt: 'V2 — refined dashboard with half the panels', signal: 'Still no first action — every remaining panel had equal weight.' },
  { v: 'V2 → V3', title: 'Added AI help', img: '/images/lat/dashboard-v3.webp', alt: 'V3 — AI summary and priority list added', signal: 'A summary and 4 dropdowns added more to read, not more direction.' },
  { v: 'V3 → V4', title: 'Queue replaces the grid', img: '/images/lat/dashboard-v4.webp', alt: 'V4 — ranked queue, closer to final', signal: 'Five equal rows — the boiler said "Review," not a decision.' },
  { v: 'V4 → Final', title: 'One decision first', img: '/images/lat/dashboard-v5.webp', alt: 'Final — one decision card plus three tasks', signal: 'Cost + date framing worked — everything else reads as secondary.' },
]

export default function LatDashboardVersions() {
  const openLightbox = (src: string, alt: string) => {
    const img = document.getElementById('lat-lightbox-img') as HTMLImageElement | null
    const box = document.getElementById('lat-lightbox')
    if (img && box) {
      img.src = src
      img.alt = alt
      box.style.display = 'flex'
    }
  }

  const closeLightbox = () => {
    const box = document.getElementById('lat-lightbox')
    if (box) box.style.display = 'none'
  }

  return (
    <>
      <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {stages.map((s) => (
          <div key={s.v} className="cs-stage">
            <div className="cs-stage-header"><span>{s.v}</span></div>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
              <img
                loading="lazy"
                decoding="async"
                src={s.img}
                alt={s.alt}
                style={{ width: '460px', flex: '0 0 460px', margin: 0, borderRadius: '10px', boxShadow: '0 10px 24px rgba(28, 25, 23, 0.1)', border: '1px solid #D6D3D1', padding: '20px', backgroundColor: '#FFFFFF', cursor: 'zoom-in' }}
                onClick={() => openLightbox(s.img, s.alt)}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#1C1917' }}>{s.title}</p>
                <p className="cs-changelog-signal" style={{ marginTop: '8px' }}>{s.signal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        id="lat-lightbox"
        className="cs-lightbox"
        style={{ display: 'none' }}
        onClick={closeLightbox}
      >
        <button type="button" className="cs-lightbox-close" aria-label="Close" onClick={(e) => { e.stopPropagation(); closeLightbox() }}>✕</button>
        <img id="lat-lightbox-img" src="" alt="" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  )
}
