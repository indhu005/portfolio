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

interface Truck {
  id: number
  row: number
  col: number
  x: number
  y: number
  targetX: number
  facingRight: boolean
  delivered: boolean
}

const GRID_ROWS = 4
const GRID_COLS_DESKTOP = 8
const GRID_COLS_MOBILE = 6
const ROUND_DURATION = 10 // 10 seconds

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
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION)
  const [gameActive, setGameActive] = useState(true)
  const [gameEnded, setGameEnded] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const animationFrameRef = useRef<number>()
  const truckAnimationRef = useRef<number>()

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

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          setGameEnded(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  // Grow saplings into trees
  useEffect(() => {
    if (!gameActive) return

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
  }, [gameActive])

  // Spawn trucks (they deliver buildings)
  useEffect(() => {
    if (!gameActive || !mounted) return

    const spawnTruck = () => {
      const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
      const cellSize = isMobile ? 48 : 80
      const gap = isMobile ? 8 : 16

      const targetRow = Math.floor(Math.random() * GRID_ROWS)
      const targetCol = Math.floor(Math.random() * cols)
      const fromLeft = Math.random() < 0.5

      const targetX = targetCol * (cellSize + gap)
      const startX = fromLeft ? -100 : (cols * (cellSize + gap) + 100)

      const newTruck: Truck = {
        id: Date.now() + Math.random(),
        row: targetRow,
        col: targetCol,
        x: startX,
        y: targetRow * (cellSize + gap),
        targetX: targetX,
        facingRight: fromLeft,
        delivered: false,
      }

      setTrucks(prev => [...prev, newTruck])
    }

    const interval = setInterval(spawnTruck, 2000) // Truck every 2 seconds
    return () => clearInterval(interval)
  }, [gameActive, mounted, isMobile])

  // Animate trucks
  useEffect(() => {
    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    const cellSize = isMobile ? 48 : 80
    const gap = isMobile ? 8 : 16

    const animate = () => {
      setTrucks(prevTrucks => {
        if (prevTrucks.length === 0) return prevTrucks

        return prevTrucks
          .map(truck => {
            if (truck.delivered) return truck

            const speed = 2
            let newX = truck.x

            // Move toward target
            if (truck.facingRight) {
              newX += speed
              if (newX >= truck.targetX) {
                // Deliver building
                setGrid(prevGrid => {
                  if (prevGrid.length === 0) return prevGrid
                  const newGrid = [...prevGrid]
                  if (newGrid[truck.row]?.[truck.col]?.state === 'empty') {
                    const buildingVariant = Math.floor(Math.random() * 3)
                    newGrid[truck.row][truck.col] = { state: 'building', variant: buildingVariant }
                  }
                  return newGrid
                })
                return { ...truck, delivered: true, x: truck.targetX }
              }
            } else {
              newX -= speed
              if (newX <= truck.targetX) {
                // Deliver building
                setGrid(prevGrid => {
                  if (prevGrid.length === 0) return prevGrid
                  const newGrid = [...prevGrid]
                  if (newGrid[truck.row]?.[truck.col]?.state === 'empty') {
                    const buildingVariant = Math.floor(Math.random() * 3)
                    newGrid[truck.row][truck.col] = { state: 'building', variant: buildingVariant }
                  }
                  return newGrid
                })
                return { ...truck, delivered: true, x: truck.targetX }
              }
            }

            return { ...truck, x: newX }
          })
          .filter(truck => !truck.delivered || Math.abs(truck.x - truck.targetX) < 10)
      })

      truckAnimationRef.current = requestAnimationFrame(animate)
    }

    truckAnimationRef.current = requestAnimationFrame(animate)

    return () => {
      if (truckAnimationRef.current) {
        cancelAnimationFrame(truckAnimationRef.current)
      }
    }
  }, [isMobile])

  // Restart game
  const restartGame = () => {
    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    setTimeLeft(ROUND_DURATION)
    setPlanted(0)
    setGameActive(true)
    setGameEnded(false)
    setGrid(
      Array(GRID_ROWS)
        .fill(null)
        .map(() => Array(cols).fill(null).map(() => ({ state: 'empty' })))
    )
  }

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
    if (!gameActive) return

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
      position: 'relative',
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
      {/* Center header */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        maxWidth: isMobile ? 'calc(100% - 32px)' : '600px',
        zIndex: 50,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <div style={{
          fontSize: isMobile ? '12px' : '18px',
          fontWeight: 600,
          color: '#1C1917',
          marginBottom: isMobile ? '8px' : '16px',
          fontFamily: 'var(--font-fraunces), serif',
          lineHeight: '1.4',
        }}>
          Plant faster than the city can build. Good luck.
        </div>
        {!gameEnded && (
          <div style={{
            fontSize: isMobile ? '13px' : '14px',
            color: '#6B7280',
          }}>
            {isMobile ? 'Tap' : 'Click'} to plant trees.
          </div>
        )}
      </div>

      {/* Mobile/Tablet: Bottom horizontal strip */}
      {isMobile && gameActive && !gameEnded && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid #D1D5DB',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100,
          fontFamily: 'DM Sans, sans-serif',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        }}>
          {/* Time and progress bar */}
          <div style={{ flex: 1, minWidth: '60px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 500,
              color: '#1C1917',
              lineHeight: '1.2',
              marginBottom: '4px',
            }}>
              Time: {timeLeft}s
            </div>
            <div style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(28, 25, 23, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${((ROUND_DURATION - timeLeft) / ROUND_DURATION) * 100}%`,
                backgroundColor: '#7EB3F5',
                transition: 'width 0.3s ease-out',
                borderRadius: '2px',
              }} />
            </div>
          </div>

          {/* Planted count */}
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#1C1917',
            whiteSpace: 'nowrap',
          }}>
            🌱 {planted}
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
              padding: '6px 10px',
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'DM Sans, sans-serif',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1C1917'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.9)'
            }}
          >
            Skip →
          </button>

          {/* Yellow ? button */}
          <button
            onClick={() => {
              setShowLearnMore(true)
              setButtonActive(true)
              setTimeout(() => setButtonActive(false), 300)
            }}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: buttonActive ? '#FF6B35' : '#FFF44F',
              border: 'none',
              borderRadius: '50%',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1C1917',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 3px 10px rgba(255, 244, 79, 0.5), 0 2px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Learn more about the game"
          >
            ?
          </button>
        </div>
      )}

      {/* Desktop: Stats panel on right side */}
      {!isMobile && gameActive && !gameEnded && (
        <div style={{
          position: 'absolute',
          top: '95px',
          right: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid #D1D5DB',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 100,
          fontFamily: 'DM Sans, sans-serif',
          minWidth: '160px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Time with progress bar */}
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#1C1917',
              lineHeight: '1.2',
              marginBottom: '6px',
            }}>
              Time: {timeLeft}s
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(28, 25, 23, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${((ROUND_DURATION - timeLeft) / ROUND_DURATION) * 100}%`,
                backgroundColor: '#7EB3F5',
                transition: 'width 0.3s ease-out',
                borderRadius: '2px',
              }} />
            </div>
          </div>

          {/* Planted count */}
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#1C1917',
            lineHeight: '1.2',
          }}>
            Planted: {planted}
          </div>

          {/* Skip to Work button */}
          <button
            onClick={() => {
              const workSection = document.getElementById('case-studies')
              if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            style={{
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1C1917'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.9)'
            }}
          >
            Skip to Work →
          </button>
        </div>
      )}

      {/* Game container with birds */}
      <div style={{
        position: 'relative',
        width: '100%',
        marginTop: isMobile ? '140px' : '160px',
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
                pointerEvents: 'none',
              }}
            />
          )
        })}
        </div>
      </div>

      {/* End game modal */}
      {gameEnded && (
        <>
          {/* Dark overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 100,
            }}
          />

          {/* End card */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#1C1917',
              borderRadius: '16px',
              padding: isMobile ? '32px 24px' : '40px 48px',
              textAlign: 'center',
              zIndex: 101,
              fontFamily: 'DM Sans, sans-serif',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              minWidth: isMobile ? '80%' : '360px',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#E5E5E5', marginBottom: '20px' }}>
              You planted {planted} {planted === 1 ? 'tree' : 'trees'}!
              {(() => {
                const trees = grid.flat().filter(cell => cell.state === 'tree' || cell.state === 'sapling').length
                const buildings = grid.flat().filter(cell => cell.state === 'building').length
                return (
                  <div style={{ marginTop: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                    Trees: {trees} • Buildings: {buildings}
                  </div>
                )
              })()}
            </div>
            <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '24px' }}>
              {(() => {
                const trees = grid.flat().filter(cell => cell.state === 'tree' || cell.state === 'sapling').length
                const buildings = grid.flat().filter(cell => cell.state === 'building').length
                return trees > buildings
                  ? "Nature wins! Small, deliberate choices — that's the whole job."
                  : "The city was faster this time. Try again!"
              })()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  const workSection = document.getElementById('case-studies')
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#86C232',
                  color: '#1C1917',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                View my case studies
              </button>
              <button
                onClick={restartGame}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#9CA3AF',
                  border: '1px solid #9CA3AF',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(156, 163, 175, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Play again
              </button>
            </div>
          </div>
        </>
      )}

      {/* Learn More Modal */}
      {showLearnMore && (
        <>
          <div
            onClick={() => setShowLearnMore(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1000,
              cursor: 'pointer',
            }}
          />

          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: isMobile ? '32px 24px' : '48px',
              maxWidth: isMobile ? '90%' : '700px',
              width: isMobile ? '90%' : 'auto',
              zIndex: 1001,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setShowLearnMore(false)}
              style={{
                position: 'absolute',
                top: isMobile ? '16px' : '24px',
                right: isMobile ? '16px' : '24px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#6B7280',
                cursor: 'pointer',
                padding: '8px',
                lineHeight: '1',
              }}
            >
              ✕
            </button>

            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 700,
              color: '#1C1917',
              marginBottom: '20px',
              fontFamily: 'var(--font-fraunces), serif',
              lineHeight: '1.2',
            }}>
              About the Game
            </h2>

            <div style={{
              fontSize: isMobile ? '15px' : '16px',
              lineHeight: '1.7',
              color: '#1C1917',
              marginBottom: '32px',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              <p style={{ marginBottom: '16px' }}>
                <strong>Design is about small, deliberate choices under pressure.</strong>
              </p>
              <p style={{ marginBottom: '16px' }}>
                In this game, you're planting trees (sustainable design decisions) while trucks deliver buildings (commercial pressure, technical debt, competing priorities).
              </p>
              <p style={{ marginBottom: '16px' }}>
                You have <strong>10 seconds</strong> to plant as many trees as you can. The trees grow and attract birds. But trucks keep coming with buildings.
              </p>
              <p style={{ marginBottom: '16px', color: '#6B7280' }}>
                <em>It's a metaphor for product design—balancing what's sustainable with what's urgent, making intentional choices before momentum decides for you.</em>
              </p>
            </div>

            <button
              onClick={() => setShowLearnMore(false)}
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: '#1C1917',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Got it, let me play!
            </button>
          </div>
        </>
      )}

    </div>
  )
}
