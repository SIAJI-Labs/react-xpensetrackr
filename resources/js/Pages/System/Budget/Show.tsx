import { Head, Link, router } from "@inertiajs/react";
import { PageProps, BudgetItem, RecordItem } from "@/types"
import { useIsFirstRender } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Partials
import BackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";
import RecordTemplate from '@/Components/template/Record/TemplateList';
import RecordSkeleton from '@/Components/template/Record/SkeletonList';

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import moment from "moment";
import { Separator } from "@/Components/ui/separator";
import { Input } from "@/Components/ui/input";
import axios from "axios";

// Props
type ContentProps = {
    data: BudgetItem,

    original_start: string,
    original_end: string,
    previous_start: string,
    previous_end: string,
    range: number,

    usage_limit: number,
    usage_used: number,
    usage_remaining: number,
}

export default function Show({ 
    auth,
    data,

    original_start,
    original_end,
    previous_start,
    previous_end,
    range,

    usage_limit,
    usage_used,
    usage_remaining,
}: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const navigatePeriod = (action: string = 'prev') => {
        let target = null;

        // Handle action
        if(action === 'prev'){
            target = Number(range) + 1;
        } else if(action === 'next'){
            target = Number(range) - 1;
        }

        // Handle target
        let param: {uuid: string, previous?: number} = {
            uuid: data.uuid
        };
        if (target && target > 0) {
            param.previous = target;
        }

        let targetRoute = route('sys.budget.show', param);
        router.visit(targetRoute, { preserveScroll: true });
    }

    const [recordFilterKeyword, setRecordFilterKeyword] = useState<string>('');
    useEffect(() => {
        handleReloadData();
    }, [recordFilterKeyword]);
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
    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <RecordTemplate record={obj}></RecordTemplate>;
    }
    // Record List - Skeleton
    let skeletonTemplate = <RecordSkeleton/>;
    // Record List - Variable Init
    let paginate_item = 5;
    const [recordCountShown, setRalletCountShown] = useState<number>(0);
    const [recordCountTotal, setRalletCountTotal] = useState<number>(0);
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
            keyword: recordFilterKeyword,
            filter_budget: data.uuid,
            filter_start: previous_start,
            filter_end: previous_end,
        }
        // } as { [key: string]: any };
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

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
            setRalletCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setRalletCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setRecordIsLoading(false);

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

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                router.visit(route('sys.budget.index'))
            } else {
                fetchRecordList();
                router.reload();
            }
        }

        document.addEventListener('budget.deleted-action', handleDialogEvent);
        document.addEventListener('dialog.budget.hidden', handleDialogEvent);
        document.addEventListener('dialog.record.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.addEventListener('budget.deleted-action', handleDialogEvent);
            document.removeEventListener('dialog.budget.hidden', handleDialogEvent);
            document.removeEventListener('dialog.record.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Budget Detail: { `${data?.name}` }</h2>}
                fabAction={ [`budget`] }
            >
                <Head title={ `Budget: ${data?.name}` } />
                <BackButton className={ `px-0` }/>

                <div className={ ` flex flex-col gap-6` }>
                    {/* Summary */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Budget Detail: { `${data?.name}` }</div>
                                    </CardTitle>
                                    <CardDescription>See summary of your budget</CardDescription>
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
                                                router.reload();
                                                
                                                setTimeout(() => {
                                                    setOpenDropdown(false);
                                                }, 100);
                                            }}>
                                                <span className={ `` }>Refresh</span>
                                            </DropdownMenuItem>

                                            {/* Edit Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let budgetDialogSection = document.getElementById('budget-dialogSection');
                                                if(budgetDialogSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                        let el = $refs.target as HTMLElement;
                                                        if(el){
                                                            let originalText = el.innerHTML;
                                                            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                            const revertToOriginalText = () => {
                                                                if(originalText){
                                                                    el.innerHTML = originalText;
                                                                }

                                                                document.removeEventListener('dialog.budget.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.budget.shown', revertToOriginalText);
                                                        }

                                                        document.dispatchEvent(new CustomEvent('budget.edit-action', {
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

                                            {/* Delete Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let deleteSection = document.getElementById('budget-deleteDialogSection');
                                                if(deleteSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                        document.dispatchEvent(new CustomEvent('budget.delete-action', {
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
                            <div className={ ` flex flex-col gap-6` }>
                                {/* Occurence & Interval */}
                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-col gap-1` }>
                                        <span>Occurence</span>
                                        <Badge variant={ `outline` } className={ ` justify-center` }>{ ucwords(data.occurence) }</Badge>
                                    </div>
                                    <div className={ ` flex flex-col gap-1` }>
                                        <span>Interval</span>
                                        <Badge variant={ `outline` } className={ ` justify-center` }>{ data.occurence === 'once' ? data.interval : ucwords(data.interval) }</Badge>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                    <span className=" flex items-center gap-2 text-sm font-normal">
                                        <i className="fa-solid fa-align-left"></i>
                                        <span className={ `font-normal` }>Note(s)</span>
                                    </span>
                                    <span className=" block mt-2">{ data.description ?? 'No description provided' }</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Condition */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Condition</div>
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                if(
                                    (data.budget_category && data.budget_category.length > 0) ||
                                    (data.budget_wallet && data.budget_wallet.length > 0) || 
                                    (data.budget_tags && data.budget_tags.length > 0)
                                ){
                                    let items: ReactNode[] = [];
                                    if(data.budget_category && data.budget_category.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_category).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.category.show', value.uuid) } key={ `category_badge_link-${index}` }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-category` }>
                                                <span className={ ` leading-none` }>Category ({ data.budget_category.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }
                                    if(data.budget_wallet && data.budget_wallet.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_wallet).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.wallet.show', value.uuid) } key={ `wallet_badge_link-${index}` }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-wallet` }>
                                                <span className={ ` leading-none` }>Wallet ({ data.budget_wallet.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }
                                    if(data.budget_tags && data.budget_tags.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_tags).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.tags.show', value.uuid) } key={ `tags_badge_link-${index}` }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-tags` }>
                                                <span className={ ` leading-none` }>Tags ({ data.budget_tags.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }

                                    return <div className={ ` flex flex-col gap-4` }>{items}</div>
                                }

                                return <span>No condition provided</span>
                            })()}
                        </CardContent>
                    </Card>

                    {/* Progress */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Usage</div>
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className={ ` flex flex-col gap-4` }>
                            {/* Progress bar */}
                            <div className={ ` flex flex-col gap-2` }>
                                <div className={ ` flex flex-row justify-between` }>
                                    {/* Used */}
                                    <div className={ ` flex flex-col` }>
                                        <small>Used</small>
                                        <span>{ formatRupiah(usage_used) }</span>
                                    </div>

                                    {/* Remaining */}
                                    <div className={ ` flex flex-col items-end` }>
                                        <small>Remaining</small>
                                        <span>{ formatRupiah(usage_remaining) }</span>
                                    </div>
                                </div>

                                {/* Bar */}
                                <div className={ ` h-3 w-full rounded-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden` }>
                                    <div className={ ` h-full absolute left-0 top-0 bg-primary` } style={
                                        {
                                            width: `${(usage_remaining !== undefined && usage_limit !== undefined ? (((Math.max(usage_remaining, 1)) / (Math.max(usage_limit, 1))) * 100) : 100)}%`
                                        }
                                    }></div>
                                </div>

                                {/* Summary */}
                                <div className={ ` flex flex-row justify-between` }>
                                    <Badge variant={ `outline` }>Limit: { formatRupiah(data.amount) }</Badge>
                                    <Badge variant={ `outline` }>Usage: { `${(usage_remaining !== undefined && usage_limit !== undefined ? ((usage_used / usage_limit) * 100) : 100).toFixed(2)}%` }</Badge>
                                </div>
                            </div>

                            {/* Record Items */}
                            <Separator/>
                            <div className={ ` flex flex-col gap-4` }>
                                <div className={ ` flex flex-col gap-1` }>
                                    {/* Period Navigation */}
                                    <div className={ ` flex flex-col gap-1` }>
                                        {(() => {
                                            if(data.occurence === 'recurring'){
                                                return <>
                                                    <div className={ ` flex flex-row justify-between` }>
                                                        {/* Previous */}
                                                        <div className={ `` }>
                                                            <Button variant={ `ghost` } onClick={() => {
                                                                navigatePeriod('prev');
                                                            }}>
                                                                <span><i className={ `fa-solid fa-angle-left` }></i></span>
                                                            </Button>
                                                        </div>

                                                        {/* State */}
                                                        <div className={ `` }>
                                                            <Button variant={ `outline` } className={ `px-6` }>
                                                                { moment(previous_start) < moment(original_start) ? `Archive` : `Current` }
                                                            </Button>
                                                        </div>

                                                        {/* Next */}
                                                        <div className={ `` }>
                                                            <Button variant={ `ghost` } onClick={() => {
                                                                navigatePeriod('next');
                                                            }} className={ moment(previous_start) < moment(original_start) ? `` : ` !opacity-0` } disabled={ !(moment(previous_start) < moment(original_start)) }>
                                                                <span><i className={ `fa-solid fa-angle-right` }></i></span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>;
                                            }
                                            
                                            return <></>;
                                        })()}

                                        {(() => {
                                            if(moment(previous_start) < moment(original_start)){
                                                return <div className={ ` flex flex-row justify-center` }>
                                                    <Button variant={ `link` } className={ ` h-auto py-0` } onClick={() => {
                                                        navigatePeriod('curr');
                                                    }}>Back to current period</Button>
                                                </div>
                                            }

                                            return <></>;
                                        })()}
                                    </div>
                                    {/* Period Information */}
                                    <div className={ ` flex flex-row justify-between` }>
                                        <div className={ ` flex flex-col gap-1` }>
                                            <span className={ ` text-sm leading-none` }>From</span>
                                            <span className={ ` font-medium leading-tight` }>{ momentFormated('MMM Do, \'YY / HH:mm', previous_start, auth.timezone ?? 'UTC') }</span>
                                        </div>
                                        <div className={ ` flex flex-col gap-1 items-end` }>
                                            <span className={ ` text-sm leading-none` }>Until</span>
                                            <span className={ ` font-medium leading-tight` }>{ momentFormated('MMM Do, \'YY / HH:mm', previous_end, auth.timezone ?? 'UTC') }</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Record List */}
                                <div className={ ` flex flex-col gap-2` }>
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
                                        })()}
                                    </div>
                                    {/* Pagination */}
                                    <div className={ `flex justify-between items-center` }>
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
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}