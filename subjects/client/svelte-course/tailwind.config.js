/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        "5/3": '5 / 3'
      }
    },
  },
  plugins: [],
}

