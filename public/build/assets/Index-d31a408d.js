import{r as i,j as e,a as o}from"./app-73c03442.js";import{u as s}from"./function-ee92a2f0.js";import c from"./Summary-073e8aaf.js";import p from"./List-8b412124.js";import{S as x}from"./SystemLayout-4ca02214.js";import{C as u,b as h,c as f,d as y,a as j}from"./card-28c36a49.js";import{B as d}from"./button-eb4e09d8.js";/* empty css            */import"./TemplateNoData-168525ac.js";import"./skeleton-dd3f8628.js";import"./TemplateList-9926c098.js";import"./badge-417fb541.js";import"./input-90ed9e64.js";import"./SkeletonList-cca24e24.js";import"./ApplicationLogo-b7c700a7.js";import"./theme-toggle-13218120.js";import"./ApplicationLogoMask-fc6fe874.js";function H({auth:a,type:m="list"}){const[n,l]=i.useState(m);return i.useEffect(()=>{const t=()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))};return document.addEventListener("dialog.record.hidden",t),document.addEventListener("dialog.planned-payment.hidden",t),document.addEventListener("planned-payment.deleted-action",t),()=>{document.removeEventListener("dialog.record.hidden",t),document.removeEventListener("dialog.planned-payment.hidden",t),document.removeEventListener("planned-payment.deleted-action",t)}}),e.jsx(e.Fragment,{children:e.jsxs(x,{user:a.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Payment ",s(n)]}),fabAction:["plannedPayment"],children:[e.jsx(o,{title:`Planned Payment ${s(n)}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(u,{className:"",children:[e.jsx(h,{children:e.jsxs("div",{className:" flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(f,{children:e.jsxs("div",{children:["Planned Payment: ",s(n)]})}),e.jsxs(y,{children:["See ",n," of your Planned Payment"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsxs(j,{children:[e.jsx("div",{className:" flex flex-row gap-1 w-full border p-1 rounded-md",children:(()=>{let t=[];return["summary","list"].map((r,v)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${n===r?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{l(r)},children:e.jsx("span",{className:" text-sm font-semibold",children:s(r)})},`record_type-${r}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsxs("div",{className:" mt-6",children:[e.jsx("hr",{}),e.jsx("div",{className:"mt-4",children:(()=>n==="summary"?e.jsx(c,{auth:a}):n==="list"?e.jsx(p,{auth:a}):e.jsx(e.Fragment,{}))()})]})]})]})})]})})}export{H as default};