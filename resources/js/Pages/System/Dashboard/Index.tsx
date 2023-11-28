import SystemLayout from '@/Layouts/SystemLayout';
import { PageProps, RecordItem } from '@/types';
import { useIsFirstRender } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

// Partials
import TemplateListRecord from '@/Components/template/Record/TemplateList';
import TemplateNoData from '@/Components/template/TemplateNoData';

// Shadcn Component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import SkeletonList from '@/Components/template/Record/SkeletonList';

type ContentProps = {
    inspire: string,
}

export default function Dashboard({ auth, inspire = '' }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();

    // Record List - Variable Init
    const [recordFilterStatus, setRecordFilterStatus] = useState<string>('complete');
    const [recordIsLoading, setRecordIsLoading] = useState<boolean>(true);
    const [recordSkeletonCount, setRecordSkeletonCount] = useState<number>(5);
    const [recordItem, setRecordItem] = useState([]);
    const [recordItemAbortController, setRecordItemAbortController] = useState<AbortController | null>(null);
    const [recordPendingCount, setRecordPendingCount] = useState<number>(0);
    
    // Record List - Skeleton
    let skeletonTemplate = <SkeletonList/>;
    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <TemplateListRecord record={obj}></TemplateListRecord>;
    }
    // Create API Call
    const fetchRecordList = async () => {
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
            limit: 10,
            filter_status: recordFilterStatus
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
        // Update skeleton count to match loaded record item
        setRecordSkeletonCount(recordItem.length > 0 ? recordItem.length : 3);
    }, [recordItem]);

    // Create Request to check pending count
    useEffect(() => {
        if(!isFirstRender){
            // Update record list
            fetchPendingCount();
        }
    }, [recordFilterStatus]);
    const fetchPendingCount = async () => {
        try {
            const response = await axios.get(route('api.record.v1.count-pending'));
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setRecordPendingCount(jsonResponse?.result?.data);

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
        fetchPendingCount();
    }, []);
    
    useEffect(() => {
        if(!isFirstRender){
            // Listen to Record Dialog event
            const handleDialogRecord = (event: any) => {
                setTimeout(() => {
                    // Update record list
                    fetchPendingCount();
                }, 100);
            }
            document.addEventListener('dialog.record.hidden', handleDialogRecord);
            document.addEventListener('record.deleted-action', handleDialogRecord);

            // Remove the event listener when the component unmounts
            return () => {
                document.removeEventListener('dialog.record.hidden', handleDialogRecord);
                document.removeEventListener('record.deleted-action', handleDialogRecord);
            };
        }
    });

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome page & Quotes */}
                <Card className={ `` }>
                    <CardHeader className={ `` }>
                        <div className={ `flex flex-col space-y-2 ` }>
                            <CardTitle><span className={ ` font-light` }>Hi</span> <span className={ ` font-semibold` }>{auth.user.name}</span>,</CardTitle>
                            <CardDescription>how's doing? 👋</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{ __html: inspire }} className={ ` p-4 rounded-lg bg-gray-100 dark:bg-background dark:border` }></div>
                    </CardContent>
                </Card>

                {/* Record List */}
                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-center` }>
                            <div>
                                <CardTitle>
                                    <div>Record: List</div>
                                </CardTitle>
                                <CardDescription>See your latest transaction</CardDescription>
                            </div>
                            <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={($refs) => {
                                // Cancel previous request
                                if(recordItemAbortController instanceof AbortController){
                                    recordItemAbortController.abort();
                                }
                                
                                // Fetch Pending Count
                                fetchPendingCount();
                            }}><i className={ `fa-solid fa-rotate-right` }></i></Button>
                        </div>
                    </CardHeader>
                    <CardContent className={ ` flex flex-col gap-6` }>
                        {/* Filter Button */}
                        <div className={ ` flex flex-row gap-4` } id={ `dashboard-recordList` }>
                            <Button
                                variant={ recordFilterStatus === 'complete' ? `default` : `outline` }
                                onClick={() => {
                                    if(recordFilterStatus !== 'complete'){
                                        setRecordFilterStatus('complete');
                                        setRecordIsLoading(!recordIsLoading);
                                    }
                                }}
                                className={ ` ` }
                            >Complete</Button>

                            <Button
                                variant={ recordFilterStatus === 'pending' ? `default` : `outline` }
                                onClick={() => {
                                    if(recordFilterStatus !== 'pending'){
                                        setRecordFilterStatus('pending');
                                        setRecordIsLoading(!recordIsLoading);
                                    }
                                }}
                                className={ ` flex flex-row gap-1 ` }
                            >
                                <span>Pending</span>
                                {(() => {
                                    if(recordPendingCount > 0){
                                        return <>
                                            <Badge className={ `${recordFilterStatus === 'pending' ? ' bg-white text-primary' : null} leading-none p-0 h-4 w-4 flex items-center justify-center` }>{recordPendingCount}</Badge>
                                        </>;
                                    }

                                    return <></>;
                                })()}
                            </Button>
                        </div>

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
                                    let defaultContent = <TemplateNoData></TemplateNoData>;
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

                    {(() => {
                        if(!recordIsLoading){
                            return <>
                                <CardFooter>
                                    <Link href={ route('sys.record.index') }>
                                        <Button variant={ `outline` } className={ `` }>Load all</Button>
                                    </Link>
                                </CardFooter>
                            </>;
                        }

                        return <></>;
                    })()}
                </Card>
            </div>
        </SystemLayout>
    );
}
