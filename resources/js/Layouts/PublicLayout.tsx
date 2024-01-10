import React, { useState, PropsWithChildren, ReactNode, useEffect, useMemo, FormEventHandler, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

// Plugins
import '@/../plugins/fontawesome/all.scss';

// Shadcn
import { ThemeProvider } from '@/Components/template/theme-provider';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export default function Guest({ children }: PropsWithChildren) {
    // Axios Global error handling
    axios.interceptors.response.use((response) => response, (error) => {
        if(error.response && error.response.data){
            let errors = error.response.data;
            if('message' in errors && errors.message === 'Unauthenticated.'){
                // 401 due to 419 or other
                toast("419: Token Missmatch", {
                    description: "Please refresh the page",
                    action: {
                        label: "Refresh",
                        onClick: () => location.reload()
                    },
                    duration: undefined
                });
            }
        }

        throw error;
    });

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

            <div className="min-h-[100dvh] w-full bg-slate-50 dark:bg-background">
                {children}

                <Toaster closeButton/>
            </div>
        </ThemeProvider>
    );
}
