import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        subtle: 'rgb(var(--subtle) / <alpha-value>)',
        line: 'rgb(var(--ink) / 0.14)',
        copper: 'rgb(var(--copper) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Fluid editorial scale. Display sizes track the viewport so headings
        // hold their proportion from phone to large desktop.
        mega: ['clamp(2.75rem, min(7.4vw, 12.5vh), 9.5rem)', { lineHeight: '0.96', letterSpacing: '-0.045em' }],
        display: ['clamp(2.6rem, 6.4vw, 6.75rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        headline: ['clamp(2rem, 4.2vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        statement: ['clamp(1.6rem, 3.1vw, 3.1rem)', { lineHeight: '1.14', letterSpacing: '-0.025em' }],
        title: ['clamp(1.3rem, 1.8vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.05rem, 1.35vw, 1.3rem)', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        site: '1680px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
