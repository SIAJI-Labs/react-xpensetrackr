import { useIsFirstRender } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import axios from "axios";

// Partials
import SystemLayout from "@/Layouts/SystemLayout";
import SkeletonList from "@/Components/template/WalletGroup/SkeletonList";
import TemplateList from "@/Components/template/WalletGroup/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";

// Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Props
type ViewProps = {
}

export default function Index({ auth }: PageProps<ViewProps>) {
    const isFirstRender = useIsFirstRender();
    const [contentIsLoading, setContentIsLoading] = useState<boolean>(true);
    useEffect(() => {
        // Run on tab changed
        fetchWalletGroupData();
    }, []);

    // Keyword Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPaginate(paginate_item);
                fetchWalletGroupData();
            }, 500);
    
            // Clean up the timer if the component unmounts or when recordFilterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [filterKeyword]);

    // Wallet Data
    const [walletGroupItemAbortController, setWalletGroupItemAbortController] = useState<AbortController | null>(null);
    const [walletGroupIsLoading, setWalletGroupIsLoading] = useState<boolean>(true);
    const [walletGroupItem, setWalletItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [walletGroupCountShown, setWalletGroupCountShown] = useState<number>(0);
    const [walletGroupCountTotal, setWalletGroupCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchWalletGroupData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(walletGroupItemAbortController instanceof AbortController){
            walletGroupItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletGroupItemAbortController(abortController);

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
            const response = await axios.get(`${route('api.wallet-group.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setWalletItem(jsonResponse.result.data);
            // Update load more state
            setPaginateState(jsonResponse.result.has_more);
            // Update shown
            setWalletGroupCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setWalletGroupCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);

            // Clear the AbortController from state
            setWalletGroupItemAbortController(null);
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
            fetchWalletGroupData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <SkeletonList/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(walletGroupItem){
            setSkeletonCount(walletGroupItem.length > 0 ? walletGroupItem.length : 3);
        }
    }, [walletGroupItem]);
    // List Template
    let listTemplate = (obj?:any[]) => {
        return <TemplateList wallet={obj}/>;
    }

    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchWalletGroupData();
            }, 100);
        }

        document.addEventListener('dialog.wallet-group.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet-group.balance-adjustment.hidden', handleDialogEvent);
        document.addEventListener('wallet-group.deleted-action', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet-group.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet-group.balance-adjustment.hidden', handleDialogEvent);
            document.removeEventListener('wallet-group.deleted-action', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Group List</h2>}
                fabAction={ [`wallet-group`] }
            >
                <Head title="Wallet Group List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Wallet Group: List</div>
                                </CardTitle>
                                <CardDescription>Create a group of your wallet</CardDescription>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    // Cancel previous request
                                    if(walletGroupItemAbortController instanceof AbortController){
                                        walletGroupItemAbortController.abort();
                                    }
                                    
                                    fetchWalletGroupData();
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>
                                
                                {/* Add new Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('wallet-group.edit-action', {
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
                                <Input placeholder={ `Search by Group name` } value={ filterKeyword } onChange={(event) => {
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
                                        let walletElement: any[] = [];
                                        let defaultContent = <TemplateNoData></TemplateNoData>;

                                        // Loop through response
                                        if(walletGroupItem && walletGroupItem.length > 0){
                                            walletGroupItem.map((val, index) => {
                                                walletElement.push(
                                                    <div key={ `walletGroup_item-${index}` }>
                                                        {listTemplate(val)}
                                                    </div>
                                                );
                                            });
                                        }

                                        return walletElement.length > 0 ? walletElement : defaultContent;
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
                            if(walletGroupCountShown > 0 && walletGroupCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {walletGroupCountShown} of {walletGroupCountTotal} entries</span>
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