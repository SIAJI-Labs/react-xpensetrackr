import{j as e,r as i,d as W,e as L,a as B}from"./app-49e19f09.js";import{B as N,u as R}from"./button-8f2a595a.js";import{S as Y}from"./SystemLayout-a53fff85.js";import{S}from"./skeleton-3b1a4842.js";import{f as A,h as b}from"./index-961138f1.js";import{D as O,a as q,b as K,c as p,T as P}from"./TemplateNoData-b0444318.js";import{C as U,b as z,c as G,d as J,a as Q,e as V}from"./card-2c105230.js";import{I as X}from"./input-d9c06e18.js";/* empty css            */import"./index-84c40666.js";import"./dialog-dd6b0ada.js";import"./index-61f18b0c.js";import"./drawer-134f179f.js";import"./theme-toggle-66897dc1.js";import"./ErrorMessage-9da431ff.js";import"./scroll-area-8438057d.js";import"./ApplicationLogoMask-c668ea73.js";import"./ApplicationLogo-c5ad270c.js";/* empty css              */function Z(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx(S,{className:"w-[100px] h-[20px] rounded-full"}),e.jsx(S,{className:"w-[200px] h-[10px] rounded-full"})]}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(S,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(S,{className:"w-[10px] h-[20px] rounded-full"})]})]})})},t)}function ee({wallet:t,deleteAction:g=!0,editAction:j=!0}){let v=(Math.random()+1).toString(36).substring(7);const[m,h]=i.useState(!1);i.useEffect(()=>{const s=()=>{setTimeout(()=>{h(!1)},100)};return document.addEventListener("dialog.wallet-share.shown",s),document.addEventListener("dialog.wallet-share.prompt-shown",s),()=>{document.removeEventListener("dialog.wallet-share.prompt-shown",s)}});const u=s=>{let a="-";if(s.length>0)if(s.length<=2)a=s.map(r=>r.name).join(" and ");else{const r=s.slice(0,2).map(C=>C.name).join(", "),o=s.length-2;a=`${r} and ${o} more wallets`}return a};return e.jsx("section",{onClick:s=>{h(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:t&&"name"in t?t.name:""}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:A(t&&"balance"in t?t.balance:0)}),e.jsx("div",{children:e.jsxs(O,{open:m,onOpenChange:h,children:[e.jsx(q,{asChild:!0,children:e.jsx(N,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(K,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>t&&"uuid"in t?e.jsx(e.Fragment,{children:e.jsx(W,{href:route("sys.wallet-share.show",{uuid:t.uuid}),children:e.jsx(p,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletShare-dialogShareSection")?e.jsx(p,{className:" cursor-pointer",onClick:l=>{let a=l.target;if(a){let r=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{r&&(a.innerHTML=r),document.removeEventListener("dialog.wallet-share.prompt-shown",o)};document.addEventListener("dialog.wallet-share.prompt-shown",o)}document.dispatchEvent(new CustomEvent("wallet-share.share-prompt",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" ",children:"Share"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletShare-dialogSection")&&j?e.jsx(p,{className:" cursor-pointer",onClick:l=>{let a=l.target;if(a){let r=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{r&&(a.innerHTML=r),document.removeEventListener("dialog.wallet-share.shown",o)};document.addEventListener("dialog.wallet-share.shown",o)}document.dispatchEvent(new CustomEvent("wallet-share.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletShareBalanceAdjustment-dialogSection")&&j?e.jsx(p,{className:" cursor-pointer",onClick:l=>{let a=l.target;if(a){let r=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{r&&(a.innerHTML=r),document.removeEventListener("dialog.wallet-share.balance-adjustment.shown",o)};document.addEventListener("dialog.wallet-share.balance-adjustment.shown",o)}document.dispatchEvent(new CustomEvent("wallet-share.balance-adjustment.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Balance Adjustment"})}):e.jsx(e.Fragment,{}))(),(()=>{let s=document.getElementById("walletShare-deleteDialogSection");return g&&s?e.jsx(p,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-share.delete-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})]})]}),(()=>{let s=[];return t&&t.passphrase&&s.push(e.jsx("small",{children:e.jsx("i",{className:"fa-solid fa-lock"})},`items_passphrase-${t.uuid}`)),t&&t.valid_until&&s.push(e.jsx("small",{className:`${b(b(t.valid_until).format("YYYY-MM-DD"))<b(b().format("YYYY-MM-DD"))?"text-red-500":""}`,children:e.jsx("i",{className:"fa-solid fa-clock"})},`items_deadline-${t.uuid}`)),t&&"wallet_share_item"in t&&t.wallet_share_item&&s.push(e.jsxs("small",{className:" flex flex-row gap-1 items-center",children:[e.jsx("i",{className:"fa-solid fa-wallet"}),e.jsx("span",{children:t&&"wallet_share_item"in t&&t.wallet_share_item?u(t.wallet_share_item):""})]},`items_wallet-${t.uuid}`)),s.length>0?e.jsx("div",{className:" flex flex-row flex-wrap gap-2 items-center",children:s}):e.jsx(e.Fragment,{})})()]})},v)}function Se({auth:t}){const g=R(),[j,v]=i.useState(!0);i.useEffect(()=>{x()},[]);const[m,h]=i.useState("");i.useEffect(()=>{if(!g){const n=setTimeout(()=>{k(r),x()},500);return()=>{clearTimeout(n)}}},[m]);const[u,s]=i.useState(null),[l,a]=i.useState();let r=5;const[o,C]=i.useState(0),[T,D]=i.useState(0),[E,k]=i.useState(r),[I,y]=i.useState(!1),x=async()=>{v(!0),u instanceof AbortController&&u.abort();const n=new AbortController;s(n);const c=[],w={limit:E,keyword:m};for(const d in w)c.push(encodeURIComponent(d)+"="+encodeURIComponent(w[d]));try{let f=(await L.get(`${route("api.wallet-share.v1.list")}?${c.join("&")}`,{cancelToken:new L.CancelToken(function(H){n.abort=H})})).data;a(f.result.data),y(f.result.has_more),C(f.result.data.length),"total"in f.result&&D(f.result.total),v(!1),s(null)}catch(d){L.isCancel(d)?console.log("Request was canceled",d):console.error("Error:",d)}};i.useEffect(()=>{g||x()},[E]);const[M,_]=i.useState(5);let F=()=>e.jsx(Z,{});i.useEffect(()=>{l&&_(l.length>0?l.length:3)},[l]);let $=n=>e.jsx(ee,{wallet:n});return i.useEffect(()=>{const n=()=>{setTimeout(()=>{x()},100)};return document.addEventListener("dialog.wallet-share.hidden",n),document.addEventListener("wallet-share.deleted-action",n),document.addEventListener("dialog.record.hidden",n),()=>{document.removeEventListener("dialog.wallet-share.hidden",n),document.removeEventListener("wallet-share.deleted-action",n),document.removeEventListener("dialog.record.hidden",n)}}),e.jsx(e.Fragment,{children:e.jsxs(Y,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet Share List"}),fabAction:["wallet-share"],children:[e.jsx(B,{title:"Wallet Share List"}),e.jsxs(U,{className:" w-full",children:[e.jsx(z,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(G,{children:e.jsx("div",{children:"Wallet Share: List"})}),e.jsx(J,{children:"Share your Wallet"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(N,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{u instanceof AbortController&&u.abort(),x()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(N,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet-share.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(Q,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(X,{placeholder:"Search by name",value:m,onChange:n=>{h(n.target.value)}})}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(j){let n=[];for(let c=0;c<M;c++)n.push(e.jsx("div",{children:F()},`skeleton-${c}`));return n}else{let n=[],c=e.jsx(P,{});return l&&l.length>0&&l.map((w,d)=>{n.push(e.jsx("div",{children:$(w)},`walletShare_item-${d}`))}),n.length>0?n:c}})()})]})}),e.jsxs(V,{className:"flex justify-between items-center",children:[e.jsx(N,{variant:"outline",className:"dark:border-white",disabled:!I,onClick:()=>{y(!1),k(E+r)},children:"Load more"}),(()=>o>0&&T>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",o," of ",T," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{Se as default};