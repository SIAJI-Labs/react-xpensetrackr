import{r as d,j as e,a as l}from"./app-661effb3.js";import{C as o,b as x,c,d as p,a as j}from"./card-4894c07f.js";import{S as f}from"./SystemLayout-e3467c88.js";import{u as t}from"./Combination-e6a29ca1.js";import y from"./Summary-7f709a84.js";import h from"./List-ed166cff.js";import"./button-bf5fa3fb.js";import"./ApplicationLogo-a69b41a9.js";import"./ApplicationLogoMask-c8e5364d.js";import"./dropdown-menu-4b20f48f.js";import"./textarea-0a1d2eca.js";import"./input-84b77e4e.js";import"./skeleton-ba17427d.js";import"./SummarySkeleton-5172ea03.js";import"./ListTemplate-32252d2c.js";function H({auth:a,type:n="list"}){const[r,m]=d.useState(n);return e.jsx(e.Fragment,{children:e.jsxs(f,{user:a.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Payment ",t(r)]}),children:[e.jsx(l,{title:`Planned Payment ${t(r)}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(o,{className:"",children:[e.jsx(x,{children:e.jsx("div",{className:" flex flex-row justify-between items-center",children:e.jsxs("div",{children:[e.jsx(c,{children:e.jsxs("div",{children:["Planned Payment: ",t(r)]})}),e.jsxs(p,{children:["See ",r," of your Planned Payment"]})]})})}),e.jsxs(j,{children:[e.jsx("div",{className:" flex flex-row gap-1 w-full border p-1 rounded-md",children:(()=>{let i=[];return["summary","list"].map((s,u)=>{i.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${r===s?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{m(s)},children:e.jsx("span",{className:" text-sm font-semibold",children:t(s)})},`record_type-${s}`))}),i.length>0?i:e.jsx(e.Fragment,{})})()}),e.jsxs("div",{className:" mt-6",children:[e.jsx("hr",{}),e.jsx("div",{className:"mt-4",children:(()=>r==="summary"?e.jsx(y,{auth:a,activeType:r}):r==="list"?e.jsx(h,{auth:a,activeType:r}):e.jsx(e.Fragment,{}))()})]})]})]})})]})})}export{H as default};
