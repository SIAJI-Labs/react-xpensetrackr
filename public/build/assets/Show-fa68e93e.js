import{r as i,e as C,j as e,a as ne,y as g,d as S}from"./app-49e19f09.js";import{u as re,B as x}from"./button-8f2a595a.js";import{u as P,f as E,h as a,m as Y}from"./index-961138f1.js";import{T as ie}from"./TemplateBackButton-a1494aed.js";import{D as oe,a as ae,b as ce,c as k,T as de}from"./TemplateNoData-b0444318.js";import{S as xe}from"./SystemLayout-a53fff85.js";import{T as ue,S as me}from"./SkeletonList-5b4d3cbf.js";import{C as T,b as L,c as R,d as he,a as D}from"./card-2c105230.js";import{B as c}from"./badge-dbdf798f.js";import{S as fe}from"./separator-9cd8c296.js";import{I as ge}from"./input-d9c06e18.js";/* empty css            */import"./index-61f18b0c.js";/* empty css              */import"./index-84c40666.js";import"./dialog-dd6b0ada.js";import"./drawer-134f179f.js";import"./theme-toggle-66897dc1.js";import"./ErrorMessage-9da431ff.js";import"./scroll-area-8438057d.js";import"./ApplicationLogoMask-c668ea73.js";import"./ApplicationLogo-c5ad270c.js";import"./skeleton-3b1a4842.js";function Pe({auth:j,data:s,original_start:m,original_end:je,previous_start:d,previous_end:F,range:I,usage_limit:h,usage_used:M,usage_remaining:f}){const q=re(),[z,p]=i.useState(!1);i.useEffect(()=>{const l=()=>{setTimeout(()=>{p(!1)},100)};return document.addEventListener("dialog.budget.shown",l),()=>{document.removeEventListener("dialog.budget.shown",l)}});const v=(l="prev")=>{let t=null;l==="prev"?t=Number(I)+1:l==="next"&&(t=Number(I)-1);let n={uuid:s.uuid};t&&t>0&&(n.previous=t);let r=route("sys.budget.show",n);g.visit(r,{preserveScroll:!0})},[b,K]=i.useState("");i.useEffect(()=>{W()},[b]);const W=()=>{if(!q){const l=setTimeout(()=>{$(N),y()},500);return()=>{clearTimeout(l)}}},G=l=>e.jsx(ue,{record:l});let J=e.jsx(me,{}),N=5;const[_,Q]=i.useState(0),[B,V]=i.useState(0),[w,$]=i.useState(N),[X,H]=i.useState(!1);i.useEffect(()=>{y()},[w]);const[Z,U]=i.useState(!0),[ee,se]=i.useState(5),[u,le]=i.useState([]),[A,O]=i.useState(null);i.useEffect(()=>{se(u.length>0?u.length:3)},[u]);const y=async()=>{A instanceof AbortController&&A.abort();const l=new AbortController;O(l),U(!0);const t=[],n={limit:w,keyword:b,filter_budget:s.uuid,filter_start:d,filter_end:F};for(const r in n)t.push(encodeURIComponent(r)+"="+encodeURIComponent(n[r]));try{let o=(await C.get(`${route("api.record.v1.list")}?${t.join("&")}`,{cancelToken:new C.CancelToken(function(te){l.abort=te})})).data;le(o.result.data),H(o.result.has_more),Q(o.result.data.length),"total"in o.result&&V(o.result.total),U(!1),O(null)}catch(r){C.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}};return i.useEffect(()=>{const l=t=>{var n,r;(n=t.detail)!=null&&n.action&&((r=t.detail)==null?void 0:r.action)==="delete"?g.visit(route("sys.budget.index")):(y(),g.reload())};return document.addEventListener("budget.deleted-action",l),document.addEventListener("dialog.budget.hidden",l),document.addEventListener("dialog.record.hidden",l),()=>{document.addEventListener("budget.deleted-action",l),document.removeEventListener("dialog.budget.hidden",l),document.removeEventListener("dialog.record.hidden",l)}}),e.jsx(e.Fragment,{children:e.jsxs(xe,{user:j.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Budget Detail: ",`${s==null?void 0:s.name}`]}),fabAction:["budget"],children:[e.jsx(ne,{title:`Budget: ${s==null?void 0:s.name}`}),e.jsx(ie,{className:"px-0"}),e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs(T,{className:" w-full",children:[e.jsx(L,{children:e.jsxs("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(R,{children:e.jsxs("div",{children:["Budget Detail: ",`${s==null?void 0:s.name}`]})}),e.jsx(he,{children:"See summary of your budget"})]}),e.jsx("div",{children:e.jsxs(oe,{open:z,onOpenChange:p,children:[e.jsx(ae,{asChild:!0,children:e.jsx(x,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(ce,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(k,{className:" cursor-pointer",onClick:()=>{g.reload(),setTimeout(()=>{p(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("budget-dialogSection")?e.jsx(k,{className:" cursor-pointer",onClick:t=>{let n=t.target;if(n){let r=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{r&&(n.innerHTML=r),document.removeEventListener("dialog.budget.shown",o)};document.addEventListener("dialog.budget.shown",o)}document.dispatchEvent(new CustomEvent("budget.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("budget-deleteDialogSection")?e.jsx(k,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("budget.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(D,{children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{children:"Occurence"}),e.jsx(c,{variant:"outline",className:" justify-center",children:P(s.occurence)})]}),e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{children:"Interval"}),e.jsx(c,{variant:"outline",className:" justify-center",children:s.occurence==="once"?s.interval:P(s.interval)})]})]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("span",{className:"font-normal",children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:s.description??"No description provided"})]})]})})]}),e.jsxs(T,{className:" w-full",children:[e.jsx(L,{children:e.jsx("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:e.jsx("div",{children:e.jsx(R,{children:e.jsx("div",{children:"Condition"})})})})}),e.jsx(D,{children:(()=>{if(s.budget_category&&s.budget_category.length>0||s.budget_wallet&&s.budget_wallet.length>0||s.budget_tags&&s.budget_tags.length>0){let l=[];if(s.budget_category&&s.budget_category.length>0){let t=[];s.budget_category.forEach((n,r)=>{t.push(e.jsx(S,{href:route("sys.category.show",n.uuid),children:e.jsx(c,{children:n.name})},`category_badge_link-${r}`))}),l.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Category (",s.budget_category.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:t})]},"condition-category"))}if(s.budget_wallet&&s.budget_wallet.length>0){let t=[];s.budget_wallet.forEach((n,r)=>{t.push(e.jsx(S,{href:route("sys.wallet.show",n.uuid),children:e.jsx(c,{children:n.name})},`wallet_badge_link-${r}`))}),l.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Wallet (",s.budget_wallet.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:t})]},"condition-wallet"))}if(s.budget_tags&&s.budget_tags.length>0){let t=[];s.budget_tags.forEach((n,r)=>{t.push(e.jsx(S,{href:route("sys.tags.show",n.uuid),children:e.jsx(c,{children:n.name})},`tags_badge_link-${r}`))}),l.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("span",{className:" leading-none",children:["Tags (",s.budget_tags.length,")"]}),e.jsx("div",{className:" flex flex-row gap-1 flex-wrap",children:t})]},"condition-tags"))}return e.jsx("div",{className:" flex flex-col gap-4",children:l})}return e.jsx("span",{children:"No condition provided"})})()})]}),e.jsxs(T,{className:" w-full",children:[e.jsx(L,{children:e.jsx("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:e.jsx("div",{children:e.jsx(R,{children:e.jsx("div",{children:"Usage"})})})})}),e.jsxs(D,{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("small",{children:"Used"}),e.jsx("span",{children:E(M)})]}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("small",{children:"Remaining"}),e.jsx("span",{children:E(f)})]})]}),e.jsx("div",{className:" h-3 w-full rounded-full relative bg-gray-100 dark:bg-gray-700 overflow-hidden",children:e.jsx("div",{className:" h-full absolute left-0 top-0 bg-primary",style:{width:`${f!==void 0&&h!==void 0?Math.max(f,1)/Math.max(h,1)*100:100}%`}})}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs(c,{variant:"outline",children:["Limit: ",E(s.amount)]}),e.jsxs(c,{variant:"outline",children:["Usage: ",`${(f!==void 0&&h!==void 0?M/h*100:100).toFixed(2)}%`]})]})]}),e.jsx(fe,{}),e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[(()=>s.occurence==="recurring"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("div",{className:"",children:e.jsx(x,{variant:"ghost",onClick:()=>{v("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})})}),e.jsx("div",{className:"",children:e.jsx(x,{variant:"outline",className:"px-6",children:a(d)<a(m)?"Archive":"Current"})}),e.jsx("div",{className:"",children:e.jsx(x,{variant:"ghost",onClick:()=>{v("next")},className:a(d)<a(m)?"":" !opacity-0",disabled:!(a(d)<a(m)),children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})})]})}):e.jsx(e.Fragment,{}))(),(()=>a(d)<a(m)?e.jsx("div",{className:" flex flex-row justify-center",children:e.jsx(x,{variant:"link",className:" h-auto py-0",onClick:()=>{v("curr")},children:"Back to current period"})}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{className:" text-sm leading-none",children:"From"}),e.jsx("span",{className:" font-medium leading-tight",children:Y("MMM Do, 'YY / HH:mm",d,j.timezone??"UTC")})]}),e.jsxs("div",{className:" flex flex-col gap-1 items-end",children:[e.jsx("span",{className:" text-sm leading-none",children:"Until"}),e.jsx("span",{className:" font-medium leading-tight",children:Y("MMM Do, 'YY / HH:mm",F,j.timezone??"UTC")})]})]})]}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(ge,{placeholder:"Search by record notes",value:b,onChange:l=>{K(l.target.value)}}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(Z){let l=[];for(let t=0;t<ee;t++)l.push(e.jsx("div",{children:J},`skeleton-${t}`));return l}else{let l=[],t=e.jsx(de,{});return u.length>0&&u.map((n,r)=>{l.push(e.jsx("div",{children:G(n)},`record_item-${r}`))}),l.length>0?l:t}})()}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(x,{variant:"outline",className:"",disabled:!X,onClick:()=>{H(!1),$(w+N)},children:"Load more"}),(()=>_>0&&B>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",_," of ",B," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})]})]})]})]})})}export{Pe as default};