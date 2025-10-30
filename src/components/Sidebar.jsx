import { motion } from 'framer-motion'

const Sidebar = ({ currentStep, steps, isPlaying, nodes }) => {
  const currentState = steps[currentStep] || { tortoisePos: -1, harePos: -1, description: '' }
  
  const pseudocode = [
    { line: '1. Initialize tortoise = head, hare = head', active: currentStep === 0 },
    { line: '2. While hare != null AND hare.next != null:', active: currentStep > 0 && !currentState.isComplete },
    { line: '   a. Move tortoise = tortoise.next (1 step)', active: currentState.tortoisePos !== -1 && !currentState.isComplete },
    { line: '   b. Move hare = hare.next.next (2 steps)', active: currentState.harePos !== -1 && !currentState.isComplete },
    { line: '3. Return tortoise (middle node)', active: currentState.isComplete },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10 h-full"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Algorithm Status
      </h2>

      {/* Current Step Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-200 text-sm font-semibold">Iteration:</span>
          <span className="text-white text-lg font-bold">{currentStep + 1} / {steps.length}</span>
        </div>
        {currentState.description && (
          <p className="text-white text-sm mt-2 leading-relaxed">{currentState.description}</p>
        )}
      </div>

      {/* Pointer Positions */}
      <div className="mb-6 space-y-3">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-400/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🐢</span>
            <span className="text-blue-200 font-semibold">Slow Pointer (Tortoise)</span>
          </div>
          <div className="text-white text-sm ml-8">
            Position: {currentState.tortoisePos >= 0 ? currentState.tortoisePos : '-'}
            {currentState.tortoisePos >= 0 && nodes[currentState.tortoisePos] && (
              <span className="text-blue-300 font-bold"> → Person {nodes[currentState.tortoisePos].id}</span>
            )}
          </div>
        </div>

        <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-400/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🐇</span>
            <span className="text-pink-200 font-semibold">Fast Pointer (Hare)</span>
          </div>
          <div className="text-white text-sm ml-8">
            Position: {currentState.harePos >= 0 ? currentState.harePos : '-'}
            {currentState.harePos >= 0 && nodes[currentState.harePos] && (
              <span className="text-pink-300 font-bold"> → Person {nodes[currentState.harePos].id}</span>
            )}
          </div>
        </div>
      </div>

      {/* Pseudocode */}
      <div className="mb-6">
        <h3 className="text-white font-bold mb-3 text-lg">Pseudocode</h3>
        <div className="space-y-2 bg-black/20 rounded-xl p-4 border border-white/10">
          {pseudocode.map((line, index) => (
            <motion.div
              key={index}
              animate={{
                backgroundColor: line.active ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                borderLeft: line.active ? '3px solid rgba(168, 85, 247, 0.8)' : '3px solid transparent',
              }}
              className="p-2 rounded transition-all"
            >
              <code className={`text-sm ${line.active ? 'text-purple-200 font-semibold' : 'text-gray-400'}`}>
                {line.line}
              </code>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-400/20">
        <h3 className="text-white font-bold mb-2 text-sm">Complexity</h3>
        <ul className="text-purple-200 text-xs space-y-1">
          <li>• Time: <span className="text-white font-semibold">O(N)</span> - Single pass through list</li>
          <li>• Space: <span className="text-white font-semibold">O(1)</span> - Only two pointers</li>
        </ul>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/10">
        <h3 className="text-white font-bold mb-3 text-sm">Color Legend</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-600/40 border border-gray-500/30"></div>
            <span className="text-gray-300">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <span className="text-blue-300">Slow Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-pink-400 to-pink-600"></div>
            <span className="text-pink-300">Fast Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-green-600"></div>
            <span className="text-green-300">Middle Node</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar

