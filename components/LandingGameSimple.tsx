'use client'
import { useState, useEffect, useRef } from 'react'

type CellState = 'empty' | 'sapling' | 'tree' | 'building'

interface Cell {
  state: CellState
  variant?: number
  plantedAt?: number
}

interface Bird {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

const GRID_ROWS = 4
const GRID_COLS_DESKTOP = 8
const GRID_COLS_MOBILE = 6

// Simple tree component - full grown tree
const TreeIcon = ({ size = 60, variant = 0 }: { size?: number; variant?: number }) => {
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  return (
    <img
      src={`/images/home/${treeFile}`}
      alt="tree"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        objectFit: 'contain',
        zIndex: 5,
      }}
    />
  )
}

// Sapling component - smaller tree with grow animation
const SaplingIcon = ({ size = 40, variant = 0 }: { size?: number; variant?: number }) => {
  const [isGrowing, setIsGrowing] = useState(true)
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  useEffect(() => {
    const timer = setTimeout(() => setIsGrowing(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <img
      src={`/images/home/${treeFile}`}
      alt="sapling"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        bottom: '20%',
        left: '50%',
        transform: `translateX(-50%) scale(${isGrowing ? 0.3 : 1})`,
        objectFit: 'contain',
        opacity: 0.7,
        zIndex: 5,
        transition: 'transform 0.4s ease-out',
      }}
    />
  )
}

// Building component
const BuildingIcon = ({ size = 60, variant = 0 }: { size?: number; variant?: number }) => {
  const buildingVariants = ['building 01.svg', 'building 02.svg', 'building 03.svg']
  const buildingFile = buildingVariants[variant % 3]

  return (
    <img
      src={`/images/home/${buildingFile}`}
      alt="building"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        objectFit: 'contain',
        zIndex: 5,
      }}
    />
  )
}

// Simple ground marker component
const GroundMarker = ({ size = 60 }: { size?: number }) => {
  const ellipseWidth = size * 0.7 * 0.2
  const ellipseHeight = size * 0.3 * 0.2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <ellipse
        cx={size / 2}
        cy={size * 0.8}
        rx={ellipseWidth / 2}
        ry={ellipseHeight / 2}
        fill="#D1D1D1"
        opacity="0.4"
      />
    </svg>
  )
}

export default function LandingGameSimple() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [grid, setGrid] = useState<Cell[][]>([])
  const [planted, setPlanted] = useState(0)
  const [birds, setBirds] = useState<Bird[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize grid
  useEffect(() => {
    if (!mounted) return
    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    setGrid(
      Array(GRID_ROWS)
        .fill(null)
        .map(() => Array(cols).fill(null).map(() => ({ state: 'empty' })))
    )
  }, [mounted, isMobile])

  // Grow saplings into trees
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prevGrid =>
        prevGrid.map(row =>
          row.map(cell => {
            if (cell.state === 'sapling' && cell.plantedAt) {
              const elapsed = Date.now() - cell.plantedAt
              if (elapsed >= 1000) { // 1 second growth time
                return { ...cell, state: 'tree' }
              }
            }
            return cell
          })
        )
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Initialize birds
  useEffect(() => {
    if (!mounted) return

    const initialBirds = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 10, // 10-70%
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
    }))

    setBirds(initialBirds)
  }, [mounted])

  // Animate birds
  useEffect(() => {
    if (birds.length === 0) return

    const animate = () => {
      setBirds(prev =>
        prev
          .map(bird => ({
            ...bird,
            x: bird.x + bird.vx,
            y: bird.y + bird.vy,
            vx: bird.vx + (Math.random() - 0.5) * 0.05,
            vy: bird.vy + (Math.random() - 0.5) * 0.05,
          }))
          .filter(bird => bird.x > -10 && bird.x < 110 && bird.y > 0 && bird.y < 100)
      )

      // Scale bird count with tree count
      const treeCount = grid.flat().filter(cell => cell.state === 'tree').length
      const targetBirds = Math.min(Math.floor(treeCount / 3) + 2, 12)

      setBirds(prev => {
        if (prev.length < targetBirds && Math.random() < 0.1) {
          return [
            ...prev,
            {
              id: Date.now(),
              x: Math.random() < 0.5 ? -5 : 105,
              y: Math.random() * 60 + 10,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.2,
            },
          ]
        }
        return prev
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [birds.length, grid])

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
        Loading...
      </div>
    )
  }

  const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
  const cellSize = isMobile ? 48 : 80
  const gap = isMobile ? 8 : 16

  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row]?.[col]
    if (cell && cell.state === 'empty') {
      setPlanted(prev => prev + 1)
      const treeVariant = Math.floor(Math.random() * 5)
      setGrid(prevGrid => {
        const newGrid = [...prevGrid]
        newGrid[row][col] = { state: 'sapling', variant: treeVariant, plantedAt: Date.now() }
        return newGrid
      })
    }
  }

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      padding: isMobile ? '16px' : '20px',
      paddingBottom: isMobile ? '90px' : '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '40px' : '60px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <div style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 600,
          color: '#1C1917',
          marginBottom: '12px',
          fontFamily: 'var(--font-fraunces), serif',
        }}>
          Plant faster than the city can build. Good luck.
        </div>
        <div style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#6B7280',
        }}>
          {isMobile ? 'Tap' : 'Click'} to plant trees.
        </div>
      </div>

      {/* Planted count */}
      <div style={{
        fontSize: '16px',
        fontWeight: 700,
        color: '#1C1917',
        marginBottom: '20px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        🌱 Planted: {planted}
      </div>

      {/* Game container with birds */}
      <div style={{
        position: 'relative',
        width: '100%',
      }}>
        {/* Birds layer */}
        {birds.map(bird => (
          <div
            key={bird.id}
            style={{
              position: 'absolute',
              left: `${bird.x}%`,
              top: `${bird.y}%`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <img
              src="/images/home/Birds.svg"
              alt="bird"
              style={{
                width: '24px',
                height: '18px',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}

        {/* Grid */}
        <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: `${gap}px`,
        zIndex: 10,
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                position: 'relative',
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: cell.state === 'empty' ? 'pointer' : 'default',
                borderRadius: '4px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                if (cell.state === 'empty') {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {cell.state === 'empty' && <GroundMarker size={cellSize} />}
              {cell.state === 'sapling' && <SaplingIcon variant={cell.variant || 0} size={isMobile ? 24 : 40} />}
              {cell.state === 'tree' && <TreeIcon variant={cell.variant || 0} size={isMobile ? 36 : 60} />}
            </div>
          ))
        )}
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          const workSection = document.getElementById('case-studies')
          if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        style={{
          marginTop: '40px',
          padding: '12px 24px',
          backgroundColor: 'rgba(28, 25, 23, 0.9)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontFamily: 'DM Sans, sans-serif',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1C1917'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.9)'}
      >
        Skip to Work →
      </button>
    </div>
  )
}
