import{r as p,j as e,d as x}from"./app-0e733e7a.js";import{f}from"./function-1359a238.js";import{D as h,a as g,b as j,c as i}from"./TemplateNoData-1e074380.js";import{B as b}from"./button-0f3494cc.js";function T({wallet:n,deleteAction:d=!0,editAction:c=!0}){let u=(Math.random()+1).toString(36).substring(7);const[l,r]=p.useState(!1);return e.jsx("section",{onClick:s=>{r(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:n&&"name"in n?`${n.parent?`${n.parent.name} - `:""}${n==null?void 0:n.name}`:"-"}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:" font-normal whitespace-nowrap ",children:f(n&&"balance"in n?n.balance:0)}),e.jsx("div",{children:e.jsxs(h,{open:l,onOpenChange:r,children:[e.jsx(g,{asChild:!0,children:e.jsx(b,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(j,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>n&&"uuid"in n?e.jsx(e.Fragment,{children:e.jsx(x,{href:route("sys.wallet.show",{uuid:n.uuid}),children:e.jsx(i,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("wallet-dialogSection")&&c?e.jsx(i,{className:" cursor-pointer",onClick:m=>{let t=m.target;if(t){let a=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{a&&(t.innerHTML=a),document.removeEventListener("dialog.wallet.shown",o)};document.addEventListener("dialog.wallet.shown",o)}document.dispatchEvent(new CustomEvent("wallet.edit-action",{bubbles:!0,detail:{uuid:n&&"uuid"in n?n==null?void 0:n.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>{let s=document.getElementById("wallet-deleteDialogSection");return d&&s?e.jsx(i,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.delete-action",{bubbles:!0,detail:{uuid:n&&"uuid"in n?n==null?void 0:n.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})]})]}),(()=>n&&"parent"in n&&n.parent&&n.parent.deleted_at!==null?e.jsx("span",{className:" text-sm italic text-red-500",children:"*Something need your attention"}):e.jsx(e.Fragment,{}))()]})},u)}export{T};
