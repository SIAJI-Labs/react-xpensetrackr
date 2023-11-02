import React, { useState, PropsWithChildren, ReactNode, useEffect, useMemo, FormEventHandler, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { User } from '@/types';

// Script
import '@/function';
// Plugins
import '../../plugins/fontawesome/all.scss';

// Partials
import Navbar from './Partials/Navbar';
import RecordDialog from '@/Components/system/RecordDialog';

// Shadcn Component
import { ThemeProvider } from '@/Components/template/theme-provider';
import { Toaster } from "@/Components/ui/toaster";
import { Button } from '@/Components/ui/button';


export default function SystemLayout({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(false);
    const handleOpenRecordDialog = (isOpen: boolean) => {
        setOpenRecordDialog(isOpen);
    };

    return (
        <ThemeProvider>
            <Head>
                <meta name="description" content="Your page description" />
            </Head>

            <div className="min-h-screen bg-gray-100 relative">
                {/* Navbar */}
                <Navbar
                    user={user}
                ></Navbar>

                {/* {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )} */}

                <div className={ ` flex justify-center p-6` }>
                    <main className={ ` max-w-[400px] lg:min-w-[400px] py-[calc(64px)]` }>
                        {children}
                    </main>
                </div>

                {/* Record Modal */}
                <Button variant="outline" className={ ` fixed right-4 bottom-4` } onClick={() => {
                    setOpenRecordDialog(true);
                }}>Add record</Button>
                {/* Record Modal - Dialog */}
                <RecordDialog openState={ openRecordDialog } setOpenState={ handleOpenRecordDialog }/>
            </div>

            <Toaster />
        </ThemeProvider>
    );
}
