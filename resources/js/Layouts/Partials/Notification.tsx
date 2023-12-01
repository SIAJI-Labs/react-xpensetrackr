import { useIsFirstRender } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { PlannedItem, User } from "@/types";

// Partials
import TemplateNoData from "@/Components/template/TemplateNoData";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Shadcn
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Link } from "@inertiajs/react";

export default function Notification({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const isFirstRender = useIsFirstRender();
    
    let paginate_item = 1;
    // Planned Payment Data - Overdue
    const [plannedOverdueItemAbortController, setPlannedOverdueItemAbortController] = useState<AbortController | null>(null);
    const [plannedOverdueIsLoading, setPlannedOverdueIsLoading] = useState<boolean>(true);
    const [plannedOverdueItem, setPlannedOverdueItem] = useState<any[]>();
    // Planned Payment Data - Today
    const [plannedTodayItemAbortController, setPlannedTodayItemAbortController] = useState<AbortController | null>(null);
    const [plannedTodayIsLoading, setPlannedTodayIsLoading] = useState<boolean>(true);
    const [plannedTodayItem, setPlannedTodayItem] = useState<any[]>();
    // Planned Payment Data - Upcoming
    const [plannedUpcomingItemAbortController, setPlannedUpcomingItemAbortController] = useState<AbortController | null>(null);
    const [plannedUpcomingIsLoading, setPlannedUpcomingIsLoading] = useState<boolean>(true);
    const [plannedUpcomingItem, setPlannedUpcomingItem] = useState<any[]>();
    // Planned Payment Paginaton - Overdue
    const [plannedOverdueCountShown, setPlannedOverdueCountShown] = useState<number>(0);
    const [plannedOverdueCountTotal, setPlannedOverdueCountTotal] = useState<number>(0);
    const [plannedOverduePaginate, setPlannedOverduePaginate] = useState<number>(paginate_item);
    const [plannedOverduePaginateState, setPlannedOverduePaginateState] = useState<boolean>(false);
    // Planned Payment Paginaton - Today
    const [plannedTodayCountShown, setPlannedTodayCountShown] = useState<number>(0);
    const [plannedTodayCountTotal, setPlannedTodayCountTotal] = useState<number>(0);
    const [plannedTodayPaginate, setPlannedTodayPaginate] = useState<number>(paginate_item);
    const [plannedTodayPaginateState, setPlannedTodayPaginateState] = useState<boolean>(false);
    // Planned Payment Paginaton - Upcoming
    const [plannedUpcomingCountShown, setPlannedUpcomingCountShown] = useState<number>(0);
    const [plannedUpcomingCountTotal, setPlannedUpcomingCountTotal] = useState<number>(0);
    const [plannedUpcomingPaginate, setPlannedUpcomingPaginate] = useState<number>(paginate_item);
    const [plannedUpcomingPaginateState, setPlannedUpcomingPaginateState] = useState<boolean>(false);

    const fetchPlannedList = async(type: string = 'overdue') => {
        let paginateLimit = 0;
        // Show skeleton
        switch(type){
            case 'overdue':
                paginateLimit = plannedOverduePaginate;
                setPlannedOverdueIsLoading(true);
                break;
            case 'today':
                paginateLimit = plannedTodayPaginate;
                setPlannedTodayIsLoading(true);
                break;
            case 'upcoming':
                paginateLimit = plannedUpcomingPaginate;
                setPlannedUpcomingIsLoading(true);
                break;
        }

        // Cancel previous request
        switch(type){
            case 'overdue':
                if(plannedOverdueItemAbortController instanceof AbortController){
                    plannedOverdueItemAbortController.abort();
                }
                break;
            case 'today':
                if(plannedTodayItemAbortController instanceof AbortController){
                    plannedTodayItemAbortController.abort();
                }
                break;
            case 'upcoming':
                if(plannedUpcomingItemAbortController instanceof AbortController){
                    plannedUpcomingItemAbortController.abort();
                }
                break;
        }

        // Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        switch(type){
            case 'overdue':
                setPlannedOverdueItemAbortController(abortController);
                break;
            case 'today':
                setPlannedTodayItemAbortController(abortController);
                break;
            case 'upcoming':
                setPlannedUpcomingItemAbortController(abortController);
                break;
        }

        // Build parameter
        const query = [];
        const obj = {
            limit: paginateLimit,
            filter_state: type
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

        try {
            const response = await axios.get(`${route('api.planned-payment.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });
        
            // Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
            switch(type){
                case 'overdue':
                    setPlannedOverdueItem(jsonResponse.result.data);
                    // Update load more state
                    setPlannedOverduePaginateState(jsonResponse.result.has_more);
                    // Update shown
                    setPlannedOverdueCountShown((jsonResponse.result.data).length);
                    if('total' in jsonResponse.result){
                        setPlannedOverdueCountTotal(jsonResponse.result.total);
                    }
                    break;
                case 'today':
                    setPlannedTodayItem(jsonResponse.result.data);
                    // Update load more state
                    setPlannedTodayPaginateState(jsonResponse.result.has_more);
                    // Update shown
                    setPlannedTodayCountShown((jsonResponse.result.data).length);
                    if('total' in jsonResponse.result){
                        setPlannedTodayCountTotal(jsonResponse.result.total);
                    }
                    break;
                case 'upcoming':
                    setPlannedUpcomingItem(jsonResponse.result.data);
                    // Update load more state
                    setPlannedUpcomingPaginateState(jsonResponse.result.has_more);
                    // Update shown
                    setPlannedUpcomingCountShown((jsonResponse.result.data).length);
                    if('total' in jsonResponse.result){
                        setPlannedUpcomingCountTotal(jsonResponse.result.total);
                    }
                    break;
            }

            // Remove loading state
            switch(type){
                case 'overdue':
                    setPlannedOverdueIsLoading(false);
                    break;
                case 'today':
                    setPlannedTodayIsLoading(false);
                    break;
                case 'upcoming':
                    setPlannedUpcomingIsLoading(false);
                    break;
            }

            // Clear the AbortController from state
            switch(type){
                case 'overdue':
                    setPlannedOverdueItemAbortController(null);
                    break;
                case 'today':
                    setPlannedTodayItemAbortController(null);
                    break;
                case 'upcoming':
                    setPlannedUpcomingItemAbortController(null);
                    break;
            }
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

    // Handle notification state
    const handleNotification = () => {
        setTimeout(() => {
            // Add notification state
            let bell = document.querySelector('[data-type="notification-bell"]');
            if(bell){
                bell.classList.remove('fa-shake');
                if(plannedOverdueItem && plannedOverdueItem?.length > 0 || plannedTodayItem && plannedTodayItem?.length > 0 || plannedUpcomingItem && plannedUpcomingItem?.length > 0){
                    bell.classList.add('fa-shake');
                }
            }
        }, 100);
    }
    // Handle on Paginate State change
    const handlePlannedChange = (type: string = 'overdue') => {
        fetchPlannedList(type);

        handleNotification();
    }
    useEffect(() => {
        handlePlannedChange('overdue');
    }, [plannedOverduePaginate]);
    useEffect(() => {
        handlePlannedChange('today');
    }, [plannedTodayPaginate]);
    useEffect(() => {
        handlePlannedChange('upcoming');
    }, [plannedUpcomingPaginate]);

    // Handle record/planned change
    useEffect(() => {
        if(!isFirstRender){
            const handleDialogEvent = () => {
                setTimeout(() => {
                    handlePlannedChange('overdue');
                    handlePlannedChange('today');
                    handlePlannedChange('upcoming');

                    handleNotification();
                }, 100);
            }
            document.addEventListener('dialog.record.hidden', handleDialogEvent);
            document.addEventListener('dialog.planned-payment.hidden', handleDialogEvent);
            document.addEventListener('planned-payment.deleted-action', handleDialogEvent);
            // Remove the event listener when the component unmounts
            return () => {
                document.removeEventListener('dialog.record.hidden', handleDialogEvent);
                document.removeEventListener('dialog.planned-payment.hidden', handleDialogEvent);
                document.removeEventListener('planned-payment.deleted-action', handleDialogEvent);
            };
        }
    });

    return <>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={ `ghost` } className={ ` dark:text-white aspect-square` }><i className={ `fa-regular fa-bell ${plannedOverdueItem && plannedOverdueItem.length > 0 || plannedTodayItem && plannedTodayItem.length > 0 || plannedUpcomingItem && plannedUpcomingItem.length > 0 ? `fa-shake` : ``}` } data-type="notification-bell"></i></Button>
            </SheetTrigger>
            <SheetContent side={ `right` } className={ `p-0 w-screen md:w-96 dark:!text-white` }>
                <ScrollArea className={ ` h-screen p-6 py-0` }>
                    <div className={ ` flex flex-col gap-6 my-6` }>
                        <div className={ ` p-6 sticky top-0` }>
                            <SheetHeader className={ ` relative after:absolute after:-top-6 after:-left-6 after:w-[calc(100%+3rem)] after:h-32 after:bg-gradient-to-b after:from-background after:via-background after:to-transparent after:z-[-1] z-10 pb-6 pointer-events-none select-none` }>
                                <SheetTitle className={ ` leading-none` }>Notification</SheetTitle>
                                <SheetDescription className={ `!mt-0 leading-none` }>
                                    See all of your notification in one panel
                                </SheetDescription>
                            </SheetHeader>
                        </div>
                        
                        <div className={ `` }>
                            <Tabs defaultValue="planned-payment">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="planned-payment">Planned Payment</TabsTrigger>
                                    <TabsTrigger value="notification">Notification</TabsTrigger>
                                </TabsList>
                                {/* Planned Payment Notification */}
                                <TabsContent value="planned-payment">
                                    <div className={ ` flex flex-col gap-4` }>
                                        {(() => {
                                            let element: any = [];
                                            ['overdue', 'today', 'upcoming'].forEach((val) => {
                                                element.push(
                                                    <div className={ ` p-6 border rounded flex flex-col gap-4 dark:text-white` } key={ `planned_payment-${val}` }>
                                                        <h6 className={ `font-semibold underline` }>{ ucwords(val) }</h6>

                                                        <div className={ ` flex flex-col gap-2` }>
                                                            {(() => {
                                                                let plannedList: any[] = [];
                                                                let data: any[] | undefined = [];
                                                                let shown: number = 0;
                                                                let total: number = 0;
                                                                let paginate: number = 0;
                                                                let paginate_state: boolean = false;
                                                                switch(val){
                                                                    case 'overdue':
                                                                        data = plannedOverdueItem;
                                                                        paginate = plannedOverduePaginate;
                                                                        paginate_state = plannedOverduePaginateState;
                                                                        if(plannedOverdueCountShown){
                                                                            shown = plannedOverdueCountShown;
                                                                        }
                                                                        if(plannedOverdueCountTotal){
                                                                            total = plannedOverdueCountTotal;
                                                                        }
                                                                        break;
                                                                    case 'today':
                                                                        data = plannedTodayItem;
                                                                        paginate = plannedTodayPaginate;
                                                                        paginate_state = plannedTodayPaginateState;
                                                                        if(plannedTodayCountShown){
                                                                            shown = plannedTodayCountShown;
                                                                        }
                                                                        if(plannedTodayCountTotal){
                                                                            total = plannedTodayCountTotal;
                                                                        }
                                                                        break;
                                                                    case 'upcoming':
                                                                        data = plannedUpcomingItem;
                                                                        paginate = plannedUpcomingPaginate;
                                                                        paginate_state = plannedUpcomingPaginateState;
                                                                        if(plannedUpcomingCountShown){
                                                                            shown = plannedUpcomingCountShown;
                                                                        }
                                                                        if(plannedUpcomingCountTotal){
                                                                            total = plannedUpcomingCountTotal;
                                                                        }
                                                                        break;
                                                                }

                                                                if(data){
                                                                    data.forEach((planned, key) => {
                                                                        plannedList.push(
                                                                            <div className={ ` border-b last:border-b-0 py-4 last:pb-0 first:pt-0 flex flex-col gap-2` } key={ `planned_list-${planned.uuid}` }>
                                                                                <span className={ ` leading-none font-medium` }>{ planned.name }</span>

                                                                                <div className={ ` flex flex-col gap-1` }>
                                                                                    {/* Type and Date */}
                                                                                    <div className={ ` flex flex-row justify-between text-sm leading-none` }>
                                                                                        <span>{ ucwords(planned.type) }</span>
                                                                                        <span>{ momentFormated('MMM Do, YYYY', planned.date_start) }</span>
                                                                                    </div>

                                                                                    {/* Wallet and Amount */}
                                                                                    <div className={ ` flex flex-row justify-between text-sm leading-none` }>
                                                                                        <span>{(() => {
                                                                                            let walletName = [`${planned.from_wallet.parent ? `${planned.from_wallet.parent.name} - ` : ''}${planned.from_wallet.name}`];
                                                                                            console.log();
                                                                                            if(walletName.length > 0){
                                                                                                return <div className={ ` flex flex-row gap-1 whitespace-nowrap overflow-hidden text-ellipsis` }>
                                                                                                    { walletName.join(`<span class="fa-solid fa-caret-right"></span>`) }
                                                                                                </div>
                                                                                            }

                                                                                            return <span>-</span>;
                                                                                        })()}</span>
                                                                                        <span className={ planned.type === 'income' ? ` text-green-500` : ` text-red-500` }>{ formatRupiah(planned.amount + planned.extra_amount) }</span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* Action */}
                                                                                <div className={ ` flex flex-row justify-between gap-4` }>
                                                                                    <Link href={ route('sys.planned-payment.show', planned.uuid) } className={ ` w-full` }>
                                                                                        <Button variant={ `outline` } className={ ` w-full !h-auto py-2 leading-none` }><span className={ `leading-none` }>Detail</span></Button>
                                                                                    </Link>
                                                                                    <Button variant={ `default` } className={ ` w-full !h-auto py-2 leading-none` } onClick={($refs) => {
                                                                                        let el = $refs.target as HTMLElement;
                                                                                        if(el){
                                                                                            let originalText = el.innerHTML;
                                                                                            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                                                            const revertToOriginalText = () => {
                                                                                                if(originalText){
                                                                                                    el.innerHTML = originalText;
                                                                                                }

                                                                                                document.removeEventListener('dialog.record.shown', revertToOriginalText);
                                                                                            }
                                                                                            document.addEventListener('dialog.record.shown', revertToOriginalText);
                                                                                        }

                                                                                        document.dispatchEvent(new CustomEvent('record-dialog.planned-payment.confirmation', {
                                                                                            bubbles: true, 
                                                                                            detail: {
                                                                                                uuid: planned && 'uuid' in planned ? planned.uuid : null
                                                                                            }
                                                                                        }))
                                                                                    }}><span className={ ` leading-none` }>Approve</span></Button>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    });
                                                                }

                                                                if(plannedList.length > 0){
                                                                    return <div className=" flex flex-col gap-6">
                                                                        <div className="">
                                                                            { plannedList }
                                                                        </div>

                                                                        {(() => {
                                                                            let actionButton: any = [];
                                                                            actionButton.push(
                                                                                <Button
                                                                                    key={ `planned_action-load_more` }
                                                                                    variant={ `outline` }
                                                                                    className={ `dark:border-white` }
                                                                                    disabled={ !paginate_state }
                                                                                    onClick={() => {
                                                                                        switch(val){
                                                                                            case 'overdue':
                                                                                                setPlannedOverduePaginate(plannedOverduePaginate + paginate_item);
                                                                                                break;
                                                                                            case 'today':
                                                                                                setPlannedTodayPaginate(plannedTodayPaginate + paginate_item);
                                                                                                break;
                                                                                            case 'upcoming':
                                                                                                setPlannedUpcomingPaginate(plannedUpcomingPaginate + paginate_item);
                                                                                                break;
                                                                                        }
                                                                                    }}
                                                                                >Load more</Button>
                                                                            );

                                                                            if(total > 0 && shown > 0){
                                                                                actionButton.push(
                                                                                    <div className={ `` } key={ `planned_action-shown` }>
                                                                                        <span className={ `text-sm` }>Showing {shown} of {total} entries</span>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            
                                                                            if(actionButton.length > 0){
                                                                                return (
                                                                                    <div className={ ` flex flex-row justify-between items-center` }>
                                                                                        { actionButton }
                                                                                    </div>
                                                                                );
                                                                            }

                                                                            return <></>;
                                                                        })()}
                                                                    </div>
                                                                }

                                                                return <>
                                                                    <TemplateNoData/>
                                                                </>
                                                            })()}
                                                        </div>
                                                    </div>
                                                );
                                            });

                                            return element;
                                        })()}
                                    </div>
                                </TabsContent>

                                {/* Notification */}
                                <TabsContent value="notification">
                                    <TemplateNoData/>
                                    {/* <Card>
                                        <CardHeader>
                                            <CardTitle>Password</CardTitle>
                                            <CardDescription>
                                                Change your password here. After saving, you'll be logged out.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="current">Current password</Label>
                                                <Input id="current" type="password" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="new">New password</Label>
                                                <Input id="new" type="password" />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button>Save password</Button>
                                        </CardFooter>
                                    </Card> */}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    </>;
}