import { PropsWithChildren, useState } from "react";
import { Link } from "@inertiajs/react";
import { WalletItem } from "@/types";

// Plugins
import { formatRupiah } from "@/function";
import moment from "moment-timezone";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";

interface plannedSummary {
    uuid: string,
    name: string,
    expected_expense: number,
    expected_income: number,
    expected_planned_expense: any[],
    expected_planned_income: any[],

    parent: WalletItem
}

type TemplateProps = {
    plannedPayment?: plannedSummary | undefined,
    period?: Date | undefined
}

export default function TemplateSummary({ plannedPayment, period }: PropsWithChildren<TemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <section key={r}  onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <span className={ ` whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold` }>
                        { plannedPayment && plannedPayment ? (`${plannedPayment.parent ? `${plannedPayment.parent.name} - ` : ''}${plannedPayment?.name}`) : `Wallet Name` }
                    </span>

                    <div>
                        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                    <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                <Link href={ plannedPayment ? route('sys.planned-payment.summary.show', {
                                    wallet: plannedPayment.uuid,
                                    period: period !== undefined ? moment(period).format('YYYY-MM') : null
                                }) : '#' }>
                                    <DropdownMenuItem className={ ` cursor-pointer` }>
                                        <span className={ ` text-blue-500` }>Detail</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <hr/>
                <div className={ ` flex flex-col gap-1` }>
                    <div className={ ` flex flex-row justify-between` }>
                        <span>{(() => {
                            if(plannedPayment && 'expected_planned_income' in plannedPayment){
                                let expected = 0;
                                let text = 'expected';
                                if(typeof plannedPayment.expected_planned_income === 'object'){
                                    expected = plannedPayment.expected_planned_income.length;
                                } else if(typeof plannedPayment.expected_planned_income === 'number'){
                                    expected = plannedPayment.expected_planned_income;
                                }

                                var previousPeriod = moment(period).isBefore(moment(), 'month') || (moment(period).isSame(moment(), 'month') && moment(period).isBefore(moment(), 'year'));
                                if(previousPeriod){
                                    text = 'recorded';
                                }

                                return `${expected} ${text} Income`;
                            }
                            return <></>;
                        })()}</span>
                        <span className={ `text-green-500` }>{formatRupiah((plannedPayment && plannedPayment.expected_income ? plannedPayment.expected_income : 0))}</span>
                    </div>
                    <div className={ ` flex flex-row justify-between` }>
                    <span>{(() => {
                            if(plannedPayment && 'expected_planned_expense' in plannedPayment){
                                let expected = 0;
                                let text = 'expected';
                                if(typeof plannedPayment.expected_planned_expense === 'object'){
                                    expected = plannedPayment.expected_planned_expense.length;
                                } else if(typeof plannedPayment.expected_planned_expense === 'number'){
                                    expected = plannedPayment.expected_planned_expense;
                                }

                                var previousPeriod = moment(period).isBefore(moment(), 'month') || (moment(period).isSame(moment(), 'month') && moment(period).isBefore(moment(), 'year'));
                                if(previousPeriod){
                                    text = 'recorded';
                                }

                                return `${expected} ${text} Income`;
                            }
                            return <></>;
                        })()}</span>
                        <span className={ `text-red-500` }>{formatRupiah((plannedPayment && plannedPayment.expected_expense ? plannedPayment.expected_expense : 0))}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}