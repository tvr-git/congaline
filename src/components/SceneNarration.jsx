import { motion, AnimatePresence } from 'framer-motion'

const SceneNarration = ({ scene }) => {
  const scenes = {
    intro: {
      text: "Meet your vibe tribe! The conga line forms on the dance floor 💃🕺",
      emoji: "💃🕺"
    },
    start: {
      text: "Here come our two dancers — the tortoise 🐢 and the hare 🐇!",
      emoji: "🐢🐇"
    },
    moving: {
      text: "Watch them move! The hare zooms ahead while the tortoise takes it slow...",
      emoji: "⚡🐢"
    },
    reveal: {
      text: "And there it is! The middle dancer — the life of the party 🎉",
      emoji: "🎉"
    }
  }

  const currentScene = scenes[scene] || scenes.intro

  return (
    <div className="w-full flex justify-center mt-6 mb-4 min-h-[100px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="text-center max-w-3xl px-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-4xl md:text-5xl mb-3"
          >
            {currentScene.emoji}
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg"
            style={{
              textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            }}
          >
            {currentScene.text}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-4 rounded-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SceneNarration

