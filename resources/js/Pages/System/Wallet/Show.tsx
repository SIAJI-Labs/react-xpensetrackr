import { Head, Link, router } from "@inertiajs/react";
import { PageProps, RecordItem, WalletItem } from "@/types"
import { useEffect, useState } from "react";
import axios from "axios";

// Partials
import BackButton from "@/Components/template/TemplateBackButton";
import WalletTemplate from "@/Components/template/Wallet/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";
import RecordTemplate from "@/Components/template/Record/TemplateList";
import RecordSkeleton from "@/Components/template/Record/SkeletonList";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

// Props
type ContentProps = {
    data: WalletItem
}

export default function Show({ auth, data }: PageProps<ContentProps>) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                setOpenDropdown(false);
            }, 100);
        }

        document.addEventListener('dialog.wallet.shown', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.shown', handleDialogEvent);
        };
    });

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                router.visit(route('sys.wallet.index'));
            } else {
                router.reload({
                    only: ['data']
                });
            }
        }

        document.addEventListener('dialog.wallet.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

        document.addEventListener('wallet.deleted-action', handleDialogEvent);
        
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

            document.addEventListener('wallet.deleted-action', handleDialogEvent);
        };
    });

    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <RecordTemplate record={obj}></RecordTemplate>;
    }
    // Record List - Skeleton
    let skeletonTemplate = <RecordSkeleton/>;
    // Record List - Variable Init
    let paginate_item = 5;
    const [recordCountShown, setRecordCountShown] = useState<number>(0);
    const [recordCountTotal, setRecordCountTotal] = useState<number>(0);
    const [recordPaginate, setRecordPaginate] = useState<number>(paginate_item);
    const [recordPaginateState, setRecordPaginateState] = useState<boolean>(false);
    useEffect(() => {
        fetchRecordList();
    }, [recordPaginate]);

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
        // setRefreshLoading(true);

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
        }
        // } as { [key: string]: any };
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }
        query.push(encodeURIComponent(`filter_wallet`) + '=' + data.uuid);

        try {
            const response = await axios.get(`${route('api.record.v1.list')}?${query.join('&')}`, {
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
    }
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchRecordList();
            }, 100);
        }

        document.addEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

        document.addEventListener('dialog.record.hidden', handleDialogEvent);
        document.addEventListener('record.deleted-action', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

            document.removeEventListener('dialog.record.hidden', handleDialogEvent);
            document.removeEventListener('record.deleted-action', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Detail: { `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</h2>}
                fabAction={ [`wallet`] }
            >
                <Head title={ `Wallet: ${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` } />
                <BackButton className={ `px-0` }/>

                <div className={ ` flex flex-col gap-6` }>
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                            <div>Wallet Detail: { `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</div>
                                    </CardTitle>
                                    <CardDescription>See summary of <u>{ `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</u> wallet</CardDescription>
                                </div>
                                
                                <div>
                                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                            {/* Refresh Action */}
                                            <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                router.reload({
                                                    only: ['data']
                                                });
                                                
                                                setTimeout(() => {
                                                    setOpenDropdown(false);
                                                }, 100);
                                            }}>
                                                <span className={ `` }>Refresh</span>
                                            </DropdownMenuItem>

                                            {/* Edit Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let walletDialogSection = document.getElementById('wallet-dialogSection');
                                                if(walletDialogSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                        let el = $refs.target as HTMLElement;
                                                        if(el){
                                                            let originalText = el.innerHTML;
                                                            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                            const revertToOriginalText = () => {
                                                                if(originalText){
                                                                    el.innerHTML = originalText;
                                                                }

                                                                document.removeEventListener('dialog.wallet.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.wallet.shown', revertToOriginalText);
                                                        }

                                                        document.dispatchEvent(new CustomEvent('wallet.edit-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : ''
                                                            }
                                                        }));
                                                    }}>
                                                        <span className={ ` text-yellow-500` }>Edit</span>
                                                    </DropdownMenuItem>;
                                                }

                                                return <></>;
                                            })()}

                                            {/* Balance Adjustment Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let walletDialogSection = document.getElementById('walletBalanceAdjustment-dialogSection');
                                        if(walletDialogSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                let el = $refs.target as HTMLElement;
                                                if(el){
                                                    let originalText = el.innerHTML;
                                                    el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                    const revertToOriginalText = () => {
                                                        if(originalText){
                                                            el.innerHTML = originalText;
                                                        }

                                                        document.removeEventListener('dialog.wallet.balance-adjustment.shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.wallet.balance-adjustment.shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('wallet.balance-adjustment.edit-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: data && 'uuid' in data ? data?.uuid : ''
                                                    }
                                                }));
                                            }}>
                                                <span className={ ` text-yellow-500` }>Balance Adjustment</span>
                                            </DropdownMenuItem>;
                                        }

                                        return <></>;
                                    })()}

                                            {/* Delete Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let deleteSection = document.getElementById('wallet-deleteDialogSection');
                                                if(deleteSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                        document.dispatchEvent(new CustomEvent('wallet.delete-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : null,
                                                                action: 'delete'
                                                            }
                                                        }));
                                                    }}>
                                                        <span className={ ` text-red-500` }>Delete</span>
                                                    </DropdownMenuItem>;
                                                }

                                                return <></>;
                                            })()}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={ ` flex flex-col gap-4` }>
                                {(() => {
                                    if(data.parent && data.parent.deleted_at !== null){
                                        return <>
                                            <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                                <span className=" flex items-center gap-2 text-sm font-normal">
                                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                                    <span className={ `font-normal` }>Parent Wallet is Deleted</span>
                                                </span>
                                                <span className=" block mt-2">Parent Wallet is deleted at { momentFormated('MMM Do, YYYY / HH:mm', data.parent.deleted_at) }</span>
                                            </div>
                                        </>;
                                    } else if('deleted_at' in data && data.deleted_at !== null){
                                        return <>
                                            <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                                <span className=" flex items-center gap-2 text-sm font-normal">
                                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                                    <span className={ `font-normal` }>Data is Deleted</span>
                                                </span>
                                                <span className=" block mt-2">Related data is deleted at { momentFormated('MMM Do, YYYY / HH:mm', data.deleted_at) }</span>
                                            </div>
                                        </>;
                                    }

                                    return <></>;
                                })()}

                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-row justify-between` }>
                                        <div className={ ` flex flex-col` }>
                                            <span>Balance</span>
                                            <span className={ ` font-semibold` }>{ formatRupiah(data.balance) }</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-row justify-between` }>
                                        <div className={ ` flex flex-col` }>
                                            <span>Related to</span>
                                            {(() => {
                                                if(data.parent){
                                                    return <Link href={ route('sys.wallet.show', data.parent.uuid) }>
                                                        <span className={ `font-semibold underline` }>{ data.parent.name }</span>
                                                    </Link>
                                                }

                                                return <>-</>;
                                            })()}
                                        </div>
                                    </div>

                                    <div className={ ` flex flex-col items-end` }>
                                        <span>Last Transaction</span>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {(() => {
                        if(data.child && Object.keys(data.child).length > 0){
                            return <>
                                <Card className={ ` w-full` }>
                                    <CardHeader>
                                        <div className={ ` relative flex flex-row justify-between items-start` }>
                                            <div>
                                                <CardTitle>
                                                    <div className={ ` text-base` }>Related wallet</div>
                                                </CardTitle>
                                                {(() => {
                                                    if(data.child){
                                                        return <CardDescription>There's { data.child.length } item(s) related to <u>{ data.name }</u></CardDescription>
                                                    }

                                                    return <></>;
                                                })()}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={ `flex flex-col gap-4` }>
                                            {(() => {
                                                let relatedElement: any = [];
                                                let defaultContent = <TemplateNoData></TemplateNoData>;

                                                Object.values(data.child).forEach((val, index) => {
                                                    relatedElement.push(
                                                        <div key={ `related_item-${index}` }>
                                                            <WalletTemplate wallet={val}/>
                                                        </div>
                                                    );
                                                });

                                                return relatedElement.length > 0 ? relatedElement : defaultContent;
                                            })()}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>;
                        }

                        return <></>;
                    })()}

                    {/* Record List */}
                    <Card className={ `` }>
                        <CardHeader>
                            <div className={ ` flex flex-row justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                            <div>Record: List</div>
                                    </CardTitle>
                                    <CardDescription>See your latest transaction</CardDescription>
                                </div>

                                <div className={ `flex items-center gap-2` }>
                                    <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                        // Cancel previous request
                                        if(recordItemAbortController instanceof AbortController){
                                            recordItemAbortController.abort();
                                        }
                                        
                                        // Fetch Pending Count
                                        fetchRecordList();
                                    }}><i className={ `fa-solid fa-rotate-right` }></i></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className={ ` flex flex-col gap-6` }>
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
            </SystemLayout>
        </>
    );
}