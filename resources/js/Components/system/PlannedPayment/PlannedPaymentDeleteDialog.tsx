// Shadcn
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import axios, { AxiosError } from 'axios';

type dialogProps = {
    openState?: boolean;
    setOpenState?: (isOpen: boolean) => void;
};

export default function PlannedPaymentDeleteDialog({ openState, setOpenState }: dialogProps){
    const [plannedUuid, setPlannedUuid] = useState<string>();
    const [plannedAction, setPlannedAction] = useState<string>('delete');
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDeleteAction = (event: any) => {
            // Override default action (Ex: for skip planned record)
            if(event?.detail?.action){
                setPlannedAction(event.detail.action);
            }

            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;
                setPlannedUuid(uuid);
                
                // Open record-dialog
                if(setOpenState){
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                }
            }
        }
        window.addEventListener('planned-payment.delete-action', handleDeleteAction);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('planned-payment.delete-action', handleDeleteAction);
        };
    }, []);

    const [deleteAbortController, setDeleteAbortController] = useState<AbortController | null>(null);
    const confirmDelete = ($refs: any) => {
        let el = $refs.target as HTMLElement;
        if(el){
            if(el.tagName.toLowerCase() === 'button'){
                el.setAttribute('disabled', 'disabled');
            }
            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }

        if(plannedUuid){
            if(deleteAbortController instanceof AbortController){
                deleteAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const abortController = new AbortController();
            setDeleteAbortController(abortController);

            let formData = new FormData();
            formData.append('_method', 'DELETE');
            // Make delete request
            axios.post(route('api.planned-payment.v1.destroy', {
                uuid: plannedUuid,
                action: plannedAction
            }), formData, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            }).then((response) => {
                if (response.status === 200) {
                    const responseJson = response.data;

                    setTimeout(() => {
                        if(setOpenState){
                            if (el) {
                                if (el.tagName.toLowerCase() === 'button') {
                                    el.removeAttribute('disabled');
                                }
                                el.innerHTML = `Continue`;
                            }
            
                            // Announce Dialog Global Event
                            document.dispatchEvent(new CustomEvent('planned-payment.deleted-action', {
                                bubbles: true,
                                detail: {
                                    action: plannedAction
                                }
                            }));
                            setOpenState(false);
                        }
                    }, 200);
                }
            }).catch((response) => {
                const axiosError = response as AxiosError;
            });
        }
    };

    return (
        <section id={ `plannedPayment-deleteDialogSection` }>
            <AlertDialog open={ openState } onOpenChange={ setOpenState }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={ `dark:text-white` }>Are you sure want to {plannedAction === 'delete' ? `delete related data` : `skip this period`}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span>This action cannot be undone</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant={ `ghost` } className={ `dark:text-gray-200` } onClick={ ($refs) => {
                            if(setOpenState){
                                setOpenState(false);
                            }
                            if(deleteAbortController instanceof AbortController){
                                deleteAbortController.abort();
                            }
                        } }>
                            Cancel
                        </Button>
                        <Button onClick={ ($refs) => {
                            confirmDelete($refs);
                        } }>
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}