import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import SystemLayout from "@/Layouts/SystemLayout";
import { ucwords } from "@/function";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PlannedPaymentSummary from "./Partials/Summary";
import PlannedPaymentList from "./Partials/List";
import { Button } from "@/Components/ui/button";
import { useIsFirstRender } from "@/lib/utils";

// Props
type PlannedPaymentIndexProps = {
    type?: string
}

export default function Index({ auth, type = 'list' }: PageProps<PlannedPaymentIndexProps>) {
    const [pageType, setPageType] = useState<string>(type);
    useEffect(() => {
        // Listen to Record Dialog event
        const handleDialogPlannedPayment = () => {
            document.dispatchEvent(new CustomEvent('planned-payment.refresh', {bubbles: true}));
        }

        document.addEventListener('dialog.record.hidden', handleDialogPlannedPayment);
        document.addEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
        document.addEventListener('planned-payment.deleted-action', handleDialogPlannedPayment);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.hidden', handleDialogPlannedPayment);
            document.removeEventListener('dialog.planned-payment.hidden', handleDialogPlannedPayment);
            document.removeEventListener('planned-payment.deleted-action', handleDialogPlannedPayment);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Payment {ucwords(pageType)}</h2>}
                fabAction={ ['plannedPayment'] }
            >
                <Head title={ `Planned Payment ${ucwords(pageType)}` } />

                <div className="flex flex-col gap-6">
                    {/* Content */}
                    <Card className={ `` }>
                        <CardHeader>
                            <div className={ ` flex flex-row justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                            <div>Planned Payment: { ucwords(pageType) }</div>
                                    </CardTitle>
                                    <CardDescription>See {pageType} of your Planned Payment</CardDescription>
                                </div>
                                <div className={ `flex items-center gap-2` }>
                                    {/* Refresh Button */}
                                    {(() => {
                                        return <Button variant={ `outline` } onClick={() => {
                                            document.dispatchEvent(new CustomEvent('planned-payment.refresh', {bubbles: true}));
                                        }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                                    })()}
                                    {/* Add new Button */}
                                    <Button variant={ `outline` } onClick={() => {
                                        document.dispatchEvent(new CustomEvent('planned-payment.edit-action', {
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
                            <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md` }>
                                {/* Page type, either Summary or List */}
                                {(() => {
                                    let pageTypeEl: any[] = [];
                                    ['summary', 'list'].map((value, index) => {
                                        pageTypeEl.push(
                                            <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ pageType === value ? `bg-primary ` : ` dark:!text-white !text-black hover:!text-primary-foreground`} text-primary-foreground hover:bg-primary/90 transition` } onClick={() => {
                                                setPageType(value);
                                            }} key={ `record_type-${value}` }>
                                                <span className={ ` text-sm font-semibold` }>{ ucwords(value) }</span>
                                            </div>
                                        );
                                    });

                                    if(pageTypeEl.length > 0){
                                        return pageTypeEl;
                                    }

                                    return <></>;
                                })()}
                            </div>

                            <div className={ ` mt-6` }>
                                <hr/>
                                <div className={ `mt-4` }>
                                    {(() => {
                                        // Show content based on selected page type
                                        if(pageType === 'summary'){
                                            return <PlannedPaymentSummary auth={auth} activeType={pageType}/>
                                        } else if(pageType === 'list'){
                                            return <PlannedPaymentList auth={auth} activeType={pageType}/>
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}