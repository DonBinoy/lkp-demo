/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#171717',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#27272a',
          foreground: '#ffffff',
        },
        border: '#27272a',
        stay: {
          DEFAULT: '#c5a059',
          dark: '#1a1814',
        },
        adventure: {
          DEFAULT: '#4a7c59',
          dark: '#0e1410',
        },
        experience: {
          DEFAULT: '#9b7ede',
          dark: '#110e1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
