import{j as e,r as n,d as L,e as f,a as $}from"./app-0f7f6890.js";import{S as R}from"./SystemLayout-e515f18f.js";import{C as T,b as W,c as A,a as F,e as M}from"./card-43f822a6.js";import{S as p,N as O}from"./skeleton-9245f950.js";import{B as i,u as _}from"./button-ca44c454.js";import{I as q}from"./input-72062d81.js";import{f as B}from"./Combination-efa42deb.js";import{D as K,a as P,b as U,c as H}from"./dropdown-menu-7ce55958.js";import"./ApplicationLogo-d7e14e46.js";import"./ApplicationLogoMask-0391dc39.js";import"./textarea-cd17f820.js";function z(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(p,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(p,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(p,{className:"w-[10px] h-[20px] rounded-full"})]})]})})},t)}function G({wallet:t,deleteAction:h=!0,editAction:u=!0}){let d=(Math.random()+1).toString(36).substring(7);const[x,o]=n.useState(!1);return e.jsx("section",{onClick:m=>{o(!0)},children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:t&&"name"in t?`${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`:"-"}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:B(t&&"balance"in t?t.balance:0)}),e.jsx("div",{children:e.jsxs(K,{open:x,onOpenChange:o,children:[e.jsx(P,{asChild:!0,children:e.jsx(i,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(U,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:(()=>t&&"uuid"in t?e.jsx(e.Fragment,{children:e.jsx(L,{href:route("sys.wallet.show",{uuid:t.uuid}),children:e.jsx(H,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))()})]})})]})]})})},d)}function le({auth:t}){_();const[h,u]=n.useState(!0);n.useEffect(()=>{S()},[]);const[d,x]=n.useState(""),[o,m]=n.useState(null);n.useState(!0);const[l,C]=n.useState();let j=5;const[g,v]=n.useState(j),[N,w]=n.useState(!1),S=async()=>{u(!0),o instanceof AbortController&&o.abort();const s=new AbortController;m(s);const r=[],c={limit:g,keyword:d};for(const a in c)r.push(encodeURIComponent(a)+"="+encodeURIComponent(c[a]));try{let b=(await f.get(`${route("api.wallet.v1.list")}?${r.join("&")}`,{cancelToken:new f.CancelToken(function(E){s.abort=E})})).data;C(b.result.data),w(b.result.has_more),u(!1),m(null)}catch(a){f.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}},[k,y]=n.useState(5);let I=()=>e.jsx(z,{});n.useEffect(()=>{l&&y(l.length>0?l.length:3)},[l]);let D=s=>e.jsx(G,{wallet:s});return e.jsx(e.Fragment,{children:e.jsxs(R,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet List"}),children:[e.jsx($,{title:"Wallet List"}),e.jsxs(T,{className:" w-full",children:[e.jsx(W,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsx("div",{children:e.jsx(A,{children:e.jsx("div",{children:"Wallet: List"})})}),e.jsxs("div",{className:"flex items-center gap-2",children:[(()=>e.jsx(i,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))(),e.jsx(i,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(F,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(q,{placeholder:"Search by Wallet name",value:d,onChange:s=>{x(s.target.value)}}),e.jsx(i,{children:e.jsx("i",{className:"fa-solid fa-filter"})})]}),(()=>{if(h){let s=[];for(let r=0;r<k;r++)s.push(e.jsx("div",{children:I()},`skeleton-${r}`));return s}else{let s=[],r=e.jsx(O,{});return l&&l.length>0&&l.map((c,a)=>{s.push(e.jsx("div",{children:D(c)},`wallet_item-${a}`))}),s.length>0?s:r}})()]})}),e.jsx(M,{children:e.jsx("div",{children:e.jsx(i,{variant:"outline",className:"dark:border-white",disabled:!N,onClick:()=>{w(!1),v(g+j)},children:"Load more"})})})]})]})})}export{le as default};