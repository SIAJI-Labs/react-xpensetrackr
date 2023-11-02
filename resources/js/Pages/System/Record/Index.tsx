import { PageProps, RecordItem } from '@/types';
import { Head } from '@inertiajs/react';

// Partials
import SystemLayout from '@/Layouts/SystemLayout';
import RecordTemplate from '@/Components/template/RecordTemplate';
import { useEffect, useState } from 'react';

// Shadcn
import { Skeleton } from '@/Components/ui/skeleton';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import NoDataTemplate from '@/Components/template/NoDataTemplate';

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

    // Record List - Variable Init
    const [recordPaginate, setRecordPaginate] = useState<number>(5);
    const [recordFilter, setRecordFilter] = useState<string>('complete');
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

        setRecordIsLoading(true);

        // Build parameter
        const query = [];
        const obj = {
            limit: recordPaginate,
            filter_status: recordFilter
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
    // Create Request to check pending count
    const fetchPending = async () => {

        try {
            const response = await axios.get(route('api.record.v1.count-pending'));
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            // setRecordPendingCount(jsonResponse?.result?.data);
            // setRefreshLoading(false);

            // Fetch newest record-item
            fetchRecordList();
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
        // First fetch pending count
        fetchPending();

        // Listen to Record Dialog event
        const handleDialogRecord = () => {
            setTimeout(() => {
                // Update record list
                fetchPending();
                // Open dialog state
                setOpenRecordDialog(false);
            }, 100);
        }
        window.addEventListener('dialogRecord', handleDialogRecord);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('dialogRecord', handleDialogRecord);
        };
    }, []);

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
                            <div className={ ` flex flex-row justify-between items-center` }>
                                <div>
                                    <CardTitle>
                                            <div>Record: List</div>
                                    </CardTitle>
                                    <CardDescription>See your latest transaction</CardDescription>
                                </div>

                                {(() => {
                                    // if(refreshLoading){
                                    //     return <Button disabled>
                                    //         <Loader2 className="h-4 w-4 animate-spin" />
                                    //     </Button>
                                    // }

                                    return <Button variant={ `outline` } onClick={() => {
                                        // Cancel previous request
                                        if(recordItemAbortController instanceof AbortController){
                                            recordItemAbortController.abort();
                                        }
                                        
                                        // Fetch Pending Count
                                        fetchPending();
                                    }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                                })()}
                            </div>
                        </CardHeader>
                        <CardContent className={ ` flex flex-col gap-6` }>
                            {/* Filtered Content */}
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
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}