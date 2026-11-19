import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = new URL(".", import.meta.url).pathname;

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  publicDir: "public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 4173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
