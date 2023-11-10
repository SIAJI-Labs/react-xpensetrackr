// Shadcn

import { Skeleton } from "@/Components/ui/skeleton";

export default function SummarySkeleton(){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            <div className={ ` flex flex-col gap-2 border rounded p-4 cursor-pointer` }>
                <div className={ ` flex flex-row gap-6 justify-between` }>
                    <Skeleton className={ `h-4 w-40` }/>
                    <Skeleton className={ `h-4 w-2` }/>
                </div>

                <div className={ ` mt-2 flex flex-col gap-2` }>
                    <Skeleton className={ `h-1 w-full` }/>
                    <div className={ `flex flex-row justify-between` }>
                        <div className={ ` flex flex-row gap-2` }>
                            <Skeleton className={ ` h-4 w-4` }/>
                            <Skeleton className={ ` h-4 w-20` }/>
                        </div>
                        <Skeleton className={ ` h-4 w-6` }/>
                    </div>
                    <div className={ `flex flex-row justify-between` }>
                        <div className={ ` flex flex-row gap-2` }>
                            <Skeleton className={ ` h-4 w-4` }/>
                            <Skeleton className={ ` h-4 w-20` }/>
                        </div>
                        <Skeleton className={ ` h-4 w-6` }/>
                    </div>
                </div>
            </div>
        </section>
    );
}