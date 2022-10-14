/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.@(js|jsx|ts|tsx|html)'],
  theme: {
    fontFamily: {
      code: ['Source Code Pro', 'monospace'],
    },
    extend: {
      maxWidth: {
        50: '50%',
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      zIndex: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        dropdown: '100',
        backdrop: '200',
        fixed: '700',
        modal: '800',
        popover: '900',
        tooltip: '1000',
      },
      backgroundImage: {
        'img-1': "url('src/images/bx1.jpeg')",
        'img-2': "url('src/images/bx2.jpeg')",
        'img-3': "url('src/images/bx3.jpeg')",
        'img-4': "url('src/images/bx4.jpeg')",
        'img-5': "url('src/images/bx5.jpeg')",
        'img-6': "url('src/images/bx6.jpeg')",
        'img-7': "url('src/images/bx7.jpeg')",
        'img-8': "url('src/images/bx8.jpeg')",
        'img-9': "url('src/images/bx9.jpeg')",
        'img-10': "url('src/images/bx10.jpeg')",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
};
