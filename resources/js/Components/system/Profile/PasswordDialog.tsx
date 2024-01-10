import { FormEventHandler, useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { PageProps } from "@/types";

// Plugins
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";

// Partials
import ErrorMessage from "@/Components/forms/ErrorMessage";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
};

export default function ProfilePasswordDialog({ auth, openState, setOpenState }: PageProps<dialogProps>){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Handle Field Tyle
    type FieldStateType = {
        current: string,
        password: string,
        confirmation: string
    };
    const [fieldState, setFieldState] = useState<FieldStateType>({
        current: 'password', 
        password: 'password', 
        confirmation: 'password', 
    });
    const toggleFieldType = (fieldName: string, state?: 'text' | 'password') => {
        setFieldState((prevState: any) => ({
            ...prevState,
            [fieldName]: state ? state : prevState[fieldName] === 'text' ? 'password' : 'text'
        }));
    };

    // Form
    const [formCurrentPassword, setFormCurrentPassword] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');
    const [formPasswordConfirmation, setFormPasswordConfirmation] = useState<string>('');
    // Category Dialog - Forms
    const resetFormDialog = () => {
        setFormCurrentPassword('');
        setFormPassword('');
        setFormPasswordConfirmation('');
        ['current', 'password', 'confirmation'].map((value: any) => {
            toggleFieldType(value, 'password');
        });

        // Reset Form Error Bag
        setErrorFormDialog({});
    }
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setFormDialogAbortController] = useState<AbortController | null>(null);
    const handleFormSubmit: FormEventHandler = (e) => {
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('profilePassword-dialogSubmit');
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
        formData.append('_method', 'PUT');
        formData.append('password', formPassword);
        formData.append('password_confirmation', formPasswordConfirmation);
        formData.append('current_password', formCurrentPassword);

        // Adjust route target
        let actionRoute = route('api.profile.v1.update.password', auth.user.uuid);
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
                    // Hide dialog
                    setOpenState(false);
            
                    toast("Action: Success", {
                        description: "Password successfully updated",
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
                const errorElements = document.querySelectorAll('#profilePassword-dialogForms .form--group.is--invalid');
        
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
            let submitBtn = document.getElementById('profilePassword-dialogSubmit');
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
            document.dispatchEvent(new CustomEvent('dialog.profile-password.shown', { bubbles: true }));
        } else {
            resetFormDialog();

            // Announce Dialog Global Event
            document.dispatchEvent(new CustomEvent('dialog.profile-password.hidden', { bubbles: true }));
        }
    }, [openState]);

    // Document Ready
    useEffect(() => {
        // Listen to Edit Action
        const editAction = (event: any) => {
            if(event?.detail?.uuid){
                let uuid = event.detail.uuid;
            } else {
                setOpenState(true);
            }
        }
        document.addEventListener('profile-password.edit-action', editAction);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('profile-password.edit-action', editAction);
        };
    }, []);

    const formContent = <>
        <RemoveScroll className={ `overflow-auto border-t border-b ${isDesktop ? `max-h-screen md:max-h-[50vh]` : ``}` }>
            <form onSubmit={handleFormSubmit} id={ `profilePassword-dialogForms` } className={ ` flex-1 overflow-hidden p-6` }>
                {/* Current Password */}
                <div className={ `form--group ${errorFormDialog?.current_password ? ` is--invalid` : ''}` }>
                    <label className={ `form--label` }>Current Password</label>
                    <div className={ `relative` }>
                        <Input type={ fieldState.current } value={ formCurrentPassword } id={ `form-current_password` } onChange={(e) => setFormCurrentPassword(e.target.value)} placeholder={ `Current Password` } className={ `${errorFormDialog?.current_password ? ` !border-red-500` : ''}` }/>
                        
                        <div className={ ` absolute right-4 top-1/2 -translate-y-1/2` }>
                            <span
                                id="current_password-password_icon"
                                className={ ` fa-solid ${fieldState.current === 'password' ? `fa-eye` : `fa-eye-slash`} cursor-pointer` }
                                onClick={() => {
                                    toggleFieldType('current');
                                }}></span>
                        </div>
                    </div>
                        
                    <ErrorMessage message={ errorFormDialog?.current_password }/>
                </div>

                {/* Password */}
                <div className={ `form--group ${errorFormDialog?.password ? ` is--invalid` : ''}` }>
                    <label className={ `form--label` }>Password</label>
                    <div className={ `relative` }>
                        <Input type={ fieldState.password } value={ formPassword } id={ `form-password` } onChange={(e) => setFormPassword(e.target.value)} placeholder={ `New Password` } className={ `${errorFormDialog?.password ? ` !border-red-500` : ''}` }/>
                        
                        <div className={ ` absolute right-4 top-1/2 -translate-y-1/2` }>
                            <span
                                id="password-password_icon"
                                className={ ` fa-solid ${fieldState.password === 'password' ? `fa-eye` : `fa-eye-slash`} cursor-pointer` }
                                onClick={() => {
                                    toggleFieldType('password');
                                }}></span>
                        </div>
                    </div>
                        
                    <ErrorMessage message={ errorFormDialog?.password }/>
                </div>

                {/* Password Confirmation */}
                <div className={ `form--group !mb-0 ${errorFormDialog?.password_confirmation ? ` is--invalid` : ''}` }>
                    <label className={ `form--label` }>Password Confirmation</label>
                    <div className={ `relative` }>
                        <Input type={ fieldState.confirmation } value={ formPasswordConfirmation } id={ `form-password_confirmation` } onChange={(e) => setFormPasswordConfirmation(e.target.value)} placeholder={ `Re-type new Password to Confirm` } className={ `${errorFormDialog?.password_confirmation ? ` !border-red-500` : ''}` }/>
                        
                        <div className={ ` absolute right-4 top-1/2 -translate-y-1/2` }>
                            <span
                                id="password_confirmation-password_icon"
                                className={ ` fa-solid ${fieldState.confirmation === 'password' ? `fa-eye` : `fa-eye-slash`} cursor-pointer` }
                                onClick={() => {
                                    toggleFieldType('confirmation');
                                }}></span>
                        </div>
                    </div>
                        
                    <ErrorMessage message={ errorFormDialog?.password_confirmation }/>
                </div>
            </form>
        </RemoveScroll>
    </>;

    if(!isDesktop){
        return (
            <section id={ `profilePassword-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState}>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>Update Password</DrawerTitle>
                        </DrawerHeader>

                        {formContent}

                        <DrawerFooter className="pt-2">
                            <Button type='button' onClick={() => {
                                if(document.getElementById('profilePassword-dialogForms')){
                                    (document.getElementById('profilePassword-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='profilePassword-dialogSubmit'>Submit</Button>
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
        <section id={ `profilePassword-dialogSection` }>
            <Dialog open={openState} onOpenChange={setOpenState}>
                <DialogContent className=" flex flex-col h-auto max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 lg:min-w-[400px] p-0" data-type="profilePassword-dialog">
                    <DialogHeader className={ ` p-6 pb-2` }>
                        <DialogTitle className={ ` dark:text-white` }>Update Password</DialogTitle>
                    </DialogHeader>

                    { formContent }

                    <DialogFooter className={ ` p-6 pt-2` }>
                        <Button variant={ `ghost` } onClick={() => {
                            resetFormDialog();
                        }}>
                            <span>Reset</span>
                        </Button>
                        <Button type='button' onClick={() => {
                            if(document.getElementById('profilePassword-dialogForms')){
                                (document.getElementById('profilePassword-dialogForms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                            }
                        }} id='profilePassword-dialogSubmit'>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}