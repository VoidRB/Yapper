/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Noto Sans'],
      },
      colors: {
        ChatDarkBGPrimary: '#001220',
        ChatDarkBGSecondary: '#001f36',
        ChatDarkAccentPrimary: '#ae00ff',
        ChatDarkAccentSecondary: '#FBAE3C',
        ChatLightBGPrimary: '#baa689',
        ChatLightBGSecondary: '#fde4bf',
        ChatLightAccentPrimary: '#009473',
        ChatLightAccentSecondary: '#29535f',
      },
    },
  },
  plugins: [],
};
