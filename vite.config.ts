import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
    srcDir: 'resources/js/service-worker',
	outDir: 'public',
	filename: 'sw.js',
	strategies: 'injectManifest',
	injectRegister: 'inline',
	registerType: 'autoUpdate',
	devOptions: {
		enabled: true
	}
}

export default defineConfig({
    plugins: [
		VitePWA(pwaOptions),
        laravel({
            input: [
                'resources/js/app.tsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
