import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { CategoryItem } from "@/types";

// Plugins
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Check, ChevronsUpDown } from "lucide-react";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function CategoryDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Form
    const [formParent, setFormParent] = useState<string>("");
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenCategoryDialog] = useState<boolean>(false);

    // Combobox - Parent Category
    const [comboboxParentTimeout, setComboboxParentTimeout] = useState<any>();
    const [comboboxParentOpenState, setComboboxParentOpenState] = useState<boolean>(false);
    const [comboboxParentLabel, setComboboxParentLabel] = useState<string>("Select an option");
    const [comboboxParentList, setComboboxParentList] = useState<string[] | any>([]);
    const [comboboxParentInput, setComboboxParentInput] = useState<string>("");
    const [comboboxParentLoadState, setComboboxParentLoadState] = useState<boolean>(false);
    const [comboboxParentAbortController, setComboboxParentAbortController] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string): Promise<string[]> => {
        const abortController = new AbortController();
        setComboboxParentAbortController(abortController);

        // Handle loading state
        setComboboxParentLoadState(true);

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
                    signal: abortController?.signal
                });
            
                setComboboxParentAbortController(null);
                // Use response.data instead of req.json() to get the JSON data
                let responseJson = response.data;

                return responseJson.result.data;
            } catch (error) {
                if (axios.isCancel(error)) {
                    // // Handle the cancellation here if needed
                    // console.log('Request was canceled', error);
                } else {
                    // // Handle other errors
                    // console.error('Error:', error);
                }
            }
        } catch (error) {
            // // Handle errors, if needed
            // console.error('Request error:', error);

            throw error;
        }

        return comboboxParentList;
    }
    useEffect(() => {
        clearTimeout(comboboxParentTimeout);

        if(comboboxParentOpenState){
            // Abort previous request
            if(comboboxParentAbortController instanceof AbortController){
                comboboxParentAbortController.abort();
            }

            let timeout = setTimeout(() => {
                fetchCategoryList(comboboxParentInput)
                    .then((data: string[] = []) => {
                        setComboboxParentLoadState(false);
                        if(data){
                            setComboboxParentList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);
            setComboboxParentTimeout(timeout);
        }
    }, [comboboxParentInput, comboboxParentOpenState]);
    useEffect(() => {
        setComboboxParentInput('');
    }, [comboboxParentOpenState]);
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

    // Form Reset
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
            signal: abortController.signal
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
        if(!isFirstRender){
            setTimeout(() => {
                // Abort Dialog request
                if(formDialogAbortController instanceof AbortController){
                    formDialogAbortController.abort();
                }
                // Abort Detail request
                if(categoryFetchAbortController instanceof AbortController){
                    categoryFetchAbortController.abort();
                }
                // Abort Category List request
                if(comboboxParentAbortController instanceof AbortController){
                    comboboxParentAbortController.abort();
                }
                
                if(openState){
                    document.dispatchEvent(new CustomEvent('dialog.category.shown', { bubbles: true }));
                } else {
                    resetFormDialog();
                    setKeepOpenCategoryDialog(false);
        
                    // Announce Dialog Global Event
                    document.dispatchEvent(new CustomEvent('dialog.category.hidden', { bubbles: true }));
                }
            }, 100);
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
                signal: abortController.signal
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

    const formContent = <>
        <RemoveScroll className={ `overflow-auto border-t border-b ${isDesktop ? `max-h-screen md:max-h-[50vh]` : ``}` }>
            <form onSubmit={handleFormSubmit} id={ `category-dialogForms` } className={ ` flex-1 overflow-hidden p-6` }>
                {/* Parent Category */}
                <div className={ ` form--group  ${errorFormDialog?.parent_id ? ` is--invalid` : ''}` } id={ `form-category_parent` }>
                    <label className={ ` form--label` }>Parent</label>
                    <div>
                        <Popover open={comboboxParentOpenState} onOpenChange={setComboboxParentOpenState}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={comboboxParentOpenState}
                                    className={ `w-full justify-between ${errorFormDialog?.parent_id ? ` !border-red-500` : ''} dark:text-white` }
                                >
                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{comboboxParentLabel}</span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                <Command shouldFilter={ false }>
                                    <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0 ${comboboxParentLoadState ? 'is-loading' : ''}` } value={comboboxParentInput} onValueChange={setComboboxParentInput}/>
                                    
                                    <ScrollArea className="p-0">
                                        <div className={ `max-h-[10rem]` }>
                                            <CommandEmpty>{comboboxParentLoadState ? `Loading...` : `No category found.`}</CommandEmpty>
                                            <CommandGroup>
                                                {comboboxParentList.map((options: CategoryItem) => (
                                                    <CommandItem
                                                        value={options?.uuid}
                                                        key={options?.uuid}
                                                        onSelect={(currentValue) => {
                                                            setFormParent(currentValue === formParent ? "" : currentValue);
                                                            setComboboxParentLabel(options.name);
                                                            
                                                            setComboboxParentOpenState(false);
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
        </RemoveScroll>
    </>;

    if(!isDesktop){
        return (
            <section id={ `category-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>{ formUuid ? `Edit` : `Add new` } Category</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

                        <DrawerFooter className="pt-2">
                            <Button type='button' onClick={() => {
                                if(document.getElementById('category-dialogForms')){
                                    (document.getElementById('category-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='category-dialogSubmit'>Submit</Button>
                            <Button variant={ `ghost` } onClick={() => {
                                resetFormDialog();
                            }}>
                                <span>Reset</span>
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>
        );
    }

    return (
        <section id={ `category-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="category-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Category</DialogTitle>
                    </DialogHeader>

                    { formContent }

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