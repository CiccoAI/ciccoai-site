const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a178f0', // Electric Purple
        'primary-dark': '#2a1d4c', // Deep Violet
        background: '#000000', // Black
        contrast: '#ffffff', // White
        accent: '#551bf8', // Vibrant Blue
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        orbitron: ['Orbitron', ...defaultTheme.fontFamily.sans],
        instrument: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2a1d4c 0%, #000 100%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}; 