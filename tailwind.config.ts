import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'flash-outline': 'flash-outline .5s linear infinite alternate',
        'flash-bg': 'flash-bg .5s linear infinite alternate',
      },
      keyframes: {
        'flash-outline': {
          '0%': { 'outline-color': '#f78ca0' },
          '100%': { 'outline-color': '#fcb69f' },
        },
        'flash-bg': {
          '0%': { 'background-color': '#f78ca0' },
          '100%': { 'background-color': '#fcb69f' },
        },
      },
    },
  },
  plugins: [],
}
export default config
