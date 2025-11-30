import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import path from "path"
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Ensures images and assets load correctly in production on DigitalOcean
    base: './',

    build: {
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },

    plugins: [
      vue(),
      eslint(),
      vueI18n({
        include: path.resolve(__dirname, './src/locales/**')
      })
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  }
})

