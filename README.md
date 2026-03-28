# Stellar-3D

An immersive 3D product showcase featuring an interactive globe with floating AI nodes representing global deployment status.

## Features

- **Interactive 3D Globe** - Real-time rendered Earth with dynamic grid lines and regional overlays
- **AI Nodes** - Floating deployment markers with hover tooltips showing status
- **HUD Overlay** - Sleek head-up display with system statistics
- **Auto-Rotate** - Toggle automatic globe rotation
- **Node Selection** - Click nodes to view detailed deployment metrics
- **Starfield Background** - Immersive space atmosphere

## Tech Stack

- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics engine
- **@react-three/drei** - Useful helpers for R3F
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - UI animations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Controls

- **Drag** - Rotate globe
- **Scroll** - Zoom in/out
- **Click Node** - View node details
- **Toggle Auto-Rotate** - Enable/disable automatic rotation

## Project Structure

```
stellar-3d/
├── src/
│   ├── components/
│   │   ├── Globe.jsx      # 3D Earth with atmosphere
│   │   ├── AINodes.jsx    # Floating deployment markers
│   │   └── HUD.jsx        # System stats overlay
│   ├── store/
│   │   └── useStore.js    # Zustand state management
│   ├── App.jsx            # Main scene composition
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
└── package.json
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--stellar-black` | `#0a0a0f` | Background |
| `--stellar-cyan` | `#06b6d4` | Primary accent |
| `--stellar-violet` | `#8b5cf6` | Secondary accent |

## License

MIT
