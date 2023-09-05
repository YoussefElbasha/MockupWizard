/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4461F2",
        secondary: "#DDA82A",
        background: "#000212",
        highlight: "#4461F21A",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(84deg, #4461F2 25.52%, #DDA82A 95.31%)",
        "custom-radial-gradient":
          "radial-gradient(70.71% 70.71% at 50% 50%, #DDA82A80 0%, #DDA82A40 30%, rgba(0, 0, 0, 0.00) 70%)",
        "custom-radial-gradient2":
          "radial-gradient(70.71% 70.71% at 50% 50%, #DDA82A80 0%, #4461F2 20%, rgba(0, 0, 0, 0.00) 65%)",
      },
    },
  },
  plugins: [],
};
