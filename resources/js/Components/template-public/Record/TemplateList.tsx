import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { RecordItem } from '@/types';
import { useIsFirstRender } from '@/lib/utils';
import { RemoveScroll } from 'react-remove-scroll';
import { useMediaQuery } from 'usehooks-ts';

// Plugins
import { formatRupiah, momentFormated, ucwords } from '@/function';
import moment from 'moment-timezone';
import "@/../css/siaji.scss";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/Components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import axios from 'axios';

type TemplateProps = {
    record: RecordItem,
    token?: string | undefined
}

export default function TemplateList({ record, token }: PropsWithChildren<TemplateProps> ){
    const isFirstRender = useIsFirstRender();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Detail Dialog
    const [openState, setOpenState] = useState<boolean>(false);
    // State for Hidden
    const [showHidden, setShowHidden] = useState<boolean>(false);

    // Small Information
    const [elSmallInformation, setElSmallInformation] = useState<ReactNode | undefined>(undefined);
    const handleElSmallInformation = () => {
        const information = [];

        // Type
        if(record?.type){
            information.push(
                <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_type-${record?.uuid}` }>
                    <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                    <span>{ucwords(record?.type)}</span>
                </Badge>
            );
        }

        // Wallet
        if(record?.from_wallet){
            let walletName = [];
            walletName.push(<span key={ `from_wallet-${record?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ record?.from_wallet?.name }</span>);
            if(record?.to_wallet){
                // Push to Wallet
                walletName.push(<i key={ `icon_wallet-${record?.uuid}` } className={ `fa-solid ${record?.type === 'expense' ? 'fa-caret-right' : 'fa-caret-left'}` }></i>);
                walletName.push(<span key={ `to_wallet-${record?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ record?.to_wallet?.name }</span>);
            }
            
            information.push(
                <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_wallet-${record?.uuid}` }>
                    <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                    <span className={ ` flex items-center gap-1` }>{ walletName }</span>
                </Badge>
            );
        }

        // Notes
        if(record?.note){
            information.push(
                <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_notes-${record?.uuid}` }>
                    <i className={ `fa-solid fa-align-left leading-none text-xs` }></i>
                    <span>Notes</span>
                </Badge>
            );
        }

        // Tags
        if(record?.record_tags && record.record_tags.length > 0){
            information.push(
                <Badge variant={ `secondary` } className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_tags-${record?.uuid}` }>
                    <i className={ `fa-solid fa-hashtag leading-none text-xs` }></i>
                    <span>Tags</span>
                </Badge>
            );
        }

        if(information.length > 0){
            setElSmallInformation(
                <>
                    <div className={ ` mt-2 flex flex-row gap-2 flex-wrap` } key={ `record_information-${record?.uuid}` }>
                        {information}
                    </div>
                </>
            );
        }
    }

    useEffect(() => {
        if(isFirstRender){
            handleElSmallInformation();
        }
    });
    useEffect(() => {
        handleElSmallInformation;
    }, [record]);

    // Detail Dialog Content
    const dialogContent = <>
        <RemoveScroll className={ `overflow-auto ${isDesktop ? `max-h-screen max-lg:max-h-[50vh] lg:max-h-[65vh] border-b border-t` : ` border-t`}` }>
            <div className={ ` !overflow-hidden ${isDesktop ? `` : ``}` }>
                <div className={ ` flex gap-6 flex-col p-6` }>
                    {/* Timestamp */}
                    <div className={ ` flex flex-row gap-2` }>
                        <span><i className={ `fa-solid fa-clock` }></i></span>
                        <span className={ ` font-medium` }>{ momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }</span>
                    </div>

                    {(() => {
                        if(record && 'planned_payment_record' in record && record.planned_payment_record){
                            return (
                                <>
                                    <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                        <span className=" flex items-center gap-2 text-sm font-normal">
                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                            <span className={ `font-normal` }>Part of Planned Payment</span>
                                        </span>
                                        <span className=" block mt-2">{(() => {
                                            if(record.planned_payment_record && record.planned_payment_record.planned_payment){
                                                return (
                                                    <>
                                                        <span>This record are part of <u><Link href={ route('sys.planned-payment.show', record.planned_payment_record.planned_payment.uuid) } className={ `text-primary` }>{record.planned_payment_record.planned_payment.name}</Link></u> Planned Payment</span>
                                                    </>
                                                )
                                            }

                                            return <></>;
                                        })()}</span>
                                    </div>
                                </>
                            );
                        } else if(record.is_hidden){
                            return (
                                <>
                                    <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                                        <span className=" flex items-center gap-2 text-sm font-normal">
                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                            <span className={ `font-normal` }>Hidden record</span>
                                        </span>
                                        <span className=" block mt-2">Record is hidden, but affect your wallet balance</span>
                                    </div>
                                </>
                            );
                        }

                        return <></>;
                    })()}

                    {/* Type, Category, and Wallet */}
                    <div className={ ` flex gap-4` }>
                        <div className={ ` w-1/3` }>
                            <div className={ ` border ${record.type === 'income' ? ` border-green-500` : `  border-red-500`} rounded-md h-full flex flex-col gap-2 justify-center items-center` }>
                                {/* Icon */}
                                <div className={ `` }>
                                    {(() => {
                                        if(record.to_wallet){
                                            // Transfer
                                            return <i className={ ` text-2xl fa-solid fa-arrow-right-arrow-left rotate-90 ${record.type === 'income' ? ` text-green-500` : `text-red-500`}` }></i>;
                                        } else {
                                            // Either income / expense
                                            return <i className={ `text-2xl fa-solid ${record.type === 'income' ? ` text-green-500 fa-right-to-bracket rotate-90` : ` text-red-500 fa-right-from-bracket -rotate-90`}` }></i>
                                        }

                                        return <></>;
                                    })()}
                                </div>
                                {/* Text */}
                                <div className={ ` flex flex-col justify-center` }>
                                    <span className={ `font-normal text-center` }>{record.to_wallet ? 'Transfer' : ucwords(record.type)}</span>
                                    {(() => {
                                        if(record.to_wallet){
                                            return <span className={ ` text-xs text-center` }>({ucwords(record.type)})</span>
                                        }

                                        return <></>;
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className={ ` w-2/3` }>
                            {/* Category */}
                            <div className={ `` }>
                                <span className={ `font-normal text-sm` }>Category</span>
                                <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>
                                    {(() => {
                                        if(record.category){
                                            return <Link href={ route('sys.category.show', record.category.uuid) }>
                                                <span><u>{record.category.name}</u></span>
                                            </Link>
                                        }

                                        return 'Uncategorized';
                                    })()}
                                </span>
                            </div>

                            {/* From Wallet */}
                            <div className={ `` }>
                                <span className={ `font-normal text-sm` }>From</span>
                                <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>
                                    {(() => {
                                        if(record.from_wallet){
                                            return <Link href={ route('sys.wallet.show', record.from_wallet.uuid) }>
                                                <span><u>{record.from_wallet.name}</u></span>
                                            </Link>
                                        }

                                        return '-';
                                    })()}
                                </span>
                            </div>

                            {/* To Wallet */}
                            {(() => {
                                if(record.to_wallet){
                                    return <>
                                        <div className={ `` }>
                                            <span className={ `font-normal text-sm` }>To</span>
                                            <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>
                                                <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>
                                                    {(() => {
                                                        if(record.to_wallet){
                                                            return <Link href={ route('sys.wallet.show', record.to_wallet.uuid) }>
                                                                <span><u>{record.to_wallet.name}</u></span>
                                                            </Link>
                                                        }

                                                        return '-';
                                                    })()}
                                                </span>
                                            </span>
                                        </div>
                                    </>;
                                }
                                
                                return <></>;
                            })()}
                        </div>
                    </div>

                    {/* Note */}
                    <div className=" w-full p-4 rounded-lg border-2 border-dashed">
                        <span className=" flex items-center gap-2 text-sm font-normal">
                            <i className="fa-solid fa-align-left"></i>
                            <span className={ `font-normal` }>Note(s)</span>
                        </span>
                        <span className=" block mt-2">{ record.note ?? 'No description provided' }</span>
                    </div>

                    {/* Amount, etc */}
                    <div className={ ` flex flex-col` }>
                        <div className={ `flex justify-between text-sm` }>
                            <span>Amount</span>
                            <span data-review="amount">{ formatRupiah(record.amount ?? 0) }</span>
                        </div>
                        <div className={ `flex justify-between text-sm` }>
                            <span>
                                <span>Extra</span>
                                {(() => {
                                    if(record.extra_type === 'percentage'){
                                        return <span className={ `text-xs` }>({ record.extra_percentage ?? 0 }%)</span>;
                                    }
                                    return <></>;
                                })()}
                            </span>
                            <span data-review="extra_amount">{ formatRupiah(record.extra_amount) }</span>
                        </div>
                        <hr className={ `my-1` }/>
                        <div className={ `flex justify-between mt-2` }>
                            <span className={ `font-semibold` }>Final Amount</span>
                            <span className={ `font-semibold` } data-review="final_amount">{ formatRupiah(record.amount + record.extra_amount) }</span>
                        </div>
                    </div>

                    {(() => {
                        if(record.record_tags && record.record_tags.length > 0){
                            let tags: any[] = [];
                            (record.record_tags).forEach((value, index) => {
                                tags.push(
                                    <Link href={ route('sys.tags.show', value.uuid) } key={ `tags_${value.uuid}` }>
                                        <Badge>{ value.name }</Badge>
                                    </Link>
                                );
                            });

                            return (
                                <div className={ ` flex flex-row gap-2 flex-wrap` }>
                                    <span className={ ` flex flex-row gap-1 items-center text-sm` }>
                                        <i className={ ` fa-solid fa-hashtag` }></i>
                                        <span>Tags:</span>
                                    </span>

                                    { tags }
                                </div>
                            );
                        }

                        return <></>;
                    })()}
                </div>
            </div>
        </RemoveScroll>
    </>;
    // Detail Dialog
    let dialogWrapper = <>
        <Dialog open={openState} onOpenChange={setOpenState}>
            <DialogContent className=" flex flex-col h-auto lg:min-w-[60vw] max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0 p-0" data-type="record-dialog">
                <DialogHeader className={ ` p-6 pb-2` }>
                    <DialogTitle className={ ` dark:text-white` }>Detail Record</DialogTitle>
                </DialogHeader>

                { dialogContent }
            </DialogContent>
        </Dialog>
    </>;
    if(!isDesktop){
        // Overwrite, use Drawer instead of dialog
        dialogWrapper = <>
            <Drawer open={openState} onOpenChange={setOpenState} closeThreshold={ 0.3 }>
                <DrawerContent className={ ` max-h-dvh` }>
                    <DrawerHeader className="text-left">
                        <DrawerTitle className={ ` text-center` }>Detail Record</DrawerTitle>
                    </DrawerHeader>

                    { dialogContent }
                </DrawerContent>
            </Drawer>
        </>;
    }

    return (
        <section key={r}>
            {(() => {
                if(record?.is_hidden){
                    return <>
                        <div className={ ` flex flex-col gap-4 border rounded p-4 cursor-pointer overflow-hidden` } data-toggle="hidden-record" onClick={() => {
                            console.log('ABC');
                            setOpenState(true);
                        }}>
                            <div className={ `${showHidden ? 'block' : 'hidden'}` }>
                                {/* Date, amount and action */}
                                <div className={ ` flex flex-row justify-between flex-wrap-reverse` }>
                                    <span className={ ` font-medium w-full md:w-auto` }>
                                        { momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }
                                    </span>

                                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                        <span className={ ` font-normal ${record ? (record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>{formatRupiah((record?.amount ?? 0) + (record?.extra_amount ?? 0))}</span>
                                    </div>
                                </div>

                                {/* Extra Information */}
                                {(() => {
                                    if(elSmallInformation){
                                        return elSmallInformation;
                                    }

                                    return <></>;
                                })()}
                            </div>
                            
                            <div className={ ` relative flex flex-row justify-center` }>
                                <div className={ ` absolute left-0 top-1/2 border-b border-dashed border-spacing-10 w-full` }></div>

                                <div className={ ` absolute -left-4 -top-4 h-[calc(100%+2rem)] w-1/4 bg-gradient-to-r from-white via-white to-transparent` }></div>
                                <div className={ ` absolute -right-4 -top-4 h-[calc(100%+2rem)] w-1/4 bg-gradient-to-l from-white via-white to-transparent` }></div>

                                <Button variant={ `outline` } className={ ` w-fit h-8 py-0 z-[9]` } onClick={($refs) => {
                                    $refs.stopPropagation();

                                    setShowHidden(!showHidden);
                                }}>
                                    <span className={ `` }>See {showHidden ? 'less' : 'more'}</span>
                                </Button>
                            </div>
                        </div>
                    </>;
                }

                return <>
                    <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` } onClick={() => {
                        setOpenState(true);
                    }}>
                        {/* Date, amount and action */}
                        <div className={ ` flex flex-row justify-between flex-wrap-reverse` }>
                            <span className={ ` font-medium w-full md:w-auto` }>
                                { momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }
                            </span>

                            <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                <span className={ ` font-normal ${record ? (record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>{formatRupiah((record?.amount ?? 0) + (record?.extra_amount ?? 0))}</span>
                            </div>
                        </div>

                        {/* Icon, Category, Notes */}
                        <div className={ ` flex flex-row gap-4 items-center` }>
                            <div className={ ` p-3 h-10 w-10 rounded-full ${ record ? (record.type === 'expense' ? ` bg-red-500` : `bg-green-500`) : `` } flex items-center justify-center` }>
                                <i className={ ` text-white fa-solid ${record ? (record.type === 'income' ? `fa-right-to-bracket rotate-90` : `fa-right-from-bracket -rotate-90`) : ``}` }></i>
                            </div>

                            <div className={ ` w-full flex flex-col overflow-hidden` }>
                                <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>
                                    { record?.category ? record.category.name : 'Uncategorized' }
                                </span>
                                <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{record?.note ?? 'No description'}</span>
                            </div>
                        </div>

                        {/* Extra Information */}
                        {(() => {
                            if(elSmallInformation){
                                return elSmallInformation;
                            }

                            return <></>;
                        })()}
                    </div>
                </>;
            })()}

            {dialogWrapper}
        </section>
    );
}