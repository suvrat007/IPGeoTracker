/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        earth_space: "url('https://www.pixground.com/sunrise-over-earths-horizon-4k-wallpaper-2/?download-img=4k')",
        blackOverlay: "liner-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)"
      },
    },
  },
  plugins: [],
}