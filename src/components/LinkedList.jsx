import { motion } from 'framer-motion'
import Node from './Node.jsx'
import { TortoisePointer, HarePointer } from './Pointers.jsx'

const LinkedList = ({ nodes, currentStep, steps, isPlaying, middleNode, visitedNodes }) => {
  const currentState = steps[currentStep] || { tortoisePos: -1, harePos: -1 }
  
  if (nodes.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-visible">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-purple-200/60 text-lg">Create your conga line using the Control Panel</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 md:p-4 lg:p-6 shadow-2xl border border-white/10 relative overflow-visible">
      <h3 className="text-xl font-bold text-white mb-3 md:mb-4 lg:mb-6 text-center">Conga Line Visualization</h3>
      <div className={`flex flex-nowrap justify-center items-center ${
        nodes.length <= 3 
          ? 'gap-3 md:gap-4 lg:gap-6' 
          : nodes.length <= 5 
          ? 'gap-2 md:gap-3 lg:gap-4' 
          : nodes.length <= 7
          ? 'gap-1 md:gap-2 lg:gap-3'
          : 'gap-0.5 md:gap-1 lg:gap-2'
      } p-2 md:p-4 lg:p-6 min-h-[250px] md:min-h-[300px] lg:min-h-[350px] relative overflow-hidden pb-12 w-full max-w-full`}
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
      }}>
        {nodes.map((node, index) => {
          const isVisited = visitedNodes.has(index)
          const isHighlighted = index === currentState.tortoisePos || index === currentState.harePos
          const nodeCount = nodes.length
          
          return (
            <div key={index} className="flex items-center relative shrink-0">
              {/* Tortoise Pointer */}
              {index === currentState.tortoisePos && (
                <TortoisePointer position={index} isActive={isPlaying} />
              )}
              
              {/* Hare Pointer */}
              {index === currentState.harePos && (
                <HarePointer position={index} isActive={isPlaying} />
              )}
              
              <Node
                node={node}
                index={index}
                tortoisePos={currentState.tortoisePos}
                harePos={currentState.harePos}
                middleNode={middleNode}
                isVisited={isVisited}
                isHighlighted={isHighlighted}
                nodeCount={nodeCount}
              />
              
              {/* Connection Arrow */}
              {index < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisited || index < currentState.tortoisePos || index < currentState.harePos ? 1 : 0.5,
                    x: 0,
                    scale: isHighlighted && (index === currentState.tortoisePos || index === currentState.harePos) ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ 
                    delay: index * 0.1 + 0.15,
                    scale: {
                      duration: 0.5,
                      repeat: isHighlighted && (index === currentState.tortoisePos || index === currentState.harePos) ? Infinity : 0,
                    },
                  }}
                  className={`${nodeCount <= 3 ? 'text-2xl md:text-3xl lg:text-4xl' : nodeCount <= 5 ? 'text-xl md:text-2xl lg:text-3xl' : nodeCount <= 7 ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg lg:text-xl'} font-bold transition-all shrink-0 ${
                    isHighlighted && (index === currentState.tortoisePos || index === currentState.harePos)
                      ? 'text-white drop-shadow-[0_0_10px_currentColor]' 
                      : isVisited
                      ? 'text-purple-300'
                      : 'text-gray-500'
                  }`}
                >
                  →
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LinkedList

