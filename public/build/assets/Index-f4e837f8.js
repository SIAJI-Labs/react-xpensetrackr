import{r as t,e as c,j as e,a as P,d as _}from"./app-d16b799f.js";import{S as q}from"./SystemLayout-f892d8da.js";import{b as H,u as M,B as i}from"./button-899873d5.js";import{T as U}from"./TemplateList-bc54ab94.js";import{T as z}from"./TemplateNoData-70a5ed04.js";import{C as w,b as C,c as b,d as y,a as L,e as G}from"./card-13a978e4.js";import{S as a}from"./skeleton-05afca0c.js";import{B as J}from"./badge-e81cc8c0.js";import"./Combination-17349819.js";import"./ApplicationLogo-2e791cc6.js";import"./ApplicationLogoMask-12f49f23.js";import"./dropdown-menu-7be52bbd.js";import"./textarea-abf45f9c.js";import"./input-f39ac078.js";const K=H("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);function de({auth:p,inspire:R=""}){const j=M(),[S,x]=t.useState(!1),[o,g]=t.useState("complete"),[m,u]=t.useState(!0),[k,E]=t.useState(5),[d,I]=t.useState([]),[f,N]=t.useState(null),[v,T]=t.useState(0);let F=e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(a,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(a,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(a,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(a,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(a,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"})]})]})});const D=s=>e.jsx(U,{record:s}),A=async()=>{x(!0),f instanceof AbortController&&f.abort();const s=new AbortController;N(s),u(!0);const r=[],l={limit:10,filter_status:o};for(const n in l)r.push(encodeURIComponent(n)+"="+encodeURIComponent(l[n]));try{let $=(await c.get(`${route("api.record.v1.list")}?${r.join("&")}`,{cancelToken:new c.CancelToken(function(B){s.abort=B})})).data;I($.result.data),u(!1),x(!1),N(null)}catch(n){c.isCancel(n)?console.log("Request was canceled",n):console.error("Error:",n)}};t.useEffect(()=>{j||h()},[o]),t.useEffect(()=>{E(d.length>0?d.length:3)},[d]);const h=async()=>{var s;x(!0);try{let l=(await c.get(route("api.record.v1.count-pending"))).data;T((s=l==null?void 0:l.result)==null?void 0:s.data),x(!1),A()}catch(r){c.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}};return t.useEffect(()=>{h()},[]),t.useEffect(()=>{if(!j){const s=r=>{setTimeout(()=>{h()},100)};return document.addEventListener("dialog.record.hidden",s),document.addEventListener("record.deleted-action",s),()=>{document.removeEventListener("dialog.record.hidden",s),document.removeEventListener("record.deleted-action",s)}}}),e.jsxs(q,{user:p.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Dashboard"}),children:[e.jsx(P,{title:"Dashboard"}),e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs(w,{className:"",children:[e.jsx(C,{className:"",children:e.jsxs("div",{className:"flex flex-col space-y-2 ",children:[e.jsxs(b,{children:[e.jsx("span",{className:" font-light",children:"Hi"})," ",e.jsx("span",{className:" font-semibold",children:p.user.name}),","]}),e.jsx(y,{children:"how's doing? 👋"})]})}),e.jsx(L,{children:e.jsx("div",{dangerouslySetInnerHTML:{__html:R},className:" p-4 rounded-lg bg-gray-100 dark:bg-background dark:border"})})]}),e.jsxs(w,{className:" w-full",children:[e.jsx(C,{children:e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsxs("div",{children:[e.jsx(b,{children:e.jsx("div",{children:"Record: List"})}),e.jsx(y,{children:"See your latest transaction"})]}),(()=>S?e.jsx(i,{disabled:!0,children:e.jsx(K,{className:"h-4 w-4 animate-spin"})}):e.jsx(i,{variant:"outline",onClick:()=>{f instanceof AbortController&&f.abort(),h()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsxs(L,{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-4",id:"dashboard-recordList",children:[e.jsx(i,{variant:o==="complete"?"default":"outline",onClick:()=>{o!=="complete"&&(g("complete"),u(!m))},className:" ",children:"Complete"}),e.jsxs(i,{variant:o==="pending"?"default":"outline",onClick:()=>{o!=="pending"&&(g("pending"),u(!m))},className:" flex flex-row gap-1 ",children:[e.jsx("span",{children:"Pending"}),(()=>v>0?e.jsx(e.Fragment,{children:e.jsx(J,{className:`${o==="pending"?" bg-white text-primary":null} leading-none p-0 h-4 w-4 flex items-center justify-center`,children:v})}):e.jsx(e.Fragment,{}))()]})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(m){let s=[];for(let r=0;r<k;r++)s.push(e.jsx("div",{children:F},`skeleton-${r}`));return s}else{let s=[],r=e.jsx(z,{});return d.length>0&&d.map((l,n)=>{s.push(e.jsx("div",{children:D(l)},`record_item-${n}`))}),s.length>0?s:r}})()})]}),(()=>m?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:e.jsx(G,{children:e.jsx(_,{href:route("sys.record.index"),children:e.jsx(i,{variant:"outline",className:"",children:"Load all"})})})}))()]})]})]})}export{de as default};