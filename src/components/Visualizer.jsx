import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const Visualizer = ({ headId, edges, onComplete }) => {
  const [nodes, setNodes] = useState([])
  const [tortoisePos, setTortoisePos] = useState(-1)
  const [harePos, setHarePos] = useState(-1)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [middleNode, setMiddleNode] = useState(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // Build linked list from edges
    const nodeMap = new Map()
    const nodeList = []
    
    // Create all nodes
    const allNodes = new Set()
    edges.forEach(edge => {
      if (edge.from) allNodes.add(edge.from)
      if (edge.to && edge.to !== '-1') allNodes.add(edge.to)
    })
    
    // Create node objects
    allNodes.forEach(nodeId => {
      nodeMap.set(nodeId, { id: nodeId, next: null })
      nodeList.push({ id: nodeId, next: null })
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
  }, [headId, edges])

  const startVisualization = () => {
    if (nodes.length === 0 || hasStartedRef.current) return
    
    hasStartedRef.current = true
    setIsPlaying(true)
    setTortoisePos(0)
    setHarePos(0)
    setStep(0)
    setMiddleNode(null)
    
    // Simulate algorithm
    let tortoise = 0
    let hare = 0
    let stepCount = 0
    
    const animate = () => {
      // Move tortoise one step
      tortoise++
      // Move hare two steps
      hare = Math.min(hare + 2, nodes.length - 1)
      
      stepCount++
      setTortoisePos(tortoise)
      setHarePos(hare)
      setStep(stepCount)
      
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
        setTimeout(animate, 1500)
      }
    }
    
    // Start animation after initial delay
    setTimeout(animate, 1500)
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
      return 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600'
    }
    if (index === tortoisePos) {
      return 'bg-green-500'
    }
    if (index === harePos) {
      return 'bg-pink-500'
    }
    return index % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">🎭 Watch the Dance!</h2>
      
      <div className="mb-6 text-center">
        <p className="text-white text-lg mb-2">
          Watch our 🐢 slow dancer and 🐇 fast dancer groove their way to find the middle!
        </p>
        {tortoisePos >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-xl font-semibold mt-4 p-4 bg-black/30 rounded-lg"
          >
            <span className="text-green-400">🐢 Slow at: {nodes[tortoisePos]?.id || '-'}</span>
            {' | '}
            <span className="text-pink-400">🐇 Fast at: {nodes[harePos]?.id || '-'}</span>
            {step > 0 && <span className="block text-sm mt-2 text-white/70">Step {step}</span>}
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 p-6 min-h-[200px]">
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                boxShadow: middleNode && node.id === middleNode.id
                  ? '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 20, 147, 0.6)'
                  : '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200
              }}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full ${getNodeColor(index)} flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg transition-all duration-300`}
            >
              {index === tortoisePos && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-8 text-3xl"
                >
                  🐢
                </motion.div>
              )}
              {index === harePos && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-8 text-3xl"
                >
                  🐇
                </motion.div>
              )}
              {node.id}
            </motion.div>
            {index < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-white text-2xl md:text-3xl font-bold"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {nodes.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            hasStartedRef.current = false
            setTortoisePos(-1)
            setHarePos(-1)
            setStep(0)
            setMiddleNode(null)
            setIsPlaying(false)
            setTimeout(() => {
              startVisualization()
            }, 100)
          }}
          disabled={isPlaying}
          className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? '⏳ Visualizing...' : '🔄 Restart Visualization'}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Visualizer

