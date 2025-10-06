// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'industrial-charcoal': '#1a1f2e',
        'industrial-iron': '#2d3748',
        'industrial-steel': '#718096',
        'industrial-copper': '#d97706',
        'industrial-white': '#ffffff',
        'charcoal': {
          DEFAULT: '#1a1f2e',
          50: 'rgba(26, 31, 46, 0.5)',
          90: 'rgba(26, 31, 46, 0.9)',
        }
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    require("daisyui")
  ],
};