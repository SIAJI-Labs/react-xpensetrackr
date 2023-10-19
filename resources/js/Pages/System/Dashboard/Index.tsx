import SystemLayout from '@/Layouts/SystemLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

// Plugins
import moment from 'moment';

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Skeleton } from '@/Components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';

export default function Dashboard({ auth }: PageProps) {
    // Record List - Variable Init
    const [recordFilter, setRecordFilter] = useState<string>('complete');
    const [recordIsLoading, setRecordIsLoading] = useState<boolean>(true);
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
    let recordListTemplate = <>
        <div className={ ` flex flex-col gap-2 border rounded p-4` }>
            {/* Date, amount and action */}
            <div className={ ` flex flex-row justify-between` } onClick={($refs) => {
                let dropdownTrigger = ($refs.target as HTMLElement).querySelector(`[data-type="dropdown-trigger"]`);
                if(dropdownTrigger){
                    dropdownTrigger.dispatchEvent(new Event('click', { bubbles: true}));
                }
            }}>
                <span>{moment().format('MMM Do, YYYY / HH:mm')}</span>

                <div className={ ` flex flex-row gap-2 items-center` }>
                    <span>Rp 10.000</span>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className={ ` p-0 h-auto leading-none` } data-type="dropdown-trigger">
                                    <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={5} side={ `left` } align={ `start` }>
                                <DropdownMenuItem>
                                    <Link href={ `` }>Detail</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={ `` }>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={ `` }>Delete</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Icon, Category, Notes */}
            <div className={ ` flex flex-row gap-4 items-center` }>
                <div className={ ` p-3 h-10 w-10 rounded-full bg-red-500 flex items-center justify-center` }>
                    <i className={ `fa-solid fa-right-from-bracket -rotate-90 text-white` }></i>
                </div>

                <div className={ ` w-full flex flex-col overflow-hidden` }>
                    <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis` }>Uncategorized</span>
                    <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>Balance</span>
                </div>
            </div>

            {/* Extra Information */}
            <div className={ ` mt-2 flex flex-row gap-2` }>
                <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                    <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                    <span>Expense</span>
                </Badge>
                <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                    <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                    <span>Cash</span>
                </Badge>
                <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                    <i className={ `fa-solid fa-align-left leading-none text-xs` }></i>
                    <span>Notes</span>
                </Badge>
            </div>
        </div>
    </>
    setTimeout(() => {
        setRecordIsLoading(false);
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
                    <CardContent className={ `pt-6` }>
                        <span>Hi <span className={ ` font-semibold` }>{auth.user.name}</span>, how's doing? 👋</span>
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
                            >Pending</Button>
                        </div>

                        {/* Filtered Content */}
                        <div className={ ` flex flex-col gap-4` }>
                            {(() => {
                                if(recordIsLoading){
                                    let element = [];
                                    for(let i = 0; i < 5; i++){
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
                </Card>
            </div>
        </SystemLayout>
    );
}
