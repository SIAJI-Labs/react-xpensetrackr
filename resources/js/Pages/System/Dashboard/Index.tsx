import SystemLayout from '@/Layouts/SystemLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Skeleton } from '@/Components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';
import RecordItem from '@/Components/template/RecordItem';

export default function Dashboard({ auth, inspire = '' }: PageProps) {
    // Record List - Variable Init
    const [recordFilter, setRecordFilter] = useState<string>('complete');
    const [recordIsLoading, setRecordIsLoading] = useState<boolean>(true);
    const [recordSkeletonCount, setRecordSkeletonCount] = useState<number>(5);
    
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
    let recordListTemplate = <RecordItem></RecordItem>;
    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        setRecordIsLoading(false);
        // Update skeleton count to match loaded record item
        setRecordSkeletonCount(1);
    }, 1000);

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
                                    setRecordFilter('complete');
                                    setRecordIsLoading(!recordIsLoading);
                                }}
                            >Complete</Button>

                            <Button
                                variant={ recordFilter === 'pending' ? `default` : `outline` }
                                onClick={() => {
                                    setRecordFilter('pending');
                                    setRecordIsLoading(!recordIsLoading);
                                }}
                                className={ ` flex flex-row gap-1` }
                            >
                                <span>Pending</span>
                                <Badge className={ `${recordFilter === 'pending' ? ' bg-white text-primary' : null} leading-none p-0 h-4 w-4 flex items-center justify-center` }>5</Badge>
                            </Button>
                        </div>

                        {/* Filtered Content */}
                        <div className={ ` flex flex-col gap-4` }>
                            {(() => {
                                if(recordIsLoading){
                                    let element = [];
                                    for(let i = 0; i < recordSkeletonCount; i++){
                                        element.push(
                                            <div key={ `skeleton-${i}` }>
                                                {skeletonTemplate}
                                            </div>
                                        );
                                    }

                                    return element;
                                } else {
                                    // Return 
                                    return <>{recordListTemplate}</>;
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
