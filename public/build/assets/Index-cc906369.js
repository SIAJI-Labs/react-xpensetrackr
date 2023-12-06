import{j as e,r,d as M,e as E,a as W}from"./app-c0a57826.js";import{B as N,u as R}from"./button-d783756a.js";import{S as A}from"./SystemLayout-0984c407.js";import{S as b}from"./skeleton-f6e4d272.js";import{f as B}from"./function-75a52cbe.js";import{D as H,a as O,b as q,c as C,T as K}from"./TemplateNoData-f22886e8.js";import{C as P,b as U,c as z,d as J,a as Q,e as V}from"./card-5cf52194.js";import{I as X}from"./input-ee529c58.js";/* empty css            */import"./ApplicationLogo-8aaca9c1.js";import"./theme-toggle-a28ec4eb.js";import"./ApplicationLogoMask-dc532f37.js";function Y(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx(b,{className:"w-[100px] h-[20px] rounded-full"}),e.jsx(b,{className:"w-[200px] h-[10px] rounded-full"})]}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(b,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(b,{className:"w-[10px] h-[20px] rounded-full"})]})]})})},t)}function Z({wallet:t,deleteAction:h=!0,editAction:g=!0}){let j=(Math.random()+1).toString(36).substring(7);const[m,w]=r.useState(!1),u=o=>{let s="-";if(o.length>0)if(o.length<=2)s=o.map(a=>`${a.parent?`${a.parent.name} - `:""}${a.name}`).join(" and ");else{const a=o.slice(0,2).map(p=>`${p.parent?`${p.parent.name} - `:""}${p.name}`).join(", "),i=o.length-2;s=`${a} and ${i} more wallets`}return s};return e.jsx("section",{onClick:o=>{w(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:t&&"name"in t?t.name:""}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:B(t&&"balance"in t?t.balance:0)}),e.jsx("div",{children:e.jsxs(H,{open:m,onOpenChange:w,children:[e.jsx(O,{asChild:!0,children:e.jsx(N,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(q,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>t&&"uuid"in t?e.jsx(e.Fragment,{children:e.jsx(M,{href:route("sys.wallet-group.show",{uuid:t.uuid}),children:e.jsx(C,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletGroup-dialogSection")&&g?e.jsx(C,{className:" cursor-pointer",onClick:l=>{let s=l.target;if(s){let a=s.innerHTML;s.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const i=()=>{a&&(s.innerHTML=a),document.removeEventListener("dialog.wallet-group.shown",i)};document.addEventListener("dialog.wallet-group.shown",i)}document.dispatchEvent(new CustomEvent("wallet-group.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletGroupBalanceAdjustment-dialogSection")&&g?e.jsx(C,{className:" cursor-pointer",onClick:l=>{let s=l.target;if(s){let a=s.innerHTML;s.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const i=()=>{a&&(s.innerHTML=a),document.removeEventListener("dialog.wallet-group.balance-adjustment.shown",i)};document.addEventListener("dialog.wallet-group.balance-adjustment.shown",i)}document.dispatchEvent(new CustomEvent("wallet-group.balance-adjustment.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Balance Adjustment"})}):e.jsx(e.Fragment,{}))(),(()=>{let o=document.getElementById("walletGroup-deleteDialogSection");return h&&o?e.jsx(C,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-group.delete-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})]})]}),(()=>t&&"wallet_group_item"in t&&t.wallet_group_item?e.jsx("small",{children:t&&"wallet_group_item"in t&&t.wallet_group_item?u(t.wallet_group_item):""}):e.jsx(e.Fragment,{}))()]})},j)}function pe({auth:t}){const h=R(),[g,j]=r.useState(!0);r.useEffect(()=>{x()},[]);const[m,w]=r.useState("");r.useEffect(()=>{if(!h){const n=setTimeout(()=>{T(a),x()},500);return()=>{clearTimeout(n)}}},[m]);const[u,o]=r.useState(null),[l,s]=r.useState();let a=5;const[i,p]=r.useState(0),[L,k]=r.useState(0),[S,T]=r.useState(a),[I,y]=r.useState(!1),x=async()=>{j(!0),u instanceof AbortController&&u.abort();const n=new AbortController;o(n);const c=[],v={limit:S,keyword:m};for(const d in v)c.push(encodeURIComponent(d)+"="+encodeURIComponent(v[d]));try{let f=(await E.get(`${route("api.wallet-group.v1.list")}?${c.join("&")}`,{cancelToken:new E.CancelToken(function($){n.abort=$})})).data;s(f.result.data),y(f.result.has_more),p(f.result.data.length),"total"in f.result&&k(f.result.total),j(!1),o(null)}catch(d){E.isCancel(d)?console.log("Request was canceled",d):console.error("Error:",d)}};r.useEffect(()=>{h||x()},[S]);const[D,G]=r.useState(5);let F=()=>e.jsx(Y,{});r.useEffect(()=>{l&&G(l.length>0?l.length:3)},[l]);let _=n=>e.jsx(Z,{wallet:n});return r.useEffect(()=>{const n=()=>{setTimeout(()=>{x()},100)};return document.addEventListener("dialog.wallet-group.hidden",n),document.addEventListener("dialog.wallet-group.balance-adjustment.hidden",n),document.addEventListener("wallet-group.deleted-action",n),()=>{document.removeEventListener("dialog.wallet-group.hidden",n),document.removeEventListener("dialog.wallet-group.balance-adjustment.hidden",n),document.removeEventListener("wallet-group.deleted-action",n)}}),e.jsx(e.Fragment,{children:e.jsxs(A,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet Group List"}),fabAction:["wallet-group"],children:[e.jsx(W,{title:"Wallet Group List"}),e.jsxs(P,{className:" w-full",children:[e.jsx(U,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(z,{children:e.jsx("div",{children:"Wallet Group: List"})}),e.jsx(J,{children:"Create a group of your wallet"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(N,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{u instanceof AbortController&&u.abort(),x()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(N,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-group.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(Q,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(X,{placeholder:"Search by Group name",value:m,onChange:n=>{w(n.target.value)}})}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(g){let n=[];for(let c=0;c<D;c++)n.push(e.jsx("div",{children:F()},`skeleton-${c}`));return n}else{let n=[],c=e.jsx(K,{});return l&&l.length>0&&l.map((v,d)=>{n.push(e.jsx("div",{children:_(v)},`walletGroup_item-${d}`))}),n.length>0?n:c}})()})]})}),e.jsxs(V,{className:"flex justify-between items-center",children:[e.jsx(N,{variant:"outline",className:"dark:border-white",disabled:!I,onClick:()=>{y(!1),T(S+a)},children:"Load more"}),(()=>i>0&&L>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",i," of ",L," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{pe as default};
