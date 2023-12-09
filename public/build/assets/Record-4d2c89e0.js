import{r as n,j as e,a as He,d as ue,e as u}from"./app-643b45d1.js";import{u as xe,C as fe,f as P,a as pe}from"./function-579bbfa0.js";import{u as Pe,A as ze}from"./ApplicationLogo-f57477a1.js";import{I as Oe,E as j,C as he,T as Ue,a as Ge}from"./theme-toggle-54f870e3.js";import"./siaji-712147e8.js";import{G as Je}from"./PublicLayout-ca2840f2.js";import{C as Ye,a as Ve,e as Ke}from"./card-ea509320.js";import{S as z,P as be,a as je,b as we,C as ve,c as Ne,d as ye,e as ge,f as Ce}from"./scroll-area-3beb2520.js";import{B as w}from"./button-2abb1b99.js";import{B as Qe}from"./badge-4a0438fb.js";import{I as Xe}from"./input-84153507.js";/* empty css            */import"./x-cddf793a.js";function xt({auth:Ze}){const{toast:ke}=Pe(),T=Oe(({inputRef:s,...l})=>e.jsx(Xe,{...l,ref:s})),[a,A]=n.useState({}),[c,C]=n.useState(0),[O,Se]=n.useState(0),U=(s,l)=>{V instanceof AbortController&&V.abort();let t=l.target,o=t.textContent;if(s==="next"){t.tagName.toLowerCase()==="button"&&t.setAttribute("disabled","disabled"),t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let r=document.querySelector(".quick-action-item.active");if(r){let m=r.dataset.key;if(m){A({});const b=new AbortController;Fe(b);let i=new FormData;switch(i.append("key",m),m){case"wallet":{i.append("type",v),i.append("from_wallet",f),i.append("to_wallet",p);break}case"amount":i.append("amount",String(h??0)),i.append("extra_amount",String(N??0)),i.append("extra_type",x)}u.post(route("api.quick-action.v1.record.validation"),i,{cancelToken:new u.CancelToken(function(H){b.abort=H})}).then(d=>(console.log(d),d.status===200&&(d.data,C(c+1)),!0)).catch(d=>{var ie;const H=d;console.log(d);let re=(ie=H.response)==null?void 0:ie.data;re.errors&&A(re.errors),setTimeout(()=>{const ce=document.querySelectorAll("#recordDialog-forms .form--group.is--invalid");ce.length>0&&Array.from(ce).reduce((me,de)=>me.offsetTop>de.offsetTop?de:me).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{t.tagName.toLowerCase()==="button"&&t.removeAttribute("disabled"),o&&(t.innerHTML=o)})}}}else s==="prev"&&c>0&&C(c-1)},G=()=>{let s=document.getElementById("quick-action-wrapper");if(s){let l=s.querySelector(".quick-action-item.active");if(l){s.style.height=`calc(${l.clientHeight+"px"} + 1.5rem)`;let o=document.getElementById("quick-action-container");o&&(o.style.height=`calc(${l.clientHeight+"px"})`)}let t=s.querySelectorAll(".quick-action-item");if(t.length>0){Se(t.length-1);for(const o of t)o.style.width=`calc(${s.clientWidth}px)`}}};n.useEffect(()=>{G()}),n.useEffect(()=>{let s=document.getElementById("quick-action-container");if(s){let l=s.querySelectorAll(".quick-action-item");if(l[c]){s.style.transform=`translateX(-${l[c].offsetLeft}px)`;let t=s.querySelector(".quick-action-item.active");t&&t.classList.remove("active"),l[c].classList.add("active"),G()}}},[c]);const J=()=>{K("expense"),F(""),L(""),le(0),oe(0),M("amount"),ne("")},[Y,Te]=n.useState(null),Ae=s=>{let l=s.target,t=l.textContent;l.tagName.toLowerCase()==="button"&&l.setAttribute("disabled","disabled"),l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>',Y instanceof AbortController&&Y.abort();const o=new AbortController;Te(o);let r=new FormData;r.append("type",v),r.append("from_wallet",f),r.append("to_wallet",p),r.append("amount",String(h??0)),r.append("extra_amount",String(N??0)),r.append("extra_type",x),r.append("notes",D),r.append("timestamp",pe().format("YYYY-MM-DD HH:mm:ss")),r.append("timezone",pe.tz.guess()),u.post(route("api.quick-action.v1.record.store"),r,{cancelToken:new u.CancelToken(function(b){o.abort=b})}).then(m=>(m.status===200&&(m.data,ke({title:"Action: Success",description:"Record data successfully saved"}),J(),C(0)),!0)).catch(m=>{var d;let i=(d=m.response)==null?void 0:d.data;i.errors&&A(i.errors)}).finally(()=>{l.tagName.toLowerCase()==="button"&&l.removeAttribute("disabled"),t&&(l.innerHTML=t)})},[V,Fe]=n.useState(null),[v,K]=n.useState("expense"),[f,F]=n.useState("");let Q;const[y,X]=n.useState(!1),[_,W]=n.useState("Select an option"),[_e,We]=n.useState([]),[E,Z]=n.useState(""),[Ee,B]=n.useState(!1),[k,Le]=n.useState(null),$e=async(s,l)=>{B(!0);try{const t=[],o={keyword:s};for(const r in o)t.push(encodeURIComponent(r)+"="+encodeURIComponent(o[r]));try{return(await u.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new u.CancelToken(function(i){l.abort=i})})).data.result.data}catch(r){u.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}}catch(t){throw console.error("Request error:",t),t}return[]};n.useEffect(()=>{if(clearTimeout(Q),y){k&&k.abort();const s=new AbortController;return Le(s),Q=setTimeout(()=>{$e(E,s).then((l=[])=>{B(!1),l&&We(l)}).catch(l=>{})},0),()=>{k&&k.abort()}}},[E,y]),n.useEffect(()=>{Z("")},[y]),n.useEffect(()=>{f===""&&W("Select an option")},[f]);const[p,L]=n.useState("");let ee;const[g,te]=n.useState(!1),[$,q]=n.useState("Select an option"),[qe,Ie]=n.useState([]),[I,ae]=n.useState(""),[Me,se]=n.useState(!1),[S,Re]=n.useState(null),De=async(s,l)=>{se(!0);try{const t=[],o={keyword:s};for(const r in o)t.push(encodeURIComponent(r)+"="+encodeURIComponent(o[r]));try{return(await u.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new u.CancelToken(function(i){l.abort=i})})).data.result.data}catch(r){u.isCancel(r)?console.log("Request was canceled",r):console.error("Error:",r)}}catch(t){throw console.error("Request error:",t),t}return[]};n.useEffect(()=>{if(clearTimeout(ee),g){S&&S.abort();const s=new AbortController;return Re(s),ee=setTimeout(()=>{De(I,s).then((l=[])=>{se(!1),l&&Ie(l)}).catch(l=>{})},500),()=>{S&&S.abort()}}},[I,g]),n.useEffect(()=>{ae("")},[g]),n.useEffect(()=>{p===""&&q("Select an option")},[p]);const[h,le]=n.useState(),[N,oe]=n.useState(),[x,M]=n.useState("amount"),R=n.useMemo(()=>{let s=h??0,l=N??0;return x==="percentage"&&(l=l*s/100),s+l},[h,N,x]),[D,ne]=n.useState("");return e.jsxs(Je,{children:[e.jsx(He,{title:"Quick Action: Create new Record"}),e.jsx("div",{className:" min-h-[100dvh] flex flex-row items-center max-md:items-end",children:e.jsx(z,{className:"p-0 w-full",children:e.jsx("div",{className:" flex flex-col justify-center items-center max-md:mt-auto",children:e.jsxs("main",{className:" w-full md:max-w-[420px] md:min-w-[420px] px-6 md:px-6 max-md:my-10 max-h-screen",children:[e.jsx("div",{className:" mb-4",children:e.jsx(ue,{href:route("sys.index"),children:e.jsx(ze,{fontSizeMain:" text-3xl"})})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs(Ye,{children:[e.jsx(Ve,{className:" pb-2",children:e.jsx("div",{className:" transition-all duration-300 ease-in-out py-6 relative overflow-x-clip",id:"quick-action-wrapper",children:e.jsx("div",{className:" absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out",id:"quick-action-container",children:(()=>{let s=[{name:"Step 1",key:"wallet",el:e.jsxs("div",{children:[e.jsxs("div",{className:`form-group mb-4 ${a!=null&&a.type?" is--invalid":""}`,children:[e.jsx("div",{className:` flex flex-row gap-4 w-full border p-1 rounded-md ${a!=null&&a.type?" !border-red-500":""}`,id:"record_dialog-type",children:(()=>{let t=[];return["income","transfer","expense"].map((o,r)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${v===o?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{K(o)},children:e.jsx("span",{className:" text-sm font-semibold",children:xe(o)})},`record_type-${o}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsx(j,{message:a==null?void 0:a.category_id})]}),e.jsxs("div",{className:` form--group  ${a!=null&&a.from_wallet?" is--invalid":""}`,id:"record_dialog-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From"}),e.jsxs("div",{children:[e.jsxs(be,{open:y,onOpenChange:X,children:[e.jsx(je,{asChild:!0,children:e.jsxs(w,{variant:"outline",role:"combobox","aria-expanded":y,className:`w-full justify-between ${a!=null&&a.from_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:_}),e.jsx(he,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(we,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(ve,{shouldFilter:!1,children:[e.jsx(Ne,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:E,onValueChange:Z}),e.jsx(z,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ye,{children:Ee?"Loading...":"No wallet found."}),e.jsx(ge,{children:_e.map(t=>e.jsxs(Ce,{value:t==null?void 0:t.uuid,onSelect:o=>{W(t.name),F(o===f?"":o),X(!1)},children:[e.jsx(fe,{className:`mr-2 h-4 w-4 ${f===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:t==null?void 0:t.name})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(j,{message:a==null?void 0:a.from_wallet})]})]}),(()=>v==="transfer"?e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsx(w,{variant:"outline",className:" inline-flex w-max",onClick:()=>{let t={option:p,label:$};L(f),q(_),F(t.option),W(t.label)},type:"button",children:"Switch"}),e.jsxs("div",{className:` form--group  ${a!=null&&a.to_wallet?" is--invalid":""}`,id:"record_dialog-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To"}),e.jsxs("div",{children:[e.jsxs(be,{open:g,onOpenChange:te,children:[e.jsx(je,{asChild:!0,children:e.jsxs(w,{variant:"outline",role:"combobox","aria-expanded":g,className:` w-full justify-between ${a!=null&&a.to_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:$}),e.jsx(he,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(we,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(ve,{shouldFilter:!1,children:[e.jsx(Ne,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:I,onValueChange:ae}),e.jsx(z,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ye,{children:Me?"Loading...":"No wallet found."}),e.jsx(ge,{children:qe.map(t=>e.jsxs(Ce,{value:t==null?void 0:t.uuid,onSelect:o=>{q(t.name),L(o===p?"":o),te(!1)},children:[e.jsx(fe,{className:`mr-2 h-4 w-4 ${p===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:t==null?void 0:t.name})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(j,{message:a==null?void 0:a.to_wallet})]})]})]}):e.jsx(e.Fragment,{}))()]})},{name:"Step 2",key:"amount",el:e.jsxs("div",{children:[e.jsxs("div",{className:` form--group  ${a!=null&&a.amount?" is--invalid":""}`,id:"record_dialog-amount",children:[e.jsx("label",{className:"form--label",children:"Amount"}),e.jsx(T,{type:"text",placeholder:"Amount",inputMode:"numeric",value:(h??0).toString(),className:`${a!=null&&a.amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let o=t.target.value;o=o.replace(",",""),le(Number(o))}}),e.jsx(j,{message:a==null?void 0:a.amount})]}),e.jsxs("div",{className:" flex flex-col w-full",children:[e.jsx("div",{className:` form--group  ${a!=null&&a.extra_amount?" is--invalid":""}`,id:"record_dialog-extra_amount",children:e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{id:"record_dialog-extra_amount",children:[e.jsx("label",{className:" form--label",children:"Extra"}),e.jsx(T,{type:"text",placeholder:"Extra Amount",inputMode:"numeric",value:(N??0).toString(),className:`${a!=null&&a.extra_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let o=t.target.value;o=o.replace(",",""),oe(Number(o))}}),e.jsx(j,{message:a==null?void 0:a.extra_amount})]}),e.jsx("div",{id:"record_dialog-extra_type",children:e.jsxs("span",{className:" text-sm flex flex-row gap-1",children:[e.jsx("span",{className:` cursor-pointer ${x==="amount"?" font-semibold":""}`,onClick:()=>{x!=="amount"&&M("amount")},children:"Amount"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:` cursor-pointer ${x==="percentage"?" font-semibold":""}`,onClick:()=>{x!=="percentage"&&M("percentage")},children:"Percentage"})]})})]})}),e.jsxs("div",{className:` form--group  ${a!=null&&a.final_amount?" is--invalid":""}`,id:"record_dialog-final_amount",children:[e.jsx("label",{className:" form--label",children:"Final"}),e.jsx(T,{type:"text",placeholder:"Final Amount",inputMode:"numeric",value:(R??0).toString(),className:`${a!=null&&a.final_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",disabled:!0}),e.jsx(j,{message:a==null?void 0:a.final_amount})]})]})]})},{name:"Step 3",key:"note",el:e.jsx("div",{children:e.jsxs("div",{className:` form--group  ${a!=null&&a.notes?" is--invalid":""}`,id:"record_dialog-note",children:[e.jsx("label",{className:" form--label",children:"Note"}),e.jsx(Ue,{className:` w-full ${a!=null&&a.notes?" !border-red-500":""}`,placeholder:"Type your message here.",value:D,onChange:t=>{ne(t.target.value)}}),e.jsx(j,{message:a==null?void 0:a.notes})]})})},{name:"Step 4",key:"review",el:e.jsxs("div",{className:" mb-4",children:[e.jsxs("div",{className:" mb-4",children:[e.jsx("span",{className:" block font-semibold",children:"Type"}),e.jsx(Qe,{children:xe(v)})]}),e.jsxs("div",{className:" flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:" w-full overflow-hidden",children:[e.jsx("span",{className:" block font-semibold",children:"From Wallet"}),e.jsx("span",{className:" block whitespace-nowrap overflow-hidden w-full text-ellipsis",children:_})]}),(()=>v==="transfer"?e.jsxs("div",{className:" w-full overflow-hidden text-right",children:[e.jsx("span",{className:" block font-semibold",children:"To Wallet"}),e.jsx("span",{className:" whitespace-nowrap",children:$})]}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed mt-4",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("strong",{children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:D??"No description provided"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:P(h??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>x==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",N??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:P((R??0)-(h??0))})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:P(R??0)})]})]})]})}],l=[];return s.forEach((t,o)=>{l.push(e.jsx("section",{className:`quick-action-item ${o===0?"active":""} flex flex-col h-[fit-content] px-1`,"data-key":t.key,children:t.el},`wizzard-step_${o}`))}),l})()})})}),e.jsx(Ke,{children:e.jsxs("div",{className:" flex justify-between w-full gap-4",children:[e.jsx("div",{className:" w-5/12",children:e.jsx(w,{variant:"outline",className:c===0?" !opacity-0":"",disabled:c===0,onClick:s=>{U("prev",s)},children:"Prev"})}),(()=>c>0?e.jsx(w,{variant:"ghost",className:"w-3/12",onClick:s=>{J(),C(0)},children:e.jsx("span",{className:"text-destructive",children:"Reset"})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" w-5/12 flex flex-col items-end",children:(()=>c===O?e.jsx(w,{className:" w-full",onClick:s=>{Ae(s)},children:"Submit"}):e.jsx(w,{variant:"outline",disabled:c===O,onClick:s=>{U("next",s)},children:"Next"}))()})]})})]}),e.jsxs("div",{className:"  flex flex-col gap-6 w-full text-center",children:[e.jsx(ue,{href:route("sys.index"),className:"dark:text-white",children:"Go to Dashboard"}),e.jsx("div",{className:" flex flex-row gap-4 rounded border p-2 dark:text-white",children:e.jsx(Ge,{className:" flex flex-row gap-2 w-full"})})]})]})]})})})})]})}export{xt as default};
