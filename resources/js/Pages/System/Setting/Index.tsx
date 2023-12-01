import SystemLayout from '@/Layouts/SystemLayout';
import { useIsFirstRender } from '@/lib/utils';
import { PageProps } from '@/types';

// Partials
import TemplateNoData from '@/Components/template/TemplateNoData';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';

// Shadcn Component
type ContentProps = {
    inspire: string,
}

export default function Dashboard({ auth, inspire = '' }: PageProps<ContentProps>) {
    const isFirstRender = useIsFirstRender();

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Setting</h2>}
        >
            <Head title="Setting" />

            {(() => {
                let el: any[] = [];
                let items: any[] = [
                    {
                        name: null,
                        description: null,
                        items: [
                            {
                                name: 'Profile',
                                description: 'Change name, password, etc',
                                icon: 'fa-solid fa-circle-user',
                                link: route('sys.profile.index')
                            }
                        ]
                    }, {
                        name: 'Master Data',
                        description: null,
                        items: [
                            {
                                name: 'Category',
                                description: 'Manage your Category',
                                icon: 'fa-solid fa-bookmark',
                                link: route('sys.category.index')
                            }, {
                                name: 'Tags',
                                description: 'Manage your Tags',
                                icon: 'fa-solid fa-tags',
                                link: route('sys.tags.index')
                            }
                        ]
                    }, {
                        name: 'General',
                        description: null,
                        items: [
                            {
                                name: 'Noticiation',
                                description: 'Handle your notification preferences',
                                icon: 'fa-solid fa-bell',
                                link: null
                            }, {
                                name: 'Timezone',
                                description: 'Select your timezone',
                                icon: 'fa-solid fa-user-clock',
                                link: null
                            }, 
                        ]
                    }, 
                ];

                if(items.length > 0){
                    items.forEach((item: any, ikey: any) => {
                        if(item.items){
                            let subMenu: any = [];
                            (item.items).forEach((sub: any, key: any) => {
                                let desc = null;
                                if(sub.description){
                                    desc = <span className={ ` text-sm opacity-75 leading-none` }>{ sub.description }</span>
                                }

                                let icon = null;
                                if(sub.icon){
                                    icon = <div className={ ` flex flex-row gap-4 items-center justify-center w-1/12` }>
                                        <i className={ ` text-xl ${sub.icon}` }></i>
                                    </div>;
                                }

                                let content = <div className={ ` flex flex-row gap-4 p-4 ${sub.link ? '' : ` opacity-50 cursor-not-allowed`}` } key={ `setting-${ikey}_${key}` }>
                                    { icon }
                                    <div className={ ` flex flex-col gap-1` }>
                                        <span className={ ` font-semibold leading-none` }>{ sub.name }</span>
                                        { desc }
                                    </div>
                                </div>;
                                if(sub.link){
                                    content = <Link href={ sub.link }>
                                        { content }
                                    </Link>
                                }

                                subMenu.push(content);
                            });

                            if(subMenu.length > 0){
                                let title = null;
                                if(item.name){
                                    title = <span className={ ` font-normal dark:text-white` }>{ item.name }</span>
                                }

                                el.push(
                                    <div className={ ` flex flex-col gap-1` } key={ `setting-${ikey}` }>
                                        { title }
                                        <div className={ ` flex flex-col overflow-hidden rounded-md border bg-white dark:bg-background dark:text-white` }>
                                            { subMenu }
                                        </div>
                                    </div>
                                );
                            }
                        }
                    });
                }

                if(el.length > 0){
                    return <div className={ ` flex flex-col gap-6` }>
                        { el }
                    </div>;
                }

                return <Card>
                    <CardContent>
                        <CardHeader className={ ` pb-0` }></CardHeader>
                        <TemplateNoData/>
                    </CardContent>
                </Card>;
            })()}
        </SystemLayout>
    );
}
