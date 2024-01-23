import { RecordItem, WalletShareItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useIsFirstRender } from '@/lib/utils';
import axios, { AxiosError } from 'axios';

// Plugins
import { formatRupiah, momentFormated, ucwords } from '@/function';
import { FormEventHandler, useEffect, useState } from 'react';
import moment from 'moment';

// Partials
import TemplateList from '@/Components/template-public/Record/TemplateList';
import WalletTemplate from "@/Components/template/Wallet/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
import ErrorMessage from '@/Components/forms/ErrorMessage';
import PublicLayout from '@/Layouts/PublicLayout';

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { toast } from "sonner";

export default function WalletShare({
    is_found,
    valid_until,
    has_passphrase,
    data
}: {
    is_found: boolean,
    valid_until: string,
    has_passphrase: boolean,
    data: WalletShareItem
}) {
    const isFirstRender = useIsFirstRender();
    
    // Handle Field Tyle
    type FieldStateType = {
        passphrase: string,
    };
    const [fieldTypeState, setFieldTypeState] = useState<FieldStateType>({
        passphrase: 'password', 
    });
    const toggleFieldType = (fieldName: string, state?: 'text' | 'password') => {
        setFieldTypeState((prevState: any) => ({
            ...prevState,
            [fieldName]: state ? state : prevState[fieldName] === 'text' ? 'password' : 'text'
        }));
    };
    // Passphrase
    const [formPassphrase, setFormPassphrase] = useState<string>('');
    // Form Action
    const [errorFormDialog, setErrorFormDialog] = useState<{ [key: string]: string[] }>({});
    const [formAbortController, setFormAbortController] = useState<AbortController | null>(null);
    const handleFormSubmit: FormEventHandler = (e) => {
        // Cancel previous request
        if(formAbortController instanceof AbortController){
            formAbortController.abort();
        }

        e.preventDefault();
        // Update submit button to loading state
        let submitBtn = document.getElementById('passphrase-submit');
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
        setFormAbortController(abortController);

        // Build Form Data
        let formData = new FormData();
        formData.append('passphrase', formPassphrase);

        // Adjust route target
        let actionRoute = undefined;
        if(data && data.token){
            actionRoute = route('public.wallet-share.passphrase', {
                token: data.token
            });
        }

        if(actionRoute){
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
                        router.reload();
                        
                        toast("Action: Success", {
                            description: "Passphrase confirmed",
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
                    const errorElements = document.querySelectorAll('#walletShare-forms .form--group.is--invalid');

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
                setFormAbortController(null);

                // Update to original state
                let submitBtn = document.getElementById('passphrase-submit');
                if (submitBtn) {
                    if (submitBtn.tagName.toLowerCase() === 'button') {
                        submitBtn.removeAttribute('disabled');
                    }
                    submitBtn.innerHTML = `Submit`;
                }
            });
        }
    };

    // Record List - Template
    const recordListTemplate = (record: RecordItem) => {
        return <TemplateList record={record} token={ data.token ?? undefined }/>
    }
    // Record List - Skeleton
    let skeletonTemplate = <>
        <section>
            <div className={ ` flex flex-col gap-2 border rounded p-4` }>
                <div className={ ` flex flex-row justify-between` }>
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />

                    <div className={ ` flex flex-row gap-2` }>
                        <Skeleton className="w-[75px] h-[20px] rounded-full" />
                        <Skeleton className="w-[10px] h-[20px] rounded-full" />
                    </div>
                </div>

                <div className={ ` flex flex-row gap-4 items-center` }>
                    <div className={ `` }>
                        <Skeleton className="w-[50px] h-[50px] rounded-full" />
                    </div>
                    <div className={ ` flex flex-col gap-2` }>
                        <Skeleton className="w-[150px] h-[15px] rounded-full" />
                        <Skeleton className="w-[75px] h-[10px] rounded-full" />
                    </div>
                </div>

                <div className={ ` flex flex-row gap-4` }>
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                </div>
            </div>
        </section>
    </>;
    // Record List - Variable Init
    let paginate_item = 5;
    const [recordCountShown, setRecordCountShown] = useState<number>(0);
    const [recordCountTotal, setRecordCountTotal] = useState<number>(0);
    const [recordPaginate, setRecordPaginate] = useState<number>(paginate_item);
    const [recordPaginateState, setRecordPaginateState] = useState<boolean>(false);
    const [recordFilterKeyword, setRecordFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(data && is_found && !has_passphrase){
            fetchRecordList();
        }
    }, [recordPaginate]);
    useEffect(() => {
        if(data && is_found && !has_passphrase){
            fetchRecordList();
        }
    }, [data, has_passphrase, is_found]);
    const handleReloadData = () => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setRecordPaginate(paginate_item);
                fetchRecordList();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }
    useEffect(() => {
        handleReloadData();
    }, [recordFilterKeyword]);

    const [recordIsLoading, setRecordIsLoading] = useState<boolean>(true);
    const [recordSkeletonCount, setRecordSkeletonCount] = useState<number>(5);
    const [recordItem, setRecordItem] = useState([]);
    const [recordItemAbortController, setRecordItemAbortController] = useState<AbortController | null>(null);
    useEffect(() => {
        // Update skeleton count to match loaded record item
        setRecordSkeletonCount(recordItem.length > 0 ? recordItem.length : 3);
    }, [recordItem]);
    // Simulate API call
    const fetchRecordList = async () => {
        // Cancel previous request
        if(recordItemAbortController instanceof AbortController){
            recordItemAbortController.abort();
        }
        
        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setRecordItemAbortController(abortController);

        // Show skeleton
        setRecordIsLoading(true);

        // Build parameter
        const query = [];
        const obj = {
            limit: recordPaginate,
            keyword: recordFilterKeyword
        }
        // } as { [key: string]: any };
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('public.wallet-share.record', {
                'token': data.token
            })}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            // Apply to related property
            setRecordItem(jsonResponse.result.data);
            // Update load more state
            setRecordPaginateState(jsonResponse.result.has_more);
            // Update shown
            setRecordCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setRecordCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setRecordIsLoading(false);
            // setRefreshLoading(false);
            // Clear the AbortController from state
            setRecordItemAbortController(null);
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle the cancellation here if needed
                console.log('Request was canceled', error);
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }
    };

    const contentList: any = {
        not_found: <>
            <div className={ `w-screen h-screen flex justify-center items-center` }>
                <Card className={ ` min-w-[400px]` }>
                    <CardHeader>
                        <CardTitle>State: Data not Found</CardTitle>
                    </CardHeader>
                    <CardContent className={ `` }>
                        <span>Looks like you've taken a wrong turn! Double-check your URL or ask the owner for the correct one to access the shared data.</span>
                    </CardContent>
                </Card>
            </div>
        </>,
        expired: <>
            <div className={ `w-screen h-screen flex justify-center items-center` }>
                <Card className={ ` w-[400px]` }>
                    <CardHeader>
                        <CardTitle>State: Expired</CardTitle>
                    </CardHeader>
                    <CardContent className={ `` }>
                        <span>Time's up! Ask the owner for more time to access. Don't miss out – just request an extension!</span>
                    </CardContent>
                </Card>
            </div>
        </>,
        passphrase_form: <>
            <div className={ `h-screen flex justify-center items-center` }>
                <form onSubmit={handleFormSubmit} id={ `walletShare-forms` } className={ ` ` }>
                    <Card className={ ` w-[400px]` }>
                        <CardHeader>
                            <CardTitle>Passphrase required</CardTitle>
                            <CardDescription>To access the data, make sure to enter the correct passphrase</CardDescription>
                        </CardHeader>
                        <CardContent className={ `` }>
                            <div className={ `form--group ${errorFormDialog?.passphrase ? ` is--invalid` : ''}` }>
                                <div className={ `relative` }>
                                    <Input type={ fieldTypeState.passphrase } id={ `form-passphrase` } value={ formPassphrase } onChange={(e) => {setFormPassphrase(e.target.value)}} placeholder={ `Passphrase` } className={ `${errorFormDialog?.passphrase ? ` !border-red-500` : ''}` }/>
                                    
                                    <div className={ ` absolute right-4 top-1/2 -translate-y-1/2` }>
                                        <span
                                            id="passphrase-password_icon"
                                            className={ ` fa-solid ${fieldTypeState.passphrase === 'password' ? `fa-eye` : `fa-eye-slash`} cursor-pointer` }
                                            onClick={() => {
                                                toggleFieldType('passphrase');
                                            }}></span>
                                    </div>
                                </div>
                                    
                                <ErrorMessage message={ errorFormDialog?.passphrase }/>
                            </div>
                        </CardContent>
                        <CardFooter className={ ` flex justify-end` }>
                            <Button type={ `button` } variant={ `ghost` } onClick={() => {
                                toggleFieldType('passphrase', 'password');
                                setFormPassphrase('');
                            }}>
                                <span>Reset</span>
                            </Button>
                            <Button type={ `button` } onClick={() => {
                                if(document.getElementById('walletShare-forms')){
                                    (document.getElementById('walletShare-forms') as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true }))
                                }
                            }} id='passphrase-submit'>Submit</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>,
        main_content: <>
            <div className={ ` flex flex-col gap-6 pt-[25%] pb-10` }>
                <Card className={ ` w-full` }>
                    <CardHeader>
                        <CardTitle>{ data.name }</CardTitle>
                        {/* <CardDescription>To access the data, make sure to enter the correct passphrase</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <div className={ ` flex flex-col gap-4` }>
                            <div className={ ` flex flex-row justify-between` }>
                                <div className={ ` flex flex-col` }>
                                    <span>Balance</span>
                                    <span className={ `font-semibold` }>{ formatRupiah(data.balance ?? 0) }</span>
                                </div>
                            </div>

                            {/* Extra */}
                            {(() => {
                                let items = [];
                                if(data.passphrase){
                                    items.push(<Badge className={ ` flex flex-row gap-1` } key={ `items_passphrase-${data.uuid}` }>
                                        <i className={ `fa-solid fa-lock` }/>
                                        <span>Passphrase</span>
                                    </Badge>);
                                }
                                if(data.valid_until){
                                    items.push(<Badge variant={ moment(moment(data.valid_until).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD')) ? `destructive` : `default` } className={ ` flex flex-row gap-1` } key={ `items_deadline-${data.uuid}` }>
                                        <i className={ `fa-solid fa-clock` }/>
                                        <span>Valid until: {moment(data.valid_until).format('Do MMM, YYYY')}</span>
                                    </Badge>);
                                }
                                if(data.wallet_share_item && data.wallet_share_item?.length > 0){
                                    items.push(<Badge className={ ` flex flex-row gap-1` } key={ `items_wallet-${data.uuid}` }>
                                        <i className={ `fa-solid fa-wallet` }/>
                                        <span>{data.wallet_share_item.length} item{data.wallet_share_item.length > 1 ? 's' : ''} of wallet</span>
                                    </Badge>);
                                }

                                if(items.length > 0){
                                    return <div className={ ` flex flex-row gap-2 items-center flex-wrap` }>
                                        {items}
                                    </div>
                                }

                                return <></>;
                            })()}
                        </div>
                    </CardContent>
                </Card>

                {/* List of shared Wallet */}
                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>List of Item</div>
                                </CardTitle>
                                <CardDescription>See the list of wallet share</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {(() => {
                            if('wallet_share_item' in data && data.wallet_share_item && data.wallet_share_item?.length > 0){
                                let items: any[] = [];
                                (data.wallet_share_item).forEach((value) => {
                                    items.push(
                                        <WalletTemplate wallet={value} key={ `share_item-${value.uuid}` }/>
                                    );
                                });

                                if(items.length > 0){
                                    return <div className={ ` flex flex-col gap-4` }>
                                        {items}
                                    </div>
                                }
                            }

                            return <TemplateNoData/>
                        })()}
                    </CardContent>
                </Card>

                {/* List of related record from shared wallet */}
                <Card className={ `` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Record: List</div>
                                </CardTitle>
                                <CardDescription>See related record from shared data</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className={ ` flex flex-col gap-6` }>
                        <Input placeholder={ `Search by record notes` } value={recordFilterKeyword} onChange={(event) => {
                            setRecordFilterKeyword(event.target.value);
                        }}/>
                        
                        {/* Content */}
                        <div className={ ` flex flex-col gap-4` }>
                            {(() => {
                                if(recordIsLoading){
                                    let element: any[] = [];
                                    for(let i = 0; i < recordSkeletonCount; i++){
                                        element.push(
                                            <div key={ `skeleton-${i}` }>
                                                {skeletonTemplate}
                                            </div>
                                        );
                                    }

                                    return element;
                                } else {
                                    let recordElement: any[] = [];
                                    let defaultContent = <TemplateNoData></TemplateNoData>;
                                    // Loop through response
                                    if(recordItem.length > 0){
                                        recordItem.map((val, index) => {
                                            recordElement.push(
                                                <div key={ `record_item-${index}` }>
                                                    {recordListTemplate(val)}
                                                </div>
                                            );
                                        });
                                    }

                                    return recordElement.length > 0 ? recordElement : defaultContent;
                                }

                                return <></>;
                            })()}
                        </div>
                    </CardContent>
                    <CardFooter className={ `flex justify-between items-center` }>
                        <Button
                            variant={ `outline` }
                            className={ `` }
                            disabled={ !recordPaginateState }
                            onClick={() => {
                                setRecordPaginateState(false);
                                setRecordPaginate(recordPaginate + paginate_item);
                            }}
                        >Load more</Button>

                        {(() => {
                            if(recordCountShown > 0 && recordCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {recordCountShown} of {recordCountTotal} entries</span>
                                </>;
                            }

                            return <></>
                        })()}
                    </CardFooter>
                </Card>
            </div>
        </>,
    };

    useEffect(() => {
        // Reload data
    }, []);

    return (
        <PublicLayout>
            <Head title="Shared Wallet"/>

            {(() => {
                if(is_found){
                    if(valid_until && moment(moment(valid_until).format('YYYY-MM-DD HH:mm:ss')) < moment(moment().format('YYYY-MM-DD HH:mm:ss'))){
                        return contentList.expired;
                    } else {
                        if(has_passphrase){
                            return contentList.passphrase_form;
                        } else {
                            return contentList.main_content;
                        }
                    }
                }

                return contentList.not_found;
            })()}
        </PublicLayout>
    );
}