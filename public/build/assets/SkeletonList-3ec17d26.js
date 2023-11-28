import{r as j,j as s,d as g}from"./app-c11dc682.js";import{m as d,a as N,f as v,u as c}from"./function-03cd69d1.js";import{B as y}from"./button-9d5b23e5.js";import{D as $,a as b,b as _,c as x}from"./TemplateNoData-3b77652e.js";import{B as m}from"./badge-7467b1d9.js";import{S as a}from"./skeleton-33057847.js";function C({record:e,deleteAction:u=!0,editAction:h=!0}){let w=(Math.random()+1).toString(36).substring(7);const[o,p]=j.useState(!1);return s.jsx("section",{onClick:t=>{p(!0)},children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[s.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:d("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,N.tz.guess())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:v(((e==null?void 0:e.amount)??0)+((e==null?void 0:e.extra_amount)??0))}),s.jsx("div",{children:s.jsxs($,{open:o,onOpenChange:p,children:[s.jsx(b,{asChild:!0,children:s.jsx(y,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(_,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[s.jsx(g,{href:route("sys.record.show",e==null?void 0:e.uuid),children:s.jsx(x,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("record-dialogSection")&&h?s.jsx(x,{className:" cursor-pointer",onClick:i=>{let l=i.target;if(l){let n=l.innerHTML;l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const f=()=>{n&&(l.innerHTML=n),document.removeEventListener("dialog.record.shown",f)};document.addEventListener("dialog.record.shown",f)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")&&u?s.jsx(x,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.delete-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${e?e.type==="expense"?" bg-red-500":"bg-green-500":""} flex items-center justify-center`,children:s.jsx("i",{className:` text-white fa-solid ${e?e.type==="income"?"fa-right-to-bracket rotate-90":"fa-right-from-bracket -rotate-90":""}`})}),s.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[s.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:e!=null&&e.category?`${e.category.parent?`${e.category.parent.name} - `:""}${e.category.name}`:"Uncategorized"}),s.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:(e==null?void 0:e.note)??"No description"})]})]}),(()=>{var i,l;const t=[];if(e!=null&&e.type&&t.push(s.jsxs(m,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-flag leading-none text-xs"}),s.jsx("span",{children:c(e==null?void 0:e.type)})]},`record_type-${e==null?void 0:e.uuid}`)),e!=null&&e.from_wallet){let n=[];n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${e!=null&&e.from_wallet.parent?`${e.from_wallet.parent.name} - `:""}${(i=e==null?void 0:e.from_wallet)==null?void 0:i.name}`},`from_wallet-${e==null?void 0:e.uuid}`)),e!=null&&e.to_wallet&&(n.push(s.jsx("i",{className:`fa-solid ${(e==null?void 0:e.type)==="expense"?"fa-caret-right":"fa-caret-left"}`},`icon_wallet-${e==null?void 0:e.uuid}`)),n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${e!=null&&e.to_wallet.parent?`${e.to_wallet.parent.name} - `:""}${(l=e==null?void 0:e.to_wallet)==null?void 0:l.name}`},`to_wallet-${e==null?void 0:e.uuid}`))),t.push(s.jsxs(m,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-wallet leading-none text-xs"}),s.jsx("span",{className:" flex items-center gap-1",children:n})]},`record_wallet-${e==null?void 0:e.uuid}`))}if(e!=null&&e.note&&t.push(s.jsxs(m,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-align-left leading-none text-xs"}),s.jsx("span",{children:"Notes"})]},`record_notes-${e==null?void 0:e.uuid}`)),t.length>0)return s.jsx(s.Fragment,{children:s.jsx("div",{className:" mt-2 flex flex-row gap-2 flex-wrap",children:t},`record_information-${e==null?void 0:e.uuid}`)})})()]})},w)}function L(){let e=(Math.random()+1).toString(36).substring(7);return s.jsx("section",{children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[s.jsxs("div",{className:" flex flex-row justify-between",children:[s.jsx(a,{className:"w-[100px] h-[20px] rounded-full"}),s.jsxs("div",{className:" flex flex-row gap-2",children:[s.jsx(a,{className:"w-[75px] h-[20px] rounded-full"}),s.jsx(a,{className:"w-[10px] h-[20px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:"",children:s.jsx(a,{className:"w-[50px] h-[50px] rounded-full"})}),s.jsxs("div",{className:" flex flex-col gap-2",children:[s.jsx(a,{className:"w-[150px] h-[15px] rounded-full"}),s.jsx(a,{className:"w-[75px] h-[10px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4",children:[s.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(a,{className:"w-[50px] h-[20px] rounded-full"})]})]})},e)}export{L as S,C as T};
