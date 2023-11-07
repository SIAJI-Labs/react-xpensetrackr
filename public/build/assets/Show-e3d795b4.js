import{j as e,r as o,e as $,a as B}from"./app-a441a8f4.js";import{m as a,f as b}from"./Combination-7e052c36.js";import{L}from"./ListTemplate-91f3df57.js";import{S as d}from"./skeleton-078dea15.js";import{B as F}from"./BackButtonTemplate-fde16f72.js";import{N as U}from"./NoDataTemplate-9ecfc02a.js";import{S as V}from"./SystemLayout-791289be.js";import{C as q,b as H,c as G,d as J,a as K}from"./card-4d020749.js";import{$ as Q,_ as W,c as X,u as Z,B as j}from"./button-47330927.js";import"./dropdown-menu-f1937647.js";import"./ApplicationLogo-617a9a41.js";import"./ApplicationLogoMask-7641063f.js";import"./textarea-20586d59.js";import"./input-cc5cc681.js";function w(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(d,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(d,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(d,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(d,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(d,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"})]})]})},t)}const y="horizontal",ee=["horizontal","vertical"],P=o.forwardRef((t,r)=>{const{decorative:f,orientation:i=y,...x}=t,u=Y(i)?i:y,c=f?{role:"none"}:{"aria-orientation":u==="vertical"?u:void 0,role:"separator"};return o.createElement(Q.div,W({"data-orientation":u},c,x,{ref:r}))});P.propTypes={orientation(t,r,f){const i=t[r],x=String(i);return i&&!Y(i)?new Error(re(x,f)):null}};function re(t,r){return`Invalid prop \`orientation\` of value \`${t}\` supplied to \`${r}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${y}\`.`}function Y(t){return ee.includes(t)}const k=P,S=o.forwardRef(({className:t,orientation:r="horizontal",decorative:f=!0,...i},x)=>e.jsx(k,{ref:x,decorative:f,orientation:r,className:X("shrink-0 bg-border",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",t),...i}));S.displayName=k.displayName;function ve({auth:t,wallet:r,period:f}){Z(),o.useEffect(()=>{T()},[]);const[i,x]=o.useState(null),[u,v]=o.useState(!0),[c,I]=o.useState();let E=5;const[M,se]=o.useState(E),[ne,D]=o.useState(!1),T=async()=>{v(!0),i instanceof AbortController&&i.abort();const s=new AbortController;x(s);const n=[],m={filter_period:a(h).format("YYYY-MM-DD"),filter_period_timezone:a.tz.guess(),limit:M};for(const l in m)n.push(encodeURIComponent(l)+"="+encodeURIComponent(m[l]));try{let p=(await $.get(`${route("api.planned-payment.summary.v1.show",r==null?void 0:r.uuid)}?${n.join("&")}`,{cancelToken:new $.CancelToken(function(z){s.abort=z})})).data;I(p.result.data),D(p.result.has_more),v(!1),x(null)}catch(l){$.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}};let R=s=>e.jsx(L,{plannedPayment:s==null?void 0:s.planned});const[_,A]=o.useState(5);let O=()=>e.jsx(w,{});o.useEffect(()=>{c&&A(c.length>0?c.length:3)},[c]);const[h,C]=o.useState();if(h===void 0){let s=a();f!==null&&(s=a(f)),C(a(s).toDate())}const N=(s="prev")=>{let n=a(h);s==="prev"?n=a(n).subtract(1,"months"):s==="next"?n=a(n).add(1,"months"):s==="current"&&(n=a()),C(a(n).toDate())};return e.jsx(e.Fragment,{children:e.jsxs(V,{user:t.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Summary: ",`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`]}),children:[e.jsx(B,{title:`Planned Summary: ${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(F,{className:"px-0"})}),e.jsxs(q,{className:" w-full",children:[e.jsx(H,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(G,{children:e.jsxs("div",{children:["Planned Summary: ",`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`]})}),e.jsxs(J,{children:["See summary of ",e.jsx("u",{children:`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`})," wallet"]})]}),(()=>e.jsx(j,{variant:"outline",onClick:()=>{},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(K,{children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" border p-4 rounded-lg flex flex-col gap-3 mb-2",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Current Balance"}),e.jsx("span",{children:b(0)})]}),e.jsx(S,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Income"}),e.jsx("span",{children:b(0)})]}),e.jsx(S,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Expense"}),e.jsx("span",{children:b(0)})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(j,{variant:"ghost",onClick:()=>{N("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(j,{variant:"outline",className:"px-6",children:a(h).format("MMMM, YYYY")})}),e.jsx(j,{variant:"ghost",onClick:()=>{N("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>a().format("YYYY-MM-DD")!=a(h).format("YYYY-MM-DD")?e.jsxs(j,{variant:"link",className:"py-0",onClick:()=>{N("current")},children:["Back to current period (",a().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),(()=>{if(u){let s=[];for(let n=0;n<_;n++)s.push(e.jsx("div",{children:O()},`skeleton-${n}`));return s}else{let s=[],n=e.jsx(U,{}),m=null;return c&&c.length>0&&c.map((l,p)=>{let g=!1;(m===null||m!==l.period)&&(g=!0,m=l.period),p>0&&g&&s.push(e.jsx("div",{children:e.jsx("div",{className:" flex justify-center relative before:absolute before:border-t before:w-[calc(50%-1.25rem)] before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1 after:absolute after:border-t after:w-[calc(50%-1.25rem)] after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1",children:e.jsx("span",{children:e.jsx("i",{className:"fa-regular fa-clock"})})})},`period_separator-${p}`)),s.push(e.jsx("div",{children:R(l)},`planned_item-${p}`))}),s.length>0?s:n}})()]})})]})]})})}export{ve as default};
