import { cn } from "@/lib/utils";
import "../../css/siaji.scss";

export default function ApplicationLogo(
    {
        hasDescription,
        fontSizeMain,
        className,
    }: {
        hasDescription?: boolean,
        fontSizeMain?: string,
        className?: string
    }
) {
    let descEl;
    if(hasDescription){
        descEl = <>
            <div className=" justify-center text-center mt-2 dark:text-gray-200">
                <span>Simplify your expenses, maximize your control</span>
            </div>
        </>;
    }

    return (
        <>
            <div className={ 'flex justify-center gap-1 flex-col select-none' }>
                <div className={ cn('font-semibold flex items-center justify-center gap-4 main-logo', className) }>
                    <span className={ cn(' dark:text-white', (fontSizeMain ? fontSizeMain : ' text-5xl')) }>eXpense</span>
                    <span className=" trackr">
                        <span className={ (fontSizeMain ? fontSizeMain : ' text-5xl') }>Trackr</span>
                    </span>
                </div>

                { descEl }
            </div>
        </>
    );
}
