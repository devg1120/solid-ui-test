/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],

  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ],

  importOrder: ["<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^~/(.*)$", "", "^[.]"],
  importOrderTypeScriptVersion: "5.0.0",

  tailwindStylesheet: "./src/styles/globals.css",
  tailwindFunctions: ["clsx", "cva", "cn"],

  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  semi: false,
  trailingComma: "none"
}
