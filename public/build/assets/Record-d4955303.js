import{r,j as e,a as Ie,e as d}from"./app-17d73614.js";import{B as w}from"./button-3f373d9f.js";import{I as Me,u as de,E as b,P as ue,a as xe,C as fe,b as pe,d as he,e as be,f as je,g as we,h as ve,i as Ce,T as Ve,m as Ne}from"./textarea-1abc0be6.js";/* empty css              */import{G as Be}from"./PublicLayout-d6fe9bea.js";import{C as He,a as Pe,e as ze}from"./card-ca01e443.js";import{I as Ue}from"./index-d0f2d8d6.js";import{B as Je}from"./badge-23ba6077.js";function tt({auth:Oe}){const T=Me(({inputRef:s,...l})=>e.jsx(Ue,{...l,ref:s})),[a,$]=r.useState({}),[c,N]=r.useState(0),[F,ge]=r.useState(0),I=(s,l)=>{H instanceof AbortController&&H.abort();let t=l.target,n=t.textContent;if(s==="next"){t.tagName.toLowerCase()==="button"&&t.setAttribute("disabled","disabled"),t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let o=document.querySelector(".quick-action-item.active");if(o){let m=o.dataset.key;if(m){$({});const h=new AbortController;Se(h);let i=new FormData;switch(i.append("key",m),m){case"wallet":{i.append("type",j),i.append("from_wallet",f),i.append("to_wallet",p);break}case"amount":i.append("amount",String(v??0)),i.append("extra_amount",String(C??0)),i.append("extra_type",u)}d.post(route("api.quick-action.v1.record.validation"),i,{cancelToken:new d.CancelToken(function(ne){h.abort=ne})}).then(x=>(x.status===200&&(x.data,N(c+1)),!0)).catch(x=>{var oe;let re=(oe=x.response)==null?void 0:oe.data;re.errors&&$(re.errors),setTimeout(()=>{const ie=document.querySelectorAll("#recordDialog-forms .form--group.is--invalid");ie.length>0&&Array.from(ie).reduce((ce,me)=>ce.offsetTop>me.offsetTop?me:ce).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{t.tagName.toLowerCase()==="button"&&t.removeAttribute("disabled"),n&&(t.innerHTML=n)})}}}else s==="prev"&&c>0&&N(c-1)},M=()=>{let s=document.getElementById("quick-action-wrapper");if(s){let l=s.querySelector(".quick-action-item.active");l&&(s.style.height=`calc(${l.clientHeight+"px"} + 1.5rem)`);let t=s.querySelectorAll(".quick-action-item");if(t.length>0){ge(t.length-1);for(const n of t)n.style.width=`calc(${s.clientWidth}px)`}}};r.useEffect(()=>{M()}),r.useEffect(()=>{let s=document.getElementById("quick-action-container");if(s){let l=s.querySelectorAll(".quick-action-item");if(l[c]){s.style.transform=`translateX(-${l[c].offsetLeft}px)`;let t=s.querySelector(".quick-action-item.active");t&&t.classList.remove("active"),l[c].classList.add("active"),M()}}},[c]);const V=()=>{P("expense"),J(""),Z(""),ae(0),se(0),L("amount"),le("")},[B,ye]=r.useState(null),ke=s=>{let l=s.target,t=l.textContent;l.tagName.toLowerCase()==="button"&&l.setAttribute("disabled","disabled"),l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>',B instanceof AbortController&&B.abort();const n=new AbortController;ye(n);let o=new FormData;o.append("type",j),o.append("from_wallet",f),o.append("to_wallet",p),o.append("amount",String(v??0)),o.append("extra_amount",String(C??0)),o.append("extra_type",u),o.append("timestamp",Ne().format("YYYY-MM-DD HH:mm:ss")),o.append("timezone",Ne.tz.guess()),d.post(route("api.quick-action.v1.record.store"),o,{cancelToken:new d.CancelToken(function(h){n.abort=h})}).then(m=>(m.status===200&&(m.data,V(),N(0)),!0)).catch(m=>{var x;let i=(x=m.response)==null?void 0:x.data;i.errors&&$(i.errors)}).finally(()=>{l.tagName.toLowerCase()==="button"&&l.removeAttribute("disabled"),t&&(l.innerHTML=t)})},[H,Se]=r.useState(null),[j,P]=r.useState("expense");let z;const[g,U]=r.useState(!1),[f,J]=r.useState(""),[O,Y]=r.useState("Select an option"),[_,G]=r.useState([]),[A,Te]=r.useState(""),[$e,K]=r.useState(!1),[y,_e]=r.useState(null),Ae=async(s,l)=>{K(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await d.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new d.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){d.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(z),G([]),g){y&&y.abort();const s=new AbortController;return _e(s),z=setTimeout(()=>{Ae(A,s).then((l=[])=>{K(!1),l&&G(l)}).catch(l=>{})},0),()=>{y&&y.abort()}}},[A,g]),r.useEffect(()=>{if(f!==""&&_.length>0){const s=_.find(l=>(l==null?void 0:l.uuid)===f);s&&Y(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else Y("Select an option")},[f]);let Q;const[k,X]=r.useState(!1),[p,Z]=r.useState(""),[R,D]=r.useState("Select an option"),[W,ee]=r.useState([]),[E,We]=r.useState(""),[Ee,te]=r.useState(!1),[S,Le]=r.useState(null),qe=async(s,l)=>{te(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await d.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new d.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){d.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(Q),ee([]),k){S&&S.abort();const s=new AbortController;return Le(s),Q=setTimeout(()=>{qe(E,s).then((l=[])=>{te(!1),l&&ee(l)}).catch(l=>{})},500),()=>{S&&S.abort()}}},[E,k]),r.useEffect(()=>{if(p!==""&&W.length>0){const s=W.find(l=>(l==null?void 0:l.uuid)===p);s&&D(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else D("Select an option")},[p]);const[v,ae]=r.useState(),[C,se]=r.useState(),[u,L]=r.useState("amount"),Fe=r.useMemo(()=>{let s=v??0,l=C??0;return u==="percentage"&&(l=l*s/100),s+l},[v,C,u]),[q,le]=r.useState();return e.jsxs(Be,{children:[e.jsx(Ie,{title:"Quick Action: Create new Record"}),e.jsx("div",{className:" flex flex-col justify-center items-center h-screen w-screen",children:e.jsx("main",{className:" max-w-[400px] md:min-w-[400px] py-[calc(64px)] px-6",children:e.jsxs(He,{children:[e.jsx(Pe,{className:" pb-2",children:e.jsx("div",{className:" transition-all duration-300 ease-in-out py-6 relative overflow-hidden",id:"quick-action-wrapper",children:e.jsx("div",{className:" absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out",id:"quick-action-container",children:(()=>{let s=[{name:"Step 1",key:"wallet",el:e.jsxs("div",{children:[e.jsxs("div",{className:`form-group mb-4 ${a!=null&&a.type?" is--invalid":""}`,children:[e.jsx("div",{className:` flex flex-row gap-4 w-full border p-1 rounded-md ${a!=null&&a.type?" border-red-500":""}`,id:"record_dialog-type",children:(()=>{let t=[];return["income","transfer","expense"].map((n,o)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${j===n?"bg-gray-200 hover:bg-gray-200":" dark:text-white dark:hover:text-black"} hover:bg-gray-100 transition`,onClick:()=>{P(n)},children:e.jsx("span",{className:" text-sm font-semibold",children:de(n)})},`record_type-${n}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsx(b,{message:a==null?void 0:a.category_id})]}),e.jsxs("div",{className:` form--group  ${a!=null&&a.from_wallet?" is--invalid":""}`,id:"record_dialog-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From"}),e.jsxs("div",{children:[e.jsxs(ue,{open:g,onOpenChange:U,children:[e.jsx(xe,{asChild:!0,children:e.jsxs(w,{variant:"outline",role:"combobox","aria-expanded":g,className:`w-full justify-between ${a!=null&&a.from_wallet?" border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:O}),e.jsx(fe,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(pe,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(he,{shouldFilter:!1,children:[e.jsx(be,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:A,onValueChange:Te}),e.jsx(je,{children:$e?"Loading...":"No wallet found."}),e.jsx(we,{children:_.map(t=>e.jsxs(ve,{value:t==null?void 0:t.uuid,onSelect:n=>{J(n===f?"":n),U(!1)},children:[e.jsx(Ce,{className:`mr-2 h-4 w-4 ${f===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]}),e.jsx(b,{message:a==null?void 0:a.from_wallet})]})]}),(()=>j==="transfer"?e.jsxs("div",{className:` form--group  ${a!=null&&a.to_wallet?" is--invalid":""}`,id:"record_dialog-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To"}),e.jsxs("div",{children:[e.jsxs(ue,{open:k,onOpenChange:X,children:[e.jsx(xe,{asChild:!0,children:e.jsxs(w,{variant:"outline",role:"combobox","aria-expanded":k,className:` w-full justify-between ${a!=null&&a.to_wallet?" border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:R}),e.jsx(fe,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(pe,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(he,{shouldFilter:!1,children:[e.jsx(be,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:E,onValueChange:We}),e.jsx(je,{children:Ee?"Loading...":"No wallet found."}),e.jsx(we,{children:W.map(t=>e.jsxs(ve,{value:t==null?void 0:t.uuid,onSelect:n=>{Z(n===p?"":n),X(!1)},children:[e.jsx(Ce,{className:`mr-2 h-4 w-4 ${p===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]}),e.jsx(b,{message:a==null?void 0:a.to_wallet})]})]}):e.jsx(e.Fragment,{}))()]})},{name:"Step 2",key:"amount",el:e.jsxs("div",{children:[e.jsxs("div",{className:` form--group  ${a!=null&&a.amount?" is--invalid":""}`,id:"record_dialog-amount",children:[e.jsx("label",{className:"form--label",children:"Amount"}),e.jsx(T,{type:"text",placeholder:"Amount",inputMode:"numeric",value:(v??0).toString(),className:`${a!=null&&a.amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),ae(Number(n))}}),e.jsx(b,{message:a==null?void 0:a.amount})]}),e.jsxs("div",{className:" flex flex-col w-full",children:[e.jsx("div",{className:` form--group  ${a!=null&&a.extra_amount?" is--invalid":""}`,id:"record_dialog-extra_amount",children:e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{id:"record_dialog-extra_amount",children:[e.jsx("label",{className:" form--label",children:"Extra"}),e.jsx(T,{type:"text",placeholder:"Extra Amount",inputMode:"numeric",value:(C??0).toString(),className:`${a!=null&&a.extra_amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),se(Number(n))}}),e.jsx(b,{message:a==null?void 0:a.extra_amount})]}),e.jsx("div",{id:"record_dialog-extra_type",children:e.jsxs("span",{className:" text-sm flex flex-row gap-1",children:[e.jsx("span",{className:` cursor-pointer ${u==="amount"?" font-semibold":""}`,onClick:()=>{u!=="amount"&&L("amount")},children:"Amount"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:` cursor-pointer ${u==="percentage"?" font-semibold":""}`,onClick:()=>{u!=="percentage"&&L("percentage")},children:"Percentage"})]})})]})}),e.jsxs("div",{className:` form--group  ${a!=null&&a.final_amount?" is--invalid":""}`,id:"record_dialog-final_amount",children:[e.jsx("label",{className:" form--label",children:"Final"}),e.jsx(T,{type:"text",placeholder:"Final Amount",inputMode:"numeric",value:(Fe??0).toString(),className:`${a!=null&&a.final_amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",disabled:!0}),e.jsx(b,{message:a==null?void 0:a.final_amount})]})]})]})},{name:"Step 3",key:"note",el:e.jsx("div",{children:e.jsxs("div",{className:` form--group  ${a!=null&&a.notes?" is--invalid":""}`,id:"record_dialog-note",children:[e.jsx("label",{className:" form--label",children:"Note"}),e.jsx(Ve,{className:` w-full ${a!=null&&a.notes?" border-red-500":""}`,placeholder:"Type your message here.",value:q,onChange:t=>{le(t.target.value)}}),e.jsx(b,{message:a==null?void 0:a.notes})]})})},{name:"Step 4",key:"review",el:e.jsxs("div",{className:" mb-4",children:[e.jsxs("div",{className:" mb-4",children:[e.jsx("span",{className:" block font-semibold",children:"Type"}),e.jsx(Je,{children:de(j)})]}),e.jsxs("div",{className:" flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:" w-full overflow-hidden",children:[e.jsx("span",{className:" block font-semibold",children:"From Wallet"}),e.jsx("span",{className:" block whitespace-nowrap overflow-hidden w-full text-ellipsis",children:O})]}),(()=>j==="transfer"?e.jsxs("div",{className:" w-full overflow-hidden text-right",children:[e.jsx("span",{className:" block font-semibold",children:"To Wallet"}),e.jsx("span",{className:" whitespace-nowrap",children:R})]}):e.jsx(e.Fragment,{}))()]}),(()=>q?e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed mt-4",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("strong",{children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:q})]}):e.jsx(e.Fragment,{}))()]})}],l=[];return s.forEach((t,n)=>{l.push(e.jsx("section",{className:`quick-action-item ${n===0?"active":""} flex flex-col h-[fit-content] px-1`,"data-key":t.key,children:t.el},`wizzard-step_${n}`))}),l})()})})}),e.jsx(ze,{children:e.jsxs("div",{className:" flex justify-between w-full gap-4",children:[e.jsx(w,{variant:"outline",disabled:c===0,onClick:s=>{I("prev",s)},children:"Prev"}),(()=>c>0?e.jsx(w,{variant:"destructive",className:"w-full",onClick:s=>{V(),N(0)},children:"Reset"}):e.jsx(e.Fragment,{}))(),(()=>c===F?e.jsx(w,{className:" w-1/2",onClick:s=>{ke(s)},children:"Submit"}):e.jsx(w,{variant:"outline",disabled:c===F,onClick:s=>{I("next",s)},children:"Next"}))()]})})]})})})]})}export{tt as default};
