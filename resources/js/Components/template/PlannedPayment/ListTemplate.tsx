import { PropsWithChildren, useState } from "react";
import { formatRupiah, momentFormated } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";

type PlannedPaymentListTemplateProps = {
    plannedPayment?: any[]
}

export default function ListTemplate({ plannedPayment }: PropsWithChildren<PlannedPaymentListTemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <section key={r}  onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                {/* Date, amount and action */}
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <span className={ ` font-medium w-full md:w-auto` }>{ momentFormated('MMM Do, YYYY / HH:mm') }</span>

                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        <span className={ ` font-normal ` }>{formatRupiah(0)}</span>
                        
                        <div>
                            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={ `link` } className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                    <DropdownMenuItem className={ ` cursor-pointer` }>
                                        <span className={ ` text-blue-500` }>Detail</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Icon, Category, Notes */}
                <div className={ ` flex flex-row gap-4 items-center` }>
                    <div className={ ` p-3 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center` }>
                        <i className={ ` text-white fa-solid fa-right-to-bracket rotate-90` }></i>
                    </div>

                    <div className={ ` w-full flex flex-col overflow-hidden` }>
                        <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>Uncategorized</span>
                        <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>Planned Name</span>
                    </div>
                </div>
            </div>
        </section>
    );
}