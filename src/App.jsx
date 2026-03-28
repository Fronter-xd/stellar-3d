import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import { Globe } from './components/Globe'
import { AINodes } from './components/AINodes'
import { HUD } from './components/HUD'
import { useStore } from './store/useStore'

function Scene() {
  const { isAutoRotate } = useStore()
  
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
      
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <Suspense fallback={null}>
        <Globe />
        <AINodes />
      </Suspense>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        autoRotate={isAutoRotate}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-stellar-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="text-cyan-400 font-orbitron tracking-widest">INITIALIZING</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      <HUD />
    </div>
  )
}
