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
  variant: number // 1, 2, or 3 for different bird SVGs
  onTree?: boolean // true if sitting on a tree
  treeRow?: number // which tree row
  treeCol?: number // which tree column
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

interface Smoke {
  id: number
  x: number
  y: number
  facingRight: boolean
}

const GRID_ROWS = 4
const GRID_COLS_DESKTOP = 8
const GRID_COLS_MOBILE = 6
const ROUND_DURATION = 10 // 10 seconds

// Simple tree component - full grown tree with sway animation
const TreeIcon = ({ size = 60, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const [isSwaying, setIsSwaying] = useState(false)
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  // Random sway animation
  useEffect(() => {
    const randomDelay = Math.random() * 5000
    const swayDuration = 800

    const startSwaying = () => {
      const shouldSway = Math.random() < 0.3 // 30% chance
      if (shouldSway) {
        setIsSwaying(true)
        setTimeout(() => setIsSwaying(false), swayDuration)
      }
      setTimeout(startSwaying, 3000 + Math.random() * 4000)
    }

    const initialTimeout = setTimeout(startSwaying, randomDelay)
    return () => clearTimeout(initialTimeout)
  }, [])

  return (
    <>
      {/* Shadow - only during daytime */}
      {isDaytime && (
        <div
          style={{
            position: 'absolute',
            width: size * 0.6,
            height: size * 0.15,
            bottom: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%)',
            zIndex: 2,
            filter: 'blur(2px)',
          }}
        />
      )}
      {/* Tree */}
      <img
        src={`/images/home/${treeFile}`}
        alt="tree"
        style={{
          position: 'absolute',
          width: size,
          height: size,
          bottom: '20%',
          left: '50%',
          transform: isSwaying ? 'translateX(-50%) rotate(3deg)' : 'translateX(-50%)',
          objectFit: 'contain',
          zIndex: 5,
          transition: 'transform 0.4s ease-in-out',
        }}
      />
    </>
  )
}

// Sapling component - smaller tree with grow animation
const SaplingIcon = ({ size = 40, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const [isGrowing, setIsGrowing] = useState(true)
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  useEffect(() => {
    const timer = setTimeout(() => setIsGrowing(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Shadow - only during daytime */}
      {isDaytime && (
        <div
          style={{
            position: 'absolute',
            width: size * 0.5,
            height: size * 0.12,
            bottom: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, transparent 70%)',
            zIndex: 2,
            filter: 'blur(1.5px)',
          }}
        />
      )}
      {/* Sapling */}
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
    </>
  )
}

// Building component with fast pop-in animation
const BuildingIcon = ({ size = 60, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const [isPopping, setIsPopping] = useState(true)
  const buildingVariants = ['building 01.svg', 'building 02.svg', 'building 03.svg']
  const buildingFile = buildingVariants[variant % 3]

  useEffect(() => {
    const timer = setTimeout(() => setIsPopping(false), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Shadow - only during daytime */}
      {isDaytime && (
        <div
          style={{
            position: 'absolute',
            width: size * 0.7,
            height: size * 0.18,
            bottom: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.35) 0%, transparent 70%)',
            zIndex: 2,
            filter: 'blur(2.5px)',
          }}
        />
      )}
      {/* Building */}
      <img
        src={`/images/home/${buildingFile}`}
        alt="building"
        style={{
          position: 'absolute',
          width: size,
          height: size,
          bottom: '20%',
          left: '50%',
          transform: `translateX(-50%) scale(${isPopping ? 0.3 : 1})`,
          objectFit: 'contain',
          zIndex: 5,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    />
    </>
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
  const [smokes, setSmokes] = useState<Smoke[]>([])
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION)
  const [gameActive, setGameActive] = useState(true)
  const [gameEnded, setGameEnded] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [localRegion, setLocalRegion] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [playCount, setPlayCount] = useState(0) // Track replays for difficulty
  const [isDaytime, setIsDaytime] = useState(true) // Track if it's day or night
  const animationFrameRef = useRef<number>()
  const truckAnimationRef = useRef<number>()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get local time and region
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hour = now.getHours()

      // Daytime: 6am - 6pm (6-18), Nighttime: 6pm - 6am
      setIsDaytime(hour >= 6 && hour < 18)

      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const parts = timezone.split('/')
      const region = parts[parts.length - 1].replace('_', ' ')
      setLocalRegion(region)
    } catch {
      setLocalRegion('Unknown')
    }

    return () => clearInterval(interval)
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
          // Only show end modal if user interacted, otherwise silently reset
          if (hasInteracted) {
            setGameEnded(true)
          } else {
            // Silent reset - restart the game
            setTimeout(() => {
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
              setTrucks([])
              setSmokes([])
            }, 100)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, hasInteracted, isMobile])

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

      // Spawn smoke 2 seconds before truck
      const smokeId = Date.now() + Math.random()
      const newSmoke: Smoke = {
        id: smokeId,
        x: fromLeft ? 0 : 100,
        y: targetRow * (cellSize + gap) + (cellSize / 2),
        facingRight: fromLeft,
      }

      setSmokes(prev => [...prev, newSmoke])

      // Remove smoke and spawn truck after 2 seconds
      setTimeout(() => {
        setSmokes(prev => prev.filter(s => s.id !== smokeId))

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
      }, 2000)
    }

    // Adaptive difficulty: easier first time, harder on replay
    const spawnInterval = playCount === 0 ? 1200 : 850 // 1.2s first time, 0.85s on replay
    const interval = setInterval(spawnTruck, spawnInterval)
    return () => clearInterval(interval)
  }, [gameActive, mounted, isMobile, playCount])

  // Animate trucks
  useEffect(() => {
    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    const cellSize = isMobile ? 48 : 80
    const gap = isMobile ? 8 : 16
    const gridWidth = cols * (cellSize + gap)

    const animate = () => {
      setTrucks(prevTrucks => {
        if (prevTrucks.length === 0) return prevTrucks

        return prevTrucks
          .map(truck => {
            const speed = playCount === 0 ? 4 : 5.5 // Easier first time, harder on replay
            let newX = truck.x
            let newDelivered = truck.delivered

            // Move toward target, deliver, then exit
            if (truck.facingRight) {
              newX += speed

              // Check if reached target and not yet delivered
              if (!truck.delivered && newX >= truck.targetX) {
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
                newDelivered = true
              }

              // Remove if off screen right
              if (newX > gridWidth + 100) return null
            } else {
              newX -= speed

              // Check if reached target and not yet delivered
              if (!truck.delivered && newX <= truck.targetX) {
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
                newDelivered = true
              }

              // Remove if off screen left
              if (newX < -100) return null
            }

            return { ...truck, x: newX, delivered: newDelivered }
          })
          .filter(truck => truck !== null) as Truck[]
      })

      truckAnimationRef.current = requestAnimationFrame(animate)
    }

    truckAnimationRef.current = requestAnimationFrame(animate)

    return () => {
      if (truckAnimationRef.current) {
        cancelAnimationFrame(truckAnimationRef.current)
      }
    }
  }, [isMobile, playCount])

  // Restart game
  const restartGame = () => {
    const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
    setTimeLeft(ROUND_DURATION)
    setPlanted(0)
    setGameActive(true)
    setGameEnded(false)
    setHasInteracted(false) // Reset interaction tracking
    setPlayCount(prev => prev + 1) // Increment for harder difficulty
    setGrid(
      Array(GRID_ROWS)
        .fill(null)
        .map(() => Array(cols).fill(null).map(() => ({ state: 'empty' })))
    )
    setTrucks([]) // Clear trucks on restart
    setSmokes([]) // Clear smokes on restart
  }

  // Initialize birds - mix of flying and sitting on trees
  useEffect(() => {
    if (!mounted) return

    const initialBirds = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 10, // 10-70%
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      variant: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
      onTree: false,
    }))

    setBirds(initialBirds)
  }, [mounted])

  // Animate birds and land some on trees
  useEffect(() => {
    if (birds.length === 0) return

    const animate = () => {
      setBirds(prev =>
        prev
          .map(bird => {
            // Birds sitting on trees don't move
            if (bird.onTree) {
              return bird
            }

            return {
              ...bird,
              x: bird.x + bird.vx,
              y: bird.y + bird.vy,
              vx: bird.vx + (Math.random() - 0.5) * 0.05,
              vy: bird.vy + (Math.random() - 0.5) * 0.05,
            }
          })
          .filter(bird => bird.onTree || (bird.x > -10 && bird.x < 110 && bird.y > 0 && bird.y < 100))
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
              variant: Math.floor(Math.random() * 3) + 1,
              onTree: false,
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

  // Land birds on trees randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const trees = grid.flat().reduce<Array<{row: number, col: number}>>((acc, cell, index) => {
        if (cell.state === 'tree') {
          const cols = isMobile ? GRID_COLS_MOBILE : GRID_COLS_DESKTOP
          acc.push({ row: Math.floor(index / cols), col: index % cols })
        }
        return acc
      }, [])

      if (trees.length > 0 && Math.random() < 0.3) {
        const tree = trees[Math.floor(Math.random() * trees.length)]
        const flyingBirds = birds.filter(b => !b.onTree)

        if (flyingBirds.length > 0) {
          const birdToLand = flyingBirds[Math.floor(Math.random() * flyingBirds.length)]

          setBirds(prev => prev.map(b =>
            b.id === birdToLand.id
              ? { ...b, onTree: true, treeRow: tree.row, treeCol: tree.col }
              : b
          ))
        }
      }

      // Sometimes make sitting birds fly away
      const sittingBirds = birds.filter(b => b.onTree)
      if (sittingBirds.length > 0 && Math.random() < 0.2) {
        const birdToFly = sittingBirds[Math.floor(Math.random() * sittingBirds.length)]

        setBirds(prev => prev.map(b =>
          b.id === birdToFly.id
            ? {
                ...b,
                onTree: false,
                treeRow: undefined,
                treeCol: undefined,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.3, // Fly upward
              }
            : b
        ))
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [birds, grid, isMobile])

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
      setHasInteracted(true) // Mark that user has interacted
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
        {/* Location and time */}
        <div style={{
          fontSize: isMobile ? '12px' : '12px',
          color: '#6B7280',
          marginBottom: isMobile ? '8px' : '16px',
          lineHeight: '1.5',
        }}>
          {localRegion} • {localTime}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: 600,
          color: '#1C1917',
          marginBottom: isMobile ? '8px' : '12px',
          fontFamily: 'var(--font-fraunces), serif',
          lineHeight: '1.4',
        }}>
          Plant faster than the city can build. Good luck.
        </div>

        {/* Explanation - desktop only */}
        {!isMobile && (
          <div style={{
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '12px',
            lineHeight: '1.5',
          }}>
            Trucks deliver buildings to empty spaces. Plant trees to keep the ecosystem alive.
          </div>
        )}

        {/* Instruction */}
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

      {/* Desktop: Yellow ? button - bottom right */}
      {!isMobile && (
        <button
          onClick={() => {
            setShowLearnMore(true)
            setButtonActive(true)
            setTimeout(() => setButtonActive(false), 300)
          }}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '40px',
            width: '64px',
            height: '64px',
            backgroundColor: buttonActive ? '#FF6B35' : '#FFF44F',
            border: 'none',
            borderRadius: '50%',
            fontSize: '24px',
            fontWeight: 700,
            color: '#1C1917',
            cursor: 'pointer',
            zIndex: 100,
            fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: buttonActive
              ? '0 6px 20px rgba(255, 107, 53, 0.5), 0 3px 10px rgba(0, 0, 0, 0.15)'
              : '0 4px 16px rgba(255, 244, 79, 0.5), 0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            if (!buttonActive) {
              e.currentTarget.style.backgroundColor = '#FFF76B'
              e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 244, 79, 0.65), 0 4px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
          onMouseLeave={(e) => {
            if (!buttonActive) {
              e.currentTarget.style.backgroundColor = '#FFF44F'
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 244, 79, 0.5), 0 2px 8px rgba(0, 0, 0, 0.1)'
            }
          }}
          aria-label="Learn more about the game"
          title="Learn more about the game"
        >
          ?
        </button>
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
        display: 'flex',
        justifyContent: 'center',
      }}>
        {/* Sun/Moon - top left corner (opposite of timer) */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: isMobile ? '20px' : '40px',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <img
            src={isDaytime ? '/images/home/sun.svg' : '/images/home/moon.svg'}
            alt={isDaytime ? 'sun' : 'moon'}
            style={{
              width: isMobile ? '20px' : '28px',
              height: isMobile ? '20px' : '28px',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Birds layer */}
        {birds.map(bird => {
          const cellSize = isMobile ? 48 : 80
          const gap = isMobile ? 8 : 16

          // Calculate position for birds sitting on trees
          let positionStyle = {}
          if (bird.onTree && bird.treeRow !== undefined && bird.treeCol !== undefined) {
            const treeX = bird.treeCol * (cellSize + gap) + cellSize / 2
            const treeY = bird.treeRow * (cellSize + gap) + cellSize * 0.2 // Sit near top of tree

            positionStyle = {
              left: `${treeX}px`,
              top: `${treeY}px`,
              transform: 'translate(-50%, -50%)',
            }
          } else {
            positionStyle = {
              left: `${bird.x}%`,
              top: `${bird.y}%`,
            }
          }

          const birdVariants = ['Birds.svg', 'birds 02.svg', 'birds 03.svg']
          const birdSrc = `/images/home/${birdVariants[(bird.variant - 1) % 3]}`

          return (
            <div
              key={bird.id}
              style={{
                position: 'absolute',
                ...positionStyle,
                pointerEvents: 'none',
                zIndex: bird.onTree ? 25 : 1, // Higher z-index when on tree
                transition: bird.onTree ? 'all 0.5s ease-out' : 'none',
              }}
            >
              <img
                src={birdSrc}
                alt="bird"
                style={{
                  width: '24px',
                  height: '18px',
                  objectFit: 'contain',
                }}
              />
            </div>
          )
        })}

        {/* Grid */}
        <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: `${gap}px`,
        zIndex: 10,
        marginLeft: isMobile ? 'auto' : '90px',
        marginRight: isMobile ? 'auto' : 'auto',
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
              {cell.state === 'sapling' && <SaplingIcon variant={cell.variant || 0} size={isMobile ? 24 : 40} isDaytime={isDaytime} />}
              {cell.state === 'tree' && <TreeIcon variant={cell.variant || 0} size={isMobile ? 36 : 60} isDaytime={isDaytime} />}
              {cell.state === 'building' && <BuildingIcon variant={cell.variant || 0} size={isMobile ? 36 : 60} isDaytime={isDaytime} />}
            </div>
          ))
        )}

        {/* Smoke overlay - appears before trucks */}
        {smokes.map(smoke => {
          const smokeSize = isMobile ? 20 : 30

          return (
            <img
              key={smoke.id}
              src="/images/home/smoke.svg"
              alt="smoke"
              style={{
                position: 'absolute',
                left: smoke.facingRight ? '0px' : 'auto',
                right: smoke.facingRight ? 'auto' : '0px',
                top: '0',
                transform: `translateY(${smoke.y}px)`,
                width: `${smokeSize}px`,
                height: `${smokeSize}px`,
                zIndex: 15,
                pointerEvents: 'none',
                opacity: 0.6,
                animation: 'smokeFade 2s ease-in-out',
              }}
            />
          )
        })}

        {/* Trucks overlay */}
        {trucks.map(truck => {
          const truckWidth = isMobile ? 36 : 60
          const truckHeight = isMobile ? 22 : 36

          return (
            <img
              key={truck.id}
              src="/images/home/truck.svg?cache=updated"
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
              position: 'absolute',
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
              position: 'absolute',
              top: '50%',
              left: isMobile ? '16px' : '50%',
              right: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'translateY(-50%)' : 'translate(-50%, -50%)',
              backgroundColor: '#1C1917',
              borderRadius: '16px',
              padding: isMobile ? '32px 24px' : '40px 48px',
              textAlign: 'center',
              zIndex: 101,
              fontFamily: 'DM Sans, sans-serif',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              minWidth: isMobile ? 'auto' : '360px',
              maxWidth: isMobile ? '100%' : 'auto',
            }}
          >
            {/* Stats line */}
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#E5E5E5', lineHeight: '1.5', marginBottom: '20px' }}>
              You planted {planted} {planted === 1 ? 'tree' : 'trees'}. {(() => {
                const trees = grid.flat().filter(cell => cell.state === 'tree' || cell.state === 'sapling').length
                return `${trees} ${trees === 1 ? 'is' : 'are'} still standing.`
              })()}
            </div>

            {/* Bridge line - design philosophy */}
            <div style={{ fontSize: '14px', fontWeight: 400, color: '#9CA3AF', lineHeight: '1.6', marginBottom: '24px' }}>
              {(() => {
                const stillStanding = grid.flat().filter(cell => cell.state === 'tree' || cell.state === 'sapling').length
                const buildings = grid.flat().filter(cell => cell.state === 'building').length

                // Didn't play at all
                if (planted === 0) {
                  return "Sometimes watching is learning too. I build products where every interaction counts."
                }

                // Perfect round - nothing was lost
                if (stillStanding === planted) {
                  return "Every tree held. Nothing got past you this time."
                }

                // Good round - most survived (more than 50%)
                if (stillStanding >= planted * 0.5) {
                  return "Every tree you planted mattered — small, deliberate choices that compound."
                }

                // Bad round - most were lost or overwhelmed
                return "The city moved fast this round. Design isn't about perfection — it's about thoughtful choices under pressure."
              })()}
            </div>

            {/* View case studies link - green */}
            <a
              href="#case-studies"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: 500,
                color: '#86C232',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#86C232'
              }}
            >
              Curious how I create real products
            </a>

            {/* Play again link - secondary grey */}
            <button
              onClick={restartGame}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#9CA3AF',
                background: 'none',
                border: 'none',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#9CA3AF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}
            >
              Play again
            </button>
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

            {/* GIF Placeholder */}
            <div style={{
              width: '100%',
              backgroundColor: '#F3F4F6',
              borderRadius: '12px',
              marginBottom: '24px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}>
              <div style={{
                width: '100%',
                height: isMobile ? '200px' : '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
                color: '#9CA3AF',
                fontSize: '14px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '48px' }}>🎮</div>
                <div>Gameplay GIF placeholder</div>
                <div style={{ fontSize: '12px', color: '#D1D5DB' }}>
                  Add your game explanation GIF here
                </div>
              </div>
              {/* Uncomment when GIF is ready:
              <img
                src="/images/game-explanation.gif"
                alt="Game explanation"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              */}
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
