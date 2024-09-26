import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
            { find: '@assets', replacement: '/src/assets' },
            { find: '@components', replacement: '/src/components' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@routers', replacement: '/src/routers' },
            { find: '@scripts', replacement: '/src/scripts' },
            { find: '@styles', replacement: '/src/styles' },
            { find: '@stores', replacement: '/src/stores' },
        ],
    },
});
