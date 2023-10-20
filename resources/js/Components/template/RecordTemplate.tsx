import { useState, PropsWithChildren, ReactNode } from 'react';
import "../../../css/siaji.scss";

import { RecordItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

// Plugins
import moment from 'moment';
import { formatRupiah, ucwords } from '@/function';

// Shadcn
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';

export default function RecordTemplate({ record }: PropsWithChildren<{record?: RecordItem}> ){
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                        {/* Date, amount and action */}
                        <div className={ ` flex flex-row justify-between` } onClick={($refs) => {
                            // let dropdownTrigger = ($refs.target as HTMLElement).querySelector(`[data-type="dropdown-trigger"]`);
                            // if(dropdownTrigger){
                            //     dropdownTrigger.dispatchEvent(new Event('click', { bubbles: true}));
                            // }
                        }}>
                            <span>{moment(record?.datetime).format('MMM Do, YYYY / HH:mm')}</span>

                            <div className={ ` flex flex-row gap-2 items-center` }>
                                <span>{formatRupiah(record?.amount ?? 0)}</span>
                                <div>
                                    <Button variant="link" className={ ` p-0 h-auto leading-none` } data-type="dropdown-trigger">
                                        <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Icon, Category, Notes */}
                        <div className={ ` flex flex-row gap-4 items-center` }>
                            <div className={ ` p-3 h-10 w-10 rounded-full bg-red-500 flex items-center justify-center` }>
                                <i className={ `fa-solid fa-right-from-bracket -rotate-90 text-white` }></i>
                            </div>

                            <div className={ ` w-full flex flex-col overflow-hidden` }>
                                <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis` }>{record?.category ? (`${record.category.parent ? `${record.category.parent.name} - ` : ''}${record.category.name}`) : 'Uncategorized'}</span>
                                <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>{record?.note ?? 'No description'}</span>
                            </div>
                        </div>

                        {/* Extra Information */}
                        {(() => {
                            const information = [];

                            // Type
                            if(record?.type){
                                // <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                                //         <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                                //         <span>Cash</span>
                                //     </Badge>
                                information.push(
                                    <Badge className={ ` rounded flex flex-row gap-1 items-center` } key={ `record_type-${record?.uuid}` }>
                                        <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                                        <span>{ucwords(record?.type)}</span>
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
                                    <div className={ ` mt-2 flex flex-row gap-2` } key={ `record_information-${record?.uuid}` }>
                                        {information}
                                    </div>
                                </>;
                            }
                        })()}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={-155} alignOffset={15} side={ `right` } align={ `start` }>
                    <DropdownMenuItem>
                        <Link href={ `` }>
                            <span className={ ` text-blue-500` }>Detail</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={ `` }>
                            <span className={ ` text-yellow-500` }>Edit</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={ `` }>
                            <span className={ ` text-red-500` }>Delete</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    );
}