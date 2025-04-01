/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uv-dark': 'rgba(5,0,30,0.9)',
        'uv-purple': '#9d4edd',
        'uv-blue': '#3a86ff',
        'uv-pink': '#ff6ac1',
        'uv-green': '#2cda9d',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(58, 134, 255, 0.5), 0 0 20px rgba(58, 134, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157, 78, 221, 0.3)',
        'neon-pink': '0 0 5px rgba(255, 106, 193, 0.5), 0 0 20px rgba(255, 106, 193, 0.3)',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-white',
    'text-gray-100',
    'text-gray-200',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'bg-gray-800',
    'bg-gray-900',
    'bg-black',
    'rounded',
    'rounded-lg',
    'rounded-xl',
    'shadow',
    'shadow-lg',
    'shadow-xl',
    'p-2',
    'p-4',
    'p-6',
    'p-8',
    'm-2',
    'm-4',
    'm-6',
    'm-8',
  ]
}
