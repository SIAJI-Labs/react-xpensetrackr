import{r as n,j as e,e as c}from"./app-40004788.js";import{u as Fe,C as I}from"./check-52942dd2.js";import{D as Oe,g as _e,h as De,i as Je,j as Ue,k as Pe,P as L,a as k,b as $,C as E,c as R,S as A,d as W,e as q,f as F,l as Ve}from"./scroll-area-a9786e46.js";import{B as m}from"./button-bea93b78.js";/* empty css            */import"./index-14986e37.js";function Qe({openState:le,setOpenState:P,filterStatus:V,setFilterStatus:B,filterFromWallet:d=[],setFilterFromWallet:b,filterToWallet:x=[],setFilterToWallet:f,filterCategory:u=[],setFilterCategory:g,filterTags:i=[],setFilterTags:j}){let G;const[p,re]=n.useState(!1),[oe,ne]=n.useState([]),[te,ce]=n.useState([]),[O,H]=n.useState(""),[de,z]=n.useState(!1),[w,xe]=n.useState(null),ue=async(a,s)=>{z(!0);try{const r=[],o={keyword:a};for(const l in o)r.push(encodeURIComponent(l)+"="+encodeURIComponent(o[l]));try{return(await c.get(`${route("api.wallet.v1.list")}?${r.join("&")}`,{cancelToken:new c.CancelToken(function(h){s.abort=h})})).data.result.data}catch(l){c.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}}catch(r){throw console.error("Request error:",r),r}return[]};n.useEffect(()=>{if(clearTimeout(G),p){w&&w.abort();const a=new AbortController;return xe(a),G=setTimeout(()=>{ue(O,a).then((s=[])=>{z(!1),s&&ce(s)}).catch(s=>{})},500),()=>{w&&w.abort()}}},[O,p]),n.useEffect(()=>{H("")},[p]);let K;const[C,ie]=n.useState(!1),[me,he]=n.useState([]),[be,fe]=n.useState([]),[_,M]=n.useState(""),[ge,Q]=n.useState(!1),[N,je]=n.useState(null),pe=async(a,s)=>{Q(!0);try{const r=[],o={keyword:a};for(const l in o)r.push(encodeURIComponent(l)+"="+encodeURIComponent(o[l]));try{return(await c.get(`${route("api.wallet.v1.list")}?${r.join("&")}`,{cancelToken:new c.CancelToken(function(h){s.abort=h})})).data.result.data}catch(l){c.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}}catch(r){throw console.error("Request error:",r),r}return[]};n.useEffect(()=>{if(clearTimeout(K),C){N&&N.abort();const a=new AbortController;return je(a),K=setTimeout(()=>{pe(_,a).then((s=[])=>{Q(!1),s&&fe(s)}).catch(s=>{})},500),()=>{N&&N.abort()}}},[_,C]),n.useEffect(()=>{M("")},[C]);let X;const[y,we]=n.useState(!1),[Ce,Ne]=n.useState([]),[ye,Se]=n.useState([]),[D,Y]=n.useState(""),[ve,Z]=n.useState(!1),[S,Te]=n.useState(null),Ie=async(a,s)=>{Z(!0);try{const r=[],o={keyword:a};for(const l in o)r.push(encodeURIComponent(l)+"="+encodeURIComponent(o[l]));try{return(await c.get(`${route("api.category.v1.list")}?${r.join("&")}`,{cancelToken:new c.CancelToken(function(h){s.abort=h})})).data.result.data}catch(l){c.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}}catch(r){throw console.error("Request error:",r),r}return[]};n.useEffect(()=>{if(clearTimeout(X),y){S&&S.abort();const a=new AbortController;return Te(a),X=setTimeout(()=>{Ie(D,a).then((s=[])=>{Z(!1),s&&Se(s)}).catch(s=>{})},500),()=>{S&&S.abort()}}},[D,y]),n.useEffect(()=>{Y("")},[y]);let ee;const[v,Le]=n.useState(!1),[ke,$e]=n.useState([]),[Ee,Re]=n.useState([]),[J,ae]=n.useState(""),[Ae,se]=n.useState(!1),[T,We]=n.useState(null),qe=async(a,s)=>{se(!0);try{const r=[],o={keyword:a};for(const l in o)r.push(encodeURIComponent(l)+"="+encodeURIComponent(o[l]));try{return(await c.get(`${route("api.tags.v1.list")}?${r.join("&")}`,{cancelToken:new c.CancelToken(function(h){s.abort=h})})).data.result.data}catch(l){c.isCancel(l)?console.log("Request was canceled",l):console.error("Error:",l)}}catch(r){throw console.error("Request error:",r),r}return[]};return n.useEffect(()=>{if(clearTimeout(ee),v){T&&T.abort();const a=new AbortController;return We(a),ee=setTimeout(()=>{qe(J,a).then((s=[])=>{se(!1),s&&Re(s)}).catch(s=>{})},500),()=>{T&&T.abort()}}},[J,v]),n.useEffect(()=>{ae("")},[v]),e.jsxs(Oe,{open:le,onOpenChange:P,children:[e.jsx(_e,{asChild:!0,children:e.jsx(m,{variant:V==="pending"||u.length>0||d.length>0||x.length>0||i.length>0?"default":"outline",className:" w-10 aspect-square",children:e.jsx("i",{className:"fa-solid fa-filter"})})}),e.jsxs(De,{className:" flex flex-col h-auto lg:min-w-[60vw] max-lg:bottom-0 max-lg:top-[unset] max-lg:translate-y-0","data-type":"record_filter-dialog",children:[e.jsxs(Je,{children:[e.jsx(Ue,{children:"Record: Filter"}),e.jsx(Pe,{children:e.jsx("span",{children:"Show record data based on certain condition"})})]}),e.jsx("div",{className:" overflow-auto max-h-screen max-lg:max-h-[50vh] lg:max-h-[65vh]",children:e.jsxs("div",{className:" flex flex-col gap-6",children:[e.jsx("div",{className:" flex flex-row gap-1 w-full border p-1 rounded-md",children:(()=>{let a=[];return["complete","pending"].map((s,r)=>{a.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${V===s?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{B(s)},children:e.jsx("span",{className:" text-sm font-semibold",children:Fe(s)})},`record_type-${s}`))}),a.length>0?a:e.jsx(e.Fragment,{})})()}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:" form--group",id:"record_filter-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From Wallet"}),e.jsx("div",{children:e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs(L,{open:p,onOpenChange:re,children:[e.jsx(k,{asChild:!0,children:e.jsxs(m,{variant:"outline",role:"combobox",className:" flex flex-row gap-1 leading-none p-2 h-auto text-xs",children:[e.jsx("i",{className:"fa-solid fa-plus"}),e.jsx("span",{children:"From Wallet"})]})}),e.jsx($,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(E,{shouldFilter:!1,children:[e.jsx(R,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:O,onValueChange:H}),e.jsx(A,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(W,{children:de?"Loading...":"No wallet found."}),e.jsx(q,{children:te.map(a=>e.jsxs(F,{value:a==null?void 0:a.uuid,onSelect:s=>{let r={uuid:s,label:a.name},o=d.findIndex(l=>l.uuid===a.uuid);if(d&&o!==-1){const l=[...d];l.splice(o,1),b(l)}else b([...d,r]),ne([...oe,a==null?void 0:a.name])},children:[e.jsx(I,{className:`mr-2 h-4 w-4 ${d&&d.some(s=>"uuid"in s&&s.uuid===(a==null?void 0:a.uuid))?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${a==null?void 0:a.name}`})]},a==null?void 0:a.uuid))})]})})]})})]}),(()=>{let a=[];return d.length>0&&(d.forEach((s,r)=>{let o=s.label;o&&a.push(e.jsxs(m,{variant:"secondary",className:" flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto",onClick:()=>{let l=d.findIndex(t=>t.uuid===s.uuid);if(l!==-1){const t=[...d];t.splice(l,1),b(t)}},children:[e.jsx("span",{children:o}),e.jsx("i",{className:"fa-solid fa-xmark"})]},`selected_fromWallet-${s}`))}),a.length>0)?a:e.jsx(e.Fragment,{})})()]})})]}),e.jsxs("div",{className:" form--group",id:"record_filter-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To Wallet"}),e.jsx("div",{children:e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs(L,{open:C,onOpenChange:ie,children:[e.jsx(k,{asChild:!0,children:e.jsxs(m,{variant:"outline",role:"combobox",className:" flex flex-row gap-1 leading-none p-2 h-auto text-xs",children:[e.jsx("i",{className:"fa-solid fa-plus"}),e.jsx("span",{children:"To Wallet"})]})}),e.jsx($,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(E,{shouldFilter:!1,children:[e.jsx(R,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:_,onValueChange:M}),e.jsx(A,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(W,{children:ge?"Loading...":"No wallet found."}),e.jsx(q,{children:be.map(a=>e.jsxs(F,{value:a==null?void 0:a.uuid,onSelect:s=>{let r={uuid:s,label:a.name},o=x.findIndex(l=>l.uuid===a.uuid);if(x&&o!==-1){const l=[...x];l.splice(o,1),f(l)}else f([...x,r]),he([...me,a==null?void 0:a.name])},children:[e.jsx(I,{className:`mr-2 h-4 w-4 ${x&&x.some(s=>"uuid"in s&&s.uuid===(a==null?void 0:a.uuid))?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${a==null?void 0:a.name}`})]},a==null?void 0:a.uuid))})]})})]})})]}),(()=>{let a=[];return x.length>0&&(x.forEach((s,r)=>{let o=s.label;o&&a.push(e.jsxs(m,{variant:"secondary",className:" flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto",onClick:()=>{let l=x.findIndex(t=>t.uuid===s.uuid);if(l!==-1){const t=[...x];t.splice(l,1),f(t)}},children:[e.jsx("span",{children:o}),e.jsx("i",{className:"fa-solid fa-xmark"})]},`selected_toWallet-${s}`))}),a.length>0)?a:e.jsx(e.Fragment,{})})()]})})]}),e.jsxs("div",{className:" form--group",id:"record_filter-category",children:[e.jsx("label",{className:" form--label",children:"Category"}),e.jsx("div",{children:e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs(L,{open:y,onOpenChange:we,children:[e.jsx(k,{asChild:!0,children:e.jsxs(m,{variant:"outline",role:"combobox",className:" flex flex-row gap-1 leading-none p-2 h-auto text-xs",children:[e.jsx("i",{className:"fa-solid fa-plus"}),e.jsx("span",{children:"Category"})]})}),e.jsx($,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(E,{shouldFilter:!1,children:[e.jsx(R,{placeholder:"Search category",className:" border-none focus:ring-0",value:D,onValueChange:Y}),e.jsx(A,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(W,{children:ve?"Loading...":"No category found."}),e.jsx(q,{children:ye.map(a=>e.jsxs(F,{value:a==null?void 0:a.uuid,onSelect:s=>{let r={uuid:s,label:a.name},o=u.findIndex(l=>l.uuid===a.uuid);if(u&&o!==-1){const l=[...u];l.splice(o,1),g(l)}else g([...u,r]),Ne([...Ce,a==null?void 0:a.name])},children:[e.jsx(I,{className:`mr-2 h-4 w-4 ${u&&u.some(s=>"uuid"in s&&s.uuid===(a==null?void 0:a.uuid))?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${a==null?void 0:a.name}`})]},a==null?void 0:a.uuid))})]})})]})})]}),(()=>{let a=[];return u.length>0&&(u.forEach((s,r)=>{let o=s.label;o&&a.push(e.jsxs(m,{variant:"secondary",className:" flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto",onClick:()=>{let l=u.findIndex(t=>t.uuid===s.uuid);if(l!==-1){const t=[...u];t.splice(l,1),g(t)}},children:[e.jsx("span",{children:o}),e.jsx("i",{className:"fa-solid fa-xmark"})]},`selected_category-${s}`))}),a.length>0)?a:e.jsx(e.Fragment,{})})()]})})]}),e.jsxs("div",{className:" form--group",id:"record_filter-tags",children:[e.jsx("label",{className:" form--label",children:"Tags"}),e.jsx("div",{children:e.jsxs("div",{className:" flex flex-row gap-2 flex-wrap",children:[e.jsxs(L,{open:v,onOpenChange:Le,children:[e.jsx(k,{asChild:!0,children:e.jsxs(m,{variant:"outline",role:"combobox",className:" flex flex-row gap-1 leading-none p-2 h-auto text-xs",children:[e.jsx("i",{className:"fa-solid fa-plus"}),e.jsx("span",{children:"Tags"})]})}),e.jsx($,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(E,{shouldFilter:!1,children:[e.jsx(R,{placeholder:"Search tags",className:" border-none focus:ring-0",value:J,onValueChange:ae}),e.jsx(A,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(W,{children:Ae?"Loading...":"No tags found."}),e.jsx(q,{children:Ee.map(a=>e.jsxs(F,{value:a==null?void 0:a.uuid,onSelect:s=>{let r={uuid:s,label:a.name},o=i.findIndex(l=>l.uuid===a.uuid);if(i&&o!==-1){const l=[...i];l.splice(o,1),j(l)}else j([...i,r]),$e([...ke,a==null?void 0:a.name])},children:[e.jsx(I,{className:`mr-2 h-4 w-4 ${i&&i.some(s=>"uuid"in s&&s.uuid===(a==null?void 0:a.uuid))?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${a==null?void 0:a.name}`})]},a==null?void 0:a.uuid))})]})})]})})]}),(()=>{let a=[];return i.length>0&&(i.forEach((s,r)=>{let o=s.label;o&&a.push(e.jsxs(m,{variant:"secondary",className:" flex flex-row gap-2 items-center text-xs leading-none p-2 h-auto",onClick:()=>{let l=i.findIndex(t=>t.uuid===s.uuid);if(l!==-1){const t=[...i];t.splice(l,1),j(t)}},children:[e.jsx("span",{children:o}),e.jsx("i",{className:"fa-solid fa-xmark"})]},`selected_tags-${s}`))}),a.length>0)?a:e.jsx(e.Fragment,{})})()]})})]})]})]})}),e.jsxs(Ve,{className:" ",children:[e.jsx(m,{variant:"outline",onClick:()=>{B("complete"),b([]),f([]),g([]),j([])},children:"Reset"}),e.jsx(m,{variant:"secondary",onClick:()=>{P(!1)},children:"Close"})]})]})]})}export{Qe as default};