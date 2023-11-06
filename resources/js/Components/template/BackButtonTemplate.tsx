import { Link } from "@inertiajs/react";
import "@/../css/siaji.scss";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({hasBorder = true, className}: {hasBorder?: boolean, className?: any}){
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            {/* <a href="javascript:void(0)" className={ `flex items-center gap-2` } onClick={ () => {
                history.back();
            } }>
                <i className={ `fa-solid fa-angle-left` }></i>
                <span>Back</span>
            </a> */}
            <Button variant={ `link` } className={ cn(`flex items-center gap-2 hover:no-underline`, className) } onClick={ () => {
                history.back();
            } }>
                <i className={ `fa-solid fa-angle-left` }></i>
                <span>Back</span>
            </Button>
        </section>
    );
}