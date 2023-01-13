/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  // These paths are just examples, customize them to match your project structure
  //  purge: [
    //  './src/**/*.html',
    //  './src/**/*.{js,jsx,ts,tsx,vue}',
  //  ],
  // content: ["./src/**/*.{html,js}"],
  content: ["./src/**/*.{html,js}"],
  theme: {
    // Responsive Design
    screens: {
      // 'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      // 'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      // 'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
}