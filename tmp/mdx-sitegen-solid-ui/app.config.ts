import { defineConfig } from "@solidjs/start/config"

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { getHighlighter } from "shiki"
import tailwindcss from "@tailwindcss/vite";

import rehypeComponent from "./src/lib/mdx/component"
import remarkSolidFrontmatter from "./src/lib/mdx/frontmatter"

const { default: mdx } = pkg

export default defineConfig(
  {
    ssr: false,
    server: { // nitro https://nitro.build/config
				// baseURL: ymlconfigs.site_url ? new URL(ymlconfigs.site_url).pathname.replace(/\/$/, "") : "/",
				compatibilityDate: "2025-05-26",
				preset: process.env.NODE_ENV === "production" ? "github_pages" : "node-server",
				// legacyExternals: true,
    },
    extensions: ["mdx", "md"],
    vite: {
      plugins: [
        tailwindcss(),
        mdx.withImports({})({
          jsx: true,
          jsxImportSource: "solid-js",
          providerImportSource: "solid-mdx",
          remarkPlugins: [remarkGfm, remarkSolidFrontmatter],
          rehypePlugins: [
            rehypeSlug,
            rehypeComponent,
            [
              rehypePrettyCode,
              {
                getHighlighter: async () => {
                  return await getHighlighter({
                    theme: "github-dark"
                  })
                }
              }
            ]
          ]
        })
      ]
    }
})
