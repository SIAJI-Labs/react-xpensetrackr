import{r as o,j as e,d as z,e as N,a as q,y as G}from"./app-a527d074.js";import{B as u,u as J}from"./button-ae8c2129.js";import{m as x,a as c,f as p,u as v,b as K}from"./function-c3ea43bf.js";import{D,a as M,b as F,c as b,T as Q}from"./TemplateNoData-aedb4fde.js";import{B as T}from"./badge-823fc9ab.js";import{S as V}from"./SkeletonList-d0209ae1.js";import{T as W}from"./TemplateBackButton-b220c021.js";import{S as X,a as Z}from"./SystemLayout-72edf210.js";import{C as S,b as P,c as ee,e as se,a as $,d as re}from"./card-cdda5f07.js";/* empty css            */import"./skeleton-b2e348e4.js";import"./ApplicationLogo-8139e2c5.js";import"./textarea-2a8e7701.js";import"./ApplicationLogoMask-6edcddd9.js";import"./input-2571e4ed.js";function te({plannedPayment:r}){let s=(Math.random()+1).toString(36).substring(7);const[g,h]=o.useState(!1);return e.jsx(e.Fragment,{children:(()=>{var m,f;return r.status==="approve"?e.jsx("section",{onClick:w=>{h(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",r&&"period"in r?c(r==null?void 0:r.period):c())}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:` font-normal whitespace-nowrap ${r&&"type"in r.record?(r==null?void 0:r.record.type)==="expense"?" text-red-500":"text-green-500":""}`,children:p(r&&"amount"in r.record&&"extra_amount"in r.record?((m=r==null?void 0:r.record)==null?void 0:m.amount)+((f=r==null?void 0:r.record)==null?void 0:f.extra_amount):0)}),e.jsx("div",{children:e.jsxs(D,{open:g,onOpenChange:h,children:[e.jsx(M,{asChild:!0,children:e.jsx(u,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(F,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:(()=>r&&"uuid"in r.record?e.jsx(e.Fragment,{children:e.jsx(z,{href:route("sys.record.show",{uuid:r.record.uuid}),children:e.jsx(b,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))()})]})})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${r&&"type"in r.record?r.record.type==="income"?" bg-green-500":r.record.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${r&&"type"in r.record?r.record.type==="income"?"fa-right-to-bracket rotate-90":r.record.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>r&&"category_id"in r.record&&r.record.category?e.jsx(e.Fragment,{children:`${r.record.category.parent?`${r.record.category.parent.name} - `:""}${r.record.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:r&&"note"in r.record?r.record.note:"No description"})]})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",x("MMM Do, YYYY / HH:mm",r&&"created_at"in r?c(r==null?void 0:r.created_at):c())]})})]})},s):e.jsx(e.Fragment,{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",r&&"period"in r?c(r==null?void 0:r.period):c())}),e.jsx(T,{variant:"destructive",children:"Skipped"})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",x("MMM Do, YYYY / HH:mm",r&&"created_at"in r?c(r==null?void 0:r.created_at):c())]})})]})},s)})})()})}function Ne({auth:r,data:s}){const g=J(),[h,m]=o.useState(!1);o.useEffect(()=>{const t=l=>{var i,n;(i=l.detail)!=null&&i.action&&((n=l.detail)==null?void 0:n.action)==="delete"?location.href=route("sys.planned-payment.index"):(G.reload(),E())};return document.addEventListener("dialog.record.hidden",t),document.addEventListener("dialog.planned-payment.hidden",t),document.addEventListener("planned-payment.deleted-action",t),()=>{document.removeEventListener("dialog.record.hidden",t),document.removeEventListener("dialog.planned-payment.hidden",t),document.removeEventListener("planned-payment.deleted-action",t)}}),o.useEffect(()=>{E()},[]);const[f,w]=o.useState(null),[Y,_]=o.useState(!0),[d,L]=o.useState();let k=5;const[C,I]=o.useState(k),[H,y]=o.useState(!1),E=async()=>{_(!0),f instanceof AbortController&&f.abort();const t=new AbortController;w(t);const l=[],i={limit:C};for(const n in i)l.push(encodeURIComponent(n)+"="+encodeURIComponent(i[n]));try{let a=(await N.get(`${route("api.planned-payment.v1.show",s.uuid)}?${l.join("&")}`,{cancelToken:new N.CancelToken(function(U){t.abort=U})})).data,j=a.result.record.data;L(j),y(a.result.has_more),_(!1),w(null)}catch(n){N.isCancel(n)?console.log("Request was canceled",n):console.error("Error:",n)}},[O,B]=o.useState(5);let R=()=>e.jsx(V,{}),A=t=>e.jsx(te,{plannedPayment:t});return o.useEffect(()=>{!g&&d&&B(d.length>0?d.length:5)},[d]),e.jsx(e.Fragment,{children:e.jsxs(X,{user:r.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Detail: ",`${s==null?void 0:s.name}`]}),children:[e.jsx(q,{title:`Planned Detail: ${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(W,{className:"px-0"})}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(S,{className:" w-full",children:[e.jsx(P,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start cursor-pointer",onClick:()=>{m(!0)},children:[e.jsxs("div",{children:[e.jsx(ee,{children:e.jsx("div",{children:"Planned Payment: Detail"})}),e.jsx(se,{children:"See your detailed Planned Payment"})]}),e.jsx("div",{children:e.jsxs(D,{open:h,onOpenChange:m,children:[e.jsx(M,{asChild:!0,children:e.jsx(u,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(F,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>document.getElementById("plannedPayment-dialogSection")?e.jsx(b,{className:" cursor-pointer",onClick:l=>{let i=l.target;if(i){let n=i.innerHTML;i.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const a=()=>{n&&(i.innerHTML=n),document.removeEventListener("dialog.planned-payment.shown",a)};document.addEventListener("dialog.planned-payment.shown",a)}document.dispatchEvent(new CustomEvent("planned-payment.edit-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("plannedPayment-deleteDialogSection")?e.jsx(b,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsxs($,{className:" flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx("span",{className:" font-medium text-xl",children:s.name})}),(()=>s&&"deleted_at"in s&&s.deleted_at?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed border-red-500",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Archive"})]}),e.jsx("span",{className:" block mt-2",children:(()=>e.jsx(e.Fragment,{children:e.jsxs("span",{children:["This data is archived at ",e.jsx("u",{children:x("MMM Do, YYYY / HH:mm",s.deleted_at,c.tz.guess())})]})}))()})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:" flex gap-4",children:[e.jsx("div",{className:" w-1/3",children:e.jsxs("div",{className:` border ${s.to_wallet?"":s.type==="income"?" border-green-500":"  border-red-500"} rounded-md h-full flex flex-col gap-2 justify-center items-center`,children:[e.jsx("div",{className:"",children:(()=>s.to_wallet?e.jsx("i",{className:" text-2xl fa-solid fa-arrow-right-arrow-left rotate-90"}):e.jsx("i",{className:`text-2xl fa-solid ${s.type==="income"?" text-green-500 fa-right-to-bracket rotate-90":" text-red-500 fa-right-from-bracket -rotate-90"}`}))()}),e.jsxs("div",{className:" flex flex-col justify-center",children:[e.jsx("span",{className:"font-normal text-center",children:s.to_wallet?"Transfer":v(s.type)}),(()=>s.to_wallet?e.jsxs("span",{className:" text-xs text-center",children:["(",v(s.type),")"]}):e.jsx(e.Fragment,{}))()]})]})}),e.jsxs("div",{className:" w-2/3",children:[e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"Category"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.category?`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`:"Uncategorized"})]}),e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"From"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.from_wallet?`${s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${s.from_wallet.name}`:"-"})]}),(()=>s.to_wallet?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"To"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.to_wallet?`${s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${s.to_wallet.name}`:"-"})]})}):e.jsx(e.Fragment,{}))()]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.note??"No description provided"})]}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:p(s.amount??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>s.extra_type==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",s.extra_percentage??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:p(s.extra_amount)})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:p(s.amount+s.extra_amount)})]})]})]})]}),e.jsxs(S,{className:" w-full",children:[e.jsxs($,{className:" flex flex-col gap-6 pt-6",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{className:" font-normal",children:"Occurence"}),e.jsx(T,{variant:s.repeat_type==="recurring"?"default":"secondary",className:" text-center flex justify-center",children:v(s.repeat_type)})]}),(()=>s.repeat_type==="recurring"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-1 text-right",children:[e.jsx("span",{className:" font-normal",children:"Every"}),e.jsxs("span",{className:"",children:[s.repeat_frequency," ",K(s.repeat_period)]})]})}):e.jsx(e.Fragment,{}))()]}),e.jsx(Z,{}),(()=>{if(Y){let t=[];for(let l=0;l<O;l++)t.push(e.jsx("div",{children:R()},`skeleton-${l}`));return t}else{let t=[],l=e.jsx(Q,{});return s&&"deleted_at"in s&&!s.deleted_at&&t.push(e.jsx("div",{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",s&&"date_start"in s?c(s==null?void 0:s.date_start):c())}),e.jsx("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:e.jsx("span",{className:` font-normal whitespace-nowrap ${s&&"type"in s?(s==null?void 0:s.type)==="expense"?" text-red-500":s.type==="income"?"text-green-500":" dark:text-white":""}`,children:p(s&&"amount"in s&&"extra_amount"in s?(s==null?void 0:s.amount)+(s==null?void 0:s.extra_amount):0)})})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${s&&"type"in s?s.type==="income"?" bg-green-500":s.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${s&&"type"in s?s.type==="income"?"fa-right-to-bracket rotate-90":s.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>s&&"category_id"in s&&s.category?e.jsx(e.Fragment,{children:`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:s&&"name"in s?s.name:"Planned Name"})]})]}),e.jsxs("div",{className:" mt-4 flex flex-row gap-4",children:[(()=>document.getElementById("plannedPayment-deleteDialogSection")?e.jsx(u,{className:"w-full",variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("planned-payment.delete-action",{bubbles:!0,detail:{uuid:s==null?void 0:s.uuid,action:"skip"}}))},children:e.jsx("span",{className:" text-red-500",children:"Skip"})}):e.jsx(e.Fragment,{}))(),e.jsx(u,{className:"w-full",onClick:i=>{let n=i.target;if(n){let a=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const j=()=>{a&&(n.innerHTML=a),document.removeEventListener("dialog.record.shown",j)};document.addEventListener("dialog.record.shown",j)}document.dispatchEvent(new CustomEvent("record-dialog.planned-payment.confirmation",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s.uuid:null}}))},children:"Confirm"})]})]})})},"planned_prompt-0")),d&&d.length>0&&d.map((i,n)=>{t.push(e.jsx("div",{children:A(i)},`planned_item-${n}`))}),t.length>0?t:l}})()]}),e.jsx(re,{children:e.jsx("div",{children:e.jsx(u,{variant:"outline",className:"dark:border-white",disabled:!H,onClick:()=>{y(!1),I(C+k)},children:"Load more"})})})]})]})]})})}export{Ne as default};
