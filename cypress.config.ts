import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "src/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://127.0.0.1:5173",
    chromeWebSecurity: false,
    waitForAnimations: true,
    experimentalOriginDependencies: true,
  }, hosts: {
    "*.localhost": "127.0.0.1",
  },
});
