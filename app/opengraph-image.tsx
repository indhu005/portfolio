import { ImageResponse } from 'next/og'

export const alt = 'Indhu Venkatachalam — Senior Product Designer, AI Products & 0→1'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#000000',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid #7C9BF0',
              color: '#7C9BF0',
              fontSize: '28px',
            }}
          >
            Seattle
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontSize: '28px',
            }}
          >
            Senior Product Designer
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '88px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Indhu Venkatachalam
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '36px',
            color: '#7C9BF0',
            marginTop: '28px',
          }}
        >
          0→1, AI/ML &amp; Trustworthy Systems
        </div>
      </div>
    ),
    { ...size }
  )
}
