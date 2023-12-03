import { PageProps, WalletGroupItem, WalletItem } from "@/types"
import { useIsFirstRender } from "@/lib/utils";
import { Head, Link, router } from "@inertiajs/react";

// Partials
import TemplateBackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import TemplateList from "@/Components/template/Wallet/TemplateList";
import SystemLayout from "@/Layouts/SystemLayout";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { useEffect, useState } from "react";

// Props
type WalletShow = {
    data: WalletGroupItem
}

export default function Show({ auth, data }: PageProps<WalletShow>) {
    const isFirstRender = useIsFirstRender();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // List Template
    let listTemplate = (obj?:any[]) => {
        return <TemplateList wallet={obj}/>;
    }

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                location.href = route('sys.wallet-group.index');
            } else {
                router.reload();
            }

            // setOpenDropdown(false);
        }
        document.addEventListener('dialog.wallet.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet-group.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet-group.balance-adjustment.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet-group.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet-group.balance-adjustment.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Group Detail: { `${data?.name}` }</h2>}
            >
                <Head title={ `Wallet Group: ${data?.name}` } />

                <div className="flex flex-col gap-6">
                    <TemplateBackButton className={ `px-0` }/>
                </div>

                <div className={ ` flex flex-col gap-6` }>
                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                            <div>Wallet Group Detail: { `${data?.name}` }</div>
                                    </CardTitle>
                                    <CardDescription>See summary of <u>{ `${data?.name}` }</u> wallet group</CardDescription>
                                </div>

                                <div>
                                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                            {/* Refresh Action */}
                                            <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                router.reload();
                                                
                                                setTimeout(() => {
                                                    setOpenDropdown(false);
                                                }, 100);
                                            }}>
                                                <span className={ `` }>Refresh</span>
                                            </DropdownMenuItem>

                                            {/* Edit Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let walletDialogSection = document.getElementById('walletGroup-dialogSection');
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

                                                                document.removeEventListener('dialog.wallet.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.wallet.shown', revertToOriginalText);
                                                        }

                                                        document.dispatchEvent(new CustomEvent('wallet-group.edit-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : ''
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
                                                let walletDialogSection = document.getElementById('walletGroupBalanceAdjustment-dialogSection');
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

                                                                document.removeEventListener('dialog.wallet-group.balance-adjustment.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.wallet-group.balance-adjustment.shown', revertToOriginalText);
                                                        }

                                                        document.dispatchEvent(new CustomEvent('wallet-group.balance-adjustment.edit-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : ''
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
                                                let deleteSection = document.getElementById('walletGroup-deleteDialogSection');
                                                if(deleteSection){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                        document.dispatchEvent(new CustomEvent('wallet-group.delete-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: data && 'uuid' in data ? data?.uuid : null,
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
                        </CardHeader>
                        <CardContent>
                            <div className={ ` flex flex-col gap-4` }>
                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-col` }>
                                        <span>Balance</span>
                                        <span className={ `font-semibold` }>{ formatRupiah(data.balance ?? 0) }</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={ ` w-full` }>
                        <CardHeader>
                            <div className={ ` relative flex flex-row justify-between items-start` }>
                                <div>
                                    <CardTitle>
                                            <div>List of Item</div>
                                    </CardTitle>
                                    <CardDescription>See the list of wallet group</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                if('wallet_group_item' in data && data.wallet_group_item && data.wallet_group_item?.length > 0){
                                    let items: any[] = [];
                                    (data.wallet_group_item).forEach((value) => {
                                        items.push(
                                            <TemplateList wallet={value} key={ `group_item-${value.uuid}` }/>
                                        );
                                    });

                                    if(items.length > 0){
                                        return <div className={ ` flex flex-col gap-4` }>
                                            {items}
                                        </div>
                                    }
                                }

                                return <TemplateNoData/>
                            })()}
                        </CardContent>
                    </Card>
                </div>
            </SystemLayout>
        </>
    );
}