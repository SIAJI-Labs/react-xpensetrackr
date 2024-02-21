import{r as s,e as p,j as e,a as Q}from"./app-49e19f09.js";import{u as V,B as h}from"./button-8f2a595a.js";import{T as X,S as Y}from"./SkeletonList-5b4d3cbf.js";import{T as Z}from"./TemplateNoData-b0444318.js";import{S as ee}from"./SystemLayout-a53fff85.js";import{C as te,b as re,c as se,d as oe,a as ae,e as le}from"./card-2c105230.js";import{I as ie}from"./input-d9c06e18.js";import ne from"./Filter-b1b9bf4f.js";/* empty css            */import"./index-961138f1.js";import"./index-61f18b0c.js";/* empty css              */import"./badge-dbdf798f.js";import"./skeleton-3b1a4842.js";import"./index-84c40666.js";import"./dialog-dd6b0ada.js";import"./drawer-134f179f.js";import"./theme-toggle-66897dc1.js";import"./ErrorMessage-9da431ff.js";import"./scroll-area-8438057d.js";import"./ApplicationLogoMask-c668ea73.js";import"./ApplicationLogo-c5ad270c.js";function _e({auth:N,type:L="complete"}){const k=V(),I=r=>e.jsx(X,{record:r});let W=e.jsx(Y,{});const[d,$]=s.useState(!1),[u,_]=s.useState(""),[x,A]=s.useState(L),[g,q]=s.useState([]),[j,D]=s.useState([]),[C,P]=s.useState([]),[S,O]=s.useState([]),F=()=>{if(!k){const r=setTimeout(()=>{v(m),n()},500);return()=>{clearTimeout(r)}}};s.useEffect(()=>{F()},[u]),s.useEffect(()=>{d||F()},[d]);let m=5;const[R,B]=s.useState(0),[T,K]=s.useState(0),[f,v]=s.useState(m),[U,y]=s.useState(!1);s.useEffect(()=>{n()},[f]);const[H,E]=s.useState(!0),[z,G]=s.useState(5),[l,J]=s.useState([]),[i,b]=s.useState(null);s.useEffect(()=>{G(l.length>0?l.length:3)},[l]);const n=async()=>{i instanceof AbortController&&i.abort();const r=new AbortController;b(r),E(!0);const a=[],c={limit:f,filter_status:x,keyword:u};for(const t in c)a.push(encodeURIComponent(t)+"="+encodeURIComponent(c[t]));g.filter(t=>"uuid"in t).forEach((t,o)=>{a.push(`filter_from_wallet[${o}] = ${t.uuid}`)}),j.filter(t=>"uuid"in t).forEach((t,o)=>{a.push(`filter_to_wallet[${o}] = ${t.uuid}`)}),C.filter(t=>"uuid"in t).forEach((t,o)=>{a.push(`filter_category[${o}] = ${t.uuid}`)}),S.filter(t=>"uuid"in t).forEach((t,o)=>{a.push(`filter_tags[${o}] = ${t.uuid}`)});try{let o=(await p.get(`${route("api.record.v1.list")}?${a.join("&")}`,{cancelToken:new p.CancelToken(function(M){r.abort=M})})).data;J(o.result.data),y(o.result.has_more),B(o.result.data.length),"total"in o.result&&K(o.result.total),E(!1),b(null)}catch(t){p.isCancel(t)?console.log("Request was canceled",t):console.error("Error:",t)}};return s.useEffect(()=>{const r=()=>{setTimeout(()=>{n()},100)};return document.addEventListener("dialog.record.hidden",r),document.addEventListener("record.deleted-action",r),()=>{document.removeEventListener("dialog.record.hidden",r),document.removeEventListener("record.deleted-action",r)}}),e.jsx(e.Fragment,{children:e.jsxs(ee,{user:N.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Record List"}),children:[e.jsx(Q,{title:"Record List"}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsxs(te,{className:"",children:[e.jsx(re,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(se,{children:e.jsx("div",{children:"Record: List"})}),e.jsx(oe,{children:"See your latest transaction"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(h,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{i instanceof AbortController&&i.abort(),n()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(h,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("record.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsxs(ae,{className:" flex flex-col gap-6",children:[e.jsxs("div",{className:" flex flex-row gap-2",children:[e.jsx(ie,{placeholder:"Search by record notes",value:u,onChange:r=>{_(r.target.value)}}),e.jsx(ne,{openState:d,setOpenState:$,filterStatus:x,setFilterStatus:A,filterFromWallet:g,setFilterFromWallet:q,filterToWallet:j,setFilterToWallet:D,filterCategory:C,setFilterCategory:P,filterTags:S,setFilterTags:O})]}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(H){let r=[];for(let a=0;a<z;a++)r.push(e.jsx("div",{children:W},`skeleton-${a}`));return r}else{let r=[],a=e.jsx(Z,{});return l.length>0&&l.map((c,w)=>{r.push(e.jsx("div",{children:I(c)},`record_item-${w}`))}),r.length>0?r:a}})()})]}),e.jsxs(le,{className:"flex justify-between items-center",children:[e.jsx(h,{variant:"outline",className:"",disabled:!U,onClick:()=>{y(!1),v(f+m)},children:"Load more"}),(()=>R>0&&T>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",R," of ",T," entries"]})}):e.jsx(e.Fragment,{}))()]})]})})]})})}export{_e as default};