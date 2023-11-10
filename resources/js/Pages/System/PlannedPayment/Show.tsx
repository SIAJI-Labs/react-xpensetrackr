import { PageProps, PlannedItem } from "@/types";
import { useIsFirstRender } from "@/lib/utils";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Plugins
import { fetchPeriod, formatRupiah, momentFormated, ucwords } from "@/function";
import moment from "moment-timezone";
import axios from "axios";

// Partials
import ListRecordTemplate from "@/Components/template/PlannedPayment/ListRecordTemplate";
import ListSkeleton from "@/Components/template/PlannedPayment/ListSkeleton";
import BackButton from "@/Components/template/BackButtonTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Separator } from "@/Components/ui/separator";
import { Skeleton } from "@/Components/ui/skeleton";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import PlannedRecordSkipDialog from "@/Components/system/PlannedPayment/PlannedRecordSkipDialog";

// Props
type PlannedPaymentShowProps = {
    data: PlannedItem
}

export default function Show({ auth, data }: PageProps<PlannedPaymentShowProps>) {
    const isFirstRender = useIsFirstRender();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogPlannedPayment = () => {
            router.reload();
            fetchPlannedItem();
        }

        document.addEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
        document.addEventListener('dialog.record.hidden', handleDialogPlannedPayment);
        document.addEventListener('planned-payment.record.skipped', handleDialogPlannedPayment);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
            document.removeEventListener('dialog.record.hidden', handleDialogPlannedPayment);
            document.removeEventListener('planned-payment.record.skipped', handleDialogPlannedPayment);
        };
    });
    // Document ready
    useEffect(() => {
        // Run on tab changed
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

    const [openPlannedRecordSkipDialog, setOpenPlannedRecordSkipDialog] = useState<boolean>(false);
    const handleOpenRecordDeleteDialog = (isOpen: boolean) => {
        setOpenPlannedRecordSkipDialog(isOpen);
    };

    return <>
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Detail: { `${data?.name}` }</h2>}
        >
            <Head title={ `Planned Detail: ${data?.name}` } />
            <PlannedRecordSkipDialog openState={ openPlannedRecordSkipDialog } setOpenState={ handleOpenRecordDeleteDialog }/>

            <div className="flex flex-col gap-6">
                <BackButton className={ `px-0` }/>
            </div>

            <div className={ ` flex flex-col gap-6` }>
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
                                        {/* Edit Action */}
                                        {(() => {
                                            // Check if record dialog form is exists
                                            let plannedDialogSection = document.getElementById('plannedPaymentDialog-section');
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

                                                    document.dispatchEvent(new CustomEvent('plannedPaymentDialogEditAction', {
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
                        <div className={ `` }>
                            <div className={ `flex justify-between mt-2 text-sm` }>
                                <span>Amount</span>
                                <span data-review="amount">{ formatRupiah(data.amount ?? 0) }</span>
                            </div>
                            <div className={ `flex justify-between mt-1 text-sm` }>
                                <span>
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
                    </CardContent>
                </Card>
                
                <Card className={ ` w-full` }>
                    <CardContent className={ ` flex flex-col gap-6 pt-6` }>
                        <div className={ ` flex flex-row justify-between` }>
                            <div className={ ` flex flex-col gap-1` }>
                                <span className={ ` font-normal` }>{ucwords(data.repeat_type)}</span>
                                <Badge>{ucwords(data.repeat_period)}</Badge>
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
                                let defaultContent = <NoDataTemplate></NoDataTemplate>;
            
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
                                                        // Check if record dialog form is exists
                                                        let plannedRecordSkipSection = document.getElementById('plannedRecordSkipDialog-section');
                                                        if(plannedRecordSkipSection){
                                                            return <Button className={ `w-full` } variant={ `outline` } onClick={() => {
                                                                document.dispatchEvent(new CustomEvent('planned-payment.record.skip', {
                                                                    bubbles: true,
                                                                    detail: {
                                                                        uuid: data?.uuid
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