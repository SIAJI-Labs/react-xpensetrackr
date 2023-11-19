import { useIsFirstRender } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import axios from "axios";

// Partials
import ListTemplate from "@/Components/template/PlannedPayment/ListTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";

// Shadcn
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import ListSkeleton from "@/Components/template/PlannedPayment/ListSkeleton";

// Props
type PlannedPaymentListProps = {
    activeType?: string
}

export default function PlannedPaymentList({ auth, activeType }: PageProps<PlannedPaymentListProps>) {
    const isFirstRender = useIsFirstRender();
    useEffect(() => {
        // Run on tab changed
        fetchPlannedSummary();
    }, []);

    // Planned Payment Data
    const [plannedItemAbortController, setPlannedItemAbortController] = useState<AbortController | null>(null);
    const [plannedIsLoading, setPlannedIsLoading] = useState<boolean>(true);
    const [plannedItem, setPlannedItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [plannedCountShown, setPlannedCountShown] = useState<number>(0);
    const [plannedCountTotal, setPlannedCountTotal] = useState<number>(0);
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
            limit: plannedPaginate,
            keyword: plannedFilterKeyword
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.planned-payment.v1.list')}?${query.join('&')}`, {
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
            // Update shown
            setPlannedCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setPlannedCountTotal(jsonResponse.result.total);
            }

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

    // List Skeleton
    const [plannedSkeletonCount, setPlannedSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <ListSkeleton/>
    }
    // List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate plannedPayment={obj}/>;
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(plannedItem){
            setPlannedSkeletonCount(plannedItem.length > 0 ? plannedItem.length : 3);
        }
    }, [plannedItem]);

    // Record Filter
    const [plannedFilterKeyword, setPlannedFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPlannedPaginate(paginate_item);
                fetchPlannedSummary();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [plannedFilterKeyword]);

    useEffect(() => {
        if(!isFirstRender){
            fetchPlannedSummary();
        }
    }, [plannedPaginate]);
    useEffect(() => {
        if(!isFirstRender){
            // Listen to Record Dialog event
            const handleDialogPlannedPayment = () => {
                setTimeout(() => {
                    console.log('Dialog Event');

                    fetchPlannedSummary();
                }, 100);
            }
            window.addEventListener('planned-payment.refresh', handleDialogPlannedPayment);
            // Remove the event listener when the component unmounts
            return () => {
                window.removeEventListener('planned-payment.refresh', handleDialogPlannedPayment);
            };
        }
    });

    return (<>
        <div className={ `flex flex-col gap-6` }>
            {/* Filter */}
            <div className={ ` flex flex-row gap-4` }>
                <Input placeholder={ `Search by Planned Payment name` } value={ plannedFilterKeyword } onChange={(event) => {
                    setPlannedFilterKeyword(event.target.value);
                }}/>

                <Button>
                    <i className={ `fa-solid fa-filter` }></i>
                </Button>
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
            <div className={ `flex justify-between items-center` }>
                <Button
                    variant={ `outline` }
                    className={ `dark:border-white` }
                    disabled={ !plannedPaginateState }
                    onClick={() => {
                        setPlannedPaginateState(false);
                        setPlannedPaginate(plannedPaginate + paginate_item);
                    }}
                >Load more</Button>

                {(() => {
                    if(plannedCountShown > 0 && plannedCountTotal > 0){
                        return <>
                            <span className={ `text-sm` }>Showing {plannedCountShown} of {plannedCountTotal} entries</span>
                        </>;
                    }

                    return <></>
                })()}
            </div>
        </div>
    </>);
}