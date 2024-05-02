import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        15: 'repeat(15, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'flash-outline': 'flash-outline .5s linear infinite alternate',
        'flash-bg': 'flash-bg .5s linear infinite alternate',
        extend: 'extend 1s cubic-bezier(1, 0.8, 0.3, 1) normal forwards',
        piece: 'piece .4s normal forwards',
      },
      keyframes: {
        'flash-outline': {
          '0%': { outlineColor: '#f78ca0' },
          '100%': { outlineColor: '#fcb69f' },
        },
        'flash-bg': {
          '0%': { backgroundColor: '#f78ca0' },
          '100%': { backgroundColor: '#fcb69f' },
        },
        extend: {
          '0%': { height: 'var(--from-height)' },
          '100%': { height: 'var(--to-height)' },
        },
        piece: {
          '0%': { transform: 'scale(1.2)', opacity: '0' },
          '30%': { transform: 'scale(0.85)', opacity: '100%' },
          '100%': { transform: 'scale(1)' },
        },
        'result-sign': {
          '0%': { opacity: '0%', transform: 'scale(1.75)' },
          '100%': { opacity: '100%' },
        },
        'result-actions': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
