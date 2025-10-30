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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">📝 Create Your Conga Line</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">Number of People (N)</label>
            <input
              type="number"
              min="1"
              value={numNodes}
              onChange={(e) => setNumNodes(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="5"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Head ID</label>
            <input
              type="text"
              value={headId}
              onChange={(e) => setHeadId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="A"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-white font-semibold">Connections (PersonID → NextPersonID)</label>
            <button
              type="button"
              onClick={loadExample}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all text-sm font-semibold"
            >
              Load Example
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {edges.map((edge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={edge.from}
                  onChange={(e) => handleEdgeChange(index, 'from', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="From"
                />
                <span className="text-white text-xl">→</span>
                <input
                  type="text"
                  value={edge.to}
                  onChange={(e) => handleEdgeChange(index, 'to', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="To (-1 for end)"
                />
                {edges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEdge(index)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                  >
                    ✕
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addEdge}
            className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-semibold"
          >
            + Add Connection
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          🎉 Visualize Conga Line 🎉
        </motion.button>
      </form>
    </motion.div>
  )
}

export default InputForm

