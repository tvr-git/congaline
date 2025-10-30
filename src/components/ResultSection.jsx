import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'

const ResultSection = ({ middleNode, onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.3}
          colors={['#a855f7', '#ec4899', '#f59e0b', '#10b981']}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-amber-500/20 via-pink-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 animate-pulse"></div>
          
          <div className="relative z-10 text-center">
            <motion.h2
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6"
            >
              Middle Node Found!
            </motion.h2>
            
            {middleNode && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -8, 0],
                }}
                transition={{ 
                  delay: 0.3, 
                  type: 'spring', 
                  stiffness: 200,
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                }}
                className="flex justify-center mb-6"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-36 h-36 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl border-4 border-white/60 relative"
                  style={{
                    boxShadow: '0 0 50px rgba(251, 191, 36, 0.7), 0 0 100px rgba(236, 72, 153, 0.5)',
                  }}
                >
                  <span className="relative z-10">{middleNode.id}</span>
                </motion.div>
              </motion.div>
            )}
            
            <motion.p
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-xl md:text-2xl font-semibold mb-6"
            >
              The Tortoise & Hare algorithm successfully found the middle node!
            </motion.p>
            
            <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 text-left backdrop-blur-sm">
              <p className="text-white text-base mb-2">
                <span className="font-semibold">Result:</span> The middle node of the linked list is{' '}
                <span className="text-amber-300 font-bold text-lg">{middleNode?.id}</span>
              </p>
              <p className="text-purple-200/80 text-sm">
                Algorithm completed in <span className="font-semibold">O(N)</span> time complexity with{' '}
                <span className="font-semibold">O(1)</span> space complexity.
              </p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all"
            >
              Try Another List
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ResultSection
