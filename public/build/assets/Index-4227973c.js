import{r as i,j as e,a as o}from"./app-6ce9e5c3.js";import{C as c,b as p,c as x,d as u,a as h}from"./card-8e4f627b.js";import{S as f}from"./SystemLayout-14b8350e.js";import{u as s}from"./Combination-8d8062e6.js";import y from"./Summary-f994cca0.js";import j from"./List-03863616.js";import{B as d}from"./button-a3bee333.js";import"./ApplicationLogo-e8af2874.js";import"./ApplicationLogoMask-6411614b.js";import"./dropdown-menu-197b641a.js";import"./textarea-22b9391a.js";import"./input-e5b89247.js";import"./skeleton-e9d67b99.js";import"./SummarySkeleton-23bf862f.js";import"./ListTemplate-bd03d4d0.js";function H({auth:a,type:l="list"}){const[n,m]=i.useState(l);return i.useEffect(()=>{const t=()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))};return document.addEventListener("dialog.record.hidden",t),document.addEventListener("dialog.planned-payment.hidden",t),document.addEventListener("planned-payment.deleted-action",t),()=>{document.removeEventListener("dialog.record.hidden",t),document.removeEventListener("dialog.planned-payment.hidden",t),document.removeEventListener("planned-payment.deleted-action",t)}}),e.jsx(e.Fragment,{children:e.jsxs(f,{user:a.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Payment ",s(n)]}),children:[e.jsx(o,{title:`Planned Payment ${s(n)}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(c,{className:"",children:[e.jsx(p,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(x,{children:e.jsxs("div",{children:["Planned Payment: ",s(n)]})}),e.jsxs(u,{children:["See ",n," of your Planned Payment"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[(()=>e.jsx(d,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))(),e.jsx(d,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsxs(h,{children:[e.jsx("div",{className:" flex flex-row gap-1 w-full border p-1 rounded-md",children:(()=>{let t=[];return["summary","list"].map((r,v)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${n===r?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{m(r)},children:e.jsx("span",{className:" text-sm font-semibold",children:s(r)})},`record_type-${r}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsxs("div",{className:" mt-6",children:[e.jsx("hr",{}),e.jsx("div",{className:"mt-4",children:(()=>n==="summary"?e.jsx(y,{auth:a,activeType:n}):n==="list"?e.jsx(j,{auth:a,activeType:n}):e.jsx(e.Fragment,{}))()})]})]})]})})]})})}export{H as default};
