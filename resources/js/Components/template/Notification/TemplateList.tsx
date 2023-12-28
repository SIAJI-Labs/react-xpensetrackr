import { PropsWithChildren, useState } from "react";
import { Link } from "@inertiajs/react";
import { NotificationItem, PlannedItem } from "@/types";

// Plugins
import moment from "moment-timezone";
import { formatRupiah, ucwords } from "@/function";

// Partials

// Shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

type TemplateProps = {
    notification?: NotificationItem,
}

export default function TemplateList({ notification }: PropsWithChildren<TemplateProps> ){
    // Generate random string as section-key
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r} onClick={(e) => {
            document.dispatchEvent(new CustomEvent('notification.detail-action', {
                    bubbles: true,
                    detail: {
                        uuid: notification && 'uuid' in notification ? notification?.uuid : ''
                    }
                }
            ));
        }}>
            <div className={ ` flex flex-col gap-1 border rounded p-4 cursor-pointer` }>
                {/* Period */}
                <small className={ ` leading-none` }>{ moment(notification?.created_at).format('Do MMM, YYYY / HH:mm') }</small>

                {/* Title & State */}
                <div className={ ` flex flex-row items-center gap-2` }>
                    {(() => {
                        if(!notification?.is_seen){
                            return <span className={ ` h-2 w-2 rounded-full bg-primary` }></span>;
                        }

                        return <></>;
                    })()}
                    <span>{ notification?.title }</span>
                </div>
            </div>
        </section>
    );
}