import { useStore } from '../store/useStore'

function StatBar({ label, value, max = 100, color = 'cyan' }) {
  const colorClasses = {
    cyan: 'bg-cyan-500',
    violet: 'bg-violet-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
  }
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400 uppercase tracking-wider">{label}</span>
        <span className={`text-${color}-400 font-mono`}>{value}{typeof value === 'number' && value < 100 ? '%' : ''}</span>
      </div>
      <div className="h-1.5 bg-stellar-dark rounded overflow-hidden border border-gray-800">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${Math.min(value / max * 100, 100)}%` }}
        />
      </div>
    </div>
  )
}

function CornerDecorations() {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50" />
    </>
  )
}

export function HUD() {
  const { systemStats, selectedNode, isAutoRotate, toggleAutoRotate } = useStore()
  
  return (
    <div className="absolute inset-0 pointer-events-none scanline">
      <div className="absolute top-6 left-6 hud-border bg-stellar-dark/80 backdrop-blur-md p-4 w-64 pointer-events-auto corner-accent">
        <CornerDecorations />
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-cyan-400 font-orbitron text-sm tracking-wider">STELLAR-3D</span>
        </div>
        
        <h1 className="text-white font-orbitron text-lg mb-1 tracking-wide">AI DEPLOYMENT</h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase">Global Network Status</p>
        
        <div className="mt-4 pt-4 border-t border-gray-800">
          <StatBar label="CPU LOAD" value={systemStats.cpu} color="cyan" />
          <StatBar label="MEMORY" value={systemStats.memory} color="violet" />
          <StatBar label="LATENCY" value={systemStats.latency} max={100} color="emerald" />
          <StatBar label="UPTIME" value={systemStats.uptime} max={100} color="cyan" />
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-cyan-400 font-orbitron text-xl">{systemStats.requests.toLocaleString()}</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Requests</div>
          </div>
          <div className="text-center">
            <div className="text-violet-400 font-orbitron text-xl">{systemStats.activeNodes}</div>
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Active Nodes</div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 hud-border bg-stellar-dark/80 backdrop-blur-md p-4 w-56 pointer-events-auto">
        <CornerDecorations />
        
        <div className="text-gray-400 text-xs uppercase tracking-widest mb-3">Controls</div>
        
        <div className="space-y-2">
          <button
            onClick={toggleAutoRotate}
            className={`w-full py-2 px-3 text-xs font-semibold tracking-wider uppercase transition-all ${
              isAutoRotate
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700'
            }`}
          >
            Auto-Rotate: {isAutoRotate ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800 text-[10px] text-gray-500">
          <div className="flex justify-between mb-1">
            <span>RENDERER</span>
            <span className="text-cyan-400">WebGL 2.0</span>
          </div>
          <div className="flex justify-between">
            <span>FRAME</span>
            <span className="text-violet-400">60 FPS</span>
          </div>
        </div>
      </div>
      
      {selectedNode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hud-border bg-stellar-dark/80 backdrop-blur-md p-4 w-80 pointer-events-auto">
          <CornerDecorations />
          
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${selectedNode.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
            <span className="text-white font-orbitron text-sm">{selectedNode.name}</span>
            <span className="text-gray-400 text-xs">NODE-{String(selectedNode.id).padStart(3, '0')}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-cyan-400 font-mono text-lg">{Math.floor(Math.random() * 500 + 100)}</div>
              <div className="text-gray-500 text-[10px] uppercase">Requests</div>
            </div>
            <div>
              <div className="text-emerald-400 font-mono text-lg">{Math.floor(Math.random() * 50 + 10)}ms</div>
              <div className="text-gray-500 text-[10px] uppercase">Latency</div>
            </div>
            <div>
              <div className="text-violet-400 font-mono text-lg">{(Math.random() * 20 + 80).toFixed(1)}%</div>
              <div className="text-gray-500 text-[10px] uppercase">Health</div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-800 text-[10px] text-gray-500 flex justify-between">
            <span>TYPE: {selectedNode.type.toUpperCase()}</span>
            <span>LAT: {selectedNode.lat.toFixed(4)}</span>
            <span>LNG: {selectedNode.lng.toFixed(4)}</span>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-6 right-6 text-right">
        <div className="text-gray-600 text-[10px] tracking-widest">STELLAR SYSTEMS</div>
        <div className="text-cyan-500/50 text-xs font-orbitron">v2.0.24</div>
      </div>
      
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      </div>
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
        <div className="h-32 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
      </div>
    </div>
  )
}
