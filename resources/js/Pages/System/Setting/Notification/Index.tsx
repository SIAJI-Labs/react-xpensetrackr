import { FormEventHandler, useEffect, useState } from "react";
import { PageProps, Timezone } from "@/types";

// Plugins
import { Check, ChevronsUpDown } from "lucide-react";
import axios, { AxiosError } from "axios";
import moment from "moment-timezone";

// Partials
import BackButton from "@/Components/template/TemplateBackButton";
import ErrorMessage from "@/Components/forms/ErrorMessage";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/Components/ui/form";
import { Head } from "@inertiajs/react";
import { Switch } from "@/Components/ui/switch";
import { useIsFirstRender } from "@/lib/utils";

type ContentProps = {
    notificationState: boolean,
    notificationPlannedPaymentState: boolean,
    notificationPlannedPaymentTime: string | null,
    notificationPendingRecordState: boolean
    notificationPendingRecordTime: string | null,
}

export default function Notification({ 
    auth, 
    notificationState, 
    notificationPlannedPaymentState, notificationPlannedPaymentTime, 
    notificationPendingRecordState, notificationPendingRecordTime
}: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();

    // Form Field
    const [formNotificationState, setFormNotificationState] = useState<boolean>(notificationState);
    const [formPlannedPaymentState, setFormPlannedPaymentState] = useState<boolean>(notificationPlannedPaymentState);
    const [formPlannedPaymentTime, setFormPlannedPaymentTime] = useState<string | null | undefined>(notificationPlannedPaymentTime);
    const [formPendingRecordState, setFormPendingRecordState] = useState<boolean>(notificationPendingRecordState);
    const [formPendingRecordTime, setFormPendingRecordTime] = useState<string | null | undefined>(notificationPendingRecordTime);

    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formDialogAbortController, setFormDialogAbortController] = useState<AbortController | null>(null);
    const preferenceRequest = (formData: FormData) => {
        console.log(formData);
        // Cancel previous request
        if(formDialogAbortController instanceof AbortController){
            formDialogAbortController.abort();
        }

        // Reset error bag
        setErrorFormDialog({});

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setFormDialogAbortController(abortController);

        formData.append('_method', 'PUT');
        formData.append('action', 'notification-preference');
        // Adjust route target
        let actionRoute = route('api.profile.v1.update', auth.user.uuid);
        // Make request call
        axios.post(actionRoute, formData, {
            cancelToken: new axios.CancelToken(function executor(c) {
                // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                abortController.abort = c;
            })
        }).then((response) => {
            if (response.status === 200) {
                // router.reload({
                //     only: ['server', 'preference']
                // });
            }
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
                const errorElements = document.querySelectorAll('#preference-notification .form--group.is--invalid');
        
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
        });
    };

    useEffect(() => {
        if(!isFirstRender){
            let formData = new FormData;
            formData.append('state', 'notification');
            formData.append('state_value', formNotificationState.toString());

            preferenceRequest(formData);
        }
    }, [formNotificationState]);
    useEffect(() => {
        if(!formPlannedPaymentState){
            setFormPlannedPaymentTime(undefined);
        }

        if(!isFirstRender){
            let formData = new FormData;
            formData.append('state', 'notification_plannedPayment');
            formData.append('state_value', formPlannedPaymentState.toString());
            
            preferenceRequest(formData);
        }
    }, [formPlannedPaymentState]);
    useEffect(() => {
        if(!isFirstRender && formPlannedPaymentState){
            let formData = new FormData;
            formData.append('state', 'time_plannedPayment');
            formData.append('state_value', formPlannedPaymentTime && formPlannedPaymentTime !== null ? formPlannedPaymentTime.toString() : '');
            
            preferenceRequest(formData);
        }
    }, [formPlannedPaymentTime]);

    useEffect(() => {
        if(!formPlannedPaymentState){
            setFormPendingRecordTime(undefined);
        }

        if(!isFirstRender){
            let formData = new FormData;
            formData.append('state', 'notification_pendingRecord');
            formData.append('state_value', formPendingRecordState.toString());
            
            preferenceRequest(formData);
        }
    }, [formPendingRecordState]);
    useEffect(() => {
        if(!isFirstRender && formPendingRecordState){
            let formData = new FormData;
            formData.append('state', 'time_pendingRecord');
            formData.append('state_value', formPendingRecordTime && formPendingRecordTime !== null ? formPendingRecordTime.toString() : '');
            
            preferenceRequest(formData);
        }
    }, [formPendingRecordTime]);

    // Combobox
    const [comboboxPlannedPaymentTimestampOpenState, setComboboxPlannedPaymentTimestampOpenState] = useState<boolean>(false);
    const [comboboxPendingRecordTimestampOpenState, setComboboxPendingRecordTimestampOpenState] = useState<boolean>(false);

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notification</h2>}
        >
            <Head title="Notification" />

            <div className="flex flex-col gap-6">
                <BackButton className={ `px-0` }/>
            </div>

            <Card id={ `preference-notification` }>
                <CardContent className={ ` flex flex-col gap-6 p-6` }>
                    <div className={ `flex flex-row items-center justify-between rounded-lg border p-4` }>
                        <div className={ ` flex flex-col gap-1 space-y-0.5 leading-none` }>
                            <label className={ `text-base font-medium leading-tight` }>Receive notification</label>
                            <span className={ ` text-sm leading-none` }>Receive push notification</span>
                        </div>
                        <Switch
                            checked={ formNotificationState }
                            onCheckedChange={(checked) => {
                                setFormNotificationState(checked);
                            }}
                        />
                    </div>

                    <fieldset className={ ` ${ formNotificationState ? `` : ` opacity-50` } flex flex-col gap-4` } disabled={ !formNotificationState }>
                        <div className={ ` flex flex-col gap-4 border p-4 rounded-lg` }>
                            <div className={ `flex flex-col gap-2 ` }>
                                <div className={ ` flex flex-row items-center justify-between` }>
                                    <label className={ `text-base font-medium leading-tight` }>Planned Payment</label>
                                    <Switch checked={ formPlannedPaymentState } onCheckedChange={(checked) => {
                                        setFormPlannedPaymentState(checked);
                                    }}/>
                                </div>
                                <span className={ ` text-sm leading-none` }>Reminde me about my upcoming, today, and overdue scheduled payment</span>
                            </div>

                            {/* Planned Payment timestamp */}
                            <fieldset className={ ` border-t pt-2` } disabled={ !formPlannedPaymentState }>
                                <div className={ ` flex flex-row justify-between items-center` }>
                                    <label className={ ` w-full` }>Receive notification at</label>

                                    <div className={ `w-full form--group !mb-0` } id={ `record_dialog-hours` }>
                                        <Popover open={ comboboxPlannedPaymentTimestampOpenState } onOpenChange={ setComboboxPlannedPaymentTimestampOpenState }>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={ `w-full justify-between dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{ formPlannedPaymentTime && formPlannedPaymentTime !== null ? formPlannedPaymentTime : `Select Timestamp` }</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[175px] lg:w-[400px] p-0" align={ `end` }>
                                                <Command>
                                                    <CommandInput placeholder="Search Timestamp" className={ ` border-none focus:ring-0` }/>
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>No timestamp found</CommandEmpty>
                                                            <CommandGroup>
                                                                {(() => {
                                                                    let items: any = [];
                                                                    let start = moment(`${moment().format('YYYY-MM-DD')} 00:00:00`);

                                                                    do {
                                                                        let formated = moment(start).format('HH:mm').toString();
                                                                        items.push(
                                                                            <CommandItem
                                                                                key={ `planned_timestamp-${formated}` }
                                                                                value={ formated }
                                                                                onSelect={(currentValue) => {
                                                                                    setFormPlannedPaymentTime(formated);
                                                                                    setComboboxPlannedPaymentTimestampOpenState(false);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={ `mr-2 h-4 w-4 ${ formPlannedPaymentTime === formated ? `opacity-100` : `opacity-0`} `}
                                                                                />
                                                                                { formated }
                                                                            </CommandItem>
                                                                        );

                                                                        start = moment(start).add(15, 'minutes');
                                                                    } while(moment(start).format('YYYY-MM-DD').toString() === moment().format('YYYY-MM-DD').toString());
                                                                    
                                                                    if(items.length > 0){
                                                                        return items;
                                                                    }
                                                                    return <></>;
                                                                })()}
                                                            </CommandGroup>
                                                        </div>
                                                    </ScrollArea>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className={ ` flex flex-col gap-4 border p-4 rounded-lg` }>
                            <div className={ `flex flex-col gap-2 ` }>
                                <div className={ ` flex flex-row items-center justify-between` }>
                                    <label className={ `text-base font-medium leading-tight` }>Pending Record</label>

                                    <Switch checked={ formPendingRecordState } onCheckedChange={(checked) => {
                                        setFormPendingRecordState(checked);
                                    }}/>
                                </div>
                                <span className={ ` text-sm leading-none` }>Reminde me about my pending record</span>
                            </div>

                            {/* Pending Record timestamp */}
                            <fieldset className={ ` border-t pt-2` } disabled={ !formPendingRecordState }>
                                <div className={ ` flex flex-row justify-between items-center` }>
                                    <label className={ ` w-full` }>Receive notification at</label>

                                    <div className={ `w-full form--group !mb-0` } id={ `record_dialog-hours` }>
                                        <Popover open={ comboboxPendingRecordTimestampOpenState } onOpenChange={ setComboboxPendingRecordTimestampOpenState }>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={ `w-full justify-between dark:text-white` }
                                                >
                                                    <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{ formPendingRecordTime && formPendingRecordTime !== null ? formPendingRecordTime : `Select Timestamp` }</span>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[175px] lg:w-[400px] p-0" align={ `end` }>
                                                <Command>
                                                    <CommandInput placeholder="Search Timestamp" className={ ` border-none focus:ring-0` }/>
                                                    <ScrollArea className="p-0">
                                                        <div className={ `max-h-[10rem]` }>
                                                            <CommandEmpty>No timestamp found</CommandEmpty>
                                                            <CommandGroup>
                                                                {(() => {
                                                                    let items: any = [];
                                                                    let start = moment(`${moment().format('YYYY-MM-DD')} 00:00:00`);

                                                                    do {
                                                                        let formated = moment(start).format('HH:mm').toString();
                                                                        items.push(
                                                                            <CommandItem
                                                                                key={ `pendingRecord_timestamp-${formated}` }
                                                                                value={ formated }
                                                                                onSelect={(currentValue) => {
                                                                                    setFormPendingRecordTime(formated);
                                                                                    setComboboxPendingRecordTimestampOpenState(false);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={ `mr-2 h-4 w-4 ${ formPendingRecordTime === formated ? `opacity-100` : `opacity-0`} `}
                                                                                />
                                                                                { formated }
                                                                            </CommandItem>
                                                                        );

                                                                        start = moment(start).add(15, 'minutes');
                                                                    } while(moment(start).format('YYYY-MM-DD').toString() === moment().format('YYYY-MM-DD').toString());
                                                                    
                                                                    if(items.length > 0){
                                                                        return items;
                                                                    }
                                                                    return <></>;
                                                                })()}
                                                            </CommandGroup>
                                                        </div>
                                                    </ScrollArea>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </fieldset>
                </CardContent>
            </Card>
        </SystemLayout>
    );
}