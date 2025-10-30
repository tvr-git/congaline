import { useState } from 'react'
import { motion } from 'framer-motion'
import InputForm from './components/InputForm.jsx'
import Visualizer from './components/Visualizer.jsx'
import ResultSection from './components/ResultSection.jsx'

function App() {
  const [headId, setHeadId] = useState('A')
  const [edges, setEdges] = useState([
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'E', to: '-1' },
  ])
  const [numNodes, setNumNodes] = useState(5)
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [middleNode, setMiddleNode] = useState(null)

  const handleVisualize = () => {
    setShowVisualizer(true)
    setShowResult(false)
    setMiddleNode(null)
  }

  const handleComplete = (node) => {
    setMiddleNode(node)
    setShowResult(true)
  }

  const handleRestart = () => {
    setShowVisualizer(false)
    setShowResult(false)
    setMiddleNode(null)
  }

  const scrollToInput = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Landing Page / Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center min-h-screen px-4 py-20"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            🐢🐇 The Conga Line Finder
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-semibold">
            Watch how the Tortoise & Hare algorithm finds the middle dancer!
          </p>
        </motion.div>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToInput}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          🎉 Start Visualization 🎉
        </motion.button>
      </motion.div>

      {/* Input Section */}
      <div id="input-section" className="px-4 py-12">
        {!showVisualizer && (
          <InputForm
            onVisualize={handleVisualize}
            headId={headId}
            setHeadId={setHeadId}
            edges={edges}
            setEdges={setEdges}
            numNodes={numNodes}
            setNumNodes={setNumNodes}
          />
        )}
      </div>

      {/* Visualization Section */}
      {showVisualizer && !showResult && (
        <div className="px-4 py-12">
          <Visualizer
            headId={headId}
            edges={edges}
            onComplete={handleComplete}
          />
        </div>
      )}

      {/* Result Section */}
      {showResult && middleNode && (
        <div className="px-4 py-12">
          <ResultSection
            middleNode={middleNode}
            onRestart={handleRestart}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-white/60 py-8 px-4">
        <p className="text-lg">
          Time Complexity: O(N) | Space Complexity: O(1)
        </p>
        <p className="text-sm mt-2">
          Watch our 🐢 slow dancer and 🐇 fast dancer groove their way to find the middle!
        </p>
      </footer>
    </div>
  )
}

export default App

