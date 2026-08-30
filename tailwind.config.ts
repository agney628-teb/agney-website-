import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#F7F6F2',
          DEFAULT: '#F6F5F0',
          dark: '#EFECE6',
        },
        ink: {
          DEFAULT: '#0E0E10',
          muted: '#5C5B57',
          faint: '#8C8A84',
        },
        dark: {
          bg: '#0A0A0C',
          surface: '#121216',
          card: '#181820',
          border: '#24242C',
          text: '#F2F1EC',
          muted: '#929089',
        },
        accent: {
          DEFAULT: '#FF3B00',
          gold: '#D4AF37',
          cyan: '#00F0FF',
          violet: '#7928CA',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        editorial: '-0.04em',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'editorial-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 30px rgba(255, 59, 0, 0.2)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
export default config
