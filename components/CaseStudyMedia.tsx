'use client'

interface CaseStudyMediaProps {
  type: 'image' | 'video' | 'figma'
  src: string
  alt?: string
  aspectRatio?: string
  caption?: string
}

export default function CaseStudyMedia({
  type,
  src,
  alt = '',
  aspectRatio = '16/9',
  caption
}: CaseStudyMediaProps) {
  if (type === 'image') {
    return (
      <div style={{ width: '100%' }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
          }}
        />
        {caption && (
          <div style={{
            fontSize: '14px',
            color: '#9CA3AF',
            marginTop: '12px',
            textAlign: 'center',
          }}>
            {caption}
          </div>
        )}
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div style={{ width: '100%' }}>
        <video
          src={src}
          controls
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
          }}
        />
        {caption && (
          <div style={{
            fontSize: '14px',
            color: '#9CA3AF',
            marginTop: '12px',
            textAlign: 'center',
          }}>
            {caption}
          </div>
        )}
      </div>
    )
  }

  if (type === 'figma') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          width: '100%',
          aspectRatio: aspectRatio,
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <iframe
            src={src}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allowFullScreen
          />
        </div>
        {caption && (
          <div style={{
            fontSize: '14px',
            color: '#9CA3AF',
            marginTop: '12px',
            textAlign: 'center',
          }}>
            {caption}
          </div>
        )}
      </div>
    )
  }

  return null
}
