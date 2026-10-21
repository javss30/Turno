module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#080B12',
          dark: '#0D111A',
          card: '#121722',
          cardBorder: '#1F2636',
          accent: '#3B82F6',
          accentLight: '#60A5FA',
          textMuted: '#A2A7B3',
          textDim: '#64748B',
          warmWhite: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
