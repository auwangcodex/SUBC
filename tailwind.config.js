/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
        hand: ['Patrick Hand', 'cursive'],
      },
      colors: {
        ink: '#37352F',
        paper: '#FFFFFF',
        surface: '#F7F7F5',
        border: '#E0E0E0',
        accent: '#EBEBEB'
      },
      boxShadow: {
        'soft': '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.02)',
        'soft-hover': '0px 8px 16px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}