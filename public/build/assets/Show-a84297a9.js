import{j as e,r as a,e as S,a as q,y as H}from"./app-49aea280.js";import{m as t,f as C}from"./Combination-57e7aa50.js";import{L as G}from"./ListTemplate-afc44a0f.js";import{S as d}from"./skeleton-8d118e4f.js";import{B as J}from"./BackButtonTemplate-0a8fc534.js";import{N as K}from"./NoDataTemplate-cba6ec0f.js";import{S as Q}from"./SystemLayout-72223790.js";import{C as W,b as X,c as Z,d as w,a as ee,e as re}from"./card-05fb207d.js";import{$ as se,_ as ne,c as ae,u as te,B as h}from"./button-0487a8c3.js";import"./dropdown-menu-e7c91c18.js";import"./ApplicationLogo-47d2d62f.js";import"./ApplicationLogoMask-949cc0cc.js";import"./textarea-ddad9507.js";import"./input-77bac0a6.js";function oe(){let o=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded-lg p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(d,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(d,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(d,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(d,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(d,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(d,{className:"w-[50px] h-[20px] rounded-full"})]})]})},o)}const P="horizontal",ie=["horizontal","vertical"],D=a.forwardRef((o,r)=>{const{decorative:l,orientation:c=P,...f}=o,j=T(c)?c:P,v=l?{role:"none"}:{"aria-orientation":j==="vertical"?j:void 0,role:"separator"};return a.createElement(se.div,ne({"data-orientation":j},v,f,{ref:r}))});D.propTypes={orientation(o,r,l){const c=o[r],f=String(c);return c&&!T(c)?new Error(ce(f,l)):null}};function ce(o,r){return`Invalid prop \`orientation\` of value \`${o}\` supplied to \`${r}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${P}\`.`}function T(o){return ie.includes(o)}const _=D,k=a.forwardRef(({className:o,orientation:r="horizontal",decorative:l=!0,...c},f)=>e.jsx(_,{ref:f,decorative:l,orientation:r,className:ae("shrink-0 bg-border",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",o),...c}));k.displayName=_.displayName;function ye({auth:o,wallet:r,period:l,estimate_income:c=0,estimate_expense:f=0}){const j=te();a.useEffect(()=>{console.log(r),R()},[]);const[g,v]=a.useState(null),[L,E]=a.useState(!0),[x,A]=a.useState();let N=5;const[$,Y]=a.useState(N),[O,I]=a.useState(!1),R=async()=>{E(!0),g instanceof AbortController&&g.abort();const s=new AbortController;v(s);const n=[],p={filter_period:t(m).format("YYYY-MM-DD"),filter_period_timezone:t.tz.guess(),limit:$};for(const i in p)n.push(encodeURIComponent(i)+"="+encodeURIComponent(p[i]));try{let u=(await S.get(`${route("api.planned-payment.summary.v1.show",r==null?void 0:r.uuid)}?${n.join("&")}`,{cancelToken:new S.CancelToken(function(V){s.abort=V})})).data;A(u.result.data),I(u.result.has_more),E(!1),v(null)}catch(i){S.isCancel(i)?console.log("Request was canceled",i):console.error("Error:",i)}};let z=s=>e.jsx(G,{plannedPayment:s==null?void 0:s.planned});const[B,F]=a.useState(5);let U=()=>e.jsx(oe,{});a.useEffect(()=>{x&&F(x.length>0?x.length:3)},[x]);const[m,M]=a.useState();if(m===void 0){let s=t();l!==null&&(s=t(l)),M(t(s).toDate())}const b=(s="prev")=>{let n=t(m);s==="prev"?n=t(n).subtract(1,"months"):s==="next"?n=t(n).add(1,"months"):s==="current"&&(n=t()),M(t(n).toDate())};return a.useEffect(()=>{Y(N)},[m]),a.useEffect(()=>{j||R()},[$,m]),a.useEffect(()=>{const s=n=>{H.reload()};return document.addEventListener("dialogRecord",s),()=>{document.removeEventListener("dialogRecord",s)}}),e.jsx(e.Fragment,{children:e.jsxs(Q,{user:o.user,header:e.jsxs("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Planned Summary: ",`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`]}),children:[e.jsx(q,{title:`Planned Summary: ${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(J,{className:"px-0"})}),e.jsxs(W,{className:" w-full",children:[e.jsx(X,{children:e.jsxs("div",{className:" relative flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(Z,{children:e.jsxs("div",{children:["Planned Summary: ",`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`]})}),e.jsxs(w,{children:["See summary of ",e.jsx("u",{children:`${r!=null&&r.parent?`${r.parent.name} - `:""}${r==null?void 0:r.name}`})," wallet"]})]}),(()=>e.jsx(h,{variant:"outline",onClick:()=>{},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}))()]})}),e.jsx(ee,{children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" border p-4 rounded-lg flex flex-col gap-3 mb-2",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Current Balance"}),e.jsx("span",{children:C(r==null?void 0:r.current_balance)})]}),e.jsx(k,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Income"}),e.jsx("span",{className:" text-green-500",children:C(c)})]}),e.jsx(k,{}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx("span",{children:"Estimate Expense"}),e.jsx("span",{className:" text-red-500",children:C(f)})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:" flex justify-between items-center",children:[e.jsx(h,{variant:"ghost",onClick:()=>{b("prev")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-left"})})}),e.jsx("div",{className:"flex flex-col",children:e.jsx(h,{variant:"outline",className:"px-6",children:t(m).format("MMMM, YYYY")})}),e.jsx(h,{variant:"ghost",onClick:()=>{b("next")},children:e.jsx("span",{children:e.jsx("i",{className:"fa-solid fa-angle-right"})})})]}),(()=>t().format("YYYY-MM-DD")!=t(m).format("YYYY-MM-DD")?e.jsxs(h,{variant:"link",className:"py-0",onClick:()=>{b("current")},children:["Back to current period (",t().format("MMM, YYYY"),")"]}):e.jsx(e.Fragment,{}))()]}),(()=>{if(L){let s=[];for(let n=0;n<B;n++)s.push(e.jsx("div",{children:U()},`skeleton-${n}`));return s}else{let s=[],n=e.jsx(K,{}),p=null;return x&&x.length>0&&x.map((i,u)=>{let y=!1;(p===null||p!==i.period)&&(y=!0,p=i.period),u>0&&y&&s.push(e.jsx("div",{children:e.jsx("div",{className:" flex justify-center relative before:absolute before:border-t before:w-[calc(50%-1.25rem)] before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1 after:absolute after:border-t after:w-[calc(50%-1.25rem)] after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1",children:e.jsx("span",{children:e.jsx("i",{className:"fa-regular fa-clock"})})})},`period_separator-${u}`)),s.push(e.jsx("div",{children:z(i)},`planned_item-${u}`))}),s.length>0?s:n}})()]})}),e.jsx(re,{children:e.jsx("div",{children:e.jsx(h,{variant:"outline",className:"dark:border-white",disabled:!O,onClick:()=>{I(!1),Y($+N)},children:"Load more"})})})]})]})})}export{ye as default};
