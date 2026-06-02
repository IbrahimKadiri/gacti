import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-vite-plugin';

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/" : "/gacti/",
  plugins: [
    tanstackRouter({
      target: 'react',
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
})