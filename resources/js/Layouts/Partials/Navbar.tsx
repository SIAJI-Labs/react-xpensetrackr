import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { User } from '@/types';

// Plugins
import { handleUserAvatar } from '@/function';

// Partials
import { ThemeToggle } from '@/Components/template/theme-toggle';
import ApplicationLogoMask from '@/Components/ApplicationLogoMask';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar from '@/Layouts/Partials/Sidebar';

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import Notification from './Notification';

export default function Navbar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const [avatar, setAvatar] = useState<string>();

    // Search Command
    const [openSearchCommand, setOpenSearchCommand] = useState<boolean>(false)
    useEffect(() => {
        document.getElementById('navbar-search')?.addEventListener('click', () => {
            setOpenSearchCommand(true);
        });
    }, []);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(openSearchCommand && e.key === 'Enter'){
                e.preventDefault();
                // Fetch active menu
                let activeItem = document.querySelector('[cmdk-item][data-selected="true"]');
                if(activeItem && activeItem.closest('a')){
                    let url = activeItem.closest('a')?.href;
                    if(url){
                        router.visit(url);
                    }
                }
            } else if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                // Show command on control + k
                e.preventDefault()
                setOpenSearchCommand((openSearchCommand) => !openSearchCommand)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down);
    }, [openSearchCommand]);
    useEffect(() => {
        let avatar = handleUserAvatar(user);
        setAvatar(avatar);
    });

    return (
        <>
            {/* Command */}
            <CommandDialog open={openSearchCommand} onOpenChange={setOpenSearchCommand} className={ `
                max-sm:!sticky
                max-sm:h-[75vh]
                max-sm:bottom-0
                max-sm:top-[unset]
                max-sm:translate-y-0
                max-sm:translate-x-0
                
                max-sm:data-[state=closed]:!slide-out-to-bottom-[50%]
                max-sm:data-[state=closed]:!slide-out-to-left-[0%]
                max-sm:data-[state=closed]:!zoom-out-100

                max-sm:data-[state=open]:!slide-in-from-bottom-[50%]
                max-sm:data-[state=open]:!slide-in-from-left-[0%]
                max-sm:data-[state=open]:!zoom-in-100
            `}>
                <CommandInput placeholder="Type a command or search..." className={ ` border-none focus:ring-0` }/>
                <CommandList className={ `max-sm:h-auto max-sm:max-h-max` }>
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
                                    { name: 'Budget', icon: '', link: null },
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
                                        let content = <CommandItem className={ ` flex flex-row gap-2 !py-2 ${sub.link ? ` cursor-pointer` : `cursor-not-allowed opacity-50`}` } key={ `cmg_${(item.name).toLowerCase()}-${(sub.name).toLowerCase()}` }>
                                            { icon }
                                            <span>{sub.name}</span>
                                        </CommandItem>

                                        if(sub.link){
                                            content = <Link href={ sub.link } className={ `cursor-pointer` } key={ `cmg_${(item.name).toLowerCase()}-${(sub.name).toLowerCase()}` }>
                                                { content }
                                            </Link>
                                        }

                                        submenu.push(content)
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
            </CommandDialog>
            
            <nav className=" bg-background/75 backdrop-blur border-b fixed w-full z-10">
                {/* Navbar */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16 relative gap-4">
                        <div className="flex gap-2 items-center">
                            {/* Sidebar - Dialog */}
                            <Sidebar user={user}/>

                            {/* Mask Logo */}
                            <div className={ `hidden md:block` }>
                                <Link href={ route('sys.index') }>
                                    <ApplicationLogoMask className={ ` h-10` }/>
                                </Link>
                            </div>
                        </div>

                        {/* Search Command */}
                        <div className={ ` h-full md:absolute md:left-1/2 md:-translate-x-1/2 items-center flex sm:max-w-[420px] w-full` }>
                            <div className={ ` flex flex-row gap-4 w-full justify-between border h-10 rounded-md items-center px-4 cursor-pointer` } id={ `navbar-search` }>
                                <div className={ ` flex flex-row items-center gap-4` }>
                                    <i className={ `fa-solid fa-magnifying-glass dark:text-white` }></i>
                                    <span className={ ` leading-none text-muted-foreground text-sm` }>Open Command <span className={ ` hidden md:inline-flex` }> or Search...</span></span>
                                </div>

                                <kbd className=" hidden pointer-events-none lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className=" text-xs leading-none">
                                        {(() => {
                                            if(navigator.userAgent.includes('Win')){
                                                return `CTRL`;
                                            }

                                            return `⌘`;
                                        })()}
                                    </span>
                                    <span className=" text-xs leading-none">+</span>
                                    <span className=" text-xs leading-none">/</span>
                                </kbd>
                            </div>
                        </div>

                        <div className=" flex items-center gap-4">
                            {/* Notification - Sheet */}
                            <Notification user={ user }/>

                            {/* Avatar - Dropdown */}
                            <div className="relative flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className={ ` cursor-pointer rounded-lg` }>
                                            <AvatarImage src={avatar} alt="avatar" />
                                            <AvatarFallback className={ ` cursor-pointer rounded-lg` }>EX</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" side={ `bottom` } align={ `end` }>
                                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={ route('sys.category.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-bookmark w-1/12` }></i>
                                                    <span className=' w-11/12'>Category</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={ route('sys.tags.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-tags w-1/12` }></i>
                                                    <span className=' w-11/12'>Tags</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={ route('sys.wallet.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-wallet w-1/12` }></i>
                                                    <span className=' w-11/12'>Wallet</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={ route('sys.profile.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-user w-1/12` }></i>
                                                    <span className={ ` w-11/12` }>Profile</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={ route('sys.setting.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-gear w-1/12` }></i>
                                                    <span className=' w-11/12'>Setting</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className={ ` flex flex-row gap-2 p-2` }>
                                            <ThemeToggle className={ ` flex flex-row gap-2 w-full` }/>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2 text-red-500` }>
                                                <Link href={route('logout')} method="post" as="button" className={ `flex flex-row gap-2 items-center` }>
                                                    <i className={ `fa-solid fa-arrow-right-from-bracket leading-none w-1/12` }></i>
                                                    <span className=' w-11/12'>Sign-out</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}