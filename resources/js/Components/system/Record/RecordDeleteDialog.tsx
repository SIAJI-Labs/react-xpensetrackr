// Shadcn
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import axios, { AxiosError } from 'axios';

type RecordDialogProps = {
    openState: boolean;
    setOpenState?: (isOpen: boolean) => void;
};

export default function RecordDeleteDialog({ openState, setOpenState }: RecordDialogProps){
    const [recordUuid, setRecordUuid] = useState<string>();
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDeleteDialogRecord = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;
                setRecordUuid(uuid);
                
                // Open record-dialog
                if(setOpenState){
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                }
            }
        }
        window.addEventListener('recordDialogDeleteAction', handleDeleteDialogRecord);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('recordDialogDeleteAction', handleDeleteDialogRecord);
        };
    }, []);

    const [recordDeleteAbortController, setRecordDeleteAbortController] = useState<AbortController | null>(null);
    const confirmDelete = ($refs: any) => {
        let el = $refs.target as HTMLElement;
        if(el){
            if(el.tagName.toLowerCase() === 'button'){
                el.setAttribute('disabled', 'disabled');
            }
            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }

        if(recordUuid){
            // Create a new AbortController for the new request.
            const abortController = new AbortController();
            setRecordDeleteAbortController(abortController);

            let formData = new FormData();
            formData.append('_method', 'DELETE');
            // Make delete request
            axios.post(route('api.record.v1.destroy', recordUuid), formData, {
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
                            document.dispatchEvent(new CustomEvent('dialogRecord', {
                                bubbles: true,
                                detail: {
                                    action: 'delete'
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
        <section id={ `recordDeleteDialog-section` }>
            <AlertDialog open={ openState } onOpenChange={ setOpenState }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={ `dark:text-white` }>Are you sure want to delete related data?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span>This action cannot be undone. This will affect your Wallet Balance</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant={ `ghost` } className={ `dark:text-gray-200` } onClick={ ($refs) => {
                            if(setOpenState){
                                setOpenState(false);
                            }
                            if(recordDeleteAbortController instanceof AbortController){
                                recordDeleteAbortController.abort();
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