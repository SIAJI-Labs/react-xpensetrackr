import { useEffect, useState } from "react";
import { PageProps } from "@/types";

// Plugins
import moment from "moment-timezone";

// Partials
import NoDataTemplate from "@/Components/template/NoDataTemplate";
import SummaryTemplate from "@/Components/template/PlannedPayment/SummaryTemplate";

// Shadcn
import { Button } from "@/Components/ui/button";

// Props
type PlannedPaymentSummaryProps = {
    activeType?: string
}

export default function PlannedPaymentSummary({ auth, activeType }: PageProps<PlannedPaymentSummaryProps>) {
    useEffect(() => {
        // Run on tab changed
        // console.log('ABC');
    }, []);
    // Summary List Template
    let listTemplate = (obj?:any[]) => {
        return <SummaryTemplate plannedPayment={obj}/>;
    }

    const [activePeriod, setActivePeriod] = useState<Date>();
    // Set active
    if(activePeriod === undefined){
        let current = moment();
        setActivePeriod(moment(current).toDate());
    }
    const navigatePeriod = (action: string = 'prev') => {
        // Change active period
        let current = moment(activePeriod);

        if(action === 'prev'){
            current = moment(current).subtract(1, 'months');
        } else if(action === 'next'){
            current = moment(current).add(1, 'months');
        } else if(action === 'current'){
            current = moment();
        }

        setActivePeriod(moment(current).toDate());
    }
    
    return (<>
        <div className={ `flex flex-col gap-6` }>
            {/* Period Navigation */}
            <div className={ `flex flex-col` }>
                <div className={ ` flex justify-between items-center` }>
                    <Button variant={ `ghost` } onClick={() => {
                        navigatePeriod('prev');
                    }}>
                        <span><i className={ `fa-solid fa-angle-left` }></i></span>
                    </Button>
                    <div className={ `flex flex-col` }>
                        <Button variant={ `outline` } className={ `px-6` }>
                            {moment(activePeriod).format('MMMM, YYYY')}
                        </Button>
                    </div>
                    <Button variant={ `ghost` } onClick={() => {
                        navigatePeriod('next');
                    }} disabled={ moment().format('YYYY-MM-DD') === moment(activePeriod).format('YYYY-MM-DD') }>
                        <span><i className={ `fa-solid fa-angle-right` }></i></span>
                    </Button>
                </div>
                {(() => {
                    if(moment().format('YYYY-MM-DD') != moment(activePeriod).format('YYYY-MM-DD')){
                        return <Button variant={ `link` } className={ `py-0` } onClick={() => {
                            navigatePeriod('current')
                        }}>Back to current period ({moment().format('MMM, YYYY')})</Button>
                    }

                    return <></>;
                })()}
            </div>

            {/* Content */}
            {(() => {
                let list = [];
                let index = 0;
                let val:any[] = [];
                let defaultContent = <NoDataTemplate></NoDataTemplate>;

                list.push(
                    <div key={ `summary_item-${index}` }>
                        {listTemplate(val)}
                    </div>
                )

                return list.length > 0 ? list : defaultContent;
            })()}

            {/* Footer */}
            <div>
                <Button
                    variant={ `outline` }
                    className={ `dark:border-white` }
                >Load more</Button>
            </div>
        </div>
    </>);
}