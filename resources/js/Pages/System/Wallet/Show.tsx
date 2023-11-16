import BackButton from "@/Components/template/BackButtonTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import ListTemplate from "@/Components/template/Wallet/ListTemplate";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import SystemLayout from "@/Layouts/SystemLayout";
import { formatRupiah, ucwords } from "@/function";
import { useIsFirstRender } from "@/lib/utils";
import { PageProps, WalletItem } from "@/types"
import { Head, Link } from "@inertiajs/react";

// Props
type WalletShow = {
    data: WalletItem
    related: WalletItem
}

export default function Show({ auth, data, related }: PageProps<WalletShow>) {
    const isFirstRender = useIsFirstRender();

    // List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate wallet={obj}/>;
    }

    return (
        <>
            <SystemLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Detail: { `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</h2>}
            >
                <Head title={ `Planned Summary: ${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` } />

                <div className="flex flex-col gap-6">
                    <BackButton className={ `px-0` }/>
                </div>

                <Card className={ ` w-full` }>
                    <CardHeader>
                        <div className={ ` relative flex flex-row justify-between items-start` }>
                            <div>
                                <CardTitle>
                                        <div>Wallet Detail: { `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</div>
                                </CardTitle>
                                <CardDescription>See summary of <u>{ `${data?.parent ? `${data.parent.name} - ` : ''}${data?.name}` }</u> wallet</CardDescription>
                            </div>
                            {(() => {
                                return <Button variant={ `outline` } onClick={() => {
                                    document.dispatchEvent(new CustomEvent('wallet.refresh', {bubbles: true}));
                                }}><i className={ `fa-solid fa-rotate-right` }></i></Button>;
                            })()}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={ ` flex flex-col gap-4` }>
                            <div className={ ` flex flex-row justify-between` }>
                                <div className={ ` flex flex-col` }>
                                    <span>Balance</span>
                                    <span className={ `font-semibold` }>{ formatRupiah(data.balance ?? 0) }</span>
                                </div>

                                {(() => {
                                    if(data.parent_id){
                                        return <>
                                            <div className={ ` flex flex-col items-end` }>
                                                <span>Related to</span>
                                                <Link href={ route('sys.wallet.show', data.parent.uuid) }>
                                                    <span className={ `font-semibold underline` }>{ data.parent.name }</span>
                                                </Link>
                                            </div>
                                        </>;
                                    }

                                    return <></>;
                                })()}
                            </div>

                            <div className={ ` flex flex-row justify-between` }>
                                <div className={ ` flex flex-col` }>
                                    <span>Purpose</span>
                                    <Badge>{ ucwords(data.type) }</Badge>
                                </div>
                                <div className={ ` flex flex-col items-end` }>
                                    <span>Last Transaction</span>
                                    <span>-</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {(() => {
                    if(related && Object.keys(related).length > 0){
                        return <>
                            <Card className={ ` w-full mt-6` }>
                                <CardHeader>
                                    <div className={ ` relative flex flex-row justify-between items-start` }>
                                        <div>
                                            <CardTitle>
                                                <div className={ ` text-base` }>Related wallet</div>
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className={ `flex flex-col gap-6` }>
                                        {(() => {
                                            let relatedElement: any = [];
                                            let defaultContent = <NoDataTemplate></NoDataTemplate>;

                                            Object.values(related).forEach((val, index) => {
                                                console.log(val);

                                                relatedElement.push(
                                                    <div key={ `related_item-${index}` }>
                                                        {listTemplate(val)}
                                                    </div>
                                                );
                                            });

                                            return relatedElement.length > 0 ? relatedElement : defaultContent;
                                        })()}
                                    </div>
                                </CardContent>
                            </Card>
                        </>;
                    }

                    return <></>;
                })()}
            </SystemLayout>
        </>
    );
}