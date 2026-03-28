import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'

const AI_NODES = [
  { id: 1, lat: 40.7128, lng: -74.006, name: 'New York', type: 'primary', status: 'active' },
  { id: 2, lat: 51.5074, lng: -0.1278, name: 'London', type: 'secondary', status: 'active' },
  { id: 3, lat: 35.6762, lng: 139.6503, name: 'Tokyo', type: 'primary', status: 'active' },
  { id: 4, lat: -33.8688, lng: 151.2093, name: 'Sydney', type: 'secondary', status: 'active' },
  { id: 5, lat: 37.7749, lng: -122.4194, name: 'San Francisco', type: 'primary', status: 'active' },
  { id: 6, lat: 52.52, lng: 13.405, name: 'Berlin', type: 'secondary', status: 'active' },
  { id: 7, lat: 1.3521, lng: 103.8198, name: 'Singapore', type: 'primary', status: 'active' },
  { id: 8, lat: -23.5505, lng: -46.6333, name: 'São Paulo', type: 'secondary', status: 'standby' },
]

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))
  return new THREE.Vector3(x, y, z)
}

function Node({ node, onSelect, isSelected }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const position = latLngToVector3(node.lat, node.lng, 2.1)
  const color = node.type === 'primary' ? '#06b6d4' : '#8b5cf6'
  const statusColor = node.status === 'active' ? '#10b981' : '#f59e0b'
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02
      ringRef.current.rotation.x += 0.01
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3 + node.id) * 0.2 + 0.8
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      <mesh ref={ringRef}>
        <torusGeometry args={[0.08, 0.005, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      
      {(hovered || isSelected) && (
        <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="bg-stellar-dark/90 border border-cyan-500 px-3 py-1.5 rounded text-xs whitespace-nowrap backdrop-blur-sm">
            <div className="text-cyan-400 font-semibold">{node.name}</div>
            <div className="text-gray-400 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              {node.status.toUpperCase()}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

export function AINodes() {
  const { selectedNode, setSelectedNode } = useStore()
  const connectionRef = useRef()
  
  useFrame((state) => {
    if (connectionRef.current) {
      connectionRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group>
      {AI_NODES.map((node) => (
        <Node
          key={node.id}
          node={node}
          onSelect={setSelectedNode}
          isSelected={selectedNode?.id === node.id}
        />
      ))}
      
      <mesh ref={connectionRef}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  )
}
