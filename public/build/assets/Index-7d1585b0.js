import{j as e,r as s,e as f,a as F}from"./app-867c648e.js";import{S as A,T as D}from"./SystemLayout-d2389e95.js";import{u as $,B as _}from"./button-e14265ef.js";import{T as q}from"./TemplateNoData-f222ea3e.js";import{C as B,b as P,c as U,d as H,a as M,e as z}from"./card-d83ad5e7.js";import{S as n}from"./skeleton-aa61534c.js";/* empty css            */import"./function-80297abc.js";import"./ApplicationLogo-8cbc3631.js";import"./siaji-88c05fee.js";import"./x-6db178d0.js";import"./scroll-area-914ae91a.js";import"./theme-toggle-dd491e56.js";import"./input-6ec9b6ed.js";import"./ApplicationLogoMask-85aaaa0f.js";function G(){let c=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsxs("div",{className:" flex flex-col gap-2 border rounded p-4",children:[e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(n,{className:"w-[100px] h-[20px] rounded-full"}),e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(n,{className:"w-[75px] h-[20px] rounded-full"}),e.jsx(n,{className:"w-[10px] h-[20px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4 items-center",children:[e.jsx("div",{className:"",children:e.jsx(n,{className:"w-[50px] h-[50px] rounded-full"})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsx(n,{className:"w-[150px] h-[15px] rounded-full"}),e.jsx(n,{className:"w-[75px] h-[10px] rounded-full"})]})]}),e.jsxs("div",{className:" flex flex-row gap-4",children:[e.jsx(n,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(n,{className:"w-[50px] h-[20px] rounded-full"}),e.jsx(n,{className:"w-[50px] h-[20px] rounded-full"})]})]})},c)}function le({auth:c,inspire:J=""}){const C=$(),[w,x]=s.useState(!0);s.useEffect(()=>{u()},[]);const[m,p]=s.useState(null),[i,S]=s.useState();let h=5;const[j,v]=s.useState(0),[g,b]=s.useState(0),[d,E]=s.useState(h),[k,N]=s.useState(!1),u=async()=>{x(!0),m instanceof AbortController&&m.abort();const t=new AbortController;p(t);const o=[],l={limit:d};for(const a in l)o.push(encodeURIComponent(a)+"="+encodeURIComponent(l[a]));try{let r=(await f.get(`${route("api.report.notification.v1.list")}?${o.join("&")}`,{cancelToken:new f.CancelToken(function(R){t.abort=R})})).data;S(r.result.data),N(r.result.has_more),v(r.result.data.length),"total"in r.result&&b(r.result.total),x(!1),p(null)}catch(a){f.isCancel(a)?console.log("Request was canceled",a):console.error("Error:",a)}};s.useEffect(()=>{C||u()},[d]);const[L,T]=s.useState(5);let y=()=>e.jsx(G,{});s.useEffect(()=>{i&&T(i.length>0?i.length:3)},[i]);let I=t=>e.jsx(D,{notification:t});return s.useEffect(()=>{const t=()=>{setTimeout(()=>{u()},100)};return document.addEventListener("dialog.notification.hidden",t),document.addEventListener("notification.update",t),()=>{document.removeEventListener("dialog.notification.hidden",t),document.removeEventListener("notification.update",t)}}),e.jsxs(A,{user:c.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Notification"}),children:[e.jsx(F,{title:"Notification"}),e.jsxs(B,{children:[e.jsxs(P,{children:[e.jsx(U,{children:"Notification List"}),e.jsx(H,{children:"See your notification list"})]}),e.jsx(M,{className:" flex flex-col gap-4",children:(()=>{if(w){let t=[];for(let o=0;o<L;o++)t.push(e.jsx("div",{children:y()},`skeleton-${o}`));return t}else{let t=[];if(i&&i.length>0&&i.map((o,l)=>{t.push(e.jsx("div",{children:I(o)},`notification_item-${l}`))}),t.length>0)return t}return e.jsx(q,{})})()}),e.jsxs(z,{className:"flex justify-between items-center",children:[e.jsx(_,{variant:"outline",className:"dark:border-white",disabled:!k,onClick:()=>{N(!1),E(d+h)},children:"Load more"}),(()=>j>0&&g>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",j," of ",g," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})}export{le as default};
