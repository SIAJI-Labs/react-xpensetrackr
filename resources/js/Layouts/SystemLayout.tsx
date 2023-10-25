import { useState, PropsWithChildren, ReactNode, useEffect, useMemo } from 'react';
import { format } from "date-fns"
import { CategoryItem, User } from '@/types';

// Script
import '../function';
import { ucwords } from '../function';
// Plugins
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import '../../plugins/fontawesome/all.scss';
import { IMaskMixin } from 'react-imask'

// Partials
import Navbar from './Partials/Navbar';

// Shadcn
import { ThemeProvider } from '@/Components/template/theme-provider';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Textarea } from '@/Components/ui/textarea';
import { Calendar } from '@/Components/ui/calendar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function System({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {   
    // extend style component
    const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
        <Input
            {...props}
            ref={inputRef} // bind internal input
        />
    ));

    // Record Dialog
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(false);
    useEffect(() => {
        console.log(openRecordDialog);
    }, ['openRecordDialog']);
    const frameworks = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
    ];
    // Record Type
    const [valueRecordType, setValueRecordType] = useState<string>('expense');
    // Category Combobox
    const [openRecordCategory, setOpenRecordCategory] = useState<boolean>(false);
    const [valueRecordCategory, setValueRecordCategory] = useState<string>("");
    const [categoryComboboxLabel, setCategoryComboboxLabel] = useState<string>("Select an option");
    const [categoryComboboxList, setCategoryComboboxList] = useState<string[] | any>([]);
    const [categoryComboboxInput, setCategoryComboboxInput] = useState<string>("");
    const [categoryComboboxLoad, setCategoryComboboxLoad] = useState<boolean>(false);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setCategoryComboboxLoad(true);

        try {
            // Build parameter
            const query = [];
            const obj = {
                keyword: keyword
            }
            for (const key in obj) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
            }

            const req = await fetch(`${route('api.category.v1.list')}?${query.join('&')}`, {
                signal: abortController.signal
            });
            const response = await req.json();

            return response.result.data;
        } catch (error) {
            // Handle errors, if needed
            console.error('Request error:', error);
            throw error;
        }

        return [];
    }
    const [categoryAbortController, setCategoryAbortController] = useState<AbortController | null>(null);
    let categoryComboboxTimeout: any;
    useEffect(() => {
        clearTimeout(categoryComboboxTimeout);
        setCategoryComboboxList([]);

        if(openRecordCategory){
            if (categoryAbortController) {
                // If there is an ongoing request, abort it before making a new one.
                categoryAbortController.abort();
            }
    
            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setCategoryAbortController(newAbortController);
    
            categoryComboboxTimeout = setTimeout(() => {
                fetchCategoryList(categoryComboboxInput, newAbortController)
                    .then((data: string[] = []) => {
                        setCategoryComboboxLoad(false);
                        if(data){
                            setCategoryComboboxList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);
    
            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (categoryAbortController) {
                    categoryAbortController.abort();
                }
            };
        }
    }, [categoryComboboxInput, openRecordCategory]);
    useEffect(() => {
        if(valueRecordCategory !== '' && categoryComboboxList.length > 0){
            const selected: CategoryItem | undefined = categoryComboboxList.find(
                (options: CategoryItem) => options?.uuid === valueRecordCategory
            ) as CategoryItem | undefined;

            if (selected) {
                setCategoryComboboxLabel(`${selected.parent ? `${selected.parent.name} - ` : ''}${selected.name}`);
            }
        } else {
            setCategoryComboboxLabel(`Select an option`);
        }
    }, [valueRecordCategory]);

    // From Wallet Combobox
    const [openRecordFromWallet, setOpenRecordFromWallet] = useState<boolean>(false);
    const [valueRecordFromWallet, setValueRecordFromWallet] = useState<string>("");
    // To Wallet Combobox
    const [openRecordToWallet, setOpenRecordToWallet] = useState<boolean>(false);
    const [valueRecordToWallet, setValueRecordToWallet] = useState<string>("");
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
    // Datepickr
    const [valueRecordDate, setValueRecordDate] = useState<Date>();

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 relative">
                {/* Navbar */}
                <Navbar
                    user={user}
                ></Navbar>

                {/* {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )} */}

                <div className={ ` flex justify-center p-6` }>
                    <main className={ ` max-w-[400px] lg:min-w-[400px] py-[calc(64px)]` }>{children}</main>
                </div>

                {/* Record Modal */}
                <Button variant="outline" className={ ` fixed right-4 bottom-4` } onClick={() => {
                    setOpenRecordDialog(true);
                }}>Add record</Button>
                {/* Record Modal - Dialog */}
                <Dialog open={openRecordDialog} onOpenChange={setOpenRecordDialog}>
                    <DialogContent className=" h-full lg:min-w-[800px] md:max-h-[85vh] p-0" data-type="record-dialog">
                        <DialogHeader className={ ` p-6 pb-2` }>
                            <DialogTitle>Add new Record</DialogTitle>
                        </DialogHeader>

                        <div className={ ` overflow-auto border-t border-b ` }>
                            <div className={ ` flex gap-0 lg:gap-6 flex-col lg:flex-row px-6` }>
                                {/* Left */}
                                <div className={ `py-6 w-full lg:w-3/5` }>
                                    {/* Record Type */}
                                    <div className={ ` flex flex-row gap-4 w-full border p-1 rounded-md form--group` }>
                                        {(() => {
                                            let recordType: any[] = [];
                                            ['income', 'transfer', 'expense'].map((value, index) => {
                                                recordType.push(
                                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ valueRecordType === value ? `bg-gray-200 hover:bg-gray-200` : null} hover:bg-gray-100 transition` } onClick={() => {
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

                                    {/* Category */}
                                    <div className={ ` form--group` }>
                                        <label className={ ` form--label` }>Category</label>
                                        <div>
                                            <Popover open={openRecordCategory} onOpenChange={setOpenRecordCategory}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openRecordCategory}
                                                        className=" w-full justify-between"
                                                    >
                                                        <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{categoryComboboxLabel}</span>
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                                    <Command shouldFilter={ false }>
                                                        <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={categoryComboboxInput} onValueChange={setCategoryComboboxInput}/>
                                                        <CommandEmpty>{categoryComboboxLoad ? `Loading...` : `No category found.`}</CommandEmpty>
                                                        <CommandGroup>
                                                            {categoryComboboxList.map((options: CategoryItem) => (
                                                                <CommandItem
                                                                    value={options?.uuid}
                                                                    key={options?.uuid}
                                                                    onSelect={(currentValue) => {
                                                                        setValueRecordCategory(currentValue === valueRecordCategory ? "" : currentValue)
                                                                        setOpenRecordCategory(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${valueRecordCategory === options?.uuid ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.parent ? `${options.parent.name} - ` : ''}${options?.name}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    {/* From Wallet */}
                                    <div className={ ` form--group` }>
                                        <label className={ ` form--label` }>From</label>
                                        <div>
                                            <Popover open={openRecordFromWallet} onOpenChange={setOpenRecordFromWallet}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openRecordFromWallet}
                                                        className=" w-full justify-between"
                                                    >
                                                        <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{valueRecordFromWallet
                                                            ? frameworks.find((framework) => framework.value === valueRecordCategory)?.label
                                                            : "Select an option"}</span>
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className=" w-[200px] lg:w-[400px] p-0" align={ `start` }>
                                                    <Command>
                                                        <CommandInput placeholder="Search framework..." className={ ` border-none focus:ring-0` }/>
                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {frameworks.map((framework) => (
                                                                <CommandItem
                                                                    key={framework.value}
                                                                    onSelect={(currentValue) => {
                                                                        setValueRecordFromWallet(currentValue === valueRecordFromWallet ? "" : currentValue)
                                                                        setOpenRecordFromWallet(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${valueRecordFromWallet === framework.value ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    {framework.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    {/* To Wallet */}
                                    {(() => {
                                        if(valueRecordType === 'transfer'){
                                            return <div className={ ` form--group` }>
                                                <label className={ ` form--label` }>To</label>
                                                <div>
                                                    <Popover open={openRecordToWallet} onOpenChange={setOpenRecordToWallet}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={openRecordToWallet}
                                                                className=" w-full justify-between"
                                                            >
                                                                <span className={ ` whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light` }>{valueRecordToWallet
                                                                    ? frameworks.find((framework) => framework.value === valueRecordCategory)?.label
                                                                    : "Select an option"}</span>
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className=" w-[200px] lg:w-[400px] p-0" align={ `start` }>
                                                            <Command>
                                                                <CommandInput placeholder="Search framework..." className={ ` border-none focus:ring-0` }/>
                                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {frameworks.map((framework) => (
                                                                        <CommandItem
                                                                            key={framework.value}
                                                                            onSelect={(currentValue) => {
                                                                                setValueRecordToWallet(currentValue === valueRecordToWallet ? "" : currentValue)
                                                                                setOpenRecordToWallet(false)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={ `mr-2 h-4 w-4 ${valueRecordToWallet === framework.value ? "opacity-100" : "opacity-0"}`}
                                                                            />
                                                                            {framework.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        }

                                        return <></>;
                                    })()}

                                    {/* Amount */}
                                    <div className={ ` form--group` }>
                                        <label className={ `form--label` }>Amount</label>
                                        <MaskedInput
                                            type={ `text` }
                                            placeholder={ `Amount` }
                                            inputMode={ `numeric` }
                                            value={ (valueRecordAmount ?? 0).toString() }
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
                                    </div>

                                    {/* Extra & Final Amount */}
                                    <div className={ ` flex flex-row gap-4 w-full` }>
                                        {/* Extra Amount */}
                                        <div className={ ` form--group !mb-0 w-1/2` }>
                                            <label className={ ` form--label` }>Extra</label>
                                            <div className={ ` flex flex-col gap-1` }>
                                                <MaskedInput
                                                    type={ `text` }
                                                    placeholder={ `Extra Amount` }
                                                    inputMode={ `numeric` }
                                                    value={ (valueRecordExtraAmount ?? 0).toString() }
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
                                                <div>
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
                                        <div className={ ` form--group !mb-0 w-1/2` }>
                                            <label className={ ` form--label` }>Final</label>
                                            <MaskedInput
                                                type={ `text` }
                                                placeholder={ `Final Amount` }
                                                inputMode={ `numeric` }
                                                value={ (valueRecordFinalAmount ?? 0).toString() }
                                                mask={ Number }
                                                unmask={ true }
                                                thousandsSeparator={ `,` }
                                                scale={ 2 }
                                                radix={ `.` }
                                                disabled={ true }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className={ ` py-6 lg:p-6 lg:pr-0 w-full lg:w-2/5 lg:border-l lg:border-t-0 border-t dark:bg-gray-700/30` }>
                                    {/* Timestamp */}
                                    <div className={ ` form--group` }>
                                        <label className={ ` form--label` }>Timestamp</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={ ` w-full justify-start text-left font-normal ${!valueRecordDate && "text-muted-foreground"}`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {valueRecordDate ? format(valueRecordDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={valueRecordDate}
                                                    onSelect={setValueRecordDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        {/* Timepickr */}
                                        <div className={ ` flex flex-row gap-4 mt-2 items-center` }>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Hours" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="h-40 p-0">
                                                        {(() => {
                                                            let hours: any[] = [];
                                                            for(let i = 0; i < 24; i++){
                                                                hours.push(
                                                                    <SelectItem value={ i.toString() } key={ `hours-${i}` }>{ i.toString().padStart(2, '0') }</SelectItem>
                                                                );
                                                            }

                                                            if(hours.length > 0){
                                                                return hours;
                                                            }

                                                            return <></>;
                                                        })()}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                            <span>:</span>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Minutes" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                <ScrollArea className="h-40 p-0">
                                                        {(() => {
                                                            let hours: any[] = [];
                                                            for(let i = 0; i <= 59; i++){
                                                                hours.push(
                                                                    <SelectItem value={ i.toString() } key={ `hours-${i}` }>{ i.toString().padStart(2, '0') }</SelectItem>
                                                                );
                                                            }

                                                            if(hours.length > 0){
                                                                return hours;
                                                            }

                                                            return <></>;
                                                        })()}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Record Note */}
                                    <div className={ ` form--group` }>
                                        <label className={ ` form--label` }>Note</label>
                                        <Textarea className={ ` w-full` } placeholder="Type your message here." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className={ ` p-6 pt-2` }>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
