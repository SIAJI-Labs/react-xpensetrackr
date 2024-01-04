import { Head, Link, router } from "@inertiajs/react";
import { PageProps, BudgetItem } from "@/types"
import { useIsFirstRender } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Partials
import BackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";


// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import moment from "moment";
import { Separator } from "@/Components/ui/separator";
import { Input } from "@/Components/ui/input";

// Props
type ContentProps = {
    data: BudgetItem
}

export default function Show({ auth, data }: PageProps<ContentProps>) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    const [currentStartPeriod, setCurrentStartPeriod] = useState<any>(data.start);
    const [currentEndPeriod, setCurrentEndPeriod] = useState<any>(data.end);
    const navigatePeriod = (action: string = 'prev') => {

    }

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                router.visit(route('sys.budget.index'))
            } else {
                router.reload();
            }
        }

        document.addEventListener('budget.deleted-action', handleDialogEvent);
        document.addEventListener('dialog.budget.hidden', handleDialogEvent);
        document.addEventListener('dialog.record.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.addEventListener('budget.deleted-action', handleDialogEvent);
            document.removeEventListener('dialog.budget.hidden', handleDialogEvent);
            document.removeEventListener('dialog.record.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Budget Detail: { `${data?.name}` }</h2>}
                fabAction={ [`budget`] }
            >
                <Head title={ `Budget: ${data?.name}` } />
                <BackButton className={ `px-0` }/>

                <div className={ ` flex flex-col gap-6` }>
                    {/* Summary */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Budget Detail: { `${data?.name}` }</div>
                                    </CardTitle>
                                    <CardDescription>See summary of your budget</CardDescription>
                                </div>

                                <div>
                                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                            {/* Refresh Action */}
                                            <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                router.reload();
                                                
                                                setTimeout(() => {
                                                    setOpenDropdown(false);
                                                }, 100);
                                            }}>
                                                <span className={ `` }>Refresh</span>
                                            </DropdownMenuItem>

                                            {/* Edit Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let budgetDialogSection = document.getElementById('budget-dialogSection');
                                                if(budgetDialogSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                        let el = $refs.target as HTMLElement;
                                                        if(el){
                                                            let originalText = el.innerHTML;
                                                            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                            const revertToOriginalText = () => {
                                                                if(originalText){
                                                                    el.innerHTML = originalText;
                                                                }

                                                                document.removeEventListener('dialog.budget.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.budget.shown', revertToOriginalText);
                                                        }

                                                        document.dispatchEvent(new CustomEvent('budget.edit-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : ''
                                                            }
                                                        }));
                                                    }}>
                                                        <span className={ ` text-yellow-500` }>Edit</span>
                                                    </DropdownMenuItem>;
                                                }

                                                return <></>;
                                            })()}

                                            {/* Delete Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let deleteSection = document.getElementById('budget-deleteDialogSection');
                                                if(deleteSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                        document.dispatchEvent(new CustomEvent('budget.delete-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : null,
                                                                action: 'delete'
                                                            }
                                                        }));
                                                    }}>
                                                        <span className={ ` text-red-500` }>Delete</span>
                                                    </DropdownMenuItem>;
                                                }

                                                return <></>;
                                            })()}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={ ` flex flex-col gap-6` }>
                                {/* Occurence & Interval */}
                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-col gap-1` }>
                                        <span>Occurence</span>
                                        <Badge variant={ `outline` }>{ ucwords(data.occurence) }</Badge>
                                    </div>
                                    <div className={ ` flex flex-col gap-1` }>
                                        <span>Interval</span>
                                        <Badge variant={ `outline` }>{ data.occurence === 'once' ? data.interval : ucwords(data.interval) }</Badge>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                    <span className=" flex items-center gap-2 text-sm font-normal">
                                        <i className="fa-solid fa-align-left"></i>
                                        <span className={ `font-normal` }>Note(s)</span>
                                    </span>
                                    <span className=" block mt-2">{ data.description ?? 'No description provided' }</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Condition */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Condition</div>
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                if(
                                    (data.budget_category && data.budget_category.length > 0) ||
                                    (data.budget_wallet && data.budget_wallet.length > 0) || 
                                    (data.budget_tags && data.budget_tags.length > 0)
                                ){
                                    let items: ReactNode[] = [];
                                    if(data.budget_category && data.budget_category.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_category).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.category.show', value.uuid) }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-category` }>
                                                <span className={ ` leading-none` }>Category ({ data.budget_category.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }
                                    if(data.budget_wallet && data.budget_wallet.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_wallet).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.wallet.show', value.uuid) }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-wallet` }>
                                                <span className={ ` leading-none` }>Wallet ({ data.budget_wallet.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }
                                    if(data.budget_tags && data.budget_tags.length > 0){
                                        let badge: ReactNode[] = [];
                                        (data.budget_tags).forEach((value, index) => {
                                            badge.push(
                                                <Link href={ route('sys.tags.show', value.uuid) }>
                                                    <Badge>{ value.name }</Badge>
                                                </Link>
                                            );
                                        });

                                        items.push(
                                            <div className={ ` flex flex-col gap-1` } key={ `condition-tags` }>
                                                <span className={ ` leading-none` }>Tags ({ data.budget_tags.length })</span>

                                                <div className={ ` flex flex-row gap-1 flex-wrap` }>{ badge }</div>
                                            </div>
                                        );
                                    }

                                    return <div className={ ` flex flex-col gap-4` }>{items}</div>
                                }

                                return <span>No condition provided</span>
                            })()}
                        </CardContent>
                    </Card>

                    {/* Progress */}
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                        <div>Usage</div>
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className={ ` flex flex-col gap-4` }>
                            {/* Progress bar */}
                            <div className={ ` flex flex-col gap-2` }>
                                <div className={ ` flex flex-row justify-between` }>
                                    {/* Used */}
                                    <div className={ ` flex flex-col` }>
                                        <small>Used</small>
                                        <span>{ formatRupiah(data.used) }</span>
                                    </div>

                                    {/* Remaining */}
                                    <div className={ ` flex flex-col items-end` }>
                                        <small>Remaining</small>
                                        <span>{ formatRupiah(data.remaining) }</span>
                                    </div>
                                </div>

                                {/* Bar */}
                                <div className={ ` h-3 w-full rounded-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden` }>
                                    <div className={ ` h-full w-full absolute left-0 top-0 bg-primary` } style={
                                        {
                                            width: `${(data && 'remaining' in data && 'amount' in data ? ((data.remaining / data.amount) * 100) : 100)}%`
                                        }
                                    }></div>
                                </div>

                                {/* Summary */}
                                <div className={ ` flex flex-row justify-between` }>
                                    <Badge variant={ `outline` }>Limit: { formatRupiah(data.amount) }</Badge>
                                    <Badge variant={ `outline` }>Usage: { `${(100 - (data && 'remaining' in data && 'amount' in data ? ((data.remaining / data.amount) * 100) : 100)).toFixed(2)}%` }</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}