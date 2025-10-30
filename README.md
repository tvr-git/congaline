# Find Your Vibe Tribe — The Middle Person Mystery

A creative single-page web app that visualizes the "tortoise-and-hare" (slow-fast pointer) algorithm to find the middle person in a singly linked list — themed as a conga line on the dance floor.

## 🎯 Project Overview

This interactive visualization demonstrates how the Tortoise & Hare algorithm finds the middle node of a linked list with O(N) time complexity and O(1) space complexity. The visualization features animated characters (🐢 Tortoise and 🐇 Hare) that move through the conga line at different speeds until the middle person is discovered.

## 🚀 Features

### Linked List Visualization
- Horizontal sequence of nodes (people) connected by glowing arrows
- Each node displays a unique Person ID
- Beautiful glassmorphism design with gradient backgrounds
- Animated Tortoise and Hare characters that move along the nodes

### Animation Flow
- Both pointers start at the HEAD node
- Tortoise moves one node at a time (slow pointer)
- Hare moves two nodes at a time (fast pointer)
- When the Hare reaches the end, the Tortoise is at the middle node
- Smooth animations with particle trails and visual effects

### Control Panel
- Input fields for number of people (N) and head ID
- Dynamic connection management (add/remove edges)
- "Load Example" button with the provided example
- "Random" button to auto-generate random linked lists
- "Run Visualization" button to start the animation
- Pause/Resume controls during visualization
- Speed control slider

### Explanatory Sidebar
- Real-time iteration counter
- Highlighted pseudocode showing current step
- Live pointer positions (Tortoise and Hare)
- Color-coded legend
- Algorithm complexity information

### Visual Theme
- Party/conga line vibe with dancing characters
- Color scheme:
  - **Gray**: Unvisited nodes
  - **Blue**: Slow pointer's current node
  - **Pink**: Fast pointer's current node
  - **Green**: Final middle node highlight
- Dark dance floor background with subtle gradient lighting
- Smooth, rhythmic animations

## 🧱 Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations and transitions
- **SVG** - Animated character graphics

## 📁 Project Structure

```
/src
  /components
    ControlPanel.jsx    # Input controls and visualization controls
    LinkedList.jsx      # Main linked list visualization component
    Node.jsx            # Individual node component
    Sidebar.jsx         # Algorithm explanation and status panel
    Pointers.jsx        # Animated Tortoise and Hare SVG components
    ResultSection.jsx   # Celebration screen when middle is found
  /utils
    findMiddle.js       # Tortoise & Hare algorithm logic
  App.jsx               # Main application component
  main.jsx              # Application entry point
  index.css             # Global styles
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**
```bash
cd congaline
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎮 Usage

### Example Input Format

The app supports the following input format:

```
Number of People: 5
Head ID: 3
Connections:
  3 → 1
  1 → 4
  4 → 2
  2 → 5
  5 → -1
```

**Expected Output:** Person 4 is the middle node

### How to Use

1. **Enter the number of people** in your conga line
2. **Set the Head ID** (starting person)
3. **Add connections** using the "From → To" format (use `-1` to mark the end)
4. **Click "Load Example"** to try the provided example
5. **Click "Run Visualization"** to watch the algorithm in action
6. **Use Pause/Resume** to control the animation
7. **Adjust speed** with the slider during visualization

## 🧠 Algorithm Explanation

The Tortoise & Hare algorithm works as follows:

1. Initialize both pointers at the head of the list
2. Move the Tortoise pointer one step at a time
3. Move the Hare pointer two steps at a time
4. When the Hare reaches the end, the Tortoise is at the middle node

**Time Complexity:** O(N) - Single pass through the list  
**Space Complexity:** O(1) - Only uses two pointers

## 🎨 Visual Features

- **Animated Characters**: Tortoise and Hare SVG characters with particle trails
- **Color Coding**: Different colors for visited, active, and middle nodes
- **Smooth Transitions**: Spring animations for natural movement
- **Glowing Effects**: Visual feedback with glowing borders and shadows
- **Interactive Controls**: Real-time speed adjustment and step control

## 🚀 Deployment

This app is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click!

The app includes a `vercel.json` configuration file for optimal deployment.

## 📝 License

This project is open source and available for educational purposes.

---

**Made with ❤️ for algorithm visualization**

*Find the middle dancer in your conga line!* 🎉
