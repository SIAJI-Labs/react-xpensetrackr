import{r as h,j as t,d as g}from"./app-6ce9e5c3.js";import{B as w}from"./button-a3bee333.js";import{a as o,m as j,f as N,u as v}from"./Combination-8d8062e6.js";import{B as i}from"./badge-5ce776d8.js";import{D as d,a as y,b as $,c as m}from"./dropdown-menu-197b641a.js";function M({record:e}){let f=(Math.random()+1).toString(36).substring(7);const[u,p]=h.useState(!1);return t.jsx("section",{onClick:s=>{p(!0)},children:t.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[t.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",children:[t.jsx("span",{className:" font-medium w-full md:w-auto",children:o("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,j.tz.guess())}),t.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[t.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:N((e==null?void 0:e.amount)??0)}),t.jsx("div",{children:t.jsxs(d,{open:u,onOpenChange:p,children:[t.jsx(y,{asChild:!0,children:t.jsx(w,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:t.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),t.jsxs($,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[t.jsx(g,{href:route("sys.record.show",e==null?void 0:e.uuid),children:t.jsx(m,{className:" cursor-pointer",children:t.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("recordDialog-section")?t.jsx(m,{className:" cursor-pointer",onClick:l=>{let a=l.target;if(a){let n=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const x=()=>{n&&(a.innerHTML=n),document.removeEventListener("dialogRecordOpened",x)};document.addEventListener("dialogRecordOpened",x)}document.dispatchEvent(new CustomEvent("recordDialogEditAction",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:t.jsx("span",{className:" text-yellow-500",children:"Edit"})}):t.jsx(t.Fragment,{}))(),(()=>document.getElementById("recordDeleteDialog-section")?t.jsx(m,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("recordDialogDeleteAction",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:t.jsx("span",{className:" text-red-500",children:"Delete"})}):t.jsx(t.Fragment,{}))()]})]})})]})]}),t.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[t.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${e?e.type==="expense"?" bg-red-500":"bg-green-500":""} flex items-center justify-center`,children:t.jsx("i",{className:` text-white fa-solid ${e?e.type==="income"?"fa-right-to-bracket rotate-90":"fa-right-from-bracket -rotate-90":""}`})}),t.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[t.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:e!=null&&e.category?`${e.category.parent?`${e.category.parent.name} - `:""}${e.category.name}`:"Uncategorized"}),t.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:(e==null?void 0:e.note)??"No description"})]})]}),(()=>{var l,a;const s=[];if(e!=null&&e.type&&s.push(t.jsxs(i,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[t.jsx("i",{className:"fa-solid fa-flag leading-none text-xs"}),t.jsx("span",{children:v(e==null?void 0:e.type)})]},`record_type-${e==null?void 0:e.uuid}`)),e!=null&&e.from_wallet){let n=[];n.push(t.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${e!=null&&e.from_wallet.parent?`${e.from_wallet.parent.name} - `:""}${(l=e==null?void 0:e.from_wallet)==null?void 0:l.name}`},`from_wallet-${e==null?void 0:e.uuid}`)),e!=null&&e.to_wallet&&(n.push(t.jsx("i",{className:`fa-solid ${(e==null?void 0:e.type)==="expense"?"fa-caret-right":"fa-caret-left"}`},`icon_wallet-${e==null?void 0:e.uuid}`)),n.push(t.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:`${e!=null&&e.to_wallet.parent?`${e.to_wallet.parent.name} - `:""}${(a=e==null?void 0:e.to_wallet)==null?void 0:a.name}`},`to_wallet-${e==null?void 0:e.uuid}`))),s.push(t.jsxs(i,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[t.jsx("i",{className:"fa-solid fa-wallet leading-none text-xs"}),t.jsx("span",{className:" flex items-center gap-1",children:n})]},`record_wallet-${e==null?void 0:e.uuid}`))}if(e!=null&&e.note&&s.push(t.jsxs(i,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[t.jsx("i",{className:"fa-solid fa-align-left leading-none text-xs"}),t.jsx("span",{children:"Notes"})]},`record_notes-${e==null?void 0:e.uuid}`)),s.length>0)return t.jsx(t.Fragment,{children:t.jsx("div",{className:" mt-2 flex flex-row gap-2 flex-wrap",children:s},`record_information-${e==null?void 0:e.uuid}`)})})()]})},f)}export{M as R};
