// Shadcn

import { Skeleton } from "@/Components/ui/skeleton";

export default function SkeletonList(){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            <div className={ ` flex flex-col gap-2 border rounded p-4` }>
                <div className={ ` flex flex-row justify-between` }>
                    <div className={ ` flex flex-col gap-1` }>
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        <Skeleton className="w-[200px] h-[10px] rounded-full" />
                    </div>

                    <div className={ ` flex flex-row gap-2` }>
                        <Skeleton className="w-[75px] h-[20px] rounded-full" />
                        <Skeleton className="w-[10px] h-[20px] rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}