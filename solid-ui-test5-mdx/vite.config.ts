import path from "path"
 
import solid from 'vite-plugin-solid';
import { defineConfig } from "vite"
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';


 
export default defineConfig({
  plugins: [
     solid(),
      mdx({
      jsxImportSource: 'solid-jsx', // または 'solid-js'
      //jsxImportSource: 'solid-js', // または 'solid-js'
      remarkPlugins: [remarkGfm],
    }),
  ],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  }
})
