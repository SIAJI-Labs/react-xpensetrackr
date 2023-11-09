import { PropsWithChildren, useState } from "react";
import { PlannedItem } from "@/types";

// Plugins
import moment from "moment-timezone";

// Partials
import { formatRupiah, momentFormated } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

type PlannedPaymentListTemplateProps = {
    plannedPayment?: PlannedItem | any[]
}

export default function ListTemplate({ plannedPayment }: PropsWithChildren<PlannedPaymentListTemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <section key={r} onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                {/* Date, amount and action */}
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <span className={ ` font-medium w-full md:w-auto` }>{ momentFormated('MMM Do, YYYY', (plannedPayment && 'date_start' in plannedPayment ? (plannedPayment?.date_start) : moment())) }</span>

                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        <span className={ ` font-normal whitespace-nowrap ${plannedPayment && 'type' in plannedPayment ? (plannedPayment?.type === 'expense' ? ` text-red-500` : ( plannedPayment.type === 'income' ? `text-green-500` : ` dark:text-white`)) : ``}` }>{formatRupiah(plannedPayment && 'amount' in plannedPayment ? (plannedPayment?.amount) : 0)}</span>
                        
                        <div>
                            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={ `link` } className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                    {/* Detail Action */}
                                    {(() => {
                                        if(plannedPayment && 'uuid' in plannedPayment){
                                            return <>
                                                <Link href={ route('sys.planned-payment.show', {
                                                    uuid: plannedPayment.uuid
                                                }) }>
                                                    <DropdownMenuItem className={ ` cursor-pointer` }>
                                                        <span className={ ` text-blue-500` }>Detail</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </>
                                        }
                                        return <></>;
                                    })()}
                                    {/* Edit Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let plannedPaymentDialogSection = document.getElementById('plannedPaymentDialog-section');
                                        if(plannedPaymentDialogSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                let el = $refs.target as HTMLElement;
                                                if(el){
                                                    let originalText = el.innerHTML;
                                                    el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                    const revertToOriginalText = () => {
                                                        if(originalText){
                                                            el.innerHTML = originalText;
                                                        }

                                                        document.removeEventListener('dialog.planned-payment.shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.planned-payment.shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('plannedPaymentDialogEditAction', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: plannedPayment && 'uuid' in plannedPayment ? plannedPayment?.uuid : null
                                                    }
                                                }));
                                            }}>
                                                <span className={ ` text-yellow-500` }>Edit</span>
                                            </DropdownMenuItem>;
                                        }

                                        return <></>;
                                    })()}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Icon, Category, Notes */}
                <div className={ ` flex flex-row gap-4 items-center` }>
                    <div className={ ` p-3 h-10 w-10 rounded-full ${plannedPayment && 'type' in plannedPayment ? (plannedPayment.type === 'income' ? ` bg-green-500` : (plannedPayment.type === 'expense' ? ` bg-red-500` : ` bg-gray-500 dark:bg-secondary`)) : ``} flex items-center justify-center` }>
                        <i className={ ` text-white fa-solid ${plannedPayment && 'type' in plannedPayment ? (plannedPayment.type === 'income' ? `fa-right-to-bracket rotate-90` : (plannedPayment.type === 'expense' ? `fa-right-from-bracket -rotate-90` : `fa-right-left rotate-90`)) : ``}` }></i>
                    </div>

                    <div className={ ` w-full flex flex-col overflow-hidden` }>
                        <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>
                            {(() => {
                                if(plannedPayment && 'category_id' in plannedPayment){
                                    if(plannedPayment.category){
                                        return <>{ `${plannedPayment.category.parent ? `${plannedPayment.category.parent.name} - ` : ''}${plannedPayment.category.name}` }</>;
                                    }
                                }

                                return <>Uncategorized</>;
                            })()}
                        </span>
                        <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{ plannedPayment && 'name' in plannedPayment ? plannedPayment.name : `Planned Name` }</span>
                    </div>
                </div>
            </div>
        </section>
    );
}