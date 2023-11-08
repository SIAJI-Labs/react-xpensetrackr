import{r as o,j as e,d as T,e as j}from"./app-661effb3.js";import{m as n,f as M}from"./Combination-e6a29ca1.js";import{N as A}from"./skeleton-ba17427d.js";import{D as F,a as O,b as B,c as L}from"./dropdown-menu-4b20f48f.js";import{B as c,u as q}from"./button-bf5fa3fb.js";import{S as z}from"./SummarySkeleton-5172ea03.js";function U({plannedPayment:s,period:u}){let p=(Math.random()+1).toString(36).substring(7);const[x,d]=o.useState(!1);return console.log(s),e.jsx("section",{onClick:g=>{d(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold",children:s&&s?`${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`:"Wallet Name"}),e.jsx("div",{children:e.jsxs(F,{open:x,onOpenChange:d,children:[e.jsx(O,{asChild:!0,children:e.jsx(c,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(B,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:e.jsx(T,{href:s?route("sys.planned-payment.summary.show",{wallet:s.uuid,period:u!==void 0?n(u).format("YYYY-MM"):null}):"#",children:e.jsx(L,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[s&&s.expected_planned_income?s.expected_planned_income.length:0," expected Income"]}),e.jsx("span",{className:"text-green-500",children:M(s&&s.expected_income?s.expected_income:0)})]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[s&&s.expected_planned_income?s.expected_planned_expense.length:0," expected Expense"]}),e.jsx("span",{className:"text-red-500",children:M(s&&s.expected_expense?s.expected_expense:0)})]})]})]})},p)}function X({auth:s,activeType:u}){const p=q();o.useEffect(()=>{Y()},[]);const[x,d]=o.useState(null),[g,v]=o.useState(!0),[a,S]=o.useState();let w=5;const[m,k]=o.useState(w),[D,N]=o.useState(!1),Y=async()=>{v(!0),x instanceof AbortController&&x.abort();const t=new AbortController;d(t);const r=[],f={filter_period:n(i).format("YYYY-MM-DD"),filter_period_timezone:n.tz.guess(),limit:m};for(const l in f)r.push(encodeURIComponent(l)+"="+encodeURIComponent(f[l]));try{let C=(await j.get(`${route("api.planned-payment.summary.v1.list")}?${r.join("&")}`,{cancelToken:new j.CancelToken(function($){t.abort=$})})).data;S(C.result.data),N(C.result.has_more),v(!1),d(null)}catch(l){j.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}};let _=t=>e.jsx(U,{plannedPayment:t,period:n(i).toDate()});const[I,E]=o.useState(5);let R=()=>e.jsx(z,{});o.useEffect(()=>{a&&E(a.length>0?a.length:3)},[a]);const[i,b]=o.useState();if(i===void 0){let t=n();b(n(t).toDate())}const h=(t="prev")=>{let r=n(i);t==="prev"?r=n(r).subtract(1,"months"):t==="next"?r=n(r).add(1,"months"):t==="current"&&(r=n()),b(n(r).toDate())};return o.useEffect(()=>{p||Y()},[m,i]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(c,{variant:"ghost",onClick:()=>{h("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(c,{variant:"outline",className:"px-6",children:n(i).format("MMMM, YYYY")})}),e.jsx(c,{variant:"ghost",onClick:()=>{h("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>n().format("YYYY-MM-DD")!=n(i).format("YYYY-MM-DD")?e.jsxs(c,{variant:"link",className:"py-0",onClick:()=>{h("current")},children:["Back to current period (",n().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),(()=>{if(g){let t=[];for(let r=0;r<I;r++)t.push(e.jsx("div",{children:R()},`skeleton-${r}`));return t}else{let t=[],r=e.jsx(A,{});return a&&a.length>0&&a.map((f,l)=>{t.push(e.jsx("div",{children:_(f)},`planned_item-${l}`))}),t.length>0?t:r}})(),e.jsx("div",{children:e.jsx(c,{variant:"outline",className:"dark:border-white",disabled:!D,onClick:()=>{N(!1),k(m+w)},children:"Load more"})})]})})}export{X as default};
