import { PropsWithChildren, useEffect, useState } from "react";
import { WalletShareItem, WalletItem } from "@/types";

// Plugins
import { formatRupiah } from "@/function";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import moment from "moment";

type TemplateProps = {
    wallet?: WalletShareItem,
    deleteAction?: boolean,
    editAction?: boolean
}

export default function TemplateList({ wallet, deleteAction = true, editAction = true }: PropsWithChildren<TemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                setOpenDropdown(false);
            }, 100);
        }

        document.addEventListener('dialog.wallet-share.shown', handleDialogEvent);
        document.addEventListener('dialog.wallet-share.prompt-shown', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet-share.prompt-shown', handleDialogEvent);
        };
    });

    // Show wallet name
    const shownWallet = (wallet: WalletItem[] | any[]): string => {
        const maxItemShown = 2;
        let shown = '-';

        if(wallet.length > 0){
            if(wallet.length <= maxItemShown){
                shown = wallet.map(item => item.name).join(' and ');
            } else {
                // If there are more than 2 items, show the names of the first 2 items
                const firstTwoNames = wallet.slice(0, maxItemShown).map(item => item.name).join(', ');
                // Calculate the count of remaining items
                const remainingItemCount = wallet.length - maxItemShown;

                shown = `${firstTwoNames} and ${remainingItemCount} more wallets`;
            }
        }

        return shown;
    }

    return (
        <section key={r} onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    {/* Name */}
                    <span className={ ` font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis` }>{ wallet && 'name' in wallet ? wallet.name : '' }</span>

                    {/* Balance & Action Button */}
                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        {/* Balance */}
                        <span className={ ` font-normal whitespace-nowrap ` }>{ formatRupiah( wallet && 'balance' in wallet ? wallet.balance : 0) }</span>
                        
                        {/* Action Button */}
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
                                                <Link href={ route('sys.wallet-share.show', {
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
                                    {/* Share Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let walletDialogSection = document.getElementById('walletShare-dialogShareSection');
                                        if(walletDialogSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                let el = $refs.target as HTMLElement;
                                                if(el){
                                                    let originalText = el.innerHTML;
                                                    el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                    const revertToOriginalText = () => {
                                                        if(originalText){
                                                            el.innerHTML = originalText;
                                                        }

                                                        document.removeEventListener('dialog.wallet-share.prompt-shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.wallet-share.prompt-shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('wallet-share.share-prompt', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: wallet && 'uuid' in wallet ? wallet?.uuid : ''
                                                    }
                                                }));
                                            }}>
                                                <span className={ ` ` }>Share</span>
                                            </DropdownMenuItem>;
                                        }

                                        return <></>;
                                    })()}
                                    {/* Edit Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let walletDialogSection = document.getElementById('walletShare-dialogSection');
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

                                                        document.removeEventListener('dialog.wallet-share.shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.wallet-share.shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('wallet-share.edit-action', {
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
                                    {/* Balance Adjustment Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let walletDialogSection = document.getElementById('walletShareBalanceAdjustment-dialogSection');
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

                                                        document.removeEventListener('dialog.wallet-share.balance-adjustment.shown', revertToOriginalText);
                                                    }
                                                    document.addEventListener('dialog.wallet-share.balance-adjustment.shown', revertToOriginalText);
                                                }

                                                document.dispatchEvent(new CustomEvent('wallet-share.balance-adjustment.edit-action', {
                                                    bubbles: true,
                                                    detail: {
                                                        uuid: wallet && 'uuid' in wallet ? wallet?.uuid : ''
                                                    }
                                                }));
                                            }}>
                                                <span className={ ` text-yellow-500` }>Balance Adjustment</span>
                                            </DropdownMenuItem>;
                                        }

                                        return <></>;
                                    })()}
                                    {/* Delete Action */}
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let deleteSection = document.getElementById('walletShare-deleteDialogSection');
                                        if(deleteAction && deleteSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                document.dispatchEvent(new CustomEvent('wallet-share.delete-action', {
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

                {/* List of wallet */}
                {(() => {
                    let items = [];
                    if(wallet && wallet.passphrase){
                        items.push(<small key={ `items_passphrase-${wallet.uuid}` }><i className={ `fa-solid fa-lock` }></i></small>);
                    }
                    if(wallet && wallet.valid_until){
                        items.push(<small key={ `items_deadline-${wallet.uuid}` } className={ `${moment(moment(wallet.valid_until).format('YYYY-MM-DD')) < moment(moment().format('YYYY-MM-DD')) ? `text-red-500` : ``}` }><i className={ `fa-solid fa-clock` }></i></small>);
                    }
                    if(wallet && 'wallet_share_item' in wallet && wallet.wallet_share_item){
                        items.push(<small key={ `items_wallet-${wallet.uuid}` } className={ ` flex flex-row gap-1 items-center` }>
                            <i className={ `fa-solid fa-wallet` }></i>
                            <span>{ wallet && 'wallet_share_item' in wallet && wallet.wallet_share_item ? shownWallet(wallet.wallet_share_item) : '' }</span>
                        </small>);
                    }

                    if(items.length > 0){
                        return <div className={ ` flex flex-row flex-wrap gap-2 items-center` }>
                            {items}
                        </div>;
                    }
                    
                    return <></>;
                })()}
            </div>
        </section>
    );
}