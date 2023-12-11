import{r as j,j as s,d as w}from"./app-7bc3d3ae.js";import{m as c,a as N,f as v,u as k}from"./function-47ffd2cb.js";import"./siaji-fb50d6ec.js";import{D as r,a as b,b as y,c as x}from"./TemplateNoData-4671ee51.js";import{B as d}from"./button-fcc7bb2d.js";import{B as f}from"./badge-d8fbce6b.js";import{S as l}from"./skeleton-0f31f44c.js";function H({record:e,deleteAction:h=!0,editAction:o=!0}){let S=(Math.random()+1).toString(36).substring(7);const[g,u]=j.useState(!1),[p,E]=j.useState(!1);return s.jsx("section",{children:(()=>e!=null&&e.is_hidden?s.jsx(s.Fragment,{children:s.jsxs("div",{className:" flex flex-col gap-4 border rounded p-4 cursor-pointer","data-toggle":"hidden-record",children:[s.jsx("div",{className:`${p?"block":"hidden"}`,children:s.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",onClick:a=>{u(!0)},children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:c("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,N.tz.guess())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:v(((e==null?void 0:e.amount)??0)+((e==null?void 0:e.extra_amount)??0))}),s.jsx("div",{children:s.jsxs(r,{open:g,onOpenChange:u,children:[s.jsx(b,{asChild:!0,children:s.jsx(d,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(y,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[s.jsx(w,{href:route("sys.record.show",e==null?void 0:e.uuid),children:s.jsx(x,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("record-dialogSection")&&o?s.jsx(x,{className:" cursor-pointer",onClick:i=>{let t=i.target;if(t){let n=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const m=()=>{n&&(t.innerHTML=n),document.removeEventListener("dialog.record.shown",m)};document.addEventListener("dialog.record.shown",m)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")&&h?s.jsx(x,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.delete-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]})}),s.jsxs("div",{className:" relative flex flex-row justify-center",children:[s.jsx("div",{className:" absolute left-0 top-1/2 border-b border-dashed border-spacing-10 w-full"}),s.jsx(d,{variant:"outline",className:" w-fit z-10 h-8 py-0",onClick:a=>{E(!p)},children:s.jsxs("span",{className:"",children:["See ",p?"less":"more"]})})]})]})}):s.jsx(s.Fragment,{children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",onClick:a=>{u(!0)},children:[s.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:c("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,N.tz.guess())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:v(((e==null?void 0:e.amount)??0)+((e==null?void 0:e.extra_amount)??0))}),s.jsx("div",{children:s.jsxs(r,{open:g,onOpenChange:u,children:[s.jsx(b,{asChild:!0,children:s.jsx(d,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(y,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[s.jsx(w,{href:route("sys.record.show",e==null?void 0:e.uuid),children:s.jsx(x,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("record-dialogSection")&&o?s.jsx(x,{className:" cursor-pointer",onClick:i=>{let t=i.target;if(t){let n=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const m=()=>{n&&(t.innerHTML=n),document.removeEventListener("dialog.record.shown",m)};document.addEventListener("dialog.record.shown",m)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")&&h?s.jsx(x,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.delete-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${e?e.type==="expense"?" bg-red-500":"bg-green-500":""} flex items-center justify-center`,children:s.jsx("i",{className:` text-white fa-solid ${e?e.type==="income"?"fa-right-to-bracket rotate-90":"fa-right-from-bracket -rotate-90":""}`})}),s.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[s.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:e!=null&&e.category?e.category.name:"Uncategorized"}),s.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:(e==null?void 0:e.note)??"No description"})]})]}),(()=>{var i,t;const a=[];if(e!=null&&e.type&&a.push(s.jsxs(f,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-flag leading-none text-xs"}),s.jsx("span",{children:k(e==null?void 0:e.type)})]},`record_type-${e==null?void 0:e.uuid}`)),e!=null&&e.from_wallet){let n=[];n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:(i=e==null?void 0:e.from_wallet)==null?void 0:i.name},`from_wallet-${e==null?void 0:e.uuid}`)),e!=null&&e.to_wallet&&(n.push(s.jsx("i",{className:`fa-solid ${(e==null?void 0:e.type)==="expense"?"fa-caret-right":"fa-caret-left"}`},`icon_wallet-${e==null?void 0:e.uuid}`)),n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:(t=e==null?void 0:e.to_wallet)==null?void 0:t.name},`to_wallet-${e==null?void 0:e.uuid}`))),a.push(s.jsxs(f,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-wallet leading-none text-xs"}),s.jsx("span",{className:" flex items-center gap-1",children:n})]},`record_wallet-${e==null?void 0:e.uuid}`))}if(e!=null&&e.note&&a.push(s.jsxs(f,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-align-left leading-none text-xs"}),s.jsx("span",{children:"Notes"})]},`record_notes-${e==null?void 0:e.uuid}`)),e!=null&&e.record_tags&&e.record_tags.length>0&&a.push(s.jsxs(f,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-hashtag leading-none text-xs"}),s.jsx("span",{children:"Tags"})]},`record_tags-${e==null?void 0:e.uuid}`)),a.length>0)return s.jsx(s.Fragment,{children:s.jsx("div",{className:" mt-2 flex flex-row gap-2 flex-wrap",children:a},`record_information-${e==null?void 0:e.uuid}`)})})()]})}))()},S)}function O(){let e=(Math.random()+1).toString(36).substring(7);return s.jsx("section",{children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[s.jsxs("div",{className:" flex flex-row justify-between",children:[s.jsx(l,{className:"w-[100px] h-[20px] rounded-full"}),s.jsxs("div",{className:" flex flex-row gap-2",children:[s.jsx(l,{className:"w-[75px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[10px] h-[20px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:"",children:s.jsx(l,{className:"w-[50px] h-[50px] rounded-full"})}),s.jsxs("div",{className:" flex flex-col gap-2",children:[s.jsx(l,{className:"w-[150px] h-[15px] rounded-full"}),s.jsx(l,{className:"w-[75px] h-[10px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4",children:[s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"})]})]})},e)}export{O as S,H as T};
