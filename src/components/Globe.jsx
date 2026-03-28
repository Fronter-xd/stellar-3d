import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Globe() {
  const meshRef = useRef()
  const atmosphereRef = useRef()
  
  const globeTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#0d1117')
    gradient.addColorStop(0.5, '#161b22')
    gradient.addColorStop(1, '#0d1117')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)
    
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)'
    ctx.lineWidth = 0.5
    
    for (let i = 0; i <= 12; i++) {
      const y = (512 / 12) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(1024, y)
      ctx.stroke()
    }
    
    for (let i = 0; i <= 24; i++) {
      const x = (1024 / 24) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 512)
      ctx.stroke()
    }
    
    ctx.fillStyle = 'rgba(6, 182, 212, 0.1)'
    const regions = [
      { x: 200, y: 150, rx: 80, ry: 50 },
      { x: 450, y: 200, rx: 120, ry: 70 },
      { x: 700, y: 180, rx: 100, ry: 60 },
      { x: 300, y: 300, rx: 90, ry: 55 },
      { x: 600, y: 320, rx: 110, ry: 65 },
    ]
    
    regions.forEach(r => {
      ctx.beginPath()
      ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    })
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      atmosphereRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={globeTexture}
          transparent
          opacity={0.9}
          shininess={10}
        />
      </mesh>
      
      <mesh ref={atmosphereRef} scale={1.05}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      <mesh scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
      
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <ambientLight intensity={0.2} />
    </group>
  )
}
