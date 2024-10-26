import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        display: ["Noto Sans"],
      },
      colors: {
        //Dark mode
        CDBGPrimary: "#001220",
        CDBGSecondary: "#001f36",
        CDACCPrimary: "#ae00ff",
        CDACCSecondary: "#FBAE3C",
        //Light mode
        CLBGPrimary: "#baa689",
        CLBGSecondary: "#fde4bf",
        CLACCPrimary: "#009473",
        CLACCSecondary: "#29535f",
      },
    },
  },
  plugins: [],
};
