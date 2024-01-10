// Plugins
import "@/../css/siaji.scss";

export default function TemplateNoData({hasBorder = true}: {hasBorder?: boolean}){
    let r = (Math.random() + 1).toString(36).substring(7);

    return (
        <section key={r}>
            <div className={ ` ${hasBorder ? 'border' : ''} p-4 rounded flex flex-row items-center justify-center` }>
                <span>No data available</span>
            </div>
        </section>
    );
}