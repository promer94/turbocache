module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        betterhover: { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
};
