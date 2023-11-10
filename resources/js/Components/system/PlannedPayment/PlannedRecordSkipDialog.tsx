// Shadcn
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import axios, { AxiosError } from 'axios';

type PlannedDialogProps = {
    openState?: boolean;
    setOpenState?: (isOpen: boolean) => void;
};

export default function PlannedRecordSkipDialog({ openState, setOpenState }: PlannedDialogProps){
    const [plannedUuid, setPlannedUuid] = useState<string>();
    useEffect(() => {
        // Listen to Record Dialog event
        const handleSkipDialogPlannedRecord = (event: any) => {
            console.log(event);
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
        window.addEventListener('planned-payment.record.skip', handleSkipDialogPlannedRecord);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('planned-payment.record.skip', handleSkipDialogPlannedRecord);
        };
    }, []);

    const [plannedDeleteAbortController, setPlannedDeleteAbortController] = useState<AbortController | null>(null);
    const confirmDelete = ($refs: any) => {
        let el = $refs.target as HTMLElement;
        if(el){
            if(el.tagName.toLowerCase() === 'button'){
                el.setAttribute('disabled', 'disabled');
            }
            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }

        if(plannedUuid){
            if(plannedDeleteAbortController instanceof AbortController){
                plannedDeleteAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const abortController = new AbortController();
            setPlannedDeleteAbortController(abortController);

            let formData = new FormData();
            formData.append('_method', 'DELETE');
            // Make delete request
            axios.post(route('api.planned-payment.v1.destroy', {
                uuid: plannedUuid,
                action: 'skip'
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
                            document.dispatchEvent(new CustomEvent('planned-payment.record.skipped', {
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
        <section id={ `plannedRecordSkipDialog-section` }>
            <AlertDialog open={ openState } onOpenChange={ setOpenState }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={ `dark:text-white` }>Are you sure want to skip this period?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span>This action cannot be undone</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant={ `ghost` } className={ `dark:text-gray-200` } onClick={ ($refs) => {
                            if(setOpenState){
                                setOpenState(false);
                            }
                            if(plannedDeleteAbortController instanceof AbortController){
                                plannedDeleteAbortController.abort();
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