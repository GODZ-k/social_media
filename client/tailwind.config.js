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
  ],
}