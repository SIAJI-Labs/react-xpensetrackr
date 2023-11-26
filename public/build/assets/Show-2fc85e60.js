import{j as e,a as f,d as h}from"./app-0e733e7a.js";import{u as p,B as u}from"./button-0f3494cc.js";import{T as N}from"./TemplateBackButton-f26e0429.js";import{T as g}from"./TemplateList-771b598d.js";import{T as v}from"./TemplateNoData-1e074380.js";import{S as b}from"./SystemLayout-d62129ad.js";import{m as i,f as w,u as $}from"./function-1359a238.js";import{C as t,b as m,c as a,e as y,a as c}from"./card-ac2c3737.js";import{B as C}from"./badge-f293bc50.js";import"./ApplicationLogo-2a0140d6.js";import"./ApplicationLogoMask-7a30d251.js";import"./textarea-ef328a49.js";import"./input-84da03ea.js";function W({auth:x,data:s,related:r}){p();let o=l=>e.jsx(g,{wallet:l});return e.jsx(e.Fragment,{children:e.jsxs(b,{user:x.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Wallet Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]}),children:[e.jsx(f,{title:`Planned Summary: ${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(N,{className:"px-0"})}),e.jsxs(t,{className:" w-full",children:[e.jsx(m,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(a,{children:e.jsxs("div",{children:["Wallet Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]})}),e.jsxs(y,{children:["See summary of ",e.jsx("u",{children:`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`})," wallet"]})]}),(()=>e.jsx(u,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(c,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[(()=>s.parent&&s.parent.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Parent Wallet is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Parent Wallet is deleted at ",i("MMM Do, YYYY / HH:mm",s.parent.deleted_at)]})]})}):"deleted_at"in s&&s.deleted_at!==null?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm font-normal",children:[e.jsx("i",{className:"fa-solid fa-triangle-exclamation"}),e.jsx("span",{className:"font-normal",children:"Data is Deleted"})]}),e.jsxs("span",{className:" block mt-2",children:["Related data is deleted at ",i("MMM Do, YYYY / HH:mm",s.deleted_at)]})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Balance"}),e.jsx("span",{className:"font-semibold",children:w(s.balance??0)})]}),(()=>s.parent_id?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Related to"}),e.jsx(h,{href:route("sys.wallet.show",s.parent.uuid),children:e.jsx("span",{className:"font-semibold underline",children:s.parent.name})})]})}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Purpose"}),e.jsx(C,{children:$(s.type)})]}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})]})]})})]}),(()=>r&&Object.keys(r).length>0?e.jsx(e.Fragment,{children:e.jsxs(t,{className:" w-full mt-6",children:[e.jsx(m,{children:e.jsx("div",{className:" relative flex flex-row justify-between items-start",children:e.jsx("div",{children:e.jsx(a,{children:e.jsx("div",{className:" text-base",children:"Related wallet"})})})})}),e.jsx(c,{children:e.jsx("div",{className:"flex flex-col gap-4",children:(()=>{let l=[],d=e.jsx(v,{});return Object.values(r).forEach((n,j)=>{console.log(n),l.push(e.jsx("div",{children:o(n)},`related_item-${j}`))}),l.length>0?l:d})()})})]})}):e.jsx(e.Fragment,{}))()]})})}export{W as default};
