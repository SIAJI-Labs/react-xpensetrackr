import{r as s,j as e,a as re,y as ie,e as T}from"./app-49e19f09.js";import{$ as ce,j as le,l as de,K as me,a as l,C as O}from"./index-961138f1.js";import{T as fe}from"./TemplateBackButton-a1494aed.js";import{$ as pe,S as ue}from"./SystemLayout-a53fff85.js";import{P as q,a as L,b as U,C as V,c as G,S as W,d as z,e as K,f as X}from"./scroll-area-8438057d.js";import{C as he,a as xe}from"./card-2c105230.js";import{b as be,_ as R,c as J,u as ge,B as P}from"./button-8f2a595a.js";import{$ as ee}from"./index-61f18b0c.js";import{S as Q}from"./separator-9cd8c296.js";import{C as Z}from"./theme-toggle-66897dc1.js";/* empty css            *//* empty css              */import"./index-84c40666.js";import"./dialog-dd6b0ada.js";import"./drawer-134f179f.js";import"./ErrorMessage-9da431ff.js";import"./TemplateNoData-b0444318.js";import"./input-d9c06e18.js";import"./ApplicationLogoMask-c668ea73.js";import"./ApplicationLogo-c5ad270c.js";const te="Switch",[je,ze]=ce(te),[we,ve]=je(te),Ne=s.forwardRef((r,p)=>{const{__scopeSwitch:i,name:u,checked:h,defaultChecked:v,required:d,disabled:c,value:b="on",onCheckedChange:m,...y}=r,[o,N]=s.useState(null),g=be(p,w=>N(w)),S=s.useRef(!1),f=o?!!o.closest("form"):!0,[j=!1,_]=le({prop:h,defaultProp:v,onChange:m});return s.createElement(we,{scope:i,checked:j,disabled:c},s.createElement(ee.button,R({type:"button",role:"switch","aria-checked":j,"aria-required":d,"data-state":se(j),"data-disabled":c?"":void 0,disabled:c,value:b},y,{ref:g,onClick:de(r.onClick,w=>{_(k=>!k),f&&(S.current=w.isPropagationStopped(),S.current||w.stopPropagation())})})),f&&s.createElement(Ce,{control:o,bubbles:!S.current,name:u,value:b,checked:j,required:d,disabled:c,style:{transform:"translateX(-100%)"}}))}),$e="SwitchThumb",Se=s.forwardRef((r,p)=>{const{__scopeSwitch:i,...u}=r,h=ve($e,i);return s.createElement(ee.span,R({"data-state":se(h.checked),"data-disabled":h.disabled?"":void 0},u,{ref:p}))}),Ce=r=>{const{control:p,checked:i,bubbles:u=!0,...h}=r,v=s.useRef(null),d=pe(i),c=me(p);return s.useEffect(()=>{const b=v.current,m=window.HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(m,"checked").set;if(d!==i&&o){const N=new Event("click",{bubbles:u});o.call(b,i),b.dispatchEvent(N)}},[d,i,u]),s.createElement("input",R({type:"checkbox","aria-hidden":!0,defaultChecked:i},h,{tabIndex:-1,ref:v,style:{...r.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function se(r){return r?"checked":"unchecked"}const ne=Ne,ye=Se,D=s.forwardRef(({className:r,...p},i)=>e.jsx(ne,{className:J("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",r),...p,ref:i,children:e.jsx(ye,{className:J("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));D.displayName=ne.displayName;function Ke({auth:r,notificationState:p,notificationPlannedPaymentState:i,notificationPlannedPaymentTime:u,notificationPendingRecordState:h,notificationPendingRecordTime:v}){const d=ge(),[c,b]=s.useState(p),[m,y]=s.useState(i),[o,N]=s.useState(u),[g,S]=s.useState(h),[f,j]=s.useState(v),[_,w]=s.useState({}),[k,F]=s.useState(null),C=t=>{console.log(t),k instanceof AbortController&&k.abort(),w({});const n=new AbortController;F(n),t.append("_method","PUT"),t.append("action","notification-preference");let a=route("api.profile.v1.update",r.user.uuid);T.post(a,t,{cancelToken:new T.CancelToken(function($){n.abort=$})}).then(x=>{x.status}).catch(x=>{var A;let E=(A=x.response)==null?void 0:A.data;E.errors&&w(E.errors),setTimeout(()=>{const H=document.querySelectorAll("#preference-notification .form--group.is--invalid");H.length>0&&Array.from(H).reduce((B,I)=>B.offsetTop>I.offsetTop?I:B).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{F(null)})};s.useEffect(()=>{if(!d){let t=new FormData;t.append("state","notification"),t.append("state_value",c.toString()),C(t)}},[c]),s.useEffect(()=>{if(m||N(void 0),!d){let t=new FormData;t.append("state","notification_plannedPayment"),t.append("state_value",m.toString()),C(t)}},[m]),s.useEffect(()=>{if(!d&&m){let t=new FormData;t.append("state","time_plannedPayment"),t.append("state_value",o&&o!==null?o.toString():""),C(t)}},[o]),s.useEffect(()=>{if(m||j(void 0),!d){let t=new FormData;t.append("state","notification_pendingRecord"),t.append("state_value",g.toString()),C(t)}},[g]),s.useEffect(()=>{if(!d&&g){let t=new FormData;t.append("state","time_pendingRecord"),t.append("state_value",f&&f!==null?f.toString():""),C(t)}},[f]);const[ae,Y]=s.useState(!1),[oe,M]=s.useState(!1);return e.jsxs(ue,{user:r.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Notification"}),children:[e.jsx(re,{title:"Notification"}),e.jsx(fe,{className:"px-0"}),e.jsx(he,{id:"preference-notification",children:e.jsxs(xe,{className:" flex flex-col gap-6 p-6",children:[e.jsxs("div",{className:" flex flex-col gap-4 rounded-lg border p-4",children:[e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsxs("div",{className:" flex flex-col gap-1 space-y-0.5 leading-none",children:[e.jsx("label",{className:"text-base font-medium leading-tight",children:"Push notification"}),e.jsx("span",{className:" text-sm leading-none",children:"Receive push notification"})]}),e.jsx(D,{checked:c,onCheckedChange:t=>{b(t)}})]}),(()=>{if("Notification"in window&&c){if(["denied","default"].includes(String(Notification.permission))||Notification.permission===void 0)return e.jsx(e.Fragment,{children:e.jsxs("div",{className:" w-full flex flex-row gap-1 p-4 rounded-lg border-2 border-dashed border-red-300",children:[e.jsxs("span",{children:["We're not granted push notification permission ",Notification.permission==="denied"?e.jsx("strong",{className:"underline text-sm",children:" (Permission Denied)"}):"","."]}),(()=>Notification.permission==="default"?e.jsx(P,{variant:"link",className:" h-auto p-0 text-base",onClick:()=>{Notification.requestPermission().then(t=>{ie.reload()})},children:"Give permission"}):e.jsx(e.Fragment,{}))()]})});if(String(Notification.permission)==="granted")return e.jsxs(e.Fragment,{children:[e.jsx(Q,{}),e.jsx(P,{variant:"outline",className:" mr-auto",onClick:t=>{let n=t.target,a=n.textContent;n.setAttribute("disabled","disabled"),n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';let x=new FormData;T.post(route("api.notification.v1.sample-notification"),x).then($=>{console.log($)}).catch($=>{console.log($)}).finally(()=>{n&&a&&(n.removeAttribute("disabled"),n.innerHTML=a)})},children:"Sent sample Notification"})]})}else if(!("Notification"in window))return e.jsx(e.Fragment,{children:e.jsx("div",{className:" w-full p-4 rounded-lg border-2 border-dashed border-yellow-500",children:e.jsx("span",{children:"Push notification is not supported in this device"})})});return e.jsx(e.Fragment,{})})()]}),e.jsx(Q,{}),e.jsxs("fieldset",{className:` ${c?"":" opacity-50"} flex flex-col gap-4`,disabled:!c,children:[e.jsxs("div",{className:" flex flex-col gap-4 border p-4 rounded-lg",children:[e.jsxs("div",{className:"flex flex-col gap-2 ",children:[e.jsxs("div",{className:" flex flex-row items-center justify-between",children:[e.jsx("label",{className:"text-base font-medium leading-tight",children:"Planned Payment"}),e.jsx(D,{checked:m,onCheckedChange:t=>{y(t)}})]}),e.jsx("span",{className:" text-sm leading-none",children:"Remind me about my upcoming, today, and overdue scheduled payment"})]}),e.jsx("fieldset",{className:" border-t pt-2",disabled:!m,children:e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsx("label",{className:" w-full",children:"Receive notification at"}),e.jsx("div",{className:"w-full form--group !mb-0",id:"record_dialog-hours",children:e.jsxs(q,{open:ae,onOpenChange:Y,children:[e.jsx(L,{asChild:!0,children:e.jsxs(P,{variant:"outline",role:"combobox",className:"w-full justify-between dark:text-white",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:o&&o!==null?o:"Select Timestamp"}),e.jsx(Z,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(U,{className:" w-[175px] lg:w-[400px] p-0",align:"end",children:e.jsxs(V,{children:[e.jsx(G,{placeholder:"Search Timestamp",className:" border-none focus:ring-0"}),e.jsx(W,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(z,{children:"No timestamp found"}),e.jsx(K,{children:(()=>{let t=[],n=l(`${l().format("YYYY-MM-DD")} 00:00:00`);do{let a=l(n).format("HH:mm").toString();t.push(e.jsxs(X,{value:a,onSelect:x=>{N(a),Y(!1)},children:[e.jsx(O,{className:`mr-2 h-4 w-4 ${o===a?"opacity-100":"opacity-0"} `}),a]},`planned_timestamp-${a}`)),n=l(n).add(15,"minutes")}while(l(n).format("YYYY-MM-DD").toString()===l().format("YYYY-MM-DD").toString());return t.length>0?t:e.jsx(e.Fragment,{})})()})]})})]})})]})})]})})]}),e.jsxs("div",{className:" flex flex-col gap-4 border p-4 rounded-lg",children:[e.jsxs("div",{className:"flex flex-col gap-2 ",children:[e.jsxs("div",{className:" flex flex-row items-center justify-between",children:[e.jsx("label",{className:"text-base font-medium leading-tight",children:"Pending Record"}),e.jsx(D,{checked:g,onCheckedChange:t=>{S(t)}})]}),e.jsx("span",{className:" text-sm leading-none",children:"Remind me about my pending record via Push Notification"})]}),e.jsx("fieldset",{className:" border-t pt-2",disabled:!g,children:e.jsxs("div",{className:" flex flex-row justify-between items-center",children:[e.jsx("label",{className:" w-full",children:"Receive notification at"}),e.jsx("div",{className:"w-full form--group !mb-0",id:"record_dialog-hours",children:e.jsxs(q,{open:oe,onOpenChange:M,children:[e.jsx(L,{asChild:!0,children:e.jsxs(P,{variant:"outline",role:"combobox",className:"w-full justify-between dark:text-white",children:[e.jsx("span",{className:" whitespace-nowrap overflow-hidden w-full text-ellipsis text-left font-light",children:f&&f!==null?f:"Select Timestamp"}),e.jsx(Z,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(U,{className:" w-[175px] lg:w-[400px] p-0",align:"end",children:e.jsxs(V,{children:[e.jsx(G,{placeholder:"Search Timestamp",className:" border-none focus:ring-0"}),e.jsx(W,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(z,{children:"No timestamp found"}),e.jsx(K,{children:(()=>{let t=[],n=l(`${l().format("YYYY-MM-DD")} 00:00:00`);do{let a=l(n).format("HH:mm").toString();t.push(e.jsxs(X,{value:a,onSelect:x=>{j(a),M(!1)},children:[e.jsx(O,{className:`mr-2 h-4 w-4 ${f===a?"opacity-100":"opacity-0"} `}),a]},`pendingRecord_timestamp-${a}`)),n=l(n).add(15,"minutes")}while(l(n).format("YYYY-MM-DD").toString()===l().format("YYYY-MM-DD").toString());return t.length>0?t:e.jsx(e.Fragment,{})})()})]})})]})})]})})]})})]})]})]})})]})}export{Ke as default};
