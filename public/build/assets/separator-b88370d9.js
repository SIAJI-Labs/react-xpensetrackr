import{j as e,r as i}from"./app-6ce9e5c3.js";import{S as a}from"./skeleton-e9d67b99.js";import{$ as u,_ as m,c as h}from"./button-a3bee333.js";function O(){let r=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(a,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(a,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(a,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(a,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(a,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(a,{className:"w-[50px] h-[20px] rounded-full"})]})]})},r)}const d="horizontal",$=["horizontal","vertical"],c=i.forwardRef((r,s)=>{const{decorative:n,orientation:o=d,...l}=r,t=x(o)?o:d,p=n?{role:"none"}:{"aria-orientation":t==="vertical"?t:void 0,role:"separator"};return i.createElement(u.div,m({"data-orientation":t},p,l,{ref:s}))});c.propTypes={orientation(r,s,n){const o=r[s],l=String(o);return o&&!x(o)?new Error(N(l,n)):null}};function N(r,s){return`Invalid prop \`orientation\` of value \`${r}\` supplied to \`${s}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${d}\`.`}function x(r){return $.includes(r)}const f=c,j=i.forwardRef(({className:r,orientation:s="horizontal",decorative:n=!0,...o},l)=>e.jsx(f,{ref:l,decorative:n,orientation:s,className:h("shrink-0 bg-border",s==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",r),...o}));j.displayName=f.displayName;export{O as L,j as S};