import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { WalletItem } from "@/types";

// Plugins
import { IMaskMixin } from "react-imask";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";
import { Check, ChevronsUpDown } from "lucide-react";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useToast } from "@/Components/ui/use-toast";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function WalletBalanceAdjustmentDialog({ openState, setOpenState }: dialogProps){
    const isFirstRender = useIsFirstRender();
    const { toast } = useToast();

    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Form
    const [formParent, setFormParent] = useState<string>("");
    const [formUuid, setFormUuid] = useState<string>('');
    const [formName, setFormName] = useState<string>('');
    const [formCurrentBalance, setFormCurrentBalance] = useState<number>(0);
    const [formActualBalance, setFormActualBalance] = useState<number>(0);

    // Wallet Dialog - Forms
    const resetWalletDialog = (force: boolean = false) => {
        if(formUuid && !(force)){
            document.dispatchEvent(new CustomEvent('wallet.balance-adjustment.edit-action', {
                bubbles: true,
                detail: {
                    uuid: formUuid
                }
            }));
        } else {
            setFormUuid('');
            setFormName('');
            setFormCurrentBalance(0);
            setFormActualBalance(0);
        }

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
        let submitBtn = document.getElementById('walletBalanceAdjustment-dialogSubmit');
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
        formData.append('parent_id', formParent);
        formData.append('name', formName);
        formData.append('current_balance', formCurrentBalance.toString());
        formData.append('actual_balance', formActualBalance.toString());

        if(formUuid){
            formData.append('wallet_uuid', formUuid);
        }

        // Adjust route target
        let actionRoute = route('api.wallet.balance-adjustment.v1.store');
        if(formUuid){
            formData.append('_method', 'PUT');
            actionRoute = route('api.wallet.balance-adjustment.v1.update', formUuid);
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
                console.log(responseJson);
            
                if (responseJson?.code === 200) {
                    // Close dialog
                    setOpenState(false);
            
                    toast({
                        title: "Action: Success",
                        description: "Wallet Balance data successfully updated",
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
                const errorElements = document.querySelectorAll('#walletBalanceAdjustment-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('walletBalanceAdjustment-dialogSubmit');
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
            // Set focus to actual balance
            setTimeout(() => {
                if(document.getElementById('wallet_dialog-actual_balance') && document.getElementById('wallet_dialog-actual_balance')?.querySelector('input')){
                    console.log(document.getElementById('wallet_dialog-actual_balance')?.querySelector('input'));
                    document.getElementById('wallet_dialog-actual_balance')?.querySelector('input')?.focus();
                }
            }, 100);

            document.dispatchEvent(new CustomEvent('dialog.wallet.balance-adjustment.shown', { bubbles: true }));
        } else {
            resetWalletDialog(true);

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.wallet.balance-adjustment.hidden', { bubbles: true }));
        }
    }, [openState]);
    

    // Document Ready
    const [walletFetchAbortController, setWalletFetchAbortController] = useState<AbortController | null>(null);
    const fetchWalletData = async (uuid: string, action: string = 'detail') => {
        // Cancel previous request
        if(walletFetchAbortController instanceof AbortController){
            walletFetchAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletFetchAbortController(abortController);
        
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
        const editAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;

                // Fetch Data
                fetchWalletData(uuid, 'edit').then((data: WalletItem) => {
                    // Update State
                    setFormUuid(data.uuid)
                    setFormName(data.name);
                    setFormParent(data.parent ? data.parent.uuid : '');
                    setFormCurrentBalance(data.current_balance ? data.current_balance : 0);
                    setFormActualBalance(data.current_balance ? data.current_balance : 0);

                    // Open wallet-dialog
                    setTimeout(() => {
                        setOpenState(true);
                    }, 100);
                });
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('wallet.balance-adjustment.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('wallet.balance-adjustment.edit-action', editAction);
        };
    }, []);

    return (
        <section id={ `walletBalanceAdjustment-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" h-full md:h-auto lg:min-w-[800px] max-md:!max-h-[85vh] p-0" data-type="wallet-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>{ formUuid ? `Edit` : `Add new` } Wallet: Balance Adjustment</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleWalletDialogSubmit} id={ `walletBalanceAdjustment-dialogForms` } className={ ` overflow-auto border-t border-b max-h-screen md:max-h-[50vh] p-6` }>
                        {/* Name */}
                        <div className={ `form--group` }>
                            <label className={ `form--label` }>Name</label>
                            <Input value={ formName } onChange={(e) => setFormName(e.target.value)} placeholder={ `Wallet Name` } className={ `${errorFormDialog?.name ? ` !border-red-500` : ''} read-only:bg-gray-100 read-only:cursor-not-allowed` } readOnly/>
                                
                            <ErrorMessage message={ errorFormDialog?.name }/>
                        </div>

                        {/* Current Balance */}
                        <div className={ ` form--group  ${errorFormDialog?.current_balance ? ` is--invalid` : ''}` } id={ `wallet_dialog-current_balance` }>
                            <label className={ `form--label` }>Current Balance</label>
                            <MaskedInput
                                type={ `text` }
                                placeholder={ `Starting Balance` }
                                inputMode={ `numeric` }
                                value={ (formCurrentBalance ?? 0).toString() }
                                className={ `${errorFormDialog?.current_balance ? ` !border-red-500` : ''} read-only:bg-gray-100 read-only:cursor-not-allowed` }
                                mask={ Number }
                                unmask={ true }
                                thousandsSeparator={ `,` }
                                scale={ 2 }
                                radix={ `.` }
                                onBlur={ (element) => {
                                    let value = (element.target as HTMLInputElement).value;
                                    value = value.replaceAll(',', '');

                                    setFormCurrentBalance(Number(value));
                                } }
                                readOnly
                            />

                            <ErrorMessage message={ errorFormDialog?.current_balance }/>
                        </div>

                        {/* Actual Balance */}
                        <div className={ ` form--group  ${errorFormDialog?.actual_balance ? ` is--invalid` : ''}` } id={ `wallet_dialog-actual_balance` }>
                            <label className={ `form--label` }>Actual Balance</label>
                            <MaskedInput
                                type={ `text` }
                                placeholder={ `Starting Balance` }
                                inputMode={ `numeric` }
                                value={ (formActualBalance ?? 0).toString() }
                                className={ `${errorFormDialog?.actual_balance ? ` !border-red-500` : ''} read-only:bg-gray-100 read-only:cursor-not-allowed` }
                                mask={ Number }
                                unmask={ true }
                                thousandsSeparator={ `,` }
                                scale={ 2 }
                                radix={ `.` }
                                onBlur={ (element) => {
                                    let value = (element.target as HTMLInputElement).value;
                                    value = value.replaceAll(',', '');

                                    setFormActualBalance(Number(value));
                                } }
                            />

                            <ErrorMessage message={ errorFormDialog?.actual_balance }/>
                        </div>
                    </form>
                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetWalletDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('walletBalanceAdjustment-dialogForms')){
                                (document.getElementById('walletBalanceAdjustment-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='walletBalance_dialog-submit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}