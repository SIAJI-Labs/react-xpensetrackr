import { useIsFirstRender } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types"
import axios from "axios";

// Partials
import WalletSkeleton from "@/Components/template/Wallet/SkeletonList";
import WalletTemplate from "@/Components/template/Wallet/TemplateList";
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
        fetchWalletData();
    }, []);

    // Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    useEffect(() => {
        if(!isFirstRender){
            const timer = setTimeout(() => {
                setPaginate(paginate_item);
                fetchWalletData();
            }, 500);
    
            // Clean up the timer if the component unmounts or when filterKeyword changes.
            return () => {
                clearTimeout(timer);
            };
        }
    }, [filterKeyword]);

    // Wallet Data
    const [walletItemAbortController, setWalletItemAbortController] = useState<AbortController | null>(null);
    const [walletItem, setWalletItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
    const [walletCountShown, setWalletCountShown] = useState<number>(0);
    const [walletCountTotal, setWalletCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchWalletData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(walletItemAbortController instanceof AbortController){
            walletItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setWalletItemAbortController(abortController);

        // Build request parameter
        const query = [];
        const obj = {
            limit: paginate,
            keyword: filterKeyword
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.wallet.v1.list')}?${query.join('&')}`, {
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
            setWalletCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setWalletCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);
            // Clear the AbortController from state
            setWalletItemAbortController(null);
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
            fetchWalletData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <WalletSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded item
        if(walletItem){
            setSkeletonCount(walletItem.length > 0 ? walletItem.length : 3);
        }
    }, [walletItem]);

    // List Template
    let listTemplate = (obj?:any[]) => {
        return <WalletTemplate wallet={obj}/>;
    }

    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchWalletData();
            }, 100);
        }

        document.addEventListener('dialog.wallet.hidden', handleDialogEvent);
        document.addEventListener('wallet.deleted-action', handleDialogEvent);
        document.addEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

        document.addEventListener('dialog.record.hidden', handleDialogEvent);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.hidden', handleDialogEvent);
            document.removeEventListener('wallet.deleted-action', handleDialogEvent);
            document.removeEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);

            document.removeEventListener('dialog.record.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet List</h2>}
                fabAction={ [`wallet`] }
            >
                <Head title="Wallet List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Wallet: List</div>
                                </CardTitle>
                                <CardDescription>List of your available Categories</CardDescription>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    // Cancel previous request
                                    if(walletItemAbortController instanceof AbortController){
                                        walletItemAbortController.abort();
                                    }
                                    
                                    // Fetch Pending Count
                                    fetchWalletData();
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>

                                {/* Add new Button */}
                                <Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('wallet.edit-action', {
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
                                <Input placeholder={ `Search by Wallet name` } value={ filterKeyword } onChange={(event) => {
                                    setFilterKeyword(event.target.value);
                                }}/>

                                <div className={ ` flex flex-row gap-2` }>
                                    <Link href={ route('sys.wallet.re-order.index') } className={ `aspect-square` }>
                                        <Button variant={ `outline` } className={ ` w-10 aspect-square` }>
                                            <i className={ `fa-solid fa-sort` }></i>
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={ ` flex flex-col gap-4` }>
                                {(() => {
                                    let walletElement: any[] = [];
                                    let defaultContent = <TemplateNoData></TemplateNoData>;

                                    if(contentIsLoading){
                                        for(let i = 0; i < skeletonCount; i++){
                                            walletElement.push(
                                                <div key={ `skeleton-${i}` }>
                                                    {listSkeleton()}
                                                </div>
                                            );
                                        }
                                    } else if(walletItem && walletItem.length > 0){
                                        walletItem.map((val, index) => {
                                            walletElement.push(
                                                <div key={ `wallet_item-${index}` }>
                                                    {listTemplate(val)}
                                                </div>
                                            );
                                        });
                                    }

                                    return walletElement.length > 0 ? walletElement : defaultContent;
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
                            if(walletCountShown > 0 && walletCountTotal > 0){
                                return <>
                                    <span className={ `text-sm` }>Showing {walletCountShown} of {walletCountTotal} entries</span>
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