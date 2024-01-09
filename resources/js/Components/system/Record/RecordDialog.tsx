import { CategoryItem, WalletItem, User, RecordItem, PlannedItem, TagsItem } from '@/types';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { useIsFirstRender } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import axios, { AxiosError } from 'axios';
import { Link } from '@inertiajs/react';
import { format } from "date-fns"

// Plugins
import { momentFormated, ucwords } from '@/function';
import '@/../plugins/fontawesome/all.scss';
import { IMaskMixin } from 'react-imask'
import moment from 'moment-timezone';

// Partials
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import ErrorMessage from '@/Components/forms/ErrorMessage';

// Shadcn Component
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Textarea } from '@/Components/ui/textarea';
import { Calendar } from '@/Components/ui/calendar';
import { Checkbox } from '@/Components/ui/checkbox';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { toast } from 'sonner';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/Components/ui/drawer';
import { RemoveScroll } from 'react-remove-scroll';

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function RecordDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Form Variable
    const [formPlannedPaymentUuid, setFormPlannedPaymentUuid] = useState<string>('');
    const [formPlannedPaymentName, setFormPlannedPaymentName] = useState<string>('');
    const [formUuid, setFormUuid] = useState<string>('');
    const [formType, setFormType] = useState<string>('expense');
    const [formCategory, setFormCategory] = useState<string>("");
    const [formFromWallet, setFormFromWallet] = useState<string>("");
    const [formToWallet, setFormToWallet] = useState<string>("");
    const [formAmount, setFormAmount] = useState<number>();
    const [formExtraAmount, setFormExtraAmount] = useState<number>();
    const [formExtraType, setFormExtraType] = useState<string>('amount');
    const [formDate, setFormDate] = useState<Date>();
    const [formHours, setFormHours] = useState<string>();
    const [formHoursState, setFormHoursState] = useState<boolean>(false);
    const [formMinutes, setFormMinutes] = useState<string>();
    const [formMinutesState, setFormMinutesState] = useState<boolean>(false);
    const [formNotes, setFormNotes] = useState<string>('');
    const [formTags, setFormTags] = useState<string[] | any[]>([]);
    const [formHideRecord, setFormHideRecord] = useState<boolean>(false);
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
            if(!formUuid && formCategory === ''){
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
            if(!formUuid && formFromWallet === ''){
                setComboboxFromWalletLabel(`Select an option`);
            }
        }
    }, [formFromWallet]);

    // Combobox - To Wallet
    let comboboxToWalletTimeout: any;
    const [comboboxToWalletOpenState, setComboboxToWalletOpenState] = useState<boolean>(false);
    const [comboboxToWalletLabel, setComboboxToWalletLabel] = useState<string>("Select an option");
    // const [comboboxToWalletList, setComboboxToWalletList] = useState<string[] | any>([]);
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
        // setComboboxFromWalletList([]);

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
                            // setComboboxToWalletList(data);
                            setComboboxFromWalletList(data);
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
            if(!formUuid && formToWallet === ''){
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
        if(!isFirstRender){
            setTimeout(() => {
                // Reset error bag
                setErrorFormDialog({});
                // Cancel previous request
                if(formDialogAbortController instanceof AbortController){
                    formDialogAbortController.abort();
                }
                
                // Handle when record dialog is opened
                if(openState){
                    if(!formDate){
                        // Update timestamp
                        let now = moment();
                        let hours = now.get('hour');
                        let minutes = now.get('minute');
                        
                        // Update state
                        setFormDate(moment(now).toDate());
                        setFormHours(String(hours));
                        setFormMinutes(String(minutes));
                    }
    
                    // Announce Dialog Global Event
                    document.dispatchEvent(new CustomEvent('dialog.record.shown', { bubbles: true }));
                } else {
                    resetFormDialog();
                    setKeepOpenDialog(false);
    
                    // Announce Dialog Global Event
                    document.dispatchEvent(new CustomEvent('dialog.record.hidden', { bubbles: true }));
                }
            }, 100);
        }
    }, [openState]);

    // Form Reset
    const resetFormDialog = () => {
        // Planned Payment
        setFormPlannedPaymentUuid('');
        setFormPlannedPaymentName('');

        // Record
        setFormUuid('');
        setFormType('expense');
        setFormCategory('');
        setFormFromWallet('');
        setFormToWallet('');
        setFormAmount(0);
        setFormExtraAmount(0);
        setFormExtraType('amount');
        setFormDate(undefined);
        setFormHours(undefined);
        setFormMinutes(undefined);
        setFormNotes('');
        setFormHideRecord(false);
        setFormTags([]);

        setComboboxTagsLabel([]);

        // Update timestamp
        let now = moment();
        let hours = now.get('hour');
        let minutes = now.get('minute');
        
        // Update state
        setFormDate(moment(now).toDate());
        setFormHours(String(hours));
        setFormMinutes(String(minutes));
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setAbortControllerRecordDialog] = useState<AbortController | null>(null);
    const handleSubmitDialog: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('record-dialogSubmit');
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
        setAbortControllerRecordDialog(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('type', formType);
        formData.append('category', formCategory);
        formData.append('from_wallet', formFromWallet);
        formData.append('to_wallet', formToWallet);
        formData.append('amount', String(formAmount ?? 0));
        formData.append('extra_amount', String(formExtraAmount ?? 0));
        formData.append('extra_type', formExtraType);
        formData.append('date', String(formDate ? moment(formDate).format('YYYY-MM-DD HH:mm:ss') : ''));
        formData.append('hours', String(formHours ?? ''));
        formData.append('minutes', String(formMinutes ?? ''));
        formData.append('notes', String(formNotes ?? ''));
        formData.append('hide_record', formHideRecord.toString());
        formData.append('timezone', moment.tz.guess());
        if(formTags.length > 0){
            formTags.forEach((value, index) => {
                formData.append('tags[]', value);
            });
        }

        // Append if Planned Payment UUID is set
        if(formPlannedPaymentUuid){
            formData.append('planned_payment_uuid', formPlannedPaymentUuid);
        }

        // Adjust route target
        let actionRoute = route('api.record.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.record.v1.update', formUuid);
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
            
                    toast("Action: Success", {
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
                setErrorFormDialog(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#record-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('record-dialogSubmit');
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
    const [recordFetchAbortController, setRecordFetchAbortController] = useState<AbortController | null>(null);
    const fetchRecordData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(recordFetchAbortController instanceof AbortController){
            recordFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setRecordFetchAbortController(abortController);
        
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
        const editAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchRecordData(uuid, 'edit').then((data: RecordItem) => {
                    let raw = momentFormated('YYYY-MM-DD HH:mm:ss', data.datetime, moment.tz.guess());
                    let date = moment(raw).toDate();
                    let hours = String(moment(raw).get('hour'));
                    let minutes = String(moment(raw).get('minute'));

                    // Update State
                    setFormUuid(data.uuid)
                    setFormType(data.to_wallet ? 'transfer' : data.type);
                    setFormCategory(data.category ? data.category.uuid : '');
                    setFormFromWallet(data.from_wallet ? data.from_wallet.uuid : '');
                    setFormToWallet(data.to_wallet ? data.to_wallet.uuid : '');
                    setFormAmount(data.amount);
                    setFormExtraAmount(data.extra_type === 'amount' ? data.extra_amount : data.extra_percentage);
                    setFormExtraType(data.extra_type);
                    setFormDate(date);
                    setFormHours(hours);
                    setFormMinutes(minutes);
                    setFormHideRecord(data.is_hidden === 1);
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
                    if(data.record_tags && data.record_tags.length > 0){
                        let tagsUuid: any[] = [];
                        let tagsName: any[] = [];
                        (data.record_tags).forEach((value, index) => {
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
        document.addEventListener('record.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('record.edit-action', editAction);
        };
    }, []);

    // Handle Planned Payment
    const [abortControllerPlannedItem, setAbortControllerPlannedItem] = useState<AbortController | null>(null);
    const fetchPlannedPaymentData = async(uuid: string) => {
        // Cancel previous request
        if(abortControllerPlannedItem instanceof AbortController){
            abortControllerPlannedItem.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerPlannedItem(abortController);

        // Fetch
        try {
            const response = await axios.get(`${route('api.planned-payment.v1.show', uuid)}`, {
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
        // Listen to Trigger Action
        const plannedRecordConfirmation = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchPlannedPaymentData(uuid).then((data: PlannedItem) => {
                    setFormPlannedPaymentUuid(data.uuid);
                    setFormPlannedPaymentName(data.name);

                    let raw = momentFormated('YYYY-MM-DD HH:mm:ss', `${data.date_start} 00:00:00`);
                    let rawTime = moment();
                    let date = moment(raw).toDate();
                    let hours = String(moment(rawTime).get('hour'));
                    let minutes = String(moment(rawTime).get('minute'));
                    // Set Record Data
                    setFormType(data.type);
                    setFormCategory(data.category ? data.category.uuid : '');
                    setFormFromWallet(data.from_wallet ? data.from_wallet.uuid : '');
                    setFormToWallet(data.to_wallet ? data.to_wallet.uuid : '');
                    setFormAmount(data.amount);
                    setFormExtraAmount(data.extra_type === 'amount' ? data.extra_amount : data.extra_percentage);
                    setFormExtraType(data.extra_type);
                    setFormDate(date);
                    setFormHours(hours);
                    setFormMinutes(minutes);
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
            }
            setTimeout(() => {
                setOpenState(true);
            }, 1000);
        }

        document.addEventListener('record-dialog.planned-payment.confirmation', plannedRecordConfirmation);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('record-dialog.planned-payment.confirmation', plannedRecordConfirmation);
        };
    });

    let formContent = <>
        <RemoveScroll className={ `overflow-auto ${isDesktop ? `max-h-screen max-lg:max-h-[50vh] lg:max-h-[65vh] border-b border-t` : ` border-t`}` }>
            <form onSubmit={handleSubmitDialog} id={ `record-dialogForms` } className={ ` !overflow-hidden ${isDesktop ? `` : ``}` }>
                <div className={ ` flex gap-0 lg:gap-6 flex-col lg:flex-row px-6` }>
                    {/* Left */}
                    <div className={ `py-6 w-full lg:w-3/5` }>
                        {(() => {
                            if(formPlannedPaymentUuid && formPlannedPaymentName){
                                return (
                                    <div className=" w-full p-4 mb-6 rounded-lg border-2 border-dashed">
                                        <span className=" flex items-center gap-2 text-sm font-normal">
                                            <i className="fa-solid fa-clock"></i>
                                            <span className={ `font-normal` }>Planned Payment(s)</span>
                                        </span>
                                        <span className=" block mt-2">You'll create a record for related planned payment (<u><Link href={ route('sys.planned-payment.show', formPlannedPaymentUuid) }>{formPlannedPaymentName}</Link></u>)</span>
                                    </div>
                                );
                            }

                            return <></>;
                        })()}
                        
                        {/* Record Type */}
                        <div className={ `form-group mb-4 ${errorFormDialog?.type ? ` is--invalid` : ''}` }>
                            <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md ${errorFormDialog?.type ? ` !border-red-500` : ''}` } id={ `record_dialog-type` }>
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
                        <div className={ ` form--group  ${errorFormDialog?.category ? ` is--invalid` : ''}` } id={ `record_dialog-category` }>
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
                                                                        setComboboxCategoryLabel(options.name);
                                                                        setFormCategory(currentValue === formCategory ? "" : currentValue);

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
                        <div className={ ` form--group  ${errorFormDialog?.from_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-from_wallet` }>
                            <label className={ ` form--label` }>{ formType === 'income' ? 'To' : 'From' }</label>
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
                                                        {(() => {
                                                            if(comboboxFromWalletLoadState){
                                                                return <>
                                                                    <CommandItem
                                                                        value=''
                                                                        key={ `from_wallet_loading-state` }
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
                                                        {comboboxFromWalletList.map((options: WalletItem) => (
                                                            <CommandItem
                                                                value={options?.uuid}
                                                                key={options?.uuid}
                                                                onSelect={(currentValue) => {
                                                                    setComboboxFromWalletLabel(options.name);
                                                                    setFormFromWallet(currentValue === formFromWallet ? "" : currentValue);

                                                                    setComboboxFromWalletOpenState(false)
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
                                return (
                                    <div className={ ` flex flex-col gap-4` }>
                                        <Button variant={ `outline` } className={ ` inline-flex gap-1 w-max` } onClick={() => {
                                            let temp = {
                                                option: formToWallet,
                                                label: comboboxToWalletLabel
                                            };

                                            setFormToWallet(formFromWallet);
                                            setComboboxToWalletLabel(comboboxFromWalletLabel);

                                            setFormFromWallet(temp.option);
                                            setComboboxFromWalletLabel(temp.label);
                                        }} type={ `button` }>
                                            <i className={ ` fa-solid fa-right-left rotate-90` }></i>
                                            <span>Switch</span>
                                        </Button>

                                        <div className={ ` form--group  ${errorFormDialog?.to_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-to_wallet` }>
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
                                                                        {(() => {
                                                                            if(comboboxToWalletLoadState){
                                                                                return <>
                                                                                    <CommandItem
                                                                                        value=''
                                                                                        key={ `to_wallet_loading-state` }
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
                                                                        {/* {comboboxToWalletList.map((options: WalletItem) => ( */}
                                                                        {comboboxFromWalletList.map((options: WalletItem) => (
                                                                            <CommandItem
                                                                                value={options?.uuid}
                                                                                key={options?.uuid}
                                                                                onSelect={(currentValue) => {
                                                                                    setComboboxToWalletLabel(options.name);
                                                                                    setFormToWallet(currentValue === formToWallet ? "" : currentValue);

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
                                    </div>
                                );
                            }

                            return <></>;
                        })()}

                        {/* Amount */}
                        <div className={ ` form--group  ${errorFormDialog?.amount ? ` is--invalid` : ''}` } id={ `record_dialog-amount` }>
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
                            <div className={ ` form--group !mb-0 w-1/2  ${errorFormDialog?.extra_amount ? ` is--invalid` : ''}` } id={ `record_dialog-extra_amount` }>
                                <div className={ ` flex flex-col gap-1` }>
                                    {/* Extra Amount */}
                                    <div id={ `record_dialog-extra_amount` }>
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
                                    <div id={ `record_dialog-extra_type` }>
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
                            <div className={ ` form--group !mb-0 w-1/2  ${errorFormDialog?.final_amount ? ` is--invalid` : ''}` } id={ `record_dialog-final_amount` }>
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
                        {/* Timestamp */}
                        <div className={ ` form--group` }>
                            <div id={ `record_dialog-date` } className={ ` form--group !mb-0 ${errorFormDialog?.date ? ` is--invalid` : ''}` }>
                                <label className={ ` form--label` }>Timestamp</label>
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
                                            onSelect={(val) => {
                                                setFormDate(val);
                                                setCalendarOpenState(false);
                                            }}
                                            defaultMonth={formDate}
                                            disabled={(date) =>
                                                moment(moment(date).format('YYYY-MM-DD')) > moment(moment().format('YYYY-MM-DD'))
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <ErrorMessage message={ errorFormDialog?.date }/>
                            </div>

                            {/* Timepickr */}
                            <div className={ ` flex flex-row gap-4 mt-2 items-center` }>
                                <div className={ `w-full form--group !mb-0 ${errorFormDialog?.hours ? ` is--invalid` : ''}` } id={ `record_dialog-hours` }>
                                    <Popover open={ formHoursState } onOpenChange={ setFormHoursState }>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ `w-full justify-between ${errorFormDialog?.hours ? ` !border-red-500` : ''} dark:text-white` }
                                            >
                                                <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{ formHours ? formHours.padStart(2, '0') : '' }</span>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[175px] lg:w-[400px] p-0" align={ `start` }>
                                            <Command>
                                                <CommandInput placeholder="Search hours" className={ ` border-none focus:ring-0` }/>
                                                <ScrollArea className="p-0">
                                                    <div className={ `max-h-[10rem]` }>
                                                        <CommandEmpty>No hours found</CommandEmpty>
                                                        <CommandGroup>
                                                            {(() => {
                                                                let hours: any[] = [];
                                                                for(let i = 0; i < 24; i++){
                                                                    hours.push(
                                                                        <CommandItem
                                                                            key={ i.toString().padStart(2, '0') }
                                                                            value={ i.toString().padStart(2, '0') }
                                                                            onSelect={(currentValue) => {
                                                                                setFormHours(currentValue);
                                                                                setFormHoursState(false);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={ `mr-2 h-4 w-4 ${formHours?.toString().padStart(2, '0') === i.toString().padStart(2, '0') ? "opacity-100" : "opacity-0"}`}
                                                                            />
                                                                            {/* <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ i.toString().padStart(2, '0') }</span> */}
                                                                            { i.toString().padStart(2, '0') }
                                                                        </CommandItem>
                                                                    );
                                                                }

                                                                if(hours.length > 0){
                                                                    return hours;
                                                                }

                                                                return <></>;
                                                            })()}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <ErrorMessage message={ errorFormDialog?.hours }/>
                                </div>
                                <span>:</span>
                                <div className={ `w-full form--group !mb-0  ${errorFormDialog?.minutes ? ` is--invalid` : ''}` } id={ `record_dialog-minutes` }>
                                    <Popover open={ formMinutesState } onOpenChange={ setFormMinutesState }>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ `w-full justify-between ${errorFormDialog?.minutes ? ` !border-red-500` : ''} dark:text-white` }
                                            >
                                                <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{ formMinutes ? formMinutes.padStart(2, '0') : '' }</span>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[175px] lg:w-[400px] p-0" align={ `start` }>
                                            <Command>
                                                <CommandInput placeholder="Search minutes" className={ ` border-none focus:ring-0` }/>
                                                <ScrollArea className="p-0">
                                                    <div className={ `max-h-[10rem]` }>
                                                        <CommandEmpty>No minutes found</CommandEmpty>
                                                        <CommandGroup>
                                                            {(() => {
                                                                let minutes: any[] = [];
                                                                for(let i = 0; i <= 59; i++){
                                                                    minutes.push(
                                                                        <CommandItem
                                                                            key={ i.toString().padStart(2, '0') }
                                                                            value={ i.toString().padStart(2, '0') }
                                                                            onSelect={(currentValue) => {
                                                                                setFormMinutes(currentValue);
                                                                                setFormMinutesState(false);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={ `mr-2 h-4 w-4 ${formMinutes?.toString().padStart(2, '0') === i.toString().padStart(2, '0') ? "opacity-100" : "opacity-0"}`}
                                                                            />
                                                                            { i.toString().padStart(2, '0') }
                                                                        </CommandItem>
                                                                    );
                                                                }

                                                                if(minutes.length > 0){
                                                                    return minutes;
                                                                }

                                                                return <></>;
                                                            })()}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <ErrorMessage message={ errorFormDialog?.minutes }/>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div className={ ` form--group  ${errorFormDialog?.notes ? ` is--invalid` : ''}` } id={ `record_dialog-note` }>
                            <label className={ ` form--label` }>Note</label>
                            <Textarea className={ ` w-full ${errorFormDialog?.notes ? ` !border-red-500` : ''}` } placeholder="Type your message here." value={ formNotes } onChange={(e) => {
                                setFormNotes(e.target.value);
                            }}/>
                        
                            <ErrorMessage message={ errorFormDialog?.notes }/>
                        </div>

                        {/* Tags */}
                        <div className={ ` form--group ${errorFormDialog?.tags ? ` is--invalid` : ''}` } id={ `record_dialog-tags` }>
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

                        <div className={ ` flex flex-col gap-2` }>
                            {/* Hide record */}
                            <div className={ `form-group` }>
                                <div className={ `flex items-center space-x-2` }>
                                    <Checkbox id="record_dialog-hide_record" checked={ formHideRecord } onCheckedChange={(value) => {
                                        if(typeof value === 'boolean'){
                                            setFormHideRecord(value);
                                        }
                                    }} />
                                    <label
                                        htmlFor="record_dialog-hide_record"
                                        className={ `text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white` }
                                    >
                                        Hide Record
                                    </label>
                                </div>
                            </div>
                            
                            {/* Keep open record dialog? */}
                            <div className={ `form-group` }>
                                <div className={ `flex items-center space-x-2` }>
                                <Checkbox id="record_dialog-keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                                    if(typeof value === 'boolean'){
                                        setKeepOpenDialog(value);
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
                </div>
            </form>
        </RemoveScroll>
    </>;

    // Drawer
    if(!isDesktop){
        return (
            <section id={ `record-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState} closeThreshold={ 0.3 }>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>{ formPlannedPaymentUuid ? `Planned Payment: Confirmation` : (formUuid ? `Edit` : `Add new`) } Record</DrawerTitle>
                        </DrawerHeader>
                        
                        { formContent }

                        <DrawerFooter className={ ` border-t` }>
                            <Button type='button' onClick={() => {
                                if(document.getElementById('record-dialogForms')){
                                    (document.getElementById('record-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='record-dialogSubmit'>Submit</Button>
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
        <section id={ `record-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto lg:min-w-[60vw] max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 p-0" data-type="record-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formPlannedPaymentUuid ? `Planned Payment: Confirmation` : (formUuid ? `Edit` : `Add new`) } Record</DialogTitle>
                    </DialogHeader>

                    { formContent }
                    
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('record-dialogForms')){
                                (document.getElementById('record-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='record-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}