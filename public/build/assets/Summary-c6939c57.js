import{r as o,j as e,d as $,e as g}from"./app-6ad0fa3b.js";import{m as r,f as M}from"./Combination-3409af4d.js";import{N as A}from"./skeleton-cfbb3530.js";import{D as L,a as B,b as F,c as O}from"./dropdown-menu-67aeed53.js";import{B as c,u as q}from"./button-aef6a608.js";import{S as y}from"./SummarySkeleton-f22f4ae8.js";function z({plannedPayment:t,period:p}){let f=(Math.random()+1).toString(36).substring(7);const[x,d]=o.useState(!1);return console.log(t),e.jsx("section",{onClick:v=>{d(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold",children:t&&t?`${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`:"Wallet Name"}),e.jsx("div",{children:e.jsxs(L,{open:x,onOpenChange:d,children:[e.jsx(B,{asChild:!0,children:e.jsx(c,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(F,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:e.jsx($,{href:t?route("sys.planned-payment.summary.show",{wallet:t.uuid,period:p!==void 0?r(p).format("YYYY-MM"):null}):"#",children:e.jsx(O,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[t&&t.expected_planned_income?t.expected_planned_income.length:0," expected Income"]}),e.jsx("span",{className:"text-green-500",children:M(t&&t.expected_income?t.expected_income:0)})]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("span",{children:[t&&t.expected_planned_income?t.expected_planned_expense.length:0," expected Expense"]}),e.jsx("span",{className:"text-red-500",children:M(t&&t.expected_expense?t.expected_expense:0)})]})]})]})},f)}function V({auth:t,activeType:p}){const f=q();o.useEffect(()=>{h()},[]);const[x,d]=o.useState(null),[v,w]=o.useState(!0),[a,S]=o.useState();let N=5;const[m,k]=o.useState(N),[D,Y]=o.useState(!1),h=async()=>{w(!0),x instanceof AbortController&&x.abort();const s=new AbortController;d(s);const n=[],u={filter_period:r(i).format("YYYY-MM-DD"),filter_period_timezone:r.tz.guess(),limit:m};for(const l in u)n.push(encodeURIComponent(l)+"="+encodeURIComponent(u[l]));try{let C=(await g.get(`${route("api.planned-payment.summary.v1.list")}?${n.join("&")}`,{cancelToken:new g.CancelToken(function(T){s.abort=T})})).data;S(C.result.data),Y(C.result.has_more),w(!1),d(null)}catch(l){g.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}};let _=s=>e.jsx(z,{plannedPayment:s,period:r(i).toDate()});const[E,I]=o.useState(5);let R=()=>e.jsx(y,{});o.useEffect(()=>{a&&I(a.length>0?a.length:3)},[a]);const[i,b]=o.useState();if(i===void 0){let s=r();b(r(s).toDate())}const j=(s="prev")=>{let n=r(i);s==="prev"?n=r(n).subtract(1,"months"):s==="next"?n=r(n).add(1,"months"):s==="current"&&(n=r()),b(r(n).toDate())};return o.useEffect(()=>{f||h()},[m,i]),o.useEffect(()=>{if(!f){const s=()=>{console.log("ABC"),setTimeout(()=>{h()},100)};return document.addEventListener("planned-payment.refresh",s),()=>{document.removeEventListener("planned-payment.refresh",s)}}}),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(c,{variant:"ghost",onClick:()=>{j("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(c,{variant:"outline",className:"px-6",children:r(i).format("MMMM, YYYY")})}),e.jsx(c,{variant:"ghost",onClick:()=>{j("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>r().format("YYYY-MM-DD")!=r(i).format("YYYY-MM-DD")?e.jsxs(c,{variant:"link",className:"py-0",onClick:()=>{j("current")},children:["Back to current period (",r().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),(()=>{if(v){let s=[];for(let n=0;n<E;n++)s.push(e.jsx("div",{children:R()},`skeleton-${n}`));return s}else{let s=[],n=e.jsx(A,{});return a&&a.length>0&&a.map((u,l)=>{s.push(e.jsx("div",{children:_(u)},`planned_item-${l}`))}),s.length>0?s:n}})(),e.jsx("div",{children:e.jsx(c,{variant:"outline",className:"dark:border-white",disabled:!D,onClick:()=>{Y(!1),k(m+N)},children:"Load more"})})]})})}export{V as default};
