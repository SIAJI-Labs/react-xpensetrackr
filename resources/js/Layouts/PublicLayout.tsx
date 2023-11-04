import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

// Plugins
// Fontawesome
import '../../plugins/fontawesome/all.scss';
import { Toaster } from '@/Components/ui/toaster';
import { ThemeProvider } from '@/Components/template/theme-provider';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <Head>
                <meta name="description" content="Simplify your expenses, maximize your control" />

                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/assets/images/favicon.svg"></link>
            </Head>

            <div className="min-h-screen w-full bg-slate-100">
                {children}

                <Toaster />
            </div>
        </ThemeProvider>
    );
}
