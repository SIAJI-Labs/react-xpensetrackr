import { PropsWithChildren, useState } from "react";
import { BudgetItem } from "@/types";

// Plugins
import { formatRupiah } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import moment from "moment";

type TemplateProps = {
    budget?: BudgetItem | undefined,
    deleteAction?: boolean,
    editAction?: boolean
}

export default function TemplateList({ budget, deleteAction = true, editAction = true }: PropsWithChildren<TemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <section key={r} onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                {/* Name, amount and action */}
                <div className={ ` flex flex-row gap-2 justify-between` }>
                    {/* Name */}
                    <span className={ ` font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis` }>{ budget && 'name' in budget ? budget?.name : '-' }</span>

                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        {/* Amount */}
                        <span className={ ` font-normal text-nowrap` }>{formatRupiah(budget && 'amount' in budget ? budget.amount : 0)}</span>

                        {/* Action */}
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
                                        if(budget && 'uuid' in budget){
                                            return <>
                                                <Link href={ route('sys.budget.show', {
                                                    uuid: budget.uuid
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
                                        let budgetDialogSection = document.getElementById('budget-dialogSection');
                                        if(budgetDialogSection && editAction){
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
                                                        uuid: budget && 'uuid' in budget ? budget?.uuid : ''
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
                                        if(deleteAction && deleteSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                document.dispatchEvent(new CustomEvent('budget.delete-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: budget && 'uuid' in budget ? budget?.uuid : null,
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

                {/* Progress */}
                <div className={ ` flex flex-col gap-1` }>
                    {/* Amount */}
                    <div className={ ` flex flex-row justify-between items-end` }>
                        <div className={ ` flex flex-col` }>
                            <small className={ ` leading-none` }>Remaining</small>
                            <span className={ ` leading-tight` }>{ formatRupiah(budget && 'remaining' in budget ? budget.remaining : 0) }</span>
                        </div>

                        <span>{ formatRupiah((budget && 'remaining' in budget && 'amount' in budget ? ((budget.remaining / budget.amount) * 100) : 100), false, '') }%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className={ ` h-2 w-full rounded-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden` }>
                        <div className={ ` h-full w-full absolute left-0 top-0 bg-primary` } style={
                            {
                                width: `${(budget && 'remaining' in budget && 'amount' in budget ? ((budget.remaining / budget.amount) * 100) : 100)}%`
                            }
                        }></div>
                    </div>
                    {/* Period */}
                    {(() => {
                        if(budget && 'start' in budget && 'end' in budget){
                            return <>
                                <div className={ ` flex flex-row justify-between gap-4` }>
                                    <small>{ moment(budget.start).format('MMM Do, YYYY / HH:mm') }</small>
                                    <small>{ moment(budget.end).format('MMM Do, YYYY / HH:mm') }</small>
                                </div>
                            </>;
                        }
                        
                        return <></>;
                    })()}
                </div>
            </div>
        </section>
    );
}