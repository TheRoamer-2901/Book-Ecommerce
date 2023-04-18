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
        'checkout': '1fr 1.5fr 1fr 1fr 1fr',
        'cart': '30px 1fr 1.5fr 1fr 1fr 1fr',
        'fill': 'repeat(auto-fill, minmax(280px, 1fr))'
      },
      keyframes: {
        blink: {
          '0% 100%': { opacity: '1.0' },
          '40% 60%': { opacity: '0.8' },
          '50%':{ opacity: '0' }
        },
      },
      animation: {
        blink: 'blink 1.2s ease-in infinite'
      }
    },
  },
  plugins: [],
}