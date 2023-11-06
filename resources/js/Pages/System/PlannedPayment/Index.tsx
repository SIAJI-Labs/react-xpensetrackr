import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import SystemLayout from "@/Layouts/SystemLayout";
import { ucwords } from "@/function";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import PlannedPaymentSummary from "./Partials/Summary";
import PlannedPaymentList from "./Partials/List";

// Props
type PlannedPaymentIndexProps = {
    type?: string
}

export default function Index({ auth, type = 'list' }: PageProps<PlannedPaymentIndexProps>) {
    const [pageType, setPageType] = useState<string>(type);
    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Payment {ucwords(pageType)}</h2>}
            >
                <Head title={ `Planned Payment ${ucwords(pageType)}` } />

                <div className="flex flex-col gap-6">
                    {/* Content */}
                    <Card className={ `` }>
                        <CardHeader>
                            <div className={ ` flex flex-row justify-between items-center` }>
                                <div>
                                    <CardTitle>
                                            <div>Planned Payment: { ucwords(pageType) }</div>
                                    </CardTitle>
                                    <CardDescription>See {pageType} of your Planned Payment</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={ ` flex flex-row gap-1 w-full border p-1 rounded-md` }>
                                {(() => {
                                    let pageTypeEl: any[] = [];
                                    ['summary', 'list'].map((value, index) => {
                                        pageTypeEl.push(
                                            <div className={ ` w-full text-center py-1 rounded-sm cursor-pointer ${ pageType === value ? `bg-gray-200 hover:bg-gray-200` : ` dark:text-white dark:hover:text-black`} hover:bg-gray-100 transition` } onClick={() => {
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