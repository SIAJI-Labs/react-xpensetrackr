import{j as e,a as h,d as f}from"./app-0e733e7a.js";import{u as p,B as u}from"./button-0f3494cc.js";import{T as g}from"./TemplateBackButton-f26e0429.js";import{T as N}from"./TemplateList-b01d8cfb.js";import{T as v}from"./TemplateNoData-1e074380.js";import{S as y}from"./SystemLayout-d62129ad.js";import{m as i}from"./function-1359a238.js";import{C as t,b as m,c,e as b,a}from"./card-ac2c3737.js";import"./ApplicationLogo-2a0140d6.js";import"./ApplicationLogoMask-7a30d251.js";import"./textarea-ef328a49.js";import"./input-84da03ea.js";function R({auth:o,data:s,related:l}){p();let x=r=>e.jsx(N,{category:r});return e.jsx(e.Fragment,{children:e.jsxs(y,{user:o.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Category Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]}),children:[e.jsx(h,{title:`Planned Summary: ${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(g,{className:"px-0"})}),e.jsxs(t,{className:" w-full",children:[e.jsx(m,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(c,{children:e.jsxs("div",{children:["Category Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]})}),e.jsxs(b,{children:["See summary of ",e.jsx("u",{children:`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`})," category"]})]}),(()=>e.jsx(u,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("category.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(a,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>s.parent&&s.parent.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Parent Category is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Parent Category is deleted at ",i("MMM Do, YYYY / HH:mm",s.parent.deleted_at)]})]})}):"deleted_at"in s&&s.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",i("MMM Do, YYYY / HH:mm",s.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),(()=>s.parent_id?e.jsx(e.Fragment,{children:e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Related to"}),e.jsx(f,{href:route("sys.category.show",s.parent.uuid),children:e.jsx("span",{className:"font-semibold underline",children:s.parent.name})})]})})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})})]})})]}),(()=>l&&Object.keys(l).length>0?e.jsx(e.Fragment,{children:e.jsxs(t,{className:" w-full mt-6",children:[e.jsx(m,{children:e.jsx("div",{className:" relative flex flex-row justify-between items-start",children:e.jsx("div",{children:e.jsx(c,{children:e.jsx("div",{className:" text-base",children:"Related category"})})})})}),e.jsx(a,{children:e.jsx("div",{className:"flex flex-col gap-4",children:(()=>{let r=[],d=e.jsx(v,{});return Object.values(l).forEach((n,j)=>{console.log(n),r.push(e.jsx("div",{children:x(n)},`related_item-${j}`))}),r.length>0?r:d})()})})]})}):e.jsx(e.Fragment,{}))()]})})}export{R as default};
