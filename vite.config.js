import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default {
    plugins: [vue(), tailwindcss()],
}
    


/*
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// ✅ Configuración de Vite para Vue + Tailwind + Proxy Nominatim
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/nominatim/, ''),
        headers: {
          'User-Agent': 'ViaSegura/1.0 (proyecto escolar - Escuela Da Vinci)',
          'Accept-Language': 'es'
        }
      }
    }
  }
})

*/