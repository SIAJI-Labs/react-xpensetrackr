import SystemLayout from '@/Layouts/SystemLayout';
import { PageProps, RecordItem } from '@/types';
import { Head } from '@inertiajs/react';

type RecordShowProps = {
}

export default function Show({ auth }: PageProps<RecordShowProps>) {
    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Record Detail</h2>}
            >
                <Head title="Record Detail" />
            </SystemLayout>
        </>
    );
}