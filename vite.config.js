import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "client",
  build: { outDir: "../dist", emptyOutDir: true },
  server: {
    // Forward API calls to the Express server during development
    proxy: { "/api": "http://localhost:3000" },
  },
});
