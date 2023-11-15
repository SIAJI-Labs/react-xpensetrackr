import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

// Partials
import { useTheme, getCurrentTheme } from '@/Components/template/theme-provider';
import ApplicationLogoMask from '@/Components/ApplicationLogoMask';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { handleUserAvatar } from '@/function';

export default function Navbar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const { setTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    const [avatar, setAvatar] = useState<string>();
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
    useEffect(() => {
        let avatar = handleUserAvatar(user);
        setAvatar(avatar);
    });

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
                            { name: 'Quick Action: Create new Record', icon: '', link: route('sys.quick-action.record') },
                            { name: 'Quick Action: Planned Payment Summary', icon: '', link: route('sys.planned-payment.index', {
                                type: 'summary'
                            }) },
                            { name: 'Quick Action: Show Pending Record', icon: '', link: null },
                        ];

                        suggestions.map((obj, index) => {
                            if(obj.link){
                                el.push(
                                    <Link href={ obj.link } className={ `cursor-pointer` } key={ `command_item_suggestion-${index}` }>
                                        <CommandItem className={ ` flex flex-row gap-2 !py-2 cursor-pointer` }>
                                            <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                            <span>{obj.name}</span>
                                        </CommandItem>
                                    </Link>
                                );
                            } else {
                                el.push(
                                    <CommandItem className={ ` flex flex-row gap-2 !py-2 opacity-50 cursor-not-allowed` } key={ `command_item_suggestion-${index}` }>
                                        <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                        <span>{obj.name}</span>
                                    </CommandItem>
                                );
                            }
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
                            { name: 'Dashboard', icon: '', link: route('sys.index') },
                            { name: 'Budget', icon: '', link: null },
                            { name: 'Debt', icon: '', link: null },
                            { name: 'Goals', icon: '', link: null },
                            { name: 'Planned Payment', icon: '', link: route('sys.planned-payment.index') },
                            { name: 'Record', icon: '', link: route('sys.record.index') },
                            { name: 'Record Template', icon: '', link: null },
                            { name: 'Shopping List', icon: '', link: null },
                            { name: 'Wallet', icon: '', link: route('sys.wallet.index') },
                            { name: 'Wallet Group', icon: '', link: null },
                            { name: 'Wallet Share', icon: '', link: null },
                        ];
                        feature.map((obj, index) => {
                            if(obj.link){
                                el.push(
                                    <Link href={ obj.link } className={ `cursor-pointer` } key={ `command_item_feature-${index}` }>
                                        <CommandItem className={ ` flex flex-row gap-2 !py-2 cursor-pointer` }>
                                            <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                            <span>{obj.name}</span>
                                        </CommandItem>
                                    </Link>
                                );
                            } else {
                                el.push(
                                    <CommandItem className={ ` flex flex-row gap-2 !py-2 opacity-50 cursor-not-allowed` } key={ `command_item_feature-${index}` }>
                                        <i className={ ` w-4 text-center fa-solid fa-angle-right` }></i>
                                        <span>{obj.name}</span>
                                    </CommandItem>
                                );
                            }
                        });
                        if(el.length > 0){
                            // Generate random string as section-key
                            let r = (Math.random() + 1).toString(36).substring(7);

                            return <div key={ r }>
                                <CommandGroup heading="Feature" key={ r }>
                                    {el}
                                </CommandGroup>
                            </div>;
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
            
            <nav className="bg-white dark:bg-background border-b fixed w-full z-10">
                {/* Navbar */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16 relative">
                        <div className="flex gap-2 items-center">
                            {/* Sidebar - Dialog */}
                            <div className={ `` }>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant={ `ghost` } className={ ` dark:text-white` }><i className={ `fa-solid fa-toggle-off` }></i></Button>
                                    </SheetTrigger>
                                    <SheetContent side={ `left` } className={ ` w-72` }>
                                        <SheetHeader className={ ` relative border-b pb-6 pointer-events-none select-none` }>
                                            <SheetTitle>
                                                <ApplicationLogo fontSizeMain={ ` text-2xl` } className={ ` !justify-start` }/>
                                            </SheetTitle>
                                            {/* <SheetDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </SheetDescription> */}
                                        </SheetHeader>

                                        <div className={ `mt-4` }>
                                            <ul>
                                                <li>
                                                    <a href="#" className=" transition-all flex items-center pl-0 hover:!pl-6 px-6 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path>
                                                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path>
                                                        </svg>
                                                        <span className="ml-3">Dashboard</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            {/* Mask Logo */}
                            <div className={ `hidden md:block` }>
                                <Link href={ route('sys.index') }>
                                    <ApplicationLogoMask className={ ` h-10` }/>
                                </Link>
                            </div>
                        </div>

                        {/* Search Command */}
                        <div className={ ` h-full md:absolute md:left-1/2 md:-translate-x-1/2 items-center flex sm:max-w-[400px] w-full` }>
                            <div className={ ` flex flex-row gap-4 w-full justify-between border h-10 rounded-md items-center px-4 cursor-pointer` } id={ `navbar-search` }>
                                <div className={ ` flex flex-row items-center gap-4` }>
                                    <i className={ `fa-solid fa-magnifying-glass dark:text-white` }></i>
                                    <span className={ ` leading-none text-muted-foreground text-sm` }>Command <span className={ ` hidden lg:inline-flex` }> or Search...</span></span>
                                </div>

                                <kbd className=" hidden pointer-events-none lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className=" text-xs leading-none">⌘</span><span></span>K
                                    {/* <span>CTRL</span><span>+</span>K */}
                                </kbd>
                            </div>
                        </div>

                        <div className=" flex items-center gap-4">
                            {/* Notification - Sheet */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant={ `ghost` } className={ ` dark:text-white` }><i className={ `fa-regular fa-bell` }></i></Button>
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
                                            <AvatarImage src={avatar} alt="avatar" />
                                            <AvatarFallback className={ ` cursor-pointer rounded-lg` }>EX</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" side={ `bottom` } align={ `end` }>
                                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href={ route('sys.profile.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-user w-1/12` }></i>
                                                    <span className={ ` w-11/12` }>Profile</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-not-allowed opacity-50` }>
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
                                            <Link href={ route('sys.wallet.index') }>
                                                <DropdownMenuItem className={ ` flex flex-row gap-2 cursor-pointer` }>
                                                    <i className={ `fa-solid fa-wallet w-1/12` }></i>
                                                    <span className=' w-11/12'>Wallet</span>
                                                </DropdownMenuItem>
                                            </Link>
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