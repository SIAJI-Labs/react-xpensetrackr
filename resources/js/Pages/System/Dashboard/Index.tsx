import SystemLayout from '@/Layouts/SystemLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, RecordItem } from '@/types';
import { useEffect, useState } from 'react';

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Skeleton } from '@/Components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';
import RecordTemplate from '@/Components/template/RecordTemplate';
import { Loader2 } from 'lucide-react';
import NoDataTemplate from '@/Components/template/NoDataTemplate';

export default function Dashboard({ auth, inspire = '' }: PageProps<{ inspire: string}>) {
    // Global Variable
    const [refreshLoading, setRefreshLoading] = useState<boolean>(false)

    // Record List - Variable Init
    const [recordFilter, setRecordFilter] = useState<string>('complete');
    const [recordIsLoading, setRecordIsLoading] = useState<boolean>(true);
    const [recordSkeletonCount, setRecordSkeletonCount] = useState<number>(5);
    const [recordItem, setRecordItem] = useState([]);
    const [recordPendingCount, setRecordPendingCount] = useState<number>(0);
    
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
    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <RecordTemplate record={obj}></RecordTemplate>;
    }
    // Simulate API call
    const fetchRecordList = async () => {
        // Build parameter
        const query = [];
        const obj = {
            limit: 5,
            filter_status: recordFilter
        }
        // } as { [key: string]: any };
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        // // Create request
        // const req = await fetch(`${route('api.record.v1.list')}?${query.join('&')}`);
        // const response = await req.json();

        // // Apply to related property
        // setRecordItem(response.result.data);

        // Remove loading state
        setRecordIsLoading(false);
    }
    
    useEffect(() => {
        fetchRecordList();
    }, [recordFilter]);
    useEffect(() => {
        // Update skeleton count to match loaded record item
        setRecordSkeletonCount(recordItem.length > 0 ? recordItem.length : 3);
    }, [recordItem]);

    // Create Request
    const fetchPending = async () => {
        setRefreshLoading(true);
        const req = await fetch(route('api.record.v1.count-pending'));
        const response = await req.json();

        setRecordPendingCount(response?.result?.data);
        setRefreshLoading(false);
    }
    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 flex flex-col gap-4">
                {/* Welcome page & Quotes */}
                <Card className={ ` shadow-sm` }>
                    <CardHeader>
                        <CardTitle>Hi <span className={ ` font-semibold` }>{auth.user.name}</span>,</CardTitle>
                        <CardDescription>how's doing? 👋</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{ __html: inspire }} className={ ` p-4 rounded-lg bg-gray-100` }></div>
                    </CardContent>
                    <CardFooter>
                        {(() => {
                            if(refreshLoading){
                                return <Button disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            }

                            return <Button variant={ `outline` } onClick={() => {
                                fetchPending();
                            }}>Refresh</Button>;
                        })()}
                    </CardFooter>
                </Card>

                {/* Record List */}
                <Card className={ ` shadow-sm` }>
                    <CardHeader>
                        <CardTitle>Record: List</CardTitle>
                        <CardDescription>See your latest transaction</CardDescription>
                    </CardHeader>
                    <CardContent className={ ` flex flex-col gap-6` }>
                        {/* Filter Button */}
                        <div className={ ` flex flex-row gap-4` } id={ `dashboard-recordList` }>
                            <Button
                                variant={ recordFilter === 'complete' ? `default` : `outline` }
                                onClick={() => {
                                    if(recordFilter !== 'complete'){
                                        setRecordFilter('complete');
                                        setRecordIsLoading(!recordIsLoading);
                                    }
                                }}
                            >Complete</Button>

                            <Button
                                variant={ recordFilter === 'pending' ? `default` : `outline` }
                                onClick={() => {
                                    if(recordFilter !== 'pending'){
                                        setRecordFilter('pending');
                                        setRecordIsLoading(!recordIsLoading);
                                    }
                                }}
                                className={ ` flex flex-row gap-1` }
                            >
                                <span>Pending</span>
                                {(() => {
                                    if(recordPendingCount > 0){
                                        return <>
                                            <Badge className={ `${recordFilter === 'pending' ? ' bg-white text-primary' : null} leading-none p-0 h-4 w-4 flex items-center justify-center` }>{recordPendingCount}</Badge>
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

                    {(() => {
                        if(!recordIsLoading){
                            return <>
                                <CardFooter>
                                    <Button variant={ `outline` }>Load more</Button>
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
