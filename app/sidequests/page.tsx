'use client'
import TopBar from '@/components/TopBar'
import LandingGameSimple from '@/components/LandingGameSimple'
import { useState, useEffect } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export default function SideQuests() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1240px)')
  const isWideDesktop = useMediaQuery('(min-width: 1440px)')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F3' }}>
      <TopBar />

      <div
        style={{
          padding: isMobile ? '96px 20px 80px' : isTablet ? '110px 32px 100px' : '110px 48px 100px',
          maxWidth: isWideDesktop ? '1100px' : '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <LandingGameSimple
          edgeLeft={isMobile ? 20 : isTablet ? 32 : isWideDesktop ? 56 : 36}
          edgeRight={isMobile ? 20 : isTablet ? 32 : isWideDesktop ? 64 : 40}
          edgeTop={0}
        />
      </div>
    </div>
  )
}
