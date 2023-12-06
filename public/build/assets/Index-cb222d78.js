import{j as e,r as s,e as g,a as D,d as $}from"./app-c0a57826.js";import{u as _,B as d}from"./button-d783756a.js";import{S as b}from"./skeleton-f6e4d272.js";import{T as B}from"./TemplateList-b399f320.js";import{T as K}from"./TemplateNoData-f22886e8.js";import{S as P}from"./SystemLayout-0984c407.js";import{C as U,b as H,c as M,d as z,a as G,e as J}from"./card-5cf52194.js";import{I as O}from"./input-ee529c58.js";/* empty css            */import"./function-75a52cbe.js";import"./ApplicationLogo-8aaca9c1.js";import"./theme-toggle-a28ec4eb.js";import"./ApplicationLogoMask-dc532f37.js";function Q(){let u=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(b,{className:"w-[100px] h-[20px] rounded-full"}),e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(b,{className:"w-[10px] h-[20px] rounded-full"})})]})})},u)}function ce({auth:u}){const h=_(),[N,p]=s.useState(!0);s.useEffect(()=>{n()},[]);const[m,S]=s.useState("");s.useEffect(()=>{if(!h){const t=setTimeout(()=>{v(f),n()},500);return()=>{clearTimeout(t)}}},[m]);const[i,j]=s.useState(null),[o,E]=s.useState();let f=5;const[C,k]=s.useState(0),[y,L]=s.useState(0),[x,v]=s.useState(f),[T,w]=s.useState(!1),n=async()=>{p(!0),i instanceof AbortController&&i.abort();const t=new AbortController;j(t);const c=[],r={limit:x,keyword:m};for(const a in r)c.push(encodeURIComponent(a)+"="+encodeURIComponent(r[a]));try{let l=(await g.get(`${route("api.category.v1.list")}?${c.join("&")}`,{cancelToken:new g.CancelToken(function(A){t.abort=A})})).data;E(l.result.data),w(l.result.has_more),k(l.result.data.length),"total"in l.result&&L(l.result.total),p(!1),j(null)}catch(a){g.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}};s.useEffect(()=>{h||n()},[x]);const[I,F]=s.useState(5);let R=()=>e.jsx(Q,{});s.useEffect(()=>{o&&F(o.length>0?o.length:3)},[o]);let q=t=>e.jsx(B,{category:t});return s.useEffect(()=>{const t=()=>{setTimeout(()=>{n()},100)};return document.addEventListener("dialog.category.hidden",t),document.addEventListener("category.deleted-action",t),()=>{document.removeEventListener("dialog.category.hidden",t),document.removeEventListener("category.deleted-action",t)}}),e.jsx(e.Fragment,{children:e.jsxs(P,{user:u.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Category List"}),fabAction:["category"],children:[e.jsx(D,{title:"Category List"}),e.jsxs(U,{className:" w-full",children:[e.jsx(H,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(M,{children:e.jsx("div",{children:"Category: List"})}),e.jsx(z,{children:"List of your available Categories"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{i instanceof AbortController&&i.abort(),n()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("category.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(G,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(O,{placeholder:"Search by Category name",value:m,onChange:t=>{S(t.target.value)}}),e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx($,{href:route("sys.category.re-order.index"),className:"aspect-square",children:e.jsx(d,{variant:"outline",className:" w-10 aspect-square",children:e.jsx("i",{className:"fa-solid fa-sort"})})})})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{let t=[],c=e.jsx(K,{});if(N)for(let r=0;r<I;r++)t.push(e.jsx("div",{children:R()},`skeleton-${r}`));else o&&o.length>0&&o.map((r,a)=>{t.push(e.jsx("div",{children:q(r)},`category_item-${a}`))});return t.length>0?t:c})()})]})}),e.jsxs(J,{className:"flex justify-between items-center",children:[e.jsx(d,{variant:"outline",className:"dark:border-white",disabled:!T,onClick:()=>{w(!1),v(x+f)},children:"Load more"}),(()=>C>0&&y>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",C," of ",y," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{ce as default};
