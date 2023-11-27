import React, { useState, PropsWithChildren, ReactNode, useEffect, useMemo, FormEventHandler, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

// Plugins
import '@/../plugins/fontawesome/all.scss';

// Shadcn
import { ThemeProvider } from '@/Components/template/theme-provider';
import { Toaster } from '@/Components/ui/toaster';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="xtrackr-theme">
            <Head>
                <meta name="description" content="Simplify your expenses, maximize your control" />

                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/assets/images/favicon.svg"></link>

                {/* Manifest */}
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#55799d"/>
            </Head>

            <div className="min-h-screen w-full bg-slate-100 dark:bg-background">
                {children}

                <Toaster />
            </div>
        </ThemeProvider>
    );
}
