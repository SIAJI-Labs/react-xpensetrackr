import BackButton from "@/Components/template/BackButtonTemplate";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import SystemLayout from "@/Layouts/SystemLayout";
import { PageProps, WalletItem } from "@/types"
import { Head } from "@inertiajs/react";

// Props
type PlannedSummaryShowProps = {
    wallet?: WalletItem;
}

export default function Show({ auth, wallet }: PageProps<PlannedSummaryShowProps>) {
    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planned Summary: { `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</h2>}
            >
                <Head title={ `Planned Summary: ${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` } />

                <div className="flex flex-col gap-6">
                    <BackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start cursor-pointer` }>
                            <div>
                                <CardTitle>
                                        <div>Planned Summary: { `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${wallet?.parent ? `${wallet.parent.name} - ` : ''}${wallet?.name}` }</u> wallet</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </SystemLayout>
        </>
    );
}