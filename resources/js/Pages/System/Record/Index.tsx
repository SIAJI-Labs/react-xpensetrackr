import { PageProps, RecordItem } from '@/types';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

// Partials
import RecordTemplate from '@/Components/template/Record/RecordTemplate';
import NoDataTemplate from '@/Components/template/NoDataTemplate';
import SystemLayout from '@/Layouts/SystemLayout';

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

// Props
type RecordIndexProps = {
}

export default function Index({ auth }: PageProps<RecordIndexProps>) {
    // Record Dialog
    const [openRecordDialog, setOpenRecordDialog] = useState<boolean>(false);

    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <RecordTemplate record={obj}></RecordTemplate>;
    }
    // Record List - Skeleton
    let skeletonTemplate = <>
        <div className={ ` flex flex-col gap-2 border rounded p-4` }>
            <div className={ ` flex flex-row justify-between` }>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />

                <div className={ ` flex flex-row gap-2` }>
                    <Skeleton className="w-[75px] h-[20px] rounded-full" />
                    <Skeleton className="w-[10px] h-[20px] rounded-full" />
                </div>
            </div>

            <div className={ ` flex flex-row gap-4 items-center` }>
                <div className={ `` }>
                    <Skeleton className="w-[50px] h-[50px] rounded-full" />
                </div>
                <div className={ ` flex flex-col gap-2` }>
                    <Skeleton className="w-[150px] h-[15px] rounded-full" />
                    <Skeleton className="w-[75px] h-[10px] rounded-full" />
                </div>
            </div>

            <div className={ ` flex flex-row gap-4` }>
                <Skeleton className="w-[50px] h-[20px] rounded-full" />
                <Skeleton className="w-[50px] h-[20px] rounded-full" />
                <Skeleton className="w-[50px] h-[20px] rounded-full" />
            </div>
        </div>
    </>;

    // Record Filter
    const [recordFilterKeyword, setRecordFilterKeyword] = useState<string>('');
    const [recordFilterStatus, setRecordFilterStatus] = useState<string>('complete');
    useEffect(() => {
        const timer = setTimeout(() => {
            setRecordPaginate(paginate_item);
            fetchRecordList();
        }, 500);

        // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
        return () => {
            clearTimeout(timer);
        };
    }, [recordFilterKeyword]);
    // Record List - Variable Init
    let paginate_item = 5;
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
            filter_status: recordFilterStatus,
            keyword: recordFilterKeyword
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
        const handleDialogRecord = () => {
            setTimeout(() => {
                console.log('Dialog Event');

                fetchRecordList();
                // Open dialog state
                setOpenRecordDialog(false);
            }, 100);
        }

        document.addEventListener('dialog.record.hidden', handleDialogRecord);
        document.addEventListener('record.deleted-action', handleDialogRecord);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.hidden', handleDialogRecord);
            document.removeEventListener('record.deleted-action', handleDialogRecord);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Record List</h2>}
            >
                <Head title="Record List" />

                <div className="flex flex-col gap-6">
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
                                    {(() => {
                                        return <Button variant={ `outline` } onClick={() => {
                                            // Cancel previous request
                                            if(recordItemAbortController instanceof AbortController){
                                                recordItemAbortController.abort();
                                            }
                                            
                                            // Fetch Pending Count
                                            fetchRecordList();
                                        }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                                    })()}
                                    <Button variant={ `outline` } onClick={() => {
                                        document.dispatchEvent(new CustomEvent('recordDialogEditAction', {
                                                bubbles: true,
                                            }
                                        ));
                                    }}>
                                        <i className={ `fa-solid fa-plus` }></i>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className={ ` flex flex-col gap-6` }>
                            {/* Filter */}
                            <div className={ ` flex flex-row gap-4` }>
                                <Input placeholder={ `Search by record notes` } value={recordFilterKeyword} onChange={(event) => {
                                    setRecordFilterKeyword(event.target.value);
                                }}/>

                                <Button>
                                    <i className={ `fa-solid fa-filter` }></i>
                                </Button>
                            </div>

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
                                        let defaultContent = <NoDataTemplate></NoDataTemplate>;
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
                        <CardFooter>
                            <Button
                                variant={ `outline` }
                                className={ `` }
                                disabled={ !recordPaginateState }
                                onClick={() => {
                                    setRecordPaginateState(false);
                                    setRecordPaginate(recordPaginate + paginate_item);
                                }}
                            >Load more</Button>
                        </CardFooter>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}