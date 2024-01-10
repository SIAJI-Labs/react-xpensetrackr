import { PropsWithChildren, useState } from "react";
import { Link } from "@inertiajs/react";

// Plugins
import moment from "moment-timezone";

// Partials
import { formatRupiah, momentFormated } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

type TemplateProps = {
    plannedPayment?: any
}

export default function TemplateListRecord({ plannedPayment }: PropsWithChildren<TemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <>
            {(() => {
                if(plannedPayment.status === 'approve'){
                    return (
                        <section key={r} onClick={($refs) => {
                            setOpenDropdown(true);
                        }}>
                            <div className={ ` flex flex-col gap-2 border border-green-500 rounded-lg p-4 cursor-pointer` }>
                                {/* Date, amount and action */}
                                <div className={ ` flex flex-row gap-6 justify-between` }>
                                    <span className={ ` font-medium w-full md:w-auto` }>
                                        { momentFormated('MMM Do, YYYY', (plannedPayment && 'period' in plannedPayment ? moment(plannedPayment?.period) : moment())) }
                                    </span>
                                
                                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                        <span className={ ` font-normal whitespace-nowrap ${plannedPayment && 'type' in plannedPayment.record ? (plannedPayment?.record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>
                                            { formatRupiah(plannedPayment && 'amount' in plannedPayment.record && 'extra_amount' in plannedPayment.record ? (plannedPayment?.record?.amount + plannedPayment?.record?.extra_amount) : 0) }
                                        </span>
                                        
                                        <div>
                                            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant={ `link` } className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                                    {(() => {
                                                        if(plannedPayment && 'uuid' in plannedPayment.record){
                                                            return <>
                                                                <Link href={ route('sys.record.show', {
                                                                    uuid: plannedPayment.record.uuid
                                                                }) }>
                                                                    <DropdownMenuItem className={ ` cursor-pointer` }>
                                                                        <span className={ ` text-blue-500` }>Detail</span>
                                                                    </DropdownMenuItem>
                                                                </Link>
                                                            </>
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
                                    <div className={ ` p-3 h-10 w-10 rounded-full ${plannedPayment && 'type' in plannedPayment.record ? (plannedPayment.record.type === 'income' ? ` bg-green-500` : (plannedPayment.record.type === 'expense' ? ` bg-red-500` : ` bg-gray-500 dark:bg-secondary`)) : ``} flex items-center justify-center` }>
                                        <i className={ ` text-white fa-solid ${plannedPayment && 'type' in plannedPayment.record ? (plannedPayment.record.type === 'income' ? `fa-right-to-bracket rotate-90` : (plannedPayment.record.type === 'expense' ? `fa-right-from-bracket -rotate-90` : `fa-right-left rotate-90`)) : ``}` }></i>
                                    </div>
                
                                    <div className={ ` w-full flex flex-col overflow-hidden` }>
                                        <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>
                                            {(() => {
                                                if(plannedPayment && 'category_id' in plannedPayment.record){
                                                    if(plannedPayment.record.category){
                                                        return <>{ `${plannedPayment.record.category.parent ? `${plannedPayment.record.category.parent.name} - ` : ''}${plannedPayment.record.category.name}` }</>;
                                                    }
                                                }
                
                                                return <>Uncategorized</>;
                                            })()}
                                        </span>
                                        <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{ plannedPayment && 'note' in plannedPayment.record ? plannedPayment.record.note : `No description` }</span>
                                    </div>
                                </div>

                                {/* Alert */}
                                <div className={ ` mt-2` }>
                                    <span className={ ` text-sm italic` }>You're performing this action at {momentFormated('MMM Do, YYYY / HH:mm', plannedPayment && 'created_at' in plannedPayment ? moment(plannedPayment?.created_at) : moment())}</span>
                                </div>
                            </div>
                        </section>
                    );
                }

                return (
                    <>
                        <section key={r}>
                            <div className={ ` flex flex-col gap-2 border rounded-lg p-4 cursor-pointer` }>
                                {/* Date and status */}
                                <div className={ ` flex flex-row gap-6 justify-between` }>
                                    <span className={ ` font-medium w-full md:w-auto` }>
                                        { momentFormated('MMM Do, YYYY', (plannedPayment && 'period' in plannedPayment ? moment(plannedPayment?.period) : moment())) }
                                    </span>
                                
                                    <Badge variant={ `destructive` }>Skipped</Badge>
                                </div>

                                {/* Alert */}
                                <div className={ ` mt-2` }>
                                    <span className={ ` text-sm italic` }>You're performing this action at {momentFormated('MMM Do, YYYY / HH:mm', plannedPayment && 'created_at' in plannedPayment ? moment(plannedPayment?.created_at) : moment())}</span>
                                </div>
                            </div>
                        </section>
                    </>
                );
            })()}
        </>
    );
}