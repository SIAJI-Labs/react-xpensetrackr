import { useEffect, useState } from "react";
import { PageProps } from "@/types";

// Plugins
import moment from "moment-timezone";

// Partials
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import SummaryTemplate from "@/Components/template/PlannedPayment/SummaryTemplate";

// Shadcn
import { Button } from "@/Components/ui/button";
import SummarySkeleton from "@/Components/template/PlannedPayment/SummarySkeleton";
import axios from "axios";

// Props
type PlannedPaymentSummaryProps = {
    activeType?: string
}

export default function PlannedPaymentSummary({ auth, activeType }: PageProps<PlannedPaymentSummaryProps>) {
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
    useEffect(() => {
        fetchPlannedSummary();
    }, [plannedPaginate]);
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
        // } as { [key: string]: any };
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.planned-payment.summary.v1.list')}?${query.join('&')}`, {
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
    let listTemplate = (obj?:undefined) => {
        return <SummaryTemplate plannedPayment={obj}/>;
    }
    // Summary List Skeleton
    const [plannedSkeletonCount, setPlannedSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <SummarySkeleton/>
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
    
    return (<>
        <div className={ `flex flex-col gap-6` }>
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
                    }} disabled={ moment().format('YYYY-MM-DD') === moment(activePeriod).format('YYYY-MM-DD') }>
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

            {/* Content */}
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
        </div>
    </>);
}