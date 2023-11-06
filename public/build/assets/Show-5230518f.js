import{j as e,r as x,a as g,d as w,y as N}from"./app-849ecda5.js";import{S as v}from"./SystemLayout-1cbabc89.js";import{B as u,c as y}from"./button-e69f2edf.js";import{a as b,m as D,u as r,f as o}from"./function-a52eedaa.js";import"./ApplicationLogo-e9a791a0.js";import{C as p,b as _,c as k,d as C,a as f}from"./card-83e59458.js";import{D as E,a as $,b as F,c as h}from"./dropdown-menu-6bc8b0ea.js";import"./ApplicationLogoMask-167085eb.js";import"./textarea-331606a5.js";import"./Combination-561de21f.js";import"./input-9f9a580a.js";function M({hasBorder:c=!0,className:s}){let a=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs(u,{variant:"link",className:y("flex items-center gap-2 hover:no-underline",s),onClick:()=>{history.back()},children:[e.jsx("i",{className:"fa-solid fa-angle-left"}),e.jsx("span",{children:"Back"})]})},a)}function U({auth:c,record:s,related:a}){const[j,d]=x.useState(!1);return x.useEffect(()=>{const l=i=>{var t,n;(t=i.detail)!=null&&t.action&&((n=i.detail)==null?void 0:n.action)==="delete"?location.href=route("sys.record.index"):N.reload()};return document.addEventListener("dialogRecord",l),()=>{document.removeEventListener("dialogRecord",l)}}),e.jsx(e.Fragment,{children:e.jsxs(v,{user:c.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Record Detail"}),children:[e.jsx(g,{title:"Record Detail"}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(M,{className:"px-0"})}),e.jsxs(p,{className:" w-full",children:[e.jsx(_,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start cursor-pointer",onClick:()=>{d(!0)},children:[e.jsxs("div",{children:[e.jsx(k,{children:e.jsx("div",{children:"Record: Detail"})}),e.jsx(C,{children:"See your detailed transaction"})]}),e.jsx("div",{children:e.jsxs(E,{open:j,onOpenChange:d,children:[e.jsx($,{asChild:!0,children:e.jsx(u,{variant:"link",className:" p-0 h-auto leading-none","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(F,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>document.getElementById("recordDialog-section")?e.jsx(h,{className:" cursor-pointer",onClick:i=>{let t=i.target;if(t){let n=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const m=()=>{n&&(t.innerHTML=n),document.removeEventListener("dialogRecordOpened",m)};document.addEventListener("dialogRecordOpened",m)}document.dispatchEvent(new CustomEvent("recordDialogEditAction",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("recordDeleteDialog-section")?e.jsx(h,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("recordDialogDeleteAction",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsxs(f,{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-clock"})}),e.jsx("span",{className:" font-medium",children:b("MMM Do, YYYY / HH:mm",s==null?void 0:s.datetime,D.tz.guess())})]}),e.jsxs("div",{className:" flex gap-4",children:[e.jsx("div",{className:" w-1/3",children:e.jsxs("div",{className:` border ${s.to_wallet?"":s.type==="income"?" border-green-500":"  border-red-500"} rounded-md h-full flex flex-col gap-2 justify-center items-center`,children:[e.jsx("div",{className:"",children:(()=>s.to_wallet?e.jsx("i",{className:" text-2xl fa-solid fa-arrow-right-arrow-left rotate-90"}):e.jsx("i",{className:`text-2xl fa-solid ${s.type==="income"?" text-green-500 fa-right-to-bracket rotate-90":" text-red-500 fa-right-from-bracket -rotate-90"}`}))()}),e.jsxs("div",{className:" flex flex-col justify-center",children:[e.jsx("span",{className:"font-normal text-center",children:s.to_wallet?"Transfer":r(s.type)}),(()=>s.to_wallet?e.jsxs("span",{className:" text-xs text-center",children:["(",r(s.type),")"]}):e.jsx(e.Fragment,{}))()]})]})}),e.jsxs("div",{className:" w-2/3",children:[e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"Category"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.category?`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`:"Uncategorized"})]}),e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"From"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.from_wallet?`${s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${s.from_wallet.name}`:"-"})]}),(()=>s.to_wallet?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-normal text-sm",children:"To"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.to_wallet?`${s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${s.to_wallet.name}`:"-"})]})}):e.jsx(e.Fragment,{}))()]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.note??"No description provided"})]}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:o(s.amount??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>s.extra_type==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",s.extra_percentage??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:o(s.extra_amount)})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:o(s.amount+s.extra_amount)})]})]})]})]}),(()=>a?e.jsx(e.Fragment,{children:e.jsx(w,{href:route("sys.record.show",a.uuid),children:e.jsx(p,{className:" mt-6 group",children:e.jsxs(f,{className:" flex flex-row gap-6 p-6 justify-between items-center",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsxs("span",{children:[r(a.type)," ",a.type==="expense"?"of":"to"]}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-semibold",children:a.from_wallet?`${a.from_wallet.parent?`${a.from_wallet.parent.name} - `:""}${a.from_wallet.name}`:"-"})]}),e.jsx("div",{className:"",children:e.jsx("span",{className:" flex items-center justify-center w-10 h-10 border rounded-full p-4 group-hover:bg-primary transition-all",children:e.jsx("i",{className:"fa-solid fa-angle-right transition-all group-hover:text-white"})})})]})})})}):e.jsx(e.Fragment,{}))()]})})}export{U as default};