import{r as l,j as e,a as G,y as q,e as u}from"./app-c0a57826.js";import{u as B,B as j}from"./button-d783756a.js";import{_ as U,A as z,a as Z}from"./react-apexcharts.min-eeaba0cb.js";import{e as o,f as m,u as H}from"./function-75a52cbe.js";import{T as O}from"./TemplateBackButton-0cc9f167.js";import{T as P}from"./TemplateNoData-f22886e8.js";import{S as W}from"./SystemLayout-0984c407.js";import{C as J,b as K,c as Q,d as V,a as X}from"./card-5cf52194.js";import{S as ee}from"./separator-0d41ae5f.js";import{S as i}from"./skeleton-f6e4d272.js";/* empty css            */import"./theme-toggle-a28ec4eb.js";import"./ApplicationLogo-8aaca9c1.js";import"./input-ee529c58.js";import"./ApplicationLogoMask-dc532f37.js";function we({auth:C,period:h}){const w=B();let f=o(`${h}-01`).format("MMM, YYYY");const[g,N]=l.useState(!0),[S,se]=l.useState(5);let y=e.jsxs("div",{className:"  border rounded p-4 flex flex-col gap-2",children:[e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsx(i,{className:" h-4 w-10"}),e.jsxs("div",{className:"  flex flex-row whitespace-nowrap items-center gap-2",children:[e.jsx(i,{className:" h-4 w-24"}),e.jsx(i,{className:" h-4 w-4"})]})]}),e.jsx(i,{className:"h-1 w-full rounded"}),e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{className:" flex flex-col gap-1 leading-none",children:[e.jsx(i,{className:" h-4 w-10"}),e.jsx(i,{className:" h-4 w-24"})]}),e.jsxs("div",{className:" flex flex-col gap-1 leading-none items-end",children:[e.jsx(i,{className:" h-4 w-10"}),e.jsx(i,{className:" h-4 w-24"})]})]})]});const[b,k]=l.useState(null),[c,M]=l.useState(()=>localStorage.getItem("xtrackr-cashflow_show_sort")||"asc"),[d,R]=l.useState([]),[x,Y]=l.useState([]),[I,A]=l.useState([]),[D,E]=l.useState([]),[_,$]=l.useState([]),[L,T]=l.useState([]),p=async()=>{N(!0),b instanceof AbortController&&b.abort();const s=new AbortController;k(s);const t=[],a={year:o(`${h}-01`).format("YYYY"),month:o(`${h}-01`).format("MM")};for(const n in a)t.push(encodeURIComponent(n)+"="+encodeURIComponent(a[n]));try{let r=(await u.get(`${route("api.report.cash-flow.v1.list")}?${t.join("&")}`,{cancelToken:new u.CancelToken(function(F){s.abort=F})})).data.result;r&&"graph"in r&&(N(!1),R(r.graph))}catch(n){u.isCancel(n)?console.log("Request was canceled",n):console.error("Error:",n)}};return l.useEffect(()=>{if(!w){let s=[];if(d&&"data"in d){s=d.data;let t=[],a=[],n=[],v=s.map(r=>o(r.label).format("DD"));if(A(v),t=s.map(r=>r.income),$(t),a=s.map(r=>r.expense),T(a),n=s.map(r=>r.cash_flow),E([{name:"Income",type:"column",data:t},{name:"Expense",type:"column",data:a},{name:"Cash Flow",type:"line",data:n}]),"data"in d&&d.data.length>0){let r=d.data;c==="desc"&&(r=r.reverse()),Y(r)}}}},[d]),l.useEffect(()=>{localStorage.setItem("xtrackr-cashflow_show_sort",c)},[c]),l.useEffect(()=>{w&&p();const s=()=>{setTimeout(()=>{p()},100)};return document.addEventListener("dialog.record.hidden",s),()=>{document.removeEventListener("dialog.record.hidden",s)}}),e.jsxs(W,{user:C.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Report: Cash Flow (",f,")"]}),children:[e.jsx(G,{title:`Report: Cash Flow (${f})`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(O,{className:"px-0"})}),e.jsxs(J,{className:" w-full",children:[e.jsx(K,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(Q,{children:e.jsxs("div",{children:["Report: ",f]})}),e.jsxs(V,{children:["Cash Flow overview for ",e.jsx("u",{children:f})," period"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(j,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{},disabled:!0,children:e.jsx("i",{className:"fa-solid fa-filter"})}),e.jsx(j,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{p(),q.reload()},children:e.jsx("i",{className:`fa-solid fa-rotate-right ${g?"fa-spin":""}`})})]})]})}),e.jsxs(X,{children:[e.jsx("div",{className:"",children:e.jsx(U,{options:{chart:{height:100,type:"bar",stacked:!0,toolbar:{show:!1},zoom:{enabled:!1}},stroke:{show:!0,width:[0,0,3],curve:"smooth",lineCap:"round"},dataLabels:{enabled:!1},labels:I,yaxis:{labels:{formatter:function(s){return m(s,!0).toString()},rotate:-45},tickAmount:4,forceNiceScale:!0,axisTicks:{show:!0},min:Math.min(...L),max:Math.max(..._)},xaxis:{type:"category",tickPlacement:"between",range:5,tickAmount:6},tooltip:{y:{formatter:function(s){return m(s).toString()}},marker:{show:!0}},plotOptions:{bar:{borderRadius:3,borderRadiusApplication:"end",borderRadiusWhenStacked:"all"}},markers:{size:1}},series:D,type:"line",width:"100%",height:250})}),(()=>{if(g){let s=[];for(let t=0;t<S;t++)s.push(e.jsx("div",{children:y},`skeleton-${t}`));return e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx("div",{className:" px-4 py-2 rounded border mr-auto",children:e.jsx(i,{className:" h-4 w-10"})}),e.jsx("div",{className:" flex flex-col gap-4",children:s})]})}else{if(x&&x.length>0){let s=[],t=!0;if(x.forEach((a,n)=>{c==="desc"&&o(a.label).format("YYYY-MM")===o().format("YYYY-MM")&&(o(o(a.label).format("YYYY-MM-DD")).isAfter(o().format("YYYY-MM-DD"))?t=!1:t=!0),t&&s.push(e.jsxs("div",{className:" border rounded p-4 flex flex-col gap-2",children:[e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsx("div",{className:"",children:e.jsx("span",{className:"font-semibold",children:o(a.label).format("MMM Do, YYYY")})}),e.jsx("div",{className:" flex flex-row whitespace-nowrap items-center gap-2",children:e.jsx("span",{className:`${a.cash_flow>0?" text-green-500":a.cash_flow<0?" text-red-500":""} ${a.cash_flow!=0?"font-medium":""}`,children:m(a.cash_flow)})})]}),e.jsx(ee,{}),e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{className:" flex flex-col gap-1 leading-none",children:[e.jsx("span",{children:"Income"}),e.jsx("span",{className:" text-green-500",children:m(a.income)})]}),e.jsxs("div",{className:" flex flex-col gap-1 leading-none items-end",children:[e.jsx("span",{children:"Expense"}),e.jsx("span",{className:" text-red-500",children:m(a.expense*-1)})]})]})]},`report-${a.label}`)),c==="asc"&&o(a.label).format("YYYY-MM")===o().format("YYYY-MM")&&a.label==o().format("YYYY-MM-DD")&&(t=!1)}),s.length>0)return e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs(j,{variant:"outline",className:" flex flex-row gap-1 mr-auto",onClick:()=>{Y(x.reverse()),M(c==="asc"?"desc":"asc")},children:[e.jsx("div",{className:" scale-75",children:(()=>c==="desc"?e.jsx(z,{}):e.jsx(Z,{}))()}),e.jsx("span",{className:"",children:H(c)})]}),e.jsx("div",{className:" flex flex-col gap-4",children:s})]})})}return e.jsx(P,{})}})()]})]})]})}export{we as default};
