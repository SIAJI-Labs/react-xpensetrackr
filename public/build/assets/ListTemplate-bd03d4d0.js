import{r as x,j as s,d as f}from"./app-6ce9e5c3.js";import{a as n,m as h,f as g}from"./Combination-8d8062e6.js";import{D as j,a as w,b as m,c as i}from"./dropdown-menu-197b641a.js";import{B as p}from"./button-a3bee333.js";function E({plannedPayment:e}){let u=(Math.random()+1).toString(36).substring(7);const[a,t]=x.useState(!1);return s.jsx("section",{onClick:o=>{t(!0)},children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:[s.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:n("MMM Do, YYYY",e&&"date_start"in e?e==null?void 0:e.date_start:h())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal whitespace-nowrap ${e&&"type"in e?(e==null?void 0:e.type)==="expense"?" text-red-500":e.type==="income"?"text-green-500":" dark:text-white":""}`,children:g(e&&"amount"in e?e==null?void 0:e.amount:0)}),s.jsx("div",{children:s.jsxs(j,{open:a,onOpenChange:t,children:[s.jsx(w,{asChild:!0,children:s.jsx(p,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(m,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>e&&"uuid"in e?s.jsx(s.Fragment,{children:s.jsx(f,{href:route("sys.planned-payment.show",{uuid:e.uuid}),children:s.jsx(i,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("plannedPaymentDialog-section")?s.jsx(i,{className:" cursor-pointer",onClick:d=>{let r=d.target;if(r){let c=r.innerHTML;r.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const l=()=>{c&&(r.innerHTML=c),document.removeEventListener("dialog.planned-payment.shown",l)};document.addEventListener("dialog.planned-payment.shown",l)}document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0,detail:{uuid:e&&"uuid"in e?e==null?void 0:e.uuid:null}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("plannedPaymentDeleteDialog-section")?s.jsx(i,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:e&&"uuid"in e?e==null?void 0:e.uuid:null,action:"delete"}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${e&&"type"in e?e.type==="income"?" bg-green-500":e.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:s.jsx("i",{className:` text-white fa-solid ${e&&"type"in e?e.type==="income"?"fa-right-to-bracket rotate-90":e.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),s.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[s.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>e&&"category_id"in e&&e.category?s.jsx(s.Fragment,{children:`${e.category.parent?`${e.category.parent.name} - `:""}${e.category.name}`}):s.jsx(s.Fragment,{children:"Uncategorized"}))()}),s.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:e&&"name"in e?e.name:"Planned Name"})]})]})]})},u)}export{E as L};