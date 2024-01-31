import { BudgetItem, CategoryItem, TagsItem, WalletItem } from "@/types";
import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import axios, { AxiosError } from "axios";

// Plugins
import { RemoveScroll } from "react-remove-scroll";
import { IMaskMixin } from "react-imask";
import { toast } from "sonner";
import moment from "moment";

// Partials
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

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
    const [formDateStart, setFormDateStart] = useState<Date>();
    const [formDateEnd, setFormDateEnd] = useState<Date>();
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
        setFormDateStart(undefined);
        setFormDateEnd(undefined);
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
        if(formOccurence === 'once'){
            formData.append('from_period', String(formDateStart ? moment(formDateStart).format('YYYY-MM-DD HH:mm:ss') : ''));
            formData.append('until_period', String(formDateEnd ? moment(formDateEnd).format('YYYY-MM-DD HH:mm:ss') : ''));
        }
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

    // Calendar
    const [calendarStartOpenState, setCalendarStartOpenState] = useState<boolean>(false);
    const [calendarEndOpenState, setCalendarEndOpenState] = useState<boolean>(false);

    // Combobox - Category
    const [comboboxCategoryTimeout, setComboboxCategoryTimeout] = useState<any>();
    const [comboboxCategoryOpenState, setComboboxCategoryOpenState] = useState<boolean>(false);
    const [comboboxCategoryLabel, setComboboxCategoryLabel] = useState<string[] | any[]>([]);
    const [comboboxCategoryList, setComboboxCategoryList] = useState<string[] | any>([]);
    const [comboboxCategoryInput, setComboboxCategoryInput] = useState<string>("");
    const [comboboxCategoryLoadState, setComboboxCategoryLoadState] = useState<boolean>(false);
    const [comboboxCategoryAbortController, setComboboxCategoryAbortController] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string): Promise<string[]> => {
        const abortController = new AbortController();
        setComboboxCategoryAbortController(abortController);

        // Handle loading state
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
                    signal: abortController?.signal
                });
            
                setComboboxCategoryAbortController(null);
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
        } catch (error) {
            // // Handle errors, if needed
            // console.error('Request error:', error);

            throw error;
        }

        return comboboxCategoryList;
    }
    useEffect(() => {
        clearTimeout(comboboxCategoryTimeout);

        // Abort previous request
        if(comboboxCategoryAbortController instanceof AbortController){
            comboboxCategoryAbortController.abort();
        }

        if(comboboxCategoryOpenState){
            let timeout = setTimeout(() => {
                fetchCategoryList(comboboxCategoryInput)
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
            setComboboxCategoryTimeout(timeout);
        }
    }, [comboboxCategoryInput, comboboxCategoryOpenState]);
    useEffect(() => {
        setComboboxCategoryInput('');
    }, [comboboxCategoryOpenState]);

    // Combobox - Wallet
    const [comboboxWalletTimeout, setComboboxWalletTimeout] = useState<any>();
    const [comboboxWalletOpenState, setComboboxWalletOpenState] = useState<boolean>(false);
    const [comboboxWalletLabel, setComboboxWalletLabel] = useState<string[] | any[]>([]);
    const [comboboxWalletList, setComboboxWalletList] = useState<string[] | any>([]);
    const [comboboxWalletInput, setComboboxWalletInput] = useState<string>("");
    const [comboboxWalletLoadState, setComboboxWalletLoadState] = useState<boolean>(false);
    const [comboboxWalletAbortController, setComboboxWalletAbortController] = useState<AbortController | null>(null);
    const fetchWalletList = async (keyword: string): Promise<string[]> => {
        const abortController = new AbortController();
        setComboboxWalletAbortController(abortController);

        // Handle loading state
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
                    signal: abortController.signal
                });
            
                setComboboxWalletAbortController(null);
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

        return comboboxWalletList;
    }
    useEffect(() => {
        clearTimeout(comboboxWalletTimeout);

        // Abort previous request
        if(comboboxWalletAbortController instanceof AbortController){
            comboboxWalletAbortController.abort();
        }

        if(comboboxWalletOpenState){
            let timeout = setTimeout(() => {
                fetchWalletList(comboboxWalletInput)
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
            setComboboxWalletTimeout(timeout);
        }
    }, [comboboxWalletInput, comboboxWalletOpenState]);
    useEffect(() => {
        setComboboxWalletInput('');
    }, [comboboxWalletOpenState]);

    // Combobox - Tags
    const [comboboxTagsTimeout, setComboboxTagsTimeout] = useState<any>();
    const [comboboxTagsOpenState, setComboboxTagsOpenState] = useState<boolean>(false);
    const [comboboxTagsLabel, setComboboxTagsLabel] = useState<string[] | any[]>([]);
    const [comboboxTagsList, setComboboxTagsList] = useState<string[] | any>([]);
    const [comboboxTagsInput, setComboboxTagsInput] = useState<string>("");
    const [comboboxTagsLoadState, setComboboxTagsLoadState] = useState<boolean>(false);
    const [comboboxTagsAbortController, setComboboxTagsAbortController] = useState<AbortController | null>(null);
    const fetchTagsList = async (keyword: string): Promise<string[]> => {
        const abortController = new AbortController();
        setComboboxTagsAbortController(abortController);

        // Handle loading state
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
                    signal: abortController.signal
                });
            
                setComboboxTagsAbortController(null);
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

        return comboboxTagsList;
    }
    useEffect(() => {
        clearTimeout(comboboxTagsTimeout);

        // Abort previous request
        if(comboboxTagsAbortController instanceof AbortController){
            comboboxTagsAbortController.abort();
        }
        
        if(comboboxTagsOpenState){
            let timeout = setTimeout(() => {
                fetchTagsList(comboboxTagsInput)
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
            setComboboxTagsTimeout(timeout);
        }
    }, [comboboxTagsInput, comboboxTagsOpenState]);
    useEffect(() => {
        setComboboxTagsInput('')
    }, [comboboxTagsOpenState]);

    // Dialog Action
    useEffect(() => {
        if(!isFirstRender){
            setTimeout(() => {
                // Reset error bag
                setErrorFormDialog({});

                // Abort Dialog request
                if(formDialogAbortController instanceof AbortController){
                    formDialogAbortController.abort();
                }
                // Abort Detail request
                if(budgetFetchAbortController instanceof AbortController){
                    budgetFetchAbortController.abort();
                }
                // Abort Category List request
                if(comboboxCategoryAbortController instanceof AbortController){
                    comboboxCategoryAbortController.abort();
                }
                // Abort Wallet List request
                if(comboboxWalletAbortController instanceof AbortController){
                    comboboxWalletAbortController.abort();
                }
                // Abort Tags List request
                if(comboboxTagsAbortController instanceof AbortController){
                    comboboxTagsAbortController.abort();
                }

                if(openState){
                    document.dispatchEvent(new CustomEvent('dialog.budget.shown', { bubbles: true }));
                } else {
                    resetFormDialog();
                    setKeepOpenBudgetDialog(false);

                    // Announce Dialog Global Event
                    document.dispatchEvent(new CustomEvent('dialog.budget.hidden', { bubbles: true }));
                }
            }, 100);
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
                // Abort previous request
                if(budgetFetchAbortController instanceof AbortController){
                    budgetFetchAbortController.abort();
                }

                // Fetch Data
                fetchBudgetData(uuid, 'edit').then((data: BudgetItem) => {
                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    setFormLimit(data.amount);
                    setFormOccurence(data.occurence);
                    if(data.occurence === 'once'){
                        setFormDateStart(moment(data.start).toDate());
                        setFormDateEnd(moment(data.end).toDate());
                    } else {
                        setFormInterval(data.interval);
                    }
                    setFormNotes(data.description ?? '');

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

    const formContent = <>
        <RemoveScroll className={ `overflow-auto border-t border-b ${isDesktop ? `max-h-screen md:max-h-[50vh]` : ``}` }>
            <form onSubmit={handleFormSubmit} id={ `budget-dialogForms` } className={ ` flex-1 overflow-hidden p-6` }>
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
                        onBlur={ (element: any) => {
                            let value = (element.target as HTMLInputElement).value;
                            value = value.replaceAll(',', '');

                            setFormLimit(Number(value));
                        } }
                    />

                    <ErrorMessage message={ errorFormDialog?.limit }/>
                </div>

                {/* Occurence & Interval */}
                <div className={ ` flex flex-col gap-2 mb-4` }>
                    <div className={ ` flex flex-row gap-4` }>
                        {/* Occurence */}
                        <div className={ `form--group !mb-0 w-3/12` } id={ `form-budget_dialog_occurence` }>
                            <label className={ `form--label` }>Occurence</label>

                            <Select onValueChange={(value) => {
                                setFormOccurence(value);
                            }} value={formOccurence}>
                                <SelectTrigger className={ `dark:text-white ${errorFormDialog?.occurence ? ` !border-red-500` : ''}` }>
                                    <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Occurence</SelectLabel>
                                        <SelectItem value="recurring">Recurring</SelectItem>
                                        <SelectItem value="once">Once</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Interval */}
                        <div className={ ` w-9/12` }>
                            {(() => {
                                if(formOccurence === 'once'){
                                    return <>
                                        <div className={ `flex flex-row gap-4 w-full` }>
                                            <div className={ `form--group !mb-0 w-full ${errorFormDialog?.start ? ` is--invalid` : ''}` }>
                                                <label className={ `form--label` }>Start</label>
                                                <Popover open={ calendarStartOpenState } onOpenChange={ setCalendarStartOpenState }>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={ ` w-full justify-start text-left font-normal ${!formDateStart && "text-muted-foreground"} ${errorFormDialog?.start ? ` !border-red-500` : ''} dark:text-white`}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {formDateStart ? moment(formDateStart).format('MMM Do, YYYY') : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={formDateStart}
                                                            onSelect={(val) => {
                                                                setFormDateStart(val);
                                                                setCalendarStartOpenState(false);
                                                            }}
                                                            defaultMonth={formDateStart}
                                                            disabled={(date) =>
                                                                formDateEnd ? moment(moment(date).format('YYYY-MM-DD')) >= moment(moment(formDateEnd).format('YYYY-MM-DD')) : false
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className={ `form--group !mb-0 w-full ${errorFormDialog?.end ? ` is--invalid` : ''}` }>
                                                <label className={ `form--label` }>End</label>

                                                <Popover open={ calendarEndOpenState } onOpenChange={ setCalendarEndOpenState }>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={ ` w-full justify-start text-left font-normal ${!formDateEnd && "text-muted-foreground"} ${errorFormDialog?.end ? ` !border-red-500` : ''} dark:text-white`}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {formDateEnd ? moment(formDateEnd).format('MMM Do, YYYY') : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={formDateEnd}
                                                            onSelect={(val) => {
                                                                setFormDateEnd(val);
                                                                setCalendarEndOpenState(false);
                                                            }}
                                                            defaultMonth={formDateEnd}
                                                            disabled={(date) =>
                                                                formDateStart ? moment(moment(date).format('YYYY-MM-DD')) <= moment(moment(formDateStart).format('YYYY-MM-DD')) : false
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </>;
                                }

                                return <>
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
                                    </div>
                                </>;
                            })()}
                        </div>
                    </div>

                    <div className={ ` flex flex-col` }>
                        <ErrorMessage message={ errorFormDialog?.occurence }/>
                        <ErrorMessage message={ errorFormDialog?.start }/>
                        <ErrorMessage message={ errorFormDialog?.end }/>
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
                                        <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0 ${comboboxCategoryLoadState ? 'is-loading' : ''}` } value={comboboxCategoryInput} onValueChange={setComboboxCategoryInput}/>
                                        
                                        <ScrollArea className="p-0">
                                            <div className={ `max-h-[10rem]` }>
                                                <CommandEmpty>{comboboxCategoryLoadState ? `Loading...` : `No category found.`}</CommandEmpty>
                                                <CommandGroup>
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
                                        <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0 ${comboboxWalletLoadState ? 'is-loading' : ''}` } value={comboboxWalletInput} onValueChange={setComboboxWalletInput}/>
                                        
                                        <ScrollArea className="p-0">
                                            <div className={ `max-h-[10rem]` }>
                                                <CommandEmpty>{comboboxWalletLoadState ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                <CommandGroup>
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
                                        <CommandInput placeholder="Search tags" className={ ` border-none focus:ring-0 ${comboboxTagsLoadState ? 'is-loading' : ''}` } value={comboboxTagsInput} onValueChange={setComboboxTagsInput}/>
                                        
                                        <ScrollArea className="p-0">
                                            <div className={ `max-h-[10rem]` }>
                                                <CommandEmpty>{comboboxTagsLoadState ? `Loading...` : `No tags found.`}</CommandEmpty>
                                                <CommandGroup>
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
        </RemoveScroll>
    </>;

    if(!isDesktop){
        return (
            <section id={ `budget-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>{ formUuid ? `Edit` : `Add new` } Budget</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

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

                    { formContent }

                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('budget-dialogForms')){
                                (document.getElementById('budget-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='budget-dialogSubmit'>Submit</Button>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}