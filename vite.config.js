import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { config } from 'dotenv';

config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server : {
    port : 3000
  },
  define: {
    'process.env': process.env
  },
  test: {
    globals: true,
    setupFiles: "./jest.setup.cjs",
    env: {
      VITE_API_URL: "http://localhost:3000",
    },
  },
});