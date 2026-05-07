import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F4EBDD',
        'parchment-dark': '#E8D9C4',
        ink: '#1C1A1A',
        'ink-soft': '#3a3530',
        navy: '#24324A',
        gold: '#C8A96B',
        'gold-light': '#dfc48a',
        teal: '#5C7A7A',
        moss: '#6E7554',
        burgundy: '#6A2E35',
        lavender: '#A89BC7',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        garamond: ['"EB Garamond"', 'serif'],
      },
      animation: {
        'rune-spin': 'rune-spin 20s linear infinite',
        'candle-flicker': 'candle-flicker 4s ease-in-out infinite alternate',
        'float-up': 'float-up linear infinite',
        'idle-glow': 'idle-glow 3s ease-in-out infinite alternate',
        'reveal-in': 'reveal-in 0.4s ease-out forwards',
        'wheel-spin': 'wheel-spin 4s ease-out forwards',
      },
      keyframes: {
        'rune-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'candle-flicker': {
          '0%': { opacity: '0.6', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '0.9', transform: 'translateX(-48%) scale(1.05)' },
          '100%': { opacity: '0.7', transform: 'translateX(-52%) scale(0.97)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.2' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        'idle-glow': {
          '0%': { boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 40px rgba(36,50,74,0.27)' },
          '100%': { boxShadow: '0 0 0 3px #F4EBDD, 0 0 0 5px #C8A96B, 0 8px 50px rgba(200,169,107,0.33)' },
        },
        'reveal-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'wheel-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(1440deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
