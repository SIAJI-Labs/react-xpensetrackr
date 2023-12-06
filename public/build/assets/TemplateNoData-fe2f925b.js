import{r as t,j as w}from"./app-763aeab1.js";import{o as he,b as Ee,d as fe,_ as b,e as j,g as Me,i as Ce,$ as T,j as v,h as Q,l as nt,p as ot,q as Re,r as rt,m as ct,c as O}from"./button-461116eb.js";import{$ as Ie,g as se,i as De,j as at,k as st,l as dt,n as ut,o as it,p as ft,q as lt,C as pt}from"./function-0da6b1b7.js";const $t=he("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),bt=he("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),ae="rovingFocusGroup.onEntryFocus",mt={bubbles:!1,cancelable:!0},le="RovingFocusGroup",[de,ye,vt]=Ee(le),[xt,Pe]=fe(le,[vt]),[gt,wt]=xt(le),_t=t.forwardRef((e,o)=>t.createElement(de.Provider,{scope:e.__scopeRovingFocusGroup},t.createElement(de.Slot,{scope:e.__scopeRovingFocusGroup},t.createElement(ht,b({},e,{ref:o}))))),ht=t.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,orientation:r,loop:c=!1,dir:a,currentTabStopId:d,defaultCurrentTabStopId:u,onCurrentTabStopIdChange:l,onEntryFocus:p,...f}=e,s=t.useRef(null),$=j(o,s),x=Ie(a),[m=null,g]=Me({prop:d,defaultProp:u,onChange:l}),[D,E]=t.useState(!1),M=Ce(p),K=ye(n),L=t.useRef(!1),[te,U]=t.useState(0);return t.useEffect(()=>{const _=s.current;if(_)return _.addEventListener(ae,M),()=>_.removeEventListener(ae,M)},[M]),t.createElement(gt,{scope:n,orientation:r,dir:x,loop:c,currentTabStopId:m,onItemFocus:t.useCallback(_=>g(_),[g]),onItemShiftTab:t.useCallback(()=>E(!0),[]),onFocusableItemAdd:t.useCallback(()=>U(_=>_+1),[]),onFocusableItemRemove:t.useCallback(()=>U(_=>_-1),[])},t.createElement(T.div,b({tabIndex:D||te===0?-1:0,"data-orientation":r},f,{ref:$,style:{outline:"none",...e.style},onMouseDown:v(e.onMouseDown,()=>{L.current=!0}),onFocus:v(e.onFocus,_=>{const ne=!L.current;if(_.target===_.currentTarget&&ne&&!D){const F=new CustomEvent(ae,mt);if(_.currentTarget.dispatchEvent(F),!F.defaultPrevented){const S=K().filter(y=>y.focusable),oe=S.find(y=>y.active),B=S.find(y=>y.id===m),V=[oe,B,...S].filter(Boolean).map(y=>y.ref.current);Se(V)}}L.current=!1}),onBlur:v(e.onBlur,()=>E(!1))})))}),Et="RovingFocusGroupItem",Mt=t.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,focusable:r=!0,active:c=!1,tabStopId:a,...d}=e,u=se(),l=a||u,p=wt(Et,n),f=p.currentTabStopId===l,s=ye(n),{onFocusableItemAdd:$,onFocusableItemRemove:x}=p;return t.useEffect(()=>{if(r)return $(),()=>x()},[r,$,x]),t.createElement(de.ItemSlot,{scope:n,id:l,focusable:r,active:c},t.createElement(T.span,b({tabIndex:f?0:-1,"data-orientation":p.orientation},d,{ref:o,onMouseDown:v(e.onMouseDown,m=>{r?p.onItemFocus(l):m.preventDefault()}),onFocus:v(e.onFocus,()=>p.onItemFocus(l)),onKeyDown:v(e.onKeyDown,m=>{if(m.key==="Tab"&&m.shiftKey){p.onItemShiftTab();return}if(m.target!==m.currentTarget)return;const g=It(m,p.orientation,p.dir);if(g!==void 0){m.preventDefault();let E=s().filter(M=>M.focusable).map(M=>M.ref.current);if(g==="last")E.reverse();else if(g==="prev"||g==="next"){g==="prev"&&E.reverse();const M=E.indexOf(m.currentTarget);E=p.loop?Dt(E,M+1):E.slice(M+1)}setTimeout(()=>Se(E))}})})))}),Ct={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Rt(e,o){return o!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function It(e,o,n){const r=Rt(e.key,n);if(!(o==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(o==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Ct[r]}function Se(e){const o=document.activeElement;for(const n of e)if(n===o||(n.focus(),document.activeElement!==o))return}function Dt(e,o){return e.map((n,r)=>e[(o+r)%e.length])}const yt=_t,Pt=Mt,ue=["Enter"," "],St=["ArrowDown","PageUp","Home"],Te=["ArrowUp","PageDown","End"],Tt=[...St,...Te],Ot={ltr:[...ue,"ArrowRight"],rtl:[...ue,"ArrowLeft"]},Ft={ltr:["ArrowLeft"],rtl:["ArrowRight"]},ee="Menu",[X,Nt,kt]=Ee(ee),[k,Oe]=fe(ee,[kt,De,Pe]),pe=De(),Fe=Pe(),[At,A]=k(ee),[Kt,q]=k(ee),Lt=e=>{const{__scopeMenu:o,open:n=!1,children:r,dir:c,onOpenChange:a,modal:d=!0}=e,u=pe(o),[l,p]=t.useState(null),f=t.useRef(!1),s=Ce(a),$=Ie(c);return t.useEffect(()=>{const x=()=>{f.current=!0,document.addEventListener("pointerdown",m,{capture:!0,once:!0}),document.addEventListener("pointermove",m,{capture:!0,once:!0})},m=()=>f.current=!1;return document.addEventListener("keydown",x,{capture:!0}),()=>{document.removeEventListener("keydown",x,{capture:!0}),document.removeEventListener("pointerdown",m,{capture:!0}),document.removeEventListener("pointermove",m,{capture:!0})}},[]),t.createElement(at,u,t.createElement(At,{scope:o,open:n,onOpenChange:s,content:l,onContentChange:p},t.createElement(Kt,{scope:o,onClose:t.useCallback(()=>s(!1),[s]),isUsingKeyboardRef:f,dir:$,modal:d},r)))},Ne=t.forwardRef((e,o)=>{const{__scopeMenu:n,...r}=e,c=pe(n);return t.createElement(st,b({},c,r,{ref:o}))}),ke="MenuPortal",[Gt,Ae]=k(ke,{forceMount:void 0}),jt=e=>{const{__scopeMenu:o,forceMount:n,children:r,container:c}=e,a=A(ke,o);return t.createElement(Gt,{scope:o,forceMount:n},t.createElement(Q,{present:n||a.open},t.createElement(nt,{asChild:!0,container:c},r)))},I="MenuContent",[Ut,$e]=k(I),Bt=t.forwardRef((e,o)=>{const n=Ae(I,e.__scopeMenu),{forceMount:r=n.forceMount,...c}=e,a=A(I,e.__scopeMenu),d=q(I,e.__scopeMenu);return t.createElement(X.Provider,{scope:e.__scopeMenu},t.createElement(Q,{present:r||a.open},t.createElement(X.Slot,{scope:e.__scopeMenu},d.modal?t.createElement(Vt,b({},c,{ref:o})):t.createElement(Yt,b({},c,{ref:o})))))}),Vt=t.forwardRef((e,o)=>{const n=A(I,e.__scopeMenu),r=t.useRef(null),c=j(o,r);return t.useEffect(()=>{const a=r.current;if(a)return dt(a)},[]),t.createElement(be,b({},e,{ref:c,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:v(e.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)}))}),Yt=t.forwardRef((e,o)=>{const n=A(I,e.__scopeMenu);return t.createElement(be,b({},e,{ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)}))}),be=t.forwardRef((e,o)=>{const{__scopeMenu:n,loop:r=!1,trapFocus:c,onOpenAutoFocus:a,onCloseAutoFocus:d,disableOutsidePointerEvents:u,onEntryFocus:l,onEscapeKeyDown:p,onPointerDownOutside:f,onFocusOutside:s,onInteractOutside:$,onDismiss:x,disableOutsideScroll:m,...g}=e,D=A(I,n),E=q(I,n),M=pe(n),K=Fe(n),L=Nt(n),[te,U]=t.useState(null),_=t.useRef(null),ne=j(o,_,D.onContentChange),F=t.useRef(0),S=t.useRef(""),oe=t.useRef(0),B=t.useRef(null),re=t.useRef("right"),V=t.useRef(0),y=m?lt:t.Fragment,et=m?{as:rt,allowPinchZoom:!0}:void 0,tt=i=>{var h,R;const N=S.current+i,Y=L().filter(P=>!P.disabled),ce=document.activeElement,xe=(h=Y.find(P=>P.ref.current===ce))===null||h===void 0?void 0:h.textValue,H=Y.map(P=>P.textValue),z=dn(H,N,xe),ge=(R=Y.find(P=>P.textValue===z))===null||R===void 0?void 0:R.ref.current;(function P(we){S.current=we,window.clearTimeout(F.current),we!==""&&(F.current=window.setTimeout(()=>P(""),1e3))})(N),ge&&setTimeout(()=>ge.focus())};t.useEffect(()=>()=>window.clearTimeout(F.current),[]),ut();const G=t.useCallback(i=>{var h,R;return re.current===((h=B.current)===null||h===void 0?void 0:h.side)&&fn(i,(R=B.current)===null||R===void 0?void 0:R.area)},[]);return t.createElement(Ut,{scope:n,searchRef:S,onItemEnter:t.useCallback(i=>{G(i)&&i.preventDefault()},[G]),onItemLeave:t.useCallback(i=>{var h;G(i)||((h=_.current)===null||h===void 0||h.focus(),U(null))},[G]),onTriggerLeave:t.useCallback(i=>{G(i)&&i.preventDefault()},[G]),pointerGraceTimerRef:oe,onPointerGraceIntentChange:t.useCallback(i=>{B.current=i},[])},t.createElement(y,et,t.createElement(it,{asChild:!0,trapped:c,onMountAutoFocus:v(a,i=>{var h;i.preventDefault(),(h=_.current)===null||h===void 0||h.focus()}),onUnmountAutoFocus:d},t.createElement(ot,{asChild:!0,disableOutsidePointerEvents:u,onEscapeKeyDown:p,onPointerDownOutside:f,onFocusOutside:s,onInteractOutside:$,onDismiss:x},t.createElement(yt,b({asChild:!0},K,{dir:E.dir,orientation:"vertical",loop:r,currentTabStopId:te,onCurrentTabStopIdChange:U,onEntryFocus:v(l,i=>{E.isUsingKeyboardRef.current||i.preventDefault()})}),t.createElement(ft,b({role:"menu","aria-orientation":"vertical","data-state":Ue(D.open),"data-radix-menu-content":"",dir:E.dir},M,g,{ref:ne,style:{outline:"none",...g.style},onKeyDown:v(g.onKeyDown,i=>{const R=i.target.closest("[data-radix-menu-content]")===i.currentTarget,N=i.ctrlKey||i.altKey||i.metaKey,Y=i.key.length===1;R&&(i.key==="Tab"&&i.preventDefault(),!N&&Y&&tt(i.key));const ce=_.current;if(i.target!==ce||!Tt.includes(i.key))return;i.preventDefault();const H=L().filter(z=>!z.disabled).map(z=>z.ref.current);Te.includes(i.key)&&H.reverse(),an(H)}),onBlur:v(e.onBlur,i=>{i.currentTarget.contains(i.target)||(window.clearTimeout(F.current),S.current="")}),onPointerMove:v(e.onPointerMove,W(i=>{const h=i.target,R=V.current!==i.clientX;if(i.currentTarget.contains(h)&&R){const N=i.clientX>V.current?"right":"left";re.current=N,V.current=i.clientX}}))})))))))}),zt=t.forwardRef((e,o)=>{const{__scopeMenu:n,...r}=e;return t.createElement(T.div,b({role:"group"},r,{ref:o}))}),Xt=t.forwardRef((e,o)=>{const{__scopeMenu:n,...r}=e;return t.createElement(T.div,b({},r,{ref:o}))}),ie="MenuItem",_e="menu.itemSelect",me=t.forwardRef((e,o)=>{const{disabled:n=!1,onSelect:r,...c}=e,a=t.useRef(null),d=q(ie,e.__scopeMenu),u=$e(ie,e.__scopeMenu),l=j(o,a),p=t.useRef(!1),f=()=>{const s=a.current;if(!n&&s){const $=new CustomEvent(_e,{bubbles:!0,cancelable:!0});s.addEventListener(_e,x=>r==null?void 0:r(x),{once:!0}),ct(s,$),$.defaultPrevented?p.current=!1:d.onClose()}};return t.createElement(Ke,b({},c,{ref:l,disabled:n,onClick:v(e.onClick,f),onPointerDown:s=>{var $;($=e.onPointerDown)===null||$===void 0||$.call(e,s),p.current=!0},onPointerUp:v(e.onPointerUp,s=>{var $;p.current||($=s.currentTarget)===null||$===void 0||$.click()}),onKeyDown:v(e.onKeyDown,s=>{const $=u.searchRef.current!=="";n||$&&s.key===" "||ue.includes(s.key)&&(s.currentTarget.click(),s.preventDefault())})}))}),Ke=t.forwardRef((e,o)=>{const{__scopeMenu:n,disabled:r=!1,textValue:c,...a}=e,d=$e(ie,n),u=Fe(n),l=t.useRef(null),p=j(o,l),[f,s]=t.useState(!1),[$,x]=t.useState("");return t.useEffect(()=>{const m=l.current;if(m){var g;x(((g=m.textContent)!==null&&g!==void 0?g:"").trim())}},[a.children]),t.createElement(X.ItemSlot,{scope:n,disabled:r,textValue:c??$},t.createElement(Pt,b({asChild:!0},u,{focusable:!r}),t.createElement(T.div,b({role:"menuitem","data-highlighted":f?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0},a,{ref:p,onPointerMove:v(e.onPointerMove,W(m=>{r?d.onItemLeave(m):(d.onItemEnter(m),m.defaultPrevented||m.currentTarget.focus())})),onPointerLeave:v(e.onPointerLeave,W(m=>d.onItemLeave(m))),onFocus:v(e.onFocus,()=>s(!0)),onBlur:v(e.onBlur,()=>s(!1))}))))}),Wt=t.forwardRef((e,o)=>{const{checked:n=!1,onCheckedChange:r,...c}=e;return t.createElement(Ge,{scope:e.__scopeMenu,checked:n},t.createElement(me,b({role:"menuitemcheckbox","aria-checked":J(n)?"mixed":n},c,{ref:o,"data-state":ve(n),onSelect:v(c.onSelect,()=>r==null?void 0:r(J(n)?!0:!n),{checkForDefaultPrevented:!1})})))}),qt="MenuRadioGroup",[oo,Ht]=k(qt,{value:void 0,onValueChange:()=>{}}),Zt="MenuRadioItem",Jt=t.forwardRef((e,o)=>{const{value:n,...r}=e,c=Ht(Zt,e.__scopeMenu),a=n===c.value;return t.createElement(Ge,{scope:e.__scopeMenu,checked:a},t.createElement(me,b({role:"menuitemradio","aria-checked":a},r,{ref:o,"data-state":ve(a),onSelect:v(r.onSelect,()=>{var d;return(d=c.onValueChange)===null||d===void 0?void 0:d.call(c,n)},{checkForDefaultPrevented:!1})})))}),Le="MenuItemIndicator",[Ge,Qt]=k(Le,{checked:!1}),en=t.forwardRef((e,o)=>{const{__scopeMenu:n,forceMount:r,...c}=e,a=Qt(Le,n);return t.createElement(Q,{present:r||J(a.checked)||a.checked===!0},t.createElement(T.span,b({},c,{ref:o,"data-state":ve(a.checked)})))}),tn=t.forwardRef((e,o)=>{const{__scopeMenu:n,...r}=e;return t.createElement(T.div,b({role:"separator","aria-orientation":"horizontal"},r,{ref:o}))}),nn="MenuSub",[ro,je]=k(nn),Z="MenuSubTrigger",on=t.forwardRef((e,o)=>{const n=A(Z,e.__scopeMenu),r=q(Z,e.__scopeMenu),c=je(Z,e.__scopeMenu),a=$e(Z,e.__scopeMenu),d=t.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:l}=a,p={__scopeMenu:e.__scopeMenu},f=t.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return t.useEffect(()=>f,[f]),t.useEffect(()=>{const s=u.current;return()=>{window.clearTimeout(s),l(null)}},[u,l]),t.createElement(Ne,b({asChild:!0},p),t.createElement(Ke,b({id:c.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":c.contentId,"data-state":Ue(n.open)},e,{ref:Re(o,c.onTriggerChange),onClick:s=>{var $;($=e.onClick)===null||$===void 0||$.call(e,s),!(e.disabled||s.defaultPrevented)&&(s.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:v(e.onPointerMove,W(s=>{a.onItemEnter(s),!s.defaultPrevented&&!e.disabled&&!n.open&&!d.current&&(a.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{n.onOpenChange(!0),f()},100))})),onPointerLeave:v(e.onPointerLeave,W(s=>{var $;f();const x=($=n.content)===null||$===void 0?void 0:$.getBoundingClientRect();if(x){var m;const g=(m=n.content)===null||m===void 0?void 0:m.dataset.side,D=g==="right",E=D?-5:5,M=x[D?"left":"right"],K=x[D?"right":"left"];a.onPointerGraceIntentChange({area:[{x:s.clientX+E,y:s.clientY},{x:M,y:x.top},{x:K,y:x.top},{x:K,y:x.bottom},{x:M,y:x.bottom}],side:g}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(s),s.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:v(e.onKeyDown,s=>{const $=a.searchRef.current!=="";if(!(e.disabled||$&&s.key===" ")&&Ot[r.dir].includes(s.key)){var x;n.onOpenChange(!0),(x=n.content)===null||x===void 0||x.focus(),s.preventDefault()}})})))}),rn="MenuSubContent",cn=t.forwardRef((e,o)=>{const n=Ae(I,e.__scopeMenu),{forceMount:r=n.forceMount,...c}=e,a=A(I,e.__scopeMenu),d=q(I,e.__scopeMenu),u=je(rn,e.__scopeMenu),l=t.useRef(null),p=j(o,l);return t.createElement(X.Provider,{scope:e.__scopeMenu},t.createElement(Q,{present:r||a.open},t.createElement(X.Slot,{scope:e.__scopeMenu},t.createElement(be,b({id:u.contentId,"aria-labelledby":u.triggerId},c,{ref:p,align:"start",side:d.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:f=>{var s;d.isUsingKeyboardRef.current&&((s=l.current)===null||s===void 0||s.focus()),f.preventDefault()},onCloseAutoFocus:f=>f.preventDefault(),onFocusOutside:v(e.onFocusOutside,f=>{f.target!==u.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:v(e.onEscapeKeyDown,f=>{d.onClose(),f.preventDefault()}),onKeyDown:v(e.onKeyDown,f=>{const s=f.currentTarget.contains(f.target),$=Ft[d.dir].includes(f.key);if(s&&$){var x;a.onOpenChange(!1),(x=u.trigger)===null||x===void 0||x.focus(),f.preventDefault()}})})))))});function Ue(e){return e?"open":"closed"}function J(e){return e==="indeterminate"}function ve(e){return J(e)?"indeterminate":e?"checked":"unchecked"}function an(e){const o=document.activeElement;for(const n of e)if(n===o||(n.focus(),document.activeElement!==o))return}function sn(e,o){return e.map((n,r)=>e[(o+r)%e.length])}function dn(e,o,n){const c=o.length>1&&Array.from(o).every(p=>p===o[0])?o[0]:o,a=n?e.indexOf(n):-1;let d=sn(e,Math.max(a,0));c.length===1&&(d=d.filter(p=>p!==n));const l=d.find(p=>p.toLowerCase().startsWith(c.toLowerCase()));return l!==n?l:void 0}function un(e,o){const{x:n,y:r}=e;let c=!1;for(let a=0,d=o.length-1;a<o.length;d=a++){const u=o[a].x,l=o[a].y,p=o[d].x,f=o[d].y;l>r!=f>r&&n<(p-u)*(r-l)/(f-l)+u&&(c=!c)}return c}function fn(e,o){if(!o)return!1;const n={x:e.clientX,y:e.clientY};return un(n,o)}function W(e){return o=>o.pointerType==="mouse"?e(o):void 0}const ln=Lt,pn=Ne,$n=jt,bn=Bt,mn=zt,vn=Xt,xn=me,gn=Wt,wn=Jt,_n=en,hn=tn,En=on,Mn=cn,Be="DropdownMenu",[Cn,co]=fe(Be,[Oe]),C=Oe(),[Rn,Ve]=Cn(Be),In=e=>{const{__scopeDropdownMenu:o,children:n,dir:r,open:c,defaultOpen:a,onOpenChange:d,modal:u=!0}=e,l=C(o),p=t.useRef(null),[f=!1,s]=Me({prop:c,defaultProp:a,onChange:d});return t.createElement(Rn,{scope:o,triggerId:se(),triggerRef:p,contentId:se(),open:f,onOpenChange:s,onOpenToggle:t.useCallback(()=>s($=>!$),[s]),modal:u},t.createElement(ln,b({},l,{open:f,onOpenChange:s,dir:r,modal:u}),n))},Dn="DropdownMenuTrigger",yn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,disabled:r=!1,...c}=e,a=Ve(Dn,n),d=C(n);return t.createElement(pn,b({asChild:!0},d),t.createElement(T.button,b({type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":r?"":void 0,disabled:r},c,{ref:Re(o,a.triggerRef),onPointerDown:v(e.onPointerDown,u=>{!r&&u.button===0&&u.ctrlKey===!1&&(a.onOpenToggle(),a.open||u.preventDefault())}),onKeyDown:v(e.onKeyDown,u=>{r||(["Enter"," "].includes(u.key)&&a.onOpenToggle(),u.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(u.key)&&u.preventDefault())})})))}),Pn=e=>{const{__scopeDropdownMenu:o,...n}=e,r=C(o);return t.createElement($n,b({},r,n))},Sn="DropdownMenuContent",Tn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=Ve(Sn,n),a=C(n),d=t.useRef(!1);return t.createElement(bn,b({id:c.contentId,"aria-labelledby":c.triggerId},a,r,{ref:o,onCloseAutoFocus:v(e.onCloseAutoFocus,u=>{var l;d.current||(l=c.triggerRef.current)===null||l===void 0||l.focus(),d.current=!1,u.preventDefault()}),onInteractOutside:v(e.onInteractOutside,u=>{const l=u.detail.originalEvent,p=l.button===0&&l.ctrlKey===!0,f=l.button===2||p;(!c.modal||f)&&(d.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),On=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(mn,b({},c,r,{ref:o}))}),Fn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(vn,b({},c,r,{ref:o}))}),Nn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(xn,b({},c,r,{ref:o}))}),kn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(gn,b({},c,r,{ref:o}))}),An=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(wn,b({},c,r,{ref:o}))}),Kn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(_n,b({},c,r,{ref:o}))}),Ln=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(hn,b({},c,r,{ref:o}))}),Gn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(En,b({},c,r,{ref:o}))}),jn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...r}=e,c=C(n);return t.createElement(Mn,b({},c,r,{ref:o,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),Un=In,Bn=yn,Vn=Pn,Ye=Tn,Yn=On,ze=Fn,Xe=Nn,We=kn,qe=An,He=Kn,Ze=Ln,Je=Gn,Qe=jn,ao=Un,so=Bn,uo=Yn,zn=t.forwardRef(({className:e,inset:o,children:n,...r},c)=>w.jsxs(Je,{ref:c,className:O("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",o&&"pl-8",e),...r,children:[n,w.jsx($t,{className:"ml-auto h-4 w-4"})]}));zn.displayName=Je.displayName;const Xn=t.forwardRef(({className:e,...o},n)=>w.jsx(Qe,{ref:n,className:O("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...o}));Xn.displayName=Qe.displayName;const Wn=t.forwardRef(({className:e,sideOffset:o=4,...n},r)=>w.jsx(Vn,{children:w.jsx(Ye,{ref:r,sideOffset:o,className:O("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n})}));Wn.displayName=Ye.displayName;const qn=t.forwardRef(({className:e,inset:o,...n},r)=>w.jsx(Xe,{ref:r,className:O("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",o&&"pl-8",e),...n}));qn.displayName=Xe.displayName;const Hn=t.forwardRef(({className:e,children:o,checked:n,...r},c)=>w.jsxs(We,{ref:c,className:O("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:n,...r,children:[w.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:w.jsx(He,{children:w.jsx(pt,{className:"h-4 w-4"})})}),o]}));Hn.displayName=We.displayName;const Zn=t.forwardRef(({className:e,children:o,...n},r)=>w.jsxs(qe,{ref:r,className:O("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...n,children:[w.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:w.jsx(He,{children:w.jsx(bt,{className:"h-2 w-2 fill-current"})})}),o]}));Zn.displayName=qe.displayName;const Jn=t.forwardRef(({className:e,inset:o,...n},r)=>w.jsx(ze,{ref:r,className:O("px-2 py-1.5 text-sm font-semibold",o&&"pl-8",e),...n}));Jn.displayName=ze.displayName;const Qn=t.forwardRef(({className:e,...o},n)=>w.jsx(Ze,{ref:n,className:O("-mx-1 my-1 h-px bg-muted",e),...o}));Qn.displayName=Ze.displayName;function io({hasBorder:e=!0}){let o=(Math.random()+1).toString(36).substring(7);return w.jsx("section",{children:w.jsx("div",{className:` ${e?"border":""} p-4 rounded flex flex-row items-center justify-center`,children:w.jsx("span",{children:"No data available"})})},o)}export{Pe as $,$t as C,ao as D,io as T,so as a,Wn as b,qn as c,yt as d,Pt as e,Jn as f,Qn as g,uo as h};
