import{r as o,j as e,d as F,e as b,a as G,y as _}from"./app-3c6f5806.js";import{B as u,u as J}from"./button-620a8a90.js";import{m,a as c,f as p,u as k,b as K}from"./check-bb2c4d62.js";import{D as T,a as Y,b as L,c as g,T as Q}from"./TemplateNoData-3c5d76cc.js";import{B as y}from"./badge-0c2a7b35.js";import{S as V}from"./SkeletonList-6909aa5f.js";import{T as W}from"./TemplateBackButton-394ff84e.js";import{S as X}from"./SystemLayout-9451cc14.js";import{C as D,b as Z,c as P,d as ee,a as M,e as se}from"./card-13c517d6.js";import{S as re}from"./separator-e275e6f9.js";/* empty css            */import"./index-19be1af9.js";/* empty css              */import"./skeleton-94eace69.js";import"./ApplicationLogo-5dc75d28.js";import"./scroll-area-2e1ec903.js";import"./theme-toggle-ae599113.js";import"./input-7b48b385.js";import"./ApplicationLogoMask-fc01e341.js";function te({plannedPayment:r}){let s=(Math.random()+1).toString(36).substring(7);const[w,h]=o.useState(!1);return e.jsx(e.Fragment,{children:(()=>{var x,f;return r.status==="approve"?e.jsx("section",{onClick:N=>{h(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border border-green-500 rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:m("MMM Do, YYYY",r&&"period"in r?c(r==null?void 0:r.period):c())}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:` font-normal whitespace-nowrap ${r&&"type"in r.record?(r==null?void 0:r.record.type)==="expense"?" text-red-500":"text-green-500":""}`,children:p(r&&"amount"in r.record&&"extra_amount"in r.record?((x=r==null?void 0:r.record)==null?void 0:x.amount)+((f=r==null?void 0:r.record)==null?void 0:f.extra_amount):0)}),e.jsx("div",{children:e.jsxs(T,{open:w,onOpenChange:h,children:[e.jsx(Y,{asChild:!0,children:e.jsx(u,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(L,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:(()=>r&&"uuid"in r.record?e.jsx(e.Fragment,{children:e.jsx(F,{href:route("sys.record.show",{uuid:r.record.uuid}),children:e.jsx(g,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))()})]})})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${r&&"type"in r.record?r.record.type==="income"?" bg-green-500":r.record.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${r&&"type"in r.record?r.record.type==="income"?"fa-right-to-bracket rotate-90":r.record.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>r&&"category_id"in r.record&&r.record.category?e.jsx(e.Fragment,{children:`${r.record.category.parent?`${r.record.category.parent.name} - `:""}${r.record.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:r&&"note"in r.record?r.record.note:"No description"})]})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",m("MMM Do, YYYY / HH:mm",r&&"created_at"in r?c(r==null?void 0:r.created_at):c())]})})]})},s):e.jsx(e.Fragment,{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:m("MMM Do, YYYY",r&&"period"in r?c(r==null?void 0:r.period):c())}),e.jsx(y,{variant:"destructive",children:"Skipped"})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",m("MMM Do, YYYY / HH:mm",r&&"created_at"in r?c(r==null?void 0:r.created_at):c())]})})]})},s)})})()})}function ke({auth:r,data:s}){const w=J(),[h,x]=o.useState(!1);o.useEffect(()=>{const t=i=>{var l,n;(l=i.detail)!=null&&l.action&&((n=i.detail)==null?void 0:n.action)==="delete"?_.visit(route("sys.planned-payment.index")):(_.reload({only:["data"]}),v())};return document.addEventListener("dialog.record.hidden",t),document.addEventListener("dialog.planned-payment.hidden",t),document.addEventListener("planned-payment.deleted-action",t),()=>{document.removeEventListener("dialog.record.hidden",t),document.removeEventListener("dialog.planned-payment.hidden",t),document.removeEventListener("planned-payment.deleted-action",t)}}),o.useEffect(()=>{v()},[]);const[f,N]=o.useState(null),[I,C]=o.useState(!0),[d,H]=o.useState();let E=5;const[S,O]=o.useState(E),[R,$]=o.useState(!1),v=async()=>{C(!0),f instanceof AbortController&&f.abort();const t=new AbortController;N(t);const i=[],l={limit:S};for(const n in l)i.push(encodeURIComponent(n)+"="+encodeURIComponent(l[n]));try{let a=(await b.get(`${route("api.planned-payment.v1.show",s.uuid)}?${i.join("&")}`,{cancelToken:new b.CancelToken(function(q){t.abort=q})})).data,j=a.result.record.data;H(j),$(a.result.has_more),C(!1),N(null)}catch(n){b.isCancel(n)?console.log("Request was canceled",n):console.error("Error:",n)}},[B,A]=o.useState(5);let U=()=>e.jsx(V,{}),z=t=>e.jsx(te,{plannedPayment:t});return o.useEffect(()=>{!w&&d&&A(d.length>0?d.length:5)},[d]),e.jsx(e.Fragment,{children:e.jsxs(X,{user:r.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Detail: ",`${s==null?void 0:s.name}`]}),children:[e.jsx(G,{title:`Planned Detail: ${s==null?void 0:s.name}`}),e.jsx(W,{className:"px-0"}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(D,{className:" w-full",children:[e.jsx(Z,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start cursor-pointer",onClick:()=>{x(!0)},children:[e.jsxs("div",{children:[e.jsx(P,{children:e.jsx("div",{children:"Planned Payment: Detail"})}),e.jsx(ee,{children:"See your detailed Planned Payment"})]}),e.jsx("div",{children:e.jsxs(T,{open:h,onOpenChange:x,children:[e.jsx(Y,{asChild:!0,children:e.jsx(u,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(L,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(g,{className:" cursor-pointer",onClick:()=>{_.reload({only:["data"]}),v(),setTimeout(()=>{x(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("plannedPayment-dialogSection")?e.jsx(g,{className:" cursor-pointer",onClick:i=>{let l=i.target;if(l){let n=l.innerHTML;l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const a=()=>{n&&(l.innerHTML=n),document.removeEventListener("dialog.planned-payment.shown",a)};document.addEventListener("dialog.planned-payment.shown",a)}document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("plannedPayment-deleteDialogSection")?e.jsx(g,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsxs(M,{className:" flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx("span",{className:" font-medium text-xl",children:s.name})}),(()=>s&&"deleted_at"in s&&s.deleted_at?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed border-red-500",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Archive"})]}),e.jsx("span",{className:" block mt-2",children:(()=>e.jsx(e.Fragment,{children:e.jsxs("span",{children:["This data is archived at ",e.jsx("u",{children:m("MMM Do, YYYY / HH:mm",s.deleted_at,c.tz.guess())})]})}))()})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:" flex gap-4",children:[e.jsx("div",{className:" w-1/3",children:e.jsxs("div",{className:` border ${s.to_wallet?"":s.type==="income"?" border-green-500":"  border-red-500"} rounded-md h-full flex flex-col gap-2 justify-center items-center`,children:[e.jsx("div",{className:"",children:(()=>s.to_wallet?e.jsx("i",{className:" text-2xl fa-solid fa-arrow-right-arrow-left rotate-90"}):e.jsx("i",{className:`text-2xl fa-solid ${s.type==="income"?" text-green-500 fa-right-to-bracket rotate-90":" text-red-500 fa-right-from-bracket -rotate-90"}`}))()}),e.jsxs("div",{className:" flex flex-col justify-center",children:[e.jsx("span",{className:"font-normal text-center",children:s.to_wallet?"Transfer":k(s.type)}),(()=>s.to_wallet?e.jsxs("span",{className:" text-xs text-center",children:["(",k(s.type),")"]}):e.jsx(e.Fragment,{}))()]})]})}),e.jsxs("div",{className:" w-2/3",children:[e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"Category"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.category?`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`:"Uncategorized"})]}),e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"From"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.from_wallet?`${s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${s.from_wallet.name}`:"-"})]}),(()=>s.to_wallet?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"To"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.to_wallet?`${s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${s.to_wallet.name}`:"-"})]})}):e.jsx(e.Fragment,{}))()]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.note??"No description provided"})]}),e.jsxs("div",{className:" flex flex-col",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:p(s.amount??0)})]}),e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsxs("span",{className:" flex flex-row gap-1 items-center",children:[e.jsx("span",{children:"Extra"}),(()=>s.extra_type==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",s.extra_percentage??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:p(s.extra_amount)})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:p(s.amount+s.extra_amount)})]})]}),(()=>{if(s.planned_payment_tags&&s.planned_payment_tags.length>0){let t=[];return s.planned_payment_tags.forEach((i,l)=>{t.push(e.jsx(F,{href:route("sys.tags.show",i.uuid),children:e.jsx(y,{children:i.name})},`tags_${i.uuid}`))}),e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs("span",{className:" flex flex-row gap-1 items-center text-sm",children:[e.jsx("i",{className:" fa-solid fa-hashtag"}),e.jsx("span",{children:"Tags:"})]}),t]})}return e.jsx(e.Fragment,{})})()]})]}),e.jsxs(D,{className:" w-full",children:[e.jsxs(M,{className:" flex flex-col gap-6 pt-6",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{className:" font-normal",children:"Occurence"}),e.jsx(y,{variant:s.repeat_type==="recurring"?"default":"secondary",className:" text-center flex justify-center",children:k(s.repeat_type)})]}),(()=>s.repeat_type==="recurring"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-1 text-right",children:[e.jsx("span",{className:" font-normal",children:"Every"}),e.jsxs("span",{className:"",children:[s.repeat_frequency," ",K(s.repeat_period)]})]})}):e.jsx(e.Fragment,{}))()]}),e.jsx(re,{}),(()=>{if(I){let t=[];for(let i=0;i<B;i++)t.push(e.jsx("div",{children:U()},`skeleton-${i}`));return t}else{let t=[],i=e.jsx(Q,{});return s&&"deleted_at"in s&&!s.deleted_at&&t.push(e.jsx("div",{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:m("MMM Do, YYYY",s&&"date_start"in s?c(s==null?void 0:s.date_start):c())}),e.jsx("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:e.jsx("span",{className:` font-normal whitespace-nowrap ${s&&"type"in s?(s==null?void 0:s.type)==="expense"?" text-red-500":s.type==="income"?"text-green-500":" dark:text-white":""}`,children:p(s&&"amount"in s&&"extra_amount"in s?(s==null?void 0:s.amount)+(s==null?void 0:s.extra_amount):0)})})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${s&&"type"in s?s.type==="income"?" bg-green-500":s.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${s&&"type"in s?s.type==="income"?"fa-right-to-bracket rotate-90":s.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>s&&"category_id"in s&&s.category?e.jsx(e.Fragment,{children:`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:s&&"name"in s?s.name:"Planned Name"})]})]}),e.jsxs("div",{className:" mt-4 flex flex-row gap-4",children:[(()=>document.getElementById("plannedPayment-deleteDialogSection")?e.jsx(u,{className:"w-full",variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid,action:"skip"}}))},children:e.jsx("span",{className:" text-red-500",children:"Skip"})}):e.jsx(e.Fragment,{}))(),e.jsx(u,{className:"w-full",onClick:l=>{let n=l.target;if(n){let a=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const j=()=>{a&&(n.innerHTML=a),document.removeEventListener("dialog.record.shown",j)};document.addEventListener("dialog.record.shown",j)}document.dispatchEvent(new CustomEvent("record-dialog.planned-payment.confirmation",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s.uuid:null}}))},children:"Confirm"})]})]})})},"planned_prompt-0")),d&&d.length>0&&d.map((l,n)=>{t.push(e.jsx("div",{children:z(l)},`planned_item-${n}`))}),t.length>0?t:i}})()]}),e.jsx(se,{children:e.jsx("div",{children:e.jsx(u,{variant:"outline",className:"dark:border-white",disabled:!R,onClick:()=>{$(!1),O(S+E)},children:"Load more"})})})]})]})]})})}export{ke as default};
