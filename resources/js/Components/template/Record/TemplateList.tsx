import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { RecordItem } from '@/types';

// Plugins
import { formatRupiah, momentFormated, ucwords } from '@/function';
import moment from 'moment-timezone';
import "@/../css/siaji.scss";

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { useIsFirstRender } from '@/lib/utils';

type TemplateProps = {
    record?: RecordItem,
    deleteAction?: boolean,
    editAction?: boolean
}

export default function TemplateList({ record, deleteAction = true, editAction = true }: PropsWithChildren<TemplateProps> ){
    const isFirstRender = useIsFirstRender();

    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
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

    useEffect(() => {
        // Listen to Dialog event
        const handleDialogEvent = () => {
            setTimeout(() => {
                setOpenDropdown(false);
            }, 100);
        }

        document.addEventListener('dialog.record.shown', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.shown', handleDialogEvent);
        };
    });

    return (
        <section key={r}>
            {(() => {
                if(record?.is_hidden){
                    return <>
                        <div className={ ` flex flex-col gap-4 border rounded p-4 cursor-pointer overflow-hidden` } data-toggle="hidden-record">
                            <div className={ `${showHidden ? 'block' : 'hidden'}` }>
                                {/* Date, amount and action */}
                                <div className={ ` flex flex-row justify-between flex-wrap-reverse` } onClick={($refs) => {
                                    setOpenDropdown(true);
                                }}>
                                    <span className={ ` font-medium w-full md:w-auto` }>
                                        { momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }
                                    </span>

                                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                        <span className={ ` font-normal ${record ? (record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>{formatRupiah((record?.amount ?? 0) + (record?.extra_amount ?? 0))}</span>
                                        <div>
                                            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                                    {/* Detail Action */}
                                                    <Link href={ route('sys.record.show', record?.uuid) }>
                                                        <DropdownMenuItem className={ ` cursor-pointer` }>
                                                            <span className={ ` text-blue-500` }>Detail</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    {/* Edit Action */}
                                                    {(() => {
                                                        // Check if record dialog form is exists
                                                        let dialogSection = document.getElementById('record-dialogSection');
                                                        if(dialogSection && editAction){
                                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                                let el = $refs.target as HTMLElement;
                                                                if(el){
                                                                    let originalText = el.innerHTML;
                                                                    el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                                    const revertToOriginalText = () => {
                                                                        if(originalText){
                                                                            el.innerHTML = originalText;
                                                                        }

                                                                        document.removeEventListener('dialog.record.shown', revertToOriginalText);
                                                                    }
                                                                    document.addEventListener('dialog.record.shown', revertToOriginalText);
                                                                }

                                                                // Dispatch edit action
                                                                document.dispatchEvent(new CustomEvent('record.edit-action', {
                                                                    bubbles: true,
                                                                    detail: {
                                                                        uuid: record?.uuid
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
                                                        let dialogSection = document.getElementById('record-deleteDialogSection');
                                                        if(dialogSection && deleteAction){
                                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                                document.dispatchEvent(new CustomEvent('record.delete-action', {
                                                                    bubbles: true,
                                                                    detail: {
                                                                        uuid: record?.uuid
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

                                <Button variant={ `outline` } className={ ` w-fit z-10 h-8 py-0 z-[9]` } onClick={($refs) => {
                                    setShowHidden(!showHidden);
                                }}>
                                    <span className={ `` }>See {showHidden ? 'less' : 'more'}</span>
                                </Button>
                            </div>
                        </div>
                    </>;
                }

                return <>
                    <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` } onClick={($refs) => {
                        setOpenDropdown(true);
                    }}>
                        {/* Date, amount and action */}
                        <div className={ ` flex flex-row justify-between flex-wrap-reverse` }>
                            <span className={ ` font-medium w-full md:w-auto` }>
                                { momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }
                            </span>

                            <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                                <span className={ ` font-normal ${record ? (record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>{formatRupiah((record?.amount ?? 0) + (record?.extra_amount ?? 0))}</span>
                                <div>
                                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                                <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                            {/* Detail Action */}
                                            <Link href={ route('sys.record.show', record?.uuid) }>
                                                <DropdownMenuItem className={ ` cursor-pointer` }>
                                                    <span className={ ` text-blue-500` }>Detail</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            {/* Edit Action */}
                                            {(() => {
                                                // Check if record dialog form is exists
                                                let dialogSection = document.getElementById('record-dialogSection');
                                                if(dialogSection && editAction){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                        let el = $refs.target as HTMLElement;
                                                        if(el){
                                                            let originalText = el.innerHTML;
                                                            el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                            const revertToOriginalText = () => {
                                                                if(originalText){
                                                                    el.innerHTML = originalText;
                                                                }

                                                                document.removeEventListener('dialog.record.shown', revertToOriginalText);
                                                            }
                                                            document.addEventListener('dialog.record.shown', revertToOriginalText);
                                                        }

                                                        // Dispatch edit action
                                                        document.dispatchEvent(new CustomEvent('record.edit-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: record?.uuid
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
                                                let dialogSection = document.getElementById('record-deleteDialogSection');
                                                if(dialogSection && deleteAction){
                                                    return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                        document.dispatchEvent(new CustomEvent('record.delete-action', {
                                                            bubbles: true,
                                                            detail: {
                                                                uuid: record?.uuid
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
        </section>
    );
}