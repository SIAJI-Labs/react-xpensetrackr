import{r as l,j as e,d as y,e as w}from"./app-d16b799f.js";import{m as r,f as M}from"./Combination-17349819.js";import{T as A}from"./TemplateNoData-70a5ed04.js";import{D as L,a as B,b as F,c as O}from"./dropdown-menu-7be52bbd.js";import{B as d,u as q}from"./button-899873d5.js";import{S as o}from"./skeleton-05afca0c.js";function z({plannedPayment:s,period:p}){let f=(Math.random()+1).toString(36).substring(7);const[m,x]=l.useState(!1);return e.jsx("section",{onClick:v=>{x(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold",children:s&&s?`${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`:"Wallet Name"}),e.jsx("div",{children:e.jsxs(L,{open:m,onOpenChange:x,children:[e.jsx(B,{asChild:!0,children:e.jsx(d,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(F,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:e.jsx(y,{href:s?route("sys.planned-payment.summary.show",{wallet:s.uuid,period:p!==void 0?r(p).format("YYYY-MM"):null}):"#",children:e.jsx(O,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[s&&s.expected_planned_income?s.expected_planned_income.length:0," expected Income"]}),e.jsx("span",{className:"text-green-500",children:M(s&&s.expected_income?s.expected_income:0)})]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[s&&s.expected_planned_income?s.expected_planned_expense.length:0," expected Expense"]}),e.jsx("span",{className:"text-red-500",children:M(s&&s.expected_expense?s.expected_expense:0)})]})]})]})},f)}function U(){let s=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx(o,{className:"h-4 w-40"}),e.jsx(o,{className:"h-4 w-2"})]}),e.jsxs("div",{className:" mt-2 flex flex-col gap-2",children:[e.jsx(o,{className:"h-1 w-full"}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(o,{className:" h-4 w-4"}),e.jsx(o,{className:" h-4 w-20"})]}),e.jsx(o,{className:" h-4 w-6"})]}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(o,{className:" h-4 w-4"}),e.jsx(o,{className:" h-4 w-20"})]}),e.jsx(o,{className:" h-4 w-6"})]})]})]})},s)}function X({auth:s,activeType:p}){const f=q();l.useEffect(()=>{j()},[]);const[m,x]=l.useState(null),[v,N]=l.useState(!0),[i,k]=l.useState();let b=5;const[h,D]=l.useState(b),[_,Y]=l.useState(!1),j=async()=>{N(!0),m instanceof AbortController&&m.abort();const t=new AbortController;x(t);const n=[],u={filter_period:r(c).format("YYYY-MM-DD"),filter_period_timezone:r.tz.guess(),limit:h};for(const a in u)n.push(encodeURIComponent(a)+"="+encodeURIComponent(u[a]));try{let C=(await w.get(`${route("api.planned-payment.summary.v1.list")}?${n.join("&")}`,{cancelToken:new w.CancelToken(function($){t.abort=$})})).data;k(C.result.data),Y(C.result.has_more),N(!1),x(null)}catch(a){w.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}};let E=t=>e.jsx(z,{plannedPayment:t,period:r(c).toDate()});const[I,T]=l.useState(5);let R=()=>e.jsx(U,{});l.useEffect(()=>{i&&T(i.length>0?i.length:3)},[i]);const[c,S]=l.useState();if(c===void 0){let t=r();S(r(t).toDate())}const g=(t="prev")=>{let n=r(c);t==="prev"?n=r(n).subtract(1,"months"):t==="next"?n=r(n).add(1,"months"):t==="current"&&(n=r()),S(r(n).toDate())};return l.useEffect(()=>{f||j()},[h,c]),l.useEffect(()=>{if(!f){const t=()=>{console.log("ABC"),setTimeout(()=>{j()},100)};return document.addEventListener("planned-payment.refresh",t),()=>{document.removeEventListener("planned-payment.refresh",t)}}}),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(d,{variant:"ghost",onClick:()=>{g("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(d,{variant:"outline",className:"px-6",children:r(c).format("MMMM, YYYY")})}),e.jsx(d,{variant:"ghost",onClick:()=>{g("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>r().format("YYYY-MM-DD")!=r(c).format("YYYY-MM-DD")?e.jsxs(d,{variant:"link",className:"py-0",onClick:()=>{g("current")},children:["Back to current period (",r().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),(()=>{if(v){let t=[];for(let n=0;n<I;n++)t.push(e.jsx("div",{children:R()},`skeleton-${n}`));return t}else{let t=[],n=e.jsx(A,{});return i&&i.length>0&&i.map((u,a)=>{t.push(e.jsx("div",{children:E(u)},`planned_item-${a}`))}),t.length>0?t:n}})(),e.jsx("div",{children:e.jsx(d,{variant:"outline",className:"dark:border-white",disabled:!_,onClick:()=>{Y(!1),D(h+b)},children:"Load more"})})]})})}export{X as default};