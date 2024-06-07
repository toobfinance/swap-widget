import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dts from "vite-plugin-dts"
import tailwindcss from "tailwindcss"
import svgr from "@svgr/rollup"
import Unfonts from "unplugin-fonts/vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "@toobfinance/widgets",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.webp", "**/*.otf"],
  plugins: [
    react(),
    dts(),
    svgr({}),
    Unfonts({
      custom: {
        families: [
          {
            name: "Roobert",
            src: "./src/assets/fonts/*.otf",
          },
        ],
        display: "auto",
        preload: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
