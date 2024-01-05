import { cn } from "@/lib/utils";

import { RemoveScroll } from 'react-remove-scroll';

// Shadcn
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Link, router } from "@inertiajs/react";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Button } from "@/Components/ui/button";
import { useEffect } from "react";

type dialogProps = {
    openState: boolean;
    setOpenState: (isOpen: boolean) => void;
    className?: string;
};

export default function CommandCenter({ openState, setOpenState, className = '' }: dialogProps){
    const isDesktop = useMediaQuery("(min-width: 768px)");
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Handle enter click during command shown
            if(openState && e.key === 'Enter'){
                e.preventDefault();
                // Fetch active menu
                let activeItem = document.querySelector('[cmdk-item][data-selected="true"]');
                if(activeItem && activeItem.querySelector('a')){
                    let url = activeItem.querySelector('a')?.href;
                    if(url){
                        router.visit(url);
                    }
                }
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down);
    }, [openState]);

    useEffect(() => {
        if(openState){
            setTimeout(() => {
                let input = document.querySelector('input[data-type="command-input"]');
                if(input){
                    (input as HTMLElement).focus();
                }
            }, 100);
        }
    }, [openState]);

    let r = (Math.random() + 1).toString(36).substring(7);
    const commandList = <>
        <RemoveScroll className={ `overflow-auto` }>
            <CommandList className={ `max-sm:h-auto max-sm:max-h-[75dvh]` } key={r}>
                <CommandEmpty>No results found.</CommandEmpty>

                {(() => {
                    let el: any[] = [];
                    let items: any = [
                        { // Suggestion Group
                            name: 'Suggestion',
                            items: [
                                { name: 'Quick Action: Create new Record', icon: '', link: route('sys.quick-action.record') },
                                { name: 'Quick Action: Planned Payment Summary', icon: '', link: route('sys.planned-payment.index', { type: 'summary' }) },
                                { name: 'Quick Action: Show Pending Record', icon: '', link: route('sys.record.index', { type: 'pending' }) },
                            ]
                        }, { // Feature Group
                            name: 'Feature',
                            items: [
                                { name: 'Dashboard', icon: '', link: route('sys.index') },
                                { name: 'Budget', icon: '', link: route('sys.budget.index') },
                                { name: 'Category', icon: '', link: route('sys.category.index') },
                                { name: 'Debt', icon: '', link: null },
                                { name: 'Goals', icon: '', link: null },
                                { name: 'Planned Payment', icon: '', link: route('sys.planned-payment.index') },
                                { name: 'Record', icon: '', link: route('sys.record.index') },
                                { name: 'Record Template', icon: '', link: null },
                                { name: 'Shopping List', icon: '', link: null },
                                { name: 'Tags', icon: '', link: route('sys.tags.index') },
                                { name: 'Wallet', icon: '', link: route('sys.wallet.index') },
                                { name: 'Wallet Group', icon: '', link: route('sys.wallet-group.index') },
                                { name: 'Wallet Share', icon: '', link: null },
                            ]
                        }, { // Report
                            name: 'Report',
                            items: [
                                { name: 'Cash Flow', icon: '', link: route('sys.report.cash-flow.index') },
                                { name: 'Notification', icon: '', link: route('sys.report.notification.index') },
                            ]
                        }, { // Misc Group
                            name: 'Miscellaneous',
                            items: [
                                { name: 'Profile', icon: ' fa-solid fa-user', link: route('sys.profile.index') },
                                { name: 'Setting', icon: 'fa-solid fa-cog', link: route('sys.setting.index') },
                            ]
                        }
                    ];

                    if(items.length > 0){
                        items.forEach((item: any) => {
                            let submenu: any[] = [];
                            if(item.items && (item.items).length > 0){
                                (item.items).forEach((sub: any)=> {
                                    let icon = <div className={ `w-6 flex items-center justify-center` }>
                                        <i className={ `text-center ${sub.icon && sub.icon !== '' ? sub.icon : ` fa-regular fa-circle`}` }></i>
                                    </div>

                                    let content = <>
                                        <div className={ `flex flex-row gap-1 ` }>
                                            { icon }
                                            <span>{sub.name}</span>
                                        </div>
                                    </>;
                                    if(sub.link){
                                        content = <Link href={ sub.link } className={ `cursor-pointer w-full` } key={ `cmg_${(item.name).toLowerCase()}-${(sub.name).toLowerCase()}` }>
                                            {content}
                                        </Link>
                                    }

                                    submenu.push(<CommandItem className={ `  !py-2 ${sub.link ? ` cursor-pointer` : `cursor-not-allowed opacity-50`}` } key={ `cmg_${(item.name).toLowerCase()}-${(sub.name).toLowerCase()}` }>
                                        {content}
                                    </CommandItem>)
                                });
                            }

                            if(submenu.length > 0){
                                el.push(
                                    <CommandGroup heading={ item.name } className={ ` !pb-2` } key={ `command_group-${(item.name).toLowerCase()}` }>
                                        { submenu }
                                    </CommandGroup>
                                );
                            }
                        });

                        if(el.length > 0){
                            return el;
                        }
                    }

                    return <></>;
                })()}
            </CommandList>
        </RemoveScroll>
    </>;

    if(!isDesktop){
        return (
            <Drawer open={openState} onOpenChange={setOpenState} closeThreshold={ 0.3 }>
                <DrawerContent className={ ` max-h-dvh` }>
                    <DrawerHeader className="text-left">
                        <DrawerTitle className={ ` text-center` }>Command Center</DrawerTitle>
                    </DrawerHeader>
                    
                    <Command className={ `` } loop>
                        <CommandInput placeholder="Type a command or search..." className={ ` border-none focus:ring-0` } data-type="command-input"/>
                        { commandList }
                    </Command>

                    <DrawerFooter className={ ` border-t` }>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <CommandDialog open={openState} onOpenChange={setOpenState} className={ cn(`
            max-sm:bottom-0
            max-sm:top-[unset]
            max-sm:translate-y-0
            
            max-sm:data-[state=closed]:!slide-out-to-bottom-[50%]
            max-sm:data-[state=closed]:!slide-out-to-left-[0%]
            max-sm:data-[state=closed]:!zoom-out-100

            max-sm:data-[state=open]:!slide-in-from-bottom-[50%]
            max-sm:data-[state=open]:!slide-in-from-left-[0%]
            max-sm:data-[state=open]:!zoom-in-100
        `, className) }>
            <CommandInput placeholder="Type a command or search..." className={ ` border-none focus:ring-0` }/>
            
            { commandList }
        </CommandDialog>
    );
}