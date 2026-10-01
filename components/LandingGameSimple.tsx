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
const GRID_COLS_DESKTOP = 9
const GRID_COLS_TABLET = 8
const GRID_COLS_MOBILE = 6
const ROUND_DURATION = 10 // 10 seconds

// Simple tree component - full grown tree with sway animation
const TreeIcon = ({ size = 60, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const [isGusting, setIsGusting] = useState(false)
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]
  // Stagger each tree's idle sway so a row of trees doesn't move in unison
  const swayDelay = useRef(-(Math.random() * 4)).current
  const swayDuration = useRef(3.4 + Math.random() * 1.8).current

  // Occasional stronger gust layered on top of the continuous idle sway
  useEffect(() => {
    const randomDelay = Math.random() * 5000
    const gustDuration = 900

    const startGusting = () => {
      const shouldGust = Math.random() < 0.3 // 30% chance
      if (shouldGust) {
        setIsGusting(true)
        setTimeout(() => setIsGusting(false), gustDuration)
      }
      setTimeout(startGusting, 3000 + Math.random() * 4000)
    }

    const initialTimeout = setTimeout(startGusting, randomDelay)
    return () => clearTimeout(initialTimeout)
  }, [])

  return (
    <>
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
          transformOrigin: 'bottom center',
          animation: isGusting
            ? 'treeGust 0.9s ease-in-out'
            : `treeIdleSway ${swayDuration}s ease-in-out ${swayDelay}s infinite`,
          objectFit: 'contain',
          zIndex: 5,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </>
  )
}

// Sapling component - smaller tree with grow animation
const SaplingIcon = ({ size = 40, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  return (
    <>
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
          transformOrigin: 'bottom center',
          animation: 'saplingPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          objectFit: 'contain',
          zIndex: 5,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </>
  )
}

// Building component with fast pop-in animation
const BuildingIcon = ({ size = 60, variant = 0, isDaytime = true }: { size?: number; variant?: number; isDaytime?: boolean }) => {
  const [isPopping, setIsPopping] = useState(true)
  const buildingVariants = ['building 01.svg', 'building 02.svg', 'building 03.svg', 'building 04.svg']
  const buildingFile = buildingVariants[variant % 4]
  // Building 04 is a tall skyscraper (65:204 aspect) — give it real extra height instead of
  // capping it to the same square box as the shorter buildings.
  const isTallVariant = variant % 4 === 3
  const buildingHeight = isTallVariant ? size * 1.7 : size
  const buildingWidth = isTallVariant ? size * 0.55 : size

  useEffect(() => {
    const timer = setTimeout(() => setIsPopping(false), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Building */}
      <img
        src={`/images/home/${buildingFile}`}
        alt="building"
        style={{
          position: 'absolute',
          width: buildingWidth,
          height: buildingHeight,
          bottom: '20%',
          left: '50%',
          transform: `translateX(-50%) scale(${isPopping ? 0.3 : 1})`,
          objectFit: 'contain',
          zIndex: 5,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </>
  )
}

// Sun color moves through the day: dawn pink-orange -> morning yellow-orange -> midday bright orange -> evening fading orange-pink
const getSunStyle = (hour: number): { background: string; glow: string } => {
  if (hour >= 6 && hour < 9) {
    return { background: 'linear-gradient(135deg, #FFB199, #FF7D6B)', glow: 'rgba(255, 137, 122, 0.3)' }
  }
  if (hour >= 9 && hour < 12) {
    return { background: 'linear-gradient(135deg, #FFDD77, #FFA94D)', glow: 'rgba(255, 169, 77, 0.28)' }
  }
  if (hour >= 12 && hour < 16) {
    return { background: 'linear-gradient(135deg, #FFB347, #FF8A0E)', glow: 'rgba(255, 138, 14, 0.28)' }
  }
  // Evening (16-18): fading orange-pink
  return { background: 'linear-gradient(135deg, #FFA08A, #FF7FA8)', glow: 'rgba(255, 127, 168, 0.24)' }
}

// Simple ground marker component
const GroundMarker = ({ size = 60 }: { size?: number }) => {
  const ellipseWidth = size * 0.7 * 0.2
  const ellipseHeight = size * 0.3 * 0.2
  // Stagger so a grid of empty plots doesn't pulse in lockstep
  const pulseDelay = useRef(-(Math.random() * 2.6)).current
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transformOrigin: `${size / 2}px ${size * 0.8}px`,
        animation: `groundInvite 2.6s ease-in-out ${pulseDelay}s infinite`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <ellipse
        cx={size / 2}
        cy={size * 0.8}
        rx={ellipseWidth / 2}
        ry={ellipseHeight / 2}
        fill="#8DC562"
      />
    </svg>
  )
}

export default function LandingGameSimple() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [grid, setGrid] = useState<Cell[][]>([])
  const [planted, setPlanted] = useState(0)
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
  const [dayHour, setDayHour] = useState(12) // Seattle hour, drives the sun's color through the day
  const [audioMuted, setAudioMuted] = useState(true) // Starts muted; user must opt in to sound
  const birdsAudioRef = useRef<HTMLAudioElement>(null)
  const trafficAudioRef = useRef<HTMLAudioElement>(null)
  const truckAnimationRef = useRef<number>()

  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024) // iPad range
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get local time and region (Seattle-based)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // Get Seattle time (America/Los_Angeles timezone)
      const seattleTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
      const hour = seattleTime.getHours()

      // Daytime: 6am - 6pm (6-18), Nighttime: 6pm - 6am
      setIsDaytime(hour >= 6 && hour < 18)
      setDayHour(hour)

      setLocalTime(
        seattleTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Always show Seattle
    setLocalRegion('Seattle')

    return () => clearInterval(interval)
  }, [])

  // Initialize grid
  useEffect(() => {
    if (!mounted) return
    const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
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
              const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
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

  // Ambient audio: birds get louder as more trees are planted, traffic gets louder as more buildings go up
  useEffect(() => {
    const birdsAudio = birdsAudioRef.current
    const trafficAudio = trafficAudioRef.current
    if (!birdsAudio || !trafficAudio) return

    if (audioMuted) {
      birdsAudio.pause()
      trafficAudio.pause()
      return
    }

    const flat = grid.flat()
    const treeCount = flat.filter(c => c.state === 'tree' || c.state === 'sapling').length
    const buildingCount = flat.filter(c => c.state === 'building').length
    const total = treeCount + buildingCount

    // Baseline ambience even at zero, then mix toward whichever side dominates
    const birdsVolume = total === 0 ? 0.3 : 0.15 + 0.6 * (treeCount / total)
    const trafficVolume = total === 0 ? 0.15 : 0.1 + 0.55 * (buildingCount / total)

    birdsAudio.volume = Math.min(1, birdsVolume)
    trafficAudio.volume = Math.min(1, trafficVolume)

    if (birdsAudio.paused) birdsAudio.play().catch(() => {})
    if (trafficAudio.paused) trafficAudio.play().catch(() => {})
  }, [grid, audioMuted])

  // Spawn trucks (they deliver buildings)
  useEffect(() => {
    if (!gameActive || !mounted) return

    const spawnTruck = () => {
      const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
      // Must match the render-time cellSize/gap below exactly, or trucks
      // spawn/travel using a wider grid than what's actually drawn and
      // end up rendered off the edge of the (narrower) real grid.
      const cellSize = isMobile ? 48 : isTablet ? 64 : (typeof window !== 'undefined' && window.innerWidth >= 1800 ? 120 : 100)
      const gap = isMobile ? 8 : isTablet ? 12 : 16

      // Exclude top row on tablet to prevent overlap with instruction text
      const minRow = isTablet ? 1 : 0
      const availableRows = GRID_ROWS - minRow

      const targetRow = minRow + Math.floor(Math.random() * availableRows)
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

    // Adaptive difficulty: easier first time, harder on replay
    const spawnInterval = playCount === 0 ? 1800 : 1300 // fewer, bigger trucks — 1.8s first time, 1.3s on replay
    const interval = setInterval(spawnTruck, spawnInterval)
    return () => clearInterval(interval)
  }, [gameActive, mounted, isMobile, isTablet, playCount])

  // Animate trucks
  useEffect(() => {
    const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
    const cellSize = isMobile ? 48 : 80
    const gap = isMobile ? 8 : 16
    const gridWidth = cols * (cellSize + gap)

    let lastTruckFrame = 0
    const truckFrameDelay = 32 // ~30fps is plenty for truck movement, halves React work vs 60fps

    const animate = (timestamp: number) => {
      if (timestamp - lastTruckFrame < truckFrameDelay) {
        truckAnimationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTruckFrame = timestamp

      setTrucks(prevTrucks => {
        if (prevTrucks.length === 0) return prevTrucks

        const spawnDust = (row: number, col: number) => {
          const cs = isMobile ? 48 : isTablet ? 64 : (typeof window !== 'undefined' && window.innerWidth >= 1800 ? 120 : 100)
          const g = isMobile ? 8 : isTablet ? 12 : 16
          const dustId = Date.now() + Math.random()
          const dustX = col * (cs + g) + cs / 2
          const dustY = row * (cs + g) + cs / 2
          setSmokes(prev => [...prev, { id: dustId, x: dustX, y: dustY, facingRight: true }])
          setTimeout(() => {
            setSmokes(prev => prev.filter(s => s.id !== dustId))
          }, 500)
        }

        const baseSpeed = (playCount === 0 ? 4 : 5.5) * 2 // Compensate for half frame rate to keep same visual speed
        const decelZone = 70 // px — truck eases into its delivery spot instead of stopping abruptly

        const deliver = (truck: Truck) => {
          setGrid(prevGrid => {
            if (prevGrid.length === 0) return prevGrid
            const newGrid = [...prevGrid]
            if (newGrid[truck.row]?.[truck.col]?.state === 'empty') {
              // Keep the tall skyscraper (variant 3) off phone/tablet entirely (too tall for
              // those smaller cells), and on laptop/desktop only let it appear in row 0.
              const tallVariantAllowed = !isMobile && !isTablet && truck.row === 0
              const buildingVariant = tallVariantAllowed ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 3)
              newGrid[truck.row][truck.col] = { state: 'building', variant: buildingVariant }
              spawnDust(truck.row, truck.col)
            }
            return newGrid
          })
        }

        return prevTrucks
          .map(truck => {
            let newX = truck.x
            let newDelivered = truck.delivered
            const distanceToTarget = Math.abs(truck.targetX - truck.x)
            const speed = !truck.delivered && distanceToTarget < decelZone
              ? Math.max(baseSpeed * 0.3, baseSpeed * (distanceToTarget / decelZone))
              : baseSpeed

            if (truck.facingRight) {
              newX += speed
              if (!truck.delivered && newX >= truck.targetX) {
                newX = truck.targetX
                deliver(truck)
                newDelivered = true
              }
              if (newX > gridWidth + 100) return null
            } else {
              newX -= speed
              if (!truck.delivered && newX <= truck.targetX) {
                newX = truck.targetX
                deliver(truck)
                newDelivered = true
              }
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
  }, [isMobile, isTablet, playCount])

  // Restart game
  const restartGame = () => {
    const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
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
  }

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF8F3',
      }}>
        Loading...
      </div>
    )
  }

  const cols = isMobile ? GRID_COLS_MOBILE : isTablet ? GRID_COLS_TABLET : GRID_COLS_DESKTOP
  // Responsive cell sizes: mobile (48), tablet (64), laptop (100), monitor (120)
  const cellSize = isMobile ? 48 : isTablet ? 64 : (typeof window !== 'undefined' && window.innerWidth >= 1800 ? 120 : 100)
  const gap = isMobile ? 8 : isTablet ? 12 : 16

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
      backgroundColor: '#FAF8F3',
      borderRadius: '4px',
      paddingTop: isMobile ? '16px' : '20px',
      paddingRight: isMobile ? '16px' : '20px',
      // No left padding on desktop: the grid left-aligns flush with this box's edge so it
      // lines up with "Hi, I'm Indhu" below, which shares the same parent maxWidth/margin.
      paddingLeft: isMobile || isTablet ? (isMobile ? '16px' : '20px') : '0px',
      paddingBottom: isMobile ? '90px' : isTablet ? '140px' : '20px', // More padding on tablet to prevent overlap
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMobile || isTablet ? 'center' : 'flex-start',
      justifyContent: 'center',
    }}>
      {/* Warm ambient glow behind the header and scene, like sunlight washing the sky */}
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '900px',
        height: isMobile ? '360px' : '520px',
        background: isDaytime
          ? 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,201,77,0.18), rgba(255,201,77,0) 70%)'
          : 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(215,220,236,0.16), rgba(215,220,236,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

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
        paddingBottom: isTablet ? '24px' : '0', // Extra padding on tablet to prevent overlap with stat card
      }}>
        {/* Location and time */}
        <div style={{
          fontSize: isMobile ? '12px' : '12px',
          color: '#6B7280',
          marginBottom: isMobile ? '8px' : '16px',
          lineHeight: '1.5',
        }}>
          <span style={{ color: '#B5610A', fontWeight: 600 }}>{localRegion}</span> • {localTime}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: isMobile ? '19px' : '22px',
          fontWeight: 600,
          color: '#1C1917',
          marginBottom: isMobile ? '8px' : '12px',
          fontFamily: 'var(--font-fraunces), serif',
          lineHeight: '1.4',
        }}>
          Plant faster than the city can build. Good luck.
        </div>

        {/* Explanation - desktop only (not tablet) */}
        {!isMobile && !isTablet && (
          <>
            <div style={{
              fontSize: '14px',
              color: '#4B5563',
              marginBottom: '6px',
              lineHeight: '1.5',
            }}>
              Trucks deliver buildings to empty spaces. Plant trees to keep the ecosystem alive.
            </div>
            <div style={{
              fontSize: '13px',
              color: '#9CA3AF',
              fontStyle: 'italic',
              marginBottom: '12px',
              lineHeight: '1.5',
            }}>
              A small stand-in for the real thing: shipping fast without losing what matters.
            </div>
          </>
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
      {(isMobile || isTablet) && gameActive && !gameEnded && (
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
                backgroundColor: '#FF8A0E',
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
              padding: '6px 12px',
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
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

          {/* Mute button — tablet only, shares the timer bar (phone has no ambient audio) */}
          {isTablet && (
            <button
              onClick={() => setAudioMuted(prev => !prev)}
              aria-label={audioMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
              title={audioMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(28, 25, 23, 0.12)',
                backgroundColor: 'rgba(28, 25, 23, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                flexShrink: 0,
              }}
            >
              {audioMuted ? '🔇' : '🔊'}
            </button>
          )}

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

      {/* Desktop only: mute button, stacked above "Why a game?" and the yellow ? button */}
      {!isMobile && !isTablet && (
        <button
          onClick={() => setAudioMuted(prev => !prev)}
          aria-label={audioMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          title={audioMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          style={{
            position: 'absolute',
            bottom: '194px',
            right: '105px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: 'rgba(28, 25, 23, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            fontSize: '14px',
          }}
        >
          {audioMuted ? '🔇' : '🔊'}
        </button>
      )}

      {/* Desktop only: "Why a game?" label above the yellow ? button */}
      {!isMobile && !isTablet && (
        <button
          onClick={() => {
            setShowLearnMore(true)
            setButtonActive(true)
            setTimeout(() => setButtonActive(false), 300)
          }}
          style={{
            position: 'absolute',
            bottom: '150px',
            right: '68px',
            padding: '6px 14px',
            backgroundColor: 'rgba(28, 25, 23, 0.9)',
            color: '#FAF8F3',
            border: 'none',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            zIndex: 100,
            fontFamily: 'DM Sans, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          Why a game?
        </button>
      )}

      {/* Desktop only: Yellow ? button - bottom right (tablets use mobile strip) */}
      {!isMobile && !isTablet && (
        <button
          onClick={() => {
            setShowLearnMore(true)
            setButtonActive(true)
            setTimeout(() => setButtonActive(false), 300)
          }}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '89px',
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


      {/* Desktop only: Stats panel on right side (tablets use mobile bottom strip) */}
      {!isMobile && !isTablet && gameActive && !gameEnded && (
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
                backgroundColor: '#FF8A0E',
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
              padding: '8px 16px',
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
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

      {/* Game container. Desktop: width is capped to the grid's own size (not 100%) so the outer
          wrapper's centering actually centers the grid — on wide monitors a 100%-wide, flex-start
          container left the fixed-size grid stranded far from the centered heading above it. */}
      <div style={{
        position: 'relative',
        width: isMobile || isTablet ? '100%' : `${cols * cellSize + (cols - 1) * gap}px`,
        marginTop: isMobile ? '140px' : isTablet ? '160px' : '230px',
        display: 'flex',
        justifyContent: isMobile || isTablet ? 'center' : 'flex-start',
      }}>
        {/* Ambient clouds drifting behind the birds */}
        <div style={{ position: 'absolute', top: '-20px', left: 0, width: '100%', height: isMobile ? '60px' : '90px', pointerEvents: 'none', zIndex: 2 }}>
          <img
            src="/images/home/Cloud 01.svg"
            alt=""
            style={{ position: 'absolute', top: '0px', width: isMobile ? '70px' : '120px', height: 'auto', opacity: 0.55, animation: 'birdDriftRight 46s linear infinite' }}
          />
          <img
            src="/images/home/Cloud 02.svg"
            alt=""
            style={{ position: 'absolute', top: isMobile ? '26px' : '38px', width: isMobile ? '52px' : '86px', height: 'auto', opacity: 0.4, animation: 'birdDriftLeft 58s linear infinite', animationDelay: '-20s' }}
          />
          {!isMobile && (
            <img
              src="/images/home/Cloud 01.svg"
              alt=""
              style={{ position: 'absolute', top: '14px', width: '64px', height: 'auto', opacity: 0.32, animation: 'birdDriftRight 64s linear infinite', animationDelay: '-30s' }}
            />
          )}
        </div>

        {/* Ambient birds, high — kept clear of the sun (left) and the stats HUD card (right) */}
        {!isMobile && (
          <div style={{ position: 'absolute', top: '-58px', left: '14%', width: '52%', height: '60px', pointerEvents: 'none', zIndex: 4 }}>
            <div style={{ position: 'absolute', transform: 'scaleX(-1)', animation: 'birdFlyRight 17s ease-in-out infinite' }}>
              <img
                src="/images/home/Bird 01.svg"
                alt=""
                style={{ display: 'block', width: '35px', height: 'auto', opacity: 0.9, animation: 'birdFlapA 0.7s ease-in-out infinite' }}
              />
            </div>
            <div style={{ position: 'absolute', animation: 'birdFlyLeft 21s ease-in-out infinite', animationDelay: '-7s' }}>
              <img
                src="/images/home/Bird 04.svg"
                alt=""
                style={{ display: 'block', width: '28px', height: 'auto', opacity: 0.85, animation: 'birdFlapB 0.55s ease-in-out infinite', animationDelay: '-0.2s' }}
              />
            </div>
          </div>
        )}

        {/* Ambient birds, low — cruising near tree-top height so they read against the scene, not just the sky */}
        {!isMobile && (
          <div style={{ position: 'absolute', top: '130px', left: 0, width: '100%', height: '110px', pointerEvents: 'none', zIndex: 6 }}>
            <div style={{ position: 'absolute', transform: 'scaleX(-1)', animation: 'birdFlyRight 13s ease-in-out infinite', animationDelay: '-3s' }}>
              <img
                src="/images/home/Bird 02.svg"
                alt=""
                style={{ display: 'block', width: '37px', height: 'auto', opacity: 0.9, animation: 'birdFlapA 0.6s ease-in-out infinite', animationDelay: '-0.3s' }}
              />
            </div>
            <div style={{ position: 'absolute', animation: 'birdFlyLeft 19s ease-in-out infinite', animationDelay: '-12s' }}>
              <img
                src="/images/home/Bird 03.svg"
                alt=""
                style={{ display: 'block', width: '30px', height: 'auto', opacity: 0.85, animation: 'birdFlapB 0.65s ease-in-out infinite' }}
              />
            </div>
          </div>
        )}

        {/* Sun/Moon - top left corner (opposite of timer). Hidden on phone (too cramped next to the menu/heading); sits just above the grid on tablet. */}
        {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: isTablet ? '-100px' : '-140px',
            left: isTablet ? '24px' : '40px',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          {isDaytime ? (
            <div
              role="img"
              aria-label="sun"
              style={{
                width: isMobile ? '23px' : '32px',
                height: isMobile ? '23px' : '32px',
                borderRadius: '50%',
                background: getSunStyle(dayHour).background,
                boxShadow: `0 0 0 ${isMobile ? '6px' : '8px'} ${getSunStyle(dayHour).glow}`,
                transition: 'background 1.5s ease, box-shadow 1.5s ease',
              }}
            />
          ) : (
            <img
              src="/images/home/moon.svg"
              alt="moon"
              style={{
                width: isMobile ? '23px' : '32px',
                height: isMobile ? '23px' : '32px',
                objectFit: 'contain',
              }}
            />
          )}
        </div>
        )}

        {/* See the work — points visitors at the case studies without requiring them to play. Desktop only: on phone/tablet it collides with the heading text. */}
        {!isMobile && !isTablet && (
          <button
            onClick={() => {
              document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            style={{
              position: 'absolute',
              top: '-141px',
              left: '92px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#1C1917',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              color: '#FAF8F3',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              fontFamily: 'DM Sans, sans-serif',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              zIndex: 5,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.15)'
            }}
          >
            See the work
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ animation: 'scrollPromptBounce 1.6s ease-in-out infinite' }}>
              <path d="M8 2.5V13.5M8 13.5L3 8.5M8 13.5L13 8.5" stroke="#FAF8F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Ambient audio — birds louder with more trees, traffic louder with more buildings. Starts muted. Phone has no mute control, so audio never plays there; tablet's control lives in the timer bar instead; desktop's lives above "Why a game?" at the top level. */}
        <audio ref={birdsAudioRef} src="/audio/birds%20chirping.mp3" loop preload="none" />
        <audio ref={trafficAudioRef} src="/audio/Traffic%20sound.mp3" loop preload="none" />

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
              {cell.state === 'sapling' && <SaplingIcon variant={cell.variant || 0} size={isMobile ? 30 : isTablet ? 42 : 60} isDaytime={isDaytime} />}
              {cell.state === 'tree' && <TreeIcon variant={cell.variant || 0} size={isMobile ? 45 : isTablet ? 62 : 90} isDaytime={isDaytime} />}
              {cell.state === 'building' && <BuildingIcon variant={cell.variant || 0} size={isMobile ? 41 : isTablet ? 48 : 69} isDaytime={isDaytime} />}
            </div>
          ))
        )}


        {/* Trucks overlay */}
        {trucks.map(truck => {
          const truckWidth = isMobile ? 37 : 59
          const truckHeight = isMobile ? 30 : 47
          // Subtle up/down bob while driving, purely cosmetic (not stored in state)
          const bob = Math.sin(truck.x / 14) * 1.5

          return (
            <img
              key={truck.id}
              src="/images/home/truck.svg?cache=updated"
              alt="truck"
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                transform: `translate(${truck.x}px, ${truck.y + bob}px) scaleX(${truck.facingRight ? 1 : -1})`,
                width: `${truckWidth}px`,
                height: `${truckHeight}px`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            />
          )
        })}

        {/* Delivery dust puffs */}
        {smokes.map(dust => (
          <div
            key={dust.id}
            style={{
              position: 'absolute',
              left: `${dust.x}px`,
              top: `${dust.y}px`,
              width: isMobile ? '28px' : '44px',
              height: isMobile ? '28px' : '44px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(214,211,209,0.7) 0%, rgba(214,211,209,0) 70%)',
              animation: 'deliveryDust 0.5s ease-out forwards',
              zIndex: 15,
              pointerEvents: 'none',
            }}
          />
        ))}
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
                You have <strong>10 seconds</strong> to plant as many trees as you can. But trucks keep coming with buildings.
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
              <video
                src="/videos/home/gameplay-gif.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
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
