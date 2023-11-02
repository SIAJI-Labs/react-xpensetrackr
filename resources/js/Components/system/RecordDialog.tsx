import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { format } from "date-fns"
import { CategoryItem, WalletItem, User, RecordItem } from '@/types';
import axios, { AxiosError } from 'axios';

// Script
import '../../function';
import { momentFormated, ucwords } from '../../function';
// Plugins
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import '../../../plugins/fontawesome/all.scss';
import { IMaskMixin } from 'react-imask'
import moment from 'moment-timezone';

// Partials
import ErrorMessage from '@/Components/forms/ErrorMessage';

// Shadcn Component
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Textarea } from '@/Components/ui/textarea';
import { Calendar } from '@/Components/ui/calendar';
import { Checkbox } from '@/Components/ui/checkbox';
import { useToast } from "@/Components/ui/use-toast";
import { Toaster } from "@/Components/ui/toaster";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

type RecordDialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function RecordDialog({ openState, setOpenState }: RecordDialogProps){
    const { toast } = useToast();
    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Record Dialog
    useEffect(() => {
        setTimeout(() => {
            // Reset error bag
            setErrorRecordDialog({});
            // Cancel previous request
            if(abortControllerRecordDialog instanceof AbortController){
                abortControllerRecordDialog.abort();
            }
            
            // Handle when record dialog is opened
            if(openState){
                if(!valueRecordUuid){
                    // Update timestamp
                    let now = moment();
                    let hours = now.get('hour');
                    let minutes = now.get('minute');
                    
                    // Update state
                    setValueRecordDate(moment(now).toDate());
                    setValueRecordHours(String(hours));
                    setValueRecordMinutes(String(minutes));
                }
            } else {
                resetRecordDialog();
                setKeepOpenRecordDialog(false);

                // Announce Dialog Global Event
                window.dispatchEvent(new CustomEvent('dialogRecord'));
            }
        }, 100);
    }, [openState]);

    const [abortControllerRecordItem, setAbortControllerRecordItem] = useState<AbortController | null>(null);
    const fetchRecordData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(abortControllerRecordItem instanceof AbortController){
            abortControllerRecordItem.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerRecordItem(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.record.v1.show', uuid)}?action=${action}`, {
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
        const recordDialogEditAction = (event: any) => {
            console.log('Listen to Dialog Record Edit Event');
            
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchRecordData(uuid, 'edit').then((data: RecordItem) => {
                    console.log(data);
                    let raw = momentFormated('YYYY-MM-DD HH:mm:ss', data.datetime, moment.tz.guess());
                    let date = moment(raw).toDate();
                    let hours = String(moment(raw).get('hour'));
                    let minutes = String(moment(raw).get('minute'));

                    // Update State
                    setValueRecordUuid(data.uuid)
                    setValueRecordType(data.to_wallet ? 'transfer' : data.type);
                    setValueRecordCategory(data.category ? data.category.uuid : '');
                    setValueRecordFromWallet(data.from_wallet ? data.from_wallet.uuid : '');
                    setValueRecordToWallet(data.to_wallet ? data.to_wallet.uuid : '');
                    setValueRecordAmount(data.amount);
                    setValueRecordExtraAmount(data.extra_type === 'amount' ? data.extra_amount : data.extra_percentage);
                    setValueRecordExtraType(data.extra_type);
                    setValueRecordDate(date);
                    setValueRecordHours(hours);
                    setValueRecordMinutes(minutes);
                    setValueRecordNotes(data.note);

                    // Update Combobox Label
                    if(data.category){
                        setCategoryComboboxLabel(`${data.category.parent ? `${data.category.parent.name} - ` : ''}${data.category.name}`);
                    }
                    if(data.from_wallet){
                        setFromWalletComboboxLabel(`${data.from_wallet.parent ? `${data.from_wallet.parent.name} - ` : ''}${data.from_wallet.name}`);
                    }
                    if(data.to_wallet){
                        setToWalletComboboxLabel(`${data.to_wallet.parent ? `${data.to_wallet.parent.name} - ` : ''}${data.to_wallet.name}`);
                    }

                    // Open record-dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            }
        }
        window.addEventListener('recordDialogEditAction', recordDialogEditAction);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('recordDialogEditAction', recordDialogEditAction);
        };
    }, []);

    // Record Dialog - Forms
    const resetRecordDialog = () => {
        setValueRecordUuid('');
        setValueRecordType('expense');
        setValueRecordCategory('');
        setValueRecordFromWallet('');
        setValueRecordToWallet('');
        setValueRecordAmount(0);
        setValueRecordExtraAmount(0);
        setValueRecordExtraType('amount');
        setValueRecordDate(undefined);
        setValueRecordHours(undefined);
        setValueRecordMinutes(undefined);
        setValueRecordNotes('');
    }
    const [errorRecordDialog, setErrorRecordDialog] = useState<{ [key: string]: string[] }>({});
    const [abortControllerRecordDialog, setAbortControllerRecordDialog] = useState<AbortController | null>(null);
    const handleRecordDialogSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('record_dialog-submit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorRecordDialog({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerRecordDialog(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('type', valueRecordType);
        formData.append('category', valueRecordCategory);
        formData.append('from_wallet', valueRecordFromWallet);
        formData.append('to_wallet', valueRecordToWallet);
        formData.append('amount', String(valueRecordAmount ?? 0));
        formData.append('extra_amount', String(valueRecordExtraAmount ?? 0));
        formData.append('extra_type', valueRecordExtraType);
        formData.append('date', String(valueRecordDate ? moment(valueRecordDate).format('YYYY-MM-DD HH:mm:ss') : ''));
        formData.append('hours', String(valueRecordHours ?? ''));
        formData.append('minutes', String(valueRecordMinutes ?? ''));
        formData.append('notes', String(valueRecordNotes ?? ''));
        formData.append('timezone', moment.tz.guess());

        // Adjust route target
        let actionRoute = route('api.record.v1.store');
        if(valueRecordUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.record.v1.update', valueRecordUuid);
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
                    if (!keepOpenRecordDialog) {
                        setOpenState(false);
                    } else {
                        // Reset form
                        resetRecordDialog();
                
                        // Handle when record dialog is opened
                        if (openState) {
                            // Update timestamp
                            let now = moment();
                            let hours = now.get('hour');
                            let minutes = now.get('minute');
                
                            // Update state
                            setValueRecordDate(moment(now).toDate());
                            setValueRecordHours(String(hours));
                            setValueRecordMinutes(String(minutes));
                        }
                    }
            
                    toast({
                        title: "Action: Success",
                        description: "Record data successfully saved",
                    });
                }
            }

            return true;
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorRecordDialog(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#recordDialog-forms .form--group.is--invalid');
        
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
            setAbortControllerRecordDialog(null);
        
            // Update to original state
            let submitBtn = document.getElementById('record_dialog-submit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    }

    // Record UUID
    const [valueRecordUuid, setValueRecordUuid] = useState<string>('');
    // Record Type
    const [valueRecordType, setValueRecordType] = useState<string>('expense');
    // Category Combobox
    let categoryComboboxTimeout: any;
    const [openRecordCategory, setOpenRecordCategory] = useState<boolean>(false);
    const [valueRecordCategory, setValueRecordCategory] = useState<string>("");
    const [categoryComboboxLabel, setCategoryComboboxLabel] = useState<string>("Select an option");
    const [categoryComboboxList, setCategoryComboboxList] = useState<string[] | any>([]);
    const [categoryComboboxInput, setCategoryComboboxInput] = useState<string>("");
    const [categoryComboboxLoad, setCategoryComboboxLoad] = useState<boolean>(false);
    const [categoryAbortController, setCategoryAbortController] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        // Fetch Category Item List
        setCategoryComboboxLoad(true);

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
        clearTimeout(categoryComboboxTimeout);
        setCategoryComboboxList([]);

        if(openRecordCategory){
            if (categoryAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                categoryAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setCategoryAbortController(newAbortController);

            categoryComboboxTimeout = setTimeout(() => {
                fetchCategoryList(categoryComboboxInput, newAbortController)
                    .then((data: string[] = []) => {
                        setCategoryComboboxLoad(false);
                        if(data){
                            setCategoryComboboxList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (categoryAbortController) {
                    categoryAbortController.abort();
                }
            };
        }
    }, [categoryComboboxInput, openRecordCategory]);
    useEffect(() => {
        // Handle selection Label
        if(openState){
            if(valueRecordCategory !== '' && categoryComboboxList.length > 0){
                const selected: CategoryItem | undefined = categoryComboboxList.find(
                    (options: CategoryItem) => options?.uuid === valueRecordCategory
                ) as CategoryItem | undefined;
    
                if (selected) {
                    setCategoryComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setCategoryComboboxLabel(`Select an option`);
            }
        } else {
            if(!valueRecordUuid){
                setCategoryComboboxLabel(`Select an option`);
            }
        }
    }, [valueRecordCategory]);

    // From Wallet Combobox
    let fromWalletComboboxTimeout: any;
    const [openRecordFromWallet, setOpenRecordFromWallet] = useState<boolean>(false);
    const [valueRecordFromWallet, setValueRecordFromWallet] = useState<string>("");
    const [fromWalletComboboxLabel, setFromWalletComboboxLabel] = useState<string>("Select an option");
    const [fromWalletComboboxList, setFromWalletComboboxList] = useState<string[] | any>([]);
    const [fromWalletComboboxInput, setFromWalletComboboxInput] = useState<string>("");
    const [fromWalletComboboxLoad, setFromWalletComboboxLoad] = useState<boolean>(false);
    const [fromWalletAbortController, setFromWalletAbortController] = useState<AbortController | null>(null);
    const fetchFromWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setFromWalletComboboxLoad(true);

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
        clearTimeout(fromWalletComboboxTimeout);
        setFromWalletComboboxList([]);

        if(openRecordFromWallet){
            if (fromWalletAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                fromWalletAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setFromWalletAbortController(newAbortController);

            fromWalletComboboxTimeout = setTimeout(() => {
                fetchFromWalletList(fromWalletComboboxInput, newAbortController)
                    .then((data: string[] = []) => {
                        setFromWalletComboboxLoad(false);
                        if(data){
                            setFromWalletComboboxList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 0);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (fromWalletAbortController) {
                    fromWalletAbortController.abort();
                }
            };
        }
    }, [fromWalletComboboxInput, openRecordFromWallet]);
    useEffect(() => {
        if(openState){
            if(valueRecordFromWallet !== '' && fromWalletComboboxList.length > 0){
                const selected: WalletItem | undefined = fromWalletComboboxList.find(
                    (options: WalletItem) => options?.uuid === valueRecordFromWallet
                ) as WalletItem | undefined;
    
                if (selected) {
                    setFromWalletComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setFromWalletComboboxLabel(`Select an option`);
            }
        } else {
            if(!valueRecordUuid){
                setFromWalletComboboxLabel(`Select an option`);
            }
        }
    }, [valueRecordFromWallet]);

    // To Wallet Combobox
    let toWalletComboboxTimeout: any;
    const [openRecordToWallet, setOpenRecordToWallet] = useState<boolean>(false);
    const [valueRecordToWallet, setValueRecordToWallet] = useState<string>("");
    const [toWalletComboboxLabel, setToWalletComboboxLabel] = useState<string>("Select an option");
    const [toWalletComboboxList, setToWalletComboboxList] = useState<string[] | any>([]);
    const [toWalletComboboxInput, setToWalletComboboxInput] = useState<string>("");
    const [toWalletComboboxLoad, setToWalletComboboxLoad] = useState<boolean>(false);
    const [toWalletAbortController, setToWalletAbortController] = useState<AbortController | null>(null);
    const fetchToWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setToWalletComboboxLoad(true);

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
        clearTimeout(toWalletComboboxTimeout);
        setToWalletComboboxList([]);

        if(openRecordToWallet){
            if (toWalletAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                toWalletAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setToWalletAbortController(newAbortController);

            toWalletComboboxTimeout = setTimeout(() => {
                fetchToWalletList(toWalletComboboxInput, newAbortController)
                    .then((data: string[] = []) => {
                        setToWalletComboboxLoad(false);
                        if(data){
                            setToWalletComboboxList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (toWalletAbortController) {
                    toWalletAbortController.abort();
                }
            };
        }
    }, [toWalletComboboxInput, openRecordToWallet]);
    useEffect(() => {
        if(openState){
            if(valueRecordToWallet !== '' && toWalletComboboxList.length > 0){
                const selected: WalletItem | undefined = toWalletComboboxList.find(
                    (options: WalletItem) => options?.uuid === valueRecordToWallet
                ) as WalletItem | undefined;
    
                if (selected) {
                    setToWalletComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setToWalletComboboxLabel(`Select an option`);
            }
        } else {
            if(!valueRecordUuid){
                setToWalletComboboxLabel(`Select an option`);
            }
        }
    }, [valueRecordToWallet]);

    // Amount
    const [valueRecordAmount, setValueRecordAmount] = useState<number>();
    // Extra
    const [valueRecordExtraAmount, setValueRecordExtraAmount] = useState<number>();
    const [valueRecordExtraType, setValueRecordExtraType] = useState<string>('amount');
    // Final
    const valueRecordFinalAmount = useMemo(() => {
        // Calculate Final Amount
        let amount: number = valueRecordAmount ?? 0;
        let extra: number = valueRecordExtraAmount ?? 0;

        // Calculate extra value if extra type is percentage
        if(valueRecordExtraType === 'percentage'){
            extra = (extra * amount) / 100;
        }

        return amount + extra;
    }, [valueRecordAmount, valueRecordExtraAmount, valueRecordExtraType]);

    // Datepickr
    const [valueRecordDate, setValueRecordDate] = useState<Date>();
    const [valueRecordHours, setValueRecordHours] = useState<string>();
    const [valueRecordMinutes, setValueRecordMinutes] = useState<string>();

    // Notes
    const [valueRecordNotes, setValueRecordNotes] = useState<string>();
    // Keep Record Dialog Open?
    const [keepOpenRecordDialog, setKeepOpenRecordDialog] = useState<boolean>(false);

    return (
        <section id={ `recordDialog-section` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" h-full lg:min-w-[800px] md:max-h-[85vh] p-0" data-type="record-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ valueRecordUuid ? `Edit` : `Add new` } Record</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleRecordDialogSubmit} id={ `recordDialog-forms` } className={ ` overflow-auto border-t border-b ` }>
                        <div className={ ` flex gap-0 lg:gap-6 flex-col lg:flex-row px-6` }>
                            {/* Left */}
                            <div className={ `py-6 w-full lg:w-3/5` }>
                                {/* Record Type */}
                                <div className={ `form-group mb-4 ${errorRecordDialog?.type ? ` is--invalid` : ''}` }>
                                    <div className={ ` flex flex-row gap-4 w-full border p-1 rounded-md ${errorRecordDialog?.type ? ` border-red-500` : ''}` } id={ `record_dialog-type` }>
                                        {(() => {
                                            let recordType: any[] = [];
                                            ['income', 'transfer', 'expense'].map((value, index) => {
                                                recordType.push(
                                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ valueRecordType === value ? `bg-gray-200 hover:bg-gray-200` : ` dark:text-white dark:hover:text-black`} hover:bg-gray-100 transition` } onClick={() => {
                                                        setValueRecordType(value);
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

                                    <ErrorMessage message={ errorRecordDialog?.category_id }/>
                                </div>

                                {/* Category */}
                                <div className={ ` form--group  ${errorRecordDialog?.category ? ` is--invalid` : ''}` } id={ `record_dialog-category` }>
                                    <label className={ ` form--label` }>Category</label>
                                    <div>
                                        <Popover open={openRecordCategory} onOpenChange={setOpenRecordCategory}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openRecordCategory}
                                                    className={ `w-full justify-between ${errorRecordDialog?.category ? ` border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{categoryComboboxLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={categoryComboboxInput} onValueChange={setCategoryComboboxInput}/>
                                                    <CommandEmpty>{categoryComboboxLoad ? `Loading...` : `No category found.`}</CommandEmpty>
                                                    <CommandGroup>
                                                        {categoryComboboxList.map((options: CategoryItem) => (
                                                            <CommandItem
                                                                value={options?.uuid}
                                                                key={options?.uuid}
                                                                onSelect={(currentValue) => {
                                                                    setValueRecordCategory(currentValue === valueRecordCategory ? "" : currentValue)
                                                                    setOpenRecordCategory(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 ${valueRecordCategory === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.parent ? `${options.parent.name} - ` : ''}${options?.name}` }</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorRecordDialog?.category_id }/>
                                    </div>
                                </div>

                                {/* From Wallet */}
                                <div className={ ` form--group  ${errorRecordDialog?.from_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-from_wallet` }>
                                    <label className={ ` form--label` }>From</label>
                                    <div>
                                        <Popover open={openRecordFromWallet} onOpenChange={setOpenRecordFromWallet}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openRecordFromWallet}
                                                    className={ `w-full justify-between ${errorRecordDialog?.from_wallet ? ` border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{fromWalletComboboxLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={fromWalletComboboxInput} onValueChange={setFromWalletComboboxInput}/>
                                                    <CommandEmpty>{fromWalletComboboxLoad ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                    <CommandGroup>
                                                        {fromWalletComboboxList.map((options: WalletItem) => (
                                                            <CommandItem
                                                                value={options?.uuid}
                                                                key={options?.uuid}
                                                                onSelect={(currentValue) => {
                                                                    setValueRecordFromWallet(currentValue === valueRecordFromWallet ? "" : currentValue)
                                                                    setOpenRecordFromWallet(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 ${valueRecordFromWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                />
                                                                <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.parent ? `${options.parent.name} - ` : ''}${options?.name}` }</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorRecordDialog?.from_wallet }/>
                                    </div>
                                </div>

                                {/* To Wallet */}
                                {(() => {
                                    if(valueRecordType === 'transfer'){
                                        return <div className={ ` form--group  ${errorRecordDialog?.to_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-to_wallet` }>
                                            <label className={ ` form--label` }>To</label>
                                            <div>
                                                <Popover open={openRecordToWallet} onOpenChange={setOpenRecordToWallet}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openRecordToWallet}
                                                            className={ ` w-full justify-between ${errorRecordDialog?.to_wallet ? ` border-red-500` : ''} dark:text-white` }
                                                        >
                                                            <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{toWalletComboboxLabel}</span>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                        <Command shouldFilter={ false }>
                                                            <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={toWalletComboboxInput} onValueChange={setToWalletComboboxInput}/>
                                                            <CommandEmpty>{toWalletComboboxLoad ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                            <CommandGroup>
                                                                {toWalletComboboxList.map((options: WalletItem) => (
                                                                    <CommandItem
                                                                        value={options?.uuid}
                                                                        key={options?.uuid}
                                                                        onSelect={(currentValue) => {
                                                                            setValueRecordToWallet(currentValue === valueRecordToWallet ? "" : currentValue)
                                                                            setOpenRecordToWallet(false)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={ `mr-2 h-4 w-4 ${valueRecordToWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                        />
                                                                        <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.parent ? `${options.parent.name} - ` : ''}${options?.name}` }</span>
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                <ErrorMessage message={ errorRecordDialog?.to_wallet }/>
                                            </div>
                                        </div>
                                    }

                                    return <></>;
                                })()}

                                {/* Amount */}
                                <div className={ ` form--group  ${errorRecordDialog?.amount ? ` is--invalid` : ''}` } id={ `record_dialog-amount` }>
                                    <label className={ `form--label` }>Amount</label>
                                    <MaskedInput
                                        type={ `text` }
                                        placeholder={ `Amount` }
                                        inputMode={ `numeric` }
                                        value={ (valueRecordAmount ?? 0).toString() }
                                        className={ `${errorRecordDialog?.amount ? ` border-red-500` : ''}` }
                                        mask={ Number }
                                        unmask={ true }
                                        thousandsSeparator={ `,` }
                                        scale={ 2 }
                                        radix={ `.` }
                                        onBlur={ (element) => {
                                            let value = (element.target as HTMLInputElement).value;
                                            value = value.replace(',', '');

                                            setValueRecordAmount(Number(value));
                                        } }
                                    />

                                    <ErrorMessage message={ errorRecordDialog?.amount }/>
                                </div>

                                {/* Extra & Final Amount */}
                                <div className={ ` flex flex-row gap-4 w-full` }>
                                    {/* Extra Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorRecordDialog?.extra_amount ? ` is--invalid` : ''}` } id={ `record_dialog-extra_amount` }>
                                        <div className={ ` flex flex-col gap-1` }>
                                            {/* Extra Amount */}
                                            <div id={ `record_dialog-extra_amount` }>
                                                <label className={ ` form--label` }>Extra</label>
                                                <MaskedInput
                                                    type={ `text` }
                                                    placeholder={ `Extra Amount` }
                                                    inputMode={ `numeric` }
                                                    value={ (valueRecordExtraAmount ?? 0).toString() }
                                                    className={ `${errorRecordDialog?.extra_amount ? ` border-red-500` : ''}` }
                                                    mask={ Number }
                                                    unmask={ true }
                                                    thousandsSeparator={ `,` }
                                                    scale={ 2 }
                                                    radix={ `.` }
                                                    onBlur={ (element) => {
                                                        let value = (element.target as HTMLInputElement).value;
                                                        value = value.replace(',', '');

                                                        setValueRecordExtraAmount(Number(value));
                                                    } }
                                                />

                                                <ErrorMessage message={ errorRecordDialog?.extra_amount }/>
                                            </div>
                                            {/* Extra Type */}
                                            <div id={ `record_dialog-extra_type` }>
                                                <span className={ ` text-sm flex flex-row gap-1` }>
                                                    <span className={ ` cursor-pointer ${valueRecordExtraType === 'amount' ? ` font-semibold` : ''}` } onClick={() => {
                                                        if(valueRecordExtraType !== 'amount'){
                                                            setValueRecordExtraType('amount');
                                                        }
                                                    }}>Amount</span>
                                                    <span>/</span>
                                                    <span className={ ` cursor-pointer ${valueRecordExtraType === 'percentage' ? ` font-semibold` : ''}` } onClick={() => {
                                                        if(valueRecordExtraType !== 'percentage'){
                                                            setValueRecordExtraType('percentage');
                                                        }
                                                    }}>Percentage</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorRecordDialog?.final_amount ? ` is--invalid` : ''}` } id={ `record_dialog-final_amount` }>
                                        <label className={ ` form--label` }>Final</label>
                                        <MaskedInput
                                            type={ `text` }
                                            placeholder={ `Final Amount` }
                                            inputMode={ `numeric` }
                                            value={ (valueRecordFinalAmount ?? 0).toString() }
                                            className={ `${errorRecordDialog?.final_amount ? ` border-red-500` : ''}` }
                                            mask={ Number }
                                            unmask={ true }
                                            thousandsSeparator={ `,` }
                                            scale={ 2 }
                                            radix={ `.` }
                                            disabled={ true }
                                        />

                                        <ErrorMessage message={ errorRecordDialog?.final_amount }/>
                                    </div>
                                </div>
                            </div>
                            {/* Right */}
                            <div className={ ` py-6 lg:p-6 lg:pr-0 w-full lg:w-2/5 lg:border-l lg:border-t-0 border-t dark:bg-gray-700/30` }>
                                {/* Timestamp */}
                                <div className={ ` form--group` }>
                                    <div id={ `record_dialog-date` } className={ ` form--group !mb-0 ${errorRecordDialog?.date ? ` is--invalid` : ''}` }>
                                        <label className={ ` form--label` }>Timestamp</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={ ` w-full justify-start text-left font-normal ${!valueRecordDate && "text-muted-foreground"} ${errorRecordDialog?.date ? ` border-red-500` : ''} dark:text-white`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {valueRecordDate ? format(valueRecordDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={valueRecordDate}
                                                    onSelect={setValueRecordDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorRecordDialog?.date }/>
                                    </div>

                                    {/* Timepickr */}
                                    <div className={ ` flex flex-row gap-4 mt-2 items-center` }>
                                        <div className={ `w-full form--group !mb-0 ${errorRecordDialog?.hours ? ` is--invalid` : ''}` } id={ `record_dialog-hours` }>
                                            <Select onValueChange={(value) => {
                                                setValueRecordHours(value);
                                            }} value={ valueRecordHours }>
                                                <SelectTrigger className={ `w-full text-center ${errorRecordDialog?.hours ? ` border-red-500` : ''} dark:text-white` }>
                                                    <SelectValue placeholder="Hours" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="h-40 p-0">
                                                        {(() => {
                                                            let hours: any[] = [];
                                                            for(let i = 0; i < 24; i++){
                                                                hours.push(
                                                                    <SelectItem
                                                                        value={ i.toString() }
                                                                        key={ `hours-${i}` }
                                                                        >{ i.toString().padStart(2, '0') }</SelectItem>
                                                                );
                                                            }

                                                            if(hours.length > 0){
                                                                return hours;
                                                            }

                                                            return <></>;
                                                        })()}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>

                                            <ErrorMessage message={ errorRecordDialog?.hours }/>
                                        </div>
                                        <span>:</span>
                                        <div className={ `w-full form--group !mb-0  ${errorRecordDialog?.minutes ? ` is--invalid` : ''}` } id={ `record_dialog-minutes` }>
                                            <Select onValueChange={(value) => {
                                                setValueRecordMinutes(value);
                                            }} value={ valueRecordMinutes }>
                                                <SelectTrigger className={ `w-full text-center ${errorRecordDialog?.minutes ? ` border-red-500` : ''} dark:text-white` }>
                                                    <SelectValue placeholder="Minutes" className={ `` } />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="h-40 p-0">
                                                        {(() => {
                                                            let hours: any[] = [];
                                                            for(let i = 0; i <= 59; i++){
                                                                hours.push(
                                                                    <SelectItem
                                                                        value={ i.toString() }
                                                                        key={ `hours-${i}` }
                                                                    >{ i.toString().padStart(2, '0') }</SelectItem>
                                                                );
                                                            }

                                                            if(hours.length > 0){
                                                                return hours;
                                                            }

                                                            return <></>;
                                                        })()}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>

                                            <ErrorMessage message={ errorRecordDialog?.minutes }/>
                                        </div>
                                    </div>
                                </div>

                                {/* Record Note */}
                                <div className={ ` form--group  ${errorRecordDialog?.notes ? ` is--invalid` : ''}` } id={ `record_dialog-note` }>
                                    <label className={ ` form--label` }>Note</label>
                                    <Textarea className={ ` w-full ${errorRecordDialog?.notes ? ` border-red-500` : ''}` } placeholder="Type your message here." value={ valueRecordNotes } onChange={(e) => {
                                        setValueRecordNotes(e.target.value);
                                    }}/>
                                
                                    <ErrorMessage message={ errorRecordDialog?.notes }/>
                                </div>

                                {/* Keep open record dialog? */}
                                <div className={ `form-group` }>
                                    <div className={ `flex items-center space-x-2` }>
                                    <Checkbox id="record_dialog-keep_open" checked={ keepOpenRecordDialog } onCheckedChange={(value) => {
                                        if(typeof value === 'boolean'){
                                            setKeepOpenRecordDialog(value);
                                        }
                                    }} />
                                        <label
                                            htmlFor="record_dialog-keep_open"
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
                        <Button type='button' onClick={() => {
                            if(document.getElementById('recordDialog-forms')){
                                (document.getElementById('recordDialog-forms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='record_dialog-submit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}