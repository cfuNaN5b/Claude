import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build` writes straight into the theme's flat assets/ folder with
// fixed names, so the Liquid layout can reference them with asset_url.
// Shopify's ?v= query string handles cache busting, so no content hashes.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../assets',
    emptyOutDir: false, // assets/ also holds the rest of the theme
    assetsDir: '',
    cssCodeSplit: false,
    // three.js + React is ~1.3 MB minified (~360 kB gzipped); expected for a 3D app.
    chunkSizeWarningLimit: 1500,
    rolldownOptions: {
      // index.html is only for `npm run dev`; the theme loads the bundle itself.
      input: 'src/main.tsx',
      output: {
        // One file: lazy chunks would load without Shopify's ?v= cache-buster.
        codeSplitting: false,
        entryFileNames: 'configurator.js',
        assetFileNames: 'configurator[extname]',
      },
    },
  },
})
