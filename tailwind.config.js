/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },

  content: ['./views/**/*.handlebars', './views/**/*.html', './public/js/**/*.js'],

  darkMode: 'class',
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    function ({ addVariant, addUtilities }) {
      addVariant('children', '& > *');
      addUtilities({
        '.rotate-x-40': {
          // transform will cover el.style.transform
          transform: 'rotateX(40deg)'
        },
        '.rotate-y-40': {
          transform: 'rotateY(40deg)'
        },
        '.animation-delay-100': {
          'animation-delay': '100ms'
        }
      });
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        fa: 'FontAwesome',
        roboto: 'Roboto,"sans-serif"',
        sans: ['Arial', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      },
      colors: {
        primary: '#fcd213',
        secondary: ''
      },
      backgroundImage: {
        img: "url('')"
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms'
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        5: '5px'
      }
    }
  }
};
