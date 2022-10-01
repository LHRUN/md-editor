/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
  corePlugins: {
    preflight: false
  },
  content: [],
  theme: {
    extend: {}
  },
  daisyui: {
    styled: true,
    themes: ['lemonade'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: ''
  }
}
