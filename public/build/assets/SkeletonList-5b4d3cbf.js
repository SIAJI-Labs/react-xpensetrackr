import{r as x,j as s,d as w}from"./app-49e19f09.js";import{m as r,a as N,f as v,u as $}from"./index-961138f1.js";/* empty css              */import{D as b,a as y,b as E,c as m}from"./TemplateNoData-b0444318.js";import{u as C,B as h}from"./button-8f2a595a.js";import{B as p}from"./badge-dbdf798f.js";import{S as l}from"./skeleton-3b1a4842.js";function Y({record:e,deleteAction:g=!0,editAction:c=!0}){const S=C();let k=(Math.random()+1).toString(36).substring(7);const[j,u]=x.useState(!1),[d,M]=x.useState(!1),[o,T]=x.useState(void 0),_=()=>{var i,a;const t=[];if(e!=null&&e.type&&t.push(s.jsxs(p,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-flag leading-none text-xs"}),s.jsx("span",{children:$(e==null?void 0:e.type)})]},`record_type-${e==null?void 0:e.uuid}`)),e!=null&&e.from_wallet){let n=[];n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:(i=e==null?void 0:e.from_wallet)==null?void 0:i.name},`from_wallet-${e==null?void 0:e.uuid}`)),e!=null&&e.to_wallet&&(n.push(s.jsx("i",{className:`fa-solid ${(e==null?void 0:e.type)==="expense"?"fa-caret-right":"fa-caret-left"}`},`icon_wallet-${e==null?void 0:e.uuid}`)),n.push(s.jsx("span",{className:" max-w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis",children:(a=e==null?void 0:e.to_wallet)==null?void 0:a.name},`to_wallet-${e==null?void 0:e.uuid}`))),t.push(s.jsxs(p,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-wallet leading-none text-xs"}),s.jsx("span",{className:" flex items-center gap-1",children:n})]},`record_wallet-${e==null?void 0:e.uuid}`))}e!=null&&e.note&&t.push(s.jsxs(p,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-align-left leading-none text-xs"}),s.jsx("span",{children:"Notes"})]},`record_notes-${e==null?void 0:e.uuid}`)),e!=null&&e.record_tags&&e.record_tags.length>0&&t.push(s.jsxs(p,{variant:"secondary",className:" rounded flex flex-row gap-1 items-center",children:[s.jsx("i",{className:"fa-solid fa-hashtag leading-none text-xs"}),s.jsx("span",{children:"Tags"})]},`record_tags-${e==null?void 0:e.uuid}`)),t.length>0&&T(s.jsx(s.Fragment,{children:s.jsx("div",{className:" mt-2 flex flex-row gap-2 flex-wrap",children:t},`record_information-${e==null?void 0:e.uuid}`)}))};return x.useEffect(()=>{S&&_()}),x.useEffect(()=>{},[e]),x.useEffect(()=>{const t=()=>{setTimeout(()=>{u(!1)},100)};return document.addEventListener("dialog.record.shown",t),()=>{document.removeEventListener("dialog.record.shown",t)}}),s.jsx("section",{children:(()=>e!=null&&e.is_hidden?s.jsx(s.Fragment,{children:s.jsxs("div",{className:" flex flex-col gap-4 border rounded p-4 cursor-pointer overflow-hidden","data-toggle":"hidden-record",children:[s.jsxs("div",{className:`${d?"block":"hidden"}`,children:[s.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",onClick:t=>{u(!0)},children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:r("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,N.tz.guess())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:v(((e==null?void 0:e.amount)??0)+((e==null?void 0:e.extra_amount)??0))}),s.jsx("div",{children:s.jsxs(b,{open:j,onOpenChange:u,children:[s.jsx(y,{asChild:!0,children:s.jsx(h,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(E,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[s.jsx(w,{href:route("sys.record.show",e==null?void 0:e.uuid),children:s.jsx(m,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("record-dialogSection")&&c?s.jsx(m,{className:" cursor-pointer",onClick:i=>{let a=i.target;if(a){let n=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const f=()=>{n&&(a.innerHTML=n),document.removeEventListener("dialog.record.shown",f)};document.addEventListener("dialog.record.shown",f)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")&&g?s.jsx(m,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.delete-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]}),(()=>o||s.jsx(s.Fragment,{}))()]}),s.jsxs("div",{className:" relative flex flex-row justify-center",children:[s.jsx("div",{className:" absolute left-0 top-1/2 border-b border-dashed border-spacing-10 w-full"}),s.jsx("div",{className:" absolute -left-4 -top-4 h-[calc(100%+2rem)] w-1/4 bg-gradient-to-r from-white via-white to-transparent"}),s.jsx("div",{className:" absolute -right-4 -top-4 h-[calc(100%+2rem)] w-1/4 bg-gradient-to-l from-white via-white to-transparent"}),s.jsx(h,{variant:"outline",className:" w-fit z-10 h-8 py-0 z-[9]",onClick:t=>{M(!d)},children:s.jsxs("span",{className:"",children:["See ",d?"less":"more"]})})]})]})}):s.jsx(s.Fragment,{children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",onClick:t=>{u(!0)},children:[s.jsxs("div",{className:" flex flex-row justify-between flex-wrap-reverse",children:[s.jsx("span",{className:" font-medium w-full md:w-auto",children:r("MMM Do, YYYY / HH:mm",e==null?void 0:e.datetime,N.tz.guess())}),s.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[s.jsx("span",{className:` font-normal ${e?e.type==="expense"?" text-red-500":"text-green-500":""}`,children:v(((e==null?void 0:e.amount)??0)+((e==null?void 0:e.extra_amount)??0))}),s.jsx("div",{children:s.jsxs(b,{open:j,onOpenChange:u,children:[s.jsx(y,{asChild:!0,children:s.jsx(h,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:s.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),s.jsxs(E,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[s.jsx(w,{href:route("sys.record.show",e==null?void 0:e.uuid),children:s.jsx(m,{className:" cursor-pointer",children:s.jsx("span",{className:" text-blue-500",children:"Detail"})})}),(()=>document.getElementById("record-dialogSection")&&c?s.jsx(m,{className:" cursor-pointer",onClick:i=>{let a=i.target;if(a){let n=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const f=()=>{n&&(a.innerHTML=n),document.removeEventListener("dialog.record.shown",f)};document.addEventListener("dialog.record.shown",f)}document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-yellow-500",children:"Edit"})}):s.jsx(s.Fragment,{}))(),(()=>document.getElementById("record-deleteDialogSection")&&g?s.jsx(m,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("record.delete-action",{bubbles:!0,detail:{uuid:e==null?void 0:e.uuid}}))},children:s.jsx("span",{className:" text-red-500",children:"Delete"})}):s.jsx(s.Fragment,{}))()]})]})})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${e?e.type==="expense"?" bg-red-500":"bg-green-500":""} flex items-center justify-center`,children:s.jsx("i",{className:` text-white fa-solid ${e?e.type==="income"?"fa-right-to-bracket rotate-90":"fa-right-from-bracket -rotate-90":""}`})}),s.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[s.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:e!=null&&e.category?e.category.name:"Uncategorized"}),s.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:(e==null?void 0:e.note)??"No description"})]})]}),(()=>o||s.jsx(s.Fragment,{}))()]})}))()},k)}function z(){let e=(Math.random()+1).toString(36).substring(7);return s.jsx("section",{children:s.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[s.jsxs("div",{className:" flex flex-row justify-between",children:[s.jsx(l,{className:"w-[100px] h-[20px] rounded-full"}),s.jsxs("div",{className:" flex flex-row gap-2",children:[s.jsx(l,{className:"w-[75px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[10px] h-[20px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[s.jsx("div",{className:"",children:s.jsx(l,{className:"w-[50px] h-[50px] rounded-full"})}),s.jsxs("div",{className:" flex flex-col gap-2",children:[s.jsx(l,{className:"w-[150px] h-[15px] rounded-full"}),s.jsx(l,{className:"w-[75px] h-[10px] rounded-full"})]})]}),s.jsxs("div",{className:" flex flex-row gap-4",children:[s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"}),s.jsx(l,{className:"w-[50px] h-[20px] rounded-full"})]})]})},e)}export{z as S,Y as T};