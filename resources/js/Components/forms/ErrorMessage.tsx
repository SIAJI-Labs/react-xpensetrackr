export default function ErrorMessage({message}: {message?:string[] | undefined}){
    if(message){
        return <span className={ `italic text-red-500 text-sm` }>*{ message }</span>
    }
    
    return <></>;
}