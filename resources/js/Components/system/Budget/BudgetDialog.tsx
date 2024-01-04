import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { BudgetItem, CategoryItem, TagsItem, WalletItem } from "@/types";

// Plugins

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Check, ChevronsUpDown } from "lucide-react";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
// import { useToast } from "@/Components/ui/use-toast";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { IMaskMixin } from "react-imask";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "sonner";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function BudgetDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    // const { toast } = useToast();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Form
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    const [formLimit, setFormLimit] = useState<number>();
    const [formOccurence, setFormOccurence] = useState<string>('recurring');
    const [formInterval, setFormInterval] = useState<string>('');
    const [formNotes, setFormNotes] = useState<string>('');
    const [formCategory, setFormCategory] = useState<string[]>([]);
    const [formWallet, setFormWallet] = useState<string[]>([]);
    const [formTags, setFormTags] = useState<string[]>([]);
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenBudgetDialog] = useState<boolean>(false);

    // Budget Dialog - Forms
    const resetFormDialog = () => {
        setFormUuid('');
        setFormName('');
        setFormLimit(undefined);
        setFormOccurence('recurring');
        setFormInterval('');
        setFormNotes('');
        setFormCategory([]);
        setFormWallet([]);
        setFormTags([]);

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
        let submitBtn = document.getElementById('budget-dialogSubmit');
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
        formData.append('name', formName);
        formData.append('limit', String(formLimit));
        formData.append('occurence', formOccurence);
        formData.append('interval', formInterval);
        formData.append('notes', formNotes);
        if(formCategory.length > 0){
            formCategory.forEach((value, index) => {
                formData.append('category[]', value);
            });
        }
        if(formWallet.length > 0){
            formWallet.forEach((value, index) => {
                formData.append('wallet[]', value);
            });
        }
        if(formTags.length > 0){
            formTags.forEach((value, index) => {
                formData.append('tags[]', value);
            });
        }

        if(formUuid){
            formData.append('budget_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.budget.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.budget.v1.update', formUuid);
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
                        description: "Budget data successfully saved",
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
                const errorElements = document.querySelectorAll('#budget-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('budget-dialogSubmit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    };

    // Combobox - Category
    let comboboxCategoryTimeout: any;
    const [comboboxCategoryOpenState, setComboboxCategoryOpenState] = useState<boolean>(false);
    const [comboboxCategoryLabel, setComboboxCategoryLabel] = useState<string[] | any[]>([]);
    const [comboboxCategoryList, setComboboxCategoryList] = useState<string[] | any>([]);
    const [comboboxCategoryInput, setComboboxCategoryInput] = useState<string>("");
    const [comboboxCategoryLoadState, setComboboxCategoryLoadState] = useState<boolean>(false);
    const [comboboxCategoryAbort, setComboboxCategoryAbort] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxCategoryLoadState(true);

        try {
            // Build parameter
            const query = [];
            const obj = {
                keyword: keyword
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
        clearTimeout(comboboxCategoryTimeout);
        // setComboboxCategoryList([]);

        if(comboboxCategoryOpenState){
            if (comboboxCategoryAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxCategoryAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxCategoryAbort(newAbortController);

            comboboxCategoryTimeout = setTimeout(() => {
                fetchCategoryList(comboboxCategoryInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxCategoryLoadState(false);
                        if(data){
                            setComboboxCategoryList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxCategoryAbort) {
                    comboboxCategoryAbort.abort();
                }
            };
        }
    }, [comboboxCategoryInput, comboboxCategoryOpenState]);
    useEffect(() => {
        setComboboxCategoryInput('')
    }, [comboboxCategoryOpenState]);

    // Combobox - Wallet
    let comboboxWalletTimeout: any;
    const [comboboxWalletOpenState, setComboboxWalletOpenState] = useState<boolean>(false);
    const [comboboxWalletLabel, setComboboxWalletLabel] = useState<string[] | any[]>([]);
    const [comboboxWalletList, setComboboxWalletList] = useState<string[] | any>([]);
    const [comboboxWalletInput, setComboboxWalletInput] = useState<string>("");
    const [comboboxWalletLoadState, setComboboxWalletLoadState] = useState<boolean>(false);
    const [comboboxWalletAbort, setComboboxWalletAbort] = useState<AbortController | null>(null);
    const fetchWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxWalletLoadState(true);

        try {
            // Build parameter
            const query = [];
            const obj = {
                keyword: keyword
            }
            for (const key in obj) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
            }

            try {
                const response = await axios.get(`${route('api.wallet.v1.list')}?${query.join('&')}`, {
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
        clearTimeout(comboboxWalletTimeout);
        // setComboboxWalletList([]);

        if(comboboxWalletOpenState){
            if (comboboxWalletAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxWalletAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxWalletAbort(newAbortController);

            comboboxWalletTimeout = setTimeout(() => {
                fetchWalletList(comboboxWalletInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxWalletLoadState(false);
                        if(data){
                            setComboboxWalletList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxWalletAbort) {
                    comboboxWalletAbort.abort();
                }
            };
        }
    }, [comboboxWalletInput, comboboxWalletOpenState]);
    useEffect(() => {
        setComboboxWalletInput('')
    }, [comboboxWalletOpenState]);

    // Combobox - Tags
    let comboboxTagsTimeout: any;
    const [comboboxTagsOpenState, setComboboxTagsOpenState] = useState<boolean>(false);
    const [comboboxTagsLabel, setComboboxTagsLabel] = useState<string[] | any[]>([]);
    const [comboboxTagsList, setComboboxTagsList] = useState<string[] | any>([]);
    const [comboboxTagsInput, setComboboxTagsInput] = useState<string>("");
    const [comboboxTagsLoadState, setComboboxTagsLoadState] = useState<boolean>(false);
    const [comboboxTagsAbort, setComboboxTagsAbort] = useState<AbortController | null>(null);
    const fetchTagsList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxTagsLoadState(true);

        try {
            // Build parameter
            const query = [];
            const obj = {
                keyword: keyword
            }
            for (const key in obj) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
            }

            try {
                const response = await axios.get(`${route('api.tags.v1.list')}?${query.join('&')}`, {
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
        clearTimeout(comboboxTagsTimeout);
        // setComboboxTagsList([]);

        if(comboboxTagsOpenState){
            if (comboboxTagsAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxTagsAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxTagsAbort(newAbortController);

            comboboxTagsTimeout = setTimeout(() => {
                fetchTagsList(comboboxTagsInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxTagsLoadState(false);
                        if(data){
                            setComboboxTagsList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxTagsAbort) {
                    comboboxTagsAbort.abort();
                }
            };
        }
    }, [comboboxTagsInput, comboboxTagsOpenState]);
    useEffect(() => {
        setComboboxTagsInput('')
    }, [comboboxTagsOpenState]);

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.budget.shown', { bubbles: true }));
        } else {
            resetFormDialog();
            setKeepOpenBudgetDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.budget.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Document Ready
    const [budgetFetchAbortController, setBudgetFetchAbortController] = useState<AbortController | null>(null);
    const fetchBudgetData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(budgetFetchAbortController instanceof AbortController){
            budgetFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setBudgetFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.budget.v1.show', uuid)}?action=${action}`, {
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
                fetchBudgetData(uuid, 'edit').then((data: BudgetItem) => {
                    console.log(data);

                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    setFormLimit(data.amount);
                    setFormOccurence(data.occurence);
                    setFormInterval(data.interval);
                    setFormNotes(data.description);

                    // Handle category
                    if(data.budget_category && data.budget_category.length > 0){
                        let categoryUuid: any[] = [];
                        let categoryName: any[] = [];
                        (data.budget_category).forEach((value, index) => {
                            categoryUuid.push(value.uuid);
                            categoryName.push(value.name);
                        });
                        setFormCategory(categoryUuid);
                        setComboboxCategoryLabel(categoryName);
                    }

                    // Handle wallet
                    if(data.budget_wallet && data.budget_wallet.length > 0){
                        let walletUuid: any[] = [];
                        let walletName: any[] = [];
                        (data.budget_wallet).forEach((value, index) => {
                            walletUuid.push(value.uuid);
                            walletName.push(value.name);
                        });
                        setFormWallet(walletUuid);
                        setComboboxWalletLabel(walletName);
                    }

                    // Handle tags
                    if(data.budget_tags && data.budget_tags.length > 0){
                        let tagsUuid: any[] = [];
                        let tagsName: any[] = [];
                        (data.budget_tags).forEach((value, index) => {
                            tagsUuid.push(value.uuid);
                            tagsName.push(value.name);
                        });
                        setFormTags(tagsUuid);
                        setComboboxTagsLabel(tagsName);
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
        document.addEventListener('budget.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('budget.edit-action', editAction);
        };
    }, []);

    const mainForm = <>
        <form onSubmit={handleFormSubmit} id={ `budget-dialogForms` } className={ ` flex-1 overflow-auto border-t border-b max-h-screen md:max-h-[50vh] p-6` }>
            {/* Name */}
            <div className={ `form--group` }>
                <label className={ `form--label` }>Name</label>
                <Input value={ formName } id={ `form-budget_name` } onChange={(e) => setFormName(e.target.value)} placeholder={ `Budget Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                    
                <ErrorMessage message={ errorFormDialog?.name }/>
            </div>

            {/* Limit */}
            <div className={ ` form--group  ${errorFormDialog?.limit ? ` is--invalid` : ''}` } id={ `form-budget_dialog_limit` }>
                <label className={ `form--label` }>Limit</label>
                <MaskedInput
                    type={ `text` }
                    placeholder={ `Limit` }
                    inputMode={ `numeric` }
                    value={ (formLimit ?? 0).toString() }
                    className={ `${errorFormDialog?.limit ? ` !border-red-500` : ''}` }
                    mask={ Number }
                    unmask={ true }
                    thousandsSeparator={ `,` }
                    scale={ 2 }
                    radix={ `.` }
                    onBlur={ (element) => {
                        let value = (element.target as HTMLInputElement).value;
                        value = value.replaceAll(',', '');

                        setFormLimit(Number(value));
                    } }
                />

                <ErrorMessage message={ errorFormDialog?.limit }/>
            </div>

            {/* Occurence & Interval */}
            <div className={ ` flex flex-row gap-4` }>
                {/* Occurence */}
                <div className={ `form--group w-full` } id={ `form-budget_dialog_occurence` }>
                    <label className={ `form--label` }>Occurence</label>

                    <Select onValueChange={(value) => {
                        setFormOccurence(value);
                    }} value={formOccurence}>
                        <SelectTrigger className={ `dark:text-white ${errorFormDialog?.occurence ? ` !border-red-500` : ''}` }>
                            <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Occurence type</SelectLabel>
                                <SelectItem value="recurring">Recurring</SelectItem>
                                <SelectItem value="once">Once</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <ErrorMessage message={ errorFormDialog?.occurence }/>
                </div>

                {/* Interval */}
                <div className={ `form--group !mb-0 w-full` } id={ `form-budget_dialog_interval` }>
                    <label className={ `form--label` }>Interval</label>
                    <Select onValueChange={(value) => {
                            setFormInterval(value);
                        }} value={formInterval}>
                            <SelectTrigger className={ `dark:text-white ${errorFormDialog?.interval ? ` !border-red-500` : ''}` }>
                                <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Interval type</SelectLabel>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    <ErrorMessage message={ errorFormDialog?.interval }/>
                </div>
            </div>

            {/* Name */}
            <div className={ `form--group` }>
                <label className={ `form--label` }>Notes</label>
                <Textarea className={ `${errorFormDialog?.notes ? ` !border-red-500` : ''}` } placeholder={ `Add brief explanation` } value={ formNotes } id={ `form-budget_notes` } onChange={(e) => setFormNotes(e.target.value)} />
                    
                <ErrorMessage message={ errorFormDialog?.notes }/>
            </div>

            {/* Category */}
            <div className={ ` form--group ${errorFormDialog?.category ? ` is--invalid` : ''}` } id={ `form-budget_dialog_category` }>
                <label className={ ` form--label` }>Category</label>
                <div>
                    <div className={ ` flex flex-row gap-2 flex-wrap` }>
                        <Popover open={comboboxCategoryOpenState} onOpenChange={setComboboxCategoryOpenState}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                >
                                    <i className={ `fa-solid fa-plus` }></i>
                                    <span>Category</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                <Command shouldFilter={ false }>
                                    <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={comboboxCategoryInput} onValueChange={setComboboxCategoryInput}/>
                                    <ScrollArea className="p-0">
                                        <div className={ `max-h-[10rem]` }>
                                            <CommandEmpty>{comboboxCategoryLoadState ? `Loading...` : `No category found.`}</CommandEmpty>
                                            <CommandGroup>
                                                {(() => {
                                                    if(comboboxCategoryLoadState){
                                                        return <>
                                                            <CommandItem
                                                                value=''
                                                                key={ `category_loading-state` }
                                                                disabled={ true }
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 opacity-0`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>Fetching data...</span>
                                                            </CommandItem>
                                                        </>;
                                                    }

                                                    return <></>;
                                                })()}
                                                {comboboxCategoryList.map((options: CategoryItem) => (
                                                    <CommandItem
                                                        value={options?.uuid}
                                                        key={options?.uuid}
                                                        onSelect={(currentValue) => {
                                                            if(formCategory.includes(currentValue)){
                                                                // Already exists, remove from array
                                                                let uuidIndex = formCategory.indexOf(currentValue);
                                                                if (uuidIndex !== -1) {
                                                                    const updatedFormCategory = [...formCategory];
                                                                    updatedFormCategory.splice(uuidIndex, 1);
                                                                    setFormCategory(updatedFormCategory);
                                                                }

                                                                let nameIndex = comboboxCategoryLabel.indexOf(options?.name);
                                                                if (nameIndex !== -1) {
                                                                    const updatedLabelCategory = [...comboboxCategoryLabel];
                                                                    updatedLabelCategory.splice(nameIndex, 1);
                                                                    setComboboxCategoryLabel(updatedLabelCategory);
                                                                }
                                                            } else {
                                                                // Not yet exists, add to array
                                                                setFormCategory([...formCategory, currentValue])
                                                                setComboboxCategoryLabel([...comboboxCategoryLabel, options?.name]);
                                                            }
                                                        }}
                                                    >
                                                        <Check
                                                            className={ `mr-2 h-4 w-4 ${formCategory.includes(options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                        />
                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </div>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {(() => {
                            let selectedCategory: any = [];
                            if(formCategory.length > 0){
                                formCategory.forEach((value, index) => {
                                    let name = comboboxCategoryLabel[index];
                                    if(name){
                                        selectedCategory.push(
                                            <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_category-${value}` } onClick={() => {
                                                let uuidIndex = formCategory.indexOf(value);
                                                if (uuidIndex !== -1) {
                                                    const updatedFormCategory = [...formCategory];
                                                    updatedFormCategory.splice(uuidIndex, 1);
                                                    setFormCategory(updatedFormCategory);
                                                }

                                                let nameIndex = comboboxCategoryLabel.indexOf(name);
                                                if (nameIndex !== -1) {
                                                    const updatedLabelCategory = [...comboboxCategoryLabel];
                                                    updatedLabelCategory.splice(nameIndex, 1);
                                                    setComboboxCategoryLabel(updatedLabelCategory);
                                                }
                                            }}>
                                                <span>{ name }</span>
                                                <i className={ `fa-solid fa-xmark` }></i>
                                            </Button>
                                        );
                                    }
                                });

                                if(selectedCategory.length > 0){
                                    return selectedCategory;
                                }
                            }

                            return <></>;
                        })()}
                    </div>

                    <ErrorMessage message={ errorFormDialog?.category }/>
                </div>
            </div>

            {/* Wallet */}
            <div className={ ` form--group ${errorFormDialog?.wallet ? ` is--invalid` : ''}` } id={ `form-budget_dialog_wallet` }>
                <label className={ ` form--label` }>Wallet</label>
                <div>
                    <div className={ ` flex flex-row gap-2 flex-wrap` }>
                        <Popover open={comboboxWalletOpenState} onOpenChange={setComboboxWalletOpenState}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                >
                                    <i className={ `fa-solid fa-plus` }></i>
                                    <span>Wallet</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                <Command shouldFilter={ false }>
                                    <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={comboboxWalletInput} onValueChange={setComboboxWalletInput}/>
                                    <ScrollArea className="p-0">
                                        <div className={ `max-h-[10rem]` }>
                                            <CommandEmpty>{comboboxWalletLoadState ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                            <CommandGroup>
                                                {(() => {
                                                    if(comboboxWalletLoadState){
                                                        return <>
                                                            <CommandItem
                                                                value=''
                                                                key={ `wallet_loading-state` }
                                                                disabled={ true }
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 opacity-0`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>Fetching data...</span>
                                                            </CommandItem>
                                                        </>;
                                                    }

                                                    return <></>;
                                                })()}
                                                {comboboxWalletList.map((options: WalletItem) => (
                                                    <CommandItem
                                                        value={options?.uuid}
                                                        key={options?.uuid}
                                                        onSelect={(currentValue) => {
                                                            if(formWallet.includes(currentValue)){
                                                                // Already exists, remove from array
                                                                let uuidIndex = formWallet.indexOf(currentValue);
                                                                if (uuidIndex !== -1) {
                                                                    const updatedFormWallet = [...formWallet];
                                                                    updatedFormWallet.splice(uuidIndex, 1);
                                                                    setFormWallet(updatedFormWallet);
                                                                }

                                                                let nameIndex = comboboxWalletLabel.indexOf(options?.name);
                                                                if (nameIndex !== -1) {
                                                                    const updatedLabelWallet = [...comboboxWalletLabel];
                                                                    updatedLabelWallet.splice(nameIndex, 1);
                                                                    setComboboxWalletLabel(updatedLabelWallet);
                                                                }
                                                            } else {
                                                                // Not yet exists, add to array
                                                                setFormWallet([...formWallet, currentValue])
                                                                setComboboxWalletLabel([...comboboxWalletLabel, options?.name]);
                                                            }
                                                        }}
                                                    >
                                                        <Check
                                                            className={ `mr-2 h-4 w-4 ${formWallet.includes(options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                        />
                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </div>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {(() => {
                            let selectedWallet: any = [];
                            if(formWallet.length > 0){
                                formWallet.forEach((value, index) => {
                                    let name = comboboxWalletLabel[index];
                                    if(name){
                                        selectedWallet.push(
                                            <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_wallet-${value}` } onClick={() => {
                                                let uuidIndex = formWallet.indexOf(value);
                                                if (uuidIndex !== -1) {
                                                    const updatedFormWallet = [...formWallet];
                                                    updatedFormWallet.splice(uuidIndex, 1);
                                                    setFormWallet(updatedFormWallet);
                                                }

                                                let nameIndex = comboboxWalletLabel.indexOf(name);
                                                if (nameIndex !== -1) {
                                                    const updatedLabelWallet = [...comboboxWalletLabel];
                                                    updatedLabelWallet.splice(nameIndex, 1);
                                                    setComboboxWalletLabel(updatedLabelWallet);
                                                }
                                            }}>
                                                <span>{ name }</span>
                                                <i className={ `fa-solid fa-xmark` }></i>
                                            </Button>
                                        );
                                    }
                                });

                                if(selectedWallet.length > 0){
                                    return selectedWallet;
                                }
                            }

                            return <></>;
                        })()}
                    </div>

                    <ErrorMessage message={ errorFormDialog?.wallet }/>
                </div>
            </div>

            {/* Tags */}
            <div className={ ` form--group ${errorFormDialog?.tags ? ` is--invalid` : ''}` } id={ `form-budget_dialog_tags` }>
                <label className={ ` form--label` }>Tags</label>
                <div>
                    <div className={ ` flex flex-row gap-2 flex-wrap` }>
                        <Popover open={comboboxTagsOpenState} onOpenChange={setComboboxTagsOpenState}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                >
                                    <i className={ `fa-solid fa-plus` }></i>
                                    <span>Tags</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                <Command shouldFilter={ false }>
                                    <CommandInput placeholder="Search tags" className={ ` border-none focus:ring-0` } value={comboboxTagsInput} onValueChange={setComboboxTagsInput}/>
                                    <ScrollArea className="p-0">
                                        <div className={ `max-h-[10rem]` }>
                                            <CommandEmpty>{comboboxTagsLoadState ? `Loading...` : `No tags found.`}</CommandEmpty>
                                            <CommandGroup>
                                                {(() => {
                                                    if(comboboxTagsLoadState){
                                                        return <>
                                                            <CommandItem
                                                                value=''
                                                                key={ `tags_loading-state` }
                                                                disabled={ true }
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 opacity-0`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>Fetching data...</span>
                                                            </CommandItem>
                                                        </>;
                                                    }

                                                    return <></>;
                                                })()}
                                                {comboboxTagsList.map((options: TagsItem) => (
                                                    <CommandItem
                                                        value={options?.uuid}
                                                        key={options?.uuid}
                                                        onSelect={(currentValue) => {
                                                            if(formTags.includes(currentValue)){
                                                                // Already exists, remove from array
                                                                let uuidIndex = formTags.indexOf(currentValue);
                                                                if (uuidIndex !== -1) {
                                                                    const updatedFormTags = [...formTags];
                                                                    updatedFormTags.splice(uuidIndex, 1);
                                                                    setFormTags(updatedFormTags);
                                                                }

                                                                let nameIndex = comboboxTagsLabel.indexOf(options?.name);
                                                                if (nameIndex !== -1) {
                                                                    const updatedLabelTags = [...comboboxTagsLabel];
                                                                    updatedLabelTags.splice(nameIndex, 1);
                                                                    setComboboxTagsLabel(updatedLabelTags);
                                                                }
                                                            } else {
                                                                // Not yet exists, add to array
                                                                setFormTags([...formTags, currentValue])
                                                                setComboboxTagsLabel([...comboboxTagsLabel, options?.name]);
                                                            }
                                                        }}
                                                    >
                                                        <Check
                                                            className={ `mr-2 h-4 w-4 ${formTags.includes(options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                        />
                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </div>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {(() => {
                            let selectedTags: any = [];
                            if(formTags.length > 0){
                                formTags.forEach((value, index) => {
                                    let name = comboboxTagsLabel[index];
                                    if(name){
                                        selectedTags.push(
                                            <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_tags-${value}` } onClick={() => {
                                                let uuidIndex = formTags.indexOf(value);
                                                if (uuidIndex !== -1) {
                                                    const updatedFormTags = [...formTags];
                                                    updatedFormTags.splice(uuidIndex, 1);
                                                    setFormTags(updatedFormTags);
                                                }

                                                let nameIndex = comboboxTagsLabel.indexOf(name);
                                                if (nameIndex !== -1) {
                                                    const updatedLabelTags = [...comboboxTagsLabel];
                                                    updatedLabelTags.splice(nameIndex, 1);
                                                    setComboboxTagsLabel(updatedLabelTags);
                                                }
                                            }}>
                                                <span>{ name }</span>
                                                <i className={ `fa-solid fa-xmark` }></i>
                                            </Button>
                                        );
                                    }
                                });

                                if(selectedTags.length > 0){
                                    return selectedTags;
                                }
                            }

                            return <></>;
                        })()}
                    </div>

                    <ErrorMessage message={ errorFormDialog?.tags }/>
                </div>
            </div>

            {/* Keep open dialog? */}
            <div className={ `form-group` }>
                <div className={ `flex items-center space-x-2` }>
                    <Checkbox id="form-budget_keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                        if(typeof value === 'boolean'){
                            setKeepOpenBudgetDialog(value);
                        }
                    }} />
                    <label
                        htmlFor="form-budget_keep_open"
                        className={ `text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white` }
                    >
                        Keep Open?
                    </label>
                </div>
            </div>
        </form>
    </>;

    if(!isDesktop){
        return (
            <section id={ `budget-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>{ formUuid ? `Edit` : `Add new` } Budget</DrawerTitle>
                        </DrawerHeader>

                        {mainForm}

                        <DrawerFooter className="pt-2">
                            <Button variant={ `ghost` } onClick={() => {
                                resetFormDialog();
                            }}>
                                <span>Reset</span>
                            </Button>
                            <Button type='button' onClick={() => {
                                if(document.getElementById('budget-dialogForms')){
                                    (document.getElementById('budget-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='budget-dialogSubmit'>Submit</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>
        );
    }

    return (
        <section id={ `budget-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="budget-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Budget</DialogTitle>
                    </DialogHeader>

                    { mainForm }

                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('budget-dialogForms')){
                                (document.getElementById('budget-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='budget-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}