import { FormEventHandler, useEffect, useState } from "react";
import { WalletShareItem, WalletItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import axios, { AxiosError } from "axios";

// Plugins
import { CalendarIcon, Check } from "lucide-react";
import { RemoveScroll } from "react-remove-scroll";
import { format } from "date-fns";
import moment from "moment";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";
import { Calendar } from "@/Components/ui/calendar";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function WalletShareDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Calendar
    const [calendarOpenState, setCalendarOpenState] = useState<boolean>(false);

    // Form
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    const [formHasPassphrase, setFormHasPassphrase] = useState<boolean>(false);
    const [formPassphrase, setFormPassphrase] = useState<string>('');
    const [formNotes, setFormNotes] = useState<string>('');
    const [formWallet, setFormWallet] = useState<string[] | any[]>([]);
    const [formHasValidUntil, setFormHasValidUntil] = useState<boolean>(false);
    const [formValidUntil, setFormValidUntil] = useState<Date>();
    const [formOldValidUntil, setFormOldValidUntil] = useState<Date>();
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenWalletDialog] = useState<boolean>(false);

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
        setComboboxWalletList([]);

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

    // Wallet Dialog - Forms
    const resetFormDialog = () => {
        setFormUuid('');
        setFormName('');
        setFormHasPassphrase(false);
        setFormPassphrase('');
        setFormWallet([]);
        setFormHasValidUntil(false);
        setFormValidUntil(undefined);
        setFormOldValidUntil(undefined);

        setErrorFormDialog({});
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setDialogAbortController] = useState<AbortController | null>(null);
    const handleWalletDialogSubmit: FormEventHandler = (e) => {
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('walletShare-dialogSubmit');
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
        setDialogAbortController(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('name', formName);
        formData.append('note', formNotes);
        formData.append('has_passphrase', String(formHasPassphrase));
        if(formHasPassphrase && formPassphrase){
            formData.append('passphrase', formPassphrase);
        }
        if(formHasValidUntil && formValidUntil){
            formData.append('valid_until', moment(formValidUntil).format('YYYY-MM-DD'));
        }
        if(formWallet.length > 0){
            formWallet.forEach((value, index) => {
                formData.append('wallet[]', value);
            });
        }

        if(formUuid){
            formData.append('wallet_share_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.wallet-share.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.wallet-share.v1.update', formUuid);
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
                        description: "Wallet Share data successfully saved",
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
                const errorElements = document.querySelectorAll('#walletShare-dialogForms .form--group.is--invalid');
        
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
            setDialogAbortController(null);
        
            // Update to original state
            let submitBtn = document.getElementById('walletShare-dialogSubmit');
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
        if(openState){
            document.dispatchEvent(new CustomEvent('dialog.wallet-share.shown', { bubbles: true }));
        } else {
            resetFormDialog();
            setKeepOpenWalletDialog(false);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.wallet-share.hidden', { bubbles: true }))
        }
    }, [openState]);

    // Document Ready
    const [walletShareFetchAbortController, setWalletShareFetchAbortController] = useState<AbortController | null>(null);
    const fetchWalletShareData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(walletShareFetchAbortController instanceof AbortController){
            walletShareFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletShareFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.wallet-share.v1.show', uuid)}?action=${action}`, {
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
                fetchWalletShareData(uuid, 'edit').then((data: WalletShareItem) => {
                    // Update State
                    setFormUuid(data.uuid);
                    setFormName(data.name);
                    setFormNotes(data.note ?? '');
                    setFormHasPassphrase(data.passphrase ? true : false);
                    if(data.valid_until){
                        setFormHasValidUntil(true);
                        setFormValidUntil(moment(data.valid_until).toDate());
                        setFormOldValidUntil(moment(data.valid_until).toDate());
                    }

                    // Handle share item
                    if(data.wallet_share_item && data.wallet_share_item.length > 0){
                        let uuid: any[] = [];
                        let name: any[] = [];
                        (data.wallet_share_item).forEach((value, index) => {
                            uuid.push(value.uuid);
                            name.push(value.name);
                        });
                        setFormWallet(uuid);
                        setComboboxWalletLabel(name);
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
        document.addEventListener('wallet-share.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('wallet-share.edit-action', editAction);
        };
    }, []);

    const formContent = <>
        <RemoveScroll className={ `overflow-auto border-t border-b ${isDesktop ? `max-h-screen md:max-h-[50vh]` : ``}` }>
            <form onSubmit={handleWalletDialogSubmit} id={ `walletShare-dialogForms` } className={ ` flex-1 overflow-hidden p-6` }>
                {/* Name */}
                <div className={ `form--group` }>
                    <label className={ `form--label` }>Name</label>
                    <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Share Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                        
                    <ErrorMessage message={ errorFormDialog?.name }/>
                </div>

                {/* Passphrase */}
                <div className={ `form--group group` }>
                    <label className={ `form--label` }>Passphrase</label>
                    <div className={ ` flex flex-row gap-2 border ${errorFormDialog?.passphrase ? ` !border-red-500` : ''} rounded-md has-[:focus-visible]:border-[#2563eb] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2` }>
                        <div className={ ` flex items-center pl-4` }>
                            <Checkbox id="wshare_dialog-has_passphrase" checked={ formHasPassphrase } onCheckedChange={(value) => {
                                if(typeof value === 'boolean'){
                                    setFormHasPassphrase(value);

                                    if(!value){
                                        // Has Passphrase set to false
                                        setFormPassphrase('');
                                    }
                                }
                            }} />
                        </div>

                        <Input value={ formPassphrase } onChange={(e) => setFormPassphrase(e.target.value)} placeholder={ `Share Passphrase` } className={ `border-0 focus-visible:ring-0 focus-visible:ring-offset-0` } disabled={ !formHasPassphrase }/>
                    </div>
                        
                    <ErrorMessage message={ errorFormDialog?.passphrase }/>
                </div>

                {/* Wallet */}
                <div className={ ` form--group ${errorFormDialog?.wallet ? ` is--invalid` : ''}` } id={ `wshare_dialog-wallet` }>
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
                                                            <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ options?.name }</span>
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

                {/* Note */}
                <div className={ ` form--group  ${errorFormDialog?.notes ? ` is--invalid` : ''}` } id={ `wshare_dialog-note` }>
                    <label className={ ` form--label` }>Note</label>
                    <Textarea className={ ` w-full ${errorFormDialog?.notes ? ` !border-red-500` : ''}` } placeholder="Keep note for your self (Only visible to you)" value={ formNotes } onChange={(e) => {
                        setFormNotes(e.target.value);
                    }}/>
                
                    <ErrorMessage message={ errorFormDialog?.notes }/>
                </div>

                {/* Valid Until */}
                <div className={ ` form--group` }>
                    <div id={ `wshare_dialog-date` } className={ ` form--group !mb-0 ${errorFormDialog?.valid_until ? ` is--invalid` : ''}` }>
                        <label className={ ` form--label` }>Valid until</label>
                        <Popover open={ calendarOpenState } onOpenChange={ setCalendarOpenState }>
                            <div className={ ` flex flex-row gap-4 border ${errorFormDialog?.valid_until ? ` !border-red-500` : ''} rounded-md has-[:focus-visible]:border-[#2563eb] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2` }>
                                <div className={ ` flex items-center pl-4` }>
                                    <Checkbox id="wshare_dialog-has_valid_until" checked={ formHasValidUntil } onCheckedChange={(value) => {
                                        if(typeof value === 'boolean'){
                                            setFormHasValidUntil(value);

                                            if(!value){
                                                // Has Valid Until set to false
                                                setFormValidUntil(undefined);
                                            }
                                        }
                                    }} />
                                </div>

                                <PopoverTrigger asChild>
                                    <Button
                                        type={ `button` }
                                        variant={ `outline` }
                                        className={ ` w-full justify-start border-0 hover:bg-transparent pl-0 text-left font-normal ${!formValidUntil && "text-muted-foreground"} dark:text-white`}
                                        disabled={ !formHasValidUntil }
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formValidUntil ? format(formValidUntil, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                            </div>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formValidUntil}
                                    onSelect={(val) => {
                                        setFormValidUntil(val);
                                        setCalendarOpenState(false);
                                    }}
                                    defaultMonth={formValidUntil}
                                    disabled={(date) =>
                                        formUuid && formOldValidUntil && moment(moment(formOldValidUntil).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD')) ? moment(moment(date).format('YYYY-MM-DD')) < moment(moment(formOldValidUntil).format('YYYY-MM-DD')) : moment(moment(date).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD'))
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <ErrorMessage message={ errorFormDialog?.date }/>
                    </div>
                </div>

                {/* Keep open Wallet dialog? */}
                <div className={ `form-share` }>
                    <div className={ `flex items-center space-x-2` }>
                        <Checkbox id="wshare_dialog-keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
                            if(typeof value === 'boolean'){
                                setKeepOpenWalletDialog(value);
                            }
                        }} />
                        <label
                            htmlFor="wshare_dialog-keep_open"
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
            <section id={ `walletShare-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>{ formUuid ? `Edit` : `Add new` } Wallet</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

                        <DrawerFooter className="pt-2">
                            <Button type='button' onClick={() => {
                                if(document.getElementById('walletShare-dialogForms')){
                                    (document.getElementById('walletShare-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='walletShare-dialogSubmit'>Submit</Button>
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
        <section id={ `walletShare-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="wallet_share-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Wallet Share</DialogTitle>
                    </DialogHeader>

                    { formContent }
                    
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('walletShare-dialogForms')){
                                (document.getElementById('walletShare-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='walletShare-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}