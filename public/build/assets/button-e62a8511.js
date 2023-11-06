import{r as l,b as S,c as ge,f as Me,j as Oe}from"./app-5552f331.js";function k(){return k=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},k.apply(this,arguments)}function Q(e,r,{checkForDefaultPrevented:t=!0}={}){return function(o){if(e==null||e(o),t===!1||!o.defaultPrevented)return r==null?void 0:r(o)}}function Ne(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function he(...e){return r=>e.forEach(t=>Ne(t,r))}function U(...e){return l.useCallback(he(...e),e)}function Nr(e,r){const t=l.createContext(r);function n(i){const{children:a,...s}=i,d=l.useMemo(()=>s,Object.values(s));return l.createElement(t.Provider,{value:d},a)}function o(i){const a=l.useContext(t);if(a)return a;if(r!==void 0)return r;throw new Error(`\`${i}\` must be used within \`${e}\``)}return n.displayName=e+"Provider",[n,o]}function ke(e,r=[]){let t=[];function n(i,a){const s=l.createContext(a),d=t.length;t=[...t,a];function c(u){const{scope:b,children:p,...m}=u,h=(b==null?void 0:b[e][d])||s,g=l.useMemo(()=>m,Object.values(m));return l.createElement(h.Provider,{value:g},p)}function f(u,b){const p=(b==null?void 0:b[e][d])||s,m=l.useContext(p);if(m)return m;if(a!==void 0)return a;throw new Error(`\`${u}\` must be used within \`${i}\``)}return c.displayName=i+"Provider",[c,f]}const o=()=>{const i=t.map(a=>l.createContext(a));return function(s){const d=(s==null?void 0:s[e])||i;return l.useMemo(()=>({[`__scope${e}`]:{...s,[e]:d}}),[s,d])}};return o.scopeName=e,[n,Re(o,...r)]}function Re(...e){const r=e[0];if(e.length===1)return r;const t=()=>{const n=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(i){const a=n.reduce((s,{useScope:d,scopeName:c})=>{const u=d(i)[`__scope${c}`];return{...s,...u}},{});return l.useMemo(()=>({[`__scope${r.scopeName}`]:a}),[a])}};return t.scopeName=r.scopeName,t}const B=l.forwardRef((e,r)=>{const{children:t,...n}=e,o=l.Children.toArray(t),i=o.find(Ie);if(i){const a=i.props.children,s=o.map(d=>d===i?l.Children.count(a)>1?l.Children.only(null):l.isValidElement(a)?a.props.children:null:d);return l.createElement(Y,k({},n,{ref:r}),l.isValidElement(a)?l.cloneElement(a,void 0,s):null)}return l.createElement(Y,k({},n,{ref:r}),t)});B.displayName="Slot";const Y=l.forwardRef((e,r)=>{const{children:t,...n}=e;return l.isValidElement(t)?l.cloneElement(t,{...Le(n,t.props),ref:r?he(r,t.ref):t.ref}):l.Children.count(t)>1?l.Children.only(null):null});Y.displayName="SlotClone";const Te=({children:e})=>l.createElement(l.Fragment,null,e);function Ie(e){return l.isValidElement(e)&&e.type===Te}function Le(e,r){const t={...r};for(const n in r){const o=e[n],i=r[n];/^on[A-Z]/.test(n)?o&&i?t[n]=(...s)=>{i(...s),o(...s)}:o&&(t[n]=o):n==="style"?t[n]={...o,...i}:n==="className"&&(t[n]=[o,i].filter(Boolean).join(" "))}return{...e,...t}}function kr(e){const r=e+"CollectionProvider",[t,n]=ke(r),[o,i]=t(r,{collectionRef:{current:null},itemMap:new Map}),a=p=>{const{scope:m,children:h}=p,g=S.useRef(null),$=S.useRef(new Map).current;return S.createElement(o,{scope:m,itemMap:$,collectionRef:g},h)},s=e+"CollectionSlot",d=S.forwardRef((p,m)=>{const{scope:h,children:g}=p,$=i(s,h),C=U(m,$.collectionRef);return S.createElement(B,{ref:C},g)}),c=e+"CollectionItemSlot",f="data-radix-collection-item",u=S.forwardRef((p,m)=>{const{scope:h,children:g,...$}=p,C=S.useRef(null),M=U(m,C),A=i(c,h);return S.useEffect(()=>(A.itemMap.set(C,{ref:C,...$}),()=>void A.itemMap.delete(C))),S.createElement(B,{[f]:"",ref:M},g)});function b(p){const m=i(e+"CollectionConsumer",p);return S.useCallback(()=>{const g=m.collectionRef.current;if(!g)return[];const $=Array.from(g.querySelectorAll(`[${f}]`));return Array.from(m.itemMap.values()).sort((A,R)=>$.indexOf(A.ref.current)-$.indexOf(R.ref.current))},[m.collectionRef,m.itemMap])}return[{Provider:a,Slot:d,ItemSlot:u},b,n]}const ze=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],ne=ze.reduce((e,r)=>{const t=l.forwardRef((n,o)=>{const{asChild:i,...a}=n,s=i?B:r;return l.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),l.createElement(s,k({},a,{ref:o}))});return t.displayName=`Primitive.${r}`,{...e,[r]:t}},{});function Ge(e,r){e&&ge.flushSync(()=>e.dispatchEvent(r))}function V(e){const r=l.useRef(e);return l.useEffect(()=>{r.current=e}),l.useMemo(()=>(...t)=>{var n;return(n=r.current)===null||n===void 0?void 0:n.call(r,...t)},[])}function De(e,r=globalThis==null?void 0:globalThis.document){const t=V(e);l.useEffect(()=>{const n=o=>{o.key==="Escape"&&t(o)};return r.addEventListener("keydown",n),()=>r.removeEventListener("keydown",n)},[t,r])}const ee="dismissableLayer.update",je="dismissableLayer.pointerDownOutside",We="dismissableLayer.focusOutside";let ce;const ye=l.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),_e=l.forwardRef((e,r)=>{var t;const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:o,onPointerDownOutside:i,onFocusOutside:a,onInteractOutside:s,onDismiss:d,...c}=e,f=l.useContext(ye),[u,b]=l.useState(null),p=(t=u==null?void 0:u.ownerDocument)!==null&&t!==void 0?t:globalThis==null?void 0:globalThis.document,[,m]=l.useState({}),h=U(r,w=>b(w)),g=Array.from(f.layers),[$]=[...f.layersWithOutsidePointerEventsDisabled].slice(-1),C=g.indexOf($),M=u?g.indexOf(u):-1,A=f.layersWithOutsidePointerEventsDisabled.size>0,R=M>=C,F=Be(w=>{const O=w.target,z=[...f.branches].some(T=>T.contains(O));!R||z||(i==null||i(w),s==null||s(w),w.defaultPrevented||d==null||d())},p),G=Ve(w=>{const O=w.target;[...f.branches].some(T=>T.contains(O))||(a==null||a(w),s==null||s(w),w.defaultPrevented||d==null||d())},p);return De(w=>{M===f.layers.size-1&&(o==null||o(w),!w.defaultPrevented&&d&&(w.preventDefault(),d()))},p),l.useEffect(()=>{if(u)return n&&(f.layersWithOutsidePointerEventsDisabled.size===0&&(ce=p.body.style.pointerEvents,p.body.style.pointerEvents="none"),f.layersWithOutsidePointerEventsDisabled.add(u)),f.layers.add(u),de(),()=>{n&&f.layersWithOutsidePointerEventsDisabled.size===1&&(p.body.style.pointerEvents=ce)}},[u,p,n,f]),l.useEffect(()=>()=>{u&&(f.layers.delete(u),f.layersWithOutsidePointerEventsDisabled.delete(u),de())},[u,f]),l.useEffect(()=>{const w=()=>m({});return document.addEventListener(ee,w),()=>document.removeEventListener(ee,w)},[]),l.createElement(ne.div,k({},c,{ref:h,style:{pointerEvents:A?R?"auto":"none":void 0,...e.style},onFocusCapture:Q(e.onFocusCapture,G.onFocusCapture),onBlurCapture:Q(e.onBlurCapture,G.onBlurCapture),onPointerDownCapture:Q(e.onPointerDownCapture,F.onPointerDownCapture)}))}),Ue=l.forwardRef((e,r)=>{const t=l.useContext(ye),n=l.useRef(null),o=U(r,n);return l.useEffect(()=>{const i=n.current;if(i)return t.branches.add(i),()=>{t.branches.delete(i)}},[t.branches]),l.createElement(ne.div,k({},e,{ref:o}))});function Be(e,r=globalThis==null?void 0:globalThis.document){const t=V(e),n=l.useRef(!1),o=l.useRef(()=>{});return l.useEffect(()=>{const i=s=>{if(s.target&&!n.current){let c=function(){xe(je,t,d,{discrete:!0})};const d={originalEvent:s};s.pointerType==="touch"?(r.removeEventListener("click",o.current),o.current=c,r.addEventListener("click",o.current,{once:!0})):c()}else r.removeEventListener("click",o.current);n.current=!1},a=window.setTimeout(()=>{r.addEventListener("pointerdown",i)},0);return()=>{window.clearTimeout(a),r.removeEventListener("pointerdown",i),r.removeEventListener("click",o.current)}},[r,t]),{onPointerDownCapture:()=>n.current=!0}}function Ve(e,r=globalThis==null?void 0:globalThis.document){const t=V(e),n=l.useRef(!1);return l.useEffect(()=>{const o=i=>{i.target&&!n.current&&xe(We,t,{originalEvent:i},{discrete:!1})};return r.addEventListener("focusin",o),()=>r.removeEventListener("focusin",o)},[r,t]),{onFocusCapture:()=>n.current=!0,onBlurCapture:()=>n.current=!1}}function de(){const e=new CustomEvent(ee);document.dispatchEvent(e)}function xe(e,r,t,{discrete:n}){const o=t.originalEvent.target,i=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:t});r&&o.addEventListener(e,r,{once:!0}),n?Ge(o,i):o.dispatchEvent(i)}const Rr=_e,Tr=Ue,Ir=l.forwardRef((e,r)=>{var t;const{container:n=globalThis==null||(t=globalThis.document)===null||t===void 0?void 0:t.body,...o}=e;return n?Me.createPortal(l.createElement(ne.div,k({},o,{ref:r})),n):null}),ue=globalThis!=null&&globalThis.document?l.useLayoutEffect:()=>{};function Fe(e,r){return l.useReducer((t,n)=>{const o=r[t][n];return o??t},e)}const Ke=e=>{const{present:r,children:t}=e,n=qe(r),o=typeof t=="function"?t({present:n.isPresent}):l.Children.only(t),i=U(n.ref,o.ref);return typeof t=="function"||n.isPresent?l.cloneElement(o,{ref:i}):null};Ke.displayName="Presence";function qe(e){const[r,t]=l.useState(),n=l.useRef({}),o=l.useRef(e),i=l.useRef("none"),a=e?"mounted":"unmounted",[s,d]=Fe(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return l.useEffect(()=>{const c=X(n.current);i.current=s==="mounted"?c:"none"},[s]),ue(()=>{const c=n.current,f=o.current;if(f!==e){const b=i.current,p=X(c);e?d("MOUNT"):p==="none"||(c==null?void 0:c.display)==="none"?d("UNMOUNT"):d(f&&b!==p?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,d]),ue(()=>{if(r){const c=u=>{const p=X(n.current).includes(u.animationName);u.target===r&&p&&ge.flushSync(()=>d("ANIMATION_END"))},f=u=>{u.target===r&&(i.current=X(n.current))};return r.addEventListener("animationstart",f),r.addEventListener("animationcancel",c),r.addEventListener("animationend",c),()=>{r.removeEventListener("animationstart",f),r.removeEventListener("animationcancel",c),r.removeEventListener("animationend",c)}}else d("ANIMATION_END")},[r,d]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:l.useCallback(c=>{c&&(n.current=getComputedStyle(c)),t(c)},[])}}function X(e){return(e==null?void 0:e.animationName)||"none"}function Lr({prop:e,defaultProp:r,onChange:t=()=>{}}){const[n,o]=Ze({defaultProp:r,onChange:t}),i=e!==void 0,a=i?e:n,s=V(t),d=l.useCallback(c=>{if(i){const u=typeof c=="function"?c(e):c;u!==e&&s(u)}else o(c)},[i,e,o,s]);return[a,d]}function Ze({defaultProp:e,onChange:r}){const t=l.useState(e),[n]=t,o=l.useRef(n),i=V(r);return l.useEffect(()=>{o.current!==n&&(i(n),o.current=n)},[n,o,i]),t}function we(e){var r,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=we(e[r]))&&(n&&(n+=" "),n+=t);else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function $e(){for(var e,r,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(r=we(e))&&(n&&(n+=" "),n+=r);return n}const fe=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,pe=$e,Xe=(e,r)=>t=>{var n;if((r==null?void 0:r.variants)==null)return pe(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:o,defaultVariants:i}=r,a=Object.keys(o).map(c=>{const f=t==null?void 0:t[c],u=i==null?void 0:i[c];if(f===null)return null;const b=fe(f)||fe(u);return o[c][b]}),s=t&&Object.entries(t).reduce((c,f)=>{let[u,b]=f;return b===void 0||(c[u]=b),c},{}),d=r==null||(n=r.compoundVariants)===null||n===void 0?void 0:n.reduce((c,f)=>{let{class:u,className:b,...p}=f;return Object.entries(p).every(m=>{let[h,g]=m;return Array.isArray(g)?g.includes({...i,...s}[h]):{...i,...s}[h]===g})?[...c,u,b]:c},[]);return pe(e,a,d,t==null?void 0:t.class,t==null?void 0:t.className)};var He={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Je=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),zr=(e,r)=>{const t=l.forwardRef(({color:n="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:a,children:s,...d},c)=>l.createElement("svg",{ref:c,...He,width:o,height:o,stroke:n,strokeWidth:a?Number(i)*24/Number(o):i,className:`lucide lucide-${Je(e)}`,...d},[...r.map(([f,u])=>l.createElement(f,u)),...(Array.isArray(s)?s:[s])||[]]));return t.displayName=`${e}`,t};function Qe(){for(var e=0,r,t,n="";e<arguments.length;)(r=arguments[e++])&&(t=Ce(r))&&(n&&(n+=" "),n+=t);return n}function Ce(e){if(typeof e=="string")return e;for(var r,t="",n=0;n<e.length;n++)e[n]&&(r=Ce(e[n]))&&(t&&(t+=" "),t+=r);return t}var oe="-";function Ye(e){var r=rr(e),t=e.conflictingClassGroups,n=e.conflictingClassGroupModifiers,o=n===void 0?{}:n;function i(s){var d=s.split(oe);return d[0]===""&&d.length!==1&&d.shift(),Ee(d,r)||er(s)}function a(s,d){var c=t[s]||[];return d&&o[s]?[].concat(c,o[s]):c}return{getClassGroupId:i,getConflictingClassGroupIds:a}}function Ee(e,r){var a;if(e.length===0)return r.classGroupId;var t=e[0],n=r.nextPart.get(t),o=n?Ee(e.slice(1),n):void 0;if(o)return o;if(r.validators.length!==0){var i=e.join(oe);return(a=r.validators.find(function(s){var d=s.validator;return d(i)}))==null?void 0:a.classGroupId}}var be=/^\[(.+)\]$/;function er(e){if(be.test(e)){var r=be.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function rr(e){var r=e.theme,t=e.prefix,n={nextPart:new Map,validators:[]},o=nr(Object.entries(e.classGroups),t);return o.forEach(function(i){var a=i[0],s=i[1];re(s,n,a,r)}),n}function re(e,r,t,n){e.forEach(function(o){if(typeof o=="string"){var i=o===""?r:ve(r,o);i.classGroupId=t;return}if(typeof o=="function"){if(tr(o)){re(o(n),r,t,n);return}r.validators.push({validator:o,classGroupId:t});return}Object.entries(o).forEach(function(a){var s=a[0],d=a[1];re(d,ve(r,s),t,n)})})}function ve(e,r){var t=e;return r.split(oe).forEach(function(n){t.nextPart.has(n)||t.nextPart.set(n,{nextPart:new Map,validators:[]}),t=t.nextPart.get(n)}),t}function tr(e){return e.isThemeGetter}function nr(e,r){return r?e.map(function(t){var n=t[0],o=t[1],i=o.map(function(a){return typeof a=="string"?r+a:typeof a=="object"?Object.fromEntries(Object.entries(a).map(function(s){var d=s[0],c=s[1];return[r+d,c]})):a});return[n,i]}):e}function or(e){if(e<1)return{get:function(){},set:function(){}};var r=0,t=new Map,n=new Map;function o(i,a){t.set(i,a),r++,r>e&&(r=0,n=t,t=new Map)}return{get:function(a){var s=t.get(a);if(s!==void 0)return s;if((s=n.get(a))!==void 0)return o(a,s),s},set:function(a,s){t.has(a)?t.set(a,s):o(a,s)}}}var Pe="!";function ir(e){var r=e.separator||":",t=r.length===1,n=r[0],o=r.length;return function(a){for(var s=[],d=0,c=0,f,u=0;u<a.length;u++){var b=a[u];if(d===0){if(b===n&&(t||a.slice(u,u+o)===r)){s.push(a.slice(c,u)),c=u+o;continue}if(b==="/"){f=u;continue}}b==="["?d++:b==="]"&&d--}var p=s.length===0?a:a.substring(c),m=p.startsWith(Pe),h=m?p.substring(1):p,g=f&&f>c?f-c:void 0;return{modifiers:s,hasImportantModifier:m,baseClassName:h,maybePostfixModifierPosition:g}}}function sr(e){if(e.length<=1)return e;var r=[],t=[];return e.forEach(function(n){var o=n[0]==="[";o?(r.push.apply(r,t.sort().concat([n])),t=[]):t.push(n)}),r.push.apply(r,t.sort()),r}function ar(e){return{cache:or(e.cacheSize),splitModifiers:ir(e),...Ye(e)}}var lr=/\s+/;function cr(e,r){var t=r.splitModifiers,n=r.getClassGroupId,o=r.getConflictingClassGroupIds,i=new Set;return e.trim().split(lr).map(function(a){var s=t(a),d=s.modifiers,c=s.hasImportantModifier,f=s.baseClassName,u=s.maybePostfixModifierPosition,b=n(u?f.substring(0,u):f),p=!!u;if(!b){if(!u)return{isTailwindClass:!1,originalClassName:a};if(b=n(f),!b)return{isTailwindClass:!1,originalClassName:a};p=!1}var m=sr(d).join(":"),h=c?m+Pe:m;return{isTailwindClass:!0,modifierId:h,classGroupId:b,originalClassName:a,hasPostfixModifier:p}}).reverse().filter(function(a){if(!a.isTailwindClass)return!0;var s=a.modifierId,d=a.classGroupId,c=a.hasPostfixModifier,f=s+d;return i.has(f)?!1:(i.add(f),o(d,c).forEach(function(u){return i.add(s+u)}),!0)}).reverse().map(function(a){return a.originalClassName}).join(" ")}function dr(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n,o,i,a=s;function s(c){var f=r[0],u=r.slice(1),b=u.reduce(function(p,m){return m(p)},f());return n=ar(b),o=n.cache.get,i=n.cache.set,a=d,d(c)}function d(c){var f=o(c);if(f)return f;var u=cr(c,n);return i(c,u),u}return function(){return a(Qe.apply(null,arguments))}}function y(e){var r=function(n){return n[e]||[]};return r.isThemeGetter=!0,r}var Ae=/^\[(?:([a-z-]+):)?(.+)\]$/i,ur=/^\d+\/\d+$/,fr=new Set(["px","full","screen"]),pr=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,br=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,vr=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;function P(e){return I(e)||fr.has(e)||ur.test(e)||te(e)}function te(e){return L(e,"length",wr)}function mr(e){return L(e,"size",Se)}function gr(e){return L(e,"position",Se)}function hr(e){return L(e,"url",$r)}function H(e){return L(e,"number",I)}function I(e){return!Number.isNaN(Number(e))}function yr(e){return e.endsWith("%")&&I(e.slice(0,-1))}function W(e){return me(e)||L(e,"number",me)}function v(e){return Ae.test(e)}function _(){return!0}function N(e){return pr.test(e)}function xr(e){return L(e,"",Cr)}function L(e,r,t){var n=Ae.exec(e);return n?n[1]?n[1]===r:t(n[2]):!1}function wr(e){return br.test(e)}function Se(){return!1}function $r(e){return e.startsWith("url(")}function me(e){return Number.isInteger(Number(e))}function Cr(e){return vr.test(e)}function Er(){var e=y("colors"),r=y("spacing"),t=y("blur"),n=y("brightness"),o=y("borderColor"),i=y("borderRadius"),a=y("borderSpacing"),s=y("borderWidth"),d=y("contrast"),c=y("grayscale"),f=y("hueRotate"),u=y("invert"),b=y("gap"),p=y("gradientColorStops"),m=y("gradientColorStopPositions"),h=y("inset"),g=y("margin"),$=y("opacity"),C=y("padding"),M=y("saturate"),A=y("scale"),R=y("sepia"),F=y("skew"),G=y("space"),w=y("translate"),O=function(){return["auto","contain","none"]},z=function(){return["auto","hidden","clip","visible","scroll"]},T=function(){return["auto",v,r]},x=function(){return[v,r]},ie=function(){return["",P]},K=function(){return["auto",I,v]},se=function(){return["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"]},q=function(){return["solid","dashed","dotted","double","none"]},ae=function(){return["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"]},J=function(){return["start","end","center","between","around","evenly","stretch"]},D=function(){return["","0",v]},le=function(){return["auto","avoid","all","avoid-page","page","left","right","column"]},j=function(){return[I,H]},Z=function(){return[I,v]};return{cacheSize:500,theme:{colors:[_],spacing:[P],blur:["none","",N,v],brightness:j(),borderColor:[e],borderRadius:["none","","full",N,v],borderSpacing:x(),borderWidth:ie(),contrast:j(),grayscale:D(),hueRotate:Z(),invert:D(),gap:x(),gradientColorStops:[e],gradientColorStopPositions:[yr,te],inset:T(),margin:T(),opacity:j(),padding:x(),saturate:j(),scale:j(),sepia:D(),skew:Z(),space:x(),translate:x()},classGroups:{aspect:[{aspect:["auto","square","video",v]}],container:["container"],columns:[{columns:[N]}],"break-after":[{"break-after":le()}],"break-before":[{"break-before":le()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[].concat(se(),[v])}],overflow:[{overflow:z()}],"overflow-x":[{"overflow-x":z()}],"overflow-y":[{"overflow-y":z()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[h]}],"inset-x":[{"inset-x":[h]}],"inset-y":[{"inset-y":[h]}],start:[{start:[h]}],end:[{end:[h]}],top:[{top:[h]}],right:[{right:[h]}],bottom:[{bottom:[h]}],left:[{left:[h]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",W]}],basis:[{basis:T()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",v]}],grow:[{grow:D()}],shrink:[{shrink:D()}],order:[{order:["first","last","none",W]}],"grid-cols":[{"grid-cols":[_]}],"col-start-end":[{col:["auto",{span:["full",W]},v]}],"col-start":[{"col-start":K()}],"col-end":[{"col-end":K()}],"grid-rows":[{"grid-rows":[_]}],"row-start-end":[{row:["auto",{span:[W]},v]}],"row-start":[{"row-start":K()}],"row-end":[{"row-end":K()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",v]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",v]}],gap:[{gap:[b]}],"gap-x":[{"gap-x":[b]}],"gap-y":[{"gap-y":[b]}],"justify-content":[{justify:["normal"].concat(J())}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal"].concat(J(),["baseline"])}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[].concat(J(),["baseline"])}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[C]}],px:[{px:[C]}],py:[{py:[C]}],ps:[{ps:[C]}],pe:[{pe:[C]}],pt:[{pt:[C]}],pr:[{pr:[C]}],pb:[{pb:[C]}],pl:[{pl:[C]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[G]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[G]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",v,r]}],"min-w":[{"min-w":["min","max","fit",v,P]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[N]},N,v]}],h:[{h:[v,r,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",v,P]}],"max-h":[{"max-h":[v,r,"min","max","fit"]}],"font-size":[{text:["base",N,te]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",H]}],"font-family":[{font:[_]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",v]}],"line-clamp":[{"line-clamp":["none",I,H]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",v,P]}],"list-image":[{"list-image":["none",v]}],"list-style-type":[{list:["none","disc","decimal",v]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[$]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[$]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[].concat(q(),["wavy"])}],"text-decoration-thickness":[{decoration:["auto","from-font",P]}],"underline-offset":[{"underline-offset":["auto",v,P]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:x()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",v]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",v]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[$]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[].concat(se(),[gr])}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",mr]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},hr]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[m]}],"gradient-via-pos":[{via:[m]}],"gradient-to-pos":[{to:[m]}],"gradient-from":[{from:[p]}],"gradient-via":[{via:[p]}],"gradient-to":[{to:[p]}],rounded:[{rounded:[i]}],"rounded-s":[{"rounded-s":[i]}],"rounded-e":[{"rounded-e":[i]}],"rounded-t":[{"rounded-t":[i]}],"rounded-r":[{"rounded-r":[i]}],"rounded-b":[{"rounded-b":[i]}],"rounded-l":[{"rounded-l":[i]}],"rounded-ss":[{"rounded-ss":[i]}],"rounded-se":[{"rounded-se":[i]}],"rounded-ee":[{"rounded-ee":[i]}],"rounded-es":[{"rounded-es":[i]}],"rounded-tl":[{"rounded-tl":[i]}],"rounded-tr":[{"rounded-tr":[i]}],"rounded-br":[{"rounded-br":[i]}],"rounded-bl":[{"rounded-bl":[i]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[$]}],"border-style":[{border:[].concat(q(),["hidden"])}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[$]}],"divide-style":[{divide:q()}],"border-color":[{border:[o]}],"border-color-x":[{"border-x":[o]}],"border-color-y":[{"border-y":[o]}],"border-color-t":[{"border-t":[o]}],"border-color-r":[{"border-r":[o]}],"border-color-b":[{"border-b":[o]}],"border-color-l":[{"border-l":[o]}],"divide-color":[{divide:[o]}],"outline-style":[{outline:[""].concat(q())}],"outline-offset":[{"outline-offset":[v,P]}],"outline-w":[{outline:[P]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:ie()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[$]}],"ring-offset-w":[{"ring-offset":[P]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",N,xr]}],"shadow-color":[{shadow:[_]}],opacity:[{opacity:[$]}],"mix-blend":[{"mix-blend":ae()}],"bg-blend":[{"bg-blend":ae()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[n]}],contrast:[{contrast:[d]}],"drop-shadow":[{"drop-shadow":["","none",N,v]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[u]}],saturate:[{saturate:[M]}],sepia:[{sepia:[R]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[n]}],"backdrop-contrast":[{"backdrop-contrast":[d]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[u]}],"backdrop-opacity":[{"backdrop-opacity":[$]}],"backdrop-saturate":[{"backdrop-saturate":[M]}],"backdrop-sepia":[{"backdrop-sepia":[R]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[a]}],"border-spacing-x":[{"border-spacing-x":[a]}],"border-spacing-y":[{"border-spacing-y":[a]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",v]}],duration:[{duration:Z()}],ease:[{ease:["linear","in","out","in-out",v]}],delay:[{delay:Z()}],animate:[{animate:["none","spin","ping","pulse","bounce",v]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[A]}],"scale-x":[{"scale-x":[A]}],"scale-y":[{"scale-y":[A]}],rotate:[{rotate:[W,v]}],"translate-x":[{"translate-x":[w]}],"translate-y":[{"translate-y":[w]}],"skew-x":[{"skew-x":[F]}],"skew-y":[{"skew-y":[F]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",v]}],accent:[{accent:["auto",e]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",v]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":x()}],"scroll-mx":[{"scroll-mx":x()}],"scroll-my":[{"scroll-my":x()}],"scroll-ms":[{"scroll-ms":x()}],"scroll-me":[{"scroll-me":x()}],"scroll-mt":[{"scroll-mt":x()}],"scroll-mr":[{"scroll-mr":x()}],"scroll-mb":[{"scroll-mb":x()}],"scroll-ml":[{"scroll-ml":x()}],"scroll-p":[{"scroll-p":x()}],"scroll-px":[{"scroll-px":x()}],"scroll-py":[{"scroll-py":x()}],"scroll-ps":[{"scroll-ps":x()}],"scroll-pe":[{"scroll-pe":x()}],"scroll-pt":[{"scroll-pt":x()}],"scroll-pr":[{"scroll-pr":x()}],"scroll-pb":[{"scroll-pb":x()}],"scroll-pl":[{"scroll-pl":x()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","pinch-zoom","manipulation",{pan:["x","left","right","y","up","down"]}]}],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",v]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[P,H]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}var Pr=dr(Er);function Ar(...e){return Pr($e(e))}const Gr=()=>{const e=l.useRef(!0);return l.useEffect(()=>{e.current=!1},[]),e.current};const Sr=Xe("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),Mr=l.forwardRef(({className:e,variant:r,size:t,asChild:n=!1,...o},i)=>{const a=n?B:"button";return Oe.jsx(a,{className:Ar(Sr({variant:r,size:t,className:e})),ref:i,...o})});Mr.displayName="Button";export{ne as $,Mr as B,k as _,Xe as a,zr as b,Ar as c,ke as d,V as e,ue as f,kr as g,Lr as h,U as i,Q as j,Ir as k,B as l,_e as m,Ke as n,Sr as o,Te as p,he as q,Ge as r,Nr as s,Tr as t,Gr as u,Rr as v};
