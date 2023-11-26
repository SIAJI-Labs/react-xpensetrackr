import { PropsWithChildren, useState } from "react";
import { WalletItem } from "@/types";

// Plugins
import { formatRupiah } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

type TemplateProps = {
    wallet?: WalletItem | any[],
    deleteAction?: boolean,
    editAction?: boolean
}

export default function TemplateList({ wallet, deleteAction = true, editAction = true }: PropsWithChildren<TemplateProps> ){
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
                    <span className={ ` font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis` }>{ wallet && 'name' in wallet ? `${wallet.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` : '-' }</span>

                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        <span className={ ` font-normal whitespace-nowrap ` }>{ formatRupiah( wallet && 'balance' in wallet ? wallet.balance : 0) }</span>
                        
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
                                        if(wallet && 'uuid' in wallet){
                                            return <>
                                                <Link href={ route('sys.wallet.show', {
                                                    uuid: wallet.uuid
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
                                        let walletDialogSection = document.getElementById('wallet-dialogSection');
                                        if(walletDialogSection && editAction){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                let el = $refs.target as HTMLElement;
                                                if(el){
                                                    let originalText = el.innerHTML;
                                                    el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                    const revertToOriginalText = () => {
                                                        if(originalText){
                                                            el.innerHTML = originalText;
                                                        }

                                                        document.removeEventListener('dialog.wallet.shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.wallet.shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('wallet.edit-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: wallet && 'uuid' in wallet ? wallet?.uuid : ''
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
                                        let deleteSection = document.getElementById('wallet-deleteDialogSection');
                                        if(deleteAction && deleteSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                document.dispatchEvent(new CustomEvent('wallet.delete-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: wallet && 'uuid' in wallet ? wallet?.uuid : null,
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

                {(() => {
                    if(wallet && 'parent' in wallet && wallet.parent && wallet.parent.deleted_at !== null){
                        return <span className={ ` text-sm italic text-red-500` }>*Something need your attention</span>
                    }

                    return <></>;
                })()}
            </div>
        </section>
    );
}