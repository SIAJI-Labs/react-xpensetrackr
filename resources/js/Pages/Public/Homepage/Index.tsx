import PublicLayout from '@/Layouts/PublicLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';

export default function Welcome(
    {
        auth,
        isAuthenticated,
        laravelVersion,
        phpVersion
    }: PageProps<
        {
            isAuthenticated: boolean,
            laravelVersion: string,
            phpVersion: string 
        }
    >
) {
    return (
        <PublicLayout>
            <Head title="Homepage"/>

            <section className=" min-h-screen flex flex-col gap-8 justify-center items-center">
                <ApplicationLogo
                    hasDescription = {true}
                ></ApplicationLogo>
                
                <Link
                    href={route('login')}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    <Button>{isAuthenticated ? 'Dashboard' : 'Login'}</Button>
                </Link>
            </section>
        </PublicLayout>
    );
}
