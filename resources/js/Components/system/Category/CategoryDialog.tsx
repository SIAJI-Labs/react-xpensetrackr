import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { CategoryItem } from "@/types";

// Plugins

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Check, ChevronsUpDown } from "lucide-react";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function CategoryDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();

    // Form
    const [formParent, setFormParent] = useState<string>("");
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenCategoryDialog] = useState<boolean>(false);

    // Combobox - Parent Category
    let comboboxParentTimeout: any;
    const [openCategoryParent, setOpenCategoryParent] = useState<boolean>(false);
    const [comboboxParentLabel, setComboboxParentLabel] = useState<string>("Select an option");
    const [comboboxParentList, setComboboxParentList] = useState<string[] | any>([]);
    const [comboboxParentInput, setComboboxParentInput] = useState<string>("");
    const [comboboxParentLoad, setComboboxParentLoad] = useState<boolean>(false);
    const [comboboxParentAbortController, setComboboxParentAbortController] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxParentLoad(true);

        try {
            // Build parameter
            const query = [];
            const obj = {
                only_parent: true,
                keyword: keyword,
            }
            for (const key in obj) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
            }

            try {
                const response = await axios.get(`${route('api.category.v1.list')}?${query.join('&')}`, {
                    cancelToken: new axios.CancelToken(function executor(c) {
                        // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                        abortController.abort = c;
                    })
                });
            
                // Use response.data instead of req.json() to get the JSON data
                let responseJson = response.data;
                return responseJson.result.data;
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Handle the cancellation here if needed
                    console.log('Request was canceled', error);
                } else {
                    // Handle other errors
                    console.error('Error:', error);
                }
            }
        } catch (error) {
            // Handle errors, if needed
            console.error('Request error:', error);
            throw error;
        }

        return [];
    }
    useEffect(() => {
        clearTimeout(comboboxParentTimeout);
        setComboboxParentList([]);

        if(openCategoryParent){
            if (comboboxParentAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxParentAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxParentAbortController(newAbortController);

            comboboxParentTimeout = setTimeout(() => {
                fetchCategoryList(comboboxParentInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxParentLoad(false);
                        if(data){
                            setComboboxParentList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 0);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxParentAbortController) {
                    comboboxParentAbortController.abort();
                }
            };
        }
    }, [comboboxParentInput, openCategoryParent]);
    useEffect(() => {
        setComboboxParentInput('');
    }, [openCategoryParent]);
    useEffect(() => {
        if(openState){
            if(formParent === ''){
                setComboboxParentLabel(`Select an option`);
            }
        } else {
            if(!formUuid){
                setComboboxParentLabel(`Select an option`);
            }
        }
    }, [formParent]);

    // Category Dialog - Forms
    const resetFormDialog = () => {
        setFormUuid('');
        setFormParent('');
        setFormName('');

        // Reset Form Error Bag
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
        let submitBtn = document.getElementById('category-dialogSubmit');
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
            formData.append('category_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.category.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.category.v1.update', formUuid);
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
                    if (keepOpenDialog) {
                        // Reset form
                        resetFormDialog();
                    } else {
                        // Hide dialog
                        setOpenState(false);
                    }
            
                    toast("Action: Success", {
                        description: "Category data successfully saved",
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
                const errorElements = document.querySelectorAll('#category-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('category-dialogSubmit');
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
            document.dispatchEvent(new CustomEvent('dialog.category.shown', { bubbles: true }));
        } else {
            resetFormDialog();
            setKeepOpenCategoryDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.category.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Document Ready
    const [categoryFetchAbortController, setCategoryFetchAbortController] = useState<AbortController | null>(null);
    const fetchCategoryData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(categoryFetchAbortController instanceof AbortController){
            categoryFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setCategoryFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.category.v1.show', uuid)}?action=${action}`, {
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
                fetchCategoryData(uuid, 'edit').then((data: CategoryItem) => {
                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    setFormParent(data.parent ? data.parent.uuid : '');

                    // Update Combobox Label
                    if(data.parent){
                        setComboboxParentLabel(data.parent.name);
                    }
                    
                    // Open dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('category.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('category.edit-action', editAction);
        };
    }, []);

    return (
        <section id={ `category-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="category-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Category</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} id={ `category-dialogForms` } className={ ` flex-1 overflow-auto border-t border-b max-h-screen md:max-h-[50vh] p-6` }>
                        {/* Parent Category */}
                        <div className={ ` form--group  ${errorFormDialog?.parent_id ? ` is--invalid` : ''}` } id={ `form-category_parent` }>
                            <label className={ ` form--label` }>Parent</label>
                            <div>
                                <Popover open={openCategoryParent} onOpenChange={setOpenCategoryParent}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openCategoryParent}
                                            className={ `w-full justify-between ${errorFormDialog?.parent_id ? ` !border-red-500` : ''} dark:text-white` }
                                        >
                                            <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{comboboxParentLabel}</span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                        <Command shouldFilter={ false }>
                                            <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={comboboxParentInput} onValueChange={setComboboxParentInput}/>
                                            
                                            <ScrollArea className="p-0">
                                                <div className={ `max-h-[10rem]` }>
                                                    <CommandEmpty>{comboboxParentLoad ? `Loading...` : `No category found.`}</CommandEmpty>
                                                    <CommandGroup>
                                                        {comboboxParentList.map((options: CategoryItem) => (
                                                            <CommandItem
                                                                value={options?.uuid}
                                                                key={options?.uuid}
                                                                onSelect={(currentValue) => {
                                                                    setFormParent(currentValue === formParent ? "" : currentValue);
                                                                    setComboboxParentLabel(options.name);
                                                                    
                                                                    setOpenCategoryParent(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 ${formParent === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.parent ? `${options.parent.name} - ` : ''}${options?.name}` }</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </div>
                                            </ScrollArea>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <ErrorMessage message={ errorFormDialog?.parent_id }/>
                            </div>
                        </div>
                        
                        {/* Name */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Name</label>
                            <Input value={ formName } id={ `form-category_name` } onChange={(e) => setFormName(e.target.value)} placeholder={ `Category Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                                
                            <ErrorMessage message={ errorFormDialog?.name }/>
                        </div>

                        {/* Keep open dialog? */}
                        <div className={ `form-group` }>
                            <div className={ `flex items-center space-x-2` }>
                                <Checkbox id="form-category_keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                                    if(typeof value === 'boolean'){
                                        setKeepOpenCategoryDialog(value);
                                    }
                                }} />
                                <label
                                    htmlFor="form-category_keep_open"
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
                            if(document.getElementById('category-dialogForms')){
                                (document.getElementById('category-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='category-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}