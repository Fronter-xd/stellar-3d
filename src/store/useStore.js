import { create } from 'zustand'

export const useStore = create((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  systemStats: {
    cpu: 34,
    memory: 67,
    latency: 12,
    uptime: 99.9,
    requests: 12847,
    activeNodes: 24,
  },
  
  updateStat: (key, value) => set((state) => ({
    systemStats: { ...state.systemStats, [key]: value }
  })),
  
  isAutoRotate: true,
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
}))
