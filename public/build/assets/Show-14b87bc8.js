import{r as n,j as e,a as R,y as v,e as x}from"./app-923ba5db.js";import{T as I}from"./TemplateBackButton-405c70db.js";import{T as S}from"./TemplateNoData-91b2e021.js";import{u as $,B as g}from"./button-f7cf1dc0.js";import{C as k,b as D,c as E,d as _,a as F}from"./card-9ae74b28.js";import{S as T,a as A}from"./SystemLayout-73b6e515.js";import{e as a,f as h,u as B}from"./function-a672ffad.js";/* empty css            */import"./ApplicationLogo-6a1f6591.js";import"./textarea-94ec75dc.js";import"./ApplicationLogoMask-5656f83f.js";import"./input-f7fc0a8d.js";function X({auth:w,period:d}){const N=$();let c=a(`${d}-01`).format("MMM, YYYY");const[p,C]=n.useState(null),[i,M]=n.useState([]),[f,j]=n.useState([]),[r,b]=n.useState(()=>localStorage.getItem("xtrackr-cashflow_show_sort")||"asc"),Y=async()=>{p instanceof AbortController&&p.abort();const t=new AbortController;C(t);const l=[],s={year:a(`${d}-01`).format("YYYY"),month:a(`${d}-01`).format("MM")};for(const o in s)l.push(encodeURIComponent(o)+"="+encodeURIComponent(s[o]));try{let u=(await x.get(`${route("api.report.cash-flow.v1.list")}?${l.join("&")}`,{cancelToken:new x.CancelToken(function(y){t.abort=y})})).data,m=u.result;m&&"graph"in m&&M(m.graph),console.log(u)}catch(o){x.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}};return n.useEffect(()=>{if("data"in i&&i.data.length>0){let t=i.data;r==="desc"&&(t=t.reverse()),j(t)}},[i]),n.useEffect(()=>{localStorage.setItem("xtrackr-cashflow_show_sort",r)},[r]),n.useEffect(()=>{N&&Y()}),e.jsxs(T,{user:w.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Report: Cash Flow (",c,")"]}),children:[e.jsx(R,{title:`Report: Cash Flow (${c})`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(I,{className:"px-0"})}),e.jsxs(k,{className:" w-full",children:[e.jsx(D,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(E,{children:e.jsxs("div",{children:["Report: ",c]})}),e.jsxs(_,{children:["Cash Flow overview for ",e.jsx("u",{children:c})," period"]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(g,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{Y(),v.reload()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})})})]})}),e.jsx(F,{children:(()=>{if(f&&f.length>0){let t=[],l=!0;if(f.forEach((s,o)=>{r==="desc"&&a(s.label).format("YYYY-MM")===a().format("YYYY-MM")&&(a(a(s.label).format("YYYY-MM-DD")).isAfter(a().format("YYYY-MM-DD"))?l=!1:l=!0),l&&t.push(e.jsxs("div",{className:" border rounded p-4 flex flex-col gap-2",children:[e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsx("div",{className:"",children:e.jsx("span",{className:"font-semibold",children:a(s.label).format("MMM Do, YYYY")})}),e.jsx("div",{className:" flex flex-row whitespace-nowrap items-center gap-2",children:e.jsx("span",{className:`${s.cash_flow>0?" text-green-500":s.cash_flow<0?" text-red-500":""} ${s.cash_flow!=0?"font-medium":""}`,children:h(s.cash_flow)})})]}),e.jsx(A,{}),e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{className:" flex flex-col gap-1 leading-none",children:[e.jsx("span",{children:"Income"}),e.jsx("span",{className:" text-green-500",children:h(s.income)})]}),e.jsxs("div",{className:" flex flex-col gap-1 leading-none items-end",children:[e.jsx("span",{children:"Expense"}),e.jsx("span",{className:" text-red-500",children:h(s.expense*-1)})]})]})]},`report-${s.label}`)),r==="asc"&&a(s.label).format("YYYY-MM")===a().format("YYYY-MM")&&s.label==a().format("YYYY-MM-DD")&&(l=!1)}),t.length>0)return e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs(g,{variant:"outline",className:" flex flex-row gap-1 mr-auto",onClick:()=>{j(f.reverse()),b(r==="asc"?"desc":"asc")},children:[e.jsx("div",{className:" w-4",children:e.jsx("i",{className:`fa-solid ${r==="asc"?"fa-sort-up":"fa-sort-down"}`})}),e.jsx("span",{className:"",children:B(r)})]}),e.jsx("div",{className:" flex flex-col gap-4",children:t})]})})}return e.jsx(S,{})})()})]})]})}export{X as default};