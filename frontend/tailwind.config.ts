// tailwindcss.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e60a15', // Cor principal BrazApp
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        accent: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        success: {
          500: '#22C55E',
          600: '#16A34A',
        },
        danger: {
          500: '#EF4444',
          600: '#DC2626',
        },
        surface: {
          0: '#ffffff',
          50: '#1f1f22',
          100: '#18181b',
          200: '#27272a',
          800: '#09090b',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: [
          'var(--font-plus-jakarta)',
          'var(--font-inter)',
          'sans-serif',
        ],
      },
      fontSize: {
        display: [
          'clamp(2.5rem,5vw,4rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        h1: [
          'clamp(2rem,4vw,3rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
        h2: ['clamp(1.5rem,3vw,2.25rem)', { lineHeight: '1.2' }],
        h3: ['clamp(1.25rem,2vw,1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      spacing: {
        section: 'clamp(4rem,8vw,8rem)',
        'section-sm': 'clamp(2rem,4vw,4rem)',
      },
      maxWidth: {
        content: '72rem',
        narrow: '48rem',
        wide: '84rem',
      },
      borderRadius: {
        card: '0.75rem',
        button: '0.5rem',
        badge: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover':
          '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
        cta: '0 4px 14px rgba(79,99,232,0.4)',
        'cta-hover': '0 6px 20px rgba(79,99,232,0.5)',
        floating: '0 20px 40px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-cta': 'pulseCta 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseCta: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
