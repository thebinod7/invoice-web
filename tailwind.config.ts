import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'rgb(79 70 229 / var(--tw-bg-opacity, 1))',
        secondary: '#474E93',
        yellowish: '#D5E7B5',
        maroon: '#474E93',
        greyish: '#888',
        whitish: '#f5f5f5',
        darkish: '#0a152f',
      },
    },
  },
  plugins: [],
} satisfies Config;
