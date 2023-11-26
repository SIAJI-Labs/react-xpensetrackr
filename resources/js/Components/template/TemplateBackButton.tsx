import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

// Plugins
import "@/../css/siaji.scss";

// Shadcn
import * as button from "@/Components/ui/button";

export default function TemplateBackButton({hasBorder = true, className}: {hasBorder?: boolean, className?: any}){
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            {/* <a href="javascript:void(0)" className={ `flex items-center gap-2` } onClick={ () => {
                history.back();
            } }>
                <i className={ `fa-solid fa-angle-left` }></i>
                <span>Back</span>
            </a> */}
            <button.Button variant={ `link` } className={ cn(`flex items-center gap-2 hover:no-underline`, className) } onClick={ () => {
                history.back();
            } }>
                <i className={ `fa-solid fa-angle-left` }></i>
                <span>Back</span>
            </button.Button>
        </section>
    );
}