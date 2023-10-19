import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

// Plugins
// Fontawesome
import '../../plugins/fontawesome/all.scss';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full bg-slate-100">
            {children}
        </div>
    );
}
