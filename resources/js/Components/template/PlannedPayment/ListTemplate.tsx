import { PropsWithChildren, useState } from "react";
import { formatRupiah } from "@/function";

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
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <span className={ ` whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold` }>Name</span>

                    <div>
                        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className={ ` p-0 h-auto leading-none` } data-type="dropdown-trigger">
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
        </section>
    );
}