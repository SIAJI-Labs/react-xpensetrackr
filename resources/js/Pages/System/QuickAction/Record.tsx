import { useEffect, useMemo, useState } from "react";
import { PageProps, WalletItem } from "@/types";
import axios, { AxiosError } from "axios";
import { Head, Link } from "@inertiajs/react";

import '@/../plugins/fontawesome/all.scss';
import { formatRupiah, ucwords } from "@/function";
import moment from "moment-timezone";
import '@/../css/siaji.scss';

import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/Components/ui/use-toast";
import PublicLayout from '@/Layouts/PublicLayout';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { IMaskMixin } from "react-imask";
import ApplicationLogo from "@/Components/ApplicationLogo";

type Props = {
}

export default function Record({ auth }: PageProps<Props>) {
    const { toast } = useToast();
    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));
    const [errorRecordDialog, setErrorRecordDialog] = useState<{ [key: string]: string[] }>({});
    
    // Quick Action: Form Wizard
    const [formIndex, setFormIndex] = useState<number>(0);
    const [formLastIndex, setFormLastIndex] = useState<number>(0);
    const wizardPagination = (action: string, $refs: any) => {
        if(validationAbortController instanceof AbortController){
            validationAbortController.abort();
        }

        let element = $refs.target as HTMLElement;
        // Fetch original text
        let originalText = element.textContent;

        if(action === 'next'){
            // Update element to loading state
            if(element.tagName.toLowerCase() === 'button'){
                element.setAttribute('disabled', 'disabled');
            }
            element.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

            // Validate, then Go to next element if validated
            let activeKey = document.querySelector('.quick-action-item.active');
            if(activeKey){
                let keyValidation = (activeKey as HTMLElement).dataset.key;

                if(keyValidation){
                    // Reset error bag
                    setErrorRecordDialog({});
                    // Create a new AbortController
                    const abortController = new AbortController();
                    // Store the AbortController in state
                    setValidationAbortController(abortController);

                    let formData = new FormData();
                    formData.append('key', keyValidation);
                    switch(keyValidation){
                        case 'wallet': {
                            formData.append('type', valueRecordType);
                            formData.append('from_wallet', valueRecordFromWallet);
                            formData.append('to_wallet', valueRecordToWallet);
                            break;
                        }
                        case 'amount': {
                            formData.append('amount', String(valueRecordAmount ?? 0));
                            formData.append('extra_amount', String(valueRecordExtraAmount ?? 0));
                            formData.append('extra_type', valueRecordExtraType);
                        }
                    }

                    // Sent request
                    axios.post(route('api.quick-action.v1.record.validation'), formData, {
                        cancelToken: new axios.CancelToken(function executor(c) {
                            // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                            abortController.abort = c;
                        })
                    }).then((response) => {
                        if (response.status === 200) {
                            const responseJson = response.data;

                            // Update to next form
                            setFormIndex(formIndex + 1);
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
                        if(element.tagName.toLowerCase() === 'button'){
                            element.removeAttribute('disabled');
                        }
                        if(originalText){
                            element.innerHTML = originalText;
                        }
                    });
                }
            }
        } else if(action === 'prev'){
            // Go to previous form
            if(formIndex > 0){
                setFormIndex(formIndex - 1)
            }
        }
    }
    // Handle Wizard Content
    const matchCardContent = () => {
        let quickActionContent = document.getElementById('quick-action-wrapper') as HTMLElement;
        if(quickActionContent){
            // Match Quick Action Container height with active items
            let quickItem = quickActionContent.querySelector('.quick-action-item.active') as HTMLElement;
            if(quickItem){
                quickActionContent.style.height = `calc(${quickItem.clientHeight + 'px'} + 1.5rem)`;
            }

            // Match item Width with Container width
            let quickItems = quickActionContent.querySelectorAll('.quick-action-item');
            if(quickItems.length > 0){
                setFormLastIndex(quickItems.length - 1);
                for (const element of quickItems) {
                    (element as HTMLElement).style.width = `calc(${quickActionContent.clientWidth}px)`;
                }
            }
        }
    }
    useEffect(() => {
        matchCardContent();
    });
    // Slide Card Content
    useEffect(() => {
        let contentContainer = document.getElementById('quick-action-container');
        if(contentContainer){
            let quickItems = contentContainer.querySelectorAll('.quick-action-item');
            if(quickItems[formIndex]){
                contentContainer.style.transform = `translateX(-${(quickItems[formIndex] as HTMLElement).offsetLeft}px)`;

                // Remove previus active element
                let activeElement = contentContainer.querySelector('.quick-action-item.active');
                if(activeElement){
                    activeElement.classList.remove('active');
                }
                // Give active to current element
                quickItems[formIndex].classList.add('active');

                matchCardContent();
            }
        }
    }, [formIndex]);
    // Quick Action: Reset Form
    const formReset = () => {
        setValueRecordType('expense');
        setValueRecordFromWallet('');
        setValueRecordToWallet('');
        setValueRecordAmount(0);
        setValueRecordExtraAmount(0);
        setValueRecordExtraType('amount');
        setValueRecordNotes('');
    }
    // Quick Action: Form Submit
    const [submitAbortController, setSubmitAbortController] = useState<AbortController | null>(null);
    const formSubmit = ($refs: any) => {
        let element = $refs.target as HTMLElement;
        // Fetch original text
        let originalText = element.textContent;
        // Update element to loading state
        if(element.tagName.toLowerCase() === 'button'){
            element.setAttribute('disabled', 'disabled');
        }
        element.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

        if(submitAbortController instanceof AbortController){
            submitAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setSubmitAbortController(abortController);

        let formData = new FormData;
        formData.append('type', valueRecordType);
        formData.append('from_wallet', valueRecordFromWallet);
        formData.append('to_wallet', valueRecordToWallet);
        formData.append('amount', String(valueRecordAmount ?? 0));
        formData.append('extra_amount', String(valueRecordExtraAmount ?? 0));
        formData.append('extra_type', valueRecordExtraType);
        formData.append('timestamp', moment().format('YYYY-MM-DD HH:mm:ss'));
        formData.append('timezone', moment.tz.guess());

        // Sent request
        axios.post(route('api.quick-action.v1.record.store'), formData, {
            cancelToken: new axios.CancelToken(function executor(c) {
                // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                abortController.abort = c;
            })
        }).then((response) => {
            if (response.status === 200) {
                const responseJson = response.data;

                toast({
                    title: "Action: Success",
                    description: "Record data successfully saved",
                });
                // Update to next form
                formReset();
                setFormIndex(0);
            }

            return true;
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorRecordDialog(errors.errors);
            }
        }).finally(() => {
            if(element.tagName.toLowerCase() === 'button'){
                element.removeAttribute('disabled');
            }
            if(originalText){
                element.innerHTML = originalText;
            }
        });
    }

    // Validation
    const [validationAbortController, setValidationAbortController] = useState<AbortController | null>(null);

    // Record Type
    const [valueRecordType, setValueRecordType] = useState<string>('expense');

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

    // Notes
    const [valueRecordNotes, setValueRecordNotes] = useState<string>();
    
    return (
        <PublicLayout>
            <Head title="Quick Action: Create new Record"/>

            <div className={ ` flex flex-col justify-center items-center h-screen w-screen` }>
                <main className={ ` max-w-[400px] md:min-w-[400px] py-[calc(64px)] px-6` }>
                    <div className={ ` mb-4` }>
                        <ApplicationLogo
                            fontSizeMain={ ` text-3xl` }   
                        ></ApplicationLogo>
                    </div>

                    <Card>
                        {/* <CardHeader className={ `` }>
                            <div className={ `flex flex-col space-y-2 ` }>
                                <CardTitle><span className={ ` font-light` }>Hi</span> <span className={ ` font-semibold` }>{auth.user.name}</span>,</CardTitle>
                                <CardDescription>how's doing? 👋</CardDescription>
                            </div>
                        </CardHeader> */}
                        <CardContent className={ ` pb-2` }>
                            <div className={ ` transition-all duration-300 ease-in-out py-6 relative overflow-hidden` } id={ `quick-action-wrapper` }>
                                <div className={ ` absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out` } id={ `quick-action-container` }>
                                    {(() => {
                                        let step = [
                                            {
                                                name: 'Step 1',
                                                key: 'wallet',
                                                el: <div>
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
                                                </div>
                                            }, {
                                                name: 'Step 2',
                                                key: 'amount',
                                                el: <div>
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
                                                    <div className={ ` flex flex-col w-full` }>
                                                        {/* Extra Amount */}
                                                        <div className={ ` form--group  ${errorRecordDialog?.extra_amount ? ` is--invalid` : ''}` } id={ `record_dialog-extra_amount` }>
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
                                                        <div className={ ` form--group  ${errorRecordDialog?.final_amount ? ` is--invalid` : ''}` } id={ `record_dialog-final_amount` }>
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
                                            }, {
                                                name: 'Step 3',
                                                key: 'note',
                                                el: <div>
                                                    {/* Record Note */}
                                                    <div className={ ` form--group  ${errorRecordDialog?.notes ? ` is--invalid` : ''}` } id={ `record_dialog-note` }>
                                                        <label className={ ` form--label` }>Note</label>
                                                        <Textarea className={ ` w-full ${errorRecordDialog?.notes ? ` border-red-500` : ''}` } placeholder="Type your message here." value={ valueRecordNotes } onChange={(e) => {
                                                            setValueRecordNotes(e.target.value);
                                                        }}/>
                                                    
                                                        <ErrorMessage message={ errorRecordDialog?.notes }/>
                                                    </div>
                                                </div>
                                            }, {
                                                name: 'Step 4',
                                                key: 'review',
                                                el: <div className={ ` mb-4` }>
                                                    {/* Typw */}
                                                    <div className={ ` mb-4` }>
                                                        <span className={ ` block font-semibold` }>Type</span>
                                                        <Badge>{ ucwords(valueRecordType) }</Badge>
                                                    </div>

                                                    {/* Wallet */}
                                                    <div className={ ` flex flex-row justify-between gap-4` }>
                                                        <div className={ ` w-full overflow-hidden` }>
                                                            <span className={ ` block font-semibold` }>From Wallet</span>
                                                            <span className={ ` block whitespace-nowrap overflow-hidden w-full text-ellipsis` }>{ fromWalletComboboxLabel }</span>
                                                        </div>

                                                        {(() => {
                                                            if(valueRecordType === 'transfer'){
                                                                return <div className={ ` w-full overflow-hidden text-right` }>
                                                                    <span className={ ` block font-semibold` }>To Wallet</span>
                                                                    <span className={ ` whitespace-nowrap` }>{ toWalletComboboxLabel }</span>
                                                                </div>
                                                            }

                                                            return <></>;
                                                        })()}
                                                    </div>

                                                    {/* Note */}
                                                    <div className=" w-full p-4 rounded-lg border-2 border-dashed mt-4">
                                                        <span className=" flex items-center gap-2 text-sm">
                                                            <i className="fa-solid fa-align-left"></i>
                                                            <strong>Note(s)</strong>
                                                        </span>
                                                        <span className=" block mt-2">{ valueRecordNotes ?? 'No description provided' }</span>
                                                    </div>

                                                    {/* Amount, etc */}
                                                    <div className={ `mt-4` }>
                                                        <div className={ `flex justify-between mt-2 text-sm` }>
                                                            <span>Amount</span>
                                                            <span data-review="amount">{ formatRupiah(valueRecordAmount ?? 0) }</span>
                                                        </div>
                                                        <div className={ `flex justify-between mt-1 text-sm` }>
                                                            <span>
                                                                <span>Extra</span>
                                                                {(() => {
                                                                    if(valueRecordExtraType === 'percentage'){
                                                                        return <span className={ `text-xs` }>({ valueRecordExtraAmount ?? 0 }%)</span>;
                                                                    }
                                                                    return <></>;
                                                                })()}
                                                            </span>
                                                            <span data-review="extra_amount">{ formatRupiah((valueRecordFinalAmount ?? 0) - (valueRecordAmount ?? 0)) }</span>
                                                        </div>
                                                        <hr className={ `my-1` }/>
                                                        <div className={ `flex justify-between mt-2` }>
                                                            <span className={ `font-semibold` }>Final Amount</span>
                                                            <span className={ `font-semibold` } data-review="final_amount">{ formatRupiah(valueRecordFinalAmount ?? 0) }</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        ];

                                        let formated: any[] = [];
                                        step.forEach((val, index) => {
                                            formated.push(
                                                <section key={ `wizzard-step_${index}` } className={ `quick-action-item ${index === 0 ? `active` : ''} flex flex-col h-[fit-content] px-1` } data-key={ val.key }>
                                                    { val.el }
                                                </section>
                                            );
                                        });

                                        return formated;
                                    })()}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className={ ` flex justify-between w-full gap-4` }>
                                <Button variant={ `outline` } disabled={ formIndex === 0 } onClick={($refs) => {
                                    wizardPagination('prev', $refs);
                                }}>Prev</Button>
                                
                                {(() => {
                                    if(formIndex > 0){
                                        return <Button variant={ `destructive` } className={ `w-full` } onClick={($refs) => {
                                            formReset();
                                            setFormIndex(0);
                                        }}>Reset</Button>
                                    }
                                    return <></>;
                                })()}

                                {(() => {
                                    if(formIndex === formLastIndex){
                                        // Submit
                                        return <Button className={ ` w-1/2` } onClick={($refs) => {
                                            formSubmit($refs);
                                        }}>Submit</Button>
                                    } else {
                                        // Next action
                                        return <Button variant={ `outline` } disabled={ formIndex === formLastIndex } onClick={($refs) => {
                                            wizardPagination('next', $refs);
                                        }}>Next</Button>
                                    }
                                    
                                    return <></>;
                                })()}
                            </div>
                        </CardFooter>
                    </Card>

                    <div className={ ` mt-4 w-full text-center` }>
                        <Link href={ route('sys.index') }>Go to Dashboard</Link>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
}