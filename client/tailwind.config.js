const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      width: {
        'dynamic': 'calc(-288px + 100%)',
      },
      
    },
  },
  plugins: [
    flowbite.plugin(),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          overflow: 'hidden',
        },
        '.scrollbar-none': {
          scrollbarWidth: 'none', /* For Firefox */
          '-ms-overflow-style': 'none', /* For Internet Explorer and Edge */
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none', /* For Chrome, Safari, and Opera */
        },
      }, ['responsive', 'hover']);
    },
  ],
}