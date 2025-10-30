// Tortoise and Hare algorithm to find middle of linked list
// Time Complexity: O(N), Space Complexity: O(1)

export const findMiddleAlgorithm = (headId, edges) => {
  // Build linked list from edges
  const nodeMap = new Map()
  
  // Create all nodes
  const allNodes = new Set()
  edges.forEach(edge => {
    if (edge.from) allNodes.add(edge.from)
    if (edge.to && edge.to !== '-1') allNodes.add(edge.to)
  })
  
  // Create node objects
  allNodes.forEach(nodeId => {
    nodeMap.set(nodeId, { id: nodeId, next: null })
  })
  
  // Connect nodes
  edges.forEach(edge => {
    if (edge.from && edge.to) {
      const fromNode = nodeMap.get(edge.from)
      if (fromNode && edge.to !== '-1') {
        fromNode.next = edge.to
      }
    }
  })
  
  // Build ordered list starting from head
  const orderedList = []
  let current = headId
  const visited = new Set()
  
  while (current && current !== '-1' && !visited.has(current)) {
    visited.add(current)
    orderedList.push(nodeMap.get(current))
    current = nodeMap.get(current)?.next || null
  }
  
  return orderedList
}

export const simulateAlgorithm = (nodes) => {
  if (nodes.length === 0) return []
  
  const steps = []
  
  // Initialize both pointers at position 0
  let tortoise = 0
  let hare = 0
  let stepCount = 0
  
  steps.push({
    step: stepCount,
    tortoisePos: tortoise,
    harePos: hare,
    description: 'Initialize: Both pointers start at the head (position 0)'
  })
  
  // Move pointers until hare reaches the end
  while (hare < nodes.length - 1 && hare + 1 < nodes.length) {
    stepCount++
    
    // Move tortoise one step
    tortoise++
    // Move hare two steps
    hare = Math.min(hare + 2, nodes.length - 1)
    
    steps.push({
      step: stepCount,
      tortoisePos: tortoise,
      harePos: hare,
      description: `Step ${stepCount}: Tortoise moves to position ${tortoise} (${nodes[tortoise]?.id}), Hare moves to position ${hare} (${nodes[hare]?.id})`
    })
    
    // Check if hare reached the end
    if (hare >= nodes.length - 1 || hare + 2 > nodes.length) {
      break
    }
  }
  
  // Final step - middle found
  steps.push({
    step: stepCount + 1,
    tortoisePos: tortoise,
    harePos: hare,
    description: `Completed! Hare reached the end. Middle node is at position ${tortoise} (${nodes[tortoise]?.id})`,
    isComplete: true,
    middleNode: nodes[tortoise]
  })
  
  return steps
}

