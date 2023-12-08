import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { CategoryItem, PlannedItem, TagsItem, WalletItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";

// Plugins
import { momentFormated, ucwords } from "@/function";
import { IMaskMixin } from "react-imask";
import moment from "moment-timezone";

// Partials
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useToast } from "@/Components/ui/use-toast";
import { Checkbox } from "@/Components/ui/checkbox";
import { Textarea } from "@/Components/ui/textarea";
import { Calendar } from "@/Components/ui/calendar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function PlannedPaymentDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const { toast } = useToast();

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Form Variable
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    const [formType, setFormType] = useState<string>('expense');
    const [formCategory, setFormCategory] = useState<string>("");
    const [formFromWallet, setFormFromWallet] = useState<string>("");
    const [formToWallet, setFormToWallet] = useState<string>("");
    const [formAmount, setFormAmount] = useState<number>();
    const [formExtraAmount, setFormExtraAmount] = useState<number>();
    const [formExtraType, setFormExtraType] = useState<string>('amount');
    const [formOccurence, setFormOccurence] = useState<string>('recurring');
    const [formFrequency, setFormFrequency] = useState<number>(1);
    const [formFrequencyType, setFormFrequencyType] = useState<string>('');
    const [formDate, setFormDate] = useState<Date>();
    const [formNotes, setFormNotes] = useState<string>('');
    const [formTags, setFormTags] = useState<string[] | any[]>([]);
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenDialog] = useState<boolean>(false);

    // Calendar
    const [calendarOpenState, setCalendarOpenState] = useState<boolean>(false);

    // Combobox - Category
    let comboboxCategoryTimeout: any;
    const [comboboxCategoryOpenState, setComboboxCategoryOpenState] = useState<boolean>(false);
    const [comboboxCategoryLabel, setComboboxCategoryLabel] = useState<string>("Select an option");
    const [comboboxCategoryList, setComboboxCategoryList] = useState<string[] | any>([]);
    const [comboboxCategoryInput, setComboboxCategoryInput] = useState<string>("");
    const [comboboxCategoryLoadState, setComboboxCategoryLoadState] = useState<boolean>(false);
    const [comboboxCategoryAbortController, setComboboxCategoryAbortController] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        // Fetch Category Item List
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
        } catch (error) {
            // Handle errors, if needed
            console.error('Request error:', error);
            throw error;
        }

        return [];
    }
    useEffect(() => {
        // Handle Category Item
        clearTimeout(comboboxCategoryTimeout);
        // setComboboxCategoryList([]);

        if(comboboxCategoryOpenState){
            if (comboboxCategoryAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxCategoryAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxCategoryAbortController(newAbortController);

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
                if (comboboxCategoryAbortController) {
                    comboboxCategoryAbortController.abort();
                }
            };
        }
    }, [comboboxCategoryInput, comboboxCategoryOpenState]);
    useEffect(() => {
        setComboboxCategoryInput('');
    }, [comboboxCategoryOpenState]);
    useEffect(() => {
        // Handle selection Label
        if(openState){
            if(formCategory === ''){
                setComboboxCategoryLabel(`Select an option`);
            }
        } else {
            if(!formUuid){
                setComboboxCategoryLabel(`Select an option`);
            }
        }
    }, [formCategory]);

    // Combobox - From Wallet
    let comboboxFromWalletTimeout: any;
    const [comboboxFromWalletOpenState, setComboboxFromWalletOpenState] = useState<boolean>(false);
    const [comboboxFromWalletLabel, setComboboxFromWalletLabel] = useState<string>("Select an option");
    const [comboboxFromWalletList, setComboboxFromWalletList] = useState<string[] | any>([]);
    const [comboboxFromWalletInput, setComboboxFromWalletInput] = useState<string>("");
    const [comboboxFromWalletLoadState, setComboboxFromWalletLoadState] = useState<boolean>(false);
    const [comboboxFromWalletAbortController, setComboboxFromWalletAbortController] = useState<AbortController | null>(null);
    const fetchFromWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxFromWalletLoadState(true);

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
        clearTimeout(comboboxFromWalletTimeout);
        // setComboboxFromWalletList([]);

        if(comboboxFromWalletOpenState){
            if (comboboxFromWalletAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxFromWalletAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxFromWalletAbortController(newAbortController);

            comboboxFromWalletTimeout = setTimeout(() => {
                fetchFromWalletList(comboboxFromWalletInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxFromWalletLoadState(false);
                        if(data){
                            setComboboxFromWalletList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 0);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxFromWalletAbortController) {
                    comboboxFromWalletAbortController.abort();
                }
            };
        }
    }, [comboboxFromWalletInput, comboboxFromWalletOpenState]);
    useEffect(() => {
        setComboboxFromWalletInput('');
    }, [comboboxFromWalletOpenState]);
    useEffect(() => {
        if(openState){
            if(formFromWallet === ''){
                setComboboxFromWalletLabel(`Select an option`);
            }
        } else {
            if(!formUuid){
                setComboboxFromWalletLabel(`Select an option`);
            }
        }
    }, [formFromWallet]);

    // Combobox - To Wallet
    let comboboxToWalletTimeout: any;
    const [comboboxToWalletOpenState, setComboboxToWalletOpenState] = useState<boolean>(false);
    const [comboboxToWalletLabel, setComboboxToWalletLabel] = useState<string>("Select an option");
    const [comboboxToWalletList, setComboboxToWalletList] = useState<string[] | any>([]);
    const [comboboxToWalletInput, setComboboxToWalletInput] = useState<string>("");
    const [comboboxToWalletLoadState, setComboboxToWalletLoadState] = useState<boolean>(false);
    const [comboboxToWalletAbort, setComboboxToWalletAbort] = useState<AbortController | null>(null);
    const fetchToWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxToWalletLoadState(true);

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
        clearTimeout(comboboxToWalletTimeout);
        // setComboboxToWalletList([]);

        if(comboboxToWalletOpenState){
            if (comboboxToWalletAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxToWalletAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxToWalletAbort(newAbortController);

            comboboxToWalletTimeout = setTimeout(() => {
                fetchToWalletList(comboboxToWalletInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxToWalletLoadState(false);
                        if(data){
                            setComboboxToWalletList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxToWalletAbort) {
                    comboboxToWalletAbort.abort();
                }
            };
        }
    }, [comboboxToWalletInput, comboboxToWalletOpenState]);
    useEffect(() => {
        setComboboxToWalletInput('');
    }, [comboboxToWalletOpenState]);
    useEffect(() => {
        if(openState){
            if(formToWallet === ''){
                setComboboxToWalletLabel(`Select an option`);
            }
        } else {
            if(!formUuid){
                setComboboxToWalletLabel(`Select an option`);
            }
        }
    }, [formToWallet]);

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
            document.dispatchEvent(new CustomEvent('dialog.planned-payment.shown', { bubbles: true }));
        } else {
            resetFormDialog();
            setKeepOpenDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.planned-payment.hidden', { bubbles: true }));
        }
    }, [openState]);
    
    // Planned Payment Dialog - Forms
    const resetFormDialog = () => {
        setFormUuid('');
        setFormName('');
        setFormType('expense');
        setFormCategory('');
        setFormFromWallet('');
        setFormToWallet('');
        setFormAmount(0);
        setFormExtraAmount(0);
        setFormExtraType('amount');
        setFormOccurence('recurring');
        setFormFrequency(1);
        setFormFrequencyType('');
        setFormDate(undefined);
        setFormNotes('');
        setFormTags([]);

        setComboboxTagsLabel([]);

        setErrorFormDialog({});
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setFormDialogAbortController] = useState<AbortController | null>(null);
    const handleSubmitDialog: FormEventHandler = (e) => {
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('plannedPayment-dialogSubmit');
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
        formData.append('type', formType);
        formData.append('category', formCategory);
        formData.append('from_wallet', formFromWallet);
        formData.append('to_wallet', formToWallet);
        formData.append('amount', String(formAmount ?? 0));
        formData.append('extra_amount', String(formExtraAmount ?? 0));
        formData.append('extra_type', formExtraType);
        formData.append('date', String(formDate ? moment(formDate).format('YYYY-MM-DD HH:mm:ss') : ''));
        formData.append('occurence', String(formOccurence ?? ''));
        formData.append('frequency', String(formFrequency ?? 0));
        formData.append('frequency_type', String(formFrequencyType ?? ''));
        formData.append('notes', String(formNotes ?? ''));
        formData.append('timezone', moment.tz.guess());
        if(formTags.length > 0){
            formTags.forEach((value, index) => {
                formData.append('tags[]', value);
            });
        }

        // Adjust route target
        let actionRoute = route('api.planned-payment.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.planned-payment.v1.update', formUuid);
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
                        description: "Planned Payment data successfully saved",
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
                const errorElements = document.querySelectorAll('#plannedPayment-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('plannedPayment-dialogSubmit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    }

    // Calculate Final Amount
    const formCalculateFinalAmount = useMemo(() => {
        // Calculate Final Amount
        let amount: number = formAmount ?? 0;
        let extra: number = formExtraAmount ?? 0;

        // Calculate extra value if extra type is percentage
        if(formExtraType === 'percentage'){
            extra = (extra * amount) / 100;
        }

        return amount + extra;
    }, [formAmount, formExtraAmount, formExtraType]);

    // Document Ready
    const [plannedPaymentFetchAbortController, setPlannedPaymentFetchAbortController] = useState<AbortController | null>(null);
    const fetchPlannedPaymentData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(plannedPaymentFetchAbortController instanceof AbortController){
            plannedPaymentFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setPlannedPaymentFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.planned-payment.v1.show', uuid)}?action=${action}`, {
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
                fetchPlannedPaymentData(uuid, 'edit').then((data: PlannedItem) => {
                    let raw = momentFormated('YYYY-MM-DD', data.date_start, moment.tz.guess());
                    let date = moment(raw).toDate();

                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    setFormType(data.type);
                    setFormCategory(data.category ? data.category.uuid : '');
                    setFormFromWallet(data.from_wallet ? data.from_wallet.uuid : '');
                    setFormToWallet(data.to_wallet ? data.to_wallet.uuid : '');
                    setFormAmount(data.amount);
                    setFormExtraAmount(data.extra_type === 'amount' ? data.extra_amount : data.extra_percentage);
                    setFormExtraType(data.extra_type);
                    setFormOccurence(data.repeat_type);
                    setFormFrequency(data.repeat_frequency);
                    setFormFrequencyType(data.repeat_period);
                    setFormDate(date);
                    setFormNotes(data.note ?? '');

                    // Update Combobox Label
                    if(data.category){
                        setComboboxCategoryLabel(data.category.name);
                    }
                    if(data.from_wallet){
                        setComboboxFromWalletLabel(data.from_wallet.name);
                    }
                    if(data.to_wallet){
                        setComboboxToWalletLabel(data.to_wallet.name);
                    }

                    // Handle tags
                    if(data.planned_payment_tags && data.planned_payment_tags.length > 0){
                        let tagsUuid: any[] = [];
                        let tagsName: any[] = [];
                        (data.planned_payment_tags).forEach((value, index) => {
                            tagsUuid.push(value.uuid);
                            tagsName.push(value.name);
                        });
                        setFormTags(tagsUuid);
                        setComboboxTagsLabel(tagsName);
                    }
                    
                    // Open record-dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('planned-payment.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('planned-payment.edit-action', editAction);
        };
    }, []);

    return (
        <section id={ `plannedPayment-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto lg:min-w-[60vw] max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 p-0" data-type="plannedPayment-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Planned Payment</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmitDialog} id={ `plannedPayment-dialogForms` } className={ ` overflow-auto border-t border-b max-h-screen max-lg:max-h-[50vh] lg:max-h-[65vh]` }>
                        <div className={ ` flex gap-0 lg:gap-6 flex-col lg:flex-row px-6` }>
                            {/* Left */}
                            <div className={ `py-6 w-full lg:w-3/5` }>
                                {/* Name */}
                                <div className={ `form--group` }>
                                    <label className={ `form--label` }>Name</label>
                                    <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Planned Payment Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                                    
                                    <ErrorMessage message={ errorFormDialog?.name }/>
                                </div>

                                {/* Data Type */}
                                <div className={ `form--group mb-4 ${errorFormDialog?.type ? ` is--invalid` : ''}` }>
                                    <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md ${errorFormDialog?.type ? ` !border-red-500` : ''}` } id={ `form-planned_dialog_type` }>
                                        {(() => {
                                            let recordType: any[] = [];
                                            ['income', 'transfer', 'expense'].map((value, index) => {
                                                recordType.push(
                                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ formType === value ? `bg-primary ` : ` dark:!text-white dark:hover:!text-black !text-black hover:!text-primary-foreground`} text-primary-foreground hover:bg-primary/90 transition` } onClick={() => {
                                                        setFormType(value);
                                                    }} key={ `record_type-${value}` }>
                                                        <span className={ ` text-sm font-semibold` }>{ ucwords(value) }</span>
                                                    </div>
                                                );
                                            });

                                            if(recordType.length > 0){
                                                return recordType;
                                            }

                                            return <></>;
                                        })()}
                                    </div>

                                    <ErrorMessage message={ errorFormDialog?.category_id }/>
                                </div>

                                {/* Category */}
                                <div className={ ` form--group  ${errorFormDialog?.category ? ` is--invalid` : ''}` } id={ `form-planned_dialog_category` }>
                                    <label className={ ` form--label` }>Category</label>
                                    <div>
                                        <Popover open={comboboxCategoryOpenState} onOpenChange={setComboboxCategoryOpenState}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={comboboxCategoryOpenState}
                                                    className={ `w-full justify-between ${errorFormDialog?.category ? ` !border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{comboboxCategoryLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={comboboxCategoryInput} onValueChange={setComboboxCategoryInput}/>
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>{comboboxCategoryLoadState ? `Loading...` : `No category found.`}</CommandEmpty>
                                                            <CommandGroup>
                                                                {comboboxCategoryList.map((options: CategoryItem) => (
                                                                    <CommandItem
                                                                        value={options?.uuid}
                                                                        key={options?.uuid}
                                                                        onSelect={(currentValue) => {
                                                                            setFormCategory(currentValue === formCategory ? "" : currentValue);
                                                                            setComboboxCategoryLabel(options.name);

                                                                            setComboboxCategoryOpenState(false);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={ `mr-2 h-4 w-4 ${formCategory === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                        />
                                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ options?.name }</span>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </div>
                                                    </ScrollArea>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorFormDialog?.category_id }/>
                                    </div>
                                </div>

                                {/* From Wallet */}
                                <div className={ ` form--group  ${errorFormDialog?.from_wallet ? ` is--invalid` : ''}` } id={ `form-planned_dialog_from_wallet` }>
                                    <label className={ ` form--label` }>From</label>
                                    <div>
                                        <Popover open={comboboxFromWalletOpenState} onOpenChange={setComboboxFromWalletOpenState}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={comboboxFromWalletOpenState}
                                                    className={ `w-full justify-between ${errorFormDialog?.from_wallet ? ` !border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{comboboxFromWalletLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={comboboxFromWalletInput} onValueChange={setComboboxFromWalletInput}/>
                                                    
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>{comboboxFromWalletLoadState ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                            <CommandGroup>
                                                                {comboboxFromWalletList.map((options: WalletItem) => (
                                                                    <CommandItem
                                                                        value={options?.uuid}
                                                                        key={options?.uuid}
                                                                        onSelect={(currentValue) => {
                                                                            setFormFromWallet(currentValue === formFromWallet ? "" : currentValue);
                                                                            setComboboxFromWalletLabel(options.name);

                                                                            setComboboxFromWalletOpenState(false);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={ `mr-2 h-4 w-4 ${formFromWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                        />
                                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ options?.name }</span>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </div>
                                                    </ScrollArea>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorFormDialog?.from_wallet }/>
                                    </div>
                                </div>

                                {/* To Wallet */}
                                {(() => {
                                    if(formType === 'transfer'){
                                        return <div className={ ` form--group  ${errorFormDialog?.to_wallet ? ` is--invalid` : ''}` } id={ `form-planned_dialog_to_wallet` }>
                                            <label className={ ` form--label` }>To</label>
                                            <div>
                                                <Popover open={comboboxToWalletOpenState} onOpenChange={setComboboxToWalletOpenState}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={comboboxToWalletOpenState}
                                                            className={ ` w-full justify-between ${errorFormDialog?.to_wallet ? ` !border-red-500` : ''} dark:text-white` }
                                                        >
                                                            <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{comboboxToWalletLabel}</span>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                        <Command shouldFilter={ false }>
                                                            <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={comboboxToWalletInput} onValueChange={setComboboxToWalletInput}/>
                                                            <ScrollArea className="p-0">
                                                                <div className={ `max-h-[10rem]` }>
                                                                    <CommandEmpty>{comboboxToWalletLoadState ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {comboboxToWalletList.map((options: WalletItem) => (
                                                                            <CommandItem
                                                                                value={options?.uuid}
                                                                                key={options?.uuid}
                                                                                onSelect={(currentValue) => {
                                                                                    setFormToWallet(currentValue === formToWallet ? "" : currentValue);
                                                                                    setComboboxToWalletLabel(options.name);

                                                                                    setComboboxToWalletOpenState(false);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={ `mr-2 h-4 w-4 ${formToWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                                />
                                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ options?.name }</span>
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </div>
                                                            </ScrollArea>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                <ErrorMessage message={ errorFormDialog?.to_wallet }/>
                                            </div>
                                        </div>
                                    }

                                    return <></>;
                                })()}

                                {/* Amount */}
                                <div className={ ` form--group  ${errorFormDialog?.amount ? ` is--invalid` : ''}` } id={ `form-planned_dialog_amount` }>
                                    <label className={ `form--label` }>Amount</label>
                                    <MaskedInput
                                        type={ `text` }
                                        placeholder={ `Amount` }
                                        inputMode={ `numeric` }
                                        value={ (formAmount ?? 0).toString() }
                                        className={ `${errorFormDialog?.amount ? ` !border-red-500` : ''}` }
                                        mask={ Number }
                                        unmask={ true }
                                        thousandsSeparator={ `,` }
                                        scale={ 2 }
                                        radix={ `.` }
                                        onBlur={ (element) => {
                                            let value = (element.target as HTMLInputElement).value;
                                            value = value.replaceAll(',', '');

                                            setFormAmount(Number(value));
                                        } }
                                    />

                                    <ErrorMessage message={ errorFormDialog?.amount }/>
                                </div>

                                {/* Extra & Final Amount */}
                                <div className={ ` flex flex-row gap-4 w-full` }>
                                    {/* Extra Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorFormDialog?.extra_amount ? ` is--invalid` : ''}` } id={ `form-planned_dialog_extra_amount` }>
                                        <div className={ ` flex flex-col gap-1` }>
                                            {/* Extra Amount */}
                                            <div id={ `form-planned_dialog_extra_amount` }>
                                                <label className={ ` form--label` }>Extra</label>
                                                <MaskedInput
                                                    type={ `text` }
                                                    placeholder={ `Extra Amount` }
                                                    inputMode={ `numeric` }
                                                    value={ (formExtraAmount ?? 0).toString() }
                                                    className={ `${errorFormDialog?.extra_amount ? ` !border-red-500` : ''}` }
                                                    mask={ Number }
                                                    unmask={ true }
                                                    thousandsSeparator={ `,` }
                                                    scale={ 2 }
                                                    radix={ `.` }
                                                    onBlur={ (element) => {
                                                        let value = (element.target as HTMLInputElement).value;
                                                        value = value.replaceAll(',', '');

                                                        setFormExtraAmount(Number(value));
                                                    } }
                                                />

                                                <ErrorMessage message={ errorFormDialog?.extra_amount }/>
                                            </div>
                                            {/* Extra Type */}
                                            <div id={ `form-planned_dialog_extra_type` }>
                                                <span className={ ` text-sm flex flex-row gap-1` }>
                                                    <span className={ ` cursor-pointer ${formExtraType === 'amount' ? ` font-semibold dark:text-white dark:underline` : ' dark:text-white'}` } onClick={() => {
                                                        if(formExtraType !== 'amount'){
                                                            setFormExtraType('amount');
                                                        }
                                                    }}>Amount</span>
                                                    <span className={ `dark:text-white` }>/</span>
                                                    <span className={ ` cursor-pointer ${formExtraType === 'percentage' ? ` font-semibold dark:text-white dark:underline` : ' dark:text-white'}` } onClick={() => {
                                                        if(formExtraType !== 'percentage'){
                                                            setFormExtraType('percentage');
                                                        }
                                                    }}>Percentage</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorFormDialog?.final_amount ? ` is--invalid` : ''}` } id={ `form-planned_dialog_final_amount` }>
                                        <label className={ ` form--label` }>Final</label>
                                        <MaskedInput
                                            type={ `text` }
                                            placeholder={ `Final Amount` }
                                            inputMode={ `numeric` }
                                            value={ (formCalculateFinalAmount ?? 0).toString() }
                                            className={ `${errorFormDialog?.final_amount ? ` !border-red-500` : ''}` }
                                            mask={ Number }
                                            unmask={ true }
                                            thousandsSeparator={ `,` }
                                            scale={ 2 }
                                            radix={ `.` }
                                            disabled={ true }
                                        />

                                        <ErrorMessage message={ errorFormDialog?.final_amount }/>
                                    </div>
                                </div>
                            </div>

                            {/* Right */}
                            <div className={ ` py-6 lg:p-6 lg:pr-0 w-full lg:w-2/5 lg:border-l lg:border-t-0 border-t` }>
                                {/* Occurence */}
                                <div className={ `form--group` } id={ `form-planned_dialog_occurence` }>
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

                                {/* Frequency */}
                                <div className={ ` mb-4` } id={ `form-planned_dialog_frequency` }>
                                    <div className={ `form--group !mb-0` }>
                                        <label className={ `form--label` }>Frequency</label>
                                    </div>
                                    <div className={ `flex flex-row gap-4 ` }>
                                        <div className={ ` w-2/5` }>
                                            <MaskedInput
                                                type={ `text` }
                                                placeholder={ `Amount` }
                                                inputMode={ `numeric` }
                                                value={ (formFrequency ?? 1).toString() }
                                                className={ `${errorFormDialog?.frequency ? ` !border-red-500` : ''} dark:text-white` }
                                                mask={ Number }
                                                unmask={ true }
                                                thousandsSeparator={ `,` }
                                                scale={ 2 }
                                                radix={ `.` }
                                                onBlur={ (element) => {
                                                    let value = (element.target as HTMLInputElement).value;
                                                    value = value.replaceAll(',', '');

                                                    setFormFrequency(Number(value));
                                                } }
                                            />
                                        </div>
                                        <div className={ ` w-3/5` }>
                                            <Select onValueChange={(value) => {
                                                setFormFrequencyType(value);
                                            }} value={formFrequencyType}>
                                                <SelectTrigger className={ `dark:text-white ${errorFormDialog?.frequency_type ? ` !border-red-500` : ''}` }>
                                                    <SelectValue placeholder="Select an option" className={ `dark:text-white` }/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Select Frequency type</SelectLabel>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="yearly">Yearly</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={ ` flex flex-col gap-0.5 mt-1` }>
                                        <ErrorMessage message={ errorFormDialog?.frequency }/>
                                        <ErrorMessage message={ errorFormDialog?.frequency_type }/>
                                    </div>
                                </div>
                                
                                {/* Timestamp */}
                                <div className={ ` form--group` }>
                                    <div id={ `form-planned_dialog_date` } className={ ` form--group !mb-0 ${errorFormDialog?.date ? ` is--invalid` : ''}` }>
                                        <label className={ ` form--label` }>Start at</label>
                                        <Popover open={ calendarOpenState } onOpenChange={ setCalendarOpenState }>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={ ` w-full justify-start text-left font-normal ${!formDate && "text-muted-foreground"} ${errorFormDialog?.date ? ` !border-red-500` : ''} dark:text-white`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {formDate ? format(formDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={formDate}
                                                    onSelect={(value) => {
                                                        setFormDate(value);
                                                        setCalendarOpenState(false);
                                                    }}
                                                    defaultMonth={formDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorFormDialog?.date }/>
                                    </div>
                                </div>

                                {/* Planned Payment Note */}
                                <div className={ ` form--group  ${errorFormDialog?.notes ? ` is--invalid` : ''}` } id={ `form-planned_dialog_note` }>
                                    <label className={ ` form--label` }>Note</label>
                                    <Textarea className={ ` w-full ${errorFormDialog?.notes ? ` !border-red-500` : ''}` } placeholder="Type your message here." value={ formNotes } onChange={(e) => {
                                        setFormNotes(e.target.value);
                                    }}/>
                                
                                    <ErrorMessage message={ errorFormDialog?.notes }/>
                                </div>

                                {/* Tags */}
                                <div className={ ` form--group ${errorFormDialog?.tags ? ` is--invalid` : ''}` } id={ `plannedPayment_dialog-tags` }>
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

                                {/* Keep open Planned Payment dialog? */}
                                <div className={ `form-group` }>
                                    <div className={ `flex items-center space-x-2` }>
                                    <Checkbox id="planned_dialog-keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                                        if(typeof value === 'boolean'){
                                            setKeepOpenDialog(value);
                                        }
                                    }} />
                                        <label
                                            htmlFor="planned_dialog-keep_open"
                                            className={ `text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white` }
                                        >
                                            Keep Open?
                                        </label>
                                    </div>
                                </div>
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
                            if(document.getElementById('plannedPayment-dialogForms')){
                                (document.getElementById('plannedPayment-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='plannedPayment-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}