import{r as n,e as p,j as e}from"./app-73c03442.js";import{u as R,B as w}from"./button-eb4e09d8.js";import{T as A}from"./TemplateList-9926c098.js";import{T as $}from"./TemplateNoData-168525ac.js";import{I as q}from"./input-90ed9e64.js";import{S as _}from"./SkeletonList-cca24e24.js";/* empty css            */import"./function-ee92a2f0.js";import"./badge-417fb541.js";import"./skeleton-dd3f8628.js";function W({auth:B}){const d=R();n.useEffect(()=>{r()},[]);const[f,h]=n.useState(null),[C,x]=n.useState(!0),[l,y]=n.useState();let c=5;const[g,b]=n.useState(0),[j,v]=n.useState(0),[u,P]=n.useState(c),[T,S]=n.useState(!1),r=async()=>{x(!0),f instanceof AbortController&&f.abort();const t=new AbortController;h(t);const s=[],i={limit:u,keyword:m};for(const a in i)s.push(encodeURIComponent(a)+"="+encodeURIComponent(i[a]));try{let o=(await p.get(`${route("api.planned-payment.v1.list")}?${s.join("&")}`,{cancelToken:new p.CancelToken(function(F){t.abort=F})})).data;y(o.result.data),S(o.result.has_more),b(o.result.data.length),"total"in o.result&&v(o.result.total),x(!1),h(null)}catch(a){p.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}},[k,E]=n.useState(5);let I=()=>e.jsx(_,{}),L=t=>e.jsx(A,{plannedPayment:t});n.useEffect(()=>{l&&E(l.length>0?l.length:3)},[l]);const[m,N]=n.useState("");return n.useEffect(()=>{if(!d){const t=setTimeout(()=>{P(c),r()},500);return()=>{clearTimeout(t)}}},[m]),n.useEffect(()=>{d||r()},[u]),n.useEffect(()=>{if(!d){const t=()=>{setTimeout(()=>{r()},100)};return window.addEventListener("planned-payment.refresh",t),()=>{window.removeEventListener("planned-payment.refresh",t)}}}),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(q,{placeholder:"Search by Planned Payment name",value:m,onChange:t=>{N(t.target.value)}}),e.jsx(w,{className:" w-10 aspect-square",disabled:!0,children:e.jsx("i",{className:"fa-solid fa-filter"})})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(C){let t=[];for(let s=0;s<k;s++)t.push(e.jsx("div",{children:I()},`skeleton-${s}`));return t}else{let t=[],s=e.jsx($,{});return l&&l.length>0&&l.map((i,a)=>{t.push(e.jsx("div",{children:L(i)},`planned_item-${a}`))}),t.length>0?t:s}})()}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(w,{variant:"outline",className:"dark:border-white",disabled:!T,onClick:()=>{S(!1),P(u+c)},children:"Load more"}),(()=>g>0&&j>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",g," of ",j," entries"]})}):e.jsx(e.Fragment,{}))()]})]})})}export{W as default};