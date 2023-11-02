import{r as o,j as e,a as y,e as n}from"./app-17d73614.js";import{S as L}from"./SystemLayout-89675fa8.js";import{R as k,S as l,N as E}from"./skeleton-0c359982.js";import{C as I,b as T,c as A,d as D,a as F}from"./card-ca01e443.js";import{B as $}from"./button-3f373d9f.js";import"./textarea-1abc0be6.js";import"./index-d0f2d8d6.js";/* empty css              */import"./badge-23ba6077.js";function V({auth:f}){const[q,m]=o.useState(!1),p=s=>e.jsx(k,{record:s});let h=e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(l,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(l,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(l,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(l,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(l,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(l,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(l,{className:"w-[50px] h-[20px] rounded-full"})]})]})});const[j,P]=o.useState(5),[g,B]=o.useState("complete"),[w,x]=o.useState(!0),[N,R]=o.useState(5),[a,C]=o.useState([]),[c,u]=o.useState(null);o.useEffect(()=>{R(a.length>0?a.length:3)},[a]);const v=async()=>{c instanceof AbortController&&c.abort();const s=new AbortController;u(s),x(!0);const t=[],d={limit:j,filter_status:g};for(const r in d)t.push(encodeURIComponent(r)+"="+encodeURIComponent(d[r]));try{let b=(await n.get(`${route("api.record.v1.list")}?${t.join("&")}`,{cancelToken:new n.CancelToken(function(S){s.abort=S})})).data;C(b.result.data),x(!1),u(null)}catch(r){n.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}},i=async()=>{try{let t=(await n.get(route("api.record.v1.count-pending"))).data;v()}catch(s){n.isCancel(s)?console.log("Request was canceled",s):console.error("Error:",s)}};return o.useEffect(()=>{i();const s=()=>{setTimeout(()=>{i(),m(!1)},100)};return window.addEventListener("dialogRecord",s),()=>{window.removeEventListener("dialogRecord",s)}},[]),e.jsx(e.Fragment,{children:e.jsxs(L,{user:f.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Record List"}),children:[e.jsx(y,{title:"Record List"}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(I,{className:"",children:[e.jsx(T,{children:e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{children:[e.jsx(A,{children:e.jsx("div",{children:"Record: List"})}),e.jsx(D,{children:"See your latest transaction"})]}),(()=>e.jsx($,{variant:"outline",onClick:()=>{c instanceof AbortController&&c.abort(),i()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(F,{className:" flex flex-col gap-6",children:e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(w){let s=[];for(let t=0;t<N;t++)s.push(e.jsx("div",{children:h},`skeleton-${t}`));return s}else{let s=[],t=e.jsx(E,{});return a.length>0&&a.map((d,r)=>{s.push(e.jsx("div",{children:p(d)},`record_item-${r}`))}),s.length>0?s:t}})()})})]})})]})})}export{V as default};
