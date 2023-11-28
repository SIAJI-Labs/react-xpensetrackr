import { PageProps, WalletItem } from "@/types"
import { useIsFirstRender } from "@/lib/utils";
import { Head, Link, router } from "@inertiajs/react";

// Partials
import TemplateBackButton from "@/Components/template/TemplateBackButton";
import ListTemplate from "@/Components/template/Wallet/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
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
    data: WalletItem
    related: WalletItem
}

export default function Show({ auth, data, related }: PageProps<WalletShow>) {
    const isFirstRender = useIsFirstRender();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate wallet={obj}/>;
    }

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                location.href = route('sys.wallet.index');
            } else {
                router.reload();
            }

            // setOpenDropdown(false);
        }
        document.addEventListener('dialog.wallet.hidden', handleDialogEvent);
        document.addEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.wallet.hidden', handleDialogEvent);
            document.removeEventListener('dialog.wallet.balance-adjustment.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Detail: { `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</h2>}
            >
                <Head title={ `Planned Summary: ${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` } />

                <div className="flex flex-col gap-6">
                    <TemplateBackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Wallet Detail: { `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</u> wallet</CardDescription>
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
                                            let walletDialogSection = document.getElementById('wallet-dialogSection');
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

                                                    document.dispatchEvent(new CustomEvent('wallet.edit-action', {
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
                                            let walletDialogSection = document.getElementById('walletBalanceAdjustment-dialogSection');
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

                                                            document.removeEventListener('dialog.wallet.balance-adjustment.shown', revertToOriginalText);
                                                        }
                                                        document.addEventListener('dialog.wallet.balance-adjustment.shown', revertToOriginalText);
                                                    }

                                                    document.dispatchEvent(new CustomEvent('wallet.balance-adjustment.edit-action', {
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
                                            let deleteSection = document.getElementById('wallet-deleteDialogSection');
                                            if(deleteSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                    document.dispatchEvent(new CustomEvent('wallet.delete-action', {
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
                            {(() => {
                                if(data.parent && data.parent.deleted_at !== null){
                                    return <>
                                        <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                            <span className=" flex items-center gap-2 text-sm font-normal">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                                <span className={ `font-normal` }>Parent Wallet is Deleted</span>
                                            </span>
                                            <span className=" block mt-2">Parent Wallet is deleted at { momentFormated('MMM Do, YYYY / HH:mm', data.parent.deleted_at) }</span>
                                        </div>
                                    </>;
                                } else if('deleted_at' in data && data.deleted_at !== null){
                                    return <>
                                        <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                            <span className=" flex items-center gap-2 text-sm font-normal">
                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                                <span className={ `font-normal` }>Data is Deleted</span>
                                            </span>
                                            <span className=" block mt-2">Related data is deleted at { momentFormated('MMM Do, YYYY / HH:mm', data.deleted_at) }</span>
                                        </div>
                                    </>;
                                }

                                return <></>;
                            })()}

                            <div className={ ` flex flex-row justify-between` }>
                                <div className={ ` flex flex-col` }>
                                    <span>Balance</span>
                                    <span className={ `font-semibold` }>{ formatRupiah(data.balance ?? 0) }</span>
                                </div>

                                {(() => {
                                    if(data.parent_id){
                                        return <>
                                            <div className={ ` flex flex-col items-end` }>
                                                <span>Related to</span>
                                                <Link href={ route('sys.wallet.show', data.parent.uuid) }>
                                                    <span className={ `font-semibold underline` }>{ data.parent.name }</span>
                                                </Link>
                                            </div>
                                        </>;
                                    }

                                    return <></>;
                                })()}
                            </div>

                            <div className={ ` flex flex-row justify-between` }>
                                <div className={ ` flex flex-col` }>
                                    <span>Purpose</span>
                                    <Badge>{ ucwords(data.type) }</Badge>
                                </div>
                                <div className={ ` flex flex-col items-end` }>
                                    <span>Last Transaction</span>
                                    <span>-</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {(() => {
                    if(related && Object.keys(related).length > 0){
                        return <>
                            <Card className={ ` w-full mt-6` }>
                                <CardHeader>
                                    <div className={ ` relative flex flex-row justify-between items-start` }>
                                        <div>
                                            <CardTitle>
                                                <div className={ ` text-base` }>Related wallet</div>
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className={ `flex flex-col gap-4` }>
                                        {(() => {
                                            let relatedElement: any = [];
                                            let defaultContent = <TemplateNoData></TemplateNoData>;

                                            Object.values(related).forEach((val, index) => {
                                                console.log(val);

                                                relatedElement.push(
                                                    <div key={ `related_item-${index}` }>
                                                        {listTemplate(val)}
                                                    </div>
                                                );
                                            });

                                            return relatedElement.length > 0 ? relatedElement : defaultContent;
                                        })()}
                                    </div>
                                </CardContent>
                            </Card>
                        </>;
                    }

                    return <></>;
                })()}
            </SystemLayout>
        </>
    );
}