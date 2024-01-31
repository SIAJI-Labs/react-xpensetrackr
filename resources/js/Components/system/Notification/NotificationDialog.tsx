import {useEffect, useState } from "react";
import axios from "axios";
import { NotificationItem } from "@/types";

// Plugins
import { useMediaQuery } from 'usehooks-ts'
import moment from "moment";

// Partials

// Shadcn
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function NotificationDialog({ openState, setOpenState }: dialogProps){
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [notificationItem, setNotificationItem] = useState<NotificationItem | undefined>();

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.notification.shown', { bubbles: true }));
        } else {
            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.notification.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Document Ready
    const [notificationFetchAbortController, setNotificationFetchAbortController] = useState<AbortController | null>(null);
    const fetchNotificationData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(notificationFetchAbortController instanceof AbortController){
            notificationFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setNotificationFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.report.notification.v1.show', uuid)}?action=${action}`, {
                signal: abortController?.signal
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;

            return jsonResponse.result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                // // Handle the cancellation here if needed
                // console.log('Request was canceled', error);
            } else {
                // // Handle other errors
                // console.error('Error:', error);
            }
        }

        return [];
    }
    useEffect(() => {
        // Listen to Detail Action
        const detailAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchNotificationData(uuid, 'edit').then((data: NotificationItem) => {
                    // Update State
                    setNotificationItem(data);
                    
                    // Open dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('notification.detail-action', detailAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('notification.detail-action', detailAction);
        };
    }, []);

    let mainContent = <></>;
    if(notificationItem){
        mainContent = <>
            <div className={ ` ${isDesktop ? ` px-6` : `px-4 mb-6`}` }>
                <div className={ ` flex flex-col gap-4` }>
                    {/* Header */}
                    <div className={ ` flex flex-col gap-1` }>
                        <small>
                            <span>You've receive notification at <u>{ moment(notificationItem.created_at).format('Do MMM, YYYY / HH:mm') }</u></span>

                            {(() => {
                                if(notificationItem.seen_at){
                                    return <span>, seen at <u>{ moment(notificationItem.seen_at).format('Do MMM, YYYY / HH:mm') }</u></span>
                                }

                                return <></>;
                            })()}
                        </small>
                    </div>

                    {/* Message */}
                    <div className={ ` p-4 rounded bg-gray-100 flex flex-col gap-1` }>
                        <span className={ ` font-medium` }>{ notificationItem.title }</span>
                        { notificationItem.message }
                    </div>

                    {/* Action */}
                    {(() => {
                        if(notificationItem.action && 'actions' in notificationItem.action && notificationItem.action.actions.length > 0){
                            let items: any = [];
                            (notificationItem.action.actions).forEach((value: any, index: any) => {
                                if(value.url){
                                    items.push(
                                        <Link href={ value.url } key={ `action_${index}` }>
                                            <Button type={ `button`} variant={ `secondary` }>{ value.title }</Button>
                                        </Link>
                                    );
                                }
                            });

                            if(items.length > 0){
                                return <div className={ ` flex flex-row gap-4` }>
                                    { items }
                                </div>
                            }
                        }

                        return <></>;
                    })()}
                </div>
            </div>
        </>;
    }

    if(isDesktop){
        return (
            <section id={ `notification-dialogSection` }>
                <Dialog open={openState} onOpenChange={setOpenState}>
                    <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="notification-dialog">
                        <DialogHeader className={ ` p-6 pb-2` }>
                            <DialogTitle className={ ` dark:text-white` }>Notification Detail</DialogTitle>
                        </DialogHeader>

                        {mainContent}
    
                        <DialogFooter className={ ` p-6 pt-2` }>
                            <Button type='button' variant={ `outline` } id='notification-dialogSubmit'>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>
        );
    }

    return (
        <Drawer open={openState} onOpenChange={setOpenState}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Notification Detail</DrawerTitle>
                </DrawerHeader>

                {mainContent}

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}