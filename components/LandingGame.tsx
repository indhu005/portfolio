'use client'
import { useState, useEffect, useRef } from 'react'

type CellState = 'empty' | 'sapling' | 'tree' | 'building'

interface Cell {
  state: CellState
  plantedAt?: number
  stressed?: boolean
  treeColor?: string
  hasBird?: boolean
  variant?: number
}

interface Truck {
  id: number
  row: number
  targetCol: number
  position: number
  active: boolean
  // Path segments for turning
  startRow: number
  startCol: number
  turnCol: number
  turnRow: number
  phase: 'horizontal' | 'vertical' | 'exit'
  x: number
  y: number
  rotation: number
  facingRight: boolean // true = moving right, false = moving left
}

interface Bird {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
}

const GRID_ROWS = 4
const GRID_COLS = 8
const GRID_COLS_MOBILE = 6 // Fewer columns on mobile to prevent overlap
const SAPLING_GROW_TIME = 1000 // Fast tree growth
const TRUCK_SPAWN_INTERVAL = 750 // Relentless truck spawning - dominates if idle
const ROUND_DURATION = 10 // Quick 10-second rounds

// Game field padding - consistent inset from all edges
const GAME_FIELD_PADDING = 20 // px on all sides

// Grid positioning - defines safe zone below header
const GRID_TOP_OFFSET = 170 // marginTop (110px) + padding-top (60px)
const CELL_SIZE = 80
const CELL_GAP = 16
const CELL_STRIDE = CELL_SIZE + CELL_GAP // 96px per cell including gap

// Tree color palette
const TREE_COLORS = [
  '#86C232', // bright green
  '#6DA34D', // medium green
  '#7AB88D', // soft green
  '#A8D08D', // yellow-green
  '#C9D991', // lime green
  '#E8C547', // golden yellow
  '#F5A962', // soft orange
]

// Ending thresholds
const SMOKE_START_RATIO = 0.5  // 50% buildings
const SMOKE_END_RATIO = 0.75   // 75% buildings

const TreeIcon = ({ hasBird = false, size = 60, variant = 0 }: { hasBird?: boolean; size?: number; variant?: number }) => {
  const [isSwaying, setIsSwaying] = useState(false)

  // Pick one of the 5 tree variants
  const treeVariants = ['tree 01 (1)', 'tree 01 (2)', 'tree 01 (3)', 'tree 01 (4)', 'tree 01 (5)']
  const treeName = treeVariants[variant % 5]
  const currentFile = isSwaying ? `${treeName} Swing.svg` : `${treeName}.svg`

  // Random sway animation - not all trees sway at the same time
  useEffect(() => {
    const randomDelay = Math.random() * 5000 // Random delay 0-5 seconds
    const swayDuration = 800 // How long the sway lasts

    const startSwaying = () => {
      const shouldSway = Math.random() < 0.3 // 30% chance to sway
      if (shouldSway) {
        setIsSwaying(true)
        setTimeout(() => setIsSwaying(false), swayDuration)
      }
      // Schedule next potential sway
      setTimeout(startSwaying, 3000 + Math.random() * 4000) // Every 3-7 seconds
    }

    const initialTimeout = setTimeout(startSwaying, randomDelay)
    return () => clearTimeout(initialTimeout)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      width: size,
      height: size,
      bottom: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 5,
    }}>
      <img
        src={`/images/home/${currentFile}?cache=july10-2026`}
        alt="tree"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transition: 'all 0.4s ease-in-out',
        }}
      />
      {hasBird && (
        <img
          src="/images/home/Birds.svg?cache=july10-2026"
          alt="bird"
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30px',
            height: '20px',
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  )
}

const BuildingIcon = ({ size = 60, variant = 0 }: { size?: number; variant?: number }) => {
  // Pick one of the 3 new 3D building SVGs based on stored variant
  const buildingVariants = ['building 01.svg', 'building 02.svg', 'building 03.svg']
  const buildingFile = buildingVariants[variant % 3]

  return (
    <img
      src={`/images/home/${buildingFile}?cache=july10-2026`}
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

const SaplingIcon = ({ size = 40, variant = 0 }: { size?: number; variant?: number }) => {
  const [isGrowing, setIsGrowing] = useState(true)

  // Use same 3D tree SVGs but smaller for saplings
  const treeVariants = ['tree 01 (1).svg', 'tree 01 (2).svg', 'tree 01 (3).svg', 'tree 01 (4).svg', 'tree 01 (5).svg']
  const treeFile = treeVariants[variant % 5]

  // Subtle grow animation on plant
  useEffect(() => {
    const timer = setTimeout(() => setIsGrowing(false), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <img
      src={`/images/home/${treeFile}?cache=july10-2026`}
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

const GroundMarker = ({ size = 60 }: { size?: number }) => {
  // Simple grey ellipse ground marker for all cells - reduced to 20% of original size
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

const BirdSilhouette = ({ x, y, rotation }: { x: number; y: number; rotation: number }) => (
  <div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${rotation}deg)`,
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    <img
      src="/images/home/Birds.svg?cache=july10-2026"
      alt="bird"
      style={{
        width: '24px',
        height: '18px',
        objectFit: 'contain',
      }}
    />
  </div>
)

const PlantingHand = ({ show }: { show: boolean }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    }}
  >
    <svg width="40" height="40" viewBox="0 0 100 100">
      <path
        d="M30,70 Q35,60 40,50 L45,55 L50,45 L55,55 L60,50 Q65,60 70,70 Z"
        fill="none"
        stroke="#3A3A3A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
)

// Hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Hook to detect wide desktop viewport
const useIsWideDesktop = () => {
  const [isWideDesktop, setIsWideDesktop] = useState(false)

  useEffect(() => {
    const checkWideDesktop = () => {
      setIsWideDesktop(window.innerWidth >= 2200)
    }
    checkWideDesktop()
    window.addEventListener('resize', checkWideDesktop)
    return () => window.removeEventListener('resize', checkWideDesktop)
  }, [])

  return isWideDesktop
}

// Hook to detect tablet viewport
const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    checkTablet()
    window.addEventListener('resize', checkTablet)
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  return isTablet
}

export default function LandingGame() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isWideDesktop = useIsWideDesktop()
  const currentRows = isWideDesktop ? 5 : GRID_ROWS
  const currentCols = isMobile ? GRID_COLS_MOBILE : GRID_COLS

  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array(GRID_ROWS)
      .fill(null)
      .map(() =>
        Array(GRID_COLS)
          .fill(null)
          .map(() => ({ state: 'empty' }))
      )
  )
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION)
  const [gameActive, setGameActive] = useState(true) // Auto-start for ambient loop
  const [gameEnded, setGameEnded] = useState(false)
  const [planted, setPlanted] = useState(0)
  const [stillStanding, setStillStanding] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [showPlantingHand, setShowPlantingHand] = useState<{row: number, col: number} | null>(null)
  const [birds, setBirds] = useState<Bird[]>(() => {
    // Initialize birds on mount for ambient animation
    const BIRD_MIN_Y = 15
    const BIRD_MAX_Y = 85
    const BIRD_MIN_X = 5
    const BIRD_MAX_X = 95
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: BIRD_MIN_X + Math.random() * (BIRD_MAX_X - BIRD_MIN_X),
      y: BIRD_MIN_Y + Math.random() * (BIRD_MAX_Y - BIRD_MIN_Y),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      rotation: Math.random() * 20 - 10,
    }))
  })
  const [localTime, setLocalTime] = useState('')
  const [localRegion, setLocalRegion] = useState('')
  const [smokeOpacity, setSmokeOpacity] = useState(0)
  const [endingType, setEndingType] = useState<'smoke' | 'migration' | 'neutral' | null>(null)
  const [birdsMigrating, setBirdsMigrating] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [buttonActive, setButtonActive] = useState(false) // Track active state for morning to evening
  const animationFrameRef = useRef<number>()

  // Set mounted state on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update grid when screen size changes
  useEffect(() => {
    setGrid(prevGrid => {
      const newRows = isWideDesktop ? 5 : GRID_ROWS
      const newCols = isMobile ? GRID_COLS_MOBILE : GRID_COLS

      // Check if both dimensions match - ensure prevGrid has at least one row
      if (prevGrid.length === newRows && prevGrid.length > 0 && prevGrid[0].length === newCols) return prevGrid

      // Rebuild grid with new dimensions
      return Array(newRows)
        .fill(null)
        .map(() => Array(newCols).fill(null).map(() => ({ state: 'empty' as CellState })))
    })
  }, [isWideDesktop, isMobile])

  // Get local time and region
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
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

  // Start game
  const startGame = () => {
    const newRows = isWideDesktop ? 5 : GRID_ROWS
    const newCols = isMobile ? GRID_COLS_MOBILE : GRID_COLS
    setGameActive(true)
    setGameEnded(false)
    setTimeLeft(ROUND_DURATION)
    setPlanted(0)
    setStillStanding(0)
    setHasInteracted(false)
    setTrucks([])
    setSmokeOpacity(0)
    setEndingType(null)
    setBirdsMigrating(false)
    setGrid(
      Array(newRows)
        .fill(null)
        .map(() =>
          Array(newCols)
            .fill(null)
            .map(() => ({ state: 'empty' }))
        )
    )
    setBirds(generateInitialBirds())
  }

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer hit zero - end the round
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  // Handle game end when timer reaches 0
  useEffect(() => {
    if (!gameActive || timeLeft > 0) return

    // Round ended by timer
    const trees = grid.flat().filter(cell => cell.state === 'tree').length
    const saplings = grid.flat().filter(cell => cell.state === 'sapling').length
    const stillStandingCount = trees + saplings
    const buildings = grid.flat().filter(cell => cell.state === 'building').length

    setStillStanding(stillStandingCount)

    // If visitor never interacted, silently restart round
    if (!hasInteracted) {
      setTimeout(() => {
        startGame()
      }, 500)
      return
    }

    // Determine ending type based on tree vs building count
    if (trees >= buildings) {
      setEndingType('migration')
      // Trigger bird migration animation
      setBirdsMigrating(true)
      setTimeout(() => {
        setGameActive(false)
        setGameEnded(true)
      }, 2000) // Show migration for 2 seconds before showing end screen
    } else {
      setEndingType('neutral')
      setGameActive(false)
      setGameEnded(true)
    }
  }, [timeLeft, gameActive, hasInteracted, grid, isWideDesktop])

  // Grow saplings
  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setGrid(prevGrid =>
        prevGrid.map(row =>
          row.map(cell => {
            if (cell.state === 'sapling' && cell.plantedAt) {
              const elapsed = Date.now() - cell.plantedAt
              if (elapsed >= SAPLING_GROW_TIME) {
                // Assign random color from palette and possibly a bird (1/3 to 1/2 chance)
                const treeColor = TREE_COLORS[Math.floor(Math.random() * TREE_COLORS.length)]
                const hasBird = Math.random() < 0.4 // 40% chance of bird
                // Preserve the variant from sapling
                return { ...cell, state: 'tree', treeColor, hasBird }
              }
            }
            return cell
          })
        )
      )
    }, 100)

    return () => clearInterval(interval)
  }, [gameActive])

  // Spawn trucks
  useEffect(() => {
    if (!gameActive) return

    const spawnTruck = () => {
      const targetRow = Math.floor(Math.random() * currentRows)
      const targetCol = Math.floor(Math.random() * currentCols)

      // Start from a random edge (left or right)
      const fromLeft = Math.random() < 0.5
      const startRow = Math.floor(Math.random() * currentRows)
      const startCol = fromLeft ? -1 : currentCols

      const newTruck: Truck = {
        id: Date.now() + Math.random(), // Unique ID
        row: targetRow,
        targetCol: targetCol,
        position: -1,
        active: true,
        startRow,
        startCol,
        turnCol: targetCol,
        turnRow: targetRow,
        phase: 'horizontal',
        x: startCol * CELL_STRIDE,
        y: startRow * CELL_STRIDE + GRID_TOP_OFFSET,
        rotation: 0,
        facingRight: fromLeft, // true if starting from left (moving right)
      }

      setTrucks(prev => [...prev, newTruck])
    }

    const interval = setInterval(spawnTruck, TRUCK_SPAWN_INTERVAL)
    spawnTruck()

    return () => clearInterval(interval)
  }, [gameActive, currentRows])

  // Animate trucks with turning path
  useEffect(() => {
    if (trucks.length === 0 || !gameActive) return

    const animateTrucks = () => {
      setTrucks(prevTrucks => {
        const speed = 4 // pixels per frame - very fast delivery

        return prevTrucks
          .map(truck => {
            let newX = truck.x
            let newY = truck.y
            let newPhase = truck.phase
            let newRotation = 0
            let newActive = truck.active
            let newFacingRight = truck.facingRight

            if (truck.phase === 'horizontal') {
              // Move horizontally toward target column
              const targetX = truck.turnCol * CELL_STRIDE
              const direction = truck.startCol < truck.turnCol ? 1 : -1
              newX += speed * direction
              newFacingRight = direction > 0 // Update facing direction

              // Check if reached turn point
              if ((direction > 0 && newX >= targetX) || (direction < 0 && newX <= targetX)) {
                newX = targetX
                newPhase = 'vertical'
              }
            } else if (truck.phase === 'vertical') {
              // Move vertically toward target row
              const targetY = truck.turnRow * CELL_STRIDE + GRID_TOP_OFFSET
              const direction = truck.startRow < truck.turnRow ? 1 : -1
              newY += speed * direction
              // Keep previous horizontal facing direction during vertical movement

              // Check if reached target cell
              if ((direction > 0 && newY >= targetY) || (direction < 0 && newY <= targetY)) {
                newY = targetY
                // Drop building
                if (truck.active) {
                  setGrid(prevGrid => {
                    const newGrid = [...prevGrid]
                    const cell = newGrid[truck.row][truck.targetCol]
                    if (cell.state !== 'building') {
                      // Assign a random variant (0-2) for building shape
                      const buildingVariant = Math.floor(Math.random() * 3)
                      newGrid[truck.row][truck.targetCol] = { state: 'building', variant: buildingVariant }
                    }
                    return newGrid
                  })
                  newActive = false
                }
                newPhase = 'exit'
              }
            } else if (truck.phase === 'exit') {
              // Continue moving horizontally to exit
              const exitDirection = truck.startCol < truck.turnCol ? 1 : -1
              newX += speed * exitDirection
              newFacingRight = exitDirection > 0

              if (newX < -100 || newX > (currentCols + 1) * CELL_STRIDE) {
                return null // Remove this truck
              }
            }

            return {
              ...truck,
              x: newX,
              y: newY,
              phase: newPhase,
              rotation: newRotation,
              active: newActive,
              facingRight: newFacingRight,
            }
          })
          .filter(truck => truck !== null) as Truck[]
      })

      animationFrameRef.current = requestAnimationFrame(animateTrucks)
    }

    animationFrameRef.current = requestAnimationFrame(animateTrucks)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [trucks, gameActive])

  // Monitor pollution/smoke
  useEffect(() => {
    if (!gameActive) return
    const trees = grid.flat().filter(cell => cell.state === 'tree').length
    const saplings = grid.flat().filter(cell => cell.state === 'sapling').length
    const buildings = grid.flat().filter(cell => cell.state === 'building').length

    // Calculate pollution ratio
    const totalCells = currentRows * currentCols
    const buildingRatio = buildings / totalCells

    // Update smoke opacity based on building ratio
    if (buildingRatio >= SMOKE_START_RATIO) {
      const smokeProgress = (buildingRatio - SMOKE_START_RATIO) / (SMOKE_END_RATIO - SMOKE_START_RATIO)
      setSmokeOpacity(Math.min(smokeProgress * 0.8, 0.8)) // Max 80% opacity
    } else {
      setSmokeOpacity(0)
    }

    // Check for smoke ending (early game end)
    if (buildingRatio >= SMOKE_END_RATIO && gameActive) {
      const stillStandingCount = trees + saplings
      setStillStanding(stillStandingCount)

      // If visitor never interacted, silently restart
      if (!hasInteracted) {
        setTimeout(() => {
          startGame()
        }, 500)
      } else {
        setGameActive(false)
        setGameEnded(true)
        setEndingType('smoke')
      }
    }
  }, [grid, gameActive, hasInteracted, currentRows])

  // Bird animation - generate more birds initially
  // Birds spawn only in safe zone with padding from edges
  // Convert padding to percentage of 580px container height
  const paddingPercent = (GAME_FIELD_PADDING / 580) * 100
  const BIRD_MIN_Y = paddingPercent + 15 // % from top - padding + header clearance
  const BIRD_MAX_Y = 100 - paddingPercent // % from top - keeps birds within padding

  const generateInitialBirds = (): Bird[] => {
    // Calculate horizontal padding as percentage (container width includes 40px padding on each side already)
    const horizontalPaddingPercent = 5 // Additional % from edges for birds
    const BIRD_MIN_X = horizontalPaddingPercent
    const BIRD_MAX_X = 100 - horizontalPaddingPercent

    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: BIRD_MIN_X + Math.random() * (BIRD_MAX_X - BIRD_MIN_X),
      y: BIRD_MIN_Y + Math.random() * (BIRD_MAX_Y - BIRD_MIN_Y),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      rotation: Math.random() * 20 - 10,
    }))
  }

  useEffect(() => {
    if (!gameActive && !birdsMigrating) {
      setBirds(generateInitialBirds())
      return
    }

    const animateBirds = () => {
      setBirds(prev => {
        // If migrating, move all birds off to the right edge
        if (birdsMigrating) {
          return prev.map(bird => ({
            ...bird,
            x: bird.x + 2, // Faster movement during migration
            y: bird.y - 0.3, // Slight upward movement
            vx: 2,
            vy: -0.3,
            rotation: -15, // Consistent angle during migration
          }))
        }

        // Scale bird count DRAMATICALLY with tree count
        const trees = grid.flat().filter(cell => cell.state === 'tree').length
        const totalCells = currentRows * currentCols
        const treeRatio = trees / totalCells

        // VERY wide range: 2-3 birds when no trees, 25-35 when full of trees
        const targetBirdCount = Math.floor(2 + (treeRatio * 35))
        const clampedTarget = Math.max(2, Math.min(40, targetBirdCount))

        let newBirds = [...prev]

        // VERY aggressive spawning/removal to reach target quickly
        if (newBirds.length < clampedTarget && Math.random() < 0.25) {
          // Spawn in flocks (2-4 at once)
          const flockSize = Math.random() < 0.4 ? (Math.random() < 0.5 ? 3 : 2) : 1
          for (let i = 0; i < flockSize; i++) {
            newBirds.push({
              id: Date.now() + i + Math.random() * 1000,
              x: Math.random() < 0.5 ? -5 : 105,
              y: BIRD_MIN_Y + Math.random() * (BIRD_MAX_Y - BIRD_MIN_Y),
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.2,
              rotation: Math.random() * 20 - 10,
            })
          }
        } else if (newBirds.length > clampedTarget && Math.random() < 0.3) {
          // Remove even faster to match target
          newBirds = newBirds.slice(0, -2)
        }

        return newBirds
          .map(bird => ({
            ...bird,
            x: bird.x + bird.vx,
            y: Math.max(BIRD_MIN_Y, Math.min(BIRD_MAX_Y, bird.y + bird.vy)), // Clamp Y to safe zone
            vx: bird.vx + (Math.random() - 0.5) * 0.05,
            vy: bird.vy + (Math.random() - 0.5) * 0.05,
          }))
          .filter(bird => bird.x > -10 && bird.x < 110 && bird.y > BIRD_MIN_Y - 10 && bird.y < BIRD_MAX_Y + 10)
      })
    }

    const interval = setInterval(animateBirds, 50)
    return () => clearInterval(interval)
  }, [gameActive, birdsMigrating, grid, currentRows])

  // Plant tree
  const handleCellClick = (row: number, col: number) => {
    if (!gameActive) return

    const cell = grid[row][col]
    if (cell.state === 'empty') {
      // Mark that visitor has interacted
      setHasInteracted(true)
      // Increment planted count immediately
      setPlanted(prev => prev + 1)

      setShowPlantingHand({ row, col })
      setTimeout(() => setShowPlantingHand(null), 300)

      // Assign a random color from palette for this tree
      const treeColor = TREE_COLORS[Math.floor(Math.random() * TREE_COLORS.length)]
      // Assign a random variant (0-4) for tree shape
      const treeVariant = Math.floor(Math.random() * 5)

      setGrid(prevGrid => {
        const newGrid = [...prevGrid]
        newGrid[row][col] = { state: 'sapling', plantedAt: Date.now(), treeColor, variant: treeVariant }
        return newGrid
      })
    }
  }

  // Prevent SSR/hydration mismatch by waiting for client mount
  if (!mounted) {
    return (
      <div
        style={{
          width: '100%',
          height: '580px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ color: '#9CA3AF', fontSize: '14px' }}>Loading...</div>
      </div>
    )
  }

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          height: 'auto',
          position: 'relative',
          overflow: 'visible',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          marginBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 0,
        }}
      >
      {/* Center-aligned header block - location, tagline, instruction - positioned relative to outer container */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          maxWidth: isMobile ? 'calc(100% - 32px)' : '600px',
          zIndex: 50,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {/* Location and time */}
        <div
          style={{
            fontSize: isWideDesktop ? '18px' : '12px',
            color: '#6B7280',
            marginBottom: isMobile ? '8px' : isWideDesktop ? '24px' : '16px',
            lineHeight: '1.5',
          }}
        >
          {localRegion} • {localTime}
        </div>

        {/* Tagline - Fraunces font */}
        <div
          style={{
            fontSize: isMobile ? '16px' : isWideDesktop ? '27px' : '18px',
            fontWeight: 600,
            color: '#1C1917',
            marginBottom: isMobile ? '12px' : isWideDesktop ? '30px' : '20px',
            fontFamily: 'var(--font-fraunces), serif',
            lineHeight: '1.4',
          }}
        >
          Plant faster than the city can build. Good luck.
        </div>

        {/* Instruction line - only during gameplay */}
        {(gameActive || gameEnded) && !gameEnded && (
          <div
            style={{
              fontSize: isMobile ? '13px' : isWideDesktop ? '21px' : '14px',
              color: '#6B7280',
              marginBottom: isMobile ? '8px' : isWideDesktop ? '24px' : '16px',
              lineHeight: '1.5',
            }}
          >
            {isMobile ? 'Tap to plant trees.' : 'Click to plant trees.'}
          </div>
        )}
      </div>

      {/* Desktop-only: Learn More Button - Round, Italy lemon yellow to evening orange on click */}
      {!isMobile && !isTablet && (
        <button
          onClick={() => {
            setShowLearnMore(true)
            setButtonActive(true)
            setTimeout(() => setButtonActive(false), 300)
          }}
          style={{
            position: 'absolute',
            bottom: isWideDesktop ? '80px' : '60px',
            right: isWideDesktop ? '80px' : '40px',
            width: isWideDesktop ? '72px' : '64px',
            height: isWideDesktop ? '72px' : '64px',
            backgroundColor: buttonActive ? '#FF6B35' : '#FFF44F',
            border: 'none',
            borderRadius: '50%',
            fontSize: isWideDesktop ? '26px' : '24px',
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

      {/* Desktop-only: Stats panel - aligned with instruction text on desktop */}
      {gameActive && !gameEnded && !isMobile && !isTablet && (
        <div
          style={{
            position: 'absolute',
            top: isWideDesktop ? '115px' : '95px',
            right: isWideDesktop ? '80px' : '40px',
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
          }}
        >
          {/* Time with progress bar */}
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#1C1917',
                lineHeight: '1.2',
                marginBottom: '6px',
              }}
            >
              Time: {timeLeft}s
            </div>
            {/* Progress bar container */}
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: 'rgba(28, 25, 23, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              {/* Progress bar fill - blue line that fills as time runs out */}
              <div
                style={{
                  height: '100%',
                  width: `${((ROUND_DURATION - timeLeft) / ROUND_DURATION) * 100}%`,
                  backgroundColor: '#7EB3F5',
                  transition: 'width 0.3s ease-out',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>

          {/* Planted count */}
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1C1917',
              lineHeight: '1.2',
            }}
          >
            Planted: {planted}
          </div>

          {/* Skip to Work button - aligned below stats */}
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
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(28, 25, 23, 0.9)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Skip to Work →
          </button>
        </div>
      )}

      {/* Mobile/Tablet: Bottom horizontal strip with timer, planted count, skip button, and yellow ? button */}
      {(isMobile || isTablet) && gameActive && !gameEnded && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '16px' : '24px',
            left: isMobile ? '16px' : '32px',
            right: isMobile ? '16px' : '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid #D1D5DB',
            borderRadius: '16px',
            padding: isMobile ? '12px 16px' : '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '16px',
            zIndex: 100,
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Time and progress bar */}
          <div style={{ flex: 1, minWidth: isMobile ? '60px' : '80px' }}>
            <div
              style={{
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: 500,
                color: '#1C1917',
                lineHeight: '1.2',
                marginBottom: '4px',
              }}
            >
              Time: {timeLeft}s
            </div>
            <div
              style={{
                width: '100%',
                height: '3px',
                backgroundColor: 'rgba(28, 25, 23, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${((ROUND_DURATION - timeLeft) / ROUND_DURATION) * 100}%`,
                  backgroundColor: '#7EB3F5',
                  transition: 'width 0.3s ease-out',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>

          {/* Planted count */}
          <div
            style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 700,
              color: '#1C1917',
              whiteSpace: 'nowrap',
            }}
          >
            🌱 {planted}
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
              padding: isMobile ? '6px 10px' : '8px 12px',
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: isMobile ? '11px' : '12px',
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
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              backgroundColor: buttonActive ? '#FF6B35' : '#FFF44F',
              border: 'none',
              borderRadius: '50%',
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: 700,
              color: '#1C1917',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: buttonActive
                ? '0 4px 12px rgba(255, 107, 53, 0.5), 0 2px 6px rgba(0, 0, 0, 0.15)'
                : '0 3px 10px rgba(255, 244, 79, 0.5), 0 2px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Learn more about the game"
            title="Learn more about the game"
          >
            ?
          </button>
        </div>
      )}

      {/* Game area - always renders for ambient loop */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: isMobile ? '16px' : `${GAME_FIELD_PADDING}px`,
          paddingBottom: isMobile ? '90px' : isTablet ? '100px' : '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
          {/* Birds layer - inside bounded play area */}
          {birds.map(bird => (
            <BirdSilhouette key={bird.id} x={bird.x} y={bird.y} rotation={bird.rotation} />
          ))}

          {/* Grid - with consistent padding from all edges */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateRows: isMobile ? `repeat(${currentRows}, 48px)` : isWideDesktop ? `repeat(${currentRows}, 96px)` : `repeat(${currentRows}, 80px)`,
              gridTemplateColumns: isMobile ? `repeat(${currentCols}, 48px)` : isWideDesktop ? `repeat(${currentCols}, 96px)` : `repeat(${currentCols}, 80px)`,
              gap: isMobile ? '8px' : isWideDesktop ? '20px' : '16px',
              zIndex: 10,
              padding: 0,
              marginTop: isMobile ? '180px' : isWideDesktop ? '200px' : '160px',
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    position: 'relative',
                    width: isMobile ? '48px' : isWideDesktop ? '96px' : '80px',
                    height: isMobile ? '48px' : isWideDesktop ? '96px' : '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: cell.state === 'empty' && gameActive ? 'pointer' : 'default',
                    borderRadius: '4px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (cell.state === 'empty' && gameActive) {
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {/* Ground marker shown only for empty cells */}
                  {cell.state === 'empty' && <GroundMarker size={isMobile ? 48 : isWideDesktop ? 96 : 80} />}
                  {cell.state === 'tree' && <TreeIcon hasBird={cell.hasBird} variant={cell.variant || 0} size={isMobile ? 36 : isWideDesktop ? 72 : 60} />}
                  {cell.state === 'building' && <BuildingIcon variant={cell.variant || 0} size={isMobile ? 36 : isWideDesktop ? 72 : 60} />}
                  {cell.state === 'sapling' && <SaplingIcon variant={cell.variant || 0} size={isMobile ? 24 : isWideDesktop ? 48 : 40} />}
                  {showPlantingHand?.row === rowIndex && showPlantingHand?.col === colIndex && (
                    <PlantingHand show={true} />
                  )}
                </div>
              ))
            )}

            {/* Trucks overlay - multiple trucks can exist simultaneously */}
            {trucks.map(truck => {
              const truckWidth = isMobile ? 36 : isWideDesktop ? 72 : 60
              const truckHeight = isMobile ? 22 : isWideDesktop ? 43 : 36
              const offsetX = isMobile ? 18 : isWideDesktop ? 36 : 30
              const offsetY = isMobile ? 11 : isWideDesktop ? 21 : 18

              return (
                <img
                  key={truck.id}
                  src="/images/home/truck.svg?cache=july10-2026"
                  alt="truck"
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    transform: `translate(${truck.x - offsetX}px, ${truck.y - offsetY}px) scaleX(${truck.facingRight ? 1 : -1})`,
                    width: `${truckWidth}px`,
                    height: `${truckHeight}px`,
                    willChange: 'transform',
                    zIndex: 20,
                  }}
                />
              )
            })}
          </div>

          {/* Smoke overlay */}
          {smokeOpacity > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: `rgba(40, 40, 40, ${smokeOpacity})`,
                pointerEvents: 'none',
                zIndex: 30,
                transition: 'opacity 0.5s ease',
              }}
            />
          )}

          {/* End-of-round overlay - scrim + card */}
          {gameEnded && (
            <>
              {/* Dark scrim covering entire game container */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  zIndex: 100,
                  animation: 'fadeIn 0.3s ease-out',
                }}
              />

              {/* End state card */}
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
                  animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  {/* Stats line */}
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#E5E5E5', lineHeight: '1.5' }}>
                    You planted {planted} {planted === 1 ? 'tree' : 'trees'}. {stillStanding} {stillStanding === 1 ? 'is' : 'are'} still standing.
                  </div>

                  {/* Bridge line - varies based on ending type */}
                  <div style={{ fontSize: '14px', fontWeight: 400, color: '#9CA3AF', lineHeight: '1.5' }}>
                    {endingType === 'neutral'
                      ? 'The buildings had a head start this time.'
                      : "Small, deliberate choices — that's the whole job."}
                  </div>

                  {/* View case studies link - green color */}
                  <a
                    href="#case-studies"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#86C232',
                      textDecoration: 'none',
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottomColor = '#86C232'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottomColor = 'transparent'
                    }}
                  >
                    View my case studies
                  </a>

                  {/* Play again link - secondary grey color */}
                  <button
                    onClick={startGame}
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
              </div>
            </>
          )}
        </div>
      </div>

      {/* Learn More Popup Modal */}
      {showLearnMore && (
        <>
          {/* Backdrop */}
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
              animation: 'fadeIn 0.3s ease-out',
              cursor: 'pointer',
            }}
          />

          {/* Modal Content */}
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
              animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
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
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1C1917'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              ✕
            </button>

            {/* Title */}
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

            {/* Description */}
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
                In this game, you're planting trees (sustainable design decisions) while trucks automatically build structures (commercial pressure, technical debt, competing priorities).
              </p>
              <p style={{ marginBottom: '16px' }}>
                You have <strong>10 seconds</strong> to plant as many trees as you can. The trees grow, attract birds, and create an ecosystem. But if buildings take over, smoke fills the air.
              </p>
              <p style={{ marginBottom: '16px', color: '#6B7280' }}>
                <em>It's a metaphor for product design—balancing what's sustainable with what's urgent, making intentional choices before momentum decides for you.</em>
              </p>
            </div>

            {/* GIF Placeholder - Replace with your actual GIF */}
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
                <div>Replace this with your game explanation GIF</div>
                <div style={{ fontSize: '12px', color: '#D1D5DB' }}>
                  Add: &lt;img src="/images/game-explanation.gif" alt="How to play" /&gt;
                </div>
              </div>
              {/* Uncomment when you have the GIF ready:
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

            {/* CTA Button */}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1C1917'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Got it, let me play!
            </button>
          </div>
        </>
      )}
    </>
  )
}
