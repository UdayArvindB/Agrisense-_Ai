/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          deep: '#062817',
          dark: '#0B3B24',
          emerald: '#059669',
          glow: '#10B981',
          lime: '#84CC16',
          leaf: '#22C55E',
        },
        earth: {
          sand: '#F7F5F0',
          warm: '#EFECE6',
          beige: '#E5DFD5',
          clay: '#C2B8A3',
          dark: '#1C1F1D',
          charcoal: '#111413',
          card: '#181C1A',
        },
        brand: {
          primary: '#059669',
          primaryDark: '#064e3b',
          accent: '#10b981',
          gold: '#eab308',
          danger: '#ef4444',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(16, 185, 129, 0.15)',
        'glow-md': '0 0 30px rgba(16, 185, 129, 0.25)',
        'glow-lg': '0 0 50px rgba(16, 185, 129, 0.35)',
        'card-hover': '0 12px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(16, 185, 129, 0.08)',
      },
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
