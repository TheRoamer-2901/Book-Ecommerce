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
        'cart': '30px 1fr 1.5fr 1fr 1fr 1fr',
        'fill': 'repeat(auto-fill, minmax(280px, 1fr))'
      }
    },
  },
  plugins: [],
}