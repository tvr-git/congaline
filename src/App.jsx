import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ControlPanel from './components/ControlPanel.jsx'
import LinkedList from './components/LinkedList.jsx'
import Sidebar from './components/Sidebar.jsx'
import ResultSection from './components/ResultSection.jsx'
import SceneNarration from './components/SceneNarration.jsx'
import { findMiddleAlgorithm, simulateAlgorithm } from './utils/findMiddle.js'

function App() {
  const [numPeople, setNumPeople] = useState(5)
  const [headId, setHeadId] = useState('3')
  const [edges, setEdges] = useState([
    { from: '3', to: '1' },
    { from: '1', to: '4' },
    { from: '4', to: '2' },
    { from: '2', to: '5' },
    { from: '5', to: '-1' },
  ])
  const [nodes, setNodes] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1500)
  const [middleNode, setMiddleNode] = useState(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [visitedNodes, setVisitedNodes] = useState(new Set())
  const [showResult, setShowResult] = useState(false)
  const [scene, setScene] = useState('intro')
  const animationRef = useRef(null)

  // Build nodes list when edges or headId changes
  useEffect(() => {
    const nodeList = findMiddleAlgorithm(headId, edges)
    setNodes(nodeList)
    setSteps([])
    setCurrentStep(0)
    setCurrentStepIndex(0)
    setMiddleNode(null)
    setIsPlaying(false)
    setIsPaused(false)
    setVisitedNodes(new Set())
    setShowResult(false)
    setScene('intro')
  }, [headId, edges])

  // Generate steps when nodes are ready
  useEffect(() => {
    if (nodes.length > 0 && steps.length === 0) {
      const algorithmSteps = simulateAlgorithm(nodes)
      setSteps(algorithmSteps)
    }
  }, [nodes])

  const runVisualization = () => {
    if (nodes.length === 0 || steps.length === 0) return
    
    // If paused, resume from current step
    if (isPaused) {
      setIsPaused(false)
      
      let stepIndex = currentStepIndex
      
      const animate = () => {
        if (isPaused) {
          animationRef.current = setTimeout(animate, 100)
          return
        }
        
        if (stepIndex < steps.length - 1) {
          stepIndex++
          setCurrentStepIndex(stepIndex)
          const step = steps[stepIndex]
          
          setCurrentStep(stepIndex)
          
          // Update scene to "moving" after first step
          if (stepIndex === 1) {
            setScene('moving')
          }
          
          // Update visited nodes
          setVisitedNodes(prev => {
            const visited = new Set(prev)
            if (step.tortoisePos >= 0) visited.add(step.tortoisePos)
            if (step.harePos >= 0) visited.add(step.harePos)
            return visited
          })
          
          // Check if complete
          if (step.isComplete) {
            setScene('reveal') // Set scene to reveal when middle is found
            setMiddleNode(step.middleNode)
            setIsPlaying(false)
            setTimeout(() => {
              setShowResult(true)
            }, 1000)
          } else {
            animationRef.current = setTimeout(animate, speed)
          }
        }
      }
      
      animationRef.current = setTimeout(animate, speed)
      return
    }
    
    // If already playing, do nothing
    if (isPlaying && !isPaused) {
      return
    }
    
    // Start from beginning
    setIsPlaying(true)
    setIsPaused(false)
    setCurrentStep(0)
    setCurrentStepIndex(0)
    setMiddleNode(null)
    setVisitedNodes(new Set([0]))
    setShowResult(false)
    setScene('start') // Set scene to start when animation begins
    
    let stepIndex = 0
    
    const animate = () => {
      if (isPaused) {
        animationRef.current = setTimeout(animate, 100)
        return
      }
      
      if (stepIndex < steps.length - 1) {
        stepIndex++
        setCurrentStepIndex(stepIndex)
        const step = steps[stepIndex]
        
        setCurrentStep(stepIndex)
        
        // Update scene to "moving" after first step
        if (stepIndex === 1) {
          setScene('moving')
        }
        
        // Update visited nodes
        setVisitedNodes(prev => {
          const visited = new Set(prev)
          if (step.tortoisePos >= 0) visited.add(step.tortoisePos)
          if (step.harePos >= 0) visited.add(step.harePos)
          return visited
        })
        
        // Check if complete
        if (step.isComplete) {
          setScene('reveal') // Set scene to reveal when middle is found
          setMiddleNode(step.middleNode)
          setIsPlaying(false)
          setTimeout(() => {
            setShowResult(true)
          }, 1000)
        } else {
          animationRef.current = setTimeout(animate, speed)
        }
      }
    }
    
    animationRef.current = setTimeout(animate, speed)
  }

  const pauseVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    setIsPaused(true)
  }

  const resetVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentStep(0)
    setCurrentStepIndex(0)
    setMiddleNode(null)
    setVisitedNodes(new Set([0]))
    setShowResult(false)
    setScene('intro') // Reset scene to intro
  }

  const handleRestart = () => {
    resetVisualization()
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header */}
      <header className="relative z-10 text-center py-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-3 tracking-tight"
        >
          Find Your Vibe Tribe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-purple-200/90 mb-2 font-medium"
        >
          The Middle Person Mystery
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base text-purple-200/70"
        >
          Discover the middle dancer in the conga line using the Tortoise & Hare algorithm
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        {!showResult ? (
          <div className="space-y-6">
            {/* Top Row: Control Panel and Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Control Panel - Left Side */}
              <div className="lg:col-span-4">
                <ControlPanel
                  numPeople={numPeople}
                  setNumPeople={setNumPeople}
                  headId={headId}
                  setHeadId={setHeadId}
                  edges={edges}
                  setEdges={setEdges}
                  onRun={runVisualization}
                  onPause={pauseVisualization}
                  onReset={resetVisualization}
                  isPlaying={isPlaying}
                  isPaused={isPaused}
                  speed={speed}
                  setSpeed={setSpeed}
                />
              </div>

              {/* Visualization - Takes up remaining space */}
              <div className="lg:col-span-8">
                <LinkedList
                  nodes={nodes}
                  currentStep={currentStep}
                  steps={steps}
                  isPlaying={isPlaying}
                  middleNode={middleNode}
                  visitedNodes={visitedNodes}
                />
                {/* Scene Narration */}
                <SceneNarration scene={scene} />
              </div>
            </div>

            {/* Bottom Row: Sidebar - Full Width Below */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="hidden lg:block lg:col-span-4">
                {/* Empty space to align with control panel on large screens */}
              </div>
              <div className="lg:col-span-8">
                <Sidebar
                  currentStep={currentStep}
                  steps={steps}
                  isPlaying={isPlaying}
                  nodes={nodes}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ResultSection
              middleNode={middleNode}
              onRestart={handleRestart}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
