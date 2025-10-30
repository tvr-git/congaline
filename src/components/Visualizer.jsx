import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { TortoisePointer, HarePointer } from './Pointers.jsx'

const Visualizer = ({ headId, edges, onComplete, onRestart }) => {
  const [nodes, setNodes] = useState([])
  const [tortoisePos, setTortoisePos] = useState(-1)
  const [harePos, setHarePos] = useState(-1)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1500)
  const [middleNode, setMiddleNode] = useState(null)
  const [explanation, setExplanation] = useState('')
  const [visitedNodes, setVisitedNodes] = useState(new Set())
  const [highlightedConnections, setHighlightedConnections] = useState(new Set())
  const hasStartedRef = useRef(false)
  const animationRef = useRef(null)
  const nodeRefs = useRef({})

  useEffect(() => {
    // Build linked list from edges
    const nodeMap = new Map()
    
    // Create all nodes
    const allNodes = new Set()
    edges.forEach(edge => {
      if (edge.from) allNodes.add(edge.from)
      if (edge.to && edge.to !== '-1') allNodes.add(edge.to)
    })
    
    // Create node objects
    allNodes.forEach(nodeId => {
      nodeMap.set(nodeId, { id: nodeId, next: null })
    })
    
    // Connect nodes
    edges.forEach(edge => {
      if (edge.from && edge.to) {
        const fromNode = nodeMap.get(edge.from)
        if (fromNode && edge.to !== '-1') {
          fromNode.next = edge.to
        }
      }
    })
    
    // Build ordered list starting from head
    const orderedList = []
    let current = headId
    const visited = new Set()
    
    while (current && current !== '-1' && !visited.has(current)) {
      visited.add(current)
      orderedList.push(nodeMap.get(current))
      current = nodeMap.get(current)?.next || null
    }
    
    setNodes(orderedList)
    hasStartedRef.current = false
    setIsPaused(false)
    setVisitedNodes(new Set())
    setHighlightedConnections(new Set())
  }, [headId, edges])

  const startVisualization = () => {
    if (nodes.length === 0 || hasStartedRef.current) return
    
    hasStartedRef.current = true
    setIsPlaying(true)
    setIsPaused(false)
    setTortoisePos(0)
    setHarePos(0)
    setStep(0)
    setMiddleNode(null)
    setVisitedNodes(new Set([0]))
    setHighlightedConnections(new Set())
    setExplanation('Starting at the head of the list. Both pointers begin at position 0.')
    
    // Simulate algorithm
    let tortoise = 0
    let hare = 0
    let stepCount = 0
    const visited = new Set([0])
    const highlighted = new Set()
    
    const animate = () => {
      if (isPaused) {
        animationRef.current = setTimeout(animate, 100)
        return
      }
      
      // Highlight connection being traversed
      if (tortoise < nodes.length - 1) {
        highlighted.add(`${tortoise}-${tortoise + 1}`)
      }
      if (hare < nodes.length - 1) {
        highlighted.add(`${hare}-${hare + 1}`)
        if (hare + 1 < nodes.length - 1) {
          highlighted.add(`${hare + 1}-${hare + 2}`)
        }
      }
      
      // Move tortoise one step
      tortoise++
      // Move hare two steps
      hare = Math.min(hare + 2, nodes.length - 1)
      
      visited.add(tortoise)
      visited.add(hare)
      
      stepCount++
      setTortoisePos(tortoise)
      setHarePos(hare)
      setStep(stepCount)
      setVisitedNodes(new Set(visited))
      setHighlightedConnections(new Set(highlighted))
      
      // Set explanation
      if (hare >= nodes.length - 1 || hare + 2 > nodes.length) {
        setExplanation(`Hare reached the end! Tortoise is at position ${tortoise} (${nodes[tortoise]?.id}), which is the middle of the list.`)
      } else {
        setExplanation(`Step ${stepCount}: Tortoise moves 1 step to position ${tortoise} (${nodes[tortoise]?.id}), Hare moves 2 steps to position ${hare} (${nodes[hare]?.id}).`)
      }
      
      // Check if hare has reached or passed the end
      if (hare >= nodes.length - 1 || hare + 2 > nodes.length) {
        // Hare reached the end, tortoise is at the middle
        setTimeout(() => {
          setMiddleNode(nodes[tortoise])
          setIsPlaying(false)
          onComplete(nodes[tortoise])
        }, 500)
      } else {
        // Continue animation
        animationRef.current = setTimeout(animate, speed)
      }
    }
    
    // Start animation after initial delay
    animationRef.current = setTimeout(animate, speed)
  }

  const pauseVisualization = () => {
    setIsPaused(true)
  }

  const resumeVisualization = () => {
    setIsPaused(false)
  }

  const resetVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    hasStartedRef.current = false
    setTortoisePos(-1)
    setHarePos(-1)
    setStep(0)
    setMiddleNode(null)
    setIsPlaying(false)
    setIsPaused(false)
    setExplanation('')
    setVisitedNodes(new Set())
    setHighlightedConnections(new Set())
  }

  useEffect(() => {
    if (nodes.length > 0 && tortoisePos === -1 && !hasStartedRef.current) {
      // Auto-start visualization when nodes are ready
      const timer = setTimeout(() => {
        startVisualization()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [nodes, tortoisePos])

  const getNodeColor = (index) => {
    if (middleNode && nodes[index]?.id === middleNode.id) {
      return 'bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600'
    }
    if (index === tortoisePos) {
      return 'bg-gradient-to-br from-green-400 to-green-600'
    }
    if (index === harePos) {
      return 'bg-gradient-to-br from-pink-400 to-pink-600'
    }
    if (visitedNodes.has(index)) {
      return index % 2 === 0 
        ? 'bg-gradient-to-br from-blue-500/60 to-blue-600/60' 
        : 'bg-gradient-to-br from-purple-500/60 to-purple-600/60'
    }
    return index % 2 === 0 
      ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/30' 
      : 'bg-gradient-to-br from-purple-500/30 to-purple-600/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-6xl mx-auto space-y-6"
    >
      {/* Control Panel */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-3">
            {isPlaying && !isPaused && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseVisualization}
                className="px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-xl font-semibold shadow-lg transition-all border border-amber-400/30 hover:border-amber-400/50"
              >
                Pause
              </motion.button>
            )}
            {isPaused && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resumeVisualization}
                className="px-5 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-xl font-semibold shadow-lg transition-all border border-green-400/30 hover:border-green-400/50"
              >
                Resume
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetVisualization()
                setTimeout(() => {
                  startVisualization()
                }, 100)
              }}
              disabled={isPlaying && !isPaused}
              className="px-5 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-xl font-semibold shadow-lg transition-all border border-blue-400/30 hover:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Restart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="px-5 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-xl font-semibold shadow-lg transition-all border border-purple-400/30 hover:border-purple-400/50"
            >
              ← Back
            </motion.button>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/10">
            <span className="text-purple-200 text-sm font-medium">Speed:</span>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-32 accent-purple-500"
              disabled={!isPlaying}
            />
            <span className="text-purple-200 text-sm font-medium min-w-[50px]">{((3000 - speed) / 300 + 1).toFixed(1)}x</span>
          </div>
        </div>

        {/* Step Explanation */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20"
          >
            <p className="text-white text-base font-medium leading-relaxed">{explanation}</p>
            {step > 0 && (
              <p className="text-purple-300/70 text-sm mt-2">Step {step}</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Visualization Area */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-visible">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 p-8 min-h-[250px] relative">
          {nodes.map((node, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 md:gap-6 relative"
              ref={el => nodeRefs.current[index] = el}
            >
              {/* Tortoise Pointer */}
              {index === tortoisePos && (
                <TortoisePointer position={index} isActive={isPlaying} />
              )}
              
              {/* Hare Pointer */}
              {index === harePos && (
                <HarePointer position={index} isActive={isPlaying} />
              )}
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: index === tortoisePos || index === harePos ? [0, -8, 0] : 0,
                }}
                transition={{ 
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 200,
                  y: {
                    duration: 0.6,
                    repeat: index === tortoisePos || index === harePos ? Infinity : 0,
                    repeatType: 'reverse',
                  },
                }}
                className={`relative w-24 h-24 md:w-28 md:h-28 rounded-2xl ${getNodeColor(index)} flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-2xl transition-all duration-300 border-2 ${
                  index === tortoisePos ? 'border-green-300 shadow-green-500/50' : 
                  index === harePos ? 'border-pink-300 shadow-pink-500/50' : 
                  middleNode && node.id === middleNode.id ? 'border-amber-300 shadow-amber-500/70' : 'border-white/20'
                }`}
                style={{
                  boxShadow: middleNode && node.id === middleNode.id
                    ? '0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)'
                    : index === tortoisePos || index === harePos
                    ? `0 0 30px ${index === tortoisePos ? 'rgba(34, 197, 94, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`
                    : '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Slicing effect when visited */}
                {visitedNodes.has(index) && index !== tortoisePos && index !== harePos && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ transformOrigin: 'left' }}
                  />
                )}
                
                {/* Slice line effect */}
                {(index === tortoisePos || index === harePos) && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`absolute inset-0 rounded-2xl border-2 ${
                      index === tortoisePos ? 'border-green-400' : 'border-pink-400'
                    }`}
                    style={{
                      boxShadow: `0 0 20px ${index === tortoisePos ? 'rgba(16, 185, 129, 0.8)' : 'rgba(236, 72, 153, 0.8)'}`,
                    }}
                  />
                )}
                
                {/* Node ID */}
                <span className="relative z-10 drop-shadow-lg font-extrabold">{node.id}</span>
                
                {/* Glow effect for active nodes */}
                {(index === tortoisePos || index === harePos) && (
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className={`absolute inset-0 rounded-2xl blur-xl ${
                      index === tortoisePos ? 'bg-green-400' : 'bg-pink-400'
                    } opacity-50`}
                  />
                )}
              </motion.div>
              
              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: highlightedConnections.has(`${index}-${index + 1}`) ? 1 : 0.5,
                    x: 0,
                    scale: highlightedConnections.has(`${index}-${index + 1}`) ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ 
                    delay: index * 0.08 + 0.15,
                    scale: {
                      duration: 0.5,
                      repeat: highlightedConnections.has(`${index}-${index + 1}`) ? Infinity : 0,
                    },
                  }}
                  className={`text-3xl md:text-4xl font-bold transition-all ${
                    highlightedConnections.has(`${index}-${index + 1}`) 
                      ? 'text-white' 
                      : 'text-purple-300'
                  }`}
                  style={{
                    filter: highlightedConnections.has(`${index}-${index + 1}`) 
                      ? 'drop-shadow(0 0 10px currentColor)' 
                      : 'none',
                  }}
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Algorithm Info */}
        <div className="mt-8 p-5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-400/20">
          <h3 className="text-white font-bold mb-3 text-lg">Algorithm Overview</h3>
          <ul className="text-purple-200 text-sm space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">●</span>
              <span>Tortoise pointer moves one step at a time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">●</span>
              <span>Hare pointer moves two steps at a time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-300 mt-1">●</span>
              <span>When Hare reaches the end, Tortoise is at the middle node</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 mt-1">●</span>
              <span>Time Complexity: O(N) | Space Complexity: O(1)</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default Visualizer
