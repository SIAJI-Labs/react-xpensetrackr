import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types"

// Partials
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

// Apexchart
import Chart from 'react-apexcharts';
import { formatRupiah, ucwords } from "@/function";
import moment from "moment";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFirstRender } from "@/lib/utils";
import TemplateNoData from "@/Components/template/TemplateNoData";
import { Separator } from "@/Components/ui/separator";

// Props
type CashFlowIndexProps = {
}

export default function Index({ auth }: PageProps<CashFlowIndexProps>) {
    const isFirstRender = useIsFirstRender();

	// Graph conf
    const [graphItemAbortController, setGraphItemAbortController] = useState<AbortController | null>(null);
    const [graphSort, setGraphSort] = useState<string>(
		() => localStorage.getItem('xtrackr-cashflow_index_sort') as string|| 'asc'
	);
	const [graphItem, setGraphItem] = useState<any[]>([]);
	const [graphList, setGraphList] = useState<any[]>([]);
	const [graphLabel, setGraphLabel] = useState<string[]>([]);
	const [graphSeries, setGraphSeries] = useState<any[]>([]);
	const [graphIncome, setGraphIncome] = useState<number[]>([]);
	const [graphExpense, setGraphExpense] = useState<number[]>([]);
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
        // const obj = {
		// 	sort: graphSort
        // }
        // for (const key in obj) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key as keyof typeof obj]));
        // }

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
		if(!isFirstRender){
			let data: any[] = [];

			if(graphItem && 'data' in graphItem){
				data = graphItem.data as any[];
				let income = [];
				let expense = [];
				let cashFlow = [];

				// Handle label
				let dates = data.map((value) => {
					return value.label;
				});
				setGraphLabel(dates);

				// Handle series
				income = data.map((value) => {
					return value.income;
				});
				setGraphIncome(income);
				expense = data.map((value) => {
					return value.expense;
				});
				setGraphExpense(expense);
				cashFlow = data.map((value) => {
					return value.cash_flow;
				});
				setGraphSeries([
					{
						name: 'Income',
						type: 'column',
						data: income
					}, {
						name: 'Expense',
						type: 'column',
						data: expense
					}, {
						name: 'Cash Flow',
						type: 'line',
						data: cashFlow
					}
				]);

				if('data' in graphItem && (graphItem.data as any[]).length > 0){
					let list = graphItem.data as any[];
					if(graphSort === 'desc'){
						list = list.reverse();
					}

					setGraphList(list);
				}
			}
		}
	}, [graphItem]);
	useEffect(() => {
		localStorage.setItem('xtrackr-cashflow_index_sort', graphSort);
	}, [graphSort]);

	// Document Ready
	useEffect(() => {
		if(isFirstRender){
			fetchCashflowReport();
		}
	});

    return <>
        <SystemLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report: Cash Flow</h2>}
        >
            <Head title="Report: Cash Flow" />

            <Card className={ ` w-full` }>
                <CardHeader>
                    <div className={ ` flex flex-row justify-between items-start` }>
                        <div>
                            <CardTitle>
                                <div>Report: Cash Flow</div>
                            </CardTitle>
                            <CardDescription>Cash Flow overview</CardDescription>
                        </div>
                        <div className={ `flex items-center gap-2` }>
							<Button variant={ `outline` } className={ ` w-10 aspect-square` } onClick={() => {
								router.reload();

								fetchCashflowReport();
							}}><i className={ `fa-solid fa-rotate-right` }></i></Button>
						</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={ ` flex flex-col gap-6` }>
						{/* Chart */}
						<div className={ `` }>
							<Chart options={
								{
									chart: {
										height: 100,
										type: 'bar',
										stacked: true,
										toolbar: {
											show: false
										},
										zoom: {
											enabled: false
										}
									},
									stroke: {
										show: true,
										width: [0, 0, 3],
										curve: 'smooth',
										lineCap: 'round'
									},
									dataLabels: {
										enabled: false
									},
									labels: graphLabel,
									yaxis: {
										labels: {
											formatter: function(val){
												return (formatRupiah(val, true)).toString();
											}
										},
										tickAmount: 4,
										forceNiceScale: true,
										axisTicks: {
											show: true
										},
										min:  Math.min(...graphExpense),
										max: Math.max(...graphIncome),
									},
									xaxis: {
										type: 'category',
										tickPlacement: 'between',
										range: 2,
										tickAmount: 5
									},
									tooltip: {
										y: {
											formatter: function(val){
												return (formatRupiah(val)).toString();
											},
										},
										// shared: false,
										// intersect: true,
										marker: {
											show: true
										}
									},
									plotOptions: {
										bar: {
											borderRadius: 3,
											borderRadiusApplication: 'end',
											borderRadiusWhenStacked: 'all'
										}
									},
									markers: {
										size: 1
									}
								}
							} series={graphSeries} type="line" width="100%" height={250} />
						</div>

						{/* Card */}
						{(() => {
							if(graphList && graphList.length > 0){
								let el: any[] = [];
								let push = true;

								graphList.forEach((value: any, index: any) => {
									if(graphSort === 'desc'){
										if(moment(value.period).format('YYYY') === moment().format('YYYY')){
											if(moment(moment(value.period).format('YYYY-MM')).isAfter(moment().format('YYYY-MM'))){
												push = false;
											} else {
												push = true;
											}
										}
									}

									if(push){
										el.push(
											<Link href={ route('sys.report.cash-flow.show', value.period) } key={ `report-${value.label}` }>
												<div className={ ` border rounded p-4 flex flex-col gap-2` }>
													<div className={ ` flex flex-row justify-between items-center` }>
														<div className={ `` }>
															<span className={ ` font-semibold` }>{value.label}</span>
														</div>
														<div className={ ` flex flex-row whitespace-nowrap items-center gap-2` }>
															<span className={ `${value.cash_flow > 0 ? ` text-green-500` : (value.cash_flow < 0 ? ` text-red-500` : ``)} ${value.cash_flow != 0 ? `font-medium` : ``}` }>{formatRupiah(value.cash_flow)}</span>
															<div className={ ` text-sm` }>
																<i className={ `fa-solid fa-chevron-right` }></i>
															</div>
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
											</Link>
										);
									}

									if(graphSort === 'asc'){
										if(moment(value.period).format('YYYY-MM') === moment().format('YYYY-MM') && value.period == moment().format('YYYY-MM')){
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
					</div>
                </CardContent>
            </Card>
        </SystemLayout>
    </>;
}