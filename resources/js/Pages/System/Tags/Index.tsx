import { useIsFirstRender } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types"
import axios from "axios";

// Partials
import TagsTemplate from "@/Components/template/Tags/TemplateList";
import TagsSkeleton from "@/Components/template/Tags/SkeletonList";
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
        fetchTagsData();
    }, []);

    // Record Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPaginate(paginate_item);
                fetchTagsData();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [filterKeyword]);

    // Tags Data
    const [tagsItemAbortController, setTagsItemAbortController] = useState<AbortController | null>(null);
    const [tagsItem, setTagsItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [tagsCountShown, setTagsCountShown] = useState<number>(0);
    const [tagsCountTotal, setTagsCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchTagsData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(tagsItemAbortController instanceof AbortController){
            tagsItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setTagsItemAbortController(abortController);

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
            const response = await axios.get(`${route('api.tags.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setTagsItem(jsonResponse.result.data);
            // Update load more state
            setPaginateState(jsonResponse.result.has_more);
            // Update shown
            setTagsCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setTagsCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);

            // Clear the AbortController from state
            setTagsItemAbortController(null);
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
            fetchTagsData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <TagsSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(tagsItem){
            setSkeletonCount(tagsItem.length > 0 ? tagsItem.length : 3);
        }
    }, [tagsItem]);
    // List Template
    let listTemplate = (obj?:any[]) => {
        return <TagsTemplate tags={obj}/>;
    }

    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchTagsData();
            }, 100);
        }

        document.addEventListener('dialog.tags.hidden', handleDialogEvent);
        document.addEventListener('tags.deleted-action', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.tags.hidden', handleDialogEvent);
            document.removeEventListener('tags.deleted-action', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tags List</h2>}
                fabAction={ [`tags`] }
            >
                <Head title="Tags List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Tags: List</div>
                                </CardTitle>
                                <CardDescription>List of your available Tags</CardDescription>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    // Cancel previous request
                                    if(tagsItemAbortController instanceof AbortController){
                                        tagsItemAbortController.abort();
                                    }
                                    
                                    // Fetch Pending Count
                                    fetchTagsData();
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>
                                {/* Add new Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('tags.edit-action', {
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
                                <Input placeholder={ `Search by Tags name` } value={ filterKeyword } onChange={(event) => {
                                    setFilterKeyword(event.target.value);
                                }}/>
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
                                    let tagsElement: any[] = [];
                                    let defaultContent = <TemplateNoData></TemplateNoData>;

                                    // Loop through response
                                    if(tagsItem && tagsItem.length > 0){
                                        tagsItem.map((val, index) => {
                                            tagsElement.push(
                                                <div key={ `tags_item-${index}` }>
                                                    {listTemplate(val)}
                                                </div>
                                            );
                                        });
                                    }

                                    return tagsElement.length > 0 ? tagsElement : defaultContent;
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
                            if(tagsCountShown > 0 && tagsCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {tagsCountShown} of {tagsCountTotal} entries</span>
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