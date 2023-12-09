import{r as o,j as u,c as Ne}from"./app-643b45d1.js";import{$ as D,_ as S,d as De,e as ie,f as Ie,g as Oe,h as Fe,i as Y,j as h,k as Le,l as Me,m as ke,n as je,c as R,a as Ve}from"./button-2abb1b99.js";import{$ as Ke}from"./siaji-712147e8.js";import{X as We}from"./x-cddf793a.js";const Ue={theme:"system",setTheme:()=>null},ee=o.createContext(Ue);function Pt({children:e,defaultTheme:t="system",storageKey:s="xtrackr-theme",...r}){const[a,l]=o.useState(()=>localStorage.getItem(s)||t);o.useEffect(()=>{const d=window.document.documentElement;if(d.classList.remove("light","dark"),a==="system"){const b=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.classList.add(b);return}d.classList.add(a)},[a]);const m={theme:a,setTheme:d=>{localStorage.setItem(s,d),l(d)}};return u.jsx(ee.Provider,{...r,value:m,children:e})}const Xe=()=>{const e=o.useContext(ee);if(console.log(ee),e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},Rt=()=>{const{theme:e}=Xe();return e},de=o.forwardRef((e,t)=>o.createElement(D.span,S({},e,{ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}))),ue="ToastProvider",[se,He,Ye]=Ke("Toast"),[le,_t]=De("Toast",[Ye]),[Be,B]=le(ue),pe=e=>{const{__scopeToast:t,label:s="Notification",duration:r=5e3,swipeDirection:a="right",swipeThreshold:l=50,children:m}=e,[d,b]=o.useState(null),[c,y]=o.useState(0),x=o.useRef(!1),F=o.useRef(!1);return o.createElement(se.Provider,{scope:t},o.createElement(Be,{scope:t,label:s,duration:r,swipeDirection:a,swipeThreshold:l,toastCount:c,viewport:d,onViewportChange:b,onToastAdd:o.useCallback(()=>y(_=>_+1),[]),onToastRemove:o.useCallback(()=>y(_=>_-1),[]),isFocusedToastEscapeKeyDownRef:x,isClosePausedRef:F},m))};pe.propTypes={label(e){if(e.label&&typeof e.label=="string"&&!e.label.trim()){const t=`Invalid prop \`label\` supplied to \`${ue}\`. Expected non-empty \`string\`.`;return new Error(t)}return null}};const qe="ToastViewport",Qe=["F8"],te="toast.viewportPause",oe="toast.viewportResume",ze=o.forwardRef((e,t)=>{const{__scopeToast:s,hotkey:r=Qe,label:a="Notifications ({hotkey})",...l}=e,m=B(qe,s),d=He(s),b=o.useRef(null),c=o.useRef(null),y=o.useRef(null),x=o.useRef(null),F=ie(t,x,m.onViewportChange),_=r.join("+").replace(/Key/g,"").replace(/Digit/g,""),A=m.toastCount>0;o.useEffect(()=>{const i=E=>{var f;r.every(T=>E[T]||E.code===T)&&((f=x.current)===null||f===void 0||f.focus())};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[r]),o.useEffect(()=>{const i=b.current,E=x.current;if(A&&i&&E){const f=()=>{if(!m.isClosePausedRef.current){const w=new CustomEvent(te);E.dispatchEvent(w),m.isClosePausedRef.current=!0}},v=()=>{if(m.isClosePausedRef.current){const w=new CustomEvent(oe);E.dispatchEvent(w),m.isClosePausedRef.current=!1}},T=w=>{!i.contains(w.relatedTarget)&&v()},$=()=>{i.contains(document.activeElement)||v()};return i.addEventListener("focusin",f),i.addEventListener("focusout",T),i.addEventListener("pointermove",f),i.addEventListener("pointerleave",$),window.addEventListener("blur",f),window.addEventListener("focus",v),()=>{i.removeEventListener("focusin",f),i.removeEventListener("focusout",T),i.removeEventListener("pointermove",f),i.removeEventListener("pointerleave",$),window.removeEventListener("blur",f),window.removeEventListener("focus",v)}}},[A,m.isClosePausedRef]);const p=o.useCallback(({tabbingDirection:i})=>{const f=d().map(v=>{const T=v.ref.current,$=[T,...pt(T)];return i==="forwards"?$:$.reverse()});return(i==="forwards"?f.reverse():f).flat()},[d]);return o.useEffect(()=>{const i=x.current;if(i){const E=f=>{const v=f.altKey||f.ctrlKey||f.metaKey;if(f.key==="Tab"&&!v){const L=document.activeElement,I=f.shiftKey;if(f.target===i&&I){var $;($=c.current)===null||$===void 0||$.focus();return}const N=p({tabbingDirection:I?"backwards":"forwards"}),V=N.findIndex(n=>n===L);if(G(N.slice(V+1)))f.preventDefault();else{var w,C;I?(w=c.current)===null||w===void 0||w.focus():(C=y.current)===null||C===void 0||C.focus()}}};return i.addEventListener("keydown",E),()=>i.removeEventListener("keydown",E)}},[d,p]),o.createElement(Ie,{ref:b,role:"region","aria-label":a.replace("{hotkey}",_),tabIndex:-1,style:{pointerEvents:A?void 0:"none"}},A&&o.createElement(ne,{ref:c,onFocusFromOutsideViewport:()=>{const i=p({tabbingDirection:"forwards"});G(i)}}),o.createElement(se.Slot,{scope:s},o.createElement(D.ol,S({tabIndex:-1},l,{ref:F}))),A&&o.createElement(ne,{ref:y,onFocusFromOutsideViewport:()=>{const i=p({tabbingDirection:"backwards"});G(i)}}))}),Ge="ToastFocusProxy",ne=o.forwardRef((e,t)=>{const{__scopeToast:s,onFocusFromOutsideViewport:r,...a}=e,l=B(Ge,s);return o.createElement(de,S({"aria-hidden":!0,tabIndex:0},a,{ref:t,style:{position:"fixed"},onFocus:m=>{var d;const b=m.relatedTarget;!((d=l.viewport)!==null&&d!==void 0&&d.contains(b))&&r()}}))}),q="Toast",Je="toast.swipeStart",Ze="toast.swipeMove",et="toast.swipeCancel",tt="toast.swipeEnd",ot=o.forwardRef((e,t)=>{const{forceMount:s,open:r,defaultOpen:a,onOpenChange:l,...m}=e,[d=!0,b]=Oe({prop:r,defaultProp:a,onChange:l});return o.createElement(Fe,{present:s||d},o.createElement(fe,S({open:d},m,{ref:t,onClose:()=>b(!1),onPause:Y(e.onPause),onResume:Y(e.onResume),onSwipeStart:h(e.onSwipeStart,c=>{c.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:h(e.onSwipeMove,c=>{const{x:y,y:x}=c.detail.delta;c.currentTarget.setAttribute("data-swipe","move"),c.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${y}px`),c.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${x}px`)}),onSwipeCancel:h(e.onSwipeCancel,c=>{c.currentTarget.setAttribute("data-swipe","cancel"),c.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),c.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),c.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),c.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:h(e.onSwipeEnd,c=>{const{x:y,y:x}=c.detail.delta;c.currentTarget.setAttribute("data-swipe","end"),c.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),c.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),c.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${y}px`),c.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${x}px`),b(!1)})})))}),[st,rt]=le(q,{onClose(){}}),fe=o.forwardRef((e,t)=>{const{__scopeToast:s,type:r="foreground",duration:a,open:l,onClose:m,onEscapeKeyDown:d,onPause:b,onResume:c,onSwipeStart:y,onSwipeMove:x,onSwipeCancel:F,onSwipeEnd:_,...A}=e,p=B(q,s),[i,E]=o.useState(null),f=ie(t,n=>E(n)),v=o.useRef(null),T=o.useRef(null),$=a||p.duration,w=o.useRef(0),C=o.useRef($),L=o.useRef(0),{onToastAdd:I,onToastRemove:Q}=p,O=Y(()=>{var n;(i==null?void 0:i.contains(document.activeElement))&&((n=p.viewport)===null||n===void 0||n.focus()),m()}),N=o.useCallback(n=>{!n||n===1/0||(window.clearTimeout(L.current),w.current=new Date().getTime(),L.current=window.setTimeout(O,n))},[O]);o.useEffect(()=>{const n=p.viewport;if(n){const g=()=>{N(C.current),c==null||c()},P=()=>{const M=new Date().getTime()-w.current;C.current=C.current-M,window.clearTimeout(L.current),b==null||b()};return n.addEventListener(te,P),n.addEventListener(oe,g),()=>{n.removeEventListener(te,P),n.removeEventListener(oe,g)}}},[p.viewport,$,b,c,N]),o.useEffect(()=>{l&&!p.isClosePausedRef.current&&N($)},[l,$,p.isClosePausedRef,N]),o.useEffect(()=>(I(),()=>Q()),[I,Q]);const V=o.useMemo(()=>i?Te(i):null,[i]);return p.viewport?o.createElement(o.Fragment,null,V&&o.createElement(nt,{__scopeToast:s,role:"status","aria-live":r==="foreground"?"assertive":"polite","aria-atomic":!0},V),o.createElement(st,{scope:s,onClose:O},Ne.createPortal(o.createElement(se.ItemSlot,{scope:s},o.createElement(Le,{asChild:!0,onEscapeKeyDown:h(d,()=>{p.isFocusedToastEscapeKeyDownRef.current||O(),p.isFocusedToastEscapeKeyDownRef.current=!1})},o.createElement(D.li,S({role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":l?"open":"closed","data-swipe-direction":p.swipeDirection},A,{ref:f,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:h(e.onKeyDown,n=>{n.key==="Escape"&&(d==null||d(n.nativeEvent),n.nativeEvent.defaultPrevented||(p.isFocusedToastEscapeKeyDownRef.current=!0,O()))}),onPointerDown:h(e.onPointerDown,n=>{n.button===0&&(v.current={x:n.clientX,y:n.clientY})}),onPointerMove:h(e.onPointerMove,n=>{if(!v.current)return;const g=n.clientX-v.current.x,P=n.clientY-v.current.y,M=!!T.current,k=["left","right"].includes(p.swipeDirection),K=["left","up"].includes(p.swipeDirection)?Math.min:Math.max,_e=k?K(0,g):0,Ae=k?0:K(0,P),z=n.pointerType==="touch"?10:2,W={x:_e,y:Ae},re={originalEvent:n,delta:W};M?(T.current=W,U(Ze,x,re,{discrete:!1})):ae(W,p.swipeDirection,z)?(T.current=W,U(Je,y,re,{discrete:!1}),n.target.setPointerCapture(n.pointerId)):(Math.abs(g)>z||Math.abs(P)>z)&&(v.current=null)}),onPointerUp:h(e.onPointerUp,n=>{const g=T.current,P=n.target;if(P.hasPointerCapture(n.pointerId)&&P.releasePointerCapture(n.pointerId),T.current=null,v.current=null,g){const M=n.currentTarget,k={originalEvent:n,delta:g};ae(g,p.swipeDirection,p.swipeThreshold)?U(tt,_,k,{discrete:!0}):U(et,F,k,{discrete:!0}),M.addEventListener("click",K=>K.preventDefault(),{once:!0})}})})))),p.viewport))):null});fe.propTypes={type(e){if(e.type&&!["foreground","background"].includes(e.type)){const t=`Invalid prop \`type\` supplied to \`${q}\`. Expected \`foreground | background\`.`;return new Error(t)}return null}};const nt=e=>{const{__scopeToast:t,children:s,...r}=e,a=B(q,t),[l,m]=o.useState(!1),[d,b]=o.useState(!1);return ut(()=>m(!0)),o.useEffect(()=>{const c=window.setTimeout(()=>b(!0),1e3);return()=>window.clearTimeout(c)},[]),d?null:o.createElement(Me,{asChild:!0},o.createElement(de,r,l&&o.createElement(o.Fragment,null,a.label," ",s)))},at=o.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e;return o.createElement(D.div,S({},r,{ref:t}))}),ct=o.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e;return o.createElement(D.div,S({},r,{ref:t}))}),it="ToastAction",me=o.forwardRef((e,t)=>{const{altText:s,...r}=e;return s?o.createElement(ve,{altText:s,asChild:!0},o.createElement(be,S({},r,{ref:t}))):null});me.propTypes={altText(e){return e.altText?null:new Error(`Missing prop \`altText\` expected on \`${it}\``)}};const dt="ToastClose",be=o.forwardRef((e,t)=>{const{__scopeToast:s,...r}=e,a=rt(dt,s);return o.createElement(ve,{asChild:!0},o.createElement(D.button,S({type:"button"},r,{ref:t,onClick:h(e.onClick,a.onClose)})))}),ve=o.forwardRef((e,t)=>{const{__scopeToast:s,altText:r,...a}=e;return o.createElement(D.div,S({"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":r||void 0},a,{ref:t}))});function Te(e){const t=[];return Array.from(e.childNodes).forEach(r=>{if(r.nodeType===r.TEXT_NODE&&r.textContent&&t.push(r.textContent),lt(r)){const a=r.ariaHidden||r.hidden||r.style.display==="none",l=r.dataset.radixToastAnnounceExclude==="";if(!a)if(l){const m=r.dataset.radixToastAnnounceAlt;m&&t.push(m)}else t.push(...Te(r))}}),t}function U(e,t,s,{discrete:r}){const a=s.originalEvent.currentTarget,l=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:s});t&&a.addEventListener(e,t,{once:!0}),r?ke(a,l):a.dispatchEvent(l)}const ae=(e,t,s=0)=>{const r=Math.abs(e.x),a=Math.abs(e.y),l=r>a;return t==="left"||t==="right"?l&&r>s:!l&&a>s};function ut(e=()=>{}){const t=Y(e);je(()=>{let s=0,r=0;return s=window.requestAnimationFrame(()=>r=window.requestAnimationFrame(t)),()=>{window.cancelAnimationFrame(s),window.cancelAnimationFrame(r)}},[t])}function lt(e){return e.nodeType===e.ELEMENT_NODE}function pt(e){const t=[],s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)t.push(s.currentNode);return t}function G(e){const t=document.activeElement;return e.some(s=>s===t?!0:(s.focus(),document.activeElement!==t))}const ft=pe,$e=ze,we=ot,xe=at,Ee=ct,ye=me,ge=be,mt=ft,he=o.forwardRef(({className:e,...t},s)=>u.jsx($e,{ref:s,className:R("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...t}));he.displayName=$e.displayName;const bt=Ve("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Se=o.forwardRef(({className:e,variant:t,...s},r)=>u.jsx(we,{ref:r,className:R(bt({variant:t}),e),...s}));Se.displayName=we.displayName;const vt=o.forwardRef(({className:e,...t},s)=>u.jsx(ye,{ref:s,className:R("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...t}));vt.displayName=ye.displayName;const Ce=o.forwardRef(({className:e,...t},s)=>u.jsx(ge,{ref:s,className:R("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...t,children:u.jsx(We,{className:"h-4 w-4"})}));Ce.displayName=ge.displayName;const Pe=o.forwardRef(({className:e,...t},s)=>u.jsx(xe,{ref:s,className:R("text-sm font-semibold",e),...t}));Pe.displayName=xe.displayName;const Re=o.forwardRef(({className:e,...t},s)=>u.jsx(Ee,{ref:s,className:R("text-sm opacity-90",e),...t}));Re.displayName=Ee.displayName;const Tt=1,$t=1e6;let J=0;function wt(){return J=(J+1)%Number.MAX_VALUE,J.toString()}const Z=new Map,ce=e=>{if(Z.has(e))return;const t=setTimeout(()=>{Z.delete(e),j({type:"REMOVE_TOAST",toastId:e})},$t);Z.set(e,t)},xt=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,Tt)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case"DISMISS_TOAST":{const{toastId:s}=t;return s?ce(s):e.toasts.forEach(r=>{ce(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===s||s===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)}}},X=[];let H={toasts:[]};function j(e){H=xt(H,e),X.forEach(t=>{t(H)})}function Et({...e}){const t=wt(),s=a=>j({type:"UPDATE_TOAST",toast:{...a,id:t}}),r=()=>j({type:"DISMISS_TOAST",toastId:t});return j({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:a=>{a||r()}}}),{id:t,dismiss:r,update:s}}function yt(){const[e,t]=o.useState(H);return o.useEffect(()=>(X.push(t),()=>{const s=X.indexOf(t);s>-1&&X.splice(s,1)}),[e]),{...e,toast:Et,dismiss:s=>j({type:"DISMISS_TOAST",toastId:s})}}function At(){const{toasts:e}=yt();return u.jsxs(mt,{duration:5e3,children:[e.map(function({id:t,title:s,description:r,action:a,...l}){return u.jsxs(Se,{...l,children:[u.jsxs("div",{className:"grid gap-1",children:[s&&u.jsx(Pe,{children:s}),r&&u.jsx(Re,{children:r})]}),a,u.jsx(Ce,{})]},t)}),u.jsx(he,{})]})}function Nt({hasDescription:e,fontSizeMain:t,className:s}){let r;return e&&(r=u.jsx(u.Fragment,{children:u.jsx("div",{className:" justify-center text-center mt-2 dark:text-gray-200",children:u.jsx("span",{children:"Simplify your expenses, maximize your control"})})})),u.jsx(u.Fragment,{children:u.jsxs("div",{className:"flex justify-center gap-1 flex-col select-none",children:[u.jsxs("div",{className:R("font-semibold flex items-center justify-center gap-4 main-logo",s),children:[u.jsx("span",{className:R(" dark:text-white",t||" text-5xl"),children:"eXpense"}),u.jsx("span",{className:" trackr",children:u.jsx("span",{className:t||" text-5xl",children:"Trackr"})})]}),r]})})}export{de as $,Nt as A,Pt as T,At as a,vt as b,Xe as c,Rt as g,yt as u};
