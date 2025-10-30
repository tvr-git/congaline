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
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-400/20 via-pink-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-yellow-400/50"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 215, 0, 0.5)',
              '0 0 40px rgba(255, 20, 147, 0.6)',
              '0 0 20px rgba(255, 215, 0, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-center p-6 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4">
            🎉 Middle of the Conga Line Found! 🎉
          </h2>
          
          {middleNode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mt-6"
            >
              <div className="inline-block w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl animate-pulse">
                {middleNode.id}
              </div>
            </motion.div>
          )}
          
          <p className="text-white text-xl mt-6 font-semibold">
            The Tortoise & Hare algorithm successfully found the middle dancer!
          </p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            🎊 Start New Conga Line 🎊
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default ResultSection

