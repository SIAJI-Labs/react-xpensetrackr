import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { useRegisterSW } from 'virtual:pwa-register/react'

const appName = import.meta.env.VITE_APP_NAME || 'eXpenseTrackr';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Service Worker

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
