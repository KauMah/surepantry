/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
