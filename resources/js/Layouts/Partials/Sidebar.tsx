import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { User } from "@/types";

// Partials
import ApplicationLogo from "@/Components/ApplicationLogo";

// Shadcn
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Sidebar({ user, className = '' }: PropsWithChildren<{ user: User, className?: string }>) {
    const sidebarMenu: any[] = [
        {
            name: 'Dashboard',
            icon: 'fa-solid fa-house',
            route: route('sys.index'),
            sub: [],
            active: ['sys.index'],
            is_disabled: false,
            is_header: false
        }, 
        
        {
            name: 'Feature',
            icon: null,
            route: null,
            sub: [],
            active: [],
            is_disabled: false,
            is_header: true
        }, {
            name: 'Budget',
            icon: 'fa-solid fa-money-bills',
            route: null,
            sub: [],
            active: [],
            is_disabled: true,
            is_header: false
        }, {
            name: 'Debt',
            icon: 'fa-solid fa-hand-holding-dollar',
            route: null,
            sub: [],
            active: [],
            is_disabled: true,
            is_header: false
        }, {
            name: 'Goals',
            icon: 'fa-solid fa-bullseye',
            route: null,
            sub: [],
            active: [],
            is_disabled: true,
            is_header: false
        }, {
            name: 'Planned Payment',
            icon: 'fa-solid fa-clock',
            route: route('sys.planned-payment.index'),
            sub: [],
            active: ['sys.planned-payment.index', 'sys.planned-payment.show'],
            is_disabled: false,
            is_header: false
        }, {
            name: 'Record',
            icon: 'fa-solid fa-receipt',
            route: route('sys.record.index'),
            sub: [],
            active: ['sys.record.index', 'sys.record.show'],
            is_disabled: false,
            is_header: false
        }, {
            name: 'Shopping List',
            icon: 'fa-solid fa-cart-shopping',
            route: null,
            sub: [],
            active: [],
            is_disabled: true,
            is_header: false
        }, 

        {
            name: 'Report',
            icon: null,
            route: null,
            sub: [],
            active: [],
            is_disabled: false,
            is_header: true
        }, {
            name: 'Cash Flow',
            icon: 'fa-solid fa-money-bill-transfer',
            route: route('sys.report.cash-flow.index'),
            sub: [],
            active: ['sys.report.cash-flow.index'],
            is_disabled: false,
            is_header: false
        }, 

        {
            name: 'Master Data',
            icon: null,
            route: null,
            sub: [],
            active: [],
            is_disabled: false,
            is_header: true
        }, {
            name: 'Category',
            icon: 'fa-solid fa-bookmark',
            route: route('sys.category.index'),
            sub: [],
            active: ['sys.category.index', 'sys.category.show', 'sys.category.re-order.index'],
            is_disabled: false,
            is_header: false
        }, {
            name: 'Record Template',
            icon: 'fa-solid fa-book',
            route: null,
            sub: [],
            active: [],
            is_disabled: true,
            is_header: false
        }, {
            name: 'Tags',
            icon: 'fa-solid fa-tag',
            route: route('sys.tags.index'),
            sub: [],
            active: ['sys.tags.index', 'sys.tags.show'],
            is_disabled: false,
            is_header: false
        }, {
            name: 'Wallet',
            icon: 'fa-solid fa-wallet',
            route: null,
            sub: [
                {
                    name: 'List',
                    route: route('sys.wallet.index'),
                    is_disabled: false,
                    active: ['sys.wallet.index', 'sys.wallet.show', 'sys.wallet.re-order.index'],
                }, {
                    name: 'Group',
                    route: route('sys.wallet-group.index'),
                    is_disabled: false,
                    active: ['sys.wallet-group.index', 'sys.wallet-group.show'],
                }, {
                    name: 'Share',
                    route: null,
                    is_disabled: true,
                    active: [],
                }
            ],
            active: [
                'sys.wallet.index', 'sys.wallet.show', 'sys.wallet.re-order.index'
            ],
            is_disabled: false,
            is_header: false
        }, 
    ];
    const currentRoute = route().current();

    return <>
        <div className={ cn('', className) }>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={ `ghost` } className={ ` dark:text-white` }><i className={ `fa-solid fa-toggle-off` }></i></Button>
                </SheetTrigger>
                <SheetContent side={ `left` } className={ ` w-screen md:w-72 p-0 dark:!text-white` }>
                    <ScrollArea className={ ` h-screen p-0` }>
                        <div className={ ` p-6 sticky top-0` }>
                            <SheetHeader className={ ` relative after:absolute after:-top-6 after:-left-6 after:w-[calc(100%+3rem)] after:h-28 after:bg-gradient-to-b after:from-background after:via-background after:to-transparent after:z-[-1] z-10 pb-1 pointer-events-none select-none` }>
                                <SheetTitle>
                                    <ApplicationLogo fontSizeMain={ ` text-2xl` } className={ ` !justify-start` }/>
                                </SheetTitle>
                                {/* <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription> */}
                            </SheetHeader>
                        </div>

                        <div className={ `mx-6 mb-10` }>
                            <ul className={ ` flex flex-col gap-1` }>
                                {(() => {
                                    if(sidebarMenu.length > 0){
                                        let sideChild: any[] = [];
                                        
                                        sidebarMenu.forEach((val, index) => {
                                            let className = `
                                                transition-all 
                                                flex 
                                                flex-row 
                                                gap-2 
                                                items-center 
                                                px-4
                                                py-2 
                                                text-gray-900 
                                                dark:text-white
                                                hover:bg-gray-100
                                                dark:hover:bg-gray-700
                                                group
                                                rounded-lg 
                                            `;
                                            // Handle icon
                                            let icon: any = null;
                                            if(val.icon){
                                                icon = <>
                                                    <span className="w-5 h-5 flex items-center justify-center text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white leading-none">
                                                        <i className={ `${val.icon} leading-none` }></i>
                                                    </span>
                                                </>;
                                            }

                                            // Handle classname
                                            if(val.active.includes(currentRoute)){
                                                className += ` !bg-gray-100 dark:!bg-gray-700`;
                                            } 
                                            if(val.is_header){
                                                className += ` font-semibold !my-0 leading-none !pb-0 !pt-4 !pl-0.5 !bg-transparent hover:bg-transparent`;
                                            }
                                            if(val.is_disabled){
                                                className += ` opacity-50 z-[-1] relative hover:cursor-not-allowed hover:!bg-transparent`;
                                            }
                                            if(val.sub.length > 0){
                                                className += ` justify-between`;
                                            }

                                            if(val.route){
                                                sideChild.push(
                                                    <li key={ `sidebar_menu-${index}` }>
                                                        <Link href={ val.route } className={ `${className}` }>
                                                            { icon }
                                                            <span className="">{ val.name }</span>
                                                        </Link>
                                                    </li>
                                                );
                                            } else {
                                                if(val.sub.length > 0){
                                                    let child: any[] = [];
                                                    (val.sub).forEach((ch: any, chk: any) => {
                                                        // Handle child class
                                                        let childClass = ` transition-all hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded px-4 py-2 flex flex-row gap-4`;
                                                        if(ch.is_disabled){
                                                            childClass += ` opacity-50 cursor-not-allowed`;
                                                        }
                                                        if((ch.active).includes(currentRoute)){
                                                            childClass += ` bg-gray-100 dark:bg-gray-700 dark:text-white`
                                                        }

                                                        // Handle Content
                                                        let content = <div className={ ` flex flex-row !gap-2 items-center ${childClass}` }>
                                                            <span className={ `w-5 h-5 flex items-center justify-center text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white leading-none` }>
                                                                <i className={ `fa-regular fa-circle` }></i>
                                                            </span>
                                                            <span className={ `` }>{ ch.name }</span>
                                                        </div>;
                                                        if(ch.route){
                                                            content = <Link href={ ch.route } className={ ` flex flex-row !gap-2 items-center ${childClass}` }>
                                                                <span className={ `w-5 h-5 flex items-center justify-center text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white leading-none` }>
                                                                    <i className={ `fa-regular fa-circle` }></i>
                                                                </span>
                                                                <span className="">{ ch.name }</span>
                                                            </Link>;
                                                        }

                                                        child.push(
                                                            <li key={ `sidebar_menu-${index}_sub_${chk}` }>
                                                                { content }
                                                            </li>
                                                        );
                                                    });

                                                    sideChild.push(
                                                        <li className={ val.active.includes(currentRoute) ? 'open' : '' } key={ `sidebar_menu-${index}` }>
                                                            <div className={ `${className} [.open_&]:dark:bg-gray-700 cursor-pointer` } key={ `sidebar_menu-${index}` } onClick={($refs) => {
                                                                let el = $refs.target as HTMLElement;
                                                                el.closest('li')?.classList.toggle('open');
                                                            }}>
                                                                <div className={ ` flex flex-row gap-2` }>
                                                                    { icon }
                                                                    <span className="">{ val.name }</span>
                                                                </div>
                                                                <div className={ `` }>
                                                                    <i className={ `fa-solid fa-chevron-right [.open_&]:rotate-90` }></i>
                                                                </div>
                                                            </div>
                                                            <ul className={ `hidden [.open_&]:!flex mt-2 ml-6 flex-col gap-1` }>
                                                                { child }
                                                            </ul>
                                                        </li>
                                                    )
                                                } else {
                                                    sideChild.push(
                                                        <li key={ `sidebar_menu-${index}` }>
                                                            <div className={ `${className} ` }>
                                                                { icon }
                                                                <span className="">{ val.name }</span>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            }
                                        });

                                        if(sideChild.length > 0){
                                            return sideChild;
                                        }
                                    }

                                    return <></>;
                                })()}
                            </ul>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    </>;
}