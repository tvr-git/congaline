import { motion } from 'framer-motion'

const ControlPanel = ({ 
  numPeople, 
  setNumPeople, 
  headId, 
  setHeadId, 
  edges, 
  setEdges, 
  onRun, 
  onPause, 
  onReset, 
  isPlaying, 
  isPaused,
  speed,
  setSpeed 
}) => {
  const handleEdgeChange = (index, field, value) => {
    const newEdges = [...edges]
    newEdges[index] = { ...newEdges[index], [field]: value }
    setEdges(newEdges)
  }

  const addEdge = () => {
    setEdges([...edges, { from: '', to: '' }])
  }

  const removeEdge = (index) => {
    setEdges(edges.filter((_, i) => i !== index))
  }

  const loadExample = () => {
    setNumPeople(5)
    setHeadId('3')
    setEdges([
      { from: '3', to: '1' },
      { from: '1', to: '4' },
      { from: '4', to: '2' },
      { from: '2', to: '5' },
      { from: '5', to: '-1' },
    ])
  }

  const generateRandom = () => {
    const n = numPeople || 5
    const nodes = Array.from({ length: n }, (_, i) => String(i + 1))
    const shuffled = [...nodes].sort(() => Math.random() - 0.5)
    
    setHeadId(shuffled[0])
    const newEdges = []
    for (let i = 0; i < shuffled.length; i++) {
      newEdges.push({
        from: shuffled[i],
        to: i === shuffled.length - 1 ? '-1' : shuffled[i + 1]
      })
    }
    setEdges(newEdges)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Control Panel
      </h2>
      
      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
              Number of People
            </label>
            <input
              type="number"
              min="1"
              value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
              placeholder="5"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
              Head ID
            </label>
            <input
              type="text"
              value={headId}
              onChange={(e) => setHeadId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
              placeholder="3"
            />
          </div>
        </div>

        {/* Connections */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
              Connections (From → To)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={loadExample}
                className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-all text-xs font-medium border border-purple-400/30 hover:border-purple-400/50"
              >
                Load Example
              </button>
              <button
                type="button"
                onClick={generateRandom}
                className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-all text-xs font-medium border border-blue-400/30 hover:border-blue-400/50"
              >
                Random
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {edges.length === 0 ? (
              <p className="text-purple-300/60 text-sm text-center py-4">No connections yet. Add a connection below.</p>
            ) : (
              edges.map((edge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={edge.from || ''}
                      onChange={(e) => handleEdgeChange(index, 'from', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all text-sm"
                      placeholder="From"
                    />
                  </div>
                  <span className="text-purple-300 font-semibold text-lg shrink-0">→</span>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={edge.to || ''}
                      onChange={(e) => handleEdgeChange(index, 'to', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all text-sm"
                      placeholder="To (-1 for end)"
                    />
                  </div>
                  {edges.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEdge(index)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all border border-red-400/30 hover:border-red-400/50 shrink-0 font-bold"
                      title="Remove connection"
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
          
          <button
            type="button"
            onClick={addEdge}
            className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-all font-medium border border-blue-400/30 hover:border-blue-400/50"
          >
            + Add Connection
          </button>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRun}
            disabled={isPlaying && !isPaused}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying && !isPaused ? 'Running...' : 'Run Visualization'}
          </motion.button>
          
          {isPlaying && (
            <>
              {!isPaused ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPause}
                  className="px-5 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-xl font-semibold shadow-lg transition-all border border-amber-400/30 hover:border-amber-400/50"
                >
                  Pause
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRun}
                  className="px-5 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-xl font-semibold shadow-lg transition-all border border-green-400/30 hover:border-green-400/50"
                >
                  Resume
                </motion.button>
              )}
            </>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="px-5 py-3 bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 rounded-xl font-semibold shadow-lg transition-all border border-gray-400/30 hover:border-gray-400/50"
          >
            Reset
          </motion.button>
        </div>

        {/* Speed Control */}
        {isPlaying && (
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
            <span className="text-purple-200 text-sm font-medium">Animation Speed:</span>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-purple-200 text-sm font-medium min-w-[50px]">{((3000 - speed) / 300 + 1).toFixed(1)}x</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ControlPanel

