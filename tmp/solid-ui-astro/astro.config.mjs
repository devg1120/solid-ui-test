import { fileURLToPath } from "node:url"

import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify"
import solidJs from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import rehypePrettyCode from "rehype-pretty-code"

import { transformers } from "./src/lib/highlight-code"

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidJs()],
  markdown: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light-default" },
          transformers
        }
      ]
    ],
    syntaxHighlight: false
  },
  vite: {
    optimizeDeps: {
      include: [
        "@corvu/calendar",
        "@kobalte/core/combobox",
        "@kobalte/core/dialog",
        "@kobalte/core/popover",
        "@kobalte/core/search",
        "@kobalte/core/select",
        "date-fns"
      ]
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  },
  adapter: netlify()
})
