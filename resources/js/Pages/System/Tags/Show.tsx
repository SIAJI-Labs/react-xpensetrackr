import { Head, Link, router } from "@inertiajs/react";
import { PageProps, TagsItem } from "@/types"

// Partials
import TemplateBackButton from "@/Components/template/TemplateBackButton";
import SystemLayout from "@/Layouts/SystemLayout";

// Plugins
import { momentFormated } from "@/function";

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

// Props
type ContentProps = {
    data: TagsItem
    related: TagsItem
}

export default function Show({ auth, data, related }: PageProps<ContentProps>) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                location.href = route('sys.tags.index');
            } else {
                router.reload();
            }

            // setOpenDropdown(false);
        }
        document.addEventListener('tags.deleted-action', handleDialogEvent);
        document.addEventListener('dialog.tags.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('tags.deleted-action', handleDialogEvent);
            document.removeEventListener('dialog.tags.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tags Detail: { `${data?.name}` }</h2>}
            >
                <Head title={ `Tags: ${data?.name}` } />

                <div className="flex flex-col gap-6">
                    <TemplateBackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Tags Detail: { `${data?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${data?.name}` }</u> tags</CardDescription>
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
                                            let tagsDialogSection = document.getElementById('tags-dialogSection');
                                            if(tagsDialogSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                    let el = $refs.target as HTMLElement;
                                                    if(el){
                                                        let originalText = el.innerHTML;
                                                        el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                        const revertToOriginalText = () => {
                                                            if(originalText){
                                                                el.innerHTML = originalText;
                                                            }

                                                            document.removeEventListener('dialog.tags.shown', revertToOriginalText);
                                                        }
                                                        document.addEventListener('dialog.tags.shown', revertToOriginalText);
                                                    }

                                                    document.dispatchEvent(new CustomEvent('tags.edit-action', {
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

                                        {/* Delete Action */}
                                        {(() => {
                                            // Check if record dialog form is exists
                                            let deleteSection = document.getElementById('tags-deleteDialogSection');
                                            if(deleteSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                    document.dispatchEvent(new CustomEvent('tags.delete-action', {
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
                                if('deleted_at' in data && data.deleted_at !== null){
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
                                <div className={ ` flex flex-col items-start` }>
                                    <span>Last Transaction</span>
                                    <span>-</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </SystemLayout>
        </>
    );
}