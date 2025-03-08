import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This alias points to the ESM build of Vue that includes the runtime compiler
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
});
