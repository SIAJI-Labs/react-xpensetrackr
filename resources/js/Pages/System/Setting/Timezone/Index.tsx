import { FormEventHandler, useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
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

type ContentProps = {
    server: string,
    preference: string,
    list: Timezone[]
}
export default function Setting({ auth, server, preference, list }: PageProps<ContentProps>) {
    // Form Variable
    const [formTimezone, setFormTimezone] = useState<string | undefined>(preference);

    // Form Reset
    const resetForm = () => {
        // Planned Payment
        setFormTimezone(preference);
    };
    // Form Action
    const [errorForm, setErrorForm] = useState<{ [key: string]: string[] }>({});
    const [formAbortController, setAbortControllerRecord] = useState<AbortController | null>(null);
    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('timezone-submit');
        if(submitBtn){
            if(submitBtn.tagName.toLowerCase() === 'button'){
                submitBtn.setAttribute('disabled', 'disabled');
            }
            submitBtn.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
        }
        // Reset error bag
        setErrorForm({});

        // Cancel previous request
        if(formAbortController instanceof AbortController){
            formAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setAbortControllerRecord(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('action', 'timezone-preference');
        formData.append('timezone', formTimezone ?? '');

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
                router.reload({
                    only: ['server', 'preference']
                });
            }
        }).catch((response) => {
            const axiosError = response as AxiosError;

            let errors:any = axiosError.response?.data;
            if(errors.errors){
                // Store to the error bag variable
                setErrorForm(errors.errors);
            }

            // Set a timeout to perform an action after a delay (e.g., 100 milliseconds)
            setTimeout(() => {
                // Find all elements with the class 'form--group' that are marked as 'is--invalid'
                const errorElements = document.querySelectorAll('#preference-timezone .form--group.is--invalid');
        
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
            setAbortControllerRecord(null);
        
            // Update to original state
            let submitBtn = document.getElementById('timezone-submit');
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'button') {
                    submitBtn.removeAttribute('disabled');
                }
                submitBtn.innerHTML = `Submit`;
            }
        });
    }

    const [comboboxOpenState, setComboboxOpenState] = useState<boolean>(false);
    const [time, setTime] = useState<Date>(new Date);
    useEffect(() => {
        setInterval(() => {
            setTime(new Date);
        }, 1000);
    });

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Timezone</h2>}
        >
            <Head title="Timezone" />

            <div className="flex flex-col gap-6">
                <BackButton className={ `px-0` }/>
            </div>

            <Card>
                <CardContent className={ ` p-6` }>
                    <form onSubmit={handleFormSubmit} id={ `preference-timezone` } className={ ` flex flex-col gap-4` }>
                        <div className={ ` p-4 rounded bg-gray-100 flex flex-col gap-2` }>
                            <div className={ ` flex flex-col gap-1 leading-tight` }>
                                <span className={ ` font-medium` }>Server time ({ server })</span>
                                <span className={ ` leading-none` }>{ moment(time).tz(server).format('Do MMM, YYYY / HH:mm:ss') }</span>
                            </div>

                            <div className={ ` flex flex-col gap-1 leading-tight` }>
                                <span className={ ` font-medium` }>Your time ({ preference })</span>
                                <span className={ ` leading-none` }>{ moment(time).tz(preference).format('Do MMM, YYYY / HH:mm:ss') }</span>
                            </div>
                        </div>

                        <div className={ ` flex flex-col gap-2` }>
                            <div className={ ` form--group` }>
                                <label className={ ` form--label` }>Select your Timezone</label>
                                <div>
                                    <Popover open={ comboboxOpenState } onOpenChange={ setComboboxOpenState }>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ `w-full justify-between ${errorForm?.timezone ? ` !border-red-500` : ''} dark:text-white` }
                                            >
                                                <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{ formTimezone && formTimezone !== '' ? formTimezone : 'Select Timezone' }</span>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                            <Command>
                                                <CommandInput placeholder="Search Timezone" className={ ` border-none focus:ring-0` }/>
                                                
                                                <ScrollArea className="p-0">
                                                    <div className={ `max-h-[10rem]` }>
                                                        <CommandEmpty>No timezone found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {list.map((options: Timezone) => (
                                                                
                                                                <CommandItem
                                                                    value={options?.tzCode}
                                                                    key={options?.tzCode}
                                                                    onSelect={(currentValue) => {
                                                                        setFormTimezone(options.tzCode === formTimezone ? undefined : options.tzCode);

                                                                        setComboboxOpenState(false);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${formTimezone === options?.tzCode ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.tzCode}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <ErrorMessage message={ errorForm?.timezone }/>
                                </div>
                            </div>

                            <div className={ ` flex flex-row gap-2 justify-end` }>
                                <Button type={ `button` } variant={ `outline` } onClick={() => {
                                    resetForm();
                                }} disabled={ formTimezone === preference }>Reset</Button>
                                <Button type={ `button` } onClick={() => {
                                    if(document.getElementById('preference-timezone')){
                                        (document.getElementById('preference-timezone') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                    }
                                }} id='timezone-submit' disabled={ formTimezone === preference }>Submit</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </SystemLayout>
    );
}