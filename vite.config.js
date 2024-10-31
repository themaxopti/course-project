// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext", // или 'modules' для широкого охвата современных браузеров
  },
});
