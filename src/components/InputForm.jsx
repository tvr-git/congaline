import { motion } from 'framer-motion'

const InputForm = ({ onVisualize, headId, setHeadId, edges, setEdges, numNodes, setNumNodes }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onVisualize()
  }

  const loadExample = () => {
    setNumNodes(5)
    setHeadId('A')
    setEdges([
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'E' },
      { from: 'E', to: '-1' },
    ])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
            Create Linked List
          </h2>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
                  Number of Nodes
                </label>
                <input
                  type="number"
                  min="1"
                  value={numNodes}
                  onChange={(e) => setNumNodes(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
                  placeholder="5"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
                  Head Node ID
                </label>
                <input
                  type="text"
                  value={headId}
                  onChange={(e) => setHeadId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all backdrop-blur-sm"
                  placeholder="A"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-purple-200 font-semibold text-sm uppercase tracking-wide">
                  Node Connections
                </label>
                <button
                  type="button"
                  onClick={loadExample}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg transition-all text-sm font-medium border border-purple-400/30 hover:border-purple-400/50"
                >
                  Load Example
                </button>
              </div>
              
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {edges.map((edge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <input
                      type="text"
                      value={edge.from}
                      onChange={(e) => handleEdgeChange(index, 'from', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all text-sm"
                      placeholder="From"
                    />
                    <span className="text-purple-300 font-semibold">→</span>
                    <input
                      type="text"
                      value={edge.to}
                      onChange={(e) => handleEdgeChange(index, 'to', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all text-sm"
                      placeholder="To (-1 for end)"
                    />
                    {edges.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEdge(index)}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all border border-red-400/30 hover:border-red-400/50"
                      >
                        ×
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={addEdge}
                className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-all font-medium border border-blue-400/30 hover:border-blue-400/50"
              >
                + Add Connection
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all"
            >
              Start Visualization
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default InputForm
