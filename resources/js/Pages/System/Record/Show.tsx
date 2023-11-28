import SystemLayout from '@/Layouts/SystemLayout';
import { PageProps, RecordItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Partials
import BackButton from '@/Components/template/TemplateBackButton';

// Plugins
import { formatRupiah, momentFormated, ucwords } from '@/function';
import '@/../plugins/fontawesome/all.scss';
import moment from 'moment-timezone';

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

type RecordShowProps = {
    record: RecordItem,
    related?: RecordItem
}

export default function Show({ auth, record, related }: PageProps<RecordShowProps>) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogRecord = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                location.href = route('sys.record.index');
            } else {
                router.reload();
            }

            // setOpenDropdown(false);
        }
        document.addEventListener('dialog.record.hidden', handleDialogRecord);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('dialog.record.hidden', handleDialogRecord);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Record Detail</h2>}
            >
                <Head title="Record Detail" />

                <div className="flex flex-col gap-6">
                    <BackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start cursor-pointer` } onClick={() => {
                            setOpenDropdown(true);
                        }}>
                            <div>
                                <CardTitle>
                                        <div>Record: Detail</div>
                                </CardTitle>
                                <CardDescription>See your detailed transaction</CardDescription>
                            </div>

                            <div>
                                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="link" className={ ` p-0 h-auto leading-none dark:!text-white !text-black` } data-type="dropdown-trigger">
                                            <i className={ `fa-solid fa-ellipsis-vertical` }></i>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent sideOffset={5} alignOffset={0} side={ `left` } align={ `start` }>
                                        {/* Edit Action */}
                                        {(() => {
                                            // Check if record dialog form is exists
                                            let recordDialogSection = document.getElementById('record-dialogSection');
                                            if(recordDialogSection){
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
                                            let recordDialogSection = document.getElementById('record-deleteDialogSection');
                                            if(recordDialogSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                    document.dispatchEvent(new CustomEvent('record.deleted-action', {
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
                    </CardHeader>
                    <CardContent className={ ` flex flex-col gap-6` }>
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
                            }

                            return <></>;
                        })()}

                        {/* Type, Category, and Wallet */}
                        <div className={ ` flex gap-4` }>
                            <div className={ ` w-1/3` }>
                                <div className={ ` border ${record.to_wallet ? `` : (record.type === 'income' ? ` border-green-500` : `  border-red-500`)} rounded-md h-full flex flex-col gap-2 justify-center items-center` }>
                                    {/* Icon */}
                                    <div className={ `` }>
                                        {(() => {
                                            if(record.to_wallet){
                                                // Transfer
                                                return <i className={ ` text-2xl fa-solid fa-arrow-right-arrow-left rotate-90` }></i>;
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
                                    <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ record.category ? `${record.category.parent ? `${record.category.parent.name} - ` : ''}${record.category.name}` : 'Uncategorized' }</span>
                                </div>

                                {/* From Wallet */}
                                <div className={ `` }>
                                    <span className={ `font-normal text-sm` }>From</span>
                                    <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ record.from_wallet ? `${record.from_wallet.parent ? `${record.from_wallet.parent.name} - ` : ''}${record.from_wallet.name}` : '-' }</span>
                                </div>

                                {/* To Wallet */}
                                {(() => {
                                    if(record.to_wallet){
                                        return <>
                                            <div className={ `` }>
                                                <span className={ `font-normal text-sm` }>To</span>
                                                <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis` }>{ record.to_wallet ? `${record.to_wallet.parent ? `${record.to_wallet.parent.name} - ` : ''}${record.to_wallet.name}` : '-' }</span>
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
                    </CardContent>
                </Card>

                {(() => {
                    if(related){
                        return <>
                            <Link href={ route('sys.record.show', related.uuid) }>
                                <Card className={ ` mt-6 group` }>
                                    <CardContent className={ ` flex flex-row gap-6 p-6 justify-between items-center` }>
                                        <div className={ ` flex flex-col` }>
                                            <span>{ucwords(related.type)} {related.type === 'expense' ? 'of' : 'to'}</span>
                                            <span className={ `block whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-semibold` }>{ related.from_wallet ? `${related.from_wallet.parent ? `${related.from_wallet.parent.name} - ` : ''}${related.from_wallet.name}` : '-' }</span>
                                        </div>
                                        <div className={ `` }>
                                            <span className={ ` flex items-center justify-center w-10 h-10 border rounded-full p-4 group-hover:bg-primary transition-all` }>
                                                <i className={ `fa-solid fa-angle-right transition-all group-hover:text-white` }></i>
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </>;
                    }

                    return <></>;
                })()}
            </SystemLayout>
        </>
    );
}