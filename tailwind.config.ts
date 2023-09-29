import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'light-text': 'var(--color-text)',
        'bg-light': 'var(--color-bg-light)',
        'bg-light-hover': 'var(--color-bg-light-hover)',
        'bg-dark': 'var(--color-bg-dark)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
  darkMode: 'class',
} satisfies Config;
