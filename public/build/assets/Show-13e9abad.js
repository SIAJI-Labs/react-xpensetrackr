import{r as c,j as e,a as x,y as l}from"./app-3c6f5806.js";import{T as p}from"./TemplateBackButton-394ff84e.js";import{S as g}from"./SystemLayout-9451cc14.js";import{m as f}from"./check-bb2c4d62.js";import{C as h,b as j,c as v,d as w,a as N}from"./card-13c517d6.js";import{B as D}from"./button-620a8a90.js";import{D as E,a as b,b as y,c as o}from"./TemplateNoData-3c5d76cc.js";/* empty css            *//* empty css              */import"./ApplicationLogo-5dc75d28.js";import"./scroll-area-2e1ec903.js";import"./index-19be1af9.js";import"./theme-toggle-ae599113.js";import"./input-7b48b385.js";import"./ApplicationLogoMask-fc01e341.js";function z({auth:m,data:s,related:C}){const[u,a]=c.useState(!1);return c.useEffect(()=>{const n=r=>{var t,i;(t=r.detail)!=null&&t.action&&((i=r.detail)==null?void 0:i.action)==="delete"?l.visit(route("sys.tags.index")):l.reload({only:["data"]})};return document.addEventListener("tags.deleted-action",n),document.addEventListener("dialog.tags.hidden",n),()=>{document.removeEventListener("tags.deleted-action",n),document.removeEventListener("dialog.tags.hidden",n)}}),e.jsx(e.Fragment,{children:e.jsxs(g,{user:m.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Tags Detail: ",`${s==null?void 0:s.name}`]}),children:[e.jsx(x,{title:`Tags: ${s==null?void 0:s.name}`}),e.jsx(p,{className:"px-0"}),e.jsxs(h,{className:" w-full",children:[e.jsx(j,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(v,{children:e.jsxs("div",{children:["Tags Detail: ",`${s==null?void 0:s.name}`]})}),e.jsxs(w,{children:["See summary of ",e.jsx("u",{children:`${s==null?void 0:s.name}`})," tags"]})]}),e.jsx("div",{children:e.jsxs(E,{open:u,onOpenChange:a,children:[e.jsx(b,{asChild:!0,children:e.jsx(D,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(y,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(o,{className:" cursor-pointer",onClick:()=>{l.reload({only:["data"]}),setTimeout(()=>{a(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("tags-dialogSection")?e.jsx(o,{className:" cursor-pointer",onClick:r=>{let t=r.target;if(t){let i=t.innerHTML;t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const d=()=>{i&&(t.innerHTML=i),document.removeEventListener("dialog.tags.shown",d)};document.addEventListener("dialog.tags.shown",d)}document.dispatchEvent(new CustomEvent("tags.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("tags-deleteDialogSection")?e.jsx(o,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("tags.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(N,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>"deleted_at"in s&&s.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",f("MMM Do, YYYY / HH:mm",s.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col items-start",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})})]})})]})]})})}export{z as default};
