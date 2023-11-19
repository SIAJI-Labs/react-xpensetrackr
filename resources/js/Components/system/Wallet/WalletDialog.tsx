import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import { WalletItem } from "@/types";
import axios, { AxiosError } from "axios";

// Plugins
import { IMaskMixin } from "react-imask";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useToast } from "@/Components/ui/use-toast";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { ScrollArea } from "@/Components/ui/scroll-area";

type WalletDialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function WalletDialog({ openState, setOpenState }: WalletDialogProps){
    const isFirstRender = useIsFirstRender();
    const { toast } = useToast();

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Dialog Action
    useEffect(() => {
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.wallet.shown', { bubbles: true }));
        } else {
            console.log('Hidden');
            
            resetWalletDialog();
            setKeepOpenWalletDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.wallet.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Form
    const [valueWalletParent, setValueWalletParent] = useState<string>("");
    const [valueWalletUuid, setValueWalletUuid] = useState<string>('');
    const [valueWalletName, setValueWalletName] = useState<string>('');
    const [valueWalletStartingBalance, setValueWalletStartingBalance] = useState<number>(0);
    // Keep Record Dialog Open?
    const [keepOpenWalletDialog, setKeepOpenWalletDialog] = useState<boolean>(false);
    // Planned Payment Dialog - Forms
    const resetWalletDialog = () => {
        setValueWalletUuid('');
        setValueWalletParent('');
        setValueWalletName('');
        setValueWalletStartingBalance(0);

        setErrorWalletDialog({});
    }
    // Form Action
    const [errorWalletDialog, setErrorWalletDialog] = useState<{ [key: string]: string[] }>({});
    const [abortControllerWalletDialog, setAbortControllerWalletDialog] = useState<AbortController | null>(null);
    const handleWalletDialogSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('wallet_dialog-submit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorWalletDialog({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerWalletDialog(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('parent_id', valueWalletParent);
        formData.append('name', valueWalletName);
        formData.append('starting_balance', valueWalletStartingBalance.toString());

        if(valueWalletUuid){
            formData.append('wallet_uuid', valueWalletUuid);
        }

        // Adjust route target
        let actionRoute = route('api.wallet.v1.store');
        if(valueWalletUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.wallet.v1.update', valueWalletUuid);
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
                    if (!keepOpenWalletDialog) {
                        setOpenState(false);
                    } else {
                        // Reset form
                        resetWalletDialog();
                    }
            
                    toast({
                        title: "Action: Success",
                        description: "Wallet data successfully saved",
                    });
                }
            }

            return true;
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorWalletDialog(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#walletDialog-forms .form--group.is--invalid');
        
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
            setAbortControllerWalletDialog(null);
        
            // Update to original state
            let submitBtn = document.getElementById('wallet_dialog-submit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    };

    // Combobox - From Wallet
    let parentComboboxTimeout: any;
    const [openWalletParent, setOpenWalletParent] = useState<boolean>(false);
    const [parentComboboxLabel, setWalletComboboxLabel] = useState<string>("Select an option");
    const [parentComboboxList, setWalletComboboxList] = useState<string[] | any>([]);
    const [parentComboboxInput, setWalletComboboxInput] = useState<string>("");
    const [parentComboboxLoad, setWalletComboboxLoad] = useState<boolean>(false);
    const [parentAbortController, setWalletAbortController] = useState<AbortController | null>(null);
    const fetchWalletList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setWalletComboboxLoad(true);

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
        clearTimeout(parentComboboxTimeout);
        setWalletComboboxList([]);

        if(openWalletParent){
            if (parentAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                parentAbortController.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setWalletAbortController(newAbortController);

            parentComboboxTimeout = setTimeout(() => {
                fetchWalletList(parentComboboxInput, newAbortController)
                    .then((data: string[] = []) => {
                        setWalletComboboxLoad(false);
                        if(data){
                            setWalletComboboxList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 0);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (parentAbortController) {
                    parentAbortController.abort();
                }
            };
        }
    }, [parentComboboxInput, openWalletParent]);
    useEffect(() => {
        if(openState){
            if(valueWalletParent !== '' && parentComboboxList.length > 0){
                const selected: WalletItem | undefined = parentComboboxList.find(
                    (options: WalletItem) => options?.uuid === valueWalletParent
                ) as WalletItem | undefined;
    
                if (selected) {
                    setWalletComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
                }
            } else {
                setWalletComboboxLabel(`Select an option`);
            }
        } else {
            if(!valueWalletUuid){
                setWalletComboboxLabel(`Select an option`);
            }
        }
    }, [valueWalletParent]);

    // Document Ready
    const [abortControllerWalletItem, setAbortControllerWalletItem] = useState<AbortController | null>(null);
    const fetchWalletData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(abortControllerWalletItem instanceof AbortController){
            abortControllerWalletItem.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerWalletDialog(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.wallet.v1.show', uuid)}?action=${action}`, {
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
        const walletDialogEditAction = (event: any) => {
            console.log('Listen to Dialog Planned Payment Edit Event');
            
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchWalletData(uuid, 'edit').then((data: WalletItem) => {
                    console.log(data);

                    // Update State
                    setValueWalletUuid(data.uuid)
                    setValueWalletName(data.name);
                    setValueWalletParent(data.parent ? data.parent.uuid : '');
                    setValueWalletStartingBalance(data.starting_balance ? data.starting_balance : 0);

                    // Update Combobox Label
                    if(data.parent){
                        setWalletComboboxLabel(`${data.parent ? `${data.parent.name} - ` : ''}${data.name}`);
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
        document.addEventListener('wallet.edit-action', walletDialogEditAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('wallet.edit-action', walletDialogEditAction);
        };
    }, []);

    return (
        <section id={ `walletDialog-section` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" h-full md:h-auto lg:min-w-[800px] max-md:!max-h-[85vh] p-0" data-type="record-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ valueWalletUuid ? `Edit` : `Add new` } Wallet</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleWalletDialogSubmit} id={ `walletDialog-forms` } className={ ` overflow-auto border-t border-b max-h-screen md:max-h-[50vh] p-6` }>
                        {/* From Wallet */}
                        <div className={ ` form--group  ${errorWalletDialog?.parent ? ` is--invalid` : ''}` } id={ `record_dialog-parent` }>
                            <label className={ ` form--label` }>From</label>
                            <div>
                                <Popover open={openWalletParent} onOpenChange={setOpenWalletParent}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openWalletParent}
                                            className={ `w-full justify-between ${errorWalletDialog?.parent ? ` !border-red-500` : ''} dark:text-white` }
                                        >
                                            <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{parentComboboxLabel}</span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                        <Command shouldFilter={ false }>
                                            <CommandInput placeholder="Search wallet" className={ ` border-none focus:ring-0` } value={parentComboboxInput} onValueChange={setWalletComboboxInput}/>
                                            
                                            <ScrollArea className="p-0">
                                                <div className={ `max-h-[10rem]` }>
                                                    <CommandEmpty>{parentComboboxLoad ? `Loading...` : `No wallet found.`}</CommandEmpty>
                                                    <CommandGroup>
                                                        {parentComboboxList.map((options: WalletItem) => (
                                                            <CommandItem
                                                                value={options?.uuid}
                                                                key={options?.uuid}
                                                                onSelect={(currentValue) => {
                                                                    setValueWalletParent(currentValue === valueWalletParent ? "" : currentValue)
                                                                    setOpenWalletParent(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={ `mr-2 h-4 w-4 ${valueWalletParent === options?.uuid ? "opacity-100" : "opacity-0"}`}
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

                                <ErrorMessage message={ errorWalletDialog?.parent }/>
                            </div>
                        </div>
                        
                        {/* Name */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Name</label>
                            <Input value={ valueWalletName } onChange={(e) => setValueWalletName(e.target.value)} placeholder={ `Wallet Name` } className={ `${errorWalletDialog?.name ? ` !border-red-500` : ''}` }/>
                                
                            <ErrorMessage message={ errorWalletDialog?.name }/>
                        </div>

                        {/* Starting Balance */}
                        <div className={ ` form--group  ${errorWalletDialog?.starting_balance ? ` is--invalid` : ''}` } id={ `wallet_dialog-starting_balance` }>
                            <label className={ `form--label` }>Starting Balance</label>
                            <MaskedInput
                                type={ `text` }
                                placeholder={ `Starting Balance` }
                                inputMode={ `numeric` }
                                value={ (valueWalletStartingBalance ?? 0).toString() }
                                className={ `${errorWalletDialog?.starting_balance ? ` !border-red-500` : ''}` }
                                mask={ Number }
                                unmask={ true }
                                thousandsSeparator={ `,` }
                                scale={ 2 }
                                radix={ `.` }
                                onBlur={ (element) => {
                                    let value = (element.target as HTMLInputElement).value;
                                    value = value.replaceAll(',', '');

                                    setValueWalletStartingBalance(Number(value));
                                } }
                            />

                            <ErrorMessage message={ errorWalletDialog?.starting_balance }/>
                        </div>

                        {/* Keep open Planned Payment dialog? */}
                        <div className={ `form-group` }>
                            <div className={ `flex items-center space-x-2` }>
                                <Checkbox id="record_dialog-keep_open" checked={ keepOpenWalletDialog } onCheckedChange={(value) => {
                                    if(typeof value === 'boolean'){
                                        setKeepOpenWalletDialog(value);
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
                    </form>
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetWalletDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('walletDialog-forms')){
                                (document.getElementById('walletDialog-forms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='plannedPayment_dialog-submit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}