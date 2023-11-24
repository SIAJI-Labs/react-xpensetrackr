import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { User } from "@/types";

// Partials
import ApplicationLogo from "@/Components/ApplicationLogo";

// Shadcn
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";

export default function Sidebar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    return <>
        <div className={ cn('', className) }>
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
                                <Link href={ route('sys.index') } className={ `transition-all flex flex-row gap-2 items-center pl-0 hover:!pl-6 px-6 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group` }>
                                    <span className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white leading-none">
                                        <i className={ `fa-solid fa-house leading-none` }></i>
                                    </span>
                                    <span className="">Dashboard</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </>;
}