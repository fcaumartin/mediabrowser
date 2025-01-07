import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: ['index/main2.jsx', 'app1/main.jsx'],
      output: {
        entryFileNames: chunk => {

            if (chunk.facadeModuleId.endsWith('index/main2.jsx')) {
                return 'libname.js'
            }
            if (chunk.facadeModuleId.includes('app1/main.jsx')) {
                const dir = path.dirname(chunk.facadeModuleId);
                return 'module/' + path.basename(dir) + '.js';
            }

        }
    }
      
    }
  }
})
