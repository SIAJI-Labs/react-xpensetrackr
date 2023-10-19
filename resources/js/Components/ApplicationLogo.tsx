import { PageProps } from "@/types";
import "../../css/siaji.scss";

export default function ApplicationLogo(
    {
        hasDescription,
        fontSizeMain
    }: PageProps<
        {
            hasDescription?: boolean,
            fontSizeMain?: string
        }
    >
) {
    let descEl;
    if(hasDescription){
        descEl = <>
            <div className=" justify-center text-center">
                <span>Simplify your expenses, maximize your control</span>
            </div>
        </>;
    }

    return (
        <>
            <div className=" flex justify-center gap-1 flex-col">
                <div className=" font-semibold flex items-center justify-center gap-4 main-logo">
                    <span className={ (fontSizeMain ? fontSizeMain : ' text-5xl') }>eXpense</span>
                    <span className=" trackr">
                        <span className={ (fontSizeMain ? fontSizeMain : ' text-5xl') }>Trackr</span>
                    </span>
                </div>

                { descEl }
            </div>
        </>
    );
}
