const d={select:(n,t=document)=>t.querySelector(n),selectAll:(n,t=document)=>t.querySelectorAll(n),children:(n,t)=>{const e=[],s=n.children,i=s.length;for(let a=0;a<i;++a){const c=s[a];c.matches(t)&&e.push(c)}return e},parents:(n,t)=>{for(var e=[];n&&n!==document;n=n.parentNode){if(t){n.matches(t)&&e.push(n);continue}e.push(n)}return e},rect(n){var t=window,e=t.pageYOffset!==void 0?t.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,s=n.getBoundingClientRect(),i=t.pageXOffset,a=e;return{left:s.left+i,top:s.top+a,height:s.height,width:s.width}}};class x{on(t,e,s){typeof t=="string"?(this.listeners=this.listeners||{},this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e)):arguments[0].addEventListener(arguments[1],arguments[2],!1)}off(t,e){if(typeof t=="string"){if(this.listeners=this.listeners||{},!(t in this.listeners))return;this.listeners[t].splice(this.listeners[t].indexOf(e),1)}else arguments[0].removeEventListener(arguments[1],arguments[2])}emit(t){if(this.listeners=this.listeners||{},t in this.listeners)for(var e=0;e<this.listeners[t].length;e++)this.listeners[t][e].apply(this,Array.prototype.slice.call(arguments,1))}}class E extends x{constructor(t,e){if(super(),this.defaultConfig={threshold:40,animation:0,collapseButtonContent:"–",expandButtonContent:"+",includeContent:!1,maxDepth:3,showPlaceholderOnMove:!1,nodes:{list:"ol",item:"li"},classes:{list:"nst-list",item:"nst-item",content:"nst-content",parent:"nst-parent",dragging:"nst-dragging",handle:"nst-handle",placeholder:"nst-placeholder",container:"nst-container",button:"nst-button",collapsed:"nst-collapsed",disabled:"nst-disabled",error:"nst-error",moving:"nst-moving"}},this.config=Object.assign({},this.defaultConfig,e),e&&(e.nodes&&(this.config.nodes=Object.assign({},this.defaultConfig.nodes,e.nodes)),e.classes&&(this.config.classes=Object.assign({},this.defaultConfig.classes,e.classes))),this.parent=typeof t=="string"?d.select(t):t,!this.parent)return console.error(`Node (${t}) not found.`);if(this.parent._nestable)return console.error("There is already a Nestable instance active on this node.");this.initialised=!1,this.disabled=!0,this.last={x:0,y:0},this.init()}init(t){if(!this.initialised){this.touch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,t&&(this.config=Object.assign({},this.defaultConfig,t)),this.dragDepth=0,this.parent.classList.add(this.config.classes.list),this.parent.classList.add(this.config.classes.parent);const e=d.children(this.parent,this.config.nodes.item);for(const s of e)this._nest(s);if(this.placeholder=document.createElement(this.config.nodes.item),this.placeholder.classList.add(this.config.classes.placeholder),this._getData(),this.parent._nestable=this,window._nestableInstances?(window._nestableInstances+=1,this.id=window._nestableInstances):(window._nestableInstances=1,this.id=1),this.enable(),this._getData(),setTimeout(()=>{this.emit("init")},10),this.initialised=!0,this.config.data){const s=new XMLHttpRequest;s.responseType="json",s.open("GET",this.config.data,!0),s.onload=()=>{this.load(s)},s.send(null)}}}load(t){this.removeAll(),"response"in t&&(t=t.response);const e=s=>{const i=document.createElement(this.config.nodes.item);if(i.textContent=s.content,s.children){const a=document.createElement(this.config.nodes.list);i.appendChild(a);for(const c of s.children)a.appendChild(e(c))}return i};for(const s of t)this._nest(this.parent.appendChild(e(s)));this.emit("loaded")}destroy(){if(this.initialised){this.initialised=!1,this.disable(),this.parent.classList.remove(this.config.classes.list),this.parent.classList.remove(this.config.classes.parent),delete this.parent._nestable,window._nestableInstances&&(window._nestableInstances-=1);const t=s=>{s.classList.remove(this.config.classes.item),s.classList.remove(this.config.classes.collapsed);const i=s.querySelector(this.config.nodes.list),a=s.querySelector(`.${this.config.classes.content}`);s.querySelector(`.${this.config.classes.handle}`);const c=s.querySelector(`.${this.config.classes.button}`);a.classList.contains(this.config.classes.handle);const r=document.createDocumentFragment();for(var o=a.childNodes.length-1;o>=0;o--)r.insertBefore(a.childNodes[o],r.firstChild);if(s.insertBefore(r,a),s.removeChild(a),i){i.classList.remove(this.config.classes.list),s.removeChild(c);const l=d.children(i,this.config.nodes.item);for(const g of l)t(g)}},e=d.children(this.parent,this.config.nodes.item);for(const s of e)t(s);this.emit("destroy",this.parent)}}bind(){this.events={start:this._onMouseDown.bind(this),move:this._onMouseMove.bind(this),end:this._onMouseUp.bind(this)},this.touch?(this.parent.addEventListener("touchstart",this.events.start,!1),document.addEventListener("touchmove",this.events.move,!1),document.addEventListener("touchend",this.events.end,!1),document.addEventListener("touchcancel",this.events.end,!1)):(this.parent.addEventListener("mousedown",this.events.start,!1),document.addEventListener("mousemove",this.events.move,!1),document.addEventListener("mouseup",this.events.end,!1))}unbind(){this.parent.removeEventListener("mousedown",this.events.start),document.removeEventListener("mousemove",this.events.move),document.removeEventListener("mouseup",this.events.end)}enable(){this.disabled&&(this.bind(),this.parent.classList.remove(this.config.classes.disabled),this.disabled=!1)}disable(){this.disabled||(this.unbind(),this.parent.classList.add(this.config.classes.disabled),this.disabled=!0)}serialise(){this.serialize()}serialize(){return this._getData("data")}collapseAll(){const t=d.selectAll(`.${this.config.classes.item}`,this.parent);for(const e of t)if(!e.classList.contains(this.config.classes.collapsed)){const s=e.querySelector(`.${this.config.classes.button}`);s&&this._collapseList(e,s)}}expandAll(){const t=d.selectAll(`.${this.config.classes.item}`,this.parent);for(const e of t)if(e.classList.contains(this.config.classes.collapsed)){const s=e.querySelector(`.${this.config.classes.button}`);s&&this._expandList(e,s)}}add(t,e){if(e||(e=this.parent),this._nest(t),e!==this.parent){const s=d.select(this.config.nodes.list,e);s?e=s:e=this._makeParent(e)}e.appendChild(t),this.update()}remove(t,e=!0){const s=t.closest(this.config.nodes.list);if(e)s.removeChild(t);else{const a=t.querySelector(`.${this.config.classes.list}`);if(a){const c=d.children(a,this.config.nodes.item);if(c.length){const r=document.createDocumentFragment();for(var i=c.length-1;i>=0;i--){const o=c[i];r.insertBefore(o,r.firstElementChild)}s.replaceChild(r,t)}}}this.update()}removeAll(){const t=this.parent.children;for(var e=t.length-1;e>=0;e--)this.parent.removeChild(t[e])}update(){this._getData("nodes"),this.emit("update")}_nest(t){const e=t.querySelector(`.${this.config.classes.handle}`),s=document.createElement("div");s.classList.add(this.config.classes.content);const i=t.childNodes;if(e)for(var a=i.length-1;a>=0;a--){const o=i[a];o!==e&&o.nodeName.toLowerCase()!==this.config.nodes.list&&s.insertBefore(o,s.firstChild)}else{s.classList.add(this.config.classes.handle);for(var a=i.length-1;a>=0;a--){const r=i[a];r.nodeName.toLowerCase()!==this.config.nodes.list&&s.insertBefore(r,s.firstChild)}}t.classList.add(this.config.classes.item);const c=t.querySelector(this.config.nodes.list);if(c){t.insertBefore(s,c);const r=this._makeParent(t),o=d.children(r,this.config.nodes.item);t.classList.contains(this.config.classes.collapsed)&&this._collapseList(t);for(const l of o)this._nest(l)}else t.appendChild(s)}_isDisabled(t,e="disabled"){return t===null?!1:!!("nestableDisabled"in t.dataset&&(e==="disabled"&&(!t.dataset.nestableDisabled.length||t.dataset.nestableDisabled==="disabled")||e==="dragging"&&t.dataset.nestableDisabled==="dragging"||e==="nesting"&&t.dataset.nestableDisabled==="nesting")||t.classList.contains(this.config.classes.disabled)||d.parents(t,`.${this.config.classes.disabled}`).length)}_getEvent(t){return this.touch?t.type==="touchend"?t.changedTouches[0]:t.touches[0]:t}_onMouseDown(t){const e=this._getEvent(t),s=t.target.closest(`.${this.config.classes.button}`),i=t.target.closest(`.${this.config.classes.item}`);if(s)return this._toggleList(i,s);if(!t.target.closest(`.${this.config.classes.handle}`))return!1;if(i){if(this._isDisabled(i)||this._isDisabled(i.parentNode.closest(`.${this.config.classes.item}`)))return!1;if(this._isDisabled(i,"dragging"))return this.emit("error.dragging.disabled",i),!1;t.preventDefault(),this.parent.classList.add(this.config.classes.moving),i.classList.add(this.config.classes.dragging);const c=d.rect(i);if(this.origin={x:e.pageX,y:e.pageY,original:{x:e.pageX,y:e.pageY}},this.hierarchy={movedNode:i,originalParent:i.parentNode,originalParentItem:i.parentNode.closest(`.${this.config.classes.item}`)},this.active={maxDepth:!1,collapsedParent:!1,disabledParent:!1,confinedParent:!1,node:i,rect:c,parent:!1,axis:!1},"nestableParent"in i.dataset){const o=document.getElementById(i.dataset.nestableParent);o&&(this.active.parent=o)}if("nestableAxis"in i.dataset){const o=i.dataset.nestableAxis;o==="x"?this.active.axis="x":o==="y"&&(this.active.axis="y")}this.placeholder.style.height=`${c.height}px`,this.config.showPlaceholderOnMove&&(this.placeholder.style.opacity=0),this.container||(this.container=document.createElement(this.config.nodes.list),this.container.classList.add(this.config.classes.list),this.container.classList.add(this.config.classes.container),this.container.id=`nestable_${this.id}`),this.container.style.left=`${c.left}px`,this.container.style.top=`${c.top}px`,this.container.style.height=`${c.height}px`,this.container.style.width=`${c.width}px`,i.parentNode.insertBefore(this.placeholder,i),document.body.appendChild(this.container),this.container.appendChild(i),this.newParent=!1,this.dragDepth=0;const r=d.selectAll(this.config.nodes.item,i);for(let o=0;o<r.length;o++){const l=d.parents(r[o],this.config.nodes.list).length-1;l>this.dragDepth&&(this.dragDepth=l)}this.emit("start",this.active)}}_onMouseMove(t){if(this.active){this.config.showPlaceholderOnMove&&(this.placeholder.style.opacity=1),t=this._getEvent(t);let s=t.pageX-this.origin.x,i=t.pageY-this.origin.y;t.pageY>this.last.y?this.last.dirY=1:t.pageY<this.last.y&&(this.last.dirY=-1),t.pageX>this.last.x?this.last.dirX=1:t.pageX<this.last.x&&(this.last.dirX=-1);let a=!1;Math.abs(s)>Math.abs(i)?a="x":Math.abs(s)<Math.abs(i)&&(a="y");var e=window.pageYOffset!==void 0?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;const c=document.elementsFromPoint(t.pageX,t.pageY-e);if(a==="x"&&this.active.axis!=="y"){if(this.last.dirX>0&&s>this.config.threshold){const l=this.placeholder.previousElementSibling;if(l)if(l.classList.contains(this.config.classes.collapsed))this.active.collapsedParent||(this.emit("error.collapsed",this.active.node,l),this.active.collapsedParent=!0);else{const g=this._isDisabled(l),h=this._isDisabled(l,"nesting");if(g)this.active.disabledParent||(this.emit("error.disabled"),this.active.disabledParent=!0);else{let u=d.parents(this.placeholder,this.config.nodes.list).length+this.dragDepth<=this.config.maxDepth,m=l.querySelector(this.config.nodes.list);if(h)this.active.nestDisabled||(this.emit("error.nesting.disabled",this.active.node),this.active.nestDisabled=!0);else if(u){this.active.maxDepth=!1;const y=this.placeholder.closest(`.${this.config.classes.list}`);m||(m=this._makeParent(l)),this._moveElement(this.placeholder,{parent:m,type:"appendChild"}),this.emit("nest",m,y),this.origin.x=t.pageX}else this.active.maxDepth||(this.emit("error.maxdepth",this.active.node,this.config.maxDepth),this.active.maxDepth=!0)}}}else if(this.last.dirX<0&&s<-this.config.threshold){this.active.maxDepth=!1,this.active.nestDisabled=!1,this.active.disabledParent=!1,this.active.collapsedParent=!1;const l=this.placeholder.closest(this.config.nodes.list),g=l.closest(this.config.nodes.item);if(g&&(l.childElementCount>1&&this.placeholder!==l.firstElementChild||l.childElementCount<2&&this.placeholder===l.firstElementChild)){const h=g.nextElementSibling,p=this.placeholder.closest(`.${this.config.classes.list}`);if(h){const u=h.closest(this.config.nodes.list);this._moveElement(this.placeholder,{parent:u,type:"insertBefore",sibling:h}),this.origin.x=t.pageX}else this._moveElement(this.placeholder,{parent:g.closest(this.config.nodes.list),type:"appendChild"}),this.origin.x=t.pageX;this.emit("unnest",g,p)}}}else for(const l of c)if(l!==this.active.node&&!this.active.node.contains(l)&&l.classList.contains(this.config.classes.content)&&this.active.axis!=="x"){const h=l.closest(`.${this.config.classes.item}`);if(h&&a==="y")if(h.querySelector(this.config.nodes.list)&&!h.classList.contains(this.config.classes.collapsed))this.last.dirY>0?this._moveElement(this.placeholder,{parent:h.lastElementChild,type:"insertBefore",sibling:h.lastElementChild.firstElementChild,animatable:h.querySelector(`.${this.config.classes.content}`)}):this.last.dirY<0&&this._moveElement(this.placeholder,{parent:h.parentNode,type:"insertBefore",sibling:h,animatable:h.querySelector(`.${this.config.classes.content}`)}),this.emit("reorder");else{if(this.last.dirY>0){const m=h.nextElementSibling;m?this._moveElement(this.placeholder,{parent:h.parentNode,type:"insertBefore",sibling:m,animatable:h.querySelector(`.${this.config.classes.content}`)}):this._moveElement(this.placeholder,{parent:h.closest(this.config.nodes.list),type:"appendChild",animatable:h.querySelector(`.${this.config.classes.content}`)})}else this.last.dirY<0&&this._moveElement(this.placeholder,{parent:h.parentNode,type:"insertBefore",sibling:h,animatable:h.querySelector(`.${this.config.classes.content}`)});this.emit("reorder")}const p=h.closest(`.${this.config.classes.parent}`);p&&p!==this.parent&&p._nestable&&(this.newParent=p)}this.placeholder.classList.toggle(this.config.classes.error,this.active.disabledParent||this.active.maxDepth||this.active.collapsedParent||this.active.confinedParent);let r=t.pageX-this.origin.original.x,o=t.pageY-this.origin.original.y;this.active.axis&&(this.active.axis==="x"?o=0:this.active.axis==="y"&&(r=0)),this.container.style.transform=`translate3d(${r}px, ${o}px, 0)`,this.lastParent=this.placeholder.parentNode,this.hierarchy.newParent=this.lastParent,this.hierarchy.newParentItem=this.lastParent.closest(`.${this.config.classes.item}`),this.emit("move",this.active)}this.last={x:t.pageX,y:t.pageY}}_moveElement(t,e){let s=!1,i=!1;if(this._isDisabled(e.parent)||this._isDisabled(e.parent.closest(`.${this.config.classes.item}`)))return!1;if(this.active.parent&&!d.parents(e.parent,`#${this.active.parent.id}`).includes(this.active.parent))return this.active.confinedParent||(this.emit("error.confined",t,this.active.parent,e.parent),this.active.confinedParent=!0),!1;let a=t.closest(this.config.nodes.list);this.config.animation>0&&(s=d.rect(this.placeholder),e.animatable&&(i=d.rect(e.animatable))),e.type==="insertBefore"?e.parent.insertBefore(t,e.sibling):e.type==="appendChild"&&e.parent.appendChild(t),a.childElementCount||this._unmakeParent(a.parentNode),this.emit("order.change",this.active.node,e.parent,a),this.config.animation>0&&(this._animateElement(this.placeholder,s),e.animatable&&i&&this._animateElement(e.animatable,i))}_animateElement(t,e){let s=t.style,i=d.rect(t),a=e.left-i.left,c=e.top-i.top;s.transform=`translate3d(${a}px, ${c}px, 0px)`,this._repaint(t),s.transform="translate3d(0px, 0px, 0px)",s.transition=`transform ${this.config.animation}ms`,setTimeout(function(){s.transform="",s.transition=""},this.config.animation)}_repaint(t){return t.offsetHeight}_onMouseUp(t){if(this.active){this.config.showPlaceholderOnMove&&(this.placeholder.style.opacity=0),t=this._getEvent(t);const e=d.rect(this.active.node);this.container.removeAttribute("style"),this.parent.classList.remove(this.config.classes.moving),this.placeholder.parentNode.replaceChild(this.active.node,this.placeholder),this._animateElement(this.active.node,e),this.placeholder.classList.remove(this.config.classes.error),this.active.node.classList.remove(this.config.classes.dragging),this.active=!1,document.body.removeChild(this.container),this._getData(),this.newParent&&(this.hierarchy.newInstance=this.newParent._nestable,this.newParent._nestable._getData()),this.hierarchy.hierarchy=this.data,this.emit("stop",this.hierarchy),this.update()}}_toggleList(t,e){t.classList.contains(this.config.classes.collapsed)?this._expandList(t,e):this._collapseList(t,e)}_collapseList(t,e){e||(e=t.querySelector(`.${this.config.classes.button}`)),e.textContent=this.config.expandButtonContent,t.classList.add(this.config.classes.collapsed),this.emit("list.collapse",t)}_expandList(t,e){e||(e=t.querySelector(`.${this.config.classes.button}`)),e.textContent=this.config.collapseButtonContent,t.classList.remove(this.config.classes.collapsed),this.emit("list.expand",t)}_makeParent(t){let e=t.querySelector(this.config.nodes.list);e?e.classList.add(this.config.classes.list):(e=document.createElement(this.config.nodes.list),e.classList.add(this.config.classes.list),t.appendChild(e));const s=document.createElement("button");return s.classList.add(this.config.classes.button),s.type="button",s.textContent=this.config.collapseButtonContent,t.insertBefore(s,t.firstElementChild),e}_unmakeParent(t){const e=t.querySelector(this.config.nodes.list),s=t.querySelector("button");e&&t.removeChild(e),s&&t.removeChild(s)}_getData(t="nodes"){let e=[];const s=i=>{const a=[];return d.children(i,this.config.nodes.item).forEach(r=>{const o={};if(t==="nodes")o.node=r;else if(o.data=Object.assign({},r.dataset),this.config.includeContent){const g=r.querySelector(`.${this.config.classes.content}`);g&&(o.content=g.innerHTML)}const l=r.querySelector(this.config.nodes.list);l&&(o.children=s(l)),a.push(o)}),a};return e=s(this.parent),t==="nodes"&&(this.data=e),e}}window.Nestable=E;let v;const _=new Uint8Array(16);function L(){if(!v&&(v=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!v))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(_)}const f=[];for(let n=0;n<256;++n)f.push((n+256).toString(16).slice(1));function C(n,t=0){return f[n[t+0]]+f[n[t+1]]+f[n[t+2]]+f[n[t+3]]+"-"+f[n[t+4]]+f[n[t+5]]+"-"+f[n[t+6]]+f[n[t+7]]+"-"+f[n[t+8]]+f[n[t+9]]+"-"+f[n[t+10]]+f[n[t+11]]+f[n[t+12]]+f[n[t+13]]+f[n[t+14]]+f[n[t+15]]}const w=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:w};function D(n,t,e){if(b.randomUUID&&!t&&!n)return b.randomUUID();n=n||{};const s=n.random||(n.rng||L)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){e=e||0;for(let i=0;i<16;++i)t[e+i]=s[i];return t}return C(s)}export{D as v};