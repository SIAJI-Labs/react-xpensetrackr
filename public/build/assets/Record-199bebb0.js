import{r,j as e,a as Ve,d as Be,e as d}from"./app-5552f331.js";import{u as He,A as Pe}from"./ApplicationLogo-fc7a4aa2.js";import{u as xe,f as F,m as fe}from"./function-6b0ad136.js";import{B as N}from"./button-e62a8511.js";import{I as ze,E as j,P as pe,a as he,C as be,b as je,c as we,d as ve,e as Ne,f as Ce,g as ye,T as Ue}from"./textarea-fde31245.js";import{G as Ge}from"./PublicLayout-1d27cc3b.js";import{C as Je,a as Oe,e as Ye}from"./card-1260b71b.js";import{B as Ke}from"./badge-fc18d584.js";import{I as Qe}from"./input-50ab338a.js";import{C as ge}from"./Combination-599f7e70.js";function it({auth:Xe}){const{toast:ke}=He(),T=ze(({inputRef:s,...l})=>e.jsx(Qe,{...l,ref:s})),[a,$]=r.useState({}),[c,C]=r.useState(0),[I,Se]=r.useState(0),M=(s,l)=>{P instanceof AbortController&&P.abort();let t=l.target,n=t.textContent;if(s==="next"){t.tagName.toLowerCase()==="button"&&t.setAttribute("disabled","disabled"),t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let o=document.querySelector(".quick-action-item.active");if(o){let m=o.dataset.key;if(m){$({});const b=new AbortController;Ae(b);let i=new FormData;switch(i.append("key",m),m){case"wallet":{i.append("type",w),i.append("from_wallet",f),i.append("to_wallet",p);break}case"amount":i.append("amount",String(h??0)),i.append("extra_amount",String(v??0)),i.append("extra_type",u)}d.post(route("api.quick-action.v1.record.validation"),i,{cancelToken:new d.CancelToken(function(oe){b.abort=oe})}).then(x=>(x.status===200&&(x.data,C(c+1)),!0)).catch(x=>{var ce;let ie=(ce=x.response)==null?void 0:ce.data;ie.errors&&$(ie.errors),setTimeout(()=>{const me=document.querySelectorAll("#recordDialog-forms .form--group.is--invalid");me.length>0&&Array.from(me).reduce((de,ue)=>de.offsetTop>ue.offsetTop?ue:de).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{t.tagName.toLowerCase()==="button"&&t.removeAttribute("disabled"),n&&(t.innerHTML=n)})}}}else s==="prev"&&c>0&&C(c-1)},V=()=>{let s=document.getElementById("quick-action-wrapper");if(s){let l=s.querySelector(".quick-action-item.active");l&&(s.style.height=`calc(${l.clientHeight+"px"} + 1.5rem)`);let t=s.querySelectorAll(".quick-action-item");if(t.length>0){Se(t.length-1);for(const n of t)n.style.width=`calc(${s.clientWidth}px)`}}};r.useEffect(()=>{V()}),r.useEffect(()=>{let s=document.getElementById("quick-action-container");if(s){let l=s.querySelectorAll(".quick-action-item");if(l[c]){s.style.transform=`translateX(-${l[c].offsetLeft}px)`;let t=s.querySelector(".quick-action-item.active");t&&t.classList.remove("active"),l[c].classList.add("active"),V()}}},[c]);const B=()=>{z("expense"),J(""),R(""),se(0),le(0),L("amount"),re("")},[H,Te]=r.useState(null),$e=s=>{let l=s.target,t=l.textContent;l.tagName.toLowerCase()==="button"&&l.setAttribute("disabled","disabled"),l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>',H instanceof AbortController&&H.abort();const n=new AbortController;Te(n);let o=new FormData;o.append("type",w),o.append("from_wallet",f),o.append("to_wallet",p),o.append("amount",String(h??0)),o.append("extra_amount",String(v??0)),o.append("extra_type",u),o.append("timestamp",fe().format("YYYY-MM-DD HH:mm:ss")),o.append("timezone",fe.tz.guess()),d.post(route("api.quick-action.v1.record.store"),o,{cancelToken:new d.CancelToken(function(b){n.abort=b})}).then(m=>(m.status===200&&(m.data,ke({title:"Action: Success",description:"Record data successfully saved"}),B(),C(0)),!0)).catch(m=>{var x;let i=(x=m.response)==null?void 0:x.data;i.errors&&$(i.errors)}).finally(()=>{l.tagName.toLowerCase()==="button"&&l.removeAttribute("disabled"),t&&(l.innerHTML=t)})},[P,Ae]=r.useState(null),[w,z]=r.useState("expense");let U;const[y,G]=r.useState(!1),[f,J]=r.useState(""),[O,Y]=r.useState("Select an option"),[A,K]=r.useState([]),[_,_e]=r.useState(""),[We,Q]=r.useState(!1),[g,Ee]=r.useState(null),Le=async(s,l)=>{Q(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await d.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new d.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){d.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(U),K([]),y){g&&g.abort();const s=new AbortController;return Ee(s),U=setTimeout(()=>{Le(_,s).then((l=[])=>{Q(!1),l&&K(l)}).catch(l=>{})},0),()=>{g&&g.abort()}}},[_,y]),r.useEffect(()=>{if(f!==""&&A.length>0){const s=A.find(l=>(l==null?void 0:l.uuid)===f);s&&Y(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else Y("Select an option")},[f]);let X;const[k,Z]=r.useState(!1),[p,R]=r.useState(""),[D,ee]=r.useState("Select an option"),[W,te]=r.useState([]),[E,qe]=r.useState(""),[Fe,ae]=r.useState(!1),[S,Ie]=r.useState(null),Me=async(s,l)=>{ae(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await d.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new d.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){d.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(X),te([]),k){S&&S.abort();const s=new AbortController;return Ie(s),X=setTimeout(()=>{Me(E,s).then((l=[])=>{ae(!1),l&&te(l)}).catch(l=>{})},500),()=>{S&&S.abort()}}},[E,k]),r.useEffect(()=>{if(p!==""&&W.length>0){const s=W.find(l=>(l==null?void 0:l.uuid)===p);s&&ee(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else ee("Select an option")},[p]);const[h,se]=r.useState(),[v,le]=r.useState(),[u,L]=r.useState("amount"),q=r.useMemo(()=>{let s=h??0,l=v??0;return u==="percentage"&&(l=l*s/100),s+l},[h,v,u]),[ne,re]=r.useState();return e.jsxs(Ge,{children:[e.jsx(Ve,{title:"Quick Action: Create new Record"}),e.jsx("div",{className:" flex flex-col justify-center items-center h-screen w-screen",children:e.jsxs("main",{className:" max-w-[400px] md:min-w-[400px] py-[calc(64px)] px-6",children:[e.jsx("div",{className:" mb-4",children:e.jsx(Pe,{fontSizeMain:" text-3xl"})}),e.jsxs(Je,{children:[e.jsx(Oe,{className:" pb-2",children:e.jsx("div",{className:" transition-all duration-300 ease-in-out py-6 relative overflow-hidden",id:"quick-action-wrapper",children:e.jsx("div",{className:" absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out",id:"quick-action-container",children:(()=>{let s=[{name:"Step 1",key:"wallet",el:e.jsxs("div",{children:[e.jsxs("div",{className:`form-group mb-4 ${a!=null&&a.type?" is--invalid":""}`,children:[e.jsx("div",{className:` flex flex-row gap-4 w-full border p-1 rounded-md ${a!=null&&a.type?" border-red-500":""}`,id:"record_dialog-type",children:(()=>{let t=[];return["income","transfer","expense"].map((n,o)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${w===n?"bg-gray-200 hover:bg-gray-200":" dark:text-white dark:hover:text-black"} hover:bg-gray-100 transition`,onClick:()=>{z(n)},children:e.jsx("span",{className:" text-sm font-semibold",children:xe(n)})},`record_type-${n}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsx(j,{message:a==null?void 0:a.category_id})]}),e.jsxs("div",{className:` form--group  ${a!=null&&a.from_wallet?" is--invalid":""}`,id:"record_dialog-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From"}),e.jsxs("div",{children:[e.jsxs(pe,{open:y,onOpenChange:G,children:[e.jsx(he,{asChild:!0,children:e.jsxs(N,{variant:"outline",role:"combobox","aria-expanded":y,className:`w-full justify-between ${a!=null&&a.from_wallet?" border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:O}),e.jsx(be,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(je,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(we,{shouldFilter:!1,children:[e.jsx(ve,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:_,onValueChange:_e}),e.jsx(Ne,{children:We?"Loading...":"No wallet found."}),e.jsx(Ce,{children:A.map(t=>e.jsxs(ye,{value:t==null?void 0:t.uuid,onSelect:n=>{J(n===f?"":n),G(!1)},children:[e.jsx(ge,{className:`mr-2 h-4 w-4 ${f===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]}),e.jsx(j,{message:a==null?void 0:a.from_wallet})]})]}),(()=>w==="transfer"?e.jsxs("div",{className:` form--group  ${a!=null&&a.to_wallet?" is--invalid":""}`,id:"record_dialog-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To"}),e.jsxs("div",{children:[e.jsxs(pe,{open:k,onOpenChange:Z,children:[e.jsx(he,{asChild:!0,children:e.jsxs(N,{variant:"outline",role:"combobox","aria-expanded":k,className:` w-full justify-between ${a!=null&&a.to_wallet?" border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:D}),e.jsx(be,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(je,{className:" w-[300px] lg:w-[400px] p-0",align:"start",children:e.jsxs(we,{shouldFilter:!1,children:[e.jsx(ve,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:E,onValueChange:qe}),e.jsx(Ne,{children:Fe?"Loading...":"No wallet found."}),e.jsx(Ce,{children:W.map(t=>e.jsxs(ye,{value:t==null?void 0:t.uuid,onSelect:n=>{R(n===p?"":n),Z(!1)},children:[e.jsx(ge,{className:`mr-2 h-4 w-4 ${p===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]}),e.jsx(j,{message:a==null?void 0:a.to_wallet})]})]}):e.jsx(e.Fragment,{}))()]})},{name:"Step 2",key:"amount",el:e.jsxs("div",{children:[e.jsxs("div",{className:` form--group  ${a!=null&&a.amount?" is--invalid":""}`,id:"record_dialog-amount",children:[e.jsx("label",{className:"form--label",children:"Amount"}),e.jsx(T,{type:"text",placeholder:"Amount",inputMode:"numeric",value:(h??0).toString(),className:`${a!=null&&a.amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),se(Number(n))}}),e.jsx(j,{message:a==null?void 0:a.amount})]}),e.jsxs("div",{className:" flex flex-col w-full",children:[e.jsx("div",{className:` form--group  ${a!=null&&a.extra_amount?" is--invalid":""}`,id:"record_dialog-extra_amount",children:e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{id:"record_dialog-extra_amount",children:[e.jsx("label",{className:" form--label",children:"Extra"}),e.jsx(T,{type:"text",placeholder:"Extra Amount",inputMode:"numeric",value:(v??0).toString(),className:`${a!=null&&a.extra_amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),le(Number(n))}}),e.jsx(j,{message:a==null?void 0:a.extra_amount})]}),e.jsx("div",{id:"record_dialog-extra_type",children:e.jsxs("span",{className:" text-sm flex flex-row gap-1",children:[e.jsx("span",{className:` cursor-pointer ${u==="amount"?" font-semibold":""}`,onClick:()=>{u!=="amount"&&L("amount")},children:"Amount"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:` cursor-pointer ${u==="percentage"?" font-semibold":""}`,onClick:()=>{u!=="percentage"&&L("percentage")},children:"Percentage"})]})})]})}),e.jsxs("div",{className:` form--group  ${a!=null&&a.final_amount?" is--invalid":""}`,id:"record_dialog-final_amount",children:[e.jsx("label",{className:" form--label",children:"Final"}),e.jsx(T,{type:"text",placeholder:"Final Amount",inputMode:"numeric",value:(q??0).toString(),className:`${a!=null&&a.final_amount?" border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",disabled:!0}),e.jsx(j,{message:a==null?void 0:a.final_amount})]})]})]})},{name:"Step 3",key:"note",el:e.jsx("div",{children:e.jsxs("div",{className:` form--group  ${a!=null&&a.notes?" is--invalid":""}`,id:"record_dialog-note",children:[e.jsx("label",{className:" form--label",children:"Note"}),e.jsx(Ue,{className:` w-full ${a!=null&&a.notes?" border-red-500":""}`,placeholder:"Type your message here.",value:ne,onChange:t=>{re(t.target.value)}}),e.jsx(j,{message:a==null?void 0:a.notes})]})})},{name:"Step 4",key:"review",el:e.jsxs("div",{className:" mb-4",children:[e.jsxs("div",{className:" mb-4",children:[e.jsx("span",{className:" block font-semibold",children:"Type"}),e.jsx(Ke,{children:xe(w)})]}),e.jsxs("div",{className:" flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:" w-full overflow-hidden",children:[e.jsx("span",{className:" block font-semibold",children:"From Wallet"}),e.jsx("span",{className:" block whitespace-nowrap overflow-hidden w-full text-ellipsis",children:O})]}),(()=>w==="transfer"?e.jsxs("div",{className:" w-full overflow-hidden text-right",children:[e.jsx("span",{className:" block font-semibold",children:"To Wallet"}),e.jsx("span",{className:" whitespace-nowrap",children:D})]}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed mt-4",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("strong",{children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:ne??"No description provided"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:F(h??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>u==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",v??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:F((q??0)-(h??0))})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:F(q??0)})]})]})]})}],l=[];return s.forEach((t,n)=>{l.push(e.jsx("section",{className:`quick-action-item ${n===0?"active":""} flex flex-col h-[fit-content] px-1`,"data-key":t.key,children:t.el},`wizzard-step_${n}`))}),l})()})})}),e.jsx(Ye,{children:e.jsxs("div",{className:" flex justify-between w-full gap-4",children:[e.jsx(N,{variant:"outline",disabled:c===0,onClick:s=>{M("prev",s)},children:"Prev"}),(()=>c>0?e.jsx(N,{variant:"destructive",className:"w-full",onClick:s=>{B(),C(0)},children:"Reset"}):e.jsx(e.Fragment,{}))(),(()=>c===I?e.jsx(N,{className:" w-1/2",onClick:s=>{$e(s)},children:"Submit"}):e.jsx(N,{variant:"outline",disabled:c===I,onClick:s=>{M("next",s)},children:"Next"}))()]})})]}),e.jsx("div",{className:" mt-4 w-full text-center",children:e.jsx(Be,{href:route("sys.index"),children:"Go to Dashboard"})})]})})]})}export{it as default};
