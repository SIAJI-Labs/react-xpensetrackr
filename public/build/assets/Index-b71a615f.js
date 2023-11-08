import{r as t,e as d,j as e,a as H,d as P}from"./app-661effb3.js";import{S as _}from"./SystemLayout-e3467c88.js";import{b as q,u as M,B as i}from"./button-bf5fa3fb.js";import{R as U}from"./RecordTemplate-74f23adc.js";import{S as a,N as z}from"./skeleton-ba17427d.js";import{C,b,c as v,d as R,a as y,e as O}from"./card-4894c07f.js";import{B as G}from"./badge-e756c0fb.js";import"./Combination-e6a29ca1.js";import"./ApplicationLogo-a69b41a9.js";import"./ApplicationLogoMask-c8e5364d.js";import"./dropdown-menu-4b20f48f.js";import"./textarea-0a1d2eca.js";import"./input-84b77e4e.js";const J=q("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);function oe({auth:h,inspire:S=""}){const j=M();t.useState(!1);const[L,x]=t.useState(!1),[o,g]=t.useState("complete"),[u,m]=t.useState(!0),[k,E]=t.useState(5),[c,I]=t.useState([]),[f,N]=t.useState(null),[w,F]=t.useState(0);let T=e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(a,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(a,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(a,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(a,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(a,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"})]})]})});const D=s=>e.jsx(U,{record:s}),A=async()=>{x(!0),f instanceof AbortController&&f.abort();const s=new AbortController;N(s),m(!0);const r=[],n={limit:10,filter_status:o};for(const l in n)r.push(encodeURIComponent(l)+"="+encodeURIComponent(n[l]));try{let $=(await d.get(`${route("api.record.v1.list")}?${r.join("&")}`,{cancelToken:new d.CancelToken(function(B){s.abort=B})})).data;I($.result.data),m(!1),x(!1),N(null)}catch(l){d.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}};t.useEffect(()=>{j||p()},[o]),t.useEffect(()=>{E(c.length>0?c.length:3)},[c]);const p=async()=>{var s;x(!0);try{let n=(await d.get(route("api.record.v1.count-pending"))).data;F((s=n==null?void 0:n.result)==null?void 0:s.data),x(!1),A()}catch(r){d.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}};return t.useEffect(()=>{console.log("On load"),p()},[]),t.useEffect(()=>{if(!j){console.log("Handle record dialog");const s=r=>{setTimeout(()=>{p()},100)};return document.addEventListener("dialogRecord",s),()=>{document.removeEventListener("dialogRecord",s)}}}),e.jsxs(_,{user:h.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Dashboard"}),children:[e.jsx(H,{title:"Dashboard"}),e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs(C,{className:"",children:[e.jsx(b,{className:"",children:e.jsxs("div",{className:"flex flex-col space-y-2 ",children:[e.jsxs(v,{children:[e.jsx("span",{className:" font-light",children:"Hi"})," ",e.jsx("span",{className:" font-semibold",children:h.user.name}),","]}),e.jsx(R,{children:"how's doing? 👋"})]})}),e.jsx(y,{children:e.jsx("div",{dangerouslySetInnerHTML:{__html:S},className:" p-4 rounded-lg bg-gray-100 dark:bg-background dark:border"})})]}),e.jsxs(C,{className:" w-full",children:[e.jsx(b,{children:e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{children:[e.jsx(v,{children:e.jsx("div",{children:"Record: List"})}),e.jsx(R,{children:"See your latest transaction"})]}),(()=>L?e.jsx(i,{disabled:!0,children:e.jsx(J,{className:"h-4 w-4 animate-spin"})}):e.jsx(i,{variant:"outline",onClick:()=>{f instanceof AbortController&&f.abort(),p()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsxs(y,{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-4",id:"dashboard-recordList",children:[e.jsx(i,{variant:o==="complete"?"default":"outline",onClick:()=>{o!=="complete"&&(g("complete"),m(!u))},className:" ",children:"Complete"}),e.jsxs(i,{variant:o==="pending"?"default":"outline",onClick:()=>{o!=="pending"&&(g("pending"),m(!u))},className:" flex flex-row gap-1 ",children:[e.jsx("span",{children:"Pending"}),(()=>w>0?e.jsx(e.Fragment,{children:e.jsx(G,{className:`${o==="pending"?" bg-white text-primary":null} leading-none p-0 h-4 w-4 flex items-center justify-center`,children:w})}):e.jsx(e.Fragment,{}))()]})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(u){let s=[];for(let r=0;r<k;r++)s.push(e.jsx("div",{children:T},`skeleton-${r}`));return s}else{let s=[],r=e.jsx(z,{});return c.length>0&&c.map((n,l)=>{s.push(e.jsx("div",{children:D(n)},`record_item-${l}`))}),s.length>0?s:r}})()})]}),(()=>u?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:e.jsx(O,{children:e.jsx(P,{href:route("sys.record.index"),children:e.jsx(i,{variant:"outline",className:"",children:"Load all"})})})}))()]})]})]})}export{oe as default};
