import { FormEventHandler, useEffect, useState } from "react";
import { WalletGroupItem, WalletItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import axios, { AxiosError } from "axios";

// Plugins
import { Check } from "lucide-react";
import { RemoveScroll } from "react-remove-scroll";

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

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function WalletGroupDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Form
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    const [formWallet, setFormWallet] = useState<string[] | any[]>([]);
    // Keep Dialog Open?
    const [keepOpenDialog, setKeepOpenWalletDialog] = useState<boolean>(false);

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

    // Wallet Dialog - Forms
    const resetFormDialog = () => {
        setFormUuid('');
        setFormName('');
        setFormWallet([]);

        setErrorFormDialog({});
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setAbortControllerRecordDialog] = useState<AbortController | null>(null);
    const handleWalletDialogSubmit: FormEventHandler = (e) => {
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('walletGroup-dialogSubmit');
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
        formData.append('name', formName);
        if(formWallet.length > 0){
            formWallet.forEach((value, index) => {
                formData.append('wallet[]', value);
            });
        }

        if(formUuid){
            formData.append('wallet_group_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.wallet-group.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.wallet-group.v1.update', formUuid);
        }

        // Make request call
        axios.post(actionRoute, formData, {
            signal: abortController.signal
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
                        description: "Wallet Group data successfully saved",
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
                const errorElements = document.querySelectorAll('#walletGroup-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('walletGroup-dialogSubmit');
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
        if(!isFirstRender){
            setTimeout(() => {
                // Reset error bag
                setErrorFormDialog({});

                // Abort Dialog request
                if(formDialogAbortController instanceof AbortController){
                    formDialogAbortController.abort();
                }
                // Abort Detail request
                if(walletGroupFetchAbortController instanceof AbortController){
                    walletGroupFetchAbortController.abort();
                }
                // Abort Wallet List request
                if(comboboxWalletAbortController instanceof AbortController){
                    comboboxWalletAbortController.abort();
                }

                if(openState){
                    document.dispatchEvent(new CustomEvent('dialog.wallet-group.shown', { bubbles: true }));
                } else {
                    resetFormDialog();
                    setKeepOpenWalletDialog(false);

                    // Announce Dialog Global Event
                    document.dispatchEvent(new CustomEvent('dialog.wallet-group.hidden', { bubbles: true }))
                }
            }, 100);
        }
    }, [openState]);

    // Document Ready
    const [walletGroupFetchAbortController, setWalletGroupFetchAbortController] = useState<AbortController | null>(null);
    const fetchWalletGroupData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(walletGroupFetchAbortController instanceof AbortController){
            walletGroupFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletGroupFetchAbortController(abortController);
        
        // Fetch
        try {
            const response = await axios.get(`${route('api.wallet-group.v1.show', uuid)}?action=${action}`, {
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

                // Fetch Data
                fetchWalletGroupData(uuid, 'edit').then((data: WalletGroupItem) => {
                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);

                    // Handle group item
                    if(data.wallet_group_item && data.wallet_group_item.length > 0){
                        let uuid: any[] = [];
                        let name: any[] = [];
                        (data.wallet_group_item).forEach((value, index) => {
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
        document.addEventListener('wallet-group.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('wallet-group.edit-action', editAction);
        };
    }, []);

    const formContent = <>
        <RemoveScroll className={ `overflow-auto border-t border-b ${isDesktop ? `max-h-screen md:max-h-[50vh]` : ``}` }>
            <form onSubmit={handleWalletDialogSubmit} id={ `walletGroup-dialogForms` } className={ ` flex-1 overflow-hidden p-6` }>
                {/* Name */}
                <div className={ `form--group` }>
                    <label className={ `form--label` }>Name</label>
                    <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Group Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''}` }/>
                        
                    <ErrorMessage message={ errorFormDialog?.name }/>
                </div>

                {/* Wallet */}
                <div className={ ` form--group ${errorFormDialog?.wallet ? ` is--invalid` : ''}` } id={ `record_dialog-wallet` }>
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

                {/* Keep open Wallet dialog? */}
                <div className={ `form-group` }>
                    <div className={ `flex items-center space-x-2` }>
                        <Checkbox id="record_dialog-keep_open" checked={ keepOpenDialog } onCheckedChange={(value) => {
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
        </RemoveScroll>
    </>;

    if(!isDesktop){
        return (
            <section id={ `walletGroup-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>{ formUuid ? `Edit` : `Add new` } Wallet</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

                        <DrawerFooter className="pt-2">
                            <Button type='button' onClick={() => {
                                if(document.getElementById('walletGroup-dialogForms')){
                                    (document.getElementById('walletGroup-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='walletGroup-dialogSubmit'>Submit</Button>
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
        <section id={ `walletGroup-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="wallet_group-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Wallet Group</DialogTitle>
                    </DialogHeader>

                    { formContent }
                    
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('walletGroup-dialogForms')){
                                (document.getElementById('walletGroup-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='walletGroup-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}