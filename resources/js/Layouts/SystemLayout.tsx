import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';

// Plugins
// Fontawesome
import '../../plugins/fontawesome/all.scss';

// Partials
import Navbar from './Partials/Navbar';

export default function System({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar
                user={user}
            ></Navbar>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <div className={ ` flex justify-center` }>
                <main className={ ` max-w-[400px] w-[400px]` }>{children}</main>
            </div>
        </div>
    );
}
