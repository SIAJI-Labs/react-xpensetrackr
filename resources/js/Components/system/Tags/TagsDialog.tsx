import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { TagsItem } from "@/types";

// Plugins
import { IMaskMixin } from "react-imask";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useToast } from "@/Components/ui/use-toast";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function TagsDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const { toast } = useToast();

    // Form
    const [formParent, setFormParent] = useState<string>("");
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenTagsDialog] = useState<boolean>(false);

    // Form Reset
    const resetFormDialog = () => {
        setFormUuid('');
        setFormParent('');
        setFormName('');

        setErrorFormDialog({});
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setFormDialogAbortController] = useState<AbortController | null>(null);
    const handleFormSubmit: FormEventHandler = (e) => {
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('tags-dialogSubmit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorFormDialog({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setFormDialogAbortController(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('parent_id', formParent);
        formData.append('name', formName);

        if(formUuid){
            formData.append('tags_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.tags.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.tags.v1.update', formUuid);
        }

        // Make request call
        axios.post(actionRoute, formData, {
            cancelToken: new axios.CancelToken(function executor(c) {
                // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                abortController.abort = c;
            })
        }).then((response) => {
            if (response.status === 200) {
                const responseJson = response.data;
            
                if (responseJson?.code === 200) {
                    if (!keepOpenDialog) {
                        setOpenState(false);
                    } else {
                        // Reset form
                        resetFormDialog();
                    }
            
                    toast({
                        title: "Action: Success",
                        description: "Tags data successfully saved",
                    });
                }
            }

            return true;
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorFormDialog(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#tags-dialogForms .form--group.is--invalid');
        
                // Check if there are any 'is--invalid' elements
                if (errorElements.length > 0) {
                    // Find the element with the highest top offset within the 'is--invalid' elements
                    const highestElement = Array.from(errorElements).reduce((a, b) =>
                        (a as HTMLElement).offsetTop > (b as HTMLElement).offsetTop ? b : a
                    );
            
                    // Scroll the element with the highest top offset into view with a smooth behavior
                    highestElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }).finally(() => {
            // Clear the AbortController from state
            setFormDialogAbortController(null);
        
            // Update to original state
            let submitBtn = document.getElementById('tags-dialogSubmit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    };

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.tags.shown', { bubbles: true }));
        } else {
            resetFormDialog();
            setKeepOpenTagsDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.tags.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Document Ready
    const [tagsFetchAbortController, setTagsFetchAbortController] = useState<AbortController | null>(null);
    const fetchTagsData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(tagsFetchAbortController instanceof AbortController){
            tagsFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setTagsFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.tags.v1.show', uuid)}?action=${action}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;

            return jsonResponse.result.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle the cancellation here if needed
                console.log('Request was canceled', error);
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }

        return [];
    }
    useEffect(() => {
        // Listen to Edit Action
        const editAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchTagsData(uuid, 'edit').then((data: TagsItem) => {
                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    
                    // Open dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('tags.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('tags.edit-action', editAction);
        };
    }, []);

    return (
        <section id={ `tags-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="tags-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Tags</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} id={ `tags-dialogForms` } className={ ` overflow-auto border-t border-b max-h-screen md:max-h-[50vh] p-6` }>
                        {/* Name */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Name</label>
                            <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Tags Name` } id={ `form-tags_name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                                
                            <ErrorMessage message={ errorFormDialog?.name }/>
                        </div>

                        {/* Keep open dialog? */}
                        <div className={ `form-group` }>
                            <div className={ `flex items-center space-x-2` }>
                                <Checkbox id="form-tags_keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                                    if(typeof value === 'boolean'){
                                        setKeepOpenTagsDialog(value);
                                    }
                                }} />
                                <label
                                    htmlFor="form-tags_keep_open"
                                    className={ `text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white` }
                                >
                                    Keep Open?
                                </label>
                            </div>
                        </div>
                    </form>

                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('tags-dialogForms')){
                                (document.getElementById('tags-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='tags-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}