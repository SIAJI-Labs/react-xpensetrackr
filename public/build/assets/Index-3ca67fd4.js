import{r as i,j as e,a as l}from"./app-40004788.js";import{u as s}from"./check-52942dd2.js";import c from"./Summary-9cbe4170.js";import p from"./List-54ba9235.js";import{S as x}from"./SystemLayout-88a534e5.js";import{C as u,b as h,c as f,d as y,a as j}from"./card-26f007fd.js";import{B as d}from"./button-bea93b78.js";/* empty css            */import"./index-14986e37.js";import"./TemplateNoData-e01bfc3c.js";/* empty css              */import"./skeleton-3e7ad5e2.js";import"./TemplateList-76916f94.js";import"./badge-6e53303b.js";import"./input-37e80c12.js";import"./SkeletonList-e1ba69b1.js";import"./ApplicationLogo-eff473df.js";import"./scroll-area-a9786e46.js";import"./theme-toggle-29e5209d.js";import"./ApplicationLogoMask-e3678fcb.js";function _({auth:a,type:m="list"}){const[n,o]=i.useState(m);return i.useEffect(()=>{const t=()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))};return document.addEventListener("dialog.record.hidden",t),document.addEventListener("dialog.planned-payment.hidden",t),document.addEventListener("planned-payment.deleted-action",t),()=>{document.removeEventListener("dialog.record.hidden",t),document.removeEventListener("dialog.planned-payment.hidden",t),document.removeEventListener("planned-payment.deleted-action",t)}}),e.jsx(e.Fragment,{children:e.jsxs(x,{user:a.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Payment ",s(n)]}),fabAction:["plannedPayment"],children:[e.jsx(l,{title:`Planned Payment ${s(n)}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(u,{className:"",children:[e.jsx(h,{children:e.jsxs("div",{className:" flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(f,{children:e.jsxs("div",{children:["Planned Payment: ",s(n)]})}),e.jsxs(y,{children:["See ",n," of your Planned Payment"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsxs(j,{children:[e.jsx("div",{className:" flex flex-row gap-1 w-full border p-1 rounded-md",children:(()=>{let t=[];return["summary","list"].map((r,v)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${n===r?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{o(r)},children:e.jsx("span",{className:" text-sm font-semibold",children:s(r)})},`record_type-${r}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsxs("div",{className:" mt-6",children:[e.jsx("hr",{}),e.jsx("div",{className:"mt-4",children:(()=>n==="summary"?e.jsx(c,{auth:a}):n==="list"?e.jsx(p,{auth:a}):e.jsx(e.Fragment,{}))()})]})]})]})})]})})}export{_ as default};