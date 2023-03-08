module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'fit': 'fit-content'
      },
      height: {
        'fit': 'fit-content'
      },
      gridTemplateColumns: {
        'fill': 'repeat(auto-fill, minmax(280px, 1fr))'
      }
    },
  },
  plugins: [],
}