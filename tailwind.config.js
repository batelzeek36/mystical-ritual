/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'serif'],
      },
      colors: {
        mystical: {
          dark: '#0a0a0f',
          purple: '#4c1d95',
          gold: '#fbbf24',
          silver: '#e5e7eb',
          glow: '#8b5cf6',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'burn': 'burn 2s ease-in-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'flame-core': 'flame-core 2s ease-in-out infinite',
        'flame-middle': 'flame-middle 1.8s ease-in-out infinite',
        'flame-inner': 'flame-inner 1.5s ease-in-out infinite',
        'flame-mystical': 'flame-mystical 1.2s ease-in-out infinite',
        'flame-tip-1': 'flame-tip-1 1s ease-in-out infinite',
        'flame-tip-2': 'flame-tip-2 1.1s ease-in-out infinite',
        'flame-tip-3': 'flame-tip-3 0.9s ease-in-out infinite',
        'mystical-ember': 'mystical-ember 3s ease-in-out infinite',
        'mystical-sparkle': 'mystical-sparkle 2s ease-in-out infinite',
        'radial-glow': 'radial-glow 2.5s ease-in-out infinite',
        'mystical-aura': 'mystical-aura 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8b5cf6, 0 0 10px #8b5cf6, 0 0 15px #8b5cf6' },
          '100%': { boxShadow: '0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6' },
        },
        burn: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)', filter: 'hue-rotate(60deg)' },
          '100%': { opacity: '0', transform: 'scale(0.8)', filter: 'hue-rotate(120deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'flame-core': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(-1deg)' },
          '25%': { transform: 'scaleY(1.1) scaleX(0.95) rotate(1deg)' },
          '50%': { transform: 'scaleY(0.95) scaleX(1.05) rotate(-0.5deg)' },
          '75%': { transform: 'scaleY(1.05) scaleX(0.9) rotate(0.5deg)' },
        },
        'flame-middle': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(0.5deg)' },
          '33%': { transform: 'scaleY(1.15) scaleX(0.9) rotate(-1deg)' },
          '66%': { transform: 'scaleY(0.9) scaleX(1.1) rotate(1.5deg)' },
        },
        'flame-inner': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(-0.5deg)' },
          '50%': { transform: 'scaleY(1.2) scaleX(0.85) rotate(1deg)' },
        },
        'flame-mystical': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'scaleY(1.3) scaleX(0.8) rotate(-1deg)', opacity: '1' },
        },
        'flame-tip-1': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scaleY(1)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg) scaleY(1.2)' },
        },
        'flame-tip-2': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scaleY(1)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg) scaleY(1.1)' },
        },
        'flame-tip-3': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scaleY(1)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg) scaleY(1.3)' },
        },
        'mystical-ember': {
          '0%': { transform: 'translateY(0px) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-30px) scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'translateY(-60px) scale(0.5)', opacity: '0' },
        },
        'mystical-sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.5) rotate(180deg)' },
        },
        'radial-glow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.5' },
        },
        'mystical-aura': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.2' },
          '50%': { transform: 'scale(1.05) rotate(180deg)', opacity: '0.3' },
        }
      }
    },
  },
  plugins: [],
}