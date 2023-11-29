import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types"

// Partials
import SystemLayout from "@/Layouts/SystemLayout";

// Shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

// Apexchart
import Chart from 'react-apexcharts';
import { formatRupiah } from "@/function";
import moment from "moment";
import { Button } from "@/Components/ui/button";

// Props
type CashFlowIndexProps = {
}

export default function Index({ auth }: PageProps<CashFlowIndexProps>) {
	let incomes: number[] = [];
	let expenses: number[] = [];
	let calcs: number[] = [];
	let dates: string[] = [];
	for(let i = 0; i < 12; i++){
		let income = Math.floor(Math.random() * 10000000) + 1000;
		let expense = (Math.floor(Math.random() * 10000000) + 1000) * -1;
		let calc = income + expense;

		incomes.push(income);
		expenses.push(expense);
		calcs.push(calc);
		dates.push(moment().month(i).format('MMM'));
	}

    const apex = {
		series: [
			{
				name: 'Income',
				type: 'column',
				data: incomes
			}, {
				name: 'Expense',
				type: 'column',
				data: expenses
			}, 
			{
				name: 'Cash Flow',
				type: 'line',
				data: calcs,
			}
		]
	};

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
							}}><i className={ `fa-solid fa-rotate-right` }></i></Button>
						</div>
                    </div>
                </CardHeader>
                <CardContent>
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
								labels: dates,
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
									min:  Math.min(...expenses),
									max: Math.max(...incomes),
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
						} series={apex.series} type="line" width="100%" height={250} />
                    </div>
                </CardContent>
            </Card>
        </SystemLayout>
    </>;
}