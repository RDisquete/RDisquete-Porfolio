/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            // USAR IMPACT COMO FALLBACK GENÉRICO
            'display-impact': ['Bebas Neue', 'Impact', 'sans-serif'], 
            'vintage-cursive': ['Great Vibes', 'cursive'], 
        },colors: {
          'retro-dark': '#171717',
          'retro-cream': '#cdc69c',
          'retro-maroon': '#8e2b27',
      }
        
    },
  },
  plugins: [],
}