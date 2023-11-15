import{r as v,j as r,d as _}from"./app-5a0ca9ef.js";import{m as h,f as $,u as l}from"./Combination-0050252e.js";import{D as b,a as D,b as d,c as u}from"./dropdown-menu-13d7d6f0.js";import{B as k}from"./button-c792a1cb.js";import{B as t}from"./badge-9ebc543d.js";function T({plannedPayment:s,deleteAction:g=!0,editAction:w=!0}){let j=(Math.random()+1).toString(36).substring(7);const[N,x]=v.useState(!1);return r.jsx("section",{onClick:i=>{x(!0)},children:r.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[r.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[r.jsx("span",{className:" font-medium w-full md:w-auto",children:h(s&&"date_start"in s?s==null?void 0:s.date_start:h()).format("MMM Do, YYYY")}),r.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[r.jsx("span",{className:` font-normal whitespace-nowrap ${s&&"type"in s?(s==null?void 0:s.type)==="expense"?" text-red-500":s.type==="income"?"text-green-500":" dark:text-white":""}`,children:$(s&&"amount"in s?s==null?void 0:s.amount:0)}),r.jsx("div",{children:r.jsxs(b,{open:N,onOpenChange:x,children:[r.jsx(D,{asChild:!0,children:r.jsx(k,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:r.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),r.jsxs(d,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>s&&"uuid"in s?r.jsx(r.Fragment,{children:r.jsx(_,{href:route("sys.planned-payment.show",{uuid:s.uuid}),children:r.jsx(u,{className:" cursor-pointer",children:r.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):r.jsx(r.Fragment,{}))(),(()=>{let i=document.getElementById("plannedPaymentDialog-section");return w&&i?r.jsx(u,{className:" cursor-pointer",onClick:c=>{let o=c.target;if(o){let e=o.innerHTML;o.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const f=()=>{e&&(o.innerHTML=e),document.removeEventListener("dialog.planned-payment.shown",f)};document.addEventListener("dialog.planned-payment.shown",f)}document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null}}))},children:r.jsx("span",{className:" text-yellow-500",children:"Edit"})}):r.jsx(r.Fragment,{})})(),(()=>{let i=document.getElementById("plannedPaymentDeleteDialog-section");return g&&i?r.jsx(u,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:r.jsx("span",{className:" text-red-500",children:"Delete"})}):r.jsx(r.Fragment,{})})()]})]})})]})]}),r.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[r.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${s&&"type"in s?s.type==="income"?" bg-green-500":s.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:r.jsx("i",{className:` text-white fa-solid ${s&&"type"in s?s.type==="income"?"fa-right-to-bracket rotate-90":s.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),r.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[r.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>s&&"category_id"in s&&s.category?r.jsx(r.Fragment,{children:`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`}):r.jsx(r.Fragment,{children:"Uncategorized"}))()}),r.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:s&&"name"in s?s.name:"Planned Name"})]})]}),(()=>{var c,o;const i=[];if(s&&"repeat_type"in s&&i.push(r.jsxs(t,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[r.jsx("span",{className:" relative",children:(()=>s.repeat_type==="once"?r.jsx(r.Fragment,{children:r.jsx("span",{className:" h-4 w-4 flex justify-center items-center rounded-full bg-background text-xs",children:"1"})}):r.jsx(r.Fragment,{children:r.jsx("i",{className:"fa-solid fa-repeat leading-none text-xs"})}))()}),r.jsx("span",{children:l(s.repeat_type)})]},`plannedPayment_occurence-${s==null?void 0:s.uuid}`)),s&&"type"in s&&(s!=null&&s.type)&&i.push(r.jsxs(t,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[r.jsx("i",{className:"fa-solid fa-flag leading-none text-xs"}),r.jsx("span",{children:l(s==null?void 0:s.type)})]},`plannedPayment_type-${s==null?void 0:s.uuid}`)),s&&"from_wallet"in s&&(s!=null&&s.from_wallet)){let e=[];e.push(r.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${s!=null&&s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${(c=s==null?void 0:s.from_wallet)==null?void 0:c.name}`},`from_wallet-${s==null?void 0:s.uuid}`)),s&&"type"in s&&(s==null?void 0:s.type)==="transfer"&&(e.push(r.jsx("i",{className:`fa-solid ${(s==null?void 0:s.type)==="transfer"||(s==null?void 0:s.type)==="expense"?"fa-caret-right":"fa-caret-left"}`},`icon_wallet-${s==null?void 0:s.uuid}`)),e.push(r.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${s!=null&&s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${(o=s==null?void 0:s.to_wallet)==null?void 0:o.name}`},`to_wallet-${s==null?void 0:s.uuid}`))),i.push(r.jsxs(t,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[r.jsx("i",{className:"fa-solid fa-wallet leading-none text-xs"}),r.jsx("span",{className:" flex items-center gap-1",children:e})]},`plannedPayment_wallet-${s==null?void 0:s.uuid}`))}return s&&"note"in s&&(s!=null&&s.note)&&i.push(r.jsxs(t,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[r.jsx("i",{className:"fa-solid fa-align-left leading-none text-xs"}),r.jsx("span",{children:"Notes"})]},`plannedPayment_notes-${s==null?void 0:s.uuid}`)),s&&"uuid"in s&&i.length>0?r.jsx(r.Fragment,{children:r.jsx("div",{className:" mt-2 flex flex-row gap-2 flex-wrap",children:i},`plannedPayment_information-${s==null?void 0:s.uuid}`)}):r.jsx(r.Fragment,{})})()]})},j)}export{T as L};
