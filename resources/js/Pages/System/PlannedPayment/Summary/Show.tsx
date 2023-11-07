import { PageProps, WalletItem } from "@/types"
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";

// Plugins
import { formatRupiah } from "@/function";
import moment from "moment-timezone";

// Partials
import ListTemplate from "@/Components/template/PlannedPayment/ListTemplate";
import ListSkeleton from "@/Components/template/PlannedPayment/ListSkeleton";
import BackButton from "@/Components/template/BackButtonTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { useIsFirstRender } from "@/lib/utils";

// Props
type PlannedSummaryShowProps = {
    wallet?: WalletItem;
    period?: Date | null
}

export default function Show({ auth, wallet, period }: PageProps<PlannedSummaryShowProps>) {
    const isFirstRender = useIsFirstRender();
    useEffect(() => {
        fetchPlannedSummary();
    }, []);

    // Planned Payment Data
    const [plannedItemAbortController, setPlannedItemAbortController] = useState<AbortController | null>(null);
    const [plannedIsLoading, setPlannedIsLoading] = useState<boolean>(true);
    const [plannedItem, setPlannedItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [plannedPaginate, setPlannedPaginate] = useState<number>(paginate_item);
    const [plannedPaginateState, setPlannedPaginateState] = useState<boolean>(false);
    const fetchPlannedSummary = async() => {
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
            filter_period: moment(activePeriod).format('YYYY-MM-DD'),
            filter_period_timezone: moment.tz.guess(),
            limit: plannedPaginate,
            // filter_status: recordFilterStatus,
            // keyword: recordFilterKeyword
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.planned-payment.summary.v1.show', wallet?.uuid)}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setPlannedItem(jsonResponse.result.data);
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

    // Summary List Template
    let listTemplate = (obj?: any[] | any | undefined) => {
        return <ListTemplate plannedPayment={obj?.planned}/>;
    }
    // Summary List Skeleton
    const [plannedSkeletonCount, setPlannedSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <ListSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(plannedItem){
            setPlannedSkeletonCount(plannedItem.length > 0 ? plannedItem.length : 3);
        }
    }, [plannedItem]);

    const [activePeriod, setActivePeriod] = useState<Date>();
    // Set active
    if(activePeriod === undefined){
        let current = moment();
        if(period !== null){
            current = moment(period);
        }

        setActivePeriod(moment(current).toDate());
    }
    const navigatePeriod = (action: string = 'prev') => {
        // Change active period
        let current = moment(activePeriod);

        if(action === 'prev'){
            current = moment(current).subtract(1, 'months');
        } else if(action === 'next'){
            current = moment(current).add(1, 'months');
        } else if(action === 'current'){
            current = moment();
        }

        setActivePeriod(moment(current).toDate());
    }

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Summary: { `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</h2>}
            >
                <Head title={ `Planned Summary: ${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` } />

                <div className="flex flex-col gap-6">
                    <BackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Planned Summary: { `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</u> wallet</CardDescription>
                            </div>
                            {(() => {
                                return <Button variant={ `outline` } onClick={() => {
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                            })()}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={ ` flex flex-col gap-6` }>
                            {/* Summary */}
                            <div className={ ` border p-4 rounded-lg flex flex-col gap-3 mb-2` }>
                                <div className={ ` flex flex-row justify-between` }>
                                    <span>Current Balance</span>
                                    <span>{ formatRupiah(0) }</span>
                                </div>
                                <Separator />
                                <div className={ ` flex flex-row justify-between` }>
                                    <span>Estimate Income</span>
                                    <span>{ formatRupiah(0) }</span>
                                </div>
                                <Separator />
                                <div className={ ` flex flex-row justify-between` }>
                                    <span>Estimate Expense</span>
                                    <span>{ formatRupiah(0) }</span>
                                </div>
                            </div>

                            {/* Period Navigation */}
                            <div className={ `flex flex-col` }>
                                <div className={ ` flex justify-between items-center` }>
                                    <Button variant={ `ghost` } onClick={() => {
                                        navigatePeriod('prev');
                                    }}>
                                        <span><i className={ `fa-solid fa-angle-left` }></i></span>
                                    </Button>
                                    <div className={ `flex flex-col` }>
                                        <Button variant={ `outline` } className={ `px-6` }>
                                            {moment(activePeriod).format('MMMM, YYYY')}
                                        </Button>
                                    </div>
                                    <Button variant={ `ghost` } onClick={() => {
                                        navigatePeriod('next');
                                    }}>
                                        <span><i className={ `fa-solid fa-angle-right` }></i></span>
                                    </Button>
                                </div>
                                {(() => {
                                    if(moment().format('YYYY-MM-DD') != moment(activePeriod).format('YYYY-MM-DD')){
                                        return <Button variant={ `link` } className={ `py-0` } onClick={() => {
                                            navigatePeriod('current')
                                        }}>Back to current period ({moment().format('MMM, YYYY')})</Button>
                                    }

                                    return <></>;
                                })()}
                            </div>

                            {/* Planned List */}
                            {(() => {
                                if(plannedIsLoading){
                                    let element: any[] = [];
                                    for(let i = 0; i < plannedSkeletonCount; i++){
                                        element.push(
                                            <div key={ `skeleton-${i}` }>
                                                {listSkeleton()}
                                            </div>
                                        );
                                    }

                                    return element;
                                } else {
                                    let plannedElement: any[] = [];
                                    let defaultContent = <NoDataTemplate></NoDataTemplate>;
                                    let plannedPeriod: any | null = null;

                                    // Loop through response
                                    if(plannedItem && plannedItem.length > 0){
                                        plannedItem.map((val, index) => {
                                            let show = false;
                                            if(plannedPeriod === null || plannedPeriod !== val.period){
                                                show = true;
                                                plannedPeriod = val.period;
                                            }

                                            if(index > 0 && show){
                                                plannedElement.push(
                                                    <div key={ `period_separator-${index}` }>
                                                        <div className={ ` flex justify-center relative before:absolute before:border-t before:w-[calc(50%-1.25rem)] before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1 after:absolute after:border-t after:w-[calc(50%-1.25rem)] after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1` }>
                                                            <span><i className={ `fa-regular fa-clock` }></i></span>
                                                        </div>
                                                    </div>
                                                );
                                            }

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
                        </div>
                    </CardContent>
                </Card>
            </SystemLayout>
        </>
    );
}