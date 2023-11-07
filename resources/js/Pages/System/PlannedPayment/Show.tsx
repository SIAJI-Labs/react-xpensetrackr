import BackButton from "@/Components/template/BackButtonTemplate";
import SystemLayout from "@/Layouts/SystemLayout";
import { PageProps, PlannedItem } from "@/types";
import { Head } from "@inertiajs/react";

// Props
type PlannedPaymentShowProps = {
    data: PlannedItem
}

export default function Show({ auth, data }: PageProps<PlannedPaymentShowProps>) {
    return <>
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Detail: { `${data?.name}` }</h2>}
        >
            <Head title={ `Planned Detail: ${data?.name}` } />

            <div className="flex flex-col gap-6">
                <BackButton className={ `px-0` }/>
            </div>
        </SystemLayout>
    </>;
}