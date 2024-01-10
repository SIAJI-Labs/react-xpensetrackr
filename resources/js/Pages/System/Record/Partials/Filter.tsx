import { useEffect, useState } from 'react';

// Plugins
import { ucwords } from '@/function';

// Shadcn Component
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { CategoryItem, TagsItem, WalletItem } from '@/types';
import { Check } from 'lucide-react';
import axios from 'axios';
import { useMediaQuery } from 'usehooks-ts';
import { RemoveScroll } from 'react-remove-scroll';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/Components/ui/drawer';

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;

    // Filter Status
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    // Filter From Wallet
    filterFromWallet: any[],
    setFilterFromWallet: (wallet: string[]) => void;
    // Filter To Wallet
    filterToWallet: any[],
    setFilterToWallet: (wallet: string[]) => void;
    // Filter Category
    filterCategory: any[],
    setFilterCategory: (category: string[]) => void;
    // Filter Tags
    filterTags: any[],
    setFilterTags: (tags: string[]) => void;
};

export default function Filter({ 
    openState, setOpenState,

    filterStatus, setFilterStatus,
    filterFromWallet = [], setFilterFromWallet,
    filterToWallet = [], setFilterToWallet,
    filterCategory = [], setFilterCategory,
    filterTags = [], setFilterTags,
}: dialogProps){
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Combobox - FromWallet
    let comboboxFromWalletTimeout: any;
    const [comboboxFromWalletOpenState, setComboboxFromWalletOpenState] = useState<boolean>(false);
    const [comboboxFromWalletLabel, setComboboxFromWalletLabel] = useState<string[] | any[]>([]);
    const [comboboxFromWalletList, setComboboxFromWalletList] = useState<string[] | any>([]);
    const [comboboxFromWalletInput, setComboboxFromWalletInput] = useState<string>("");
    const [comboboxFromWalletLoadState, setComboboxFromWalletLoadState] = useState<boolean>(false);
    const [comboboxFromWalletAbort, setComboboxFromWalletAbort] = useState<AbortController | null>(null);
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
            if (comboboxFromWalletAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxFromWalletAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxFromWalletAbort(newAbortController);

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
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxFromWalletAbort) {
                    comboboxFromWalletAbort.abort();
                }
            };
        }
    }, [comboboxFromWalletInput, comboboxFromWalletOpenState]);
    useEffect(() => {
        setComboboxFromWalletInput('')
    }, [comboboxFromWalletOpenState]);

    // Combobox - ToWallet
    let comboboxToWalletTimeout: any;
    const [comboboxToWalletOpenState, setComboboxToWalletOpenState] = useState<boolean>(false);
    const [comboboxToWalletLabel, setComboboxToWalletLabel] = useState<string[] | any[]>([]);
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
        setComboboxToWalletInput('')
    }, [comboboxToWalletOpenState]);

    // Combobox - Category
    let comboboxCategoryTimeout: any;
    const [comboboxCategoryOpenState, setComboboxCategoryOpenState] = useState<boolean>(false);
    const [comboboxCategoryLabel, setComboboxCategoryLabel] = useState<string[] | any[]>([]);
    const [comboboxCategoryList, setComboboxCategoryList] = useState<string[] | any>([]);
    const [comboboxCategoryInput, setComboboxCategoryInput] = useState<string>("");
    const [comboboxCategoryLoadState, setComboboxCategoryLoadState] = useState<boolean>(false);
    const [comboboxCategoryAbort, setComboboxCategoryAbort] = useState<AbortController | null>(null);
    const fetchCategoryList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxCategoryLoadState(true);

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
                const response = await axios.get(`${route('api.category.v1.list')}?${query.join('&')}`, {
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
        clearTimeout(comboboxCategoryTimeout);
        // setComboboxCategoryList([]);

        if(comboboxCategoryOpenState){
            if (comboboxCategoryAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxCategoryAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxCategoryAbort(newAbortController);

            comboboxCategoryTimeout = setTimeout(() => {
                fetchCategoryList(comboboxCategoryInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxCategoryLoadState(false);
                        if(data){
                            setComboboxCategoryList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxCategoryAbort) {
                    comboboxCategoryAbort.abort();
                }
            };
        }
    }, [comboboxCategoryInput, comboboxCategoryOpenState]);
    useEffect(() => {
        setComboboxCategoryInput('')
    }, [comboboxCategoryOpenState]);

    // Combobox - Tags
    let comboboxTagsTimeout: any;
    const [comboboxTagsOpenState, setComboboxTagsOpenState] = useState<boolean>(false);
    const [comboboxTagsLabel, setComboboxTagsLabel] = useState<string[] | any[]>([]);
    const [comboboxTagsList, setComboboxTagsList] = useState<string[] | any>([]);
    const [comboboxTagsInput, setComboboxTagsInput] = useState<string>("");
    const [comboboxTagsLoadState, setComboboxTagsLoadState] = useState<boolean>(false);
    const [comboboxTagsAbort, setComboboxTagsAbort] = useState<AbortController | null>(null);
    const fetchTagsList = async (keyword: string, abortController: AbortController): Promise<string[]> => {
        setComboboxTagsLoadState(true);

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
                const response = await axios.get(`${route('api.tags.v1.list')}?${query.join('&')}`, {
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
        clearTimeout(comboboxTagsTimeout);
        // setComboboxTagsList([]);

        if(comboboxTagsOpenState){
            if (comboboxTagsAbort) {
                // If there is an ongoing request, abort it before making a new one.
                comboboxTagsAbort.abort();
            }

            // Create a new AbortController for the new request.
            const newAbortController = new AbortController();
            setComboboxTagsAbort(newAbortController);

            comboboxTagsTimeout = setTimeout(() => {
                fetchTagsList(comboboxTagsInput, newAbortController)
                    .then((data: string[] = []) => {
                        setComboboxTagsLoadState(false);
                        if(data){
                            setComboboxTagsList(data);
                        }
                    })
                    .catch((error) => {
                        // Handle errors, if needed
                    });
            }, 500);

            return () => {
                // Cleanup: Abort the ongoing request and reset the AbortController when the component unmounts or when keyword changes.
                if (comboboxTagsAbort) {
                    comboboxTagsAbort.abort();
                }
            };
        }
    }, [comboboxTagsInput, comboboxTagsOpenState]);
    useEffect(() => {
        setComboboxTagsInput('')
    }, [comboboxTagsOpenState]);

    const dialogContent = <>
        <RemoveScroll className={ `overflow-auto ${isDesktop ? `max-h-screen max-lg:max-h-[50vh] lg:max-h-[65vh] border-b border-t` : ` border-t`}` }>
            <div className={ ` overflow-hidden p-6` }>
                <div className={ ` flex flex-col gap-6` }>
                    {/* Status Type */}
                    <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md` }>
                        {(() => {
                            let pageTypeEl: any[] = [];
                            ['complete', 'pending'].map((value, index) => {
                                pageTypeEl.push(
                                    <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ filterStatus === value ? `bg-primary ` : ` dark:!text-white !text-black hover:!text-primary-foreground`} text-primary-foreground hover:bg-primary/90 transition` } onClick={() => {
                                        setFilterStatus(value);
                                    }} key={ `record_type-${value}` }>
                                        <span className={ ` text-sm font-semibold` }>{ ucwords(value) }</span>
                                    </div>
                                );
                            });

                            if(pageTypeEl.length > 0){
                                return pageTypeEl;
                            }

                            return <></>;
                        })()}
                    </div>

                    <div className={ `` }>
                        {/* From Wallet */}
                        <div className={ ` form--group` } id={ `record_filter-from_wallet` }>
                            <label className={ ` form--label` }>From Wallet</label>
                            <div>
                                <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                    <Popover open={comboboxFromWalletOpenState} onOpenChange={setComboboxFromWalletOpenState}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                            >
                                                <i className={ `fa-solid fa-plus` }></i>
                                                <span>From Wallet</span>
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
                                                                        let selected = {
                                                                            uuid: currentValue,
                                                                            label: options.name
                                                                        };
                                                                        let fromWalletIndex = filterFromWallet.findIndex(fromWallet => fromWallet.uuid === options.uuid);
                                                                        if(filterFromWallet && fromWalletIndex !== -1){
                                                                            // Already exists, remove from array
                                                                            const updatedFormFromWallet = [...filterFromWallet];
                                                                            updatedFormFromWallet.splice(fromWalletIndex, 1);
                                                                            setFilterFromWallet(updatedFormFromWallet);
                                                                        } else {
                                                                            // Not yet exists, add to array
                                                                            setFilterFromWallet([...filterFromWallet, selected]);
                                                                            setComboboxFromWalletLabel([...comboboxFromWalletLabel, options?.name]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${filterFromWallet && filterFromWallet.some(fromWallet => 'uuid' in fromWallet && fromWallet.uuid === options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    {(() => {
                                        let selectedFromWallet: any = [];
                                        if(filterFromWallet.length > 0){
                                            filterFromWallet.forEach((value, index) => {
                                                let name = value.label;
                                                if(name){
                                                    selectedFromWallet.push(
                                                        <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_fromWallet-${value}` } onClick={() => {
                                                            let fromWalletIndex = filterFromWallet.findIndex(fromWallet => fromWallet.uuid === value.uuid);
                                                            if (fromWalletIndex !== -1) {
                                                                const updatedFormFromWallet = [...filterFromWallet];
                                                                updatedFormFromWallet.splice(fromWalletIndex, 1);
                                                                setFilterFromWallet(updatedFormFromWallet);
                                                            }
                                                        }}>
                                                            <span>{ name }</span>
                                                            <i className={ `fa-solid fa-xmark` }></i>
                                                        </Button>
                                                    );
                                                }
                                            });

                                            if(selectedFromWallet.length > 0){
                                                return selectedFromWallet;
                                            }
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* To Wallet */}
                        <div className={ ` form--group` } id={ `record_filter-to_wallet` }>
                            <label className={ ` form--label` }>To Wallet</label>
                            <div>
                                <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                    <Popover open={comboboxToWalletOpenState} onOpenChange={setComboboxToWalletOpenState}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                            >
                                                <i className={ `fa-solid fa-plus` }></i>
                                                <span>To Wallet</span>
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
                                                                        let selected = {
                                                                            uuid: currentValue,
                                                                            label: options.name
                                                                        };
                                                                        let toWalletIndex = filterToWallet.findIndex(toWallet => toWallet.uuid === options.uuid);
                                                                        if(filterToWallet && toWalletIndex !== -1){
                                                                            // Already exists, remove from array
                                                                            const updatedFormToWallet = [...filterToWallet];
                                                                            updatedFormToWallet.splice(toWalletIndex, 1);
                                                                            setFilterToWallet(updatedFormToWallet);
                                                                        } else {
                                                                            // Not yet exists, add to array
                                                                            setFilterToWallet([...filterToWallet, selected]);
                                                                            setComboboxToWalletLabel([...comboboxToWalletLabel, options?.name]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${filterToWallet && filterToWallet.some(toWallet => 'uuid' in toWallet && toWallet.uuid === options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    {(() => {
                                        let selectedToWallet: any = [];
                                        if(filterToWallet.length > 0){
                                            filterToWallet.forEach((value, index) => {
                                                let name = value.label;
                                                if(name){
                                                    selectedToWallet.push(
                                                        <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_toWallet-${value}` } onClick={() => {
                                                            let toWalletIndex = filterToWallet.findIndex(toWallet => toWallet.uuid === value.uuid);
                                                            if (toWalletIndex !== -1) {
                                                                const updatedFormToWallet = [...filterToWallet];
                                                                updatedFormToWallet.splice(toWalletIndex, 1);
                                                                setFilterToWallet(updatedFormToWallet);
                                                            }
                                                        }}>
                                                            <span>{ name }</span>
                                                            <i className={ `fa-solid fa-xmark` }></i>
                                                        </Button>
                                                    );
                                                }
                                            });

                                            if(selectedToWallet.length > 0){
                                                return selectedToWallet;
                                            }
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className={ ` form--group` } id={ `record_filter-category` }>
                            <label className={ ` form--label` }>Category</label>
                            <div>
                                <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                    <Popover open={comboboxCategoryOpenState} onOpenChange={setComboboxCategoryOpenState}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                            >
                                                <i className={ `fa-solid fa-plus` }></i>
                                                <span>Category</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                            <Command shouldFilter={ false }>
                                                <CommandInput placeholder="Search category" className={ ` border-none focus:ring-0` } value={comboboxCategoryInput} onValueChange={setComboboxCategoryInput}/>
                                                <ScrollArea className="p-0">
                                                    <div className={ `max-h-[10rem]` }>
                                                        <CommandEmpty>{comboboxCategoryLoadState ? `Loading...` : `No category found.`}</CommandEmpty>
                                                        <CommandGroup>
                                                            {comboboxCategoryList.map((options: CategoryItem) => (
                                                                <CommandItem
                                                                    value={options?.uuid}
                                                                    key={options?.uuid}
                                                                    onSelect={(currentValue) => {
                                                                        let selected = {
                                                                            uuid: currentValue,
                                                                            label: options.name
                                                                        };
                                                                        let categoryIndex = filterCategory.findIndex(category => category.uuid === options.uuid);
                                                                        if(filterCategory && categoryIndex !== -1){
                                                                            // Already exists, remove from array
                                                                            const updatedFormCategory = [...filterCategory];
                                                                            updatedFormCategory.splice(categoryIndex, 1);
                                                                            setFilterCategory(updatedFormCategory);
                                                                        } else {
                                                                            // Not yet exists, add to array
                                                                            setFilterCategory([...filterCategory, selected]);
                                                                            setComboboxCategoryLabel([...comboboxCategoryLabel, options?.name]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${filterCategory && filterCategory.some(category => 'uuid' in category && category.uuid === options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    {(() => {
                                        let selectedCategory: any = [];
                                        if(filterCategory.length > 0){
                                            filterCategory.forEach((value, index) => {
                                                let name = value.label;
                                                if(name){
                                                    selectedCategory.push(
                                                        <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_category-${value}` } onClick={() => {
                                                            let categoryIndex = filterCategory.findIndex(category => category.uuid === value.uuid);
                                                            if (categoryIndex !== -1) {
                                                                const updatedFormCategory = [...filterCategory];
                                                                updatedFormCategory.splice(categoryIndex, 1);
                                                                setFilterCategory(updatedFormCategory);
                                                            }
                                                        }}>
                                                            <span>{ name }</span>
                                                            <i className={ `fa-solid fa-xmark` }></i>
                                                        </Button>
                                                    );
                                                }
                                            });

                                            if(selectedCategory.length > 0){
                                                return selectedCategory;
                                            }
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className={ ` form--group !mb-0` } id={ `record_filter-tags` }>
                            <label className={ ` form--label` }>Tags</label>
                            <div>
                                <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                    <Popover open={comboboxTagsOpenState} onOpenChange={setComboboxTagsOpenState}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={ ` flex flex-row gap-1 leading-none p-2 h-auto text-xs` }
                                            >
                                                <i className={ `fa-solid fa-plus` }></i>
                                                <span>Tags</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[300px] lg:w-[400px] p-0" align={ `start` }>
                                            <Command shouldFilter={ false }>
                                                <CommandInput placeholder="Search tags" className={ ` border-none focus:ring-0` } value={comboboxTagsInput} onValueChange={setComboboxTagsInput}/>
                                                <ScrollArea className="p-0">
                                                    <div className={ `max-h-[10rem]` }>
                                                        <CommandEmpty>{comboboxTagsLoadState ? `Loading...` : `No tags found.`}</CommandEmpty>
                                                        <CommandGroup>
                                                            {comboboxTagsList.map((options: TagsItem) => (
                                                                <CommandItem
                                                                    value={options?.uuid}
                                                                    key={options?.uuid}
                                                                    onSelect={(currentValue) => {
                                                                        let selected = {
                                                                            uuid: currentValue,
                                                                            label: options.name
                                                                        };
                                                                        let tagsIndex = filterTags.findIndex(tags => tags.uuid === options.uuid);
                                                                        if(filterTags && tagsIndex !== -1){
                                                                            // Already exists, remove from array
                                                                            const updatedFormTags = [...filterTags];
                                                                            updatedFormTags.splice(tagsIndex, 1);
                                                                            setFilterTags(updatedFormTags);
                                                                        } else {
                                                                            // Not yet exists, add to array
                                                                            setFilterTags([...filterTags, selected]);
                                                                            setComboboxTagsLabel([...comboboxTagsLabel, options?.name]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={ `mr-2 h-4 w-4 ${filterTags && filterTags.some(tags => 'uuid' in tags && tags.uuid === options?.uuid) ? "opacity-100" : "opacity-0"}`}
                                                                    />
                                                                    <span className={ ` w-full overflow-hidden whitespace-nowrap text-ellipsis` }>{ `${options?.name}` }</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </div>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    {(() => {
                                        let selectedTags: any = [];
                                        if(filterTags.length > 0){
                                            filterTags.forEach((value, index) => {
                                                let name = value.label;
                                                if(name){
                                                    selectedTags.push(
                                                        <Button variant={ `secondary` } className={ ` flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto` } key={ `selected_tags-${value}` } onClick={() => {
                                                            let tagsIndex = filterTags.findIndex(tags => tags.uuid === value.uuid);
                                                            if (tagsIndex !== -1) {
                                                                const updatedFormTags = [...filterTags];
                                                                updatedFormTags.splice(tagsIndex, 1);
                                                                setFilterTags(updatedFormTags);
                                                            }
                                                        }}>
                                                            <span>{ name }</span>
                                                            <i className={ `fa-solid fa-xmark` }></i>
                                                        </Button>
                                                    );
                                                }
                                            });

                                            if(selectedTags.length > 0){
                                                return selectedTags;
                                            }
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RemoveScroll>
    </>;

    // Drawer
    if(!isDesktop){
        return (
            <section id={ `record-dialogSection` }>
                <Drawer open={openState} onOpenChange={setOpenState} closeThreshold={ 0.3 }>
                    <DrawerTrigger asChild>
                        <Button variant={ (filterStatus === 'pending' || filterCategory.length > 0 || filterFromWallet.length > 0 || filterToWallet.length > 0 || filterTags.length > 0) ? `default` : `outline` } className={ ` w-10 aspect-square` }>
                            <i className={ `fa-solid fa-filter` }></i>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className={ ` max-h-dvh` }>
                        <DrawerHeader className="text-left">
                            <DrawerTitle className={ ` text-center` }>Filter</DrawerTitle>
                        </DrawerHeader>
                        
                        { dialogContent }

                        <DrawerFooter className={ ` border-t` }>
                        <Button variant={ `outline` } onClick={() => {
                            setFilterStatus('complete');
                            setFilterFromWallet([]);
                            setFilterToWallet([]);
                            setFilterCategory([]);
                            setFilterTags([]);
                        }}>Reset</Button>
                            <DrawerClose asChild>
                                <Button variant={ `ghost` }>
                                    <span>Close</span>
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>
        );
    }

    return (
        <Dialog open={ openState } onOpenChange={ setOpenState }>
            <DialogTrigger asChild>
                <Button variant={ (filterStatus === 'pending' || filterCategory.length > 0 || filterFromWallet.length > 0 || filterToWallet.length > 0 || filterTags.length > 0) ? `default` : `outline` } className={ ` w-10 aspect-square` }>
                    <i className={ `fa-solid fa-filter` }></i>
                </Button>
            </DialogTrigger>
            <DialogContent className=" flex flex-col h-auto lg:min-w-[60vw] max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 p-0" data-type="record_filter-dialog">
                <DialogHeader className={ ` p-6 pb-0` }>
                    <DialogTitle>Record: Filter</DialogTitle>
                    <DialogDescription>
                        <span>Show record data based on certain condition</span>
                    </DialogDescription>
                </DialogHeader>

                { dialogContent }

                <DialogFooter className={ ` p-6 pt-0` }>
                    <Button variant={ `outline` } onClick={() => {
                        setFilterStatus('complete');
                        setFilterFromWallet([]);
                        setFilterToWallet([]);
                        setFilterCategory([]);
                        setFilterTags([]);
                    }}>Reset</Button>
                    <Button variant={ `secondary` } onClick={() => {
                        setOpenState(false);
                    }}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}