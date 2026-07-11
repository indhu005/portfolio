'use client'
import { useState, useEffect, useRef } from 'react'

type CellState = 'empty' | 'sapling' | 'tree' | 'building'

interface Cell {
  state: CellState
  variant?: number
  plantedAt?: number
}

interface Truck {
  id: number
  row: number
  col: number
  x: number
  y: number
  facingRight: boolean
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
  const [trucks, setTrucks] = useState<Truck[]>([])
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

  // Spawn trucks periodically
  useEffect(() => {
    if (!mounted || grid.length === 0) return

    const spawnTruck = () => {
      const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
      const targetRow = Math.floor(Math.random() * GRID_ROWS)
      const targetCol = Math.floor(Math.random() * cols)
      const fromLeft = Math.random() < 0.5
      const cellSize = isMobile ? 48 : 80
      const gap = isMobile ? 8 : 16

      const newTruck: Truck = {
        id: Date.now() + Math.random(),
        row: targetRow,
        col: targetCol,
        x: fromLeft ? -100 : (cols * (cellSize + gap) + 100),
        y: targetRow * (cellSize + gap),
        facingRight: fromLeft,
      }

      setTrucks(prev => [...prev, newTruck])
    }

    const interval = setInterval(spawnTruck, 2000) // Spawn every 2 seconds
    return () => clearInterval(interval)
  }, [mounted, grid, isMobile])

  // Animate trucks with requestAnimationFrame
  useEffect(() => {
    if (trucks.length === 0) return

    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    const cellSize = isMobile ? 48 : 80
    const gap = isMobile ? 8 : 16

    const animate = () => {
      setTrucks(prevTrucks => {
        return prevTrucks
          .map(truck => {
            const targetX = truck.col * (cellSize + gap)
            const speed = 3
            let newX = truck.x

            if (truck.facingRight) {
              newX += speed
              if (newX >= targetX) {
                // Reached target, drop building
                setGrid(prevGrid => {
                  const newGrid = [...prevGrid]
                  if (newGrid[truck.row]?.[truck.col]) {
                    const buildingVariant = Math.floor(Math.random() * 3)
                    newGrid[truck.row][truck.col] = { state: 'building', variant: buildingVariant }
                  }
                  return newGrid
                })
                return null // Remove truck
              }
            } else {
              newX -= speed
              if (newX <= targetX) {
                // Reached target, drop building
                setGrid(prevGrid => {
                  const newGrid = [...prevGrid]
                  if (newGrid[truck.row]?.[truck.col]) {
                    const buildingVariant = Math.floor(Math.random() * 3)
                    newGrid[truck.row][truck.col] = { state: 'building', variant: buildingVariant }
                  }
                  return newGrid
                })
                return null // Remove truck
              }
            }

            return { ...truck, x: newX }
          })
          .filter(truck => truck !== null) as Truck[]
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [trucks.length > 0, isMobile, grid])

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
              {cell.state === 'building' && <BuildingIcon variant={cell.variant || 0} size={isMobile ? 36 : 60} />}
            </div>
          ))
        )}

        {/* Trucks overlay */}
        {trucks.map(truck => {
          const truckWidth = isMobile ? 36 : 60
          const truckHeight = isMobile ? 22 : 36

          return (
            <img
              key={truck.id}
              src="/images/home/truck.svg"
              alt="truck"
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                transform: `translate(${truck.x}px, ${truck.y}px) scaleX(${truck.facingRight ? 1 : -1})`,
                width: `${truckWidth}px`,
                height: `${truckHeight}px`,
                willChange: 'transform',
                zIndex: 20,
              }}
            />
          )
        })}
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
