import{r as n,j as e,a as De,d as he,e as x}from"./app-49e19f09.js";import{u as be,C as je,f as P,a as we}from"./index-961138f1.js";import{U as He}from"./index-84c40666.js";import{I as Pe,C as ve,T as Ue,a as ze}from"./theme-toggle-66897dc1.js";/* empty css              */import{E as b}from"./ErrorMessage-9da431ff.js";import{A as Oe}from"./ApplicationLogo-c5ad270c.js";import{G as Ge}from"./PublicLayout-ca1d9922.js";import{C as Je,a as Ye,e as Ve}from"./card-2c105230.js";import{S as U,P as Ne,a as ge,b as ye,C as Ce,c as Se,d as ke,e as Te,f as Ae}from"./scroll-area-8438057d.js";import{B as j}from"./button-8f2a595a.js";import{B as Ke}from"./badge-dbdf798f.js";import{I as Qe}from"./input-d9c06e18.js";/* empty css            */import"./index-61f18b0c.js";import"./dialog-dd6b0ada.js";function pt({auth:Xe}){const T=Pe(({inputRef:o,...s})=>e.jsx(Qe,{...s,ref:o})),[a,A]=n.useState({}),[i,C]=n.useState(0),[z,Fe]=n.useState(0),O=(o,s)=>{V instanceof AbortController&&V.abort();let t=s.target,l=t.textContent;if(o==="next"){t.tagName.toLowerCase()==="button"&&t.setAttribute("disabled","disabled"),t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let r=document.querySelector(".quick-action-item.active");if(r){let c=r.dataset.key;if(c){A({});const y=new AbortController;$e(y);let m=new FormData;switch(m.append("key",c),c){case"wallet":{m.append("type",w),m.append("from_wallet",f),m.append("to_wallet",p);break}case"amount":m.append("amount",String(h??0)),m.append("extra_amount",String(v??0)),m.append("extra_type",u)}x.post(route("api.quick-action.v1.record.validation"),m,{cancelToken:new x.CancelToken(function(H){y.abort=H})}).then(d=>(console.log(d),d.status===200&&(d.data,C(i+1)),!0)).catch(d=>{var ue;const H=d;console.log(d);let de=(ue=H.response)==null?void 0:ue.data;de.errors&&A(de.errors),setTimeout(()=>{const xe=document.querySelectorAll("#recordDialog-forms .form--group.is--invalid");xe.length>0&&Array.from(xe).reduce((fe,pe)=>fe.offsetTop>pe.offsetTop?pe:fe).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{t.tagName.toLowerCase()==="button"&&t.removeAttribute("disabled"),l&&(t.innerHTML=l)})}}}else o==="prev"&&i>0&&C(i-1)},G=()=>{let o=document.getElementById("quick-action-wrapper");if(o){let s=o.querySelector(".quick-action-item.active");if(s){o.style.height=`calc(${s.clientHeight+"px"} + 1.5rem)`;let l=document.getElementById("quick-action-container");l&&(l.style.height=`calc(${s.clientHeight+"px"})`)}let t=o.querySelectorAll(".quick-action-item");if(t.length>0){Fe(t.length-1);for(const l of t)l.style.width=`calc(${o.clientWidth}px)`}}};n.useEffect(()=>{G()}),n.useEffect(()=>{let o=document.getElementById("quick-action-container");if(o){let s=o.querySelectorAll(".quick-action-item");if(s[i]){o.style.transform=`translateX(-${s[i].offsetLeft}px)`;let t=o.querySelector(".quick-action-item.active");t&&t.classList.remove("active"),s[i].classList.add("active"),G()}}},[i]);const J=()=>{K("expense"),F(""),E(""),ie(0),ce(0),M("amount"),me("")},[Y,_e]=n.useState(null),We=o=>{let s=o.target,t=s.textContent;s.tagName.toLowerCase()==="button"&&s.setAttribute("disabled","disabled"),s.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>',Y instanceof AbortController&&Y.abort();const l=new AbortController;_e(l);let r=new FormData;r.append("type",w),r.append("from_wallet",f),r.append("to_wallet",p),r.append("amount",String(h??0)),r.append("extra_amount",String(v??0)),r.append("extra_type",u),r.append("notes",D),r.append("timestamp",we().format("YYYY-MM-DD HH:mm:ss")),r.append("timezone",we.tz.guess()),x.post(route("api.quick-action.v1.record.store"),r,{cancelToken:new x.CancelToken(function(y){l.abort=y})}).then(c=>(c.status===200&&(c.data,He("Action: Success",{description:"Record data successfully saved"}),J(),C(0)),!0)).catch(c=>{var d;let m=(d=c.response)==null?void 0:d.data;m.errors&&A(m.errors)}).finally(()=>{s.tagName.toLowerCase()==="button"&&s.removeAttribute("disabled"),t&&(s.innerHTML=t)})},[V,$e]=n.useState(null),[w,K]=n.useState("expense"),[f,F]=n.useState(""),[Ee,Le]=n.useState(),[N,Q]=n.useState(!1),[_,W]=n.useState("Select an option"),[S,X]=n.useState([]),[$,Z]=n.useState(""),[B,ee]=n.useState(!1),[te,ae]=n.useState(null),Ie=async o=>{const s=new AbortController;ae(s),ee(!0);try{const t=[],l={keyword:o};for(const r in l)t.push(encodeURIComponent(r)+"="+encodeURIComponent(l[r]));try{const r=await x.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{signal:s.signal});return ae(null),r.data.result.data}catch(r){x.isCancel(r)}}catch(t){throw t}return S};n.useEffect(()=>{if(clearTimeout(Ee),te instanceof AbortController&&te.abort(),N){let o=setTimeout(()=>{Ie($).then((s=[])=>{ee(!1),s&&X(s)}).catch(s=>{})},500);Le(o)}},[$,N]),n.useEffect(()=>{Z("")},[N]),n.useEffect(()=>{f===""&&W("Select an option")},[f]);const[p,E]=n.useState(""),[qe,Me]=n.useState(),[g,se]=n.useState(!1),[L,I]=n.useState("Select an option"),[q,le]=n.useState(""),[oe,ne]=n.useState(!1),[k,re]=n.useState(null),Re=async o=>{const s=new AbortController;re(s),ne(!0);try{const t=[],l={keyword:o};for(const r in l)t.push(encodeURIComponent(r)+"="+encodeURIComponent(l[r]));try{const r=await x.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{signal:s.signal});return re(null),r.data.result.data}catch(r){x.isCancel(r)}}catch(t){throw t}return S};n.useEffect(()=>{if(clearTimeout(qe),g){let o=setTimeout(()=>{k instanceof AbortController&&k.abort(),Re(q).then((s=[])=>{ne(!1),s&&X(s)}).catch(s=>{})},500);return Me(o),()=>{k&&k.abort()}}},[q,g]),n.useEffect(()=>{le("")},[g]),n.useEffect(()=>{p===""&&I("Select an option")},[p]);const[h,ie]=n.useState(),[v,ce]=n.useState(),[u,M]=n.useState("amount"),R=n.useMemo(()=>{let o=h??0,s=v??0;return u==="percentage"&&(s=s*o/100),o+s},[h,v,u]),[D,me]=n.useState("");return e.jsxs(Ge,{children:[e.jsx(De,{title:"Quick Action: Create new Record"}),e.jsx("div",{className:" min-h-[100dvh] flex flex-row items-center max-md:items-end",children:e.jsx(U,{className:"p-0 w-full",children:e.jsx("div",{className:" flex flex-col justify-center items-center max-md:mt-auto",children:e.jsxs("main",{className:" w-full md:max-w-[420px] md:min-w-[420px] px-6 md:px-6 max-md:my-10 max-h-screen",children:[e.jsx("div",{className:" mb-4",children:e.jsx(he,{href:route("sys.index"),children:e.jsx(Oe,{fontSizeMain:" text-3xl"})})}),e.jsxs("div",{className:" flex flex-col gap-2",children:[e.jsxs(Je,{children:[e.jsx(Ye,{className:" pb-2",children:e.jsx("div",{className:" transition-all duration-300 ease-in-out py-6 relative overflow-x-clip",id:"quick-action-wrapper",children:e.jsx("div",{className:" absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out",id:"quick-action-container",children:(()=>{let o=[{name:"Step 1",key:"wallet",el:e.jsxs("div",{children:[e.jsxs("div",{className:`form-group mb-4 ${a!=null&&a.type?" is--invalid":""}`,children:[e.jsx("div",{className:` flex flex-row gap-4 w-full border p-1 rounded-md ${a!=null&&a.type?" !border-red-500":""}`,id:"record_dialog-type",children:(()=>{let t=[];return["income","transfer","expense"].map((l,r)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${w===l?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{K(l)},children:e.jsx("span",{className:" text-sm font-semibold",children:be(l)})},`record_type-${l}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsx(b,{message:a==null?void 0:a.category_id})]}),e.jsxs("div",{className:` form--group  ${a!=null&&a.from_wallet?" is--invalid":""}`,id:"record_dialog-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From"}),e.jsxs("div",{children:[e.jsxs(Ne,{open:N,onOpenChange:Q,children:[e.jsx(ge,{asChild:!0,children:e.jsxs(j,{variant:"outline",role:"combobox","aria-expanded":N,className:`w-full justify-between ${a!=null&&a.from_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:_}),e.jsx(ve,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(ye,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(Ce,{shouldFilter:!1,children:[e.jsx(Se,{placeholder:"Search wallet",className:` border-none focus:ring-0 ${B?"is-loading":""}`,value:$,onValueChange:Z}),e.jsx(U,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ke,{children:B?"Loading...":"No wallet found."}),e.jsx(Te,{children:S.map(t=>e.jsxs(Ae,{value:t==null?void 0:t.uuid,onSelect:l=>{W(t.name),F(l===f?"":l),Q(!1)},children:[e.jsx(je,{className:`mr-2 h-4 w-4 ${f===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:t==null?void 0:t.name})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(b,{message:a==null?void 0:a.from_wallet})]})]}),(()=>w==="transfer"?e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsx(j,{variant:"outline",className:" inline-flex w-max",onClick:()=>{let t={option:p,label:L};E(f),I(_),F(t.option),W(t.label)},type:"button",children:"Switch"}),e.jsxs("div",{className:` form--group  ${a!=null&&a.to_wallet?" is--invalid":""}`,id:"record_dialog-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To"}),e.jsxs("div",{children:[e.jsxs(Ne,{open:g,onOpenChange:se,children:[e.jsx(ge,{asChild:!0,children:e.jsxs(j,{variant:"outline",role:"combobox","aria-expanded":g,className:` w-full justify-between ${a!=null&&a.to_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:L}),e.jsx(ve,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(ye,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(Ce,{shouldFilter:!1,children:[e.jsx(Se,{placeholder:"Search wallet",className:` border-none focus:ring-0 ${oe?"is-loading":""}`,value:q,onValueChange:le}),e.jsx(U,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ke,{children:oe?"Loading...":"No wallet found."}),e.jsx(Te,{children:S.map(t=>e.jsxs(Ae,{value:t==null?void 0:t.uuid,onSelect:l=>{I(t.name),E(l===p?"":l),se(!1)},children:[e.jsx(je,{className:`mr-2 h-4 w-4 ${p===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:t==null?void 0:t.name})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(b,{message:a==null?void 0:a.to_wallet})]})]})]}):e.jsx(e.Fragment,{}))()]})},{name:"Step 2",key:"amount",el:e.jsxs("div",{children:[e.jsxs("div",{className:` form--group  ${a!=null&&a.amount?" is--invalid":""}`,id:"record_dialog-amount",children:[e.jsx("label",{className:"form--label",children:"Amount"}),e.jsx(T,{type:"text",placeholder:"Amount",inputMode:"numeric",value:(h??0).toString(),className:`${a!=null&&a.amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let l=t.target.value;l=l.replace(",",""),ie(Number(l))}}),e.jsx(b,{message:a==null?void 0:a.amount})]}),e.jsxs("div",{className:" flex flex-col w-full",children:[e.jsx("div",{className:` form--group  ${a!=null&&a.extra_amount?" is--invalid":""}`,id:"record_dialog-extra_amount",children:e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{id:"record_dialog-extra_amount",children:[e.jsx("label",{className:" form--label",children:"Extra"}),e.jsx(T,{type:"text",placeholder:"Extra Amount",inputMode:"numeric",value:(v??0).toString(),className:`${a!=null&&a.extra_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let l=t.target.value;l=l.replace(",",""),ce(Number(l))}}),e.jsx(b,{message:a==null?void 0:a.extra_amount})]}),e.jsx("div",{id:"record_dialog-extra_type",children:e.jsxs("span",{className:" text-sm flex flex-row gap-1",children:[e.jsx("span",{className:` cursor-pointer ${u==="amount"?" font-semibold":""}`,onClick:()=>{u!=="amount"&&M("amount")},children:"Amount"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:` cursor-pointer ${u==="percentage"?" font-semibold":""}`,onClick:()=>{u!=="percentage"&&M("percentage")},children:"Percentage"})]})})]})}),e.jsxs("div",{className:` form--group  ${a!=null&&a.final_amount?" is--invalid":""}`,id:"record_dialog-final_amount",children:[e.jsx("label",{className:" form--label",children:"Final"}),e.jsx(T,{type:"text",placeholder:"Final Amount",inputMode:"numeric",value:(R??0).toString(),className:`${a!=null&&a.final_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",disabled:!0}),e.jsx(b,{message:a==null?void 0:a.final_amount})]})]})]})},{name:"Step 3",key:"note",el:e.jsx("div",{children:e.jsxs("div",{className:` form--group  ${a!=null&&a.notes?" is--invalid":""}`,id:"record_dialog-note",children:[e.jsx("label",{className:" form--label",children:"Note"}),e.jsx(Ue,{className:` w-full ${a!=null&&a.notes?" !border-red-500":""}`,placeholder:"Type your message here.",value:D,onChange:t=>{me(t.target.value)}}),e.jsx(b,{message:a==null?void 0:a.notes})]})})},{name:"Step 4",key:"review",el:e.jsxs("div",{className:" mb-4",children:[e.jsxs("div",{className:" mb-4",children:[e.jsx("span",{className:" block font-semibold",children:"Type"}),e.jsx(Ke,{children:be(w)})]}),e.jsxs("div",{className:" flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:" w-full overflow-hidden",children:[e.jsx("span",{className:" block font-semibold",children:"From Wallet"}),e.jsx("span",{className:" block whitespace-nowrap overflow-hidden w-full text-ellipsis",children:_})]}),(()=>w==="transfer"?e.jsxs("div",{className:" w-full overflow-hidden text-right",children:[e.jsx("span",{className:" block font-semibold",children:"To Wallet"}),e.jsx("span",{className:" whitespace-nowrap",children:L})]}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed mt-4",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("strong",{children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:D??"No description provided"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:P(h??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>u==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",v??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:P((R??0)-(h??0))})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:P(R??0)})]})]})]})}],s=[];return o.forEach((t,l)=>{s.push(e.jsx("section",{className:`quick-action-item ${l===0?"active":""} flex flex-col h-[fit-content] px-1`,"data-key":t.key,children:t.el},`wizzard-step_${l}`))}),s})()})})}),e.jsx(Ve,{children:e.jsxs("div",{className:" flex justify-between w-full gap-4",children:[e.jsx("div",{className:" w-5/12",children:e.jsx(j,{variant:"outline",className:i===0?" !opacity-0":"",disabled:i===0,onClick:o=>{O("prev",o)},children:"Prev"})}),(()=>i>0?e.jsx(j,{variant:"ghost",className:"w-3/12",onClick:o=>{J(),C(0)},children:e.jsx("span",{className:"text-destructive",children:"Reset"})}):e.jsx(e.Fragment,{}))(),e.jsx("div",{className:" w-5/12 flex flex-col items-end",children:(()=>i===z?e.jsx(j,{className:" w-full",onClick:o=>{We(o)},children:"Submit"}):e.jsx(j,{variant:"outline",disabled:i===z,onClick:o=>{O("next",o)},children:"Next"}))()})]})})]}),e.jsxs("div",{className:"  flex flex-col gap-6 w-full text-center",children:[e.jsx(he,{href:route("sys.index"),className:"dark:text-white",children:"Go to Dashboard"}),e.jsx("div",{className:" flex flex-row gap-4 rounded border p-2 dark:text-white",children:e.jsx(ze,{className:" flex flex-row gap-2 w-full"})})]})]})]})})})})]})}export{pt as default};