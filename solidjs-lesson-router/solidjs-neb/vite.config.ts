import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss({ optimize: true })],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@config": resolve(__dirname, "./src/config"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@components": resolve(__dirname, "./src/components"),
      "@layouts": resolve(__dirname, "./src/layouts"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: "esnext",
    minify: "terser",
    sourcemap: false,
    chunkSizeWarningLimit: 50,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          solid: ["solid-js", "solid-js/web", "@solidjs/router"],
          accordion: ["@components/Accordion"],
          badge: ["@components/Badge"],
          button: ["@components/Button"],
          container: ["@components/Container"],
          footer: ["@components/Footer"],
          "lazy-image": ["@components/LazyImage"],
          "loading-bar": ["@components/LoadingBar"],
          navbar: ["@components/Navbar"],
          "page-loader": ["@components/PageLoader"],
          tabs: ["@components/Tabs"],
          "global-styles": ["@assets/styles/global.css"],
          "noscript-styles": ["@assets/styles/noscript.css"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["solid-js", "@solidjs/router"],
  },
});
