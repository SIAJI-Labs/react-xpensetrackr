import{r as d,j as e,a as v,y as i,d as N}from"./app-643b45d1.js";import{m}from"./function-579bbfa0.js";import{T as w}from"./TemplateBackButton-0e3cfad5.js";import{T as b}from"./TemplateList-d83ddab2.js";import{D as C,a as D,b as E,c as a,T}from"./TemplateNoData-a426bb43.js";import{S as L}from"./SystemLayout-2fdf08da.js";import{C as x,b as u,c as h,d as p,a as f}from"./card-ea509320.js";import{B as M}from"./button-2abb1b99.js";/* empty css            */import"./siaji-712147e8.js";import"./ApplicationLogo-f57477a1.js";import"./x-cddf793a.js";import"./scroll-area-3beb2520.js";import"./theme-toggle-54f870e3.js";import"./input-84153507.js";import"./ApplicationLogoMask-1f9d2130.js";function J({auth:j,data:s}){const[g,o]=d.useState(!1);let y=n=>e.jsx(b,{category:n});return d.useEffect(()=>{const n=l=>{var r,t;(r=l.detail)!=null&&r.action&&((t=l.detail)==null?void 0:t.action)==="delete"?i.visit(route("sys.category.index")):i.reload()};return document.addEventListener("category.deleted-action",n),document.addEventListener("dialog.category.hidden",n),()=>{document.addEventListener("category.deleted-action",n),document.removeEventListener("dialog.category.hidden",n)}}),e.jsx(e.Fragment,{children:e.jsxs(L,{user:j.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Category Detail: ",`${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]}),fabAction:["category"],children:[e.jsx(v,{title:`Category: ${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(w,{className:"px-0"})}),e.jsxs(x,{className:" w-full",children:[e.jsx(u,{children:e.jsxs("div",{className:" relative flex flex-row gap-4 justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(h,{children:e.jsxs("div",{children:["Category Detail: ",`${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]})}),e.jsxs(p,{children:["See summary of ",e.jsx("u",{children:`${s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`})," category"]})]}),e.jsx("div",{children:e.jsxs(C,{open:g,onOpenChange:o,children:[e.jsx(D,{asChild:!0,children:e.jsx(M,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(E,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(a,{className:" cursor-pointer",onClick:()=>{i.reload(),setTimeout(()=>{o(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("category-dialogSection")?e.jsx(a,{className:" cursor-pointer",onClick:l=>{let r=l.target;if(r){let t=r.innerHTML;r.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const c=()=>{t&&(r.innerHTML=t),document.removeEventListener("dialog.category.shown",c)};document.addEventListener("dialog.category.shown",c)}document.dispatchEvent(new CustomEvent("category.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("category-deleteDialogSection")?e.jsx(a,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("category.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(f,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>s.parent&&s.parent.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Parent Category is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Parent Category is deleted at ",m("MMM Do, YYYY / HH:mm",s.parent.deleted_at)]})]})}):"deleted_at"in s&&s.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",m("MMM Do, YYYY / HH:mm",s.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Related to"}),(()=>s.parent?e.jsx(N,{href:route("sys.category.show",s.parent.uuid),children:e.jsx("span",{className:"font-semibold underline",children:s.parent.name})}):e.jsx(e.Fragment,{children:"-"}))()]})}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})]})]})})]}),(()=>s.child&&Object.keys(s.child).length>0?e.jsx(e.Fragment,{children:e.jsxs(x,{className:" w-full mt-6",children:[e.jsx(u,{children:e.jsx("div",{className:" relative flex flex-row justify-between items-start",children:e.jsxs("div",{children:[e.jsx(h,{children:e.jsx("div",{className:" text-base",children:"Related category"})}),(()=>s.child?e.jsxs(p,{children:["There's ",s.child.length," item(s) related to ",e.jsx("u",{children:s.name})]}):e.jsx(e.Fragment,{}))()]})})}),e.jsx(f,{children:e.jsx("div",{className:"flex flex-col gap-4",children:(()=>{let n=[],l=e.jsx(T,{});return Object.values(s.child).forEach((r,t)=>{n.push(e.jsx("div",{children:y(r)},`related_item-${t}`))}),n.length>0?n:l})()})})]})}):e.jsx(e.Fragment,{}))()]})})}export{J as default};
