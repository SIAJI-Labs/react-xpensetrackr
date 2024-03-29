import { PageProps, RecordItem } from '@/types';
import { useIsFirstRender } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

// Plugins
import { ucwords } from '@/function';

// Partials
import RecordTemplate from '@/Components/template/Record/TemplateList';
import RecordSkeleton from '@/Components/template/Record/SkeletonList';
import TemplateNoData from '@/Components/template/TemplateNoData';
import SystemLayout from '@/Layouts/SystemLayout';

// Shadcn
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import Filter from './Partials/Filter';

// Props
type ContentProps = {
    type?: string
}

export default function Index({ auth, type = 'complete' }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();
    // Record List - Template
    const recordListTemplate = (obj:RecordItem) => {
        return <RecordTemplate record={obj}></RecordTemplate>;
    }
    // Record List - Skeleton
    let skeletonTemplate = <RecordSkeleton/>;

    // Record Filter
    const [recordFilterOpen, setRecordFilterOpen] = useState<boolean>(false);
    const [recordFilterKeyword, setRecordFilterKeyword] = useState<string>('');
    const [recordFilterStatus, setRecordFilterStatus] = useState<string>(type);
    const [recordFilterFromWallet, setRecordFilterFromWallet] = useState<any[]>([]);
    const [recordFilterToWallet, setRecordFilterToWallet] = useState<any[]>([]);
    const [recordFilterCategory, setRecordFilterCategory] = useState<any[]>([]);
    const [recordFilterTags, setRecordFilterTags] = useState<any[]>([]);
    const handleReloadData = () => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setRecordPaginate(paginate_item);
                fetchRecordList();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }
    useEffect(() => {
        handleReloadData();
    }, [recordFilterKeyword]);
    useEffect(() => {
        if(!recordFilterOpen){
            handleReloadData();
        }
    }, [recordFilterOpen]);

    // Record List - Variable Init
    let paginate_item = 5;
    const [recordCountShown, setRalletCountShown] = useState<number>(0);
    const [recordCountTotal, setRalletCountTotal] = useState<number>(0);
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

        // Apply fromWallet filter
        const filteredFromWallet = recordFilterFromWallet.filter((value) => 'uuid' in value);
        filteredFromWallet.forEach((value, index) => {
            query.push(`filter_from_wallet[${index}] = ${value.uuid}`);
        });
        // Apply toWallet filter
        const filteredToWallet = recordFilterToWallet.filter((value) => 'uuid' in value);
        filteredToWallet.forEach((value, index) => {
            query.push(`filter_to_wallet[${index}] = ${value.uuid}`);
        });
        // Apply category filter
        const filteredCategory = recordFilterCategory.filter((value) => 'uuid' in value);
        filteredCategory.forEach((value, index) => {
            query.push(`filter_category[${index}] = ${value.uuid}`);
        });
        // Apply tags filter
        const filteredTags = recordFilterTags.filter((value) => 'uuid' in value);
        filteredTags.forEach((value, index) => {
            query.push(`filter_tags[${index}] = ${value.uuid}`);
        });

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
            // Update shown
            setRalletCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setRalletCountTotal(jsonResponse.result.total);
            }

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
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchRecordList();
            }, 100);
        }

        document.addEventListener('dialog.record.hidden', handleDialogEvent);
        document.addEventListener('record.deleted-action', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.hidden', handleDialogEvent);
            document.removeEventListener('record.deleted-action', handleDialogEvent);
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
                                    <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                        // Cancel previous request
                                        if(recordItemAbortController instanceof AbortController){
                                            recordItemAbortController.abort();
                                        }
                                        
                                        // Fetch Pending Count
                                        fetchRecordList();
                                    }}><i className={ `fa-solid fa-rotate-right` }></i></Button>

                                    <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                        document.dispatchEvent(new CustomEvent('record.edit-action', {
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
                            <div className={ ` flex flex-row gap-2` }>
                                <Input placeholder={ `Search by record notes` } value={recordFilterKeyword} onChange={(event) => {
                                    setRecordFilterKeyword(event.target.value);
                                }}/>

                                <Filter
                                    openState={ recordFilterOpen } setOpenState={ setRecordFilterOpen }

                                    filterStatus={ recordFilterStatus } setFilterStatus={ setRecordFilterStatus }
                                    filterFromWallet={ recordFilterFromWallet } setFilterFromWallet={ setRecordFilterFromWallet }
                                    filterToWallet={ recordFilterToWallet } setFilterToWallet={ setRecordFilterToWallet }
                                    filterCategory={ recordFilterCategory } setFilterCategory={ setRecordFilterCategory }
                                    filterTags={ recordFilterTags } setFilterTags={ setRecordFilterTags }
                                />
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

                        <CardFooter className={ `flex justify-between items-center` }>
                            <Button
                                variant={ `outline` }
                                className={ `` }
                                disabled={ !recordPaginateState }
                                onClick={() => {
                                    setRecordPaginateState(false);
                                    setRecordPaginate(recordPaginate + paginate_item);
                                }}
                            >Load more</Button>

                            {(() => {
                                if(recordCountShown > 0 && recordCountTotal > 0){
                                    return <>
                                        <span className={ `text-sm` }>Showing {recordCountShown} of {recordCountTotal} entries</span>
                                    </>;
                                }

                                return <></>
                            })()}
                        </CardFooter>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}