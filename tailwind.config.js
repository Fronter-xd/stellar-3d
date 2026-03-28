/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stellar': {
          'black': '#0a0a0f',
          'dark': '#0d0d14',
          'blue': '#0f172a',
          'cyan': '#06b6d4',
          'violet': '#8b5cf6',
          'emerald': '#10b981',
          'amber': '#f59e0b',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
