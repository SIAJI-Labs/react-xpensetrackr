import { PropsWithChildren, useState } from "react";
import { formatRupiah } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { WalletItem } from "@/types";
import { Link } from "@inertiajs/react";

interface plannedSummary {
    uuid: string,
    name: string,
    expected_expense: number,
    expected_income: number,
    expected_planned_expense: any[],
    expected_planned_income: any[],

    parent: WalletItem
}

type PlannedPaymentSummaryTemplateProps = {
    plannedPayment?: plannedSummary | undefined
}

export default function SummaryTemplate({ plannedPayment }: PropsWithChildren<PlannedPaymentSummaryTemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    console.log(plannedPayment);

    return (
        <section key={r}  onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <span className={ ` whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold` }>{ plannedPayment && plannedPayment ? (`${plannedPayment.parent ? `${plannedPayment.parent.name} - ` : ''}${plannedPayment?.name}`) : `Wallet Name` }</span>

                    <div>
                        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                    <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                <Link href={ plannedPayment ? route('sys.planned-payment.summary.show', plannedPayment.uuid) : '#' }>
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
                        <span>{plannedPayment && plannedPayment.expected_planned_income ? plannedPayment.expected_planned_income.length : 0} expected Income</span>
                        <span className={ `text-green-500` }>{formatRupiah((plannedPayment && plannedPayment.expected_income ? plannedPayment.expected_income : 0))}</span>
                    </div>
                    <div className={ ` flex flex-row justify-between` }>
                        <span>{plannedPayment && plannedPayment.expected_planned_income ? plannedPayment.expected_planned_expense.length : 0} expected Expense</span>
                        <span className={ `text-red-500` }>{formatRupiah((plannedPayment && plannedPayment.expected_expense ? plannedPayment.expected_expense : 0))}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}