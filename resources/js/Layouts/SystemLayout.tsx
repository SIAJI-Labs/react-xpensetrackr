import React, { useState, PropsWithChildren, ReactNode, useEffect, useMemo, FormEventHandler, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { User } from '@/types';
import axios from 'axios';

// Script
import '@/service-worker/service-worker'
import '@/function';
// Plugins
import '@/../plugins/fontawesome/all.scss';

// Partials - Dialog
import CategoryDeleteDialog from '@/Components/system/Category/CategoryDeleteDialog';
import CategoryDialog from '@/Components/system/Category/CategoryDialog';
import PlannedPaymentDeleteDialog from '@/Components/system/PlannedPayment/PlannedPaymentDeleteDialog';
import PlannedPaymentDialog from '@/Components/system/PlannedPayment/PlannedPaymentDialog';
import RecordDeleteDialog from '@/Components/system/Record/RecordDeleteDialog';
import RecordDialog from '@/Components/system/Record/RecordDialog';
import TagsDeleteDialog from '@/Components/system/Tags/TagsDeleteDialog';
import TagsDialog from '@/Components/system/Tags/TagsDialog';
import WalletBalanceAdjustmentDialog from '@/Components/system/Wallet/WalletBalanceAdjustmentDialog';
import WalletDeleteDialog from '@/Components/system/Wallet/WalletDeleteDialog';
import WalletDialog from '@/Components/system/Wallet/WalletDialog';
import WalletGroupDeleteDialog from '@/Components/system/WalletGroup/WalletGroupDeleteDialog';
import WalletGroupDialog from '@/Components/system/WalletGroup/WalletGroupDialog';

// Partials
import { ThemeProvider } from '@/Components/template/theme-provider';
import Navbar from './Partials/Navbar';

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { useToast } from '@/Components/ui/use-toast';
import { ToastAction } from '@/Components/ui/toast';
import { Toaster } from "@/Components/ui/toaster";
import { Button } from '@/Components/ui/button';
import moment from 'moment';
import NotificationDialog from '@/Components/system/Notification/NotificationDialog';
import { storePushSubscription, urlBase64ToUint8Array } from '@/function';
import { useIsFirstRender } from '@/lib/utils';

export default function SystemLayout({ user, header, children, fabAction = null }: PropsWithChildren<{ user: User, header?: ReactNode, fabAction?: any[] | null }>) {
    const isFirstRender = useIsFirstRender();
    const { wAppName } = usePage().props;
    const [appName, setAppName] = useState<string>(String(wAppName));
    const { toast } = useToast();
    
    // Category Dialog
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const handleOpenCategoryDialog = (isOpen: boolean) => {
        setOpenCategoryDialog(isOpen);
    };
    const [openCategoryDeleteDialog, setOpenCategoryDeleteDialog] = useState<boolean>(false);
    const handleOpenCategoryDeleteDialog = (isOpen: boolean) => {
        setOpenCategoryDeleteDialog(isOpen);
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

    // Record Dialog
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(false);
    const handleOpenRecordDialog = (isOpen: boolean) => {
        setOpenRecordDialog(isOpen);
    };
    const [openRecordDeleteDialog, setOpenRecordDeleteDialog] = useState<boolean>(false);
    const handleOpenRecordDeleteDialog = (isOpen: boolean) => {
        setOpenRecordDeleteDialog(isOpen);
    };

    // Tags Dialog
    const [openTagsDialog, setOpenTagsDialog] = useState<boolean>(false);
    const handleOpenTagsDialog = (isOpen: boolean) => {
        setOpenTagsDialog(isOpen);
    };
    const [openTagsDeleteDialog, setOpenTagsDeleteDialog] = useState<boolean>(false);
    const handleOpenTagsDeleteDialog = (isOpen: boolean) => {
        setOpenTagsDeleteDialog(isOpen);
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
    const [openWalletBalanceAdjustmentDialog, setOpenWalletBalanceAdjustmentDialog] = useState<boolean>(false);
    const handleOpenWalletBalanceAdjustmentDialog = (isOpen: boolean) => {
        setOpenWalletBalanceAdjustmentDialog(isOpen);
    };

    // Wallet Group Dialog
    const [openWalletGroupDialog, setOpenWalletGroupDialog] = useState<boolean>(false);
    const handleOpenWalletGroupDialog = (isOpen: boolean) => {
        setOpenWalletGroupDialog(isOpen);
    };
    const [openWalletGroupDeleteDialog, setOpenWalletGroupDeleteDialog] = useState<boolean>(false);
    const handleOpenWalletGroupDeleteDialog = (isOpen: boolean) => {
        setOpenWalletGroupDeleteDialog(isOpen);
    };

    // Notification Dialog
    const [openNotificationDialog, setOpenNotificationDialog] = useState<boolean>(false);
    const handleOpenNotificationDialog = (isOpen: boolean) => {
        setOpenNotificationDialog(isOpen);
    };

    // Axios Global error handling
    axios.interceptors.response.use((response) => response, (error) => {
        if(error.response && error.response.data){
            let errors = error.response.data;
            if('message' in errors && errors.message === 'Unauthenticated.'){
                // 401 due to 419 or other
                toast({
                    title: "419: Token Missmatch",
                    description: "Please refresh the page",
                    action: <ToastAction altText="Refresh" onClick={() => {
                        location.reload();
                    }}>Refresh</ToastAction>,
                    duration: undefined
                });
            }
        }

        throw error;
    });

    const [notificationAbortController, setNotificationAbortController] = useState<AbortController | null>(null);
    // Listen to notification setting
    useEffect(() => {
        const handleUserNotification = (notificationPerm: any) => {
            console.log(notificationPerm);

            if(notificationPerm.state === 'granted'){
                // Register push notification information to system
                let vapid_pubkey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
                if(typeof vapid_pubkey !== 'undefined' && vapid_pubkey){
                    navigator.serviceWorker.ready
                        .then((registration) => {
                            const subscribeOptions = {
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array(vapid_pubkey)
                            };
                
                            return registration.pushManager.subscribe(subscribeOptions);
                        })
                        .then((pushSubscription) => {
                            // console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                            // storePushSubscription(pushSubscription);
                            let formData = new FormData();

                            // Handle Push Subscription data
                            let pushString = JSON.stringify(pushSubscription);
                            let data = JSON.parse(pushString);
                            for(const key in data){
                                if(typeof data[key] === 'object'){
                                    let dynamicKey = key;
                                    let value = data[key];

                                    if(data[key] !== null){
                                        let child = data[key];
                                        for(const childKey in child){
                                            dynamicKey = `${key}[${childKey}]`;
                                            value = child[childKey];

                                            formData.append(dynamicKey, value);
                                        }
                                    } else {
                                        formData.append(dynamicKey, value);
                                    }

                                } else if(typeof data[key] === 'string'){
                                    formData.append(key, data[key]);
                                }
                            }

                            // Cancel previous request
                            if(notificationAbortController instanceof AbortController){
                                notificationAbortController.abort();
                            }

                            // Create a new AbortController
                            const abortController = new AbortController();
                            // Store the AbortController in state
                            setNotificationAbortController(abortController);
                            
                            axios.post(route('api.notification.v1.subscribe'), formData, {
                                    cancelToken: new axios.CancelToken(function executor(c) {
                                        // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                                        abortController.abort = c;
                                    })
                                })
                                .then(function (response) {
                                    // console.log(response);
                                })
                                .catch(function (error) {
                                    // console.log(error);
                                })
                                .then(function (response) {
                                    // console.log(response);
                                }).finally(() => {
                                    // Clear the AbortController from state
                                    setNotificationAbortController(null);
                                });
                        })
                        .catch((error) => {
                            console.error('Service Worker registration failed:', error);
                        });
                }
            }
        }

        if(isFirstRender){
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
                    notificationPerm.onchange = () => {
                        handleUserNotification(notificationPerm);
                    }
                });
            }
        }
    });

    

    return (
        <ThemeProvider defaultTheme="light" storageKey="xtrackr-theme">
            <Head>
                <meta name="description" content="Simplify your expenses, maximize your control" />

                {/* Meta */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/assets/images/favicon.svg"></link>

                {/* Manifest */}
                <link rel="manifest" href="/build/manifest.webmanifest"/>
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#29c485"/>
            </Head>

            <div className="min-h-screen bg-slate-50 dark:bg-background relative">
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

                {/* Main Content */}
                <div className={ ` flex justify-center px-6 py-6` }>
                    <main className={ ` w-full md:max-w-[420px] md:min-w-[420px] pt-[calc(64px)]` }>
                        {children}
                    </main>
                </div>

                {/* Footer */}
                <footer className={ `md:flex md:justify-center px-6 pb-6` }>
                    <div className={ ` flex flex-row gap-1 items-center h-10` }>
                        <span>©</span>
                        <span>{ moment().format('Y') }</span>
                        <span>{ appName }</span>
                    </div>
                </footer>

                {/* Floating Action Button */}
                {(() => {
                    if(fabAction !== null){
                        let action: any = [];

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
                        // Push planned-payment action
                        if(fabAction.includes('plannedPayment')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('planned-payment.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-wallet` }>
                                    <i className={ `fa-regular fa-clock h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Planned Payment</span>
                                </DropdownMenuItem>
                            );
                        }
                        // Push tags action
                        if(fabAction.includes('tags')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('tags.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-tags` }>
                                    <i className={ `fa-solid fa-tags h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Tags</span>
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
                        // Push wallet action
                        if(fabAction.includes('wallet-group')){
                            action.push(
                                <DropdownMenuItem onClick={() => {
                                    document.dispatchEvent(new CustomEvent('wallet-group.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }} className={ `cursor-pointer flex items-center gap-2` } key={ `fab-wallet` }>
                                    <i className={ `fa-solid fa-wallet h-4 w-4 text-center` }></i>
                                    <span className={ `` }>Wallet Group</span>
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
                
                {/* Category Modal - Dialog */}
                <CategoryDialog openState={ openCategoryDialog } setOpenState={ handleOpenCategoryDialog }/>
                <CategoryDeleteDialog openState={ openCategoryDeleteDialog } setOpenState={ handleOpenCategoryDeleteDialog }/>
            
                {/* Planned Payment Modal - Dialog */}
                <PlannedPaymentDialog openState={ openPlannedPaymentDialog } setOpenState={ handleOpenPlannedPaymentDialog }/>
                <PlannedPaymentDeleteDialog openState={ openPlannedPaymentDeleteDialog } setOpenState={ handleOpenPlannedPaymentDeleteDialog }/>

                {/* Record Modal - Dialog */}
                <RecordDialog openState={ openRecordDialog } setOpenState={ handleOpenRecordDialog }/>
                <RecordDeleteDialog openState={ openRecordDeleteDialog } setOpenState={ handleOpenRecordDeleteDialog }></RecordDeleteDialog>

                {/* Tags Modal - Dialog */}
                <TagsDialog openState={ openTagsDialog } setOpenState={ handleOpenTagsDialog }/>
                <TagsDeleteDialog openState={ openTagsDeleteDialog } setOpenState={ handleOpenTagsDeleteDialog }/>

                {/* Wallet Modal - Dialog */}
                <WalletDialog openState={ openWalletDialog } setOpenState={ handleOpenWalletDialog }/>
                <WalletDeleteDialog openState={ openWalletDeleteDialog } setOpenState={ handleOpenWalletDeleteDialog }/>
                <WalletBalanceAdjustmentDialog openState={ openWalletBalanceAdjustmentDialog } setOpenState={ handleOpenWalletBalanceAdjustmentDialog }/>

                {/* Wallet Modal - Dialog */}
                <WalletGroupDialog openState={ openWalletGroupDialog } setOpenState={ handleOpenWalletGroupDialog }/>
                <WalletGroupDeleteDialog openState={ openWalletGroupDeleteDialog } setOpenState={ handleOpenWalletGroupDeleteDialog }/>

                {/* Wallet Modal - Dialog */}
                <NotificationDialog openState={ openNotificationDialog } setOpenState={ handleOpenNotificationDialog }/>
            </div>

            <Toaster/>
        </ThemeProvider>
    );
}
