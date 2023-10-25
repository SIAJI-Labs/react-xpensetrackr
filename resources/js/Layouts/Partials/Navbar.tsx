import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogoMask';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { useTheme, getCurrentTheme } from '@/Components/template/theme-provider';

export default function Navbar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const { setTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    // Search Command
    const [openSearchCommand, setOpenSearchCommand] = useState<boolean>(false)
    useEffect(() => {
        document.getElementById('navbar-search')?.addEventListener('click', () => {
            setOpenSearchCommand(true);
        });

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpenSearchCommand((openSearchCommand) => !openSearchCommand)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    return (
        <>
            {/* Command */}
            <CommandDialog open={openSearchCommand} onOpenChange={setOpenSearchCommand}>
                <CommandInput placeholder="Type a command or search..." className={ ` border-none focus:ring-0` }/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    {/* Feature */}
                    {(() => {
                        let el: any[] = []
                        let suggestions: { name: string, icon?: string, link?: any}[] = [
                            { name: 'Quick Action: Create new Record', icon: '', link: null },
                            { name: 'Quick Action: Planned Payment Summary', icon: '', link: null },
                            { name: 'Quick Action: Show Pending Record', icon: '', link: null },
                        ];

                        suggestions.map((obj, index) => {
                            el.push(
                                <CommandItem className={ ` flex flex-row gap-2 !py-2` } key={ `command_item_suggestion-${index}` }>
                                    <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                    <span>{obj.name}</span>
                                </CommandItem>
                            );
                        });
                        if(el.length > 0){
                            return <>
                                <CommandGroup heading="Suggestion">
                                    {el}
                                </CommandGroup>
                            </>;
                        }

                        return <></>;
                    })()}

                    {/* Feature */}
                    {(() => {
                        let el: any[] = []
                        let feature: { name: string, icon?: string, link?: any}[] = [
                            { name: 'Budget', icon: '', link: null },
                            { name: 'Debt', icon: '', link: null },
                            { name: 'Goals', icon: '', link: null },
                            { name: 'Planned Payment', icon: '', link: null },
                            { name: 'Record', icon: '', link: null },
                            { name: 'Record Template', icon: '', link: null },
                            { name: 'Shopping List', icon: '', link: null },
                            { name: 'Wallet', icon: '', link: null },
                            { name: 'Wallet Group', icon: '', link: null },
                            { name: 'Wallet Share', icon: '', link: null },
                        ];
                        feature.map((obj, index) => {
                            el.push(
                                <CommandItem className={ ` flex flex-row gap-2 !py-2` } key={ `command_item_feature-${index}` }>
                                    <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                    <span>{obj.name}</span>
                                </CommandItem>
                            );
                        });
                        if(el.length > 0){
                            return <>
                                <CommandGroup heading="Feature">
                                    {el}
                                </CommandGroup>
                            </>;
                        }

                        return <></>;
                    })()}

                    <CommandGroup heading="Settings" className={ ` !pb-2` }>
                        <CommandItem className={ ` flex flex-row gap-2 !py-2` }>
                            <i className={ ` w-4 text-center fa-solid fa-user` }></i>
                            <span>Profile</span>
                        </CommandItem>
                        <CommandItem className={ ` flex flex-row gap-2 !py-2` }>
                            <i className={ ` w-4 text-center fa-solid fa-cog` }></i>
                            <span>Setting</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
            
            <nav className="bg-white border-b fixed w-full">
                {/* Navbar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 relative">
                        <div className="flex items-center">
                            {/* Notification - Dialog */}
                            <div className={ `` }>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant={ `ghost` }><i className={ `fa-solid fa-toggle-off` }></i></Button>
                                    </SheetTrigger>
                                    <SheetContent side={ `left` }>
                                        <SheetHeader>
                                            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                                            <SheetDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Search Command */}
                        <div className={ ` absolute h-full left-1/2 -translate-x-1/2 items-center flex sm:max-w-[400px] w-full` }>
                            <div className={ ` flex flex-row gap-4 w-full justify-between border h-10 rounded-md items-center px-4 cursor-pointer` } id={ `navbar-search` }>
                                <div className={ ` flex flex-row items-center gap-4` }>
                                    <i className={ `fa-solid fa-magnifying-glass` }></i>
                                    <span className={ ` leading-none text-muted-foreground text-sm` }>Command or Search...</span>
                                </div>

                                <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className=" text-xs leading-none">⌘</span><span></span>K
                                    {/* <span>CTRL</span><span>+</span>K */}
                                </kbd>
                            </div>
                        </div>

                        <div className=" flex items-center gap-4">
                            {/* Notification - Sheet */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant={ `ghost` }><i className={ `fa-regular fa-bell` }></i></Button>
                                </SheetTrigger>
                                <SheetContent side={ `right` }>
                                    <SheetHeader>
                                        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>

                            {/* Avatar - Dropdown */}
                            <div className="relative flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className={ ` cursor-pointer rounded-lg` }>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback className={ ` cursor-pointer rounded-lg` }>EX</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" side={ `bottom` } align={ `end` }>
                                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2` }>
                                                <i className={ `fa-solid fa-user w-1/12` }></i>
                                                <span className={ ` w-11/12` }>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2` }>
                                                <i className={ `fa-solid fa-gear w-1/12` }></i>
                                                <span className=' w-11/12'>Setting</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2` }>
                                                <i className={ `fa-solid fa-bookmark w-1/12` }></i>
                                                <span className=' w-11/12'>Category</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2` }>
                                                <i className={ `fa-solid fa-tags w-1/12` }></i>
                                                <span className=' w-11/12'>Tags</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2` }>
                                                <i className={ `fa-solid fa-wallet w-1/12` }></i>
                                                <span className=' w-11/12'>Wallet</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup className={ ` flex flex-row gap-2 p-2` }>
                                            <Button variant={ currentTheme === 'light' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                                                setTheme('light');
                                            }}>
                                                <i className={ `fa-solid fa-sun` }></i>
                                            </Button>

                                            <Button variant={ currentTheme === 'system' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                                                setTheme('system');
                                            }}>
                                                <i className={ `fa-solid fa-display` }></i>
                                            </Button>

                                            <Button variant={ currentTheme === 'dark' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                                                setTheme('dark');
                                            }}>
                                                <i className={ `fa-solid fa-moon` }></i>
                                            </Button>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2 text-destructive` }>
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