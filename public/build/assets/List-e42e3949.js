import{r as n,e as f,j as e}from"./app-0ff37107.js";import{u as R,B as C}from"./button-a5a722b8.js";import{T as A}from"./TemplateList-06720d99.js";import{T as $}from"./TemplateNoData-1088f1d4.js";import{I as _}from"./input-d03631fe.js";import{S as q}from"./SkeletonList-a8555814.js";import"./function-a0a83c3b.js";import"./badge-9a3fd840.js";import"./skeleton-a108b8f6.js";function W({auth:B,activeType:D}){const d=R();n.useEffect(()=>{r()},[]);const[p,h]=n.useState(null),[w,x]=n.useState(!0),[l,y]=n.useState();let c=5;const[g,v]=n.useState(0),[j,T]=n.useState(0),[u,P]=n.useState(c),[b,S]=n.useState(!1),r=async()=>{x(!0),p instanceof AbortController&&p.abort();const t=new AbortController;h(t);const s=[],i={limit:u,keyword:m};for(const a in i)s.push(encodeURIComponent(a)+"="+encodeURIComponent(i[a]));try{let o=(await f.get(`${route("api.planned-payment.v1.list")}?${s.join("&")}`,{cancelToken:new f.CancelToken(function(F){t.abort=F})})).data;y(o.result.data),S(o.result.has_more),v(o.result.data.length),"total"in o.result&&T(o.result.total),x(!1),h(null)}catch(a){f.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}},[k,E]=n.useState(5);let I=()=>e.jsx(q,{}),L=t=>e.jsx(A,{plannedPayment:t});n.useEffect(()=>{l&&E(l.length>0?l.length:3)},[l]);const[m,N]=n.useState("");return n.useEffect(()=>{if(!d){const t=setTimeout(()=>{P(c),r()},500);return()=>{clearTimeout(t)}}},[m]),n.useEffect(()=>{d||r()},[u]),n.useEffect(()=>{if(!d){const t=()=>{setTimeout(()=>{r()},100)};return window.addEventListener("planned-payment.refresh",t),()=>{window.removeEventListener("planned-payment.refresh",t)}}}),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(_,{placeholder:"Search by Planned Payment name",value:m,onChange:t=>{N(t.target.value)}}),e.jsx(C,{children:e.jsx("i",{className:"fa-solid fa-filter"})})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(w){let t=[];for(let s=0;s<k;s++)t.push(e.jsx("div",{children:I()},`skeleton-${s}`));return t}else{let t=[],s=e.jsx($,{});return l&&l.length>0&&l.map((i,a)=>{t.push(e.jsx("div",{children:L(i)},`planned_item-${a}`))}),t.length>0?t:s}})()}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(C,{variant:"outline",className:"dark:border-white",disabled:!b,onClick:()=>{S(!1),P(u+c)},children:"Load more"}),(()=>g>0&&j>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",g," of ",j," entries"]})}):e.jsx(e.Fragment,{}))()]})]})})}export{W as default};
