import{r as i,e as x,j as e,a as W,y as h,d as q}from"./app-f9c29e53.js";import{T as U}from"./TemplateBackButton-1bb3f5ca.js";import{T as z}from"./TemplateList-89519be2.js";import{D as G,a as J,b as K,c as d,T as y}from"./TemplateNoData-f068f40d.js";import{S as Q}from"./SystemLayout-863cb355.js";import{T as V,S as X}from"./SkeletonList-abafa668.js";import{m as D,f as Z}from"./check-0c8c6a9d.js";import{C as f,b as j,c as p,d as g,a as w,e as ee}from"./card-719678ad.js";import{B as v}from"./button-85bb5282.js";/* empty css            *//* empty css              */import"./index-b260e8f0.js";import"./ApplicationLogo-c2b51e2d.js";import"./scroll-area-ad41c8b0.js";import"./theme-toggle-32a54062.js";import"./input-7b73f046.js";import"./ApplicationLogoMask-1e4a3b0a.js";import"./badge-49643a96.js";import"./skeleton-855f6bb4.js";function be({auth:k,data:t}){const[R,b]=i.useState(!1);i.useEffect(()=>{const n=r=>{var l,s;(l=r.detail)!=null&&l.action&&((s=r.detail)==null?void 0:s.action)==="delete"?h.visit(route("sys.wallet.index")):h.reload({only:["data"]})};return document.addEventListener("dialog.wallet.hidden",n),document.addEventListener("dialog.wallet.balance-adjustment.hidden",n),document.addEventListener("wallet.deleted-action",n),()=>{document.removeEventListener("dialog.wallet.hidden",n),document.removeEventListener("dialog.wallet.balance-adjustment.hidden",n),document.addEventListener("wallet.deleted-action",n)}});const $=n=>e.jsx(V,{record:n});let M=e.jsx(X,{}),N=5;const[C,F]=i.useState(0),[E,I]=i.useState(0),[m,H]=i.useState(N),[B,L]=i.useState(!1);i.useEffect(()=>{u()},[m]);const[_,S]=i.useState(!0),[A,O]=i.useState(5),[o,Y]=i.useState([]),[c,T]=i.useState(null);i.useEffect(()=>{O(o.length>0?o.length:3)},[o]);const u=async()=>{c instanceof AbortController&&c.abort();const n=new AbortController;T(n),S(!0);const r=[],l={limit:m};for(const s in l)r.push(encodeURIComponent(s)+"="+encodeURIComponent(l[s]));r.push(encodeURIComponent("filter_wallet")+"="+t.uuid);try{let a=(await x.get(`${route("api.record.v1.list")}?${r.join("&")}`,{cancelToken:new x.CancelToken(function(P){n.abort=P})})).data;Y(a.result.data),L(a.result.has_more),F(a.result.data.length),"total"in a.result&&I(a.result.total),S(!1),T(null)}catch(s){x.isCancel(s)?console.log("Request was canceled",s):console.error("Error:",s)}};return i.useEffect(()=>{const n=()=>{setTimeout(()=>{u()},100)};return document.addEventListener("dialog.wallet.balance-adjustment.hidden",n),document.addEventListener("dialog.record.hidden",n),document.addEventListener("record.deleted-action",n),()=>{document.removeEventListener("dialog.wallet.balance-adjustment.hidden",n),document.removeEventListener("dialog.record.hidden",n),document.removeEventListener("record.deleted-action",n)}}),e.jsx(e.Fragment,{children:e.jsxs(Q,{user:k.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Wallet Detail: ",`${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`]}),fabAction:["wallet"],children:[e.jsx(W,{title:`Wallet: ${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`}),e.jsx(U,{className:"px-0"}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(f,{className:" w-full",children:[e.jsx(j,{children:e.jsxs("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(p,{children:e.jsxs("div",{children:["Wallet Detail: ",`${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`]})}),e.jsxs(g,{children:["See summary of ",e.jsx("u",{children:`${t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})," wallet"]})]}),e.jsx("div",{children:e.jsxs(G,{open:R,onOpenChange:b,children:[e.jsx(J,{asChild:!0,children:e.jsx(v,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(K,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(d,{className:" cursor-pointer",onClick:()=>{h.reload({only:["data"]}),setTimeout(()=>{b(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("wallet-dialogSection")?e.jsx(d,{className:" cursor-pointer",onClick:r=>{let l=r.target;if(l){let s=l.innerHTML;l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const a=()=>{s&&(l.innerHTML=s),document.removeEventListener("dialog.wallet.shown",a)};document.addEventListener("dialog.wallet.shown",a)}document.dispatchEvent(new CustomEvent("wallet.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletBalanceAdjustment-dialogSection")?e.jsx(d,{className:" cursor-pointer",onClick:r=>{let l=r.target;if(l){let s=l.innerHTML;l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const a=()=>{s&&(l.innerHTML=s),document.removeEventListener("dialog.wallet.balance-adjustment.shown",a)};document.addEventListener("dialog.wallet.balance-adjustment.shown",a)}document.dispatchEvent(new CustomEvent("wallet.balance-adjustment.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Balance Adjustment"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("wallet-deleteDialogSection")?e.jsx(d,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.delete-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(w,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>t.parent&&t.parent.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Parent Wallet is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Parent Wallet is deleted at ",D("MMM Do, YYYY / HH:mm",t.parent.deleted_at)]})]})}):"deleted_at"in t&&t.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",D("MMM Do, YYYY / HH:mm",t.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" flex flex-row justify-between",children:e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Balance"}),e.jsx("span",{className:" font-semibold",children:Z(t.balance)})]})})}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Related to"}),(()=>t.parent?e.jsx(q,{href:route("sys.wallet.show",t.parent.uuid),children:e.jsx("span",{className:"font-semibold underline",children:t.parent.name})}):e.jsx(e.Fragment,{children:"-"}))()]})}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})]})]})})]}),(()=>t.child&&Object.keys(t.child).length>0?e.jsx(e.Fragment,{children:e.jsxs(f,{className:" w-full",children:[e.jsx(j,{children:e.jsx("div",{className:" relative flex flex-row justify-between items-start",children:e.jsxs("div",{children:[e.jsx(p,{children:e.jsx("div",{className:" text-base",children:"Related wallet"})}),(()=>t.child?e.jsxs(g,{children:["There's ",t.child.length," item(s) related to ",e.jsx("u",{children:t.name})]}):e.jsx(e.Fragment,{}))()]})})}),e.jsx(w,{children:e.jsx("div",{className:"flex flex-col gap-4",children:(()=>{let n=[],r=e.jsx(y,{});return Object.values(t.child).forEach((l,s)=>{n.push(e.jsx("div",{children:e.jsx(z,{wallet:l})},`related_item-${s}`))}),n.length>0?n:r})()})})]})}):e.jsx(e.Fragment,{}))(),e.jsxs(f,{className:"",children:[e.jsx(j,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(p,{children:e.jsx("div",{children:"Record: List"})}),e.jsx(g,{children:"See your latest transaction"})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(v,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{c instanceof AbortController&&c.abort(),u()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})})})]})}),e.jsx(w,{className:" flex flex-col gap-6",children:e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(_){let n=[];for(let r=0;r<A;r++)n.push(e.jsx("div",{children:M},`skeleton-${r}`));return n}else{let n=[],r=e.jsx(y,{});return o.length>0&&o.map((l,s)=>{n.push(e.jsx("div",{children:$(l)},`record_item-${s}`))}),n.length>0?n:r}})()})}),e.jsxs(ee,{className:"flex justify-between items-center",children:[e.jsx(v,{variant:"outline",className:"",disabled:!B,onClick:()=>{L(!1),H(m+N)},children:"Load more"}),(()=>C>0&&E>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",C," of ",E," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})]})})}export{be as default};
