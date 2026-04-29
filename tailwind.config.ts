import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1A4A1A',
        'brand-medium': '#2D7A2D',
        'brand-light': '#4CAF50',
      },
    },
  },
  plugins: [],
}
export default config
