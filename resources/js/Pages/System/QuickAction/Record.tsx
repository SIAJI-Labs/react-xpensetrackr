import { useEffect, useMemo, useState } from "react";
import { PageProps, WalletItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import axios, { AxiosError } from "axios";

// Plugins
import { formatRupiah, ucwords } from "@/function";
import '@/../plugins/fontawesome/all.scss';
import { IMaskMixin } from "react-imask";
import moment from "moment-timezone";
import '@/../css/siaji.scss';

// Partials
import { ThemeToggle } from "@/Components/template/theme-toggle";
import ErrorMessage from "@/Components/forms/ErrorMessage";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/Components/ui/use-toast";
import PublicLayout from '@/Layouts/PublicLayout';

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";

type ContentProps = {
}

export default function Record({ auth }: PageProps<ContentProps>) {
    const { toast } = useToast();

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));
    const [errorBag, setErrorBag] = useState<{ [key: string]: string[] }>({});
    
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
                    setErrorBag({});
                    // Create a new AbortController
                    const abortController = new AbortController();
                    // Store the AbortController in state
                    setValidationAbortController(abortController);

                    let formData = new FormData();
                    formData.append('key', keyValidation);
                    switch(keyValidation){
                        case 'wallet': {
                            formData.append('type', formType);
                            formData.append('from_wallet', formFromWallet);
                            formData.append('to_wallet', formToWallet);
                            break;
                        }
                        case 'amount': {
                            formData.append('amount', String(formAmount ?? 0));
                            formData.append('extra_amount', String(formExtraAmount ?? 0));
                            formData.append('extra_type', formExtraType);
                        }
                    }

                    // Sent request
                    axios.post(route('api.quick-action.v1.record.validation'), formData, {
                        cancelToken: new axios.CancelToken(function executor(c) {
                            // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                            abortController.abort = c;
                        })
                    }).then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            const responseJson = response.data;

                            // Update to next form
                            setFormIndex(formIndex + 1);
                        }

                        return true;
                    }).catch((response) => {
                        const axiosError = response as AxiosError;
                        console.log(response);

                        let errors:any = axiosError.response?.data;
                        // console.log(errors);
                        if(errors.errors){
                            // Store to the error bag variable
                            setErrorBag(errors.errors);
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

                // Set container height
                let contentContainer = document.getElementById('quick-action-container');
                if(contentContainer){
                    contentContainer.style.height = `calc(${quickItem.clientHeight + 'px'})`;
                }
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
        setFormType('expense');
        setFormFromWallet('');
        setFormToWallet('');
        setFormAmount(0);
        setFormExtraAmount(0);
        setFormExtraType('amount');
        setFormNotes('');
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
        formData.append('type', formType);
        formData.append('from_wallet', formFromWallet);
        formData.append('to_wallet', formToWallet);
        formData.append('amount', String(formAmount ?? 0));
        formData.append('extra_amount', String(formExtraAmount ?? 0));
        formData.append('extra_type', formExtraType);
        formData.append('notes', formNotes);
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
                setErrorBag(errors.errors);
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
    const [formType, setFormType] = useState<string>('expense');

    // From Wallet Combobox
    const [formFromWallet, setFormFromWallet] = useState<string>("");
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
        if(formFromWallet === ''){
            setComboboxFromWalletLabel(`Select an option`);
        }
    }, [formFromWallet]);

    // To Wallet Combobox
    const [formToWallet, setFormToWallet] = useState<string>("");
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
        if(formToWallet === ''){
            setComboboxToWalletLabel(`Select an option`);
        }
    }, [formToWallet]);

    // Amount
    const [formAmount, setFormAmount] = useState<number>();
    // Extra
    const [formExtraAmount, setFormExtraAmount] = useState<number>();
    const [formExtraType, setFormExtraType] = useState<string>('amount');
    // Final
    const calculateFinalAmount = useMemo(() => {
        // Calculate Final Amount
        let amount: number = formAmount ?? 0;
        let extra: number = formExtraAmount ?? 0;

        // Calculate extra value if extra type is percentage
        if(formExtraType === 'percentage'){
            extra = (extra * amount) / 100;
        }

        return amount + extra;
    }, [formAmount, formExtraAmount, formExtraType]);

    // Notes
    const [formNotes, setFormNotes] = useState<string>('');
    
    return (
        <PublicLayout>
            <Head title="Quick Action: Create new Record"/>

            <div className={ ` min-h-[100dvh] flex flex-row items-center max-md:items-end` }>
                <ScrollArea className={ `p-0 w-full` }>
                    <div className={ ` flex flex-col justify-center items-center max-md:mt-auto` }>
                        <main className={ ` w-full md:max-w-[420px] md:min-w-[420px] px-6 md:px-6 max-md:my-10 max-h-screen` }>
                            <div className={ ` mb-4` }>
                                <Link href={ route('sys.index') }>
                                    <ApplicationLogo
                                        fontSizeMain={ ` text-3xl` }   
                                    ></ApplicationLogo>
                                </Link>
                            </div>

                            <div className={ ` flex flex-col gap-2` }>
                                <Card>
                                    {/* <CardHeader className={ `` }>
                                        <div className={ `flex flex-col space-y-2 ` }>
                                            <CardTitle><span className={ ` font-light` }>Hi</span> <span className={ ` font-semibold` }>{auth.user.name}</span>,</CardTitle>
                                            <CardDescription>how's doing? 👋</CardDescription>
                                        </div>
                                    </CardHeader> */}
                                    <CardContent className={ ` pb-2` }>
                                        <div className={ ` transition-all duration-300 ease-in-out py-6 relative overflow-x-clip` } id={ `quick-action-wrapper` }>
                                            <div className={ ` absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out` } id={ `quick-action-container` }>
                                                {(() => {
                                                    let step = [
                                                        {
                                                            name: 'Step 1',
                                                            key: 'wallet',
                                                            el: <div>
                                                                {/* Record Type */}
                                                                <div className={ `form-group mb-4 ${errorBag?.type ? ` is--invalid` : ''}` }>
                                                                    <div className={ ` flex flex-row gap-4 w-full border p-1 rounded-md ${errorBag?.type ? ` !border-red-500` : ''}` } id={ `record_dialog-type` }>
                                                                        {(() => {
                                                                            let recordType: any[] = [];
                                                                            ['income', 'transfer', 'expense'].map((value, index) => {
                                                                                recordType.push(
                                                                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ formType === value ? `bg-primary ` : ` dark:!text-white !text-black hover:!text-primary-foreground`} text-primary-foreground hover:bg-primary/90 transition` } onClick={() => {
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

                                                                    <ErrorMessage message={ errorBag?.category_id }/>
                                                                </div>

                                                                {/* From Wallet */}
                                                                <div className={ ` form--group  ${errorBag?.from_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-from_wallet` }>
                                                                    <label className={ ` form--label` }>From</label>
                                                                    <div>
                                                                        <Popover open={comboboxFromWalletOpenState} onOpenChange={setComboboxFromWalletOpenState}>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    aria-expanded={comboboxFromWalletOpenState}
                                                                                    className={ `w-full justify-between ${errorBag?.from_wallet ? ` !border-red-500` : ''} dark:text-white` }
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

                                                                        <ErrorMessage message={ errorBag?.from_wallet }/>
                                                                    </div>
                                                                </div>

                                                                {/* To Wallet */}
                                                                {(() => {
                                                                    if(formType === 'transfer'){
                                                                        return (
                                                                            <div className={ ` flex flex-col gap-4` }>
                                                                                <Button variant={ `outline` } className={ ` inline-flex w-max` } onClick={() => {
                                                                                    let temp = {
                                                                                        option: formToWallet,
                                                                                        label: comboboxToWalletLabel
                                                                                    };

                                                                                    setFormToWallet(formFromWallet);
                                                                                    setComboboxToWalletLabel(comboboxFromWalletLabel);

                                                                                    setFormFromWallet(temp.option);
                                                                                    setComboboxFromWalletLabel(temp.label);
                                                                                }} type={ `button` }>Switch</Button>

                                                                                <div className={ ` form--group  ${errorBag?.to_wallet ? ` is--invalid` : ''}` } id={ `record_dialog-to_wallet` }>
                                                                                    <label className={ ` form--label` }>To</label>
                                                                                    <div>
                                                                                        <Popover open={comboboxToWalletOpenState} onOpenChange={setComboboxToWalletOpenState}>
                                                                                            <PopoverTrigger asChild>
                                                                                                <Button
                                                                                                    variant="outline"
                                                                                                    role="combobox"
                                                                                                    aria-expanded={comboboxToWalletOpenState}
                                                                                                    className={ ` w-full justify-between ${errorBag?.to_wallet ? ` !border-red-500` : ''} dark:text-white` }
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

                                                                                        <ErrorMessage message={ errorBag?.to_wallet }/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return <></>;
                                                                })()}
                                                            </div>
                                                        }, {
                                                            name: 'Step 2',
                                                            key: 'amount',
                                                            el: <div>
                                                                {/* Amount */}
                                                                <div className={ ` form--group  ${errorBag?.amount ? ` is--invalid` : ''}` } id={ `record_dialog-amount` }>
                                                                    <label className={ `form--label` }>Amount</label>
                                                                    <MaskedInput
                                                                        type={ `text` }
                                                                        placeholder={ `Amount` }
                                                                        inputMode={ `numeric` }
                                                                        value={ (formAmount ?? 0).toString() }
                                                                        className={ `${errorBag?.amount ? ` !border-red-500` : ''}` }
                                                                        mask={ Number }
                                                                        unmask={ true }
                                                                        thousandsSeparator={ `,` }
                                                                        scale={ 2 }
                                                                        radix={ `.` }
                                                                        onBlur={ (element) => {
                                                                            let value = (element.target as HTMLInputElement).value;
                                                                            value = value.replace(',', '');

                                                                            setFormAmount(Number(value));
                                                                        } }
                                                                    />

                                                                    <ErrorMessage message={ errorBag?.amount }/>
                                                                </div>

                                                                {/* Extra & Final Amount */}
                                                                <div className={ ` flex flex-col w-full` }>
                                                                    {/* Extra Amount */}
                                                                    <div className={ ` form--group  ${errorBag?.extra_amount ? ` is--invalid` : ''}` } id={ `record_dialog-extra_amount` }>
                                                                        <div className={ ` flex flex-col gap-1` }>
                                                                            {/* Extra Amount */}
                                                                            <div id={ `record_dialog-extra_amount` }>
                                                                                <label className={ ` form--label` }>Extra</label>
                                                                                <MaskedInput
                                                                                    type={ `text` }
                                                                                    placeholder={ `Extra Amount` }
                                                                                    inputMode={ `numeric` }
                                                                                    value={ (formExtraAmount ?? 0).toString() }
                                                                                    className={ `${errorBag?.extra_amount ? ` !border-red-500` : ''}` }
                                                                                    mask={ Number }
                                                                                    unmask={ true }
                                                                                    thousandsSeparator={ `,` }
                                                                                    scale={ 2 }
                                                                                    radix={ `.` }
                                                                                    onBlur={ (element) => {
                                                                                        let value = (element.target as HTMLInputElement).value;
                                                                                        value = value.replace(',', '');

                                                                                        setFormExtraAmount(Number(value));
                                                                                    } }
                                                                                />

                                                                                <ErrorMessage message={ errorBag?.extra_amount }/>
                                                                            </div>
                                                                            {/* Extra Type */}
                                                                            <div id={ `record_dialog-extra_type` }>
                                                                                <span className={ ` text-sm flex flex-row gap-1` }>
                                                                                    <span className={ ` cursor-pointer ${formExtraType === 'amount' ? ` font-semibold` : ''}` } onClick={() => {
                                                                                        if(formExtraType !== 'amount'){
                                                                                            setFormExtraType('amount');
                                                                                        }
                                                                                    }}>Amount</span>
                                                                                    <span>/</span>
                                                                                    <span className={ ` cursor-pointer ${formExtraType === 'percentage' ? ` font-semibold` : ''}` } onClick={() => {
                                                                                        if(formExtraType !== 'percentage'){
                                                                                            setFormExtraType('percentage');
                                                                                        }
                                                                                    }}>Percentage</span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Final Amount */}
                                                                    <div className={ ` form--group  ${errorBag?.final_amount ? ` is--invalid` : ''}` } id={ `record_dialog-final_amount` }>
                                                                        <label className={ ` form--label` }>Final</label>
                                                                        <MaskedInput
                                                                            type={ `text` }
                                                                            placeholder={ `Final Amount` }
                                                                            inputMode={ `numeric` }
                                                                            value={ (calculateFinalAmount ?? 0).toString() }
                                                                            className={ `${errorBag?.final_amount ? ` !border-red-500` : ''}` }
                                                                            mask={ Number }
                                                                            unmask={ true }
                                                                            thousandsSeparator={ `,` }
                                                                            scale={ 2 }
                                                                            radix={ `.` }
                                                                            disabled={ true }
                                                                        />

                                                                        <ErrorMessage message={ errorBag?.final_amount }/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }, {
                                                            name: 'Step 3',
                                                            key: 'note',
                                                            el: <div>
                                                                {/* Record Note */}
                                                                <div className={ ` form--group  ${errorBag?.notes ? ` is--invalid` : ''}` } id={ `record_dialog-note` }>
                                                                    <label className={ ` form--label` }>Note</label>
                                                                    <Textarea className={ ` w-full ${errorBag?.notes ? ` !border-red-500` : ''}` } placeholder="Type your message here." value={ formNotes } onChange={(e) => {
                                                                        setFormNotes(e.target.value);
                                                                    }}/>
                                                                
                                                                    <ErrorMessage message={ errorBag?.notes }/>
                                                                </div>
                                                            </div>
                                                        }, {
                                                            name: 'Step 4',
                                                            key: 'review',
                                                            el: <div className={ ` mb-4` }>
                                                                {/* Typw */}
                                                                <div className={ ` mb-4` }>
                                                                    <span className={ ` block font-semibold` }>Type</span>
                                                                    <Badge>{ ucwords(formType) }</Badge>
                                                                </div>

                                                                {/* Wallet */}
                                                                <div className={ ` flex flex-row justify-between gap-4` }>
                                                                    <div className={ ` w-full overflow-hidden` }>
                                                                        <span className={ ` block font-semibold` }>From Wallet</span>
                                                                        <span className={ ` block whitespace-nowrap overflow-hidden w-full text-ellipsis` }>{ comboboxFromWalletLabel }</span>
                                                                    </div>

                                                                    {(() => {
                                                                        if(formType === 'transfer'){
                                                                            return <div className={ ` w-full overflow-hidden text-right` }>
                                                                                <span className={ ` block font-semibold` }>To Wallet</span>
                                                                                <span className={ ` whitespace-nowrap` }>{ comboboxToWalletLabel }</span>
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
                                                                    <span className=" block mt-2">{ formNotes ?? 'No description provided' }</span>
                                                                </div>

                                                                {/* Amount, etc */}
                                                                <div className={ `mt-4` }>
                                                                    <div className={ `flex justify-between mt-2 text-sm` }>
                                                                        <span>Amount</span>
                                                                        <span data-review="amount">{ formatRupiah(formAmount ?? 0) }</span>
                                                                    </div>
                                                                    <div className={ `flex justify-between mt-1 text-sm` }>
                                                                        <span>
                                                                            <span>Extra</span>
                                                                            {(() => {
                                                                                if(formExtraType === 'percentage'){
                                                                                    return <span className={ `text-xs` }>({ formExtraAmount ?? 0 }%)</span>;
                                                                                }
                                                                                return <></>;
                                                                            })()}
                                                                        </span>
                                                                        <span data-review="extra_amount">{ formatRupiah((calculateFinalAmount ?? 0) - (formAmount ?? 0)) }</span>
                                                                    </div>
                                                                    <hr className={ `my-1` }/>
                                                                    <div className={ `flex justify-between mt-2` }>
                                                                        <span className={ `font-semibold` }>Final Amount</span>
                                                                        <span className={ `font-semibold` } data-review="final_amount">{ formatRupiah(calculateFinalAmount ?? 0) }</span>
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
                                            <div className={ ` w-5/12` }>
                                                <Button variant={ `outline` } className={ formIndex === 0 ? ` !opacity-0` : `` } disabled={ formIndex === 0 } onClick={($refs) => {
                                                    wizardPagination('prev', $refs);
                                                }}>Prev</Button>
                                            </div>
                                            
                                            {(() => {
                                                if(formIndex > 0){
                                                    return <Button variant={ `ghost` } className={ `w-3/12` } onClick={($refs) => {
                                                        formReset();
                                                        setFormIndex(0);
                                                    }}>
                                                        <span className={ `text-destructive` }>Reset</span>
                                                    </Button>
                                                }
                                                return <></>;
                                            })()}

                                            <div className={ ` w-5/12 flex flex-col items-end` }>
                                                {(() => {
                                                    if(formIndex === formLastIndex){
                                                        // Submit
                                                        return <Button className={ ` w-full` } onClick={($refs) => {
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
                                        </div>
                                    </CardFooter>
                                </Card>

                                <div className={ `  flex flex-col gap-6 w-full text-center` }>
                                    <Link href={ route('sys.index') } className={ `dark:text-white` }>Go to Dashboard</Link>

                                    {/* Theme */}
                                    <div className={ ` flex flex-row gap-4 rounded border p-2 dark:text-white` }>
                                        <ThemeToggle className={ ` flex flex-row gap-2 w-full` }/>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </ScrollArea>
            </div>
        </PublicLayout>
    );
}