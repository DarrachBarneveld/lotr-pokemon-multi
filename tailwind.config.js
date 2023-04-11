module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        sword: "url(/sword-2.svg), pointer",
        special: "url(/bolt.svg), pointer",
      },
    },
  },
  plugins: [],
};
