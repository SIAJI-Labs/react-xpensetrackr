import{r,j as e,a as De,d as xe,e as u}from"./app-a527d074.js";import{u as ze,A as He}from"./ApplicationLogo-8139e2c5.js";import{u as fe,C as pe,f as F,a as he}from"./function-c3ea43bf.js";import{B as N}from"./button-ae8c2129.js";import{I as Pe,E as j,P as be,a as je,C as we,b as ve,c as Ne,d as Ce,S as ge,e as ye,f as ke,g as Se,T as Ue,h as Ge}from"./textarea-2a8e7701.js";import{G as Je}from"./PublicLayout-3ad99df2.js";import{C as Oe,a as Ye,d as Ke}from"./card-cdda5f07.js";import{B as Qe}from"./badge-823fc9ab.js";import{I as Xe}from"./input-2571e4ed.js";/* empty css            */function dt({auth:Ze}){const{toast:Te}=ze(),T=Pe(({inputRef:s,...l})=>e.jsx(Xe,{...l,ref:s})),[a,$]=r.useState({}),[c,C]=r.useState(0),[I,$e]=r.useState(0),M=(s,l)=>{H instanceof AbortController&&H.abort();let t=l.target,n=t.textContent;if(s==="next"){t.tagName.toLowerCase()==="button"&&t.setAttribute("disabled","disabled"),t.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let o=document.querySelector(".quick-action-item.active");if(o){let d=o.dataset.key;if(d){$({});const b=new AbortController;We(b);let i=new FormData;switch(i.append("key",d),d){case"wallet":{i.append("type",w),i.append("from_wallet",f),i.append("to_wallet",p);break}case"amount":i.append("amount",String(h??0)),i.append("extra_amount",String(v??0)),i.append("extra_type",x)}u.post(route("api.quick-action.v1.record.validation"),i,{cancelToken:new u.CancelToken(function(q){b.abort=q})}).then(m=>(console.log(m),m.status===200&&(m.data,C(c+1)),!0)).catch(m=>{var ce;const q=m;console.log(m);let ie=(ce=q.response)==null?void 0:ce.data;ie.errors&&$(ie.errors),setTimeout(()=>{const de=document.querySelectorAll("#recordDialog-forms .form--group.is--invalid");de.length>0&&Array.from(de).reduce((me,ue)=>me.offsetTop>ue.offsetTop?ue:me).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{t.tagName.toLowerCase()==="button"&&t.removeAttribute("disabled"),n&&(t.innerHTML=n)})}}}else s==="prev"&&c>0&&C(c-1)},V=()=>{let s=document.getElementById("quick-action-wrapper");if(s){let l=s.querySelector(".quick-action-item.active");if(l){s.style.height=`calc(${l.clientHeight+"px"} + 1.5rem)`;let n=document.getElementById("quick-action-container");n&&(n.style.height=`calc(${l.clientHeight+"px"})`)}let t=s.querySelectorAll(".quick-action-item");if(t.length>0){$e(t.length-1);for(const n of t)n.style.width=`calc(${s.clientWidth}px)`}}};r.useEffect(()=>{V()}),r.useEffect(()=>{let s=document.getElementById("quick-action-container");if(s){let l=s.querySelectorAll(".quick-action-item");if(l[c]){s.style.transform=`translateX(-${l[c].offsetLeft}px)`;let t=s.querySelector(".quick-action-item.active");t&&t.classList.remove("active"),l[c].classList.add("active"),V()}}},[c]);const D=()=>{P("expense"),J(""),B(""),le(0),ne(0),E("amount"),oe("")},[z,Ae]=r.useState(null),_e=s=>{let l=s.target,t=l.textContent;l.tagName.toLowerCase()==="button"&&l.setAttribute("disabled","disabled"),l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>',z instanceof AbortController&&z.abort();const n=new AbortController;Ae(n);let o=new FormData;o.append("type",w),o.append("from_wallet",f),o.append("to_wallet",p),o.append("amount",String(h??0)),o.append("extra_amount",String(v??0)),o.append("extra_type",x),o.append("timestamp",he().format("YYYY-MM-DD HH:mm:ss")),o.append("timezone",he.tz.guess()),u.post(route("api.quick-action.v1.record.store"),o,{cancelToken:new u.CancelToken(function(b){n.abort=b})}).then(d=>(d.status===200&&(d.data,Te({title:"Action: Success",description:"Record data successfully saved"}),D(),C(0)),!0)).catch(d=>{var m;let i=(m=d.response)==null?void 0:m.data;i.errors&&$(i.errors)}).finally(()=>{l.tagName.toLowerCase()==="button"&&l.removeAttribute("disabled"),t&&(l.innerHTML=t)})},[H,We]=r.useState(null),[w,P]=r.useState("expense");let U;const[g,G]=r.useState(!1),[f,J]=r.useState(""),[O,Y]=r.useState("Select an option"),[A,K]=r.useState([]),[_,Re]=r.useState(""),[Ee,Q]=r.useState(!1),[y,Le]=r.useState(null),qe=async(s,l)=>{Q(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await u.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new u.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){u.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(U),K([]),g){y&&y.abort();const s=new AbortController;return Le(s),U=setTimeout(()=>{qe(_,s).then((l=[])=>{Q(!1),l&&K(l)}).catch(l=>{})},0),()=>{y&&y.abort()}}},[_,g]),r.useEffect(()=>{if(f!==""&&A.length>0){const s=A.find(l=>(l==null?void 0:l.uuid)===f);s&&Y(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else Y("Select an option")},[f]);let X;const[k,Z]=r.useState(!1),[p,B]=r.useState(""),[ee,te]=r.useState("Select an option"),[W,ae]=r.useState([]),[R,Fe]=r.useState(""),[Ie,se]=r.useState(!1),[S,Me]=r.useState(null),Ve=async(s,l)=>{se(!0);try{const t=[],n={keyword:s};for(const o in n)t.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));try{return(await u.get(`${route("api.wallet.v1.list")}?${t.join("&")}`,{cancelToken:new u.CancelToken(function(i){l.abort=i})})).data.result.data}catch(o){u.isCancel(o)?console.log("Request was canceled",o):console.error("Error:",o)}}catch(t){throw console.error("Request error:",t),t}return[]};r.useEffect(()=>{if(clearTimeout(X),ae([]),k){S&&S.abort();const s=new AbortController;return Me(s),X=setTimeout(()=>{Ve(R,s).then((l=[])=>{se(!1),l&&ae(l)}).catch(l=>{})},500),()=>{S&&S.abort()}}},[R,k]),r.useEffect(()=>{if(p!==""&&W.length>0){const s=W.find(l=>(l==null?void 0:l.uuid)===p);s&&te(`${s.parent?`${s.parent.name} - `:""}${s.name}`)}else te("Select an option")},[p]);const[h,le]=r.useState(),[v,ne]=r.useState(),[x,E]=r.useState("amount"),L=r.useMemo(()=>{let s=h??0,l=v??0;return x==="percentage"&&(l=l*s/100),s+l},[h,v,x]),[re,oe]=r.useState();return e.jsxs(Je,{children:[e.jsx(De,{title:"Quick Action: Create new Record"}),e.jsx("div",{className:" flex flex-col justify-center items-center h-screen w-screen",children:e.jsxs("main",{className:" w-full md:max-w-[420px] md:min-w-[420px] px-4 md:px-6",children:[e.jsx("div",{className:" mb-4",children:e.jsx(xe,{href:route("sys.index"),children:e.jsx(He,{fontSizeMain:" text-3xl"})})}),e.jsxs(Oe,{children:[e.jsx(Ye,{className:" pb-2",children:e.jsx("div",{className:" transition-all duration-300 ease-in-out py-6 relative overflow-x-clip",id:"quick-action-wrapper",children:e.jsx("div",{className:" absolute flex flex-row flex-nowrap gap-12 transition-all duration-300 ease-in-out",id:"quick-action-container",children:(()=>{let s=[{name:"Step 1",key:"wallet",el:e.jsxs("div",{children:[e.jsxs("div",{className:`form-group mb-4 ${a!=null&&a.type?" is--invalid":""}`,children:[e.jsx("div",{className:` flex flex-row gap-4 w-full border p-1 rounded-md ${a!=null&&a.type?" !border-red-500":""}`,id:"record_dialog-type",children:(()=>{let t=[];return["income","transfer","expense"].map((n,o)=>{t.push(e.jsx("div",{className:` w-full text-center py-1 rounded-sm cursor-pointer ${w===n?"bg-primary ":" dark:!text-white !text-black hover:!text-primary-foreground"} text-primary-foreground hover:bg-primary/90 transition`,onClick:()=>{P(n)},children:e.jsx("span",{className:" text-sm font-semibold",children:fe(n)})},`record_type-${n}`))}),t.length>0?t:e.jsx(e.Fragment,{})})()}),e.jsx(j,{message:a==null?void 0:a.category_id})]}),e.jsxs("div",{className:` form--group  ${a!=null&&a.from_wallet?" is--invalid":""}`,id:"record_dialog-from_wallet",children:[e.jsx("label",{className:" form--label",children:"From"}),e.jsxs("div",{children:[e.jsxs(be,{open:g,onOpenChange:G,children:[e.jsx(je,{asChild:!0,children:e.jsxs(N,{variant:"outline",role:"combobox","aria-expanded":g,className:`w-full justify-between ${a!=null&&a.from_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:O}),e.jsx(we,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(ve,{className:" w-[250px] lg:w-[350px] p-0 z-[1000]",align:"start",side:"bottom",children:e.jsxs(Ne,{shouldFilter:!1,children:[e.jsx(Ce,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:_,onValueChange:Re}),e.jsx(ge,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ye,{children:Ee?"Loading...":"No wallet found."}),e.jsx(ke,{children:A.map(t=>e.jsxs(Se,{value:t==null?void 0:t.uuid,onSelect:n=>{J(n===f?"":n),G(!1)},children:[e.jsx(pe,{className:`mr-2 h-4 w-4 ${f===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(j,{message:a==null?void 0:a.from_wallet})]})]}),(()=>w==="transfer"?e.jsxs("div",{className:` form--group  ${a!=null&&a.to_wallet?" is--invalid":""}`,id:"record_dialog-to_wallet",children:[e.jsx("label",{className:" form--label",children:"To"}),e.jsxs("div",{children:[e.jsxs(be,{open:k,onOpenChange:Z,children:[e.jsx(je,{asChild:!0,children:e.jsxs(N,{variant:"outline",role:"combobox","aria-expanded":k,className:` w-full justify-between ${a!=null&&a.to_wallet?" !border-red-500":""} dark:text-white`,children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:ee}),e.jsx(we,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(ve,{className:" w-[250px] lg:w-[350px] p-0 z-[1000]",align:"start",side:"bottom",children:e.jsxs(Ne,{shouldFilter:!1,children:[e.jsx(Ce,{placeholder:"Search wallet",className:" border-none focus:ring-0",value:R,onValueChange:Fe}),e.jsx(ge,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(ye,{children:Ie?"Loading...":"No wallet found."}),e.jsx(ke,{children:W.map(t=>e.jsxs(Se,{value:t==null?void 0:t.uuid,onSelect:n=>{B(n===p?"":n),Z(!1)},children:[e.jsx(pe,{className:`mr-2 h-4 w-4 ${p===(t==null?void 0:t.uuid)?"opacity-100":"opacity-0"}`}),e.jsx("span",{className:" w-full overflow-hidden whitespace-nowrap text-ellipsis",children:`${t!=null&&t.parent?`${t.parent.name} - `:""}${t==null?void 0:t.name}`})]},t==null?void 0:t.uuid))})]})})]})})]}),e.jsx(j,{message:a==null?void 0:a.to_wallet})]})]}):e.jsx(e.Fragment,{}))()]})},{name:"Step 2",key:"amount",el:e.jsxs("div",{children:[e.jsxs("div",{className:` form--group  ${a!=null&&a.amount?" is--invalid":""}`,id:"record_dialog-amount",children:[e.jsx("label",{className:"form--label",children:"Amount"}),e.jsx(T,{type:"text",placeholder:"Amount",inputMode:"numeric",value:(h??0).toString(),className:`${a!=null&&a.amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),le(Number(n))}}),e.jsx(j,{message:a==null?void 0:a.amount})]}),e.jsxs("div",{className:" flex flex-col w-full",children:[e.jsx("div",{className:` form--group  ${a!=null&&a.extra_amount?" is--invalid":""}`,id:"record_dialog-extra_amount",children:e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsxs("div",{id:"record_dialog-extra_amount",children:[e.jsx("label",{className:" form--label",children:"Extra"}),e.jsx(T,{type:"text",placeholder:"Extra Amount",inputMode:"numeric",value:(v??0).toString(),className:`${a!=null&&a.extra_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",onBlur:t=>{let n=t.target.value;n=n.replace(",",""),ne(Number(n))}}),e.jsx(j,{message:a==null?void 0:a.extra_amount})]}),e.jsx("div",{id:"record_dialog-extra_type",children:e.jsxs("span",{className:" text-sm flex flex-row gap-1",children:[e.jsx("span",{className:` cursor-pointer ${x==="amount"?" font-semibold":""}`,onClick:()=>{x!=="amount"&&E("amount")},children:"Amount"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:` cursor-pointer ${x==="percentage"?" font-semibold":""}`,onClick:()=>{x!=="percentage"&&E("percentage")},children:"Percentage"})]})})]})}),e.jsxs("div",{className:` form--group  ${a!=null&&a.final_amount?" is--invalid":""}`,id:"record_dialog-final_amount",children:[e.jsx("label",{className:" form--label",children:"Final"}),e.jsx(T,{type:"text",placeholder:"Final Amount",inputMode:"numeric",value:(L??0).toString(),className:`${a!=null&&a.final_amount?" !border-red-500":""}`,mask:Number,unmask:!0,thousandsSeparator:",",scale:2,radix:".",disabled:!0}),e.jsx(j,{message:a==null?void 0:a.final_amount})]})]})]})},{name:"Step 3",key:"note",el:e.jsx("div",{children:e.jsxs("div",{className:` form--group  ${a!=null&&a.notes?" is--invalid":""}`,id:"record_dialog-note",children:[e.jsx("label",{className:" form--label",children:"Note"}),e.jsx(Ue,{className:` w-full ${a!=null&&a.notes?" !border-red-500":""}`,placeholder:"Type your message here.",value:re,onChange:t=>{oe(t.target.value)}}),e.jsx(j,{message:a==null?void 0:a.notes})]})})},{name:"Step 4",key:"review",el:e.jsxs("div",{className:" mb-4",children:[e.jsxs("div",{className:" mb-4",children:[e.jsx("span",{className:" block font-semibold",children:"Type"}),e.jsx(Qe,{children:fe(w)})]}),e.jsxs("div",{className:" flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:" w-full overflow-hidden",children:[e.jsx("span",{className:" block font-semibold",children:"From Wallet"}),e.jsx("span",{className:" block whitespace-nowrap overflow-hidden w-full text-ellipsis",children:O})]}),(()=>w==="transfer"?e.jsxs("div",{className:" w-full overflow-hidden text-right",children:[e.jsx("span",{className:" block font-semibold",children:"To Wallet"}),e.jsx("span",{className:" whitespace-nowrap",children:ee})]}):e.jsx(e.Fragment,{}))()]}),e.jsxs("div",{className:" w-full p-4 rounded-lg border-2 border-dashed mt-4",children:[e.jsxs("span",{className:" flex items-center gap-2 text-sm",children:[e.jsx("i",{className:"fa-solid fa-align-left"}),e.jsx("strong",{children:"Note(s)"})]}),e.jsx("span",{className:" block mt-2",children:re??"No description provided"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between mt-2 text-sm",children:[e.jsx("span",{children:"Amount"}),e.jsx("span",{"data-review":"amount",children:F(h??0)})]}),e.jsxs("div",{className:"flex justify-between mt-1 text-sm",children:[e.jsxs("span",{children:[e.jsx("span",{children:"Extra"}),(()=>x==="percentage"?e.jsxs("span",{className:"text-xs",children:["(",v??0,"%)"]}):e.jsx(e.Fragment,{}))()]}),e.jsx("span",{"data-review":"extra_amount",children:F((L??0)-(h??0))})]}),e.jsx("hr",{className:"my-1"}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-semibold",children:"Final Amount"}),e.jsx("span",{className:"font-semibold","data-review":"final_amount",children:F(L??0)})]})]})]})}],l=[];return s.forEach((t,n)=>{l.push(e.jsx("section",{className:`quick-action-item ${n===0?"active":""} flex flex-col h-[fit-content] px-1`,"data-key":t.key,children:t.el},`wizzard-step_${n}`))}),l})()})})}),e.jsx(Ke,{children:e.jsxs("div",{className:" flex justify-between w-full gap-4",children:[e.jsx(N,{variant:"outline",className:c===0?" !opacity-0":"",disabled:c===0,onClick:s=>{M("prev",s)},children:"Prev"}),(()=>c>0?e.jsx(N,{variant:"destructive",className:"w-full",onClick:s=>{D(),C(0)},children:"Reset"}):e.jsx(e.Fragment,{}))(),(()=>c===I?e.jsx(N,{className:" w-1/2",onClick:s=>{_e(s)},children:"Submit"}):e.jsx(N,{variant:"outline",disabled:c===I,onClick:s=>{M("next",s)},children:"Next"}))()]})})]}),e.jsxs("div",{className:" mt-4 w-full text-center",children:[e.jsx(xe,{href:route("sys.index"),className:"dark:text-white",children:"Go to Dashboard"}),e.jsx("div",{className:" flex flex-row gap-4 rounded border p-2 dark:text-white",children:e.jsx(Ge,{className:" flex flex-row gap-2 w-full"})})]})]})})]})}export{dt as default};
