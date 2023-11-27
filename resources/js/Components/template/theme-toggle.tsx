import { useTheme, getCurrentTheme } from '@/Components/template/theme-provider';
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

export function ThemeToggle({ className = '' }: { className?: string }) {
    const { setTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    return (
        <div className={ cn(' dark:text-white', className) }>
            <Button variant={ currentTheme === 'light' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                setTheme('light');
            }}>
                <i className={ `fa-solid fa-sun` }></i>
            </Button>

            <Button variant={ currentTheme === 'system' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                setTheme('system');
            }}>
                <i className={ `fa-solid fa-display` }></i>
            </Button>

            <Button variant={ currentTheme === 'dark' ? `default` : `ghost` } className={ ` py-2 w-full` } onClick={() => {
                setTheme('dark');
            }}>
                <i className={ `fa-solid fa-moon` }></i>
            </Button>
        </div>
    );
}
