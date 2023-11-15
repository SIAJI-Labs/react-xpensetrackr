import { Head } from "@inertiajs/react";
import { PageProps } from "@/types"

// Partials
import SystemLayout from "@/Layouts/SystemLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import ListSkeleton from "@/Components/template/Wallet/ListSkeleton";
import { useEffect, useState } from "react";
import { useIsFirstRender } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import ListTemplate from "@/Components/template/Wallet/ListTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import axios from "axios";

// Props
type WalletIndexProps = {
}

export default function Index({ auth }: PageProps<WalletIndexProps>) {
    const isFirstRender = useIsFirstRender();
    const [contentIsLoading, setContentIsLoading] = useState<boolean>(true);
    useEffect(() => {
        // Run on tab changed
        fetchWalletData();
    }, []);

    // Record Filter
    const [filterKeyword, setFilterKeyword] = useState<string>('');

    // Wallet Data
    const [walletItemAbortController, setWalletItemAbortController] = useState<AbortController | null>(null);
    const [walletIsLoading, setWalletIsLoading] = useState<boolean>(true);
    const [walletItem, setWalletItem] = useState<any[]>();
    // Paginaton
    let paginate_item = 5;
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

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <ListSkeleton/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded planned item
        if(walletItem){
            setSkeletonCount(walletItem.length > 0 ? walletItem.length : 3);
        }
    }, [walletItem]);
    // List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate wallet={obj}/>;
    }

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet List</h2>}
            >
                <Head title="Wallet List" />

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                    <div>Wallet: List</div>
                                </CardTitle>
                            </div>
                            <div className={ `flex items-center gap-2` }>
                                {/* Refresh Button */}
                                {(() => {
                                    return <Button variant={ `outline` } onClick={() => {
                                        document.dispatchEvent(new CustomEvent('wallet.refresh', {bubbles: true}));
                                    }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                                })()}
                                {/* Add new Button */}
                                <Button variant={ `outline` } onClick={() => {
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
                            <div className={ ` flex flex-row gap-4` }>
                                <Input placeholder={ `Search by Wallet name` } value={ filterKeyword } onChange={(event) => {
                                    setFilterKeyword(event.target.value);
                                }}/>

                                <Button>
                                    <i className={ `fa-solid fa-filter` }></i>
                                </Button>
                            </div>
                            {/* Content */}
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
                                    let defaultContent = <NoDataTemplate></NoDataTemplate>;

                                    // Loop through response
                                    if(walletItem && walletItem.length > 0){
                                        walletItem.map((val, index) => {
                                            walletElement.push(
                                                <div key={ `wallet_item-${index}` }>
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
                    </CardContent>
                    <CardFooter>
                        {/* Footer */}
                        <div>
                            <Button
                                variant={ `outline` }
                                className={ `dark:border-white` }
                                disabled={ !paginateState }
                                onClick={() => {
                                    setPaginateState(false);
                                    setPaginate(paginate + paginate_item);
                                }}
                            >Load more</Button>
                        </div>
                    </CardFooter>
                </Card>
            </SystemLayout>
        </>
    );
}