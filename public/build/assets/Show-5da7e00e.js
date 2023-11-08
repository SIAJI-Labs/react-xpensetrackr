import{r as l,j as e,d as H,e as g,a as U}from"./app-661effb3.js";import{B as q}from"./BackButtonTemplate-8f348ce2.js";import{N as z}from"./skeleton-ba17427d.js";import{a as x,m as i,f as d,u as p}from"./Combination-e6a29ca1.js";import{D as S,a as Y,b as G,c as J}from"./dropdown-menu-4b20f48f.js";import{B as m,u as K}from"./button-bf5fa3fb.js";import{B as F}from"./badge-e756c0fb.js";import{S as Q,L as V}from"./separator-d9176cd2.js";import{C,b as W,c as X,d as Z,a as $,e as P}from"./card-4894c07f.js";import{S as ee}from"./SystemLayout-e3467c88.js";import"./ApplicationLogo-a69b41a9.js";import"./ApplicationLogoMask-c8e5364d.js";import"./textarea-0a1d2eca.js";import"./input-84b77e4e.js";function se({plannedPayment:r}){let s=(Math.random()+1).toString(36).substring(7);const[u,f]=l.useState(!1);return e.jsx(e.Fragment,{children:(()=>{var a;return r.status==="approve"?e.jsx("section",{onClick:j=>{f(!0)},children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",r&&"period"in r?i(r==null?void 0:r.period):i())}),e.jsxs("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:[e.jsx("span",{className:` font-normal whitespace-nowrap ${r&&"type"in r.record?(r==null?void 0:r.record.type)==="expense"?" text-red-500":"text-green-500":""}`,children:d(r&&"amount"in r.record?(a=r==null?void 0:r.record)==null?void 0:a.amount:0)}),e.jsx("div",{children:e.jsxs(S,{open:u,onOpenChange:f,children:[e.jsx(Y,{asChild:!0,children:e.jsx(m,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsx(G,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:(()=>r&&"uuid"in r.record?e.jsx(e.Fragment,{children:e.jsx(H,{href:route("sys.planned-payment.show",{uuid:r.record.uuid}),children:e.jsx(J,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))()})]})})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${r&&"type"in r.record?r.record.type==="income"?" bg-green-500":r.record.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${r&&"type"in r.record?r.record.type==="income"?"fa-right-to-bracket rotate-90":r.record.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>r&&"category_id"in r.record&&r.record.category?e.jsx(e.Fragment,{children:`${r.record.category.parent?`${r.record.category.parent.name} - `:""}${r.record.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:r&&"note"in r.record?r.record.note:"No description"})]})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",x("MMM Do, YYYY / HH:mm",r&&"created_at"in r?i(r==null?void 0:r.created_at):i())]})})]})},s):e.jsx(e.Fragment,{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",r&&"period"in r?i(r==null?void 0:r.period):i())}),e.jsx(F,{variant:"destructive",children:"Skipped"})]}),e.jsx("div",{className:" mt-2",children:e.jsxs("span",{className:" text-sm italic",children:["You're performing this action at ",x("MMM Do, YYYY / HH:mm",r&&"created_at"in r?i(r==null?void 0:r.created_at):i())]})})]})},s)})})()})}function je({auth:r,data:s}){const u=K(),[f,a]=l.useState(!1);l.useEffect(()=>{T()},[]);const[j,w]=l.useState(null),[D,N]=l.useState(!0),[c,M]=l.useState();let v=5;const[b,y]=l.useState(v),[I,_]=l.useState(!1),T=async()=>{N(!0),j instanceof AbortController&&j.abort();const t=new AbortController;w(t);const n=[],h={limit:b};for(const o in h)n.push(encodeURIComponent(o)+"="+encodeURIComponent(h[o]));try{let k=(await g.get(`${route("api.planned-payment.v1.show",s.uuid)}?${n.join("&")}`,{cancelToken:new g.CancelToken(function(O){t.abort=O})})).data,A=k.result.record.data;M(A),_(k.result.has_more),N(!1),w(null)}catch(o){g.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}},[R,E]=l.useState(5);let L=()=>e.jsx(V,{}),B=t=>e.jsx(se,{plannedPayment:t});return l.useEffect(()=>{!u&&c&&E(c.length>0?c.length:5)},[c]),e.jsx(e.Fragment,{children:e.jsxs(ee,{user:r.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Detail: ",`${s==null?void 0:s.name}`]}),children:[e.jsx(U,{title:`Planned Detail: ${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(q,{className:"px-0"})}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(C,{className:" w-full",children:[e.jsx(W,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start cursor-pointer",onClick:()=>{a(!0)},children:[e.jsxs("div",{children:[e.jsx(X,{children:e.jsx("div",{children:"Planned Payment: Detail"})}),e.jsx(Z,{children:"See your detailed Planned Payment"})]}),e.jsx("div",{children:e.jsx(S,{open:f,onOpenChange:a,children:e.jsx(Y,{asChild:!0,children:e.jsx(m,{variant:"link",className:" p-0 h-auto leading-none","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})})})})]})}),e.jsxs($,{className:" flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx("span",{className:" font-medium text-xl",children:s.name})}),e.jsxs("div",{className:" flex gap-4",children:[e.jsx("div",{className:" w-1/3",children:e.jsxs("div",{className:` border ${s.to_wallet?"":s.type==="income"?" border-green-500":"  border-red-500"} rounded-md h-full flex flex-col gap-2 justify-center items-center`,children:[e.jsx("div",{className:"",children:(()=>s.to_wallet?e.jsx("i",{className:" text-2xl fa-solid fa-arrow-right-arrow-left rotate-90"}):e.jsx("i",{className:`text-2xl fa-solid ${s.type==="income"?" text-green-500 fa-right-to-bracket rotate-90":" text-red-500 fa-right-from-bracket -rotate-90"}`}))()}),e.jsxs("div",{className:" flex flex-col justify-center",children:[e.jsx("span",{className:"font-normal text-center",children:s.to_wallet?"Transfer":p(s.type)}),(()=>s.to_wallet?e.jsxs("span",{className:" text-xs text-center",children:["(",p(s.type),")"]}):e.jsx(e.Fragment,{}))()]})]})}),e.jsxs("div",{className:" w-2/3",children:[e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"Category"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.category?`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`:"Uncategorized"})]}),e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"From"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.from_wallet?`${s.from_wallet.parent?`${s.from_wallet.parent.name} - `:""}${s.from_wallet.name}`:"-"})]}),(()=>s.to_wallet?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"",children:[e.jsx("span",{className:"font-semibold underline text-sm",children:"To"}),e.jsx("span",{className:"block whitespace-nowrap overflow-hidden text-ellipsis",children:s.to_wallet?`${s.to_wallet.parent?`${s.to_wallet.parent.name} - `:""}${s.to_wallet.name}`:"-"})]})}):e.jsx(e.Fragment,{}))()]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.note??"No description provided"})]}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:d(s.amount??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>s.extra_type==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",s.extra_percentage??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:d(s.extra_amount)})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:d(s.amount+s.extra_amount)})]})]})]})]}),e.jsxs(C,{className:" w-full",children:[e.jsxs($,{className:" flex flex-col gap-6 pt-6",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{className:" font-normal",children:p(s.repeat_type)}),e.jsx(F,{children:p(s.repeat_period)})]}),(()=>s.repeat_type==="recurring"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col gap-1 text-right",children:[e.jsx("span",{className:" font-normal",children:"Every"}),e.jsx("span",{className:"",children:s.repeat_frequency})]})}):e.jsx(e.Fragment,{}))()]}),e.jsx(Q,{}),(()=>{if(D){let t=[];for(let n=0;n<R;n++)t.push(e.jsx("div",{children:L()},`skeleton-${n}`));return t}else{let t=[],n=e.jsx(z,{});return t.push(e.jsx("div",{children:e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4 cursor-pointer",children:[e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto",children:x("MMM Do, YYYY",s&&"date_start"in s?i(s==null?void 0:s.date_start):i())}),e.jsx("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:e.jsx("span",{className:` font-normal whitespace-nowrap ${s&&"type"in s?(s==null?void 0:s.type)==="expense"?" text-red-500":s.type==="income"?"text-green-500":" dark:text-white":""}`,children:d(s&&"amount"in s?s==null?void 0:s.amount:0)})})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:` p-3 h-10 w-10 rounded-full ${s&&"type"in s?s.type==="income"?" bg-green-500":s.type==="expense"?" bg-red-500":" bg-gray-500 dark:bg-secondary":""} flex items-center justify-center`,children:e.jsx("i",{className:` text-white fa-solid ${s&&"type"in s?s.type==="income"?"fa-right-to-bracket rotate-90":s.type==="expense"?"fa-right-from-bracket -rotate-90":"fa-right-left rotate-90":""}`})}),e.jsxs("div",{className:" w-full flex flex-col overflow-hidden",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden text-ellipsis font-medium",children:(()=>s&&"category_id"in s&&s.category?e.jsx(e.Fragment,{children:`${s.category.parent?`${s.category.parent.name} - `:""}${s.category.name}`}):e.jsx(e.Fragment,{children:"Uncategorized"}))()}),e.jsx("span",{className:" whitespace-nowrap text-sm overflow-hidden text-ellipsis",children:s&&"name"in s?s.name:"Planned Name"})]})]}),e.jsxs("div",{className:" mt-4 flex flex-row gap-4",children:[e.jsx(m,{className:"w-full",variant:"outline",children:"Skip"}),e.jsx(m,{className:"w-full",children:"Confirm"})]})]})})},"planned_prompt-0")),c&&c.length>0&&c.map((h,o)=>{t.push(e.jsx("div",{children:B(h)},`planned_item-${o}`))}),t.length>0?t:n}})()]}),e.jsx(P,{children:e.jsx("div",{children:e.jsx(m,{variant:"outline",className:"dark:border-white",disabled:!I,onClick:()=>{_(!1),y(b+v)},children:"Load more"})})})]})]})]})})}export{je as default};
