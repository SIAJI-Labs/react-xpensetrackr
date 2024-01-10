import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

// Plugins
import "@/../css/siaji.scss";

// Shadcn
import { Button } from "@/Components/ui/button";

export default function TemplateBackButton({className}: {className?: any}){
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            <Button variant={ `link` } className={ cn(`flex items-center gap-2 hover:no-underline h-auto leading-none pt-0`, className) } onClick={() => {
                history.back();
            }}>
                <i className={ `fa-solid fa-angle-left` }></i>
                <span>Back</span>
            </Button>
        </section>
    );
}