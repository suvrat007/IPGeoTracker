/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        earth_space: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL291dGVyLXNwYWNlLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fSwidG9Gb3JtYXQiOiJhdmlmIn19",
        blackOverlay: "liner-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)"
      },
      fontFamily: {
        anton: ["Anton SC", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        kalam: ["Kalam", "cursive"],
        merriweather: ["Merriweather", "serif"],
        orbitron: ["Orbitron", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        playwrite: ["Playwrite BE VLG", "sans-serif"],
        sankofa: ["Sankofa Display", "serif"],
        teko: ["Teko", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}