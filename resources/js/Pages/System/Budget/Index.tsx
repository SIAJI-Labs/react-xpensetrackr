import { useIsFirstRender } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BudgetItem, PageProps } from "@/types"
import axios from "axios";

// Partials
import BudgetSkeleton from "@/Components/template/Budget/SkeletonList";
import BudgetTemplate from "@/Components/template/Budget/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Props
type ContentProps = {
}

export default function Index({ auth }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();
    const [contentIsLoading, setContentIsLoading] = useState<boolean>(true);
    useEffect(() => {
        // Run on tab changed
        fetchBudgetData();
    }, []);

    // Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPaginate(paginate_item);
                fetchBudgetData();
            }, 500);
    
            // Clean up the timer if the component unmounts or when filterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [filterKeyword]);

    // Budget Data
    const [budgetItemAbortController, setBudgetItemAbortController] = useState<AbortController | null>(null);
    const [budgetItem, setBudgetItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [budgetCountShown, setBudgetCountShown] = useState<number>(0);
    const [budgetCountTotal, setBudgetCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchBudgetData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(budgetItemAbortController instanceof AbortController){
            budgetItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setBudgetItemAbortController(abortController);

        // Build request parameter
        const query = [];
        const obj = {
            limit: paginate,
            keyword: filterKeyword
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.budget.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setBudgetItem(jsonResponse.result.data);
            // Update load more state
            setPaginateState(jsonResponse.result.has_more);
            // Update shown
            setBudgetCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setBudgetCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);
            // Clear the AbortController from state
            setBudgetItemAbortController(null);
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
        if(!isFirstRender){
            fetchBudgetData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <BudgetSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded item
        if(budgetItem){
            setSkeletonCount(budgetItem.length > 0 ? budgetItem.length : 3);
        }
    }, [budgetItem]);

    // List Template
    let listTemplate = (obj?: BudgetItem) => {
        return <BudgetTemplate budget={obj}/>;
    }

    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchBudgetData();
            }, 100);
        }

        document.addEventListener('dialog.budget.hidden', handleDialogEvent);
        document.addEventListener('budget.deleted-action', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.budget.hidden', handleDialogEvent);
            document.removeEventListener('budget.deleted-action', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Budget List</h2>}
                fabAction={ [`budget`] }
            >
                <Head title="Budget List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Budget: List</div>
                                </CardTitle>
                                <CardDescription>Manage your budget</CardDescription>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    // Cancel previous request
                                    if(budgetItemAbortController instanceof AbortController){
                                        budgetItemAbortController.abort();
                                    }
                                    
                                    // Fetch Pending Count
                                    fetchBudgetData();
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>

                                {/* Add new Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('budget.edit-action', {
                                            bubbles: true,
                                        }
                                    ));
                                }}>
                                    <i className={ `fa-solid fa-plus` }></i>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={ `flex flex-col gap-6` }>
                            {/* Filter */}
                            <div className={ ` flex flex-row gap-2` }>
                                <Input placeholder={ `Search by Budget name` } value={ filterKeyword } onChange={(event) => {
                                    setFilterKeyword(event.target.value);
                                }}/>
                            </div>

                            {/* Content */}
                            <div className={ ` flex flex-col gap-4` }>
                                {(() => {
                                    let budgetElement: any[] = [];
                                    let defaultContent = <TemplateNoData></TemplateNoData>;

                                    if(contentIsLoading){
                                        for(let i = 0; i < skeletonCount; i++){
                                            budgetElement.push(
                                                <div key={ `skeleton-${i}` }>
                                                    {listSkeleton()}
                                                </div>
                                            );
                                        }
                                    } else if(budgetItem && budgetItem.length > 0){
                                        budgetItem.map((val, index) => {
                                            budgetElement.push(
                                                <div key={ `budget_item-${index}` }>
                                                    {listTemplate(val)}
                                                </div>
                                            );
                                        });
                                    }

                                    return budgetElement.length > 0 ? budgetElement : defaultContent;
                                })()}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={ `flex justify-between items-center` }>
                        {/* Footer */}
                        <Button
                            variant={ `outline` }
                            className={ `dark:border-white` }
                            disabled={ !paginateState }
                            onClick={() => {
                                setPaginateState(false);
                                setPaginate(paginate + paginate_item);
                            }}
                        >Load more</Button>
                        {(() => {
                            if(budgetCountShown > 0 && budgetCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {budgetCountShown} of {budgetCountTotal} entries</span>
                                </>;
                            }

                            return <></>
                        })()}
                    </CardFooter>
                </Card>
            </SystemLayout>
        </>
    );
}