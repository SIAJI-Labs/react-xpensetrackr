import React, { useState, PropsWithChildren, ReactNode, useEffect, useMemo, FormEventHandler, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { User } from '@/types';
// Script
import '@/function';
import '@/service-worker/service-worker'
// Plugins
import '@/../plugins/fontawesome/all.scss';

// Partials
import Navbar from './Partials/Navbar';
import RecordDialog from '@/Components/system/Record/RecordDialog';
import RecordDeleteDialog from '@/Components/system/Record/RecordDeleteDialog';
import PlannedPaymentDialog from '@/Components/system/PlannedPayment/PlannedPaymentDialog';
import PlannedPaymentDeleteDialog from '@/Components/system/PlannedPayment/PlannedPaymentDeleteDialog';
import WalletDialog from '@/Components/system/Wallet/WalletDialog';
import { useToast } from '@/Components/ui/use-toast';

// Shadcn
import { ThemeProvider } from '@/Components/template/theme-provider';
import { Toaster } from "@/Components/ui/toaster";
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import WalletDeleteDialog from '@/Components/system/Wallet/WalletDeleteDialog';
import CategoryDialog from '@/Components/system/Category/WalletDialog';
import CategoryDeleteDialog from '@/Components/system/Category/WalletDeleteDialog';
import axios from 'axios';
import { ToastAction } from '@radix-ui/react-toast';

export default function SystemLayout({ user, header, children, fabAction = null }: PropsWithChildren<{ user: User, header?: ReactNode, fabAction?: any[] | null }>) {
    const { toast } = useToast();
    
    // Record Dialog
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(false);
    const handleOpenRecordDialog = (isOpen: boolean) => {
        setOpenRecordDialog(isOpen);
    };
    const [openRecordDeleteDialog, setOpenRecordDeleteDialog] = useState<boolean>(false);
    const handleOpenRecordDeleteDialog = (isOpen: boolean) => {
        setOpenRecordDeleteDialog(isOpen);
    };

    // Planned Payment Dialog
    const [openPlannedPaymentDialog, setOpenPlannedPaymentDialog] = useState<boolean>(false);
    const handleOpenPlannedPaymentDialog = (isOpen: boolean) => {
        setOpenPlannedPaymentDialog(isOpen);
    };
    const [openPlannedPaymentDeleteDialog, setOpenPlannedPaymentDeleteDialog] = useState<boolean>(false);
    const handleOpenPlannedPaymentDeleteDialog = (isOpen: boolean) => {
        setOpenPlannedPaymentDeleteDialog(isOpen);
    };

    // Wallet Dialog
    const [openWalletDialog, setOpenWalletDialog] = useState<boolean>(false);
    const handleOpenWalletDialog = (isOpen: boolean) => {
        setOpenWalletDialog(isOpen);
    };
    const [openWalletDeleteDialog, setOpenWalletDeleteDialog] = useState<boolean>(false);
    const handleOpenWalletDeleteDialog = (isOpen: boolean) => {
        setOpenWalletDeleteDialog(isOpen);
    };

    // Category Dialog
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const handleOpenCategoryDialog = (isOpen: boolean) => {
        setOpenCategoryDialog(isOpen);
    };
    const [openCategoryDeleteDialog, setOpenCategoryDeleteDialog] = useState<boolean>(false);
    const handleOpenCategoryDeleteDialog = (isOpen: boolean) => {
        setOpenCategoryDeleteDialog(isOpen);
    };

    // Axios Global error handling
    axios.interceptors.response.use((response) => response, (error) => {
        // whatever you want to do with the error
        console.log(error);

        let errors = error.response.data;
        if('message' in errors && errors.message === 'Unauthenticated.'){
            console.log('Unauthenticated');
            toast({
                title: "419: Token Missmatch",
                description: "Please refresh the page",
                action: <ToastAction altText="Refresh" onClick={() => {
                    location.reload();
                }}>Refresh</ToastAction>,
                duration: undefined
            });
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
                <link rel="manifest" href="/build/manifest.webmanifest"/>
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#55799d"/>
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-background relative">
                {/* Navbar */}
                <Navbar
                    user={user}
                    key={ 'system-navbar' }
                ></Navbar>

                {/* {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )} */}

                <div className={ ` flex justify-center p-6` }>
                    <main className={ ` w-full md:max-w-[420px] md:min-w-[420px] py-[calc(64px)]` }>
                        {children}
                    </main>
                </div>

                {/* Floating Action Button */}
                {(() => {
                    if(fabAction !== null){
                        let action: any = [];

                        // Push planned-payment action
                        if(fabAction.includes('plannedPayment')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('plannedPayment.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-wallet` }>
                                    <i className={ `fa-regular fa-clock h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Planned Payment</span>
                                </DropdownMenuItem>
                            );
                        }
                        // Push category action
                        if(fabAction.includes('category')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('category.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-category` }>
                                    <i className={ `fa-solid fa-bookmark h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Category</span>
                                </DropdownMenuItem>
                            );
                        }
                        // Push wallet action
                        if(fabAction.includes('wallet')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('wallet.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-wallet` }>
                                    <i className={ `fa-solid fa-wallet h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Wallet</span>
                                </DropdownMenuItem>
                            );
                        }

                        // Push record action
                        action.push(
                            <DropdownMenuItem onClick={() => {
                                setOpenRecordDialog(true);
                            }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-record` }>
                                <i className={ `fa-solid fa-receipt h-4 w-4 text-center` }></i>
                                <span className={ `` }>Record</span>
                            </DropdownMenuItem>
                        );

                        return <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={ ` fixed right-6 bottom-6 dark:text-white` }>Add new</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={ `end` } side={ `top` }>
                                { action }
                            </DropdownMenuContent>
                        </DropdownMenu>;
                    }

                    return <Button variant="outline" className={ ` fixed right-6 bottom-6 dark:text-white` } onClick={() => {
                        setOpenRecordDialog(true);
                    }}>Add record</Button>
                })()}
                
                {/* Record Modal - Dialog */}
                <RecordDialog openState={ openRecordDialog } setOpenState={ handleOpenRecordDialog }/>
                {/* Record Modal - Delete Dialog */}
                <RecordDeleteDialog openState={ openRecordDeleteDialog } setOpenState={ handleOpenRecordDeleteDialog }></RecordDeleteDialog>
            
                {/* Planned Payment Modal - Dialog */}
                <PlannedPaymentDialog openState={ openPlannedPaymentDialog } setOpenState={ handleOpenPlannedPaymentDialog }/>
                <PlannedPaymentDeleteDialog openState={ openPlannedPaymentDeleteDialog } setOpenState={ handleOpenPlannedPaymentDeleteDialog }/>

                {/* Wallet Modal - Dialog */}
                <WalletDialog openState={ openWalletDialog } setOpenState={ handleOpenWalletDialog }/>
                <WalletDeleteDialog openState={ openWalletDeleteDialog } setOpenState={ handleOpenWalletDeleteDialog }/>

                {/* Category Modal - Dialog */}
                <CategoryDialog openState={ openCategoryDialog } setOpenState={ handleOpenCategoryDialog }/>
                <CategoryDeleteDialog openState={ openCategoryDeleteDialog } setOpenState={ handleOpenCategoryDeleteDialog }/>
            </div>

            <Toaster />
        </ThemeProvider>
    );
}
