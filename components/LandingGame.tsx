'use client'
import { useState, useEffect, useRef } from 'react'

type CellState = 'empty' | 'sapling' | 'tree' | 'building'

interface Cell {
  state: CellState
  plantedAt?: number
  stressed?: boolean
  treeColor?: string
  hasBird?: boolean
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

const GRID_ROWS = 5
const GRID_COLS = 7
const SAPLING_GROW_TIME = 1000 // Fast tree growth
const TRUCK_SPAWN_INTERVAL = 750 // Relentless truck spawning - dominates if idle
const ROUND_DURATION = 10 // Quick 10-second rounds

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

const TreeIcon = ({ hasBird = false, size = 60, seed = 0 }: { hasBird?: boolean; size?: number; seed?: number }) => {
  // Pick one of the 4 tree SVGs based on seed
  const treeVariants = ['Tree 01.svg', 'Tree 02.svg', 'Tree 03.svg', 'Tree 04.svg']
  const treeFile = treeVariants[seed % 4]

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <img
        src={`/images/home/${treeFile}`}
        alt="tree"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      {hasBird && (
        <img
          src="/images/home/Birds.svg"
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

const BuildingIcon = ({ size = 60 }: { size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Clean black square with sharp edges */}
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        fill="#000000"
      />
    </svg>
  )
}

const SaplingIcon = ({ size = 40, seed = 0 }: { size?: number; seed?: number }) => {
  // Use same tree SVGs but smaller for saplings
  const treeVariants = ['Tree 01.svg', 'Tree 02.svg', 'Tree 03.svg', 'Tree 04.svg']
  const treeFile = treeVariants[seed % 4]

  return (
    <img
      src={`/images/home/${treeFile}`}
      alt="sapling"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        opacity: 0.7,
      }}
    />
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
      src="/images/home/Birds.svg"
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

export default function LandingGame() {
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
  const [gameActive, setGameActive] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [showPlantingHand, setShowPlantingHand] = useState<{row: number, col: number} | null>(null)
  const [birds, setBirds] = useState<Bird[]>([])
  const [localTime, setLocalTime] = useState('')
  const [localRegion, setLocalRegion] = useState('')
  const [smokeOpacity, setSmokeOpacity] = useState(0)
  const [endingType, setEndingType] = useState<'smoke' | 'migration' | 'neutral' | null>(null)
  const [birdsMigrating, setBirdsMigrating] = useState(false)
  const animationFrameRef = useRef<number>()

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
    setGameActive(true)
    setGameEnded(false)
    setTimeLeft(ROUND_DURATION)
    setScore(0)
    setFinalScore(0)
    setTrucks([])
    setSmokeOpacity(0)
    setEndingType(null)
    setBirdsMigrating(false)
    setGrid(
      Array(GRID_ROWS)
        .fill(null)
        .map(() =>
          Array(GRID_COLS)
            .fill(null)
            .map(() => ({ state: 'empty' }))
        )
    )
    setBirds(generateInitialBirds())
  }

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return

    if (timeLeft <= 0) {
      // Round ended by timer
      const trees = grid.flat().filter(cell => cell.state === 'tree').length
      const buildings = grid.flat().filter(cell => cell.state === 'building').length
      const finalScoreValue = trees - buildings

      setFinalScore(finalScoreValue)

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
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, gameActive])

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
      const targetRow = Math.floor(Math.random() * GRID_ROWS)
      const targetCol = Math.floor(Math.random() * GRID_COLS)

      // Start from a random edge (left or right)
      const fromLeft = Math.random() < 0.5
      const startRow = Math.floor(Math.random() * GRID_ROWS)
      const startCol = fromLeft ? -1 : GRID_COLS

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
  }, [gameActive])

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
                      newGrid[truck.row][truck.targetCol] = { state: 'building' }
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

              if (newX < -100 || newX > (GRID_COLS + 1) * CELL_STRIDE) {
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

  // Calculate score and monitor pollution/smoke
  useEffect(() => {
    if (!gameActive) return
    const trees = grid.flat().filter(cell => cell.state === 'tree').length
    const buildings = grid.flat().filter(cell => cell.state === 'building').length
    setScore(trees - buildings)

    // Calculate pollution ratio
    const totalCells = GRID_ROWS * GRID_COLS
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
      setGameActive(false)
      setGameEnded(true)
      setFinalScore(trees - buildings)
      setEndingType('smoke')
    }
  }, [grid, gameActive])

  // Bird animation - generate more birds initially
  // Birds spawn only in safe zone below header (20-80% of container height)
  const BIRD_MIN_Y = 20 // % from top - keeps birds below header
  const BIRD_MAX_Y = 80 // % from top - keeps birds in visible area

  const generateInitialBirds = (): Bird[] => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
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
        const totalCells = GRID_ROWS * GRID_COLS
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
  }, [gameActive, birdsMigrating, grid])

  // Plant tree
  const handleCellClick = (row: number, col: number) => {
    if (!gameActive) return

    const cell = grid[row][col]
    if (cell.state === 'empty') {
      setShowPlantingHand({ row, col })
      setTimeout(() => setShowPlantingHand(null), 300)

      // Assign a random color from palette for this tree
      const treeColor = TREE_COLORS[Math.floor(Math.random() * TREE_COLORS.length)]

      setGrid(prevGrid => {
        const newGrid = [...prevGrid]
        newGrid[row][col] = { state: 'sapling', plantedAt: Date.now(), treeColor }
        return newGrid
      })
    }
  }

  return (
    <>
      {/* Keyframe animations for end card */}
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
          height: '580px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
      {/* Birds layer */}
      {birds.map(bird => (
        <BirdSilhouette key={bird.id} x={bird.x} y={bird.y} rotation={bird.rotation} />
      ))}

      {/* Centered header block - location, tagline, instruction only */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
          zIndex: 50,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {/* Location and time */}
        <div
          style={{
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '16px',
            lineHeight: '1.5',
          }}
        >
          {localRegion} • {localTime}
        </div>

        {/* Tagline - Fraunces font */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1C1917',
            marginBottom: '20px',
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
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}
          >
            Click to plant trees.
          </div>
        )}
      </div>

      {/* Stats panel - top-right corner, dark background */}
      {(gameActive || gameEnded) && !gameEnded && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            backgroundColor: '#1C1917',
            borderRadius: '12px',
            padding: '12px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 50,
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {/* Time */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#E5E5E5',
              lineHeight: '1.2',
            }}
          >
            Time: {timeLeft}s
          </div>

          {/* Score - more prominent */}
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: '1.2',
            }}
          >
            Score: {score > 0 ? '+' : ''}{score}
          </div>
        </div>
      )}

      {/* Game area - separate from header */}
      {!gameActive && !gameEnded ? (
        <button
          onClick={startGame}
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 600,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Start Game
        </button>
      ) : (
        <>
          {/* Grid - with generous top margin and padding from edges */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateRows: `repeat(${GRID_ROWS}, 80px)`,
              gridTemplateColumns: `repeat(${GRID_COLS}, 80px)`,
              gap: '16px',
              zIndex: 10,
              marginTop: '110px',
              padding: '60px 30px 30px 30px',
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
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
                  {cell.state === 'tree' && <TreeIcon hasBird={cell.hasBird} seed={rowIndex * GRID_COLS + colIndex} />}
                  {cell.state === 'building' && <BuildingIcon />}
                  {cell.state === 'sapling' && <SaplingIcon seed={rowIndex * GRID_COLS + colIndex + 2000} />}
                  {showPlantingHand?.row === rowIndex && showPlantingHand?.col === colIndex && (
                    <PlantingHand show={true} />
                  )}
                </div>
              ))
            )}

            {/* Trucks overlay - multiple trucks can exist simultaneously */}
            {trucks.map(truck => (
              <img
                key={truck.id}
                src="/images/home/truck.svg"
                alt="truck"
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  transform: `translate(${truck.x - 30}px, ${truck.y - 18}px) scaleX(${truck.facingRight ? -1 : 1})`,
                  width: '60px',
                  height: '36px',
                  willChange: 'transform',
                  zIndex: 20,
                }}
              />
            ))}
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
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#1C1917',
                  borderRadius: '16px',
                  padding: '40px 48px',
                  textAlign: 'center',
                  zIndex: 101,
                  fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  minWidth: '320px',
                  animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  {/* Final score - large and prominent */}
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', lineHeight: '1.2' }}>
                    Score: {finalScore > 0 ? '+' : ''}{finalScore}
                  </div>

                  {/* Status message */}
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#E5E5E5', lineHeight: '1.4' }}>
                    {endingType === 'smoke'
                      ? 'Overwhelmed by pollution'
                      : endingType === 'migration'
                      ? "Birds found a safe place!"
                      : finalScore > 5
                      ? 'Nature persists!'
                      : finalScore > 0
                      ? 'A fighting chance.'
                      : 'The city wins.'}
                  </div>

                  {/* Subtitle message */}
                  {endingType === 'smoke' && (
                    <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
                      The city consumed the field.
                    </div>
                  )}

                  {/* Play again button */}
                  <button
                    onClick={startGame}
                    style={{
                      padding: '14px 32px',
                      fontSize: '15px',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      color: '#1C1917',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      marginTop: '8px',
                    }}
                  >
                    Plant again
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      </div>
    </>
  )
}
