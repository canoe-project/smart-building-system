const tailwindScrollbarHide = require('tailwind-scrollbar-hide');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontFamily: {
      VarelaRound: ['Varela Round'],
      Roboto: ['Roboto'],
      NanumGothic: ['Nanum Gothic'],
      DoHyeon: ['Do Hyeon'],
      BlackHanSans: ['Black Han Sans'],
      NanumSquareRound: ['NanumSquareRound', 'sans-serif'],
      NanumSquare: ['NanumSquare', 'sans-serif'],
      Firenze: ['Firenze', 'sans-serif'],
    },
    extend: {
      keyframes: {
        wobbleBottom: {
          '0%, 100%': {
            transform: 'translateX(0%)',
            transformOrigin: '50% 50%',
          },
          '15%': {
            transform: 'translateX(-30px) rotate(-6deg)',
          },
          '30%': {
            transform: 'translateX(15px) rotate(6deg)',
          },
          '45%': {
            transform: 'translateX(-15px) rotate(-3.6deg)',
          },
          '60%': {
            transform: 'translateX(9px) rotate(2.4deg)',
          },
          '75%': {
            transform: 'translateX(-6px) rotate(-1.2deg)',
          },
        },
        jelloVertical: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '30% ': {
            transform: ' scale3d(0.75, 1.25, 1)',
          },
          '40%': {
            transform: 'scale3d(1.25, 0.75, 1)',
          },
          '50%': {
            transform: 'scale3d(0.85, 1.15, 1)',
          },
          '65% ': {
            transform: 'scale3d(1.05, 0.95, 1)',
          },
          '75%': {
            transform: 'scale3d(0.95, 1.05, 1)',
          },
          '100% ': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translate(0px, -8px)',
          },

          '50%': {
            transform: 'translate(0px, 15px)',
          },
        },
        bounceHorizon: {
          '0%, 100%': {
            transform: 'translate(-4px, 0px)',
          },

          '50%': {
            transform: 'translate(4px, 0px)',
          },
        },
        bounceHorizonRight: {
          '0%, 100%': {
            transform: 'translate(-4px, 0px)',
          },

          '50%': {
            transform: 'translate(4px, 0px)',
          },
        },
        bounceHorizonLeft: {
          '0%, 100%': {
            transform: 'translate(4px, 0px) rotate(180deg)',
          },

          '50%': {
            transform: 'translate(-4px, 0px) rotate(180deg)',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-1000px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
      colors: {
        primary: {
          100: '#E6F6FE',
          200: '#C0EAFC',
          300: '#9ADDFB',
          400: '#4FC3F7',
          500: '#03A9F4',
          600: '#0398DC',
          700: '#026592',
          800: '#014C6E',
          900: '#013349',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        achromatic: {
          100: '#a3a5b5',
          200: '#a0a1aa',
          300: '#7f7f7f',
          400: '#303A52',
          500: '#323b4c',
        },
        chromatic: {
          100: '#ffd6ff',
          200: '#e7c6ff',
          300: '#c8b6ff',
          400: '#b8c0ff',
          500: '#bbd0ff',
        },
        ivory: {
          100: '#f9faf5',
          200: '#f2f2ea',
          300: '#e7e4df',
          400: '#d1cec7',
          500: '#bab6b5',
          600: '#eaebef',
        },
        dyoaPink: '#efb4b6',
        artNouveau: {
          frameYellow: '#be9261',
          textGray: '#a4a4a4',
          titleGray: '#646464',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  variants: {},
  plugins: [tailwindScrollbarHide],
};
