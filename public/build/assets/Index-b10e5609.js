import{j as e,r,d as W,e as E,a as R}from"./app-643b45d1.js";import{B as C,u as A}from"./button-2abb1b99.js";import{S as B}from"./SystemLayout-2fdf08da.js";import{S as v}from"./skeleton-5a96e61d.js";import{f as H}from"./function-579bbfa0.js";import{D as $,a as O,b as q,c as b,T as K}from"./TemplateNoData-a426bb43.js";import{C as P,b as U,c as z,d as J,a as Q,e as V}from"./card-ea509320.js";import{I as X}from"./input-84153507.js";/* empty css            */import"./ApplicationLogo-f57477a1.js";import"./siaji-712147e8.js";import"./x-cddf793a.js";import"./scroll-area-3beb2520.js";import"./theme-toggle-54f870e3.js";import"./ApplicationLogoMask-1f9d2130.js";function Y(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx(v,{className:"w-[100px] h-[20px] rounded-full"}),e.jsx(v,{className:"w-[200px] h-[10px] rounded-full"})]}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(v,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(v,{className:"w-[10px] h-[20px] rounded-full"})]})]})})},t)}function Z({wallet:t,deleteAction:f=!0,editAction:h=!0}){let g=(Math.random()+1).toString(36).substring(7);const[m,j]=r.useState(!1),u=a=>{let s="-";if(a.length>0)if(a.length<=2)s=a.map(o=>o.name).join(" and ");else{const o=a.slice(0,2).map(N=>N.name).join(", "),l=a.length-2;s=`${o} and ${l} more wallets`}return s};return e.jsx("section",{onClick:a=>{j(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:t&&"name"in t?t.name:""}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:H(t&&"balance"in t?t.balance:0)}),e.jsx("div",{children:e.jsxs($,{open:m,onOpenChange:j,children:[e.jsx(O,{asChild:!0,children:e.jsx(C,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(q,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>t&&"uuid"in t?e.jsx(e.Fragment,{children:e.jsx(W,{href:route("sys.wallet-group.show",{uuid:t.uuid}),children:e.jsx(b,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletGroup-dialogSection")&&h?e.jsx(b,{className:" cursor-pointer",onClick:i=>{let s=i.target;if(s){let o=s.innerHTML;s.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const l=()=>{o&&(s.innerHTML=o),document.removeEventListener("dialog.wallet-group.shown",l)};document.addEventListener("dialog.wallet-group.shown",l)}document.dispatchEvent(new CustomEvent("wallet-group.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletGroupBalanceAdjustment-dialogSection")&&h?e.jsx(b,{className:" cursor-pointer",onClick:i=>{let s=i.target;if(s){let o=s.innerHTML;s.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const l=()=>{o&&(s.innerHTML=o),document.removeEventListener("dialog.wallet-group.balance-adjustment.shown",l)};document.addEventListener("dialog.wallet-group.balance-adjustment.shown",l)}document.dispatchEvent(new CustomEvent("wallet-group.balance-adjustment.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Balance Adjustment"})}):e.jsx(e.Fragment,{}))(),(()=>{let a=document.getElementById("walletGroup-deleteDialogSection");return f&&a?e.jsx(b,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-group.delete-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})]})]}),(()=>t&&"wallet_group_item"in t&&t.wallet_group_item?e.jsx("small",{children:t&&"wallet_group_item"in t&&t.wallet_group_item?u(t.wallet_group_item):""}):e.jsx(e.Fragment,{}))()]})},g)}function he({auth:t}){const f=A(),[h,g]=r.useState(!0);r.useEffect(()=>{p()},[]);const[m,j]=r.useState("");r.useEffect(()=>{if(!f){const n=setTimeout(()=>{T(o),p()},500);return()=>{clearTimeout(n)}}},[m]);const[u,a]=r.useState(null),[i,s]=r.useState();let o=5;const[l,N]=r.useState(0),[L,k]=r.useState(0),[S,T]=r.useState(o),[I,y]=r.useState(!1),p=async()=>{g(!0),u instanceof AbortController&&u.abort();const n=new AbortController;a(n);const c=[],w={limit:S,keyword:m};for(const d in w)c.push(encodeURIComponent(d)+"="+encodeURIComponent(w[d]));try{let x=(await E.get(`${route("api.wallet-group.v1.list")}?${c.join("&")}`,{cancelToken:new E.CancelToken(function(M){n.abort=M})})).data;s(x.result.data),y(x.result.has_more),N(x.result.data.length),"total"in x.result&&k(x.result.total),g(!1),a(null)}catch(d){E.isCancel(d)?console.log("Request was canceled",d):console.error("Error:",d)}};r.useEffect(()=>{f||p()},[S]);const[D,G]=r.useState(5);let F=()=>e.jsx(Y,{});r.useEffect(()=>{i&&G(i.length>0?i.length:3)},[i]);let _=n=>e.jsx(Z,{wallet:n});return r.useEffect(()=>{const n=()=>{setTimeout(()=>{p()},100)};return document.addEventListener("dialog.wallet-group.hidden",n),document.addEventListener("dialog.wallet-group.balance-adjustment.hidden",n),document.addEventListener("wallet-group.deleted-action",n),document.addEventListener("dialog.record.hidden",n),()=>{document.removeEventListener("dialog.wallet-group.hidden",n),document.removeEventListener("dialog.wallet-group.balance-adjustment.hidden",n),document.removeEventListener("wallet-group.deleted-action",n),document.removeEventListener("dialog.record.hidden",n)}}),e.jsx(e.Fragment,{children:e.jsxs(B,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet Group List"}),fabAction:["wallet-group"],children:[e.jsx(R,{title:"Wallet Group List"}),e.jsxs(P,{className:" w-full",children:[e.jsx(U,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(z,{children:e.jsx("div",{children:"Wallet Group: List"})}),e.jsx(J,{children:"Create a group of your wallet"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(C,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{u instanceof AbortController&&u.abort(),p()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(C,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-group.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(Q,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(X,{placeholder:"Search by Group name",value:m,onChange:n=>{j(n.target.value)}})}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(h){let n=[];for(let c=0;c<D;c++)n.push(e.jsx("div",{children:F()},`skeleton-${c}`));return n}else{let n=[],c=e.jsx(K,{});return i&&i.length>0&&i.map((w,d)=>{n.push(e.jsx("div",{children:_(w)},`walletGroup_item-${d}`))}),n.length>0?n:c}})()})]})}),e.jsxs(V,{className:"flex justify-between items-center",children:[e.jsx(C,{variant:"outline",className:"dark:border-white",disabled:!I,onClick:()=>{y(!1),T(S+o)},children:"Load more"}),(()=>l>0&&L>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",l," of ",L," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{he as default};
