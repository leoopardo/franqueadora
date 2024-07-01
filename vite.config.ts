import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // Polyfill Buffer
      buffer: resolve(__dirname, "node_modules/buffer/"),
      // Add any other polyfills as needed
      stream: resolve(__dirname, "node_modules/stream-browserify"),
      util: resolve(__dirname, "node_modules/util/"),
    },
  },
  optimizeDeps: {
    include: ["buffer", "stream", "util"],
  },
});
