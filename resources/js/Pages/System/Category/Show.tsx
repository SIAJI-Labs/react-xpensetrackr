import { Head, Link, router } from "@inertiajs/react";
import { PageProps, CategoryItem } from "@/types"
import { useIsFirstRender } from "@/lib/utils";
import { useEffect, useState } from "react";

// Plugins
import { formatRupiah, momentFormated, ucwords } from "@/function";

// Partials
import TemplateBackButton from "@/Components/template/TemplateBackButton";
import ListTemplate from "@/Components/template/Category/TemplateList";
import TemplateNoData from "@/Components/template/TemplateNoData";
import SystemLayout from "@/Layouts/SystemLayout";


// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

// Props
type ContentProps = {
    data: CategoryItem
}

export default function Show({ auth, data }: PageProps<ContentProps>) {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // List Template
    let listTemplate = (obj?: CategoryItem | any[]) => {
        return <ListTemplate category={obj}/>;
    }

    // Listen to Record Dialog event
    useEffect(() => {
        const handleDialogEvent = (event: any) => {
            if(event.detail?.action && event.detail?.action === 'delete'){
                location.href = route('sys.category.index');
            } else {
                router.reload();
            }
        }

        document.addEventListener('category.deleted-action', handleDialogEvent);
        document.addEventListener('dialog.category.hidden', handleDialogEvent);
        // Remove the event listener when the component unmounts
        return () => {
            document.addEventListener('category.deleted-action', handleDialogEvent);
            document.removeEventListener('dialog.category.hidden', handleDialogEvent);
        };
    });

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category Detail: { `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</h2>}
            >
                <Head title={ `Category: ${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` } />

                <div className="flex flex-col gap-6">
                    <TemplateBackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row gap-4 justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Category Detail: { `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${data.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</u> category</CardDescription>
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
                                            let categoryDialogSection = document.getElementById('category-dialogSection');
                                            if(categoryDialogSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={($refs) => {
                                                    let el = $refs.target as HTMLElement;
                                                    if(el){
                                                        let originalText = el.innerHTML;
                                                        el.innerHTML = `<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>`;

                                                        const revertToOriginalText = () => {
                                                            if(originalText){
                                                                el.innerHTML = originalText;
                                                            }

                                                            document.removeEventListener('dialog.category.shown', revertToOriginalText);
                                                        }
                                                        document.addEventListener('dialog.category.shown', revertToOriginalText);
                                                    }

                                                    document.dispatchEvent(new CustomEvent('category.edit-action', {
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
                                            let deleteSection = document.getElementById('category-deleteDialogSection');
                                            if(deleteSection){
                                                return <DropdownMenuItem className={ ` cursor-pointer` } onClick={() => {
                                                    document.dispatchEvent(new CustomEvent('category.delete-action', {
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
                                                <span className={ `font-normal` }>Parent Category is Deleted</span>
                                            </span>
                                            <span className=" block mt-2">Parent Category is deleted at { momentFormated('MMM Do, YYYY / HH:mm', data.parent.deleted_at) }</span>
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
                                <div className={ ` flex flex-row justify-between` }>
                                    <div className={ ` flex flex-col` }>
                                        <span>Related to</span>
                                        {(() => {
                                            if(data.parent){
                                                return <Link href={ route('sys.category.show', data.parent.uuid) }>
                                                    <span className={ `font-semibold underline` }>{ data.parent.name }</span>
                                                </Link>
                                            }

                                            return <>-</>;
                                        })()}
                                    </div>
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
                    if(data.child && Object.keys(data.child).length > 0){
                        return <>
                            <Card className={ ` w-full mt-6` }>
                                <CardHeader>
                                    <div className={ ` relative flex flex-row justify-between items-start` }>
                                        <div>
                                            <CardTitle>
                                                <div className={ ` text-base` }>Related category</div>
                                            </CardTitle>
                                            {(() => {
                                                if(data.child){
                                                    return <CardDescription>There's { data.child.length } item(s) related to <u>{ data.name }</u></CardDescription>
                                                }

                                                return <></>;
                                            })()}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className={ `flex flex-col gap-4` }>
                                        {(() => {
                                            let relatedElement: any = [];
                                            let defaultContent = <TemplateNoData></TemplateNoData>;

                                            Object.values(data.child).forEach((val, index) => {
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