import{r as c,j as e,a as u,y as d}from"./app-793cf9d5.js";import{u as p,B as f}from"./button-4380bba0.js";import{T as h}from"./TemplateBackButton-ec58aae6.js";import{D as g,a as j,b as v,c as r}from"./TemplateNoData-d753be41.js";import{S as N}from"./SystemLayout-3b5fe053.js";import{m as w}from"./function-8829c559.js";import{C as D,b,c as C,d as E,a as y}from"./card-6888966b.js";/* empty css            */import"./ApplicationLogo-5c56f361.js";import"./textarea-f9763287.js";import"./ApplicationLogoMask-62469e27.js";import"./input-3a86d487.js";function _({auth:m,data:s,related:T}){p();const[x,o]=c.useState(!1);return c.useEffect(()=>{const i=l=>{var n,t;(n=l.detail)!=null&&n.action&&((t=l.detail)==null?void 0:t.action)==="delete"?location.href=route("sys.tags.index"):d.reload()};return document.addEventListener("dialog.tags.hidden",i),()=>{document.removeEventListener("dialog.tags.hidden",i)}}),e.jsx(e.Fragment,{children:e.jsxs(N,{user:m.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Tags Detail: ",`${s==null?void 0:s.name}`]}),children:[e.jsx(u,{title:`Planned Summary: ${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(h,{className:"px-0"})}),e.jsxs(D,{className:" w-full",children:[e.jsx(b,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(C,{children:e.jsxs("div",{children:["Tags Detail: ",`${s==null?void 0:s.name}`]})}),e.jsxs(E,{children:["See summary of ",e.jsx("u",{children:`${s==null?void 0:s.name}`})," tags"]})]}),e.jsx("div",{children:e.jsxs(g,{open:x,onOpenChange:o,children:[e.jsx(j,{asChild:!0,children:e.jsx(f,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(v,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[e.jsx(r,{className:" cursor-pointer",onClick:()=>{d.reload(),setTimeout(()=>{o(!1)},100)},children:e.jsx("span",{className:"",children:"Refresh"})}),(()=>document.getElementById("tags-dialogSection")?e.jsx(r,{className:" cursor-pointer",onClick:l=>{let n=l.target;if(n){let t=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const a=()=>{t&&(n.innerHTML=t),document.removeEventListener("dialog.tags.shown",a)};document.addEventListener("dialog.tags.shown",a)}document.dispatchEvent(new CustomEvent("tags.edit-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("tags-deleteDialogSection")?e.jsx(r,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("tags.delete-action",{bubbles:!0,detail:{uuid:s&&"uuid"in s?s==null?void 0:s.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{}))()]})]})})]})}),e.jsx(y,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>"deleted_at"in s&&s.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",w("MMM Do, YYYY / HH:mm",s.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col items-start",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})})]})})]})]})})}export{_ as default};
