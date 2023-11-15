import { PropsWithChildren, useState } from "react";
import { PlannedItem } from "@/types";

// Plugins
import moment from "moment-timezone";

// Partials
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";

type PlannedPaymentListTemplateProps = {
    plannedPayment?: PlannedItem | any[],
    deleteAction?: boolean,
    editAction?: boolean
}

export default function ListTemplate({ plannedPayment, deleteAction = true, editAction = true }: PropsWithChildren<PlannedPaymentListTemplateProps> ){
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
                    <span className={ ` font-medium w-full md:w-auto` }>{ moment((plannedPayment && 'date_start' in plannedPayment ? (plannedPayment?.date_start) : moment())).format('MMM Do, YYYY') }</span>

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
                                        if(editAction && plannedPaymentDialogSection){
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

                                                document.dispatchEvent(new CustomEvent('planned-payment.edit-action', {
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
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let deleteSection = document.getElementById('plannedPaymentDeleteDialog-section');
                                        if(deleteAction && deleteSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                document.dispatchEvent(new CustomEvent('planned-payment.delete-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: plannedPayment && 'uuid' in plannedPayment ? plannedPayment?.uuid : null,
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

                {/* Extra Information */}
                {(() => {
                    const information = [];

                    // Occurence
                    if(plannedPayment && 'repeat_type' in plannedPayment){
                        information.push(
                            <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `plannedPayment_occurence-${plannedPayment?.uuid}` }>
                                <span className={ ` relative` }>
                                    {(() => {
                                        if(plannedPayment.repeat_type === 'once'){
                                            return <>
                                                <span className={ ` h-4 w-4 flex justify-center items-center rounded-full bg-background text-xs` }>1</span>
                                            </>;
                                        }

                                        return <>
                                            <i className={ `fa-solid fa-repeat leading-none text-xs` }></i>
                                        </>;
                                    })()}
                                </span>
                                <span>{ucwords(plannedPayment.repeat_type)}</span>
                            </Badge>
                        );
                    }

                    // Type
                    if(plannedPayment && 'type' in plannedPayment && plannedPayment?.type){
                        information.push(
                            <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `plannedPayment_type-${plannedPayment?.uuid}` }>
                                <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                                <span>{ucwords(plannedPayment?.type)}</span>
                            </Badge>
                        );
                    }

                    // Wallet
                    if(plannedPayment && 'from_wallet' in plannedPayment && plannedPayment?.from_wallet){
                        let walletName = [];
                        walletName.push(<span key={ `from_wallet-${plannedPayment?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ `${plannedPayment?.from_wallet.parent ? `${plannedPayment.from_wallet.parent.name} - ` : ``}${plannedPayment?.from_wallet?.name}` }</span>);
                        if(plannedPayment && 'type' in plannedPayment && plannedPayment?.type === 'transfer'){
                            walletName.push(<i key={ `icon_wallet-${plannedPayment?.uuid}` } className={ `fa-solid ${plannedPayment?.type === 'transfer' || plannedPayment?.type === 'expense' ? 'fa-caret-right' : 'fa-caret-left'}` }></i>);
                            walletName.push(<span key={ `to_wallet-${plannedPayment?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ `${plannedPayment?.to_wallet.parent ? `${plannedPayment.to_wallet.parent.name} - ` : ``}${plannedPayment?.to_wallet?.name}` }</span>);
                        }
                        
                        information.push(
                            <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `plannedPayment_wallet-${plannedPayment?.uuid}` }>
                                <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                                <span className={ ` flex items-center gap-1` }>{ walletName }</span>
                            </Badge>
                        );
                    }

                    // Notes
                    if(plannedPayment && 'note' in plannedPayment && plannedPayment?.note){
                        information.push(
                            <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `plannedPayment_notes-${plannedPayment?.uuid}` }>
                                <i className={ `fa-solid fa-align-left leading-none text-xs` }></i>
                                <span>Notes</span>
                            </Badge>
                        );
                    }

                    if(plannedPayment && 'uuid' in plannedPayment && information.length > 0){
                        return <>
                            <div className={ ` mt-2 flex flex-row gap-2 flex-wrap` } key={ `plannedPayment_information-${plannedPayment?.uuid}` }>
                                {information}
                            </div>
                        </>;
                    }

                    return <></>;
                })()}
            </div>
        </section>
    );
}