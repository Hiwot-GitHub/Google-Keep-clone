import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        ShuterGrey:'#5F6368',
        ShuterGreyLight: '#f6f7f7',
        AliceBlue: '#F1F3F4',
        BlackRussian: '#202124',
        Oasis: '#FEEFCE',
        DarkGrayishBlue: '#3c4043',
        AliceBlueDark: '#e6eaeb',
        Charchol: '#262626',
      },
    },
  },
  plugins: [],
}
export default config
