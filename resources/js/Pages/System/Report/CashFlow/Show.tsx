import BackButton from "@/Components/template/TemplateBackButton";
import TemplateNoData from "@/Components/template/TemplateNoData";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import SystemLayout from "@/Layouts/SystemLayout";
import { formatRupiah, ucwords } from "@/function";
import { useIsFirstRender } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

// Props
type CashFlowShowProps = {
    period: string
}

export default function Index({ auth, period }: PageProps<CashFlowShowProps>) {
    const isFirstRender = useIsFirstRender();
    let periodFormated = moment(`${period}-01`).format('MMM, YYYY');

    const [graphItemAbortController, setGraphItemAbortController] = useState<AbortController | null>(null);
	const [graphItem, setGraphItem] = useState<any[]>([]);
	const [graphList, setGraphList] = useState<any[]>([]);
    const [graphSort, setGraphSort] = useState<string>(
		() => localStorage.getItem('xtrackr-cashflow_show_sort') as string|| 'asc'
	);
    const fetchCashflowReport = async () => {
		// Cancel previous request
		if(graphItemAbortController instanceof AbortController){
			graphItemAbortController.abort();
		}
		
		// Create a new AbortController
        const abortController = new AbortController();
        // Store the AbortController in state
        setGraphItemAbortController(abortController);

		// Build parameter
        const query: any[] = [];
        const obj = {
            year: moment(`${period}-01`).format('YYYY'),
            month: moment(`${period}-01`).format('MM'),
            // sort: graphSort
        }
        for (const key in obj) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        }

		try {
            const response = await axios.get(`${route('api.report.cash-flow.v1.list')}?${query.join('&')}`, {
                cancelToken: new axios.CancelToken(function executor(c) {
                    // Create a CancelToken using Axios, which is equivalent to AbortController.signal
                    abortController.abort = c;
                })
            });

			// Use response.data instead of req.json() to get the JSON data
            let jsonResponse = response.data;
			let result = jsonResponse.result;
			// Fetch graph data
			if(result && 'graph' in result){
				setGraphItem(result.graph);
			}

			console.log(jsonResponse);
		} catch (error) {
            if (axios.isCancel(error)) {
                // Handle the cancellation here if needed
                console.log('Request was canceled', error);
            } else {
                // Handle other errors
                console.error('Error:', error);
            }
        }
	}
    useEffect(() => {
        if('data' in graphItem && (graphItem.data as any[]).length > 0){
            let list = graphItem.data as any[];
            if(graphSort === 'desc'){
                list = list.reverse();
            }

            setGraphList(list);
        }
    }, [graphItem]);
	useEffect(() => {
		localStorage.setItem('xtrackr-cashflow_show_sort', graphSort);
	}, [graphSort]);

    // Document Ready
	useEffect(() => {
		if(isFirstRender){
			fetchCashflowReport();
		}
	});

    return (
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report: Cash Flow ({periodFormated})</h2>}
        >
            <Head title={ `Report: Cash Flow (${periodFormated})` } />

            <div className="flex flex-col gap-6">
                <BackButton className={ `px-0` }/>
            </div>

            <Card className={ ` w-full` }>
                <CardHeader>
                    <div className={ ` flex flex-row justify-between items-start` }>
                        <div>
                            <CardTitle>
                                <div>Report: {periodFormated}</div>
                            </CardTitle>
                            <CardDescription>Cash Flow overview for <u>{periodFormated}</u> period</CardDescription>
                        </div>
                        <div className={ `flex items-center gap-2` }>
							<Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
                                fetchCashflowReport();
								router.reload();
							}}><i className={ `fa-solid fa-rotate-right` }></i></Button>
						</div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Card */}
                    {(() => {
                        if(graphList && graphList.length > 0){
                            let el: any[] = [];
                            let push = true;
                            graphList.forEach((value: any, index: any) => {
                                if(graphSort === 'desc'){
                                    if(moment(value.label).format('YYYY-MM') === moment().format('YYYY-MM')){
                                        if(moment(moment(value.label).format('YYYY-MM-DD')).isAfter(moment().format('YYYY-MM-DD'))){
                                            push = false;
                                        } else {
                                            push = true;
                                        }
                                    }
                                }

                                if(push){
                                    el.push(
                                        <div className={ ` border rounded p-4 flex flex-col gap-2` } key={ `report-${value.label}` }>
                                            <div className={ ` flex flex-row justify-between items-center` }>
                                                <div className={ `` }>
                                                    <span className={ `font-semibold` }>{moment(value.label).format('MMM Do, YYYY')}</span>
                                                </div>
                                                <div className={ ` flex flex-row whitespace-nowrap items-center gap-2` }>
                                                    <span className={ `${value.cash_flow > 0 ? ` text-green-500` : (value.cash_flow < 0 ? ` text-red-500` : ``)} ${value.cash_flow != 0 ? `font-medium` : ``}` }>{formatRupiah(value.cash_flow)}</span>
                                                </div>
                                            </div>
                                            <Separator/>
                                            <div className={ ` flex flex-row justify-between items-center` }>
                                                <div className={ ` flex flex-col gap-1 leading-none` }>
                                                    <span>Income</span>
                                                    <span className={ ` text-green-500` }>{ formatRupiah(value.income) }</span>
                                                </div>
                                                <div className={ ` flex flex-col gap-1 leading-none items-end` }>
                                                    <span>Expense</span>
                                                    <span className={ ` text-red-500` }>{ formatRupiah(value.expense * -1) }</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if(graphSort === 'asc'){
                                    if(moment(value.label).format('YYYY-MM') === moment().format('YYYY-MM') && value.label == moment().format('YYYY-MM-DD')){
                                        // If month name is same, then stop loop
                                        push = false;
                                    }
                                }
                            });

                            if(el.length > 0){
                                return <>
                                    <div className={ ` flex flex-col gap-2` }>
                                        <Button variant={ `outline` } className={ ` flex flex-row gap-1 mr-auto` } onClick={() => {
                                            let list = graphList;
                                            setGraphList(list.reverse());
                                            setGraphSort(graphSort === 'asc' ? 'desc' : 'asc');
                                        }}>
                                            <div className={ ` w-4` }>
                                                <i className={ `fa-solid ${graphSort === 'asc' ? `fa-sort-up` : `fa-sort-down`}` }></i>
                                            </div>
                                            <span className={ `` }>{ ucwords(graphSort) }</span>
                                        </Button>

                                        <div className={ ` flex flex-col gap-4` }>
                                            {el}
                                        </div>
                                    </div>
                                </>;
                            }
                        }

                        return <TemplateNoData/>
                    })()}
                </CardContent>
            </Card>
        </SystemLayout>
    );
}