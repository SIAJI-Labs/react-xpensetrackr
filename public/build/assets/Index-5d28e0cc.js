import{j as e,r as s,e as h,a as q,d as $}from"./app-923ba5db.js";import{u as D,B as d}from"./button-f7cf1dc0.js";import{T as _}from"./TemplateList-1a2d6445.js";import{T as B}from"./TemplateNoData-91b2e021.js";import{S as K}from"./SystemLayout-73b6e515.js";import{C as P,b as U,c as H,a as M,e as z}from"./card-9ae74b28.js";import{S as p}from"./skeleton-f2cbbbc8.js";import{I as G}from"./input-f7fc0a8d.js";/* empty css            */import"./function-a672ffad.js";import"./ApplicationLogo-6a1f6591.js";import"./textarea-94ec75dc.js";import"./ApplicationLogoMask-5656f83f.js";function J(){let u=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(p,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(p,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(p,{className:"w-[10px] h-[20px] rounded-full"})]})]})})},u)}function ie({auth:u}){const j=D(),[N,w]=s.useState(!0);s.useEffect(()=>{r()},[]);const[m,E]=s.useState("");s.useEffect(()=>{if(!j){const t=setTimeout(()=>{b(f),r()},500);return()=>{clearTimeout(t)}}},[m]);const[i,g]=s.useState(null);s.useState(!0);const[n,y]=s.useState();let f=5;const[v,L]=s.useState(0),[C,k]=s.useState(0),[x,b]=s.useState(f),[T,S]=s.useState(!1),r=async()=>{w(!0),i instanceof AbortController&&i.abort();const t=new AbortController;g(t);const l=[],c={limit:x,keyword:m};for(const a in c)l.push(encodeURIComponent(a)+"="+encodeURIComponent(c[a]));try{let o=(await h.get(`${route("api.wallet.v1.list")}?${l.join("&")}`,{cancelToken:new h.CancelToken(function(A){t.abort=A})})).data;y(o.result.data),S(o.result.has_more),L(o.result.data.length),"total"in o.result&&k(o.result.total),w(!1),g(null)}catch(a){h.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}};s.useEffect(()=>{j||r()},[x]);const[I,W]=s.useState(5);let R=()=>e.jsx(J,{});s.useEffect(()=>{n&&W(n.length>0?n.length:3)},[n]);let F=t=>e.jsx(_,{wallet:t});return s.useEffect(()=>{const t=()=>{setTimeout(()=>{r()},100)};return document.addEventListener("dialog.wallet.hidden",t),document.addEventListener("dialog.wallet.balance-adjustment.hidden",t),document.addEventListener("wallet.deleted-action",t),()=>{document.removeEventListener("dialog.wallet.hidden",t),document.removeEventListener("dialog.wallet.balance-adjustment.hidden",t),document.removeEventListener("wallet.deleted-action",t)}}),e.jsx(e.Fragment,{children:e.jsxs(K,{user:u.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet List"}),fabAction:["wallet"],children:[e.jsx(q,{title:"Wallet List"}),e.jsxs(P,{className:" w-full",children:[e.jsx(U,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsx("div",{children:e.jsx(H,{children:e.jsx("div",{children:"Wallet: List"})})}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{i instanceof AbortController&&i.abort(),r()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(d,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(M,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(G,{placeholder:"Search by Wallet name",value:m,onChange:t=>{E(t.target.value)}}),e.jsx($,{href:route("sys.wallet.re-order.index"),children:e.jsx(d,{variant:"outline",className:" w-10 aspect-square",children:e.jsx("i",{className:"fa-solid fa-sort"})})})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(N){let t=[];for(let l=0;l<I;l++)t.push(e.jsx("div",{children:R()},`skeleton-${l}`));return t}else{let t=[],l=e.jsx(B,{});return n&&n.length>0&&n.map((c,a)=>{t.push(e.jsx("div",{children:F(c)},`wallet_item-${a}`))}),t.length>0?t:l}})()})]})}),e.jsxs(z,{className:"flex justify-between items-center",children:[e.jsx(d,{variant:"outline",className:"dark:border-white",disabled:!T,onClick:()=>{S(!1),b(x+f)},children:"Load more"}),(()=>v>0&&C>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",v," of ",C," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{ie as default};