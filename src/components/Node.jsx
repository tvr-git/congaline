import { motion } from 'framer-motion'

const Node = ({ node, index, tortoisePos, harePos, middleNode, isVisited, isHighlighted, nodeCount }) => {
  const getNodeColor = () => {
    if (middleNode && node.id === middleNode.id) {
      return 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600'
    }
    if (index === tortoisePos) {
      return 'bg-gradient-to-br from-blue-400 to-blue-600'
    }
    if (index === harePos) {
      return 'bg-gradient-to-br from-pink-400 to-pink-600'
    }
    if (isVisited) {
      return index % 2 === 0 
        ? 'bg-gradient-to-br from-purple-500/60 to-purple-600/60' 
        : 'bg-gradient-to-br from-indigo-500/60 to-indigo-600/60'
    }
    return 'bg-gradient-to-br from-gray-600/40 to-gray-700/40'
  }

  const getBorderColor = () => {
    if (middleNode && node.id === middleNode.id) {
      return 'border-green-300 shadow-green-500/70'
    }
    if (index === tortoisePos) {
      return 'border-blue-300 shadow-blue-500/50'
    }
    if (index === harePos) {
      return 'border-pink-300 shadow-pink-500/50'
    }
    return 'border-gray-500/30'
  }

  // Responsive sizing based on number of nodes
  const getSizeClasses = () => {
    if (!nodeCount) return 'w-20 h-20 md:w-24 md:h-24 text-xl md:text-2xl'
    
    if (nodeCount <= 3) {
      return 'w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-xl md:text-2xl lg:text-3xl'
    } else if (nodeCount <= 5) {
      return 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-lg md:text-xl lg:text-2xl'
    } else if (nodeCount <= 7) {
      return 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-base md:text-lg lg:text-xl'
    } else {
      return 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-sm md:text-base lg:text-lg'
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Node */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: index === tortoisePos || index === harePos ? [0, -8, 0] : 0,
        }}
        transition={{ 
          delay: index * 0.1,
          type: 'spring',
          stiffness: 200,
          y: {
            duration: 0.6,
            repeat: index === tortoisePos || index === harePos ? Infinity : 0,
            repeatType: 'reverse',
          },
        }}
        className={`relative ${getSizeClasses()} rounded-2xl ${getNodeColor()} flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-300 border-2 ${getBorderColor()}`}
        style={{
          boxShadow: middleNode && node.id === middleNode.id
            ? '0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(16, 185, 129, 0.4)'
            : index === tortoisePos || index === harePos
            ? `0 0 30px ${index === tortoisePos ? 'rgba(59, 130, 246, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
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
              index === tortoisePos ? 'bg-blue-400' : 'bg-pink-400'
            } opacity-50`}
          />
        )}
        
        {/* Node ID */}
        <span className="relative z-10 drop-shadow-lg font-extrabold">{node.id}</span>
      </motion.div>
      
      {/* Node Label */}
      <div className={`${nodeCount && nodeCount > 7 ? 'mt-0.5 text-[10px] md:text-xs' : 'mt-1 md:mt-2 text-xs md:text-sm'} text-purple-200/70 font-medium`}>
        Person {node.id}
      </div>
    </div>
  )
}

export default Node

