'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  src: string
  id: string
}

export default function VideoPlayer({ src, id }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100
      setProgress(progress)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '16px' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          backgroundColor: '#000',
        }}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            border: 'none',
            outline: 'none',
            verticalAlign: 'middle',
          }}
        >
          <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={togglePlayPause}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Play/Pause"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        <div
          onClick={handleSeek}
          style={{
            flex: 1,
            height: '4px',
            backgroundColor: '#E5E7EB',
            borderRadius: '2px',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: '#1C1917',
              borderRadius: '2px',
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
