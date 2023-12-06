import{r as a,e as j,j as e,a as q,y as P}from"./app-763aeab1.js";import{a as t,f as v}from"./function-0da6b1b7.js";import{T as z}from"./TemplateList-5eadb36f.js";import{S as U}from"./SkeletonList-c0d9a382.js";import{T as H}from"./TemplateBackButton-501ef3f1.js";import{T as G}from"./TemplateNoData-fe2f925b.js";import{S as J}from"./SystemLayout-0e707192.js";import{C as K,b as O,c as Q,d as V,a as W,e as X}from"./card-c363146b.js";import{S as Y}from"./separator-048b0d07.js";import{u as Z,B as m}from"./button-461116eb.js";/* empty css            */import"./badge-7dde4eca.js";import"./skeleton-5ef6f780.js";import"./ApplicationLogo-a3853991.js";import"./textarea-7bab3bbd.js";import"./ApplicationLogoMask-7232c8f3.js";import"./input-9effb50d.js";function he({auth:k,wallet:n,period:g,estimate_income:$=0,estimate_expense:L=0}){const M=Z();a.useEffect(()=>{p()},[]);const[y,b]=a.useState(null),[D,C]=a.useState(!0),[i,I]=a.useState();let f=5;const[u,N]=a.useState(f),[T,S]=a.useState(!1),p=async()=>{C(!0),y instanceof AbortController&&y.abort();const r=new AbortController;b(r);const s=[],c={filter_period:t(d).format("YYYY-MM-DD"),filter_period_timezone:t.tz.guess(),limit:u};for(const o in c)s.push(encodeURIComponent(o)+"="+encodeURIComponent(c[o]));try{let l=(await j.get(`${route("api.planned-payment.summary.v1.show",n==null?void 0:n.uuid)}?${s.join("&")}`,{cancelToken:new j.CancelToken(function(F){r.abort=F})})).data;I(l.result.data),S(l.result.has_more),C(!1),b(null)}catch(o){j.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}};let R=r=>e.jsx(z,{plannedPayment:r==null?void 0:r.planned,deleteAction:!1});const[_,A]=a.useState(5);let B=()=>e.jsx(U,{});a.useEffect(()=>{i&&A(i.length>0?i.length:3)},[i]),a.useEffect(()=>{const r=()=>{P.reload(),p()};return document.addEventListener("dialog.record.hidden",r),document.addEventListener("planned-payment.summary.refresh",r),document.addEventListener("dialog.planned-payment.hidden",r),()=>{document.removeEventListener("dialog.record.hidden",r),document.removeEventListener("planned-payment.summary.refresh",r),document.removeEventListener("dialog.planned-payment.hidden",r)}});const[d,E]=a.useState();if(d===void 0){let r=t();g!==null&&(r=t(g)),E(t(r).toDate())}const x=(r="prev")=>{let s=t(d);r==="prev"?s=t(s).subtract(1,"months"):r==="next"?s=t(s).add(1,"months"):r==="current"&&(s=t()),E(t(s).toDate())};return a.useEffect(()=>{N(f)},[d]),a.useEffect(()=>{M||p()},[u,d]),a.useEffect(()=>{const r=s=>{P.reload()};return document.addEventListener("dialog.record.hidden",r),()=>{document.removeEventListener("dialog.record.hidden",r)}}),e.jsx(e.Fragment,{children:e.jsxs(J,{user:k.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Summary: ",`${n!=null&&n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`]}),children:[e.jsx(q,{title:`Planned Summary: ${n!=null&&n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(H,{className:"px-0"})}),e.jsxs(K,{className:" w-full",children:[e.jsx(O,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(Q,{children:e.jsxs("div",{children:["Planned Summary: ",`${n!=null&&n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`]})}),e.jsxs(V,{children:["See summary of ",e.jsx("u",{children:`${n!=null&&n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`})," wallet"]})]}),(()=>e.jsx(m,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.summary.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(W,{children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" border p-4 rounded-lg flex flex-col gap-3 mb-2",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Current Balance"}),e.jsx("span",{children:v(n==null?void 0:n.current_balance)})]}),e.jsx(Y,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Income"}),e.jsx("span",{className:" text-green-500",children:v($)})]}),e.jsx(Y,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Expense"}),e.jsx("span",{className:" text-red-500",children:v(L)})]})]}),e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(m,{variant:"ghost",onClick:()=>{x("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(m,{variant:"outline",className:"px-6",children:t(d).format("MMMM, YYYY")})}),e.jsx(m,{variant:"ghost",onClick:()=>{x("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>t().format("YYYY-MM-DD")!=t(d).format("YYYY-MM-DD")?e.jsxs(m,{variant:"link",className:"py-0",onClick:()=>{x("current")},children:["Back to current period (",t().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("div",{className:" flex flex-col gap-2",children:(()=>{if(D){let r=[];for(let s=0;s<_;s++)r.push(e.jsx("div",{children:B()},`skeleton-${s}`));return r}else{let r=[],s=e.jsx(G,{}),c=null;return i&&i.length>0&&i.map((o,l)=>{let h=!1;(c===null||c!==o.period)&&(h=!0,c=o.period),l>0&&h&&r.push(e.jsx("div",{children:e.jsx("div",{className:" flex justify-center relative before:absolute before:border-t before:w-[calc(50%-1.25rem)] before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1 after:absolute after:border-t after:w-[calc(50%-1.25rem)] after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1",children:e.jsx("span",{children:e.jsx("i",{className:"fa-regular fa-clock"})})})},`period_separator-${l}`)),r.push(e.jsx("div",{children:R(o)},`planned_item-${l}`))}),r.length>0?r:s}})()})]})]})}),e.jsx(X,{children:e.jsx("div",{children:e.jsx(m,{variant:"outline",className:"dark:border-white",disabled:!T,onClick:()=>{S(!1),N(u+f)},children:"Load more"})})})]})]})})}export{he as default};
