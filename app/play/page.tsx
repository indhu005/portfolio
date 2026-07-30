'use client'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

const projects = [
  {
    title: 'The Color Game',
    description: 'An interactive experiment exploring color theory and perception. Built to understand how context changes our perception of hue and saturation.',
    year: '2024',
    tags: ['Interactive', 'Web']
  },
  {
    title: 'Typography Playground',
    description: 'A tool for experimenting with type scales, rhythm, and hierarchy. Created while learning about vertical rhythm in web design.',
    year: '2024',
    tags: ['Tool', 'Typography']
  },
  {
    title: 'Generative Patterns',
    description: 'Algorithmic pattern generation using SVG and JavaScript. Inspired by Islamic geometric art and computational design.',
    year: '2023',
    tags: ['Generative', 'Art']
  },
  {
    title: 'Sound Visualizer',
    description: 'Real-time audio visualization using Web Audio API. An exploration of synesthesia and multi-sensory design.',
    year: '2024',
    tags: ['Audio', 'Interactive']
  },
  {
    title: 'Micro Interactions',
    description: 'A collection of delightful UI animations and transitions. Small details that make interfaces feel alive and responsive.',
    year: '2023',
    tags: ['Animation', 'UI']
  },
  {
    title: 'Data Stories',
    description: 'Narrative-driven data visualizations. Experiments in making complex information accessible and compelling.',
    year: '2024',
    tags: ['Data Viz', 'Story']
  },
]

export default function Play() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="play-shell">
      {/* SIDEBAR - hidden on mobile/tablet via CSS, not JS, so there's no post-mount layout flip */}
      <div className="play-sidebar-desktop">
        <Sidebar />
      </div>

      {/* MOBILE MENU BUTTON - hidden on desktop via CSS */}
      <button
        className="play-mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
      </button>

      {/* MOBILE/TABLET OVERLAY MENU */}
      {mobileMenuOpen && (
        <div
          className="play-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Sidebar />
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="play-right">
        {/* CONTENT AREA */}
        <div data-scroll-container className="play-content">
          {/* Container for everything - single alignment grid */}
          <div className="play-container">
            {/* Header */}
            <div className="play-header">
              <h1 className="play-title">Play</h1>
              <p className="play-subtitle">
                Side projects and experiments. Some finished, some in progress, all made while learning something new or just having fun.
              </p>
            </div>

            {/* Projects - New Yorker style layout */}
            <div style={{ position: 'relative' }}>
              {projects.map((project, index) => {
                // Alternate layout: even indices = image left, odd = image right
                const imageOnLeft = index % 2 === 0

                return (
                  <div key={index} className="play-project-row">
                    {/* Text - always on left, aligned with "Play" */}
                    <div className="play-project-text">
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#6B7280',
                              padding: '4px 10px',
                              backgroundColor: '#F3F4F6',
                              borderRadius: '4px',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#6B7280',
                          padding: '4px 0',
                        }}>
                          {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="play-project-title">{project.title}</h2>

                      {/* Description */}
                      <p className="play-project-desc">{project.description}</p>
                    </div>

                    {/* Image - alternates left/right on desktop, always on top on mobile */}
                    <div className="play-project-image-col" style={{ order: imageOnLeft ? 1 : 2 }}>
                      <div className="play-project-image-box">
                        Image placeholder
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
