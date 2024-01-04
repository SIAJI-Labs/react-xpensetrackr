import{r as d,j as e,a as w,y as c,d as o}from"./app-3c6f5806.js";import{u as j,f as a}from"./check-bb2c4d62.js";import{T as N}from"./TemplateBackButton-394ff84e.js";import{S as y}from"./SystemLayout-9451cc14.js";import{D as E,a as _,b as C,c as x}from"./TemplateNoData-3c5d76cc.js";import{C as u,b as g,c as m,d as D,a as h}from"./card-13c517d6.js";import{B as L}from"./button-620a8a90.js";import{B as t}from"./badge-0c2a7b35.js";/* empty css            */import"./index-19be1af9.js";/* empty css              */import"./ApplicationLogo-5dc75d28.js";import"./scroll-area-2e1ec903.js";import"./theme-toggle-ae599113.js";import"./input-7b48b385.js";import"./ApplicationLogoMask-fc01e341.js";function G({auth:b,data:s}){const[v,f]=d.useState(!1);return d.useState(s.start),d.useState(s.end),d.useEffect(()=>{const n=i=>{var l,r;(l=i.detail)!=null&&l.action&&((r=i.detail)==null?void 0:r.action)==="delete"?c.visit(route("sys.budget.index")):c.reload()};return document.addEventListener("budget.deleted-action",n),document.addEventListener("dialog.budget.hidden",n),document.addEventListener("dialog.record.hidden",n),()=>{document.addEventListener("budget.deleted-action",n),document.removeEventListener("dialog.budget.hidden",n),document.removeEventListener("dialog.record.hidden",n)}}),e.jsx(e.Fragment,{children:e.jsxs(y,{user:b.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Budget Detail: ",`${s==null?void 0:s.name}`]}),fabAction:["budget"],children:[e.jsx(w,{title:`Budget: ${s==null?void 0:s.name}`}),e.jsx(N,{className:"px-0"}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(u,{className:" w-full",children:[e.jsx(g,{children:e.jsxs("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(m,{children:e.jsxs("div",{children:["Budget Detail: ",`${s==null?void 0:s.name}`]})}),e.jsx(D,{children:"See summary of your budget"})]}),e.jsx("div",{children:e.jsxs(E,{open:v,onOpenChange:f,children:[e.jsx(_,{asChild:!0,children:e.jsx(L,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(C,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(x,{className:" cursor-pointer",onClick:()=>{c.reload(),setTimeout(()=>{f(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("budget-dialogSection")?e.jsx(x,{className:" cursor-pointer",onClick:i=>{let l=i.target;if(l){let r=l.innerHTML;l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const p=()=>{r&&(l.innerHTML=r),document.removeEventListener("dialog.budget.shown",p)};document.addEventListener("dialog.budget.shown",p)}document.dispatchEvent(new CustomEvent("budget.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("budget-deleteDialogSection")?e.jsx(x,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("budget.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(h,{children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{children:"Occurence"}),e.jsx(t,{variant:"outline",children:j(s.occurence)})]}),e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{children:"Interval"}),e.jsx(t,{variant:"outline",children:s.occurence==="once"?s.interval:j(s.interval)})]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.description??"No description provided"})]})]})})]}),e.jsxs(u,{className:" w-full",children:[e.jsx(g,{children:e.jsx("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:e.jsx("div",{children:e.jsx(m,{children:e.jsx("div",{children:"Condition"})})})})}),e.jsx(h,{children:(()=>{if(s.budget_category&&s.budget_category.length>0||s.budget_wallet&&s.budget_wallet.length>0||s.budget_tags&&s.budget_tags.length>0){let n=[];if(s.budget_category&&s.budget_category.length>0){let i=[];s.budget_category.forEach((l,r)=>{i.push(e.jsx(o,{href:route("sys.category.show",l.uuid),children:e.jsx(t,{children:l.name})}))}),n.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Category (",s.budget_category.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:i})]},"condition-category"))}if(s.budget_wallet&&s.budget_wallet.length>0){let i=[];s.budget_wallet.forEach((l,r)=>{i.push(e.jsx(o,{href:route("sys.wallet.show",l.uuid),children:e.jsx(t,{children:l.name})}))}),n.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Wallet (",s.budget_wallet.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:i})]},"condition-wallet"))}if(s.budget_tags&&s.budget_tags.length>0){let i=[];s.budget_tags.forEach((l,r)=>{i.push(e.jsx(o,{href:route("sys.tags.show",l.uuid),children:e.jsx(t,{children:l.name})}))}),n.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Tags (",s.budget_tags.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:i})]},"condition-tags"))}return e.jsx("div",{className:" flex flex-col gap-4",children:n})}return e.jsx("span",{children:"No condition provided"})})()})]}),e.jsxs(u,{className:" w-full",children:[e.jsx(g,{children:e.jsx("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:e.jsx("div",{children:e.jsx(m,{children:e.jsx("div",{children:"Usage"})})})})}),e.jsx(h,{className:" flex flex-col gap-4",children:e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("small",{children:"Used"}),e.jsx("span",{children:a(s.used)})]}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("small",{children:"Remaining"}),e.jsx("span",{children:a(s.remaining)})]})]}),e.jsx("div",{className:" h-3 w-full rounded-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden",children:e.jsx("div",{className:" h-full w-full absolute left-0 top-0 bg-primary",style:{width:`${s&&"remaining"in s&&"amount"in s?s.remaining/s.amount*100:100}%`}})}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs(t,{variant:"outline",children:["Limit: ",a(s.amount)]}),e.jsxs(t,{variant:"outline",children:["Usage: ",`${(100-(s&&"remaining"in s&&"amount"in s?s.remaining/s.amount*100:100)).toFixed(2)}%`]})]})]})})]})]})]})})}export{G as default};