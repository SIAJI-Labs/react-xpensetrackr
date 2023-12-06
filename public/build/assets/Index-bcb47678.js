import{r as c,j as e,a as g,e as x}from"./app-763aeab1.js";import{u as N}from"./button-461116eb.js";import{v as S}from"./v4-34c6629a.js";import{T as E}from"./TemplateBackButton-501ef3f1.js";import{T as C}from"./TemplateNoData-fe2f925b.js";import{S as A}from"./SystemLayout-0e707192.js";import{C as v,b as T,c as q,a as F}from"./card-c363146b.js";import{u as P}from"./ApplicationLogo-a3853991.js";/* empty css            */import"./function-0da6b1b7.js";import"./textarea-7bab3bbd.js";import"./ApplicationLogoMask-7232c8f3.js";import"./input-9effb50d.js";function J({auth:j,listWallet:w}){const y=N(),{toast:m}=P(),[f,u]=c.useState(""),p=()=>S();let d=!1,o=null;const _=()=>{typeof o<"u"&&typeof o=="object"&&o!==null&&o.destroy(),o=new Nestable("#wallet-list",{maxDepth:1,animation:150}),o.on("stop",r=>{if(typeof d<"u"&&d){u(p()),m({title:"Action: Failed",description:"Something went wrong"});return}let a=r.movedNode,t=r.newParentItem;if(a.childNodes.forEach(n=>{n.classList.contains("nst-list")&&r.newParent&&t!==null&&(d=!0)}),typeof d<"u"&&d){u(p()),m({title:"Action: Failed",description:"Parent data cannot be moved inside another parent data!"});return}t==null?r.newParent&&r.originalParent!==r.newParent&&(a.hasAttribute("data-parent_id")&&a.removeAttribute("data-parent_id"),a.querySelector(".item_parent-name")&&a.querySelector(".item_parent-name").remove()):(a.hasAttribute("data-parent_id")||(a.dataset.parent_id=t.dataset.wallet_id),a.querySelector(".item_parent-name")?a.dataset.parent_id!==t.dataset.wallet_id&&a.querySelector(".item_parent-name")&&(a.querySelector(".item_parent-name").innerHTML=`${t.querySelector(".item-name").dataset.name} - `):a.querySelector(".item-name").insertAdjacentHTML("afterbegin",`
                        <p class="item_parent-name" data-name="${t.querySelector(".item-name").dataset.name}">${t.querySelector(".item-name").dataset.name} - </p>
                    `));let i=[];r.hierarchy.forEach(n=>{let s=[];n.children!==void 0&&n.children.forEach(h=>{s.push({id:h.node.dataset.wallet_id})}),s.length>0?i.push({id:n.node.dataset.wallet_id,child:s}):i.push({id:n.node.dataset.wallet_id})}),b(i)})};c.useEffect(()=>{y&&u(p())}),c.useEffect(()=>{_()},[f]);let l=null;const b=r=>{l instanceof AbortController&&l.abort();const a=new AbortController;l=a;let t=new FormData;t.append("hierarchy",JSON.stringify(r)),x.post(`${route("api.wallet.v1.re-order")}`,t,{cancelToken:new x.CancelToken(function(n){a.abort=n})}).then(i=>{m({title:"Action: Success",description:"Wallet order successfully updated"})}).catch(i=>{}).finally(()=>{l=null})};return c.useEffect(()=>{const r=()=>{console.log("User navigated in history"),console.log(l),l instanceof AbortController&&l.abort()};return window.addEventListener("popstate",r),()=>{window.removeEventListener("popstate",r)}}),e.jsxs(A,{user:j.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet Re-Order"}),fabAction:["wallet"],children:[e.jsx(g,{title:"Wallet Re-Order"}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx(E,{className:"px-0"})}),e.jsxs(v,{className:" w-full",children:[e.jsx(T,{children:e.jsx("div",{className:" flex flex-row justify-between items-start",children:e.jsx("div",{children:e.jsx(q,{children:e.jsx("div",{children:"Wallet: Re-Order"})})})})}),e.jsx(F,{children:e.jsx("div",{className:"sa-sortable",children:(()=>{let r=e.jsx(C,{}),a=[];return Object.values(w).forEach((t,i)=>{let n=[];t.child&&Object.values(t.child).forEach((s,h)=>{n.push(e.jsxs("li",{"data-wallet_id":s.uuid,"data-parent_id":t.uuid,children:[e.jsx("div",{className:"nst-handle custom-handle",children:e.jsx("i",{className:"fa-solid fa-grip-vertical"})}),e.jsxs("span",{className:"item-name","data-name":s.name,children:[e.jsxs("p",{className:"item_parent-name","data-name":t.name,children:[t.name," - "]}),s.name]})]},`child_item-${s.uuid}`))}),a.push(e.jsxs("li",{"data-wallet_id":t.uuid,children:[e.jsx("div",{className:"nst-handle custom-handle",children:e.jsx("i",{className:"fa-solid fa-grip-vertical"})}),e.jsx("span",{className:"item-name","data-name":t.name,children:t.name}),(()=>n.length>0?e.jsx("ol",{"data-wallet_id":t.uuid,children:n},`parent_wallet-${t.uuid}`):e.jsx(e.Fragment,{}))()]},`sort_${i}`))}),a.length>0?e.jsx("ol",{id:"wallet-list",children:a}):r})()})})]})]},f)}export{J as default};
