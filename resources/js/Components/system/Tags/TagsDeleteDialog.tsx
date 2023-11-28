// Shadcn
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import axios, { AxiosError } from 'axios';

type dialogProps = {
    openState: boolean;
    setOpenState?: (isOpen: boolean) => void;
};

export default function TagsDeleteDialog({ openState, setOpenState }: dialogProps){
    const [tagsUuid, setTagsUuid] = useState<string>();
    useEffect(() => {
        // Listen to Tags Dialog event
        const handleDeleteAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;
                setTagsUuid(uuid);
                
                // Open tags-dialog
                if(setOpenState){
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                }
            }
        }
        window.addEventListener('tags.delete-action', handleDeleteAction);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('tags.delete-action', handleDeleteAction);
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

        if(tagsUuid){
            // Create a new AbortController for the new request.
            const abortController = new AbortController();
            setDeleteAbortController(abortController);

            let formData = new FormData();
            formData.append('_method', 'DELETE');
            // Make delete request
            axios.post(route('api.tags.v1.destroy', tagsUuid), formData, {
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
                            document.dispatchEvent(new CustomEvent('tags.deleted-action', {
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
        <section id={ `tags-deleteDialogSection` }>
            <AlertDialog open={ openState } onOpenChange={ setOpenState }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={ `dark:text-white` }>Are you sure want to delete related data?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span>This action cannot be undone. This will affect your Tags Balance</span>
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