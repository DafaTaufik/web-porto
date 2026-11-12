import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [react(), tailwindcss(),],
  build: {
    rollupOptions: {
      output: {
        // Pustaka yang dipakai bersama dipisah supaya chunk section tidak menggandakannya dan cache browser awet
        manualChunks(id) {
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) return "motion";
        },
      },
    },
  },
})
