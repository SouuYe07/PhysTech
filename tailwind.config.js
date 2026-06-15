/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Konkhmer-Regular'],
        'body-thin': ['Lexend-Thin'],
        'body-extralight': ['Lexend-ExtraLight'],
        'body-light': ['Lexend-Light'],
        body: ['Lexend-Regular'],
        'body-medium': ['Lexend-Medium'],
        'body-semibold': ['Lexend-SemiBold'],
        'body-bold': ['Lexend-Bold'],
        'body-extrabold': ['Lexend-ExtraBold'],
        'body-black': ['Lexend-Black'],
      }
    },
  },
  plugins: [],
}

