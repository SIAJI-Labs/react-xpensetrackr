import{r as o,j as e,a as E,e as y}from"./app-49e19f09.js";import{u as q,B as v}from"./button-8f2a595a.js";import{v as F}from"./v4-34c6629a.js";import{T}from"./TemplateBackButton-a1494aed.js";import{T as $}from"./TemplateNoData-b0444318.js";import{S as P}from"./SystemLayout-a53fff85.js";import{C as L,b as O,c as k,d as D,a as H}from"./card-2c105230.js";import{U as p}from"./index-84c40666.js";/* empty css            *//* empty css              */import"./index-961138f1.js";import"./index-61f18b0c.js";import"./dialog-dd6b0ada.js";import"./drawer-134f179f.js";import"./theme-toggle-66897dc1.js";import"./ErrorMessage-9da431ff.js";import"./scroll-area-8438057d.js";import"./input-d9c06e18.js";import"./ApplicationLogoMask-c668ea73.js";import"./ApplicationLogo-c5ad270c.js";function se({auth:b,listWallet:_}){q();const[m,C]=o.useState(0),[u,g]=o.useState(0),f=()=>{let n=document.querySelectorAll("li.nst-item > ol.nst-list"),a=document.querySelectorAll("li.nst-item.nst-collapsed > ol.nst-list");C(n.length),g(a.length)},[j,h]=o.useState(""),x=()=>F();let c=!1;const[r,N]=o.useState(),S=()=>{typeof r<"u"&&typeof r=="object"&&r!==null&&r.destroy();let n=new Nestable("#wallet-list",{maxDepth:1,animation:150});N(n)};let d=null;const A=n=>{d instanceof AbortController&&d.abort();const a=new AbortController;d=a;let t=new FormData;t.append("hierarchy",JSON.stringify(n)),y.post(`${route("api.wallet.v1.re-order")}`,t,{cancelToken:new y.CancelToken(function(s){a.abort=s})}).then(l=>{p("Action: Success",{description:"Wallet order successfully updated"})}).catch(l=>{}).finally(()=>{d=null})};return o.useEffect(()=>{r&&(r.on("stop",n=>{if(typeof c<"u"&&c){h(x()),p.error("Action: Failed",{description:"Something went wrong"});return}let a=n.movedNode,t=n.newParentItem;if(a.childNodes.forEach(s=>{s.classList.contains("nst-list")&&n.newParent&&t!==null&&(c=!0)}),typeof c<"u"&&c){h(x()),p.error("Action: Failed",{description:"Parent data cannot be moved inside another parent data!"});return}t==null?n.newParent&&n.originalParent!==n.newParent&&(a.hasAttribute("data-parent_id")&&a.removeAttribute("data-parent_id"),a.querySelector(".item_parent-name")&&a.querySelector(".item_parent-name").remove()):(a.hasAttribute("data-parent_id")||(a.dataset.parent_id=t.dataset.wallet_id),a.querySelector(".item_parent-name")?a.dataset.parent_id!==t.dataset.wallet_id&&a.querySelector(".item_parent-name")&&(a.querySelector(".item_parent-name").innerHTML=`${t.querySelector(".item-name").dataset.name} - `):a.querySelector(".item-name").insertAdjacentHTML("afterbegin",`
                            <p class="item_parent-name" data-name="${t.querySelector(".item-name").dataset.name}">${t.querySelector(".item-name").dataset.name} - </p>
                        `));let l=[];n.hierarchy.forEach(s=>{let i=[];s.children!==void 0&&s.children.forEach(w=>{i.push({id:w.node.dataset.wallet_id})}),i.length>0?l.push({id:s.node.dataset.wallet_id,child:i}):l.push({id:s.node.dataset.wallet_id})}),A(l)}),r.on("error.collapsed",()=>{p.error("Action: Failed",{description:"Can't nest in collpased list!"})}),r.on("list.collapse",f),r.on("list.expand",f),f())},[r]),o.useEffect(()=>{h(x())},[]),o.useEffect(()=>{S()},[j]),o.useEffect(()=>{const n=()=>{d instanceof AbortController&&d.abort()};return window.addEventListener("popstate",n),()=>{window.removeEventListener("popstate",n)}}),e.jsxs(P,{user:b.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Wallet Re-Order"}),fabAction:["wallet"],children:[e.jsx(E,{title:"Wallet Re-Order"}),e.jsx(T,{className:"px-0"}),e.jsxs(L,{className:" w-full",children:[e.jsx(O,{children:e.jsxs("div",{className:" flex flex-row justify-between items-start",children:[e.jsxs("div",{children:[e.jsx(k,{children:e.jsx("div",{children:"Wallet: Re-Order"})}),e.jsx(D,{children:"Manage wallet order"})]}),e.jsx("div",{className:"flex items-center gap-2",children:(()=>m>0?e.jsx(e.Fragment,{children:e.jsxs(v,{variant:"outline",className:" flex flex-row gap-2",onClick:()=>{console.log(r),r&&(m===u?r.expandAll():r.collapseAll())},children:[e.jsx("i",{className:`fa-solid ${m===u?"fa-expand":"fa-compress"}`}),e.jsx("span",{children:m===u?"Expand":"Collapse"})]})}):e.jsx(e.Fragment,{}))()})]})}),e.jsx(H,{children:e.jsx("div",{className:"sa-sortable",children:(()=>{let n=e.jsx($,{}),a=[];return Object.values(_).forEach((t,l)=>{let s=[];t.child&&Object.values(t.child).forEach((i,w)=>{s.push(e.jsxs("li",{"data-wallet_id":i.uuid,"data-parent_id":t.uuid,children:[e.jsx("div",{className:"nst-handle custom-handle",children:e.jsx("i",{className:"fa-solid fa-grip-vertical"})}),e.jsxs("span",{className:"item-name","data-name":i.name,children:[e.jsxs("p",{className:"item_parent-name","data-name":t.name,children:[t.name," - "]}),i.name]})]},`child_item-${i.uuid}`))}),a.push(e.jsxs("li",{"data-wallet_id":t.uuid,children:[e.jsx("div",{className:"nst-handle custom-handle",children:e.jsx("i",{className:"fa-solid fa-grip-vertical"})}),e.jsx("span",{className:"item-name","data-name":t.name,children:t.name}),(()=>s.length>0?e.jsx("ol",{"data-wallet_id":t.uuid,children:s},`parent_wallet-${t.uuid}`):e.jsx(e.Fragment,{}))()]},`sort_${l}`))}),a.length>0?e.jsx("ol",{id:"wallet-list",children:a}):n})()})})]})]},j)}export{se as default};
