import { motion } from 'framer-motion'

const TortoisePointer = ({ position, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0,
        y: isActive ? 0 : -20,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
    >
      {/* Particle trail */}
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0.8 }}
              animate={{
                x: [0, (i - 1) * 15],
                y: [0, 20 + i * 5],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      
      <motion.svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        animate={isActive ? {
          y: [0, -6, 0],
          rotate: [0, 6, -6, 0],
        } : {}}
        transition={{
          duration: 0.9,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.6))' }}
      >
        {/* Tortoise body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="#10b981" />
        {/* Shell */}
        <path d="M 30 55 Q 50 45 70 55 Q 65 75 50 75 Q 35 75 30 55" fill="#065f46" />
        {/* Shell pattern */}
        <path d="M 35 60 Q 50 50 65 60" stroke="#047857" strokeWidth="1.5" fill="none" />
        <path d="M 40 65 Q 50 55 60 65" stroke="#047857" strokeWidth="1.5" fill="none" />
        {/* Head */}
        <circle cx="50" cy="45" r="12" fill="#fbbf24" />
        {/* Eyes */}
        <circle cx="46" cy="43" r="2.5" fill="#000" />
        <circle cx="54" cy="43" r="2.5" fill="#000" />
        {/* Eye shine */}
        <circle cx="46" cy="43" r="1" fill="#fff" />
        <circle cx="54" cy="43" r="1" fill="#fff" />
        {/* Smile */}
        <path d="M 44 48 Q 50 52 56 48" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Trail effect */}
        {isActive && (
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity={0.4}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.svg>
      <div className="text-center mt-2">
        <motion.span 
          className="text-green-400 text-xs font-bold px-2 py-1 bg-green-500/20 rounded-full border border-green-400/30"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
        >
          Tortoise
        </motion.span>
      </div>
    </motion.div>
  )
}

const HarePointer = ({ position, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0,
        y: isActive ? 0 : -20,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
    >
      {/* Speed particles */}
      {isActive && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0.9 }}
              animate={{
                x: [0, (i - 2) * 20],
                y: [0, 25 + i * 3],
                opacity: [0.9, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      
      <motion.svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        animate={isActive ? {
          y: [0, -10, 0],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{
          duration: 0.6,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{ filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.6))' }}
      >
        {/* Hare body */}
        <ellipse cx="50" cy="60" rx="20" ry="18" fill="#ec4899" />
        {/* Head */}
        <circle cx="50" cy="40" r="14" fill="#fbbf24" />
        {/* Ears */}
        <ellipse cx="42" cy="26" rx="5" ry="14" fill="#ec4899" transform="rotate(-25 42 26)" />
        <ellipse cx="58" cy="26" rx="5" ry="14" fill="#ec4899" transform="rotate(25 58 26)" />
        {/* Inner ear */}
        <ellipse cx="42" cy="26" rx="2" ry="8" fill="#f472b6" transform="rotate(-25 42 26)" />
        <ellipse cx="58" cy="26" rx="2" ry="8" fill="#f472b6" transform="rotate(25 58 26)" />
        {/* Eyes */}
        <circle cx="46" cy="38" r="2.5" fill="#000" />
        <circle cx="54" cy="38" r="2.5" fill="#000" />
        {/* Eye shine */}
        <circle cx="46" cy="38" r="1" fill="#fff" />
        <circle cx="54" cy="38" r="1" fill="#fff" />
        {/* Nose */}
        <ellipse cx="50" cy="42" rx="2" ry="1.5" fill="#000" />
        {/* Speed trail */}
        {isActive && (
          <>
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#ec4899"
              strokeWidth="2.5"
              opacity={0.5}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="#f472b6"
              strokeWidth="2"
              opacity={0.4}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: 0.2,
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              opacity={0.3}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: 0.4,
              }}
            />
          </>
        )}
      </motion.svg>
      <div className="text-center mt-2">
        <motion.span 
          className="text-pink-400 text-xs font-bold px-2 py-1 bg-pink-500/20 rounded-full border border-pink-400/30"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
        >
          Hare
        </motion.span>
      </div>
    </motion.div>
  )
}

export { TortoisePointer, HarePointer }

