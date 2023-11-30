import{r as p,j as e,a as w,y as f,d as o}from"./app-923ba5db.js";import{S as N}from"./SystemLayout-73b6e515.js";import{T as y}from"./TemplateBackButton-405c70db.js";import{m as v,a as _,u as d,f as c}from"./function-a672ffad.js";import"./ApplicationLogo-6a1f6591.js";import{C as h,b,c as D,d as k,a as u}from"./card-9ae74b28.js";import{D as C,a as F,b as E,c as m}from"./TemplateNoData-91b2e021.js";import{B as T}from"./button-f7cf1dc0.js";import{B as $}from"./badge-87348c6b.js";/* empty css            */import"./textarea-94ec75dc.js";import"./ApplicationLogoMask-5656f83f.js";import"./input-f7fc0a8d.js";function q({auth:j,record:s,related:a}){const[g,r]=p.useState(!1);return p.useEffect(()=>{const l=t=>{var n,i;(n=t.detail)!=null&&n.action&&((i=t.detail)==null?void 0:i.action)==="delete"?location.href=route("sys.record.index"):f.reload()};return document.addEventListener("dialog.record.hidden",l),()=>{document.removeEventListener("dialog.record.hidden",l)}}),e.jsx(e.Fragment,{children:e.jsxs(N,{user:j.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Record Detail"}),children:[e.jsx(w,{title:"Record Detail"}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(y,{className:"px-0"})}),e.jsxs(h,{className:" w-full",children:[e.jsx(b,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start cursor-pointer",onClick:()=>{r(!0)},children:[e.jsxs("div",{children:[e.jsx(D,{children:e.jsx("div",{children:"Record: Detail"})}),e.jsx(k,{children:"See your detailed transaction"})]}),e.jsx("div",{children:e.jsxs(C,{open:g,onOpenChange:r,children:[e.jsx(F,{asChild:!0,children:e.jsx(T,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(E,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(m,{className:" cursor-pointer",onClick:()=>{f.reload(),setTimeout(()=>{r(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("record-dialogSection")?e.jsx(m,{className:" cursor-pointer",onClick:t=>{let n=t.target;if(n){let i=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const x=()=>{i&&(n.innerHTML=i),document.removeEventListener("dialog.record.shown",x)};document.addEventListener("dialog.record.shown",x)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")?e.jsx(m,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.deleted-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsxs(u,{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-clock"})}),e.jsx("span",{className:" font-medium",children:v("MMM Do, YYYY / HH:mm",s==null?void 0:s.datetime,_.tz.guess())})]}),(()=>s&&"planned_payment_record"in s&&s.planned_payment_record?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Part of Planned Payment"})]}),e.jsx("span",{className:" block mt-2",children:(()=>s.planned_payment_record&&s.planned_payment_record.planned_payment?e.jsx(e.Fragment,{children:e.jsxs("span",{children:["This record are part of ",e.jsx("u",{children:e.jsx(o,{href:route("sys.planned-payment.show",s.planned_payment_record.planned_payment.uuid),className:"text-primary",children:s.planned_payment_record.planned_payment.name})})," Planned Payment"]})}):e.jsx(e.Fragment,{}))()})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:" flex gap-4",children:[e.jsx("div",{className:" w-1/3",children:e.jsxs("div",{className:` border ${s.to_wallet?"":s.type==="income"?" border-green-500":"  border-red-500"} rounded-md h-full flex flex-col gap-2 justify-center items-center`,children:[e.jsx("div",{className:"",children:(()=>s.to_wallet?e.jsx("i",{className:" text-2xl fa-solid fa-arrow-right-arrow-left rotate-90"}):e.jsx("i",{className:`text-2xl fa-solid ${s.type==="income"?" text-green-500 fa-right-to-bracket rotate-90":" text-red-500 fa-right-from-bracket -rotate-90"}`}))()}),e.jsxs("div",{className:" flex flex-col justify-center",children:[e.jsx("span",{className:"font-normal text-center",children:s.to_wallet?"Transfer":d(s.type)}),(()=>s.to_wallet?e.jsxs("span",{className:" text-xs text-center",children:["(",d(s.type),")"]}):e.jsx(e.Fragment,{}))()]})]})}),e.jsxs("div",{className:" w-2/3",children:[e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"Category"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.category?`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`:"Uncategorized"})]}),e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"From"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.from_wallet?`${s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${s.from_wallet.name}`:"-"})]}),(()=>s.to_wallet?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"To"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.to_wallet?`${s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${s.to_wallet.name}`:"-"})]})}):e.jsx(e.Fragment,{}))()]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.note??"No description provided"})]}),e.jsxs("div",{className:" flex flex-col",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:c(s.amount??0)})]}),e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>s.extra_type==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",s.extra_percentage??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:c(s.extra_amount)})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:c(s.amount+s.extra_amount)})]})]}),(()=>{if(s.record_tags&&s.record_tags.length>0){let l=[];return s.record_tags.forEach((t,n)=>{l.push(e.jsx(o,{href:route("sys.tags.show",t.uuid),children:e.jsx($,{children:t.name})},`tags_${t.uuid}`))}),e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs("span",{className:" flex flex-row gap-1 items-center text-sm",children:[e.jsx("i",{className:" fa-solid fa-hashtag"}),e.jsx("span",{children:"Tags:"})]}),l]})}return e.jsx(e.Fragment,{})})()]})]}),(()=>a?e.jsx(e.Fragment,{children:e.jsx(o,{href:route("sys.record.show",a.uuid),children:e.jsx(h,{className:" mt-6 group",children:e.jsxs(u,{className:" flex flex-row gap-6 p-6 justify-between items-center",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsxs("span",{children:[d(a.type)," ",a.type==="expense"?"of":"to"]}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-semibold",children:a.from_wallet?`${a.from_wallet.parent?`${a.from_wallet.parent.name} - `:""}${a.from_wallet.name}`:"-"})]}),e.jsx("div",{className:"",children:e.jsx("span",{className:" flex items-center justify-center w-10 h-10 border rounded-full p-4 group-hover:bg-primary transition-all",children:e.jsx("i",{className:"fa-solid fa-angle-right transition-all group-hover:text-white"})})})]})})})}):e.jsx(e.Fragment,{}))()]})})}export{q as default};