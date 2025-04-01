module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#EC4899',
          dark: '#DB2777',
        },
        dark: {
          DEFAULT: '#1F2937',
          lighter: '#374151',
        },
        neon: {
          pink: '#ff00ff',
          blue: '#00ffff',
          green: '#00ff00',
          purple: '#8B5CF6',
        },
      },
      textColor: {
        white: '#FFFFFF',
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
        },
        black: '#000000',
      },
      backgroundColor: {
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
}
