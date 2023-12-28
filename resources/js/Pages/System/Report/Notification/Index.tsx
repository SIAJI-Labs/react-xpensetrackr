import SystemLayout from '@/Layouts/SystemLayout';
import { NotificationItem, PageProps, RecordItem } from '@/types';
import { useIsFirstRender } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Partials
import TemplateNoData from '@/Components/template/TemplateNoData';

// Shadcn Component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import SkeletonList from '@/Components/template/Notification/SkeletonList';
import TemplateList from '@/Components/template/Notification/TemplateList';
import { Button } from '@/Components/ui/button';

type ContentProps = {
    inspire: string,
}

export default function Notification({ auth, inspire = '' }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();
    const [contentIsLoading, setContentIsLoading] = useState<boolean>(true);
    useEffect(() => {
        fetchNotificationData();
    }, []);

    // Notification Data
    const [notificationItemAbortController, setNotificationItemAbortController] = useState<AbortController | null>(null);
    const [notificationItem, setNotificationItem] = useState<any[]>();

    // Paginaton
    let paginate_item = 5;
    const [notificationCountShown, setNotificationCountShown] = useState<number>(0);
    const [notificationCountTotal, setNotificationCountTotal] = useState<number>(0);
    const [paginate, setPaginate] = useState<number>(paginate_item);
    const [paginateState, setPaginateState] = useState<boolean>(false);
    const fetchNotificationData = async() => {
        // Show skeleton
        setContentIsLoading(true);

        // Cancel previous request
        if(notificationItemAbortController instanceof AbortController){
            notificationItemAbortController.abort();
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setNotificationItemAbortController(abortController);

        // Build parameter
        const query = [];
        const obj = {
            limit: paginate,
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.report.notification.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            setNotificationItem(jsonResponse.result.data);
            // Update load more state
            setPaginateState(jsonResponse.result.has_more);
            // Update shown
            setNotificationCountShown((jsonResponse.result.data).length);
            if('total' in jsonResponse.result){
                setNotificationCountTotal(jsonResponse.result.total);
            }

            // Remove loading state
            setContentIsLoading(false);

            // Clear the AbortController from state
            setNotificationItemAbortController(null);
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
            fetchNotificationData();
        }
    }, [paginate]);

    // List Skeleton
    const [skeletonCount, setSkeletonCount] = useState<number>(5);
    let listSkeleton = () => {
        return <SkeletonList/>
    }
    useEffect(() => {
        // Update skeleton count to match loaded item
        if(notificationItem){
            setSkeletonCount(notificationItem.length > 0 ? notificationItem.length : 3);
        }
    }, [notificationItem]);
    // List Template
    let listTemplate = (obj?:NotificationItem) => {
        return <TemplateList notification={obj}/>;
    }

    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                fetchNotificationData();
            }, 100);
        }

        document.addEventListener('dialog.notification.hidden', handleDialogEvent);
        document.addEventListener('notification.update', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.notification.hidden', handleDialogEvent);
            document.removeEventListener('notification.update', handleDialogEvent);
        };
    });

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notification</h2>}
        >
            <Head title="Notification" />

            <Card>
                <CardHeader>
                    <CardTitle>Notification List</CardTitle>
                    <CardDescription>See your notification list</CardDescription>
                </CardHeader>
                <CardContent className={ ` flex flex-col gap-4` }>
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
                            let notificationElement: any[] = [];

                            // Loop through response
                            if(notificationItem && notificationItem.length > 0){
                                notificationItem.map((val, index) => {
                                    notificationElement.push(
                                        <div key={ `notification_item-${index}` }>
                                            {listTemplate(val)}
                                        </div>
                                    );
                                });
                            }

                            if(notificationElement.length > 0){
                                return notificationElement;
                            }
                        }

                        return <TemplateNoData/>;
                    })()}
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
                        if(notificationCountShown > 0 && notificationCountTotal > 0){
                            return <>
                                <span className={ `text-sm` }>Showing {notificationCountShown} of {notificationCountTotal} entries</span>
                            </>;
                        }

                        return <></>
                    })()}
                </CardFooter>
            </Card>
        </SystemLayout>
    );
}
