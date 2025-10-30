# 🐢🐇 The Conga Line Finder

A beautiful, interactive web app that visualizes the Tortoise and Hare algorithm (two-pointer method) to find the middle of a singly linked list — themed as a fun conga line of dancers at a party!

## 🎯 Features

- **Interactive Visualization**: Watch the 🐢 Tortoise and 🐇 Hare pointers move through the conga line
- **Beautiful Animations**: Smooth, engaging animations powered by Framer Motion
- **Celebration Effects**: Confetti animation when the middle node is found
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Gradient backgrounds, glowing effects, and smooth transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to Vercel or any static hosting service.

## 🎨 How It Works

1. **Input Section**: Enter the number of people, head ID, and connections (PersonID → NextPersonID)
2. **Visualization**: Watch as the 🐢 slow pointer moves one step while the 🐇 fast pointer moves two steps
3. **Result**: When the fast pointer reaches the end, the slow pointer is at the middle node - celebrate with confetti!

## 🧠 Algorithm

The Tortoise and Hare algorithm:
- **Time Complexity**: O(N)
- **Space Complexity**: O(1)

The algorithm uses two pointers that move at different speeds through the linked list. When the fast pointer reaches the end, the slow pointer is guaranteed to be at the middle.

## 📦 Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **react-confetti** - Celebration effects

## 🎭 Demo

Try the example:
- Number of People: 5
- Head ID: A
- Connections:
  - A → B
  - B → C
  - C → D
  - D → E
  - E → -1

Click "Load Example" to see it in action!

## 🚀 Deployment

This app is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click!

---

Made with ❤️ for algorithm visualization
