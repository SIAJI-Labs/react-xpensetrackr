import { PageProps } from "@/types";
import { useEffect } from "react";

// Partials
import ListTemplate from "@/Components/template/PlannedPayment/ListTemplate";
import NoDataTemplate from "@/Components/template/NoDataTemplate";

// Shadcn
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

// Props
type PlannedPaymentListProps = {
    activeType?: string
}

export default function PlannedPaymentList({ auth, activeType }: PageProps<PlannedPaymentListProps>) {
    useEffect(() => {
        // Run on tab changed
        // console.log('DEF');
    }, []);
    // Summary List Template
    let listTemplate = (obj?:any[]) => {
        return <ListTemplate plannedPayment={obj}/>;
    }

    return (<>
        <div className={ `flex flex-col gap-6` }>
            {/* Filter */}
            <div className={ ` flex flex-row gap-4` }>
                <Input placeholder={ `Search by Planned Payment name` }/>

                <Button>
                    <i className={ `fa-solid fa-filter` }></i>
                </Button>
            </div>

            {/* Content */}
            {(() => {
                let list = [];
                let index = 0;
                let val:any[] = [];
                let defaultContent = <NoDataTemplate></NoDataTemplate>;

                list.push(
                    <div key={ `list_item-${index}` }>
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