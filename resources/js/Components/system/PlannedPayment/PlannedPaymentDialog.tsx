import { useIsFirstRender } from "@/lib/utils";
import { FormEventHandler, useEffect, useMemo, useState } from "react";

// Shadcn
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useToast } from "@/Components/ui/use-toast";
import { momentFormated, ucwords } from "@/function";
import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Input } from "@/Components/ui/input";
import axios, { AxiosError } from "axios";
import { CategoryItem, PlannedItem, WalletItem } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { IMaskMixin } from "react-imask";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import moment from "moment-timezone";
import { Checkbox } from "@/Components/ui/checkbox";

type PlannedPaymentDialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function PlannedPaymentDialog({ openState, setOpenState }: PlannedPaymentDialogProps){
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
    const [valuePlannedPaymentUuid, setValuePlannedPaymentUuid] = useState<string>('');
    const [valuePlannedPaymentName, setValuePlannedPaymentName] = useState<string>('');
    const [valuePlannedPaymentType, setValuePlannedPaymentType] = useState<string>('expense');
    const [valuePlannedPaymentCategory, setValuePlannedPaymentCategory] = useState<string>("");
    const [valuePlannedPaymentFromWallet, setValuePlannedPaymentFromWallet] = useState<string>("");
    const [valuePlannedPaymentToWallet, setValuePlannedPaymentToWallet] = useState<string>("");
    const [valuePlannedPaymentAmount, setValuePlannedPaymentAmount] = useState<number>();
    const [valuePlannedPaymentExtraAmount, setValuePlannedPaymentExtraAmount] = useState<number>();
    const [valuePlannedPaymentExtraType, setValuePlannedPaymentExtraType] = useState<string>('amount');
    const [valuePlannedPaymentOccurence, setValuePlannedPaymentOccurence] = useState<string>('recurring');
    const [valuePlannedPaymentFrequency, setValuePlannedPaymentFrequency] = useState<number>(1);
    const [valuePlannedPaymentFrequencyType, setValuePlannedPaymentFrequencyType] = useState<string>('');
    const [valuePlannedPaymentDate, setValuePlannedPaymentDate] = useState<Date>();
    const [valuePlannedPaymentNotes, setValuePlannedPaymentNotes] = useState<string>('');
    // Keep Record Dialog Open?
    const [keepOpenPlannedPaymentDialog, setKeepOpenPlannedPaymentDialog] = useState<boolean>(false);

    // Combobox - Category
    let categoryComboboxTimeout: any;
    const [openRecordCategory, setOpenRecordCategory] = useState<boolean>(false);
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
            if(valuePlannedPaymentCategory !== '' && categoryComboboxList.length > 0){
                const selected: CategoryItem | undefined = categoryComboboxList.find(
                    (options: CategoryItem) => options?.uuid === valuePlannedPaymentCategory
                ) as CategoryItem | undefined;
    
                if (selected) {
                    setCategoryComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setCategoryComboboxLabel(`Select an option`);
            }
        } else {
            if(!valuePlannedPaymentUuid){
                setCategoryComboboxLabel(`Select an option`);
            }
        }
    }, [valuePlannedPaymentCategory]);
    // Combobox - From Wallet
    let fromWalletComboboxTimeout: any;
    const [openRecordFromWallet, setOpenRecordFromWallet] = useState<boolean>(false);
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
            if(valuePlannedPaymentFromWallet !== '' && fromWalletComboboxList.length > 0){
                const selected: WalletItem | undefined = fromWalletComboboxList.find(
                    (options: WalletItem) => options?.uuid === valuePlannedPaymentFromWallet
                ) as WalletItem | undefined;
    
                if (selected) {
                    setFromWalletComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setFromWalletComboboxLabel(`Select an option`);
            }
        } else {
            if(!valuePlannedPaymentUuid){
                setFromWalletComboboxLabel(`Select an option`);
            }
        }
    }, [valuePlannedPaymentFromWallet]);
    // Combobox - To Wallet
    let toWalletComboboxTimeout: any;
    const [openRecordToWallet, setOpenRecordToWallet] = useState<boolean>(false);
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
            if(valuePlannedPaymentToWallet !== '' && toWalletComboboxList.length > 0){
                const selected: WalletItem | undefined = toWalletComboboxList.find(
                    (options: WalletItem) => options?.uuid === valuePlannedPaymentToWallet
                ) as WalletItem | undefined;
    
                if (selected) {
                    setToWalletComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setToWalletComboboxLabel(`Select an option`);
            }
        } else {
            if(!valuePlannedPaymentUuid){
                setToWalletComboboxLabel(`Select an option`);
            }
        }
    }, [valuePlannedPaymentToWallet]);

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.planned-payment.shown', { bubbles: true }));
        } else {
            console.log('Hidden');
            
            resetPlannedPaymentDialog();
            setKeepOpenPlannedPaymentDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.planned-payment.hidden', { bubbles: true }));
        }
    }, [openState]);
    
    // Planned Payment Dialog - Forms
    const resetPlannedPaymentDialog = () => {
        setValuePlannedPaymentUuid('');
        setValuePlannedPaymentName('');
        setValuePlannedPaymentType('expense');
        setValuePlannedPaymentCategory('');
        setValuePlannedPaymentFromWallet('');
        setValuePlannedPaymentToWallet('');
        setValuePlannedPaymentAmount(0);
        setValuePlannedPaymentExtraAmount(0);
        setValuePlannedPaymentExtraType('amount');
        setValuePlannedPaymentOccurence('recurring');
        setValuePlannedPaymentFrequency(1);
        setValuePlannedPaymentFrequencyType('');
        setValuePlannedPaymentDate(undefined);
        setValuePlannedPaymentNotes('');

        setErrorPlanndPaymentDialog({});
    }
    // Form Action
    const [errorPlannedPaymentDialog, setErrorPlanndPaymentDialog] = useState<{ [key: string]: string[] }>({});
    const [abortControllerPlannedPaymentDialog, setAbortControllerPlannedPaymentDialog] = useState<AbortController | null>(null);
    const handlePlannedPaymentDialogSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('plannedPayment_dialog-submit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorPlanndPaymentDialog({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerPlannedPaymentDialog(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('name', valuePlannedPaymentName);
        formData.append('type', valuePlannedPaymentType);
        formData.append('category', valuePlannedPaymentCategory);
        formData.append('from_wallet', valuePlannedPaymentFromWallet);
        formData.append('to_wallet', valuePlannedPaymentToWallet);
        formData.append('amount', String(valuePlannedPaymentAmount ?? 0));
        formData.append('extra_amount', String(valuePlannedPaymentExtraAmount ?? 0));
        formData.append('extra_type', valuePlannedPaymentExtraType);
        formData.append('date', String(valuePlannedPaymentDate ? moment(valuePlannedPaymentDate).format('YYYY-MM-DD HH:mm:ss') : ''));
        formData.append('occurence', String(valuePlannedPaymentOccurence ?? ''));
        formData.append('frequency', String(valuePlannedPaymentFrequency ?? 0));
        formData.append('frequency_type', String(valuePlannedPaymentFrequencyType ?? ''));
        formData.append('notes', String(valuePlannedPaymentNotes ?? ''));
        formData.append('timezone', moment.tz.guess());

        // Adjust route target
        let actionRoute = route('api.planned-payment.v1.store');
        if(valuePlannedPaymentUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.planned-payment.v1.update', valuePlannedPaymentUuid);
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
                    if (!keepOpenPlannedPaymentDialog) {
                        setOpenState(false);
                    } else {
                        // Reset form
                        resetPlannedPaymentDialog();
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
                setErrorPlanndPaymentDialog(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#plannedPaymentDialog-forms .form--group.is--invalid');
        
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
            setAbortControllerPlannedPaymentDialog(null);
        
            // Update to original state
            let submitBtn = document.getElementById('plannedPayment_dialog-submit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    }

    // Calculate Final Amount
    const valuePlannedPaymentFinalAmount = useMemo(() => {
        // Calculate Final Amount
        let amount: number = valuePlannedPaymentAmount ?? 0;
        let extra: number = valuePlannedPaymentExtraAmount ?? 0;

        // Calculate extra value if extra type is percentage
        if(valuePlannedPaymentExtraType === 'percentage'){
            extra = (extra * amount) / 100;
        }

        return amount + extra;
    }, [valuePlannedPaymentAmount, valuePlannedPaymentExtraAmount, valuePlannedPaymentExtraType]);

    // Document Ready
    const [abortControllerPlannedPaymentItem, setAbortControllerPlannedPaymentItem] = useState<AbortController | null>(null);
    const fetchPlannedPaymentData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(abortControllerPlannedPaymentItem instanceof AbortController){
            abortControllerPlannedPaymentItem.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerPlannedPaymentItem(abortController);
        
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
        const plannedPaymentDialogEditAction = (event: any) => {
            console.log('Listen to Dialog Planned Payment Edit Event');
            
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchPlannedPaymentData(uuid, 'edit').then((data: PlannedItem) => {
                    console.log(data);
                    let raw = momentFormated('YYYY-MM-DD', data.date_start, moment.tz.guess());
                    let date = moment(raw).toDate();

                    // Update State
                    setValuePlannedPaymentUuid(data.uuid)
                    setValuePlannedPaymentName(data.name);
                    setValuePlannedPaymentType(data.type);
                    setValuePlannedPaymentCategory(data.category ? data.category.uuid : '');
                    setValuePlannedPaymentFromWallet(data.from_wallet ? data.from_wallet.uuid : '');
                    setValuePlannedPaymentToWallet(data.to_wallet ? data.to_wallet.uuid : '');
                    setValuePlannedPaymentAmount(data.amount);
                    setValuePlannedPaymentExtraAmount(data.extra_type === 'amount' ? data.extra_amount : data.extra_percentage);
                    setValuePlannedPaymentExtraType(data.extra_type);
                    setValuePlannedPaymentOccurence(data.repeat_type);
                    setValuePlannedPaymentFrequency(data.repeat_frequency);
                    setValuePlannedPaymentFrequencyType(data.repeat_period);
                    setValuePlannedPaymentDate(date);
                    setValuePlannedPaymentNotes(data.note ?? '');

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
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('planned-payment.edit-action', plannedPaymentDialogEditAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('planned-payment.edit-action', plannedPaymentDialogEditAction);
        };
    }, []);

    return (
        <section id={ `plannedPaymentDialog-section` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" h-full md:h-auto lg:min-w-[800px] max-md:!max-h-[85vh] p-0" data-type="record-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ valuePlannedPaymentUuid ? `Edit` : `Add new` } Planned Payment</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handlePlannedPaymentDialogSubmit} id={ `plannedPaymentDialog-forms` } className={ ` overflow-auto border-t border-b max-h-screen md:max-h-[50vh]` }>
                        <div className={ ` flex gap-0 lg:gap-6 flex-col lg:flex-row px-6` }>
                            {/* Left */}
                            <div className={ `py-6 w-full lg:w-3/5` }>
                                {/* Name */}
                                <div className={ `form--group` }>
                                    <label className={ `form--label` }>Name</label>
                                    <Input value={ valuePlannedPaymentName } onChange={(e) => setValuePlannedPaymentName(e.target.value)} placeholder={ `Planned Payment Name` } className={ `${errorPlannedPaymentDialog?.category ? ` !border-red-500` : ''}` }/>
                                    
                                    <ErrorMessage message={ errorPlannedPaymentDialog?.name }/>
                                </div>

                                {/* Data Type */}
                                <div className={ `form--group mb-4 ${errorPlannedPaymentDialog?.type ? ` is--invalid` : ''}` }>
                                    <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md ${errorPlannedPaymentDialog?.type ? ` !border-red-500` : ''}` } id={ `planned_dialog-type` }>
                                        {(() => {
                                            let recordType: any[] = [];
                                            ['income', 'transfer', 'expense'].map((value, index) => {
                                                recordType.push(
                                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ valuePlannedPaymentType === value ? `bg-primary ` : ` dark:!text-white dark:hover:!text-black !text-black hover:!text-primary-foreground`} text-primary-foreground hover:bg-primary/90 transition` } onClick={() => {
                                                        setValuePlannedPaymentType(value);
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

                                    <ErrorMessage message={ errorPlannedPaymentDialog?.category_id }/>
                                </div>

                                {/* Category */}
                                <div className={ ` form--group  ${errorPlannedPaymentDialog?.category ? ` is--invalid` : ''}` } id={ `record_dialog-category` }>
                                    <label className={ ` form--label` }>Category</label>
                                    <div>
                                        <Popover open={openRecordCategory} onOpenChange={setOpenRecordCategory}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openRecordCategory}
                                                    className={ `w-full justify-between ${errorPlannedPaymentDialog?.category ? ` !border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{categoryComboboxLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={categoryComboboxInput} onValueChange={setCategoryComboboxInput}/>
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>{categoryComboboxLoad ? `Loading...` : `No category found.`}</CommandEmpty>
                                                            <CommandGroup>
                                                                {categoryComboboxList.map((options: CategoryItem) => (
                                                                    <CommandItem
                                                                        value={options?.uuid}
                                                                        key={options?.uuid}
                                                                        onSelect={(currentValue) => {
                                                                            setValuePlannedPaymentCategory(currentValue === valuePlannedPaymentCategory ? "" : currentValue)
                                                                            setOpenRecordCategory(false)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={ `mr-2 h-4 w-4 ${valuePlannedPaymentCategory === options?.uuid ? "opacity-100" : "opacity-0"}`}
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

                                        <ErrorMessage message={ errorPlannedPaymentDialog?.category_id }/>
                                    </div>
                                </div>

                                {/* From Wallet */}
                                <div className={ ` form--group  ${errorPlannedPaymentDialog?.from_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-from_wallet` }>
                                    <label className={ ` form--label` }>From</label>
                                    <div>
                                        <Popover open={openRecordFromWallet} onOpenChange={setOpenRecordFromWallet}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openRecordFromWallet}
                                                    className={ `w-full justify-between ${errorPlannedPaymentDialog?.from_wallet ? ` !border-red-500` : ''} dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{fromWalletComboboxLabel}</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                <Command shouldFilter={ false }>
                                                    <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={fromWalletComboboxInput} onValueChange={setFromWalletComboboxInput}/>
                                                    
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>{fromWalletComboboxLoad ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                            <CommandGroup>
                                                                {fromWalletComboboxList.map((options: WalletItem) => (
                                                                    <CommandItem
                                                                        value={options?.uuid}
                                                                        key={options?.uuid}
                                                                        onSelect={(currentValue) => {
                                                                            setValuePlannedPaymentFromWallet(currentValue === valuePlannedPaymentFromWallet ? "" : currentValue)
                                                                            setOpenRecordFromWallet(false)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={ `mr-2 h-4 w-4 ${valuePlannedPaymentFromWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
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

                                        <ErrorMessage message={ errorPlannedPaymentDialog?.from_wallet }/>
                                    </div>
                                </div>

                                {/* To Wallet */}
                                {(() => {
                                    if(valuePlannedPaymentType === 'transfer'){
                                        return <div className={ ` form--group  ${errorPlannedPaymentDialog?.to_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-to_wallet` }>
                                            <label className={ ` form--label` }>To</label>
                                            <div>
                                                <Popover open={openRecordToWallet} onOpenChange={setOpenRecordToWallet}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openRecordToWallet}
                                                            className={ ` w-full justify-between ${errorPlannedPaymentDialog?.to_wallet ? ` !border-red-500` : ''} dark:text-white` }
                                                        >
                                                            <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{toWalletComboboxLabel}</span>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                        <Command shouldFilter={ false }>
                                                            <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={toWalletComboboxInput} onValueChange={setToWalletComboboxInput}/>
                                                            <ScrollArea className="p-0">
                                                                <div className={ `max-h-[10rem]` }>
                                                                    <CommandEmpty>{toWalletComboboxLoad ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {toWalletComboboxList.map((options: WalletItem) => (
                                                                            <CommandItem
                                                                                value={options?.uuid}
                                                                                key={options?.uuid}
                                                                                onSelect={(currentValue) => {
                                                                                    setValuePlannedPaymentToWallet(currentValue === valuePlannedPaymentToWallet ? "" : currentValue)
                                                                                    setOpenRecordToWallet(false)
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={ `mr-2 h-4 w-4 ${valuePlannedPaymentToWallet === options?.uuid ? "opacity-100" : "opacity-0"}`}
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

                                                <ErrorMessage message={ errorPlannedPaymentDialog?.to_wallet }/>
                                            </div>
                                        </div>
                                    }

                                    return <></>;
                                })()}

                                {/* Amount */}
                                <div className={ ` form--group  ${errorPlannedPaymentDialog?.amount ? ` is--invalid` : ''}` } id={ `record_dialog-amount` }>
                                    <label className={ `form--label` }>Amount</label>
                                    <MaskedInput
                                        type={ `text` }
                                        placeholder={ `Amount` }
                                        inputMode={ `numeric` }
                                        value={ (valuePlannedPaymentAmount ?? 0).toString() }
                                        className={ `${errorPlannedPaymentDialog?.amount ? ` !border-red-500` : ''}` }
                                        mask={ Number }
                                        unmask={ true }
                                        thousandsSeparator={ `,` }
                                        scale={ 2 }
                                        radix={ `.` }
                                        onBlur={ (element) => {
                                            let value = (element.target as HTMLInputElement).value;
                                            value = value.replaceAll(',', '');

                                            setValuePlannedPaymentAmount(Number(value));
                                        } }
                                    />

                                    <ErrorMessage message={ errorPlannedPaymentDialog?.amount }/>
                                </div>

                                {/* Extra & Final Amount */}
                                <div className={ ` flex flex-row gap-4 w-full` }>
                                    {/* Extra Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorPlannedPaymentDialog?.extra_amount ? ` is--invalid` : ''}` } id={ `record_dialog-extra_amount` }>
                                        <div className={ ` flex flex-col gap-1` }>
                                            {/* Extra Amount */}
                                            <div id={ `record_dialog-extra_amount` }>
                                                <label className={ ` form--label` }>Extra</label>
                                                <MaskedInput
                                                    type={ `text` }
                                                    placeholder={ `Extra Amount` }
                                                    inputMode={ `numeric` }
                                                    value={ (valuePlannedPaymentExtraAmount ?? 0).toString() }
                                                    className={ `${errorPlannedPaymentDialog?.extra_amount ? ` !border-red-500` : ''}` }
                                                    mask={ Number }
                                                    unmask={ true }
                                                    thousandsSeparator={ `,` }
                                                    scale={ 2 }
                                                    radix={ `.` }
                                                    onBlur={ (element) => {
                                                        let value = (element.target as HTMLInputElement).value;
                                                        value = value.replaceAll(',', '');

                                                        setValuePlannedPaymentExtraAmount(Number(value));
                                                    } }
                                                />

                                                <ErrorMessage message={ errorPlannedPaymentDialog?.extra_amount }/>
                                            </div>
                                            {/* Extra Type */}
                                            <div id={ `record_dialog-extra_type` }>
                                                <span className={ ` text-sm flex flex-row gap-1` }>
                                                    <span className={ ` cursor-pointer ${valuePlannedPaymentExtraType === 'amount' ? ` font-semibold dark:text-white dark:underline` : ' dark:text-white'}` } onClick={() => {
                                                        if(valuePlannedPaymentExtraType !== 'amount'){
                                                            setValuePlannedPaymentExtraType('amount');
                                                        }
                                                    }}>Amount</span>
                                                    <span className={ `dark:text-white` }>/</span>
                                                    <span className={ ` cursor-pointer ${valuePlannedPaymentExtraType === 'percentage' ? ` font-semibold dark:text-white dark:underline` : ' dark:text-white'}` } onClick={() => {
                                                        if(valuePlannedPaymentExtraType !== 'percentage'){
                                                            setValuePlannedPaymentExtraType('percentage');
                                                        }
                                                    }}>Percentage</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Amount */}
                                    <div className={ ` form--group !mb-0 w-1/2  ${errorPlannedPaymentDialog?.final_amount ? ` is--invalid` : ''}` } id={ `record_dialog-final_amount` }>
                                        <label className={ ` form--label` }>Final</label>
                                        <MaskedInput
                                            type={ `text` }
                                            placeholder={ `Final Amount` }
                                            inputMode={ `numeric` }
                                            value={ (valuePlannedPaymentFinalAmount ?? 0).toString() }
                                            className={ `${errorPlannedPaymentDialog?.final_amount ? ` !border-red-500` : ''}` }
                                            mask={ Number }
                                            unmask={ true }
                                            thousandsSeparator={ `,` }
                                            scale={ 2 }
                                            radix={ `.` }
                                            disabled={ true }
                                        />

                                        <ErrorMessage message={ errorPlannedPaymentDialog?.final_amount }/>
                                    </div>
                                </div>
                            </div>
                            {/* Right */}
                            <div className={ ` py-6 lg:p-6 lg:pr-0 w-full lg:w-2/5 lg:border-l lg:border-t-0 border-t` }>
                                {/* Occurence */}
                                <div className={ `form--group` }>
                                    <label className={ `form--label` }>Occurence</label>

                                    <Select onValueChange={(value) => {
                                        setValuePlannedPaymentOccurence(value);
                                    }} value={valuePlannedPaymentOccurence}>
                                        <SelectTrigger className={ `dark:text-white ${errorPlannedPaymentDialog?.occurence ? ` !border-red-500` : ''}` }>
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

                                    <ErrorMessage message={ errorPlannedPaymentDialog?.occurence }/>
                                </div>

                                {/* Frequency */}
                                <div className={ ` mb-4` }>
                                    <div className={ `form--group !mb-0` }>
                                        <label className={ `form--label` }>Frequency</label>
                                    </div>
                                    <div className={ `flex flex-row gap-4 ` }>
                                        <div className={ ` w-2/5` }>
                                            <MaskedInput
                                                type={ `text` }
                                                placeholder={ `Amount` }
                                                inputMode={ `numeric` }
                                                value={ (valuePlannedPaymentFrequency ?? 1).toString() }
                                                className={ `${errorPlannedPaymentDialog?.frequency ? ` !border-red-500` : ''} dark:text-white` }
                                                mask={ Number }
                                                unmask={ true }
                                                thousandsSeparator={ `,` }
                                                scale={ 2 }
                                                radix={ `.` }
                                                onBlur={ (element) => {
                                                    let value = (element.target as HTMLInputElement).value;
                                                    value = value.replaceAll(',', '');

                                                    setValuePlannedPaymentFrequency(Number(value));
                                                } }
                                            />
                                        </div>
                                        <div className={ ` w-3/5` }>
                                            <Select onValueChange={(value) => {
                                                setValuePlannedPaymentFrequencyType(value);
                                            }} value={valuePlannedPaymentFrequencyType}>
                                                <SelectTrigger className={ `dark:text-white ${errorPlannedPaymentDialog?.frequency_type ? ` !border-red-500` : ''}` }>
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
                                        <ErrorMessage message={ errorPlannedPaymentDialog?.frequency }/>
                                        <ErrorMessage message={ errorPlannedPaymentDialog?.frequency_type }/>
                                    </div>
                                </div>
                                
                                {/* Timestamp */}
                                <div className={ ` form--group` }>
                                    <div id={ `record_dialog-date` } className={ ` form--group !mb-0 ${errorPlannedPaymentDialog?.date ? ` is--invalid` : ''}` }>
                                        <label className={ ` form--label` }>Start at</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={ ` w-full justify-start text-left font-normal ${!valuePlannedPaymentDate && "text-muted-foreground"} ${errorPlannedPaymentDialog?.date ? ` !border-red-500` : ''} dark:text-white`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {valuePlannedPaymentDate ? format(valuePlannedPaymentDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={valuePlannedPaymentDate}
                                                    onSelect={setValuePlannedPaymentDate}
                                                    defaultMonth={valuePlannedPaymentDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <ErrorMessage message={ errorPlannedPaymentDialog?.date }/>
                                    </div>
                                </div>

                                {/* Planned Payment Note */}
                                <div className={ ` form--group  ${errorPlannedPaymentDialog?.notes ? ` is--invalid` : ''}` } id={ `record_dialog-note` }>
                                    <label className={ ` form--label` }>Note</label>
                                    <Textarea className={ ` w-full ${errorPlannedPaymentDialog?.notes ? ` !border-red-500` : ''}` } placeholder="Type your message here." value={ valuePlannedPaymentNotes } onChange={(e) => {
                                        setValuePlannedPaymentNotes(e.target.value);
                                    }}/>
                                
                                    <ErrorMessage message={ errorPlannedPaymentDialog?.notes }/>
                                </div>

                                {/* Keep open record dialog? */}
                                <div className={ `form-group` }>
                                    <div className={ `flex items-center space-x-2` }>
                                    <Checkbox id="record_dialog-keep_open" checked={ keepOpenPlannedPaymentDialog } onCheckedChange={(value) => {
                                        if(typeof value === 'boolean'){
                                            setKeepOpenPlannedPaymentDialog(value);
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
                            if(document.getElementById('plannedPaymentDialog-forms')){
                                (document.getElementById('plannedPaymentDialog-forms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='plannedPayment_dialog-submit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}