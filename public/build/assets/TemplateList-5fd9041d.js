import{r as p,j as e,d as x}from"./app-793cf9d5.js";import{f}from"./function-8829c559.js";import{D as g,a as h,b as j,c as a}from"./TemplateNoData-d753be41.js";import{B as b}from"./button-4380bba0.js";function D({wallet:n,deleteAction:u=!0,editAction:d=!0}){let l=(Math.random()+1).toString(36).substring(7);const[m,c]=p.useState(!1);return e.jsx("section",{onClick:r=>{c(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:n&&"name"in n?`${n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`:"-"}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:f(n&&"balance"in n?n.balance:0)}),e.jsx("div",{children:e.jsxs(g,{open:m,onOpenChange:c,children:[e.jsx(h,{asChild:!0,children:e.jsx(b,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(j,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>n&&"uuid"in n?e.jsx(e.Fragment,{children:e.jsx(x,{href:route("sys.wallet.show",{uuid:n.uuid}),children:e.jsx(a,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("wallet-dialogSection")&&d?e.jsx(a,{className:" cursor-pointer",onClick:o=>{let t=o.target;if(t){let i=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const s=()=>{i&&(t.innerHTML=i),document.removeEventListener("dialog.wallet.shown",s)};document.addEventListener("dialog.wallet.shown",s)}document.dispatchEvent(new CustomEvent("wallet.edit-action",{bubbles:!0,detail:{uuid:n&&"uuid"in n?n==null?void 0:n.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("walletBalanceAdjustment-dialogSection")&&d?e.jsx(a,{className:" cursor-pointer",onClick:o=>{let t=o.target;if(t){let i=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const s=()=>{i&&(t.innerHTML=i),document.removeEventListener("dialog.wallet.balance-adjustment.shown",s)};document.addEventListener("dialog.wallet.balance-adjustment.shown",s)}document.dispatchEvent(new CustomEvent("wallet.balance-adjustment.edit-action",{bubbles:!0,detail:{uuid:n&&"uuid"in n?n==null?void 0:n.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Balance Adjustment"})}):e.jsx(e.Fragment,{}))(),(()=>{let r=document.getElementById("wallet-deleteDialogSection");return u&&r?e.jsx(a,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.delete-action",{bubbles:!0,detail:{uuid:n&&"uuid"in n?n==null?void 0:n.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})]})]}),(()=>n&&"parent"in n&&n.parent&&n.parent.deleted_at!==null?e.jsx("span",{className:" text-sm italic text-red-500",children:"*Something need your attention"}):e.jsx(e.Fragment,{}))()]})},l)}export{D as T};