import { useState, PropsWithChildren, ReactNode } from 'react';
import "../../../css/siaji.scss";

import { RecordItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

// Plugins
import moment from 'moment-timezone';
import { formatRupiah, momentFormated, ucwords } from '@/function';

// Shadcn
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';

type RecordTemplateProps = {
    record?: RecordItem,
    handleOpenRecordDialog?: (isOpen: boolean) => void;
}

export default function RecordTemplate({ record, handleOpenRecordDialog }: PropsWithChildren<RecordTemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    // State for Dropdown
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)

    return (
        <section key={r}  onClick={($refs) => {
            setOpenDropdown(true);
        }}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                {/* Date, amount and action */}
                <div className={ ` flex flex-row justify-between flex-wrap-reverse` }>
                    {/* <span className={ ` font-medium w-full md:w-auto` }>{moment(record?.datetime).tz(moment.tz.guess()).format('MMM Do, YYYY / HH:mm')}</span> */}
                    <span className={ ` font-medium w-full md:w-auto` }>{ momentFormated('MMM Do, YYYY / HH:mm', record?.datetime, moment.tz.guess()) }</span>

                    <div className={ ` flex flex-row flex-1 md:flex-none justify-between gap-2 items-center` }>
                        <span className={ ` font-normal ${record ? (record.type === 'expense' ? ` text-red-500` : `text-green-500`) : ``}` }>{formatRupiah(record?.amount ?? 0)}</span>
                        <div>
                            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="link" className={ ` p-0 h-auto leading-none` } data-type="dropdown-trigger">
                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                    <Link href={ `` }>
                                        <DropdownMenuItem className={ ` cursor-pointer` }>
                                            <span className={ ` text-blue-500` }>Detail</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    {(() => {
                                        // Check if record dialog form is exists
                                        let recordDialogSection = document.getElementById('recordDialog-section');
                                        if(recordDialogSection){
                                            return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                if(handleOpenRecordDialog !== undefined){
                                                    handleOpenRecordDialog(true);
                                                }
                                            }}>
                                                <span className={ ` text-yellow-500` }>Edit</span>
                                            </DropdownMenuItem>;
                                        }

                                        return <></>;
                                    })()}
                                    <DropdownMenuItem>
                                        <Link href={ `` }>
                                            <span className={ ` text-red-500` }>Delete</span>
                                        </Link>
                                    </DropdownMenuItem>
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
                        <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis font-medium` }>{record?.category ? (`${record.category.parent ? `${record.category.parent.name} - ` : ''}${record.category.name}`) : 'Uncategorized'}</span>
                        <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{record?.note ?? 'No description'}</span>
                    </div>
                </div>

                {/* Extra Information */}
                {(() => {
                    const information = [];

                    // Type
                    if(record?.type){
                        information.push(
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_type-${record?.uuid}` }>
                                <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                                <span>{ucwords(record?.type)}</span>
                            </Badge>
                        );
                    }

                    // Wallet
                    if(record?.from_wallet){
                        let walletName = [];
                        walletName.push(<span key={ `from_wallet-${record?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ `${record?.from_wallet.parent ? `${record.from_wallet.parent.name} - ` : ``}${record?.from_wallet?.name}` }</span>);
                        if(record?.to_wallet){
                            walletName.push(<i key={ `icon_wallet-${record?.uuid}` } className={ `fa-solid ${record?.type === 'expense' ? 'fa-caret-right' : 'fa-caret-left'}` }></i>);
                            walletName.push(<span key={ `to_wallet-${record?.uuid}` } className={ ` max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis` }>{ `${record?.to_wallet.parent ? `${record.to_wallet.parent.name} - ` : ``}${record?.to_wallet?.name}` }</span>);
                        }
                        
                        information.push(
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_wallet-${record?.uuid}` }>
                                <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                                <span className={ ` flex items-center gap-1` }>{ walletName }</span>
                            </Badge>
                        );
                    }

                    // Notes
                    if(record?.note){
                        information.push(
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_notes-${record?.uuid}` }>
                                <i className={ `fa-solid fa-align-left leading-none text-xs` }></i>
                                <span>Notes</span>
                            </Badge>
                        );
                    }

                    if(information.length > 0){
                        return <>
                            <div className={ ` mt-2 flex flex-row gap-2 flex-wrap` } key={ `record_information-${record?.uuid}` }>
                                {information}
                            </div>
                        </>;
                    }
                })()}
            </div>
        </section>
    );
}