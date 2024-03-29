import { PageProps, PlannedItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Plugins
import { fetchPeriod, formatRupiah, momentFormated, ucwords } from "@/function";
import moment from "moment-timezone";
import axios from "axios";

// Partials
import ListRecordTemplate from "@/Components/template/PlannedPayment/TemplateListRecord";
import ListSkeleton from "@/Components/template/PlannedPayment/SkeletonList";
import BackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

// Props
type ContentProps = {
    data: PlannedItem
}

export default function Show({ auth, data }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                setOpenDropdown(false);
            }, 100);
        }

        document.addEventListener('dialog.planned-payment.shown', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.planned-payment.shown', handleDialogEvent);
        };
    });
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogPlannedPayment = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                router.visit(route('sys.planned-payment.index'));
            } else {
                router.reload({
                    only: ['data']
                });
                fetchPlannedItem();
            }
        }

        document.addEventListener('dialog.record.hidden', handleDialogPlannedPayment);

        document.addEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
        document.addEventListener('planned-payment.deleted-action', handleDialogPlannedPayment);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.hidden', handleDialogPlannedPayment);

            document.removeEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
            document.removeEventListener('planned-payment.deleted-action', handleDialogPlannedPayment);
        };
    });
    // Document ready
    useEffect(() => {
        // Initial fetch
        fetchPlannedItem();
    }, []);

    // Planned Payment Data
    const [plannedItemAbortController, setPlannedItemAbortController] = useState<AbortController | null>(null);
    const [plannedIsLoading, setPlannedIsLoading] = useState<boolean>(true);
    const [plannedItem, setPlannedItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [plannedPaginate, setPlannedPaginate] = useState<number>(paginate_item);
    const [plannedPaginateState, setPlannedPaginateState] = useState<boolean>(false);
    const fetchPlannedItem = async() => {
        // Show skeleton
        setPlannedIsLoading(true);

        // Cancel previous request
        if(plannedItemAbortController instanceof AbortController){
            plannedItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setPlannedItemAbortController(abortController);

        // Build parameter
        const query = [];
        const obj = {
            limit: plannedPaginate,
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.planned-payment.v1.show', data.uuid)}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            let recordList = jsonResponse.result.record.data;
            setPlannedItem(recordList);
            // setPlannedItem(jsonResponse.result.data);
            // Update load more state
            setPlannedPaginateState(jsonResponse.result.has_more);

            // Remove loading state
            setPlannedIsLoading(false);

            // Clear the AbortController from state
            setPlannedItemAbortController(null);
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

    // Item List Skeleton
    const [plannedSkeletonCount, setPlannedSkeletonCount] = useState<number>(5);
    let skeletonTemplate = () => {
        return <ListSkeleton/>;
    }
    // Item List Template
    let listTemplate = (obj?:any) => {
        return <ListRecordTemplate plannedPayment={ obj }/>
    }
    useEffect(() => {
        if(!isFirstRender && plannedItem){
            // Update skeleton count to match loaded record item
            setPlannedSkeletonCount(plannedItem.length > 0 ? plannedItem.length : 5);
        }
    }, [plannedItem]);

    return <>
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Detail: { `${data?.name}` }</h2>}
        >
            <Head title={ `Planned Detail: ${data?.name}` } />
            <BackButton className={ `px-0` }/>

            <div className={ ` flex flex-col gap-6` }>
                {/* Main Content */}
                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start cursor-pointer` } onClick={() => {
                            setOpenDropdown(true);
                        }}>
                            <div>
                                <CardTitle>
                                        <div>Planned Payment: Detail</div>
                                </CardTitle>
                                <CardDescription>See your detailed Planned Payment</CardDescription>
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
                                            fetchPlannedItem();
                                            
                                            setTimeout(() => {
                                                setOpenDropdown(false);
                                            }, 100);
                                        }}>
                                            <span className={ `` }>Refresh</span>
                                        </DropdownMenuItem>

                                        {/* Edit Action */}
                                        {(() => {
                                            // Check if record dialog form is exists
                                            let plannedDialogSection = document.getElementById('plannedPayment-dialogSection');
                                            if(plannedDialogSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                    let el = $refs.target as HTMLElement;
                                                    if(el){
                                                        let originalText = el.innerHTML;
                                                        el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                        const revertToOriginalText = () => {
                                                            if(originalText){
                                                                el.innerHTML = originalText;
                                                            }

                                                            document.removeEventListener('dialog.planned-payment.shown', revertToOriginalText);
                                                        }
                                                        document.addEventListener('dialog.planned-payment.shown', revertToOriginalText);
                                                    }

                                                    document.dispatchEvent(new CustomEvent('planned-payment.edit-action', {
                                                        bubbles: true,
                                                        detail: {
                                                            uuid: data?.uuid
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
                                            let deleteSection = document.getElementById('plannedPayment-deleteDialogSection');
                                            if(deleteSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                    document.dispatchEvent(new CustomEvent('planned-payment.delete-action', {
                                                        bubbles: true,
                                                        detail: {
                                                            uuid: data?.uuid,
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
                    <CardContent className={ ` flex flex-col gap-6` }>
                        {/* Name */}
                        <div className={ ` flex flex-row gap-2` }>
                            <span className={ ` font-medium text-xl` }>{ data.name }</span>
                        </div>

                        {/* Archive alert */}
                        {(() => {
                            if(data && 'deleted_at' in data && data.deleted_at){
                                return (
                                    <>
                                        <div className=" w-full p-4 rounded-lg border-2 border-dashed border-red-500">
                                            <span className=" flex items-center gap-2 text-sm font-normal">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                                <span className={ `font-normal` }>Archive</span>
                                            </span>
                                            <span className=" block mt-2">{(() => {
                                                return (
                                                    <>
                                                        <span>This data is archived at <u>{momentFormated('MMM Do, YYYY / HH:mm', data.deleted_at, moment.tz.guess())}</u></span>
                                                    </>
                                                )
                                            })()}</span>
                                        </div>
                                    </>
                                );
                            }

                            return <></>;
                        })()}

                        {/* Type, Category, and Wallet */}
                        <div className={ ` flex gap-4` }>
                            <div className={ ` w-1/3` }>
                                <div className={ ` border ${data.to_wallet ? `` : (data.type === 'income' ? ` border-green-500` : `  border-red-500`)} rounded-md h-full flex flex-col gap-2 justify-center items-center` }>
                                    {/* Icon */}
                                    <div className={ `` }>
                                        {(() => {
                                            if(data.to_wallet){
                                                // Transfer
                                                return <i className={ ` text-2xl fa-solid fa-arrow-right-arrow-left rotate-90` }></i>;
                                            } else {
                                                // Either income / expense
                                                return <i className={ `text-2xl fa-solid ${data.type === 'income' ? ` text-green-500 fa-right-to-bracket rotate-90` : ` text-red-500 fa-right-from-bracket -rotate-90`}` }></i>
                                            }

                                            return <></>;
                                        })()}
                                    </div>
                                    {/* Text */}
                                    <div className={ ` flex flex-col justify-center` }>
                                        <span className={ `font-normal text-center` }>{data.to_wallet ? 'Transfer' : ucwords(data.type)}</span>
                                        {(() => {
                                            if(data.to_wallet){
                                                return <span className={ ` text-xs text-center` }>({ucwords(data.type)})</span>
                                            }

                                            return <></>;
                                        })()}
                                    </div>
                                </div>
                            </div>
                            <div className={ ` w-2/3` }>
                                {/* Category */}
                                <div className={ `` }>
                                    <span className={ `font-semibold underline text-sm` }>Category</span>
                                    <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ data.category ? `${data.category.parent ? `${data.category.parent.name} - ` : ''}${data.category.name}` : 'Uncategorized' }</span>
                                </div>

                                {/* From Wallet */}
                                <div className={ `` }>
                                    <span className={ `font-semibold underline text-sm` }>From</span>
                                    <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ data.from_wallet ? `${data.from_wallet.parent ? `${data.from_wallet.parent.name} - ` : ''}${data.from_wallet.name}` : '-' }</span>
                                </div>

                                {/* To Wallet */}
                                {(() => {
                                    if(data.to_wallet){
                                        return <>
                                            <div className={ `` }>
                                                <span className={ `font-semibold underline text-sm` }>To</span>
                                                <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ data.to_wallet ? `${data.to_wallet.parent ? `${data.to_wallet.parent.name} - ` : ''}${data.to_wallet.name}` : '-' }</span>
                                            </div>
                                        </>;
                                    }
                                    
                                    return <></>;
                                })()}
                            </div>
                        </div>

                        {/* Note */}
                        <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                            <span className=" flex items-center gap-2 text-sm font-normal">
                                <i className="fa-solid fa-align-left"></i>
                                <span className={ `font-normal` }>Note(s)</span>
                            </span>
                            <span className=" block mt-2">{ data.note ?? 'No description provided' }</span>
                        </div>

                        {/* Amount, etc */}
                        <div className={ ` flex flex-col` }>
                            <div className={ `flex justify-between text-sm` }>
                                <span>Amount</span>
                                <span data-review="amount">{ formatRupiah(data.amount ?? 0) }</span>
                            </div>
                            <div className={ `flex justify-between text-sm` }>
                                <span className={ ` flex flex-row gap-1 items-center` }>
                                    <span>Extra</span>
                                    {(() => {
                                        if(data.extra_type === 'percentage'){
                                            return <span className={ `text-xs` }>({ data.extra_percentage ?? 0 }%)</span>;
                                        }
                                        return <></>;
                                    })()}
                                </span>
                                <span data-review="extra_amount">{ formatRupiah(data.extra_amount) }</span>
                            </div>
                            <hr className={ `my-1` }/>
                            <div className={ `flex justify-between mt-2` }>
                                <span className={ `font-semibold` }>Final Amount</span>
                                <span className={ `font-semibold` } data-review="final_amount">{ formatRupiah(data.amount + data.extra_amount) }</span>
                            </div>
                        </div>

                        {(() => {
                            if(data.planned_payment_tags && data.planned_payment_tags.length > 0){
                                let tags: any[] = [];
                                (data.planned_payment_tags).forEach((value, index) => {
                                    tags.push(
                                        <Link href={ route('sys.tags.show', value.uuid) } key={ `tags_${value.uuid}` }>
                                            <Badge>{ value.name }</Badge>
                                        </Link>
                                    );
                                });

                                return (
                                    <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                        <span className={ ` flex flex-row gap-1 items-center text-sm` }>
                                            <i className={ ` fa-solid fa-hashtag` }></i>
                                            <span>Tags:</span>
                                        </span>

                                        { tags }
                                    </div>
                                );
                            }

                            return <></>;
                        })()}
                    </CardContent>
                </Card>
                
                {/* Planned Record */}
                <Card className={ ` w-full` }>
                    <CardContent className={ ` flex flex-col gap-6 pt-6` }>
                        <div className={ ` flex flex-row justify-between` }>
                            <div className={ ` flex flex-col gap-1` }>
                                <span className={ ` font-normal` }>Occurence</span>
                                <Badge variant={ data.repeat_type === 'recurring' ? `default` : `secondary` } className={ ` text-center flex justify-center` }>{ucwords(data.repeat_type)}</Badge>
                            </div>

                            {(() => {
                                if(data.repeat_type === 'recurring'){
                                    return <>
                                        <div className={ ` flex flex-col gap-1 text-right` }>
                                            <span className={ ` font-normal` }>Every</span>
                                            <span className={ `` }>{data.repeat_frequency} {fetchPeriod(data.repeat_period)}</span>
                                        </div>
                                    </>;
                                }

                                return <></>;
                            })()}
                        </div>

                        <Separator/>

                        {(() => {
                            if(plannedIsLoading){
                                let element: any[] = [];
                                for(let i = 0; i < plannedSkeletonCount; i++){
                                    element.push(
                                        <div key={ `skeleton-${i}` }>
                                            {skeletonTemplate()}
                                        </div>
                                    );
                                }

                                return element;
                            } else {
                                let plannedElement: any[] = [];
                                let defaultContent = <TemplateNoData></TemplateNoData>;
            
                                if(data && ('deleted_at' in data) && !data.deleted_at){
                                    plannedElement.push(
                                        <div key={ `planned_prompt-0` }>
                                            <section>
                                                <div className={ ` flex flex-col gap-2 border rounded-lg p-4 cursor-pointer` }>
                                                    {/* Date, amount and action */}
                                                    <div className={ ` flex flex-row gap-6 justify-between` }>
                                                        <span className={ ` font-medium w-full md:w-auto` }>{ momentFormated('MMM Do, YYYY', (data && 'date_start' in data ? moment(data?.date_start) : moment())) }</span>
                                                    
                                                        <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                                            <span className={ ` font-normal whitespace-nowrap ${data && 'type' in data ? (data?.type === 'expense' ? ` text-red-500` : ( data.type === 'income' ? `text-green-500` : ` dark:text-white`)) : ``}` }>{formatRupiah(data && 'amount' in data && 'extra_amount' in data ? (data?.amount + data?.extra_amount) : 0)}</span>
                                                        </div>
                                                    </div>
                                    
                                                    {/* Icon, Category, Notes */}
                                                    <div className={ ` flex flex-row gap-4 items-center` }>
                                                        <div className={ ` p-3 h-10 w-10 rounded-full ${data && 'type' in data ? (data.type === 'income' ? ` bg-green-500` : (data.type === 'expense' ? ` bg-red-500` : ` bg-gray-500 dark:bg-secondary`)) : ``} flex items-center justify-center` }>
                                                            <i className={ ` text-white fa-solid ${data && 'type' in data ? (data.type === 'income' ? `fa-right-to-bracket rotate-90` : (data.type === 'expense' ? `fa-right-from-bracket -rotate-90` : `fa-right-left rotate-90`)) : ``}` }></i>
                                                        </div>
    
                                                        <div className={ ` w-full flex flex-col overflow-hidden` }>
                                                            <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>
                                                                {(() => {
                                                                    if(data && 'category_id' in data){
                                                                        if(data.category){
                                                                            return <>{ `${data.category.parent ? `${data.category.parent.name} - ` : ''}${data.category.name}` }</>;
                                                                        }
                                                                    }
    
                                                                    return <>Uncategorized</>;
                                                                })()}
                                                            </span>
                                                            <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{ data && 'name' in data ? data.name : `Planned Name` }</span>
                                                        </div>
                                                    </div>
    
                                                    {/* Action */}
                                                    <div className={ ` mt-4 flex flex-row gap-4` }>
                                                        {(() => {
                                                            // Check if delete dialog form is exists
                                                            let plannedPaymentDeleteSection = document.getElementById('plannedPayment-deleteDialogSection');
                                                            if(plannedPaymentDeleteSection){
                                                                return <Button className={ `w-full` } variant={ `outline` } onClick={() => {
                                                                    document.dispatchEvent(new CustomEvent('planned-payment.delete-action', {
                                                                        bubbles: true,
                                                                        detail: {
                                                                            uuid: data?.uuid,
                                                                            action: 'skip'
                                                                        }
                                                                    }));
                                                                }}>
                                                                    <span className={ ` text-red-500` }>Skip</span>
                                                                </Button>;
                                                            }
    
                                                            return <></>;
                                                        })()}
                                                        <Button className={ `w-full` } onClick={($refs) => {
                                                            let el = $refs.target as HTMLElement;
                                                            if(el){
                                                                let originalText = el.innerHTML;
                                                                el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;
            
                                                                const revertToOriginalText = () => {
                                                                    if(originalText){
                                                                        el.innerHTML = originalText;
                                                                    }
            
                                                                    document.removeEventListener('dialog.record.shown', revertToOriginalText);
                                                                }
                                                                document.addEventListener('dialog.record.shown', revertToOriginalText);
                                                            }
    
                                                            document.dispatchEvent(new CustomEvent('record-dialog.planned-payment.confirmation', {
                                                                bubbles: true, 
                                                                detail: {
                                                                    uuid: data && 'uuid' in data ? data.uuid : null
                                                                }
                                                            }))
                                                        }}>Confirm</Button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    );
                                }
                                // Loop through response
                                if(plannedItem && plannedItem.length > 0){
                                    plannedItem.map((val, index) => {
                                        plannedElement.push(
                                            <div key={ `planned_item-${index}` }>
                                                {listTemplate(val)}
                                            </div>
                                        );
                                    });
                                }
            
                                return plannedElement.length > 0 ? plannedElement : defaultContent;
                            }
                        })()}
                    </CardContent>
                    <CardFooter>
                        {/* Footer */}
                        <div>
                            <Button
                                variant={ `outline` }
                                className={ `dark:border-white` }
                                disabled={ !plannedPaginateState }
                                onClick={() => {
                                    setPlannedPaginateState(false);
                                    setPlannedPaginate(plannedPaginate + paginate_item);
                                }}
                            >Load more</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </SystemLayout>
    </>;
}