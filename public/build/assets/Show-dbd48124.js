import{j as e,a as x,d as m}from"./app-0f7f6890.js";import{B as o}from"./BackButtonTemplate-bf974887.js";import{B as t}from"./badge-2468a7a7.js";import{u as h,B as j}from"./button-ca44c454.js";import{C as l,b as r,c as n,d as f,a as i}from"./card-43f822a6.js";import{S as p}from"./SystemLayout-e515f18f.js";import{f as u,u as a}from"./Combination-efa42deb.js";import"./ApplicationLogo-d7e14e46.js";import"./ApplicationLogoMask-0391dc39.js";import"./dropdown-menu-7ce55958.js";import"./textarea-cd17f820.js";import"./input-72062d81.js";function S({auth:c,data:s}){return h(),e.jsx(e.Fragment,{children:e.jsxs(p,{user:c.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Wallet Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]}),children:[e.jsx(x,{title:`Planned Summary: ${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(o,{className:"px-0"})}),e.jsxs(l,{className:" w-full",children:[e.jsx(r,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(n,{children:e.jsxs("div",{children:["Wallet Detail: ",`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`]})}),e.jsxs(f,{children:["See summary of ",e.jsx("u",{children:`${s!=null&&s.parent?`${s.parent.name} - `:""}${s==null?void 0:s.name}`})," wallet"]})]}),(()=>e.jsx(j,{variant:"outline",onClick:()=>{document.dispatchEvent(new CustomEvent("wallet.refresh",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(i,{children:e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Balance"}),e.jsx("span",{className:"font-semibold",children:u(s.balance??0)})]}),(()=>s.parent_id?e.jsx(e.Fragment,{children:e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Related to"}),e.jsx(m,{href:route("sys.wallet.show",s.parent.uuid),children:e.jsx("span",{className:"font-semibold underline",children:s.parent.name})})]})}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:" flex flex-col",children:[e.jsx("span",{children:"Purpose"}),e.jsx(t,{children:a(s.type)})]}),e.jsxs("div",{className:" flex flex-col items-end",children:[e.jsx("span",{children:"Last Transaction"}),e.jsx("span",{children:"-"})]})]})]})})]}),(()=>(console.log(s.child),s.child&&Object.keys(s.child).length>0?e.jsx(e.Fragment,{children:e.jsxs(l,{className:" w-full mt-6",children:[e.jsx(r,{children:e.jsx("div",{className:" relative flex flex-row justify-between items-start",children:e.jsx("div",{children:e.jsx(n,{children:e.jsx("div",{className:" text-base",children:"Related wallet"})})})})}),e.jsx(i,{})]})}):e.jsx(e.Fragment,{})))()]})})}export{S as default};