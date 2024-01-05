import{r as n,j as e,d as $,e as C,a as O}from"./app-40004788.js";import{B as j,u as q}from"./button-bea93b78.js";import{D as B,a as H,b as _,c as b,T as K}from"./TemplateNoData-e01bfc3c.js";import{S as y}from"./skeleton-3e7ad5e2.js";import{S as P}from"./SystemLayout-88a534e5.js";import{C as U,b as z,c as G,d as J,a as Q,e as V}from"./card-26f007fd.js";import{I as W}from"./input-37e80c12.js";/* empty css            */import"./check-52942dd2.js";import"./index-14986e37.js";/* empty css              */import"./ApplicationLogo-eff473df.js";import"./scroll-area-a9786e46.js";import"./theme-toggle-29e5209d.js";import"./ApplicationLogoMask-e3678fcb.js";function X({tags:t,deleteAction:m=!0,editAction:w=!0}){let x=(Math.random()+1).toString(36).substring(7);const[d,f]=n.useState(!1);return e.jsx("section",{onClick:i=>{f(!0)},children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4 cursor-pointer",children:e.jsxs("div",{className:" flex flex-row gap-6 justify-between",children:[e.jsx("span",{className:" font-medium w-full md:w-auto whitespace-nowrap overflow-hidden text-ellipsis",children:t&&"name"in t?`${t==null?void 0:t.name}`:"-"}),e.jsx("div",{className:" flex flex-row flex-1 md:flex-none justify-between gap-2 items-center",children:e.jsx("div",{children:e.jsxs(B,{open:d,onOpenChange:f,children:[e.jsx(H,{asChild:!0,children:e.jsx(j,{variant:"link",className:" p-0 h-auto leading-none dark:!text-white !text-black","data-type":"dropdown-trigger",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})})}),e.jsxs(_,{sideOffset:5,alignOffset:0,side:"left",align:"start",children:[(()=>t&&"uuid"in t?e.jsx(e.Fragment,{children:e.jsx($,{href:route("sys.tags.show",{uuid:t.uuid}),children:e.jsx(b,{className:" cursor-pointer",children:e.jsx("span",{className:" text-blue-500",children:"Detail"})})})}):e.jsx(e.Fragment,{}))(),(()=>document.getElementById("tags-dialogSection")&&w?e.jsx(b,{className:" cursor-pointer",onClick:p=>{let a=p.target;if(a){let h=a.innerHTML;a.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const o=()=>{h&&(a.innerHTML=h),document.removeEventListener("dialog.tags.shown",o)};document.addEventListener("dialog.tags.shown",o)}document.dispatchEvent(new CustomEvent("tags.edit-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:""}}))},children:e.jsx("span",{className:" text-yellow-500",children:"Edit"})}):e.jsx(e.Fragment,{}))(),(()=>{let i=document.getElementById("tags-deleteDialogSection");return m&&i?e.jsx(b,{className:" cursor-pointer",onClick:()=>{document.dispatchEvent(new CustomEvent("tags.delete-action",{bubbles:!0,detail:{uuid:t&&"uuid"in t?t==null?void 0:t.uuid:null,action:"delete"}}))},children:e.jsx("span",{className:" text-red-500",children:"Delete"})}):e.jsx(e.Fragment,{})})()]})]})})})]})})},x)}function Y(){let t=(Math.random()+1).toString(36).substring(7);return e.jsx("section",{children:e.jsx("div",{className:" flex flex-col gap-2 border rounded p-4",children:e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsx(y,{className:"w-[100px] h-[20px] rounded-full"}),e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(y,{className:"w-[10px] h-[20px] rounded-full"})})]})})},t)}function pe({auth:t}){const m=q(),[w,x]=n.useState(!0);n.useEffect(()=>{c()},[]);const[d,f]=n.useState("");n.useEffect(()=>{if(!m){const s=setTimeout(()=>{T(o),c()},500);return()=>{clearTimeout(s)}}},[d]);const[i,p]=n.useState(null),[a,h]=n.useState();let o=5;const[N,k]=n.useState(0),[S,L]=n.useState(0),[v,T]=n.useState(o),[D,E]=n.useState(!1),c=async()=>{x(!0),i instanceof AbortController&&i.abort();const s=new AbortController;p(s);const l=[],g={limit:v,keyword:d};for(const r in g)l.push(encodeURIComponent(r)+"="+encodeURIComponent(g[r]));try{let u=(await C.get(`${route("api.tags.v1.list")}?${l.join("&")}`,{cancelToken:new C.CancelToken(function(A){s.abort=A})})).data;h(u.result.data),E(u.result.has_more),k(u.result.data.length),"total"in u.result&&L(u.result.total),x(!1),p(null)}catch(r){C.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}};n.useEffect(()=>{m||c()},[v]);const[I,F]=n.useState(5);let M=()=>e.jsx(Y,{});n.useEffect(()=>{a&&F(a.length>0?a.length:3)},[a]);let R=s=>e.jsx(X,{tags:s});return n.useEffect(()=>{const s=()=>{setTimeout(()=>{c()},100)};return document.addEventListener("dialog.tags.hidden",s),document.addEventListener("tags.deleted-action",s),()=>{document.removeEventListener("dialog.tags.hidden",s),document.removeEventListener("tags.deleted-action",s)}}),e.jsx(e.Fragment,{children:e.jsxs(P,{user:t.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Tags List"}),fabAction:["tags"],children:[e.jsx(O,{title:"Tags List"}),e.jsxs(U,{className:" w-full",children:[e.jsx(z,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(G,{children:e.jsx("div",{children:"Tags: List"})}),e.jsx(J,{children:"List of your available Tags"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(j,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{i instanceof AbortController&&i.abort(),c()},children:e.jsx("i",{className:"fa-solid fa-rotate-right"})}),e.jsx(j,{variant:"outline",className:" w-10 aspect-square",onClick:()=>{document.dispatchEvent(new CustomEvent("tags.edit-action",{bubbles:!0}))},children:e.jsx("i",{className:"fa-solid fa-plus"})})]})]})}),e.jsx(Q,{children:e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-2",children:e.jsx(W,{placeholder:"Search by Tags name",value:d,onChange:s=>{f(s.target.value)}})}),e.jsx("div",{className:" flex flex-col gap-4",children:(()=>{if(w){let s=[];for(let l=0;l<I;l++)s.push(e.jsx("div",{children:M()},`skeleton-${l}`));return s}else{let s=[],l=e.jsx(K,{});return a&&a.length>0&&a.map((g,r)=>{s.push(e.jsx("div",{children:R(g)},`tags_item-${r}`))}),s.length>0?s:l}})()})]})}),e.jsxs(V,{className:"flex justify-between items-center",children:[e.jsx(j,{variant:"outline",className:"dark:border-white",disabled:!D,onClick:()=>{E(!1),T(v+o)},children:"Load more"}),(()=>N>0&&S>0?e.jsx(e.Fragment,{children:e.jsxs("span",{className:"text-sm",children:["Showing ",N," of ",S," entries"]})}):e.jsx(e.Fragment,{}))()]})]})]})})}export{pe as default};