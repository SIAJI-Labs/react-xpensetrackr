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
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import Notification from './Notification';
import CommandCenter from './CommandCenter';

export default function Navbar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const [avatar, setAvatar] = useState<string>();

    // Search Command
    const [openSearchCommand, setOpenSearchCommand] = useState<boolean>(false);
    const handleOpenSearchCommand = (isOpen: boolean) => {
        setOpenSearchCommand(isOpen);
    };
    useEffect(() => {
        document.getElementById('navbar-search')?.addEventListener('click', () => {
            setOpenSearchCommand(true);
        });
    }, []);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
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
            <CommandCenter openState={ openSearchCommand } setOpenState={ handleOpenSearchCommand }/>
            
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
                        <div className={ ` h-full md:absolute md:left-1/2 md:-translate-x-1/2 items-center flex md:w-full md:max-w-lg w-full` }>
                            <div className={ ` flex flex-row gap-4 w-full justify-between border h-10 rounded-md items-center px-4 cursor-pointer` } id={ `navbar-search` }>
                                <div className={ ` flex flex-row items-center gap-4` }>
                                    <i className={ `fa-solid fa-magnifying-glass dark:text-white` }></i>
                                    <span className={ ` leading-none text-muted-foreground text-sm` }>
                                        <span className={ `inline-flex md:hidden` }>Command</span>
                                        <span className={ ` hidden md:inline-flex` }>Open Command or Search...</span>
                                    </span>
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