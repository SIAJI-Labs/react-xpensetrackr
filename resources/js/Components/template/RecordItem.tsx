import { useState, PropsWithChildren, ReactNode } from 'react';
import "../../../css/siaji.scss";

import { Record } from '@/types';
import { Head, Link } from '@inertiajs/react';

// Plugins
import moment from 'moment';

// Shadcn
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/Components/ui/dropdown-menu';

export default function RecordItem({ record }: PropsWithChildren<{record?: Record}> ){
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                        {/* Date, amount and action */}
                        <div className={ ` flex flex-row justify-between` } onClick={($refs) => {
                            let dropdownTrigger = ($refs.target as HTMLElement).querySelector(`[data-type="dropdown-trigger"]`);
                            if(dropdownTrigger){
                                dropdownTrigger.dispatchEvent(new Event('click', { bubbles: true}));
                            }
                        }}>
                            <span>{moment().format('MMM Do, YYYY / HH:mm')}</span>

                            <div className={ ` flex flex-row gap-2 items-center` }>
                                <span>Rp 10.000</span>
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
                                <span className={ ` whitespace-nowrap overflow-hidden text-ellipsis` }>Uncategorized</span>
                                <span className={ ` whitespace-nowrap text-sm overflow-hidden text-ellipsis` }>Balance</span>
                            </div>
                        </div>

                        {/* Extra Information */}
                        <div className={ ` mt-2 flex flex-row gap-2` }>
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                                <i className={ `fa-solid fa-flag leading-none text-xs` }></i>
                                <span>Expense</span>
                            </Badge>
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                                <i className={ `fa-solid fa-wallet leading-none text-xs` }></i>
                                <span>Cash</span>
                            </Badge>
                            <Badge className={ ` rounded flex flex-row gap-1 items-center` }>
                                <i className={ `fa-solid fa-align-left leading-none text-xs` }></i>
                                <span>Notes</span>
                            </Badge>
                        </div>
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
        </>
    );
}