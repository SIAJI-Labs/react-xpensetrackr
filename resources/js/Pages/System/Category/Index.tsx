import { useIsFirstRender } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types"
import axios from "axios";

// Partials
import ListTemplate from "@/Components/template/Category/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import ListSkeleton from "@/Components/template/Category/SkeletonList";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Props
type CategoryIndexProps = {
}

export default function Index({ auth }: PageProps<CategoryIndexProps>) {
    const isFirstRender = useIsFirstRender();
    const [contentIsLoading, setContentIsLoading] = useState<boolean>(true);
    useEffect(() => {
        // Run on tab changed
        fetchCategoryData();
    }, []);

    // Record Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPaginate(paginate_item);
                fetchCategoryData();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [filterKeyword]);

    // Category Data
    const [categoryItemAbortController, setCategoryItemAbortController] = useState<AbortController | null>(null);
    const [categoryIsLoading, setCategoryIsLoading] = useState<boolean>(true);
    const [categoryItem, setCategoryItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [categoryCountShown, setCategoryCountShown] = useState<number>(0);
    const [categoryCountTotal, setCategoryCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchCategoryData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(categoryItemAbortController instanceof AbortController){
            categoryItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setCategoryItemAbortController(abortController);

        // Build parameter
        const query = [];
        const obj = {
            limit: paginate,
            keyword: filterKeyword
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
            let jsonResponse = response.data;
            setCategoryItem(jsonResponse.result.data);
            // Update load more state
            setPaginateState(jsonResponse.result.has_more);
            // Update shown
            setCategoryCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setCategoryCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);

            // Clear the AbortController from state
            setCategoryItemAbortController(null);
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
            fetchCategoryData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <ListSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(categoryItem){
            setSkeletonCount(categoryItem.length > 0 ? categoryItem.length : 3);
        }
    }, [categoryItem]);
    // List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate category={obj}/>;
    }

    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogRecord = () => {
            setTimeout(() => {
                fetchCategoryData();
            }, 100);
        }

        document.addEventListener('dialog.category.hidden', handleDialogRecord);
        document.addEventListener('category.deleted-action', handleDialogRecord);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.category.hidden', handleDialogRecord);
            document.removeEventListener('category.deleted-action', handleDialogRecord);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category List</h2>}
                fabAction={ [`category`] }
            >
                <Head title="Category List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Category: List</div>
                                </CardTitle>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                {(() => {
                                    return <Button variant={ `outline` } onClick={() => {
                                        // Cancel previous request
                                        if(categoryItemAbortController instanceof AbortController){
                                            categoryItemAbortController.abort();
                                        }
                                        
                                        // Fetch Pending Count
                                        fetchCategoryData();
                                    }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                                })()}
                                {/* Add new Button */}
                                <Button variant={ `outline` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('category.edit-action', {
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
                            <div className={ ` flex flex-row gap-4` }>
                                <Input placeholder={ `Search by Category name` } value={ filterKeyword } onChange={(event) => {
                                    setFilterKeyword(event.target.value);
                                }}/>

                                <Button disabled>
                                    <i className={ `fa-solid fa-filter` }></i>
                                </Button>
                                <Link href={ route('sys.category.re-order.index') }>
                                    <Button variant={ `outline` }>
                                        <i className={ `fa-solid fa-sort` }></i>
                                    </Button>
                                </Link>
                            </div>
                            {/* Content */}
                            <div className={ ` flex flex-col gap-4` }>
                            {(() => {
                                if(contentIsLoading){
                                    let element: any[] = [];
                                    for(let i = 0; i < skeletonCount; i++){
                                        element.push(
                                            <div key={ `skeleton-${i}` }>
                                                {listSkeleton()}
                                            </div>
                                        );
                                    }

                                    return element;
                                } else {
                                    let categoryElement: any[] = [];
                                    let defaultContent = <TemplateNoData></TemplateNoData>;

                                    // Loop through response
                                    if(categoryItem && categoryItem.length > 0){
                                        categoryItem.map((val, index) => {
                                            categoryElement.push(
                                                <div key={ `category_item-${index}` }>
                                                    {listTemplate(val)}
                                                </div>
                                            );
                                        });
                                    }

                                    return categoryElement.length > 0 ? categoryElement : defaultContent;
                                }

                                return <></>;
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
                            if(categoryCountShown > 0 && categoryCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {categoryCountShown} of {categoryCountTotal} entries</span>
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