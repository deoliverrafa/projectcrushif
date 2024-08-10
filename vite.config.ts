import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import JavaScriptObfuscator from 'javascript-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'obfuscate',
      apply: 'build',
      enforce: 'post',
      transform(code, id) {
        if (id.endsWith('.js') || id.endsWith('.ts')) {
          const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
          });
          return {
            code: obfuscationResult.getObfuscatedCode(),
            map: null,
          };
        }
      },
    },
  ],
  base: "/"
})