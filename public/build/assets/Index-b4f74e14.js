import{r as i,j as e,a as se,e as D,y as te}from"./app-f9c29e53.js";import{u as le,B as y}from"./button-85bb5282.js";import{d as C,c as x,e as re}from"./check-0c8c6a9d.js";import{E as d}from"./theme-toggle-32a54062.js";import{S as ie,A as H,a as X,b as z,c as O,d as K,e as Q,f as W,g as Y,h as Z,i as w}from"./SystemLayout-863cb355.js";import{C as ne,b as oe,c as me,a as ce,e as de}from"./card-719678ad.js";import{S as pe}from"./scroll-area-ad41c8b0.js";import{I as A}from"./input-7b73f046.js";/* empty css            */import"./index-b260e8f0.js";import"./ApplicationLogo-c2b51e2d.js";/* empty css              */import"./TemplateNoData-f068f40d.js";import"./ApplicationLogoMask-1e4a3b0a.js";function _e({auth:n}){var G;const B=le();let h="template",F="initials";n.user.avatar&&n.user.avatar in C?(h="template",F=n.user.avatar):h="custom";const[ee,j]=i.useState(),[m,E]=i.useState(h),[p,_]=i.useState(F),[T,v]=i.useState([]),[u,b]=i.useState(""),[c,k]=i.useState(n.user.name),[I,P]=i.useState(n.user.email),[N,L]=i.useState("username"in n.user?(G=n.user)==null?void 0:G.username:""),U=(a=n.user)=>{k(a.name),P(a.email),L("username"in a?a==null?void 0:a.username:""),v([]),b("");let l="custom",t="initials";a.avatar&&a.avatar in C&&(l="template",t=a.avatar),E(l),l==="template"&&_(t);let r=x(a);j(r)},[s,R]=i.useState({}),[ue,$]=i.useState(null),ae=a=>{a.preventDefault();let l=document.getElementById("profile-submit");l&&(l.tagName.toLowerCase()==="button"&&l.setAttribute("disabled","disabled"),l.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>'),R({});const t=new AbortController;$(t);let r=new FormData;r.append("_method","PUT"),r.append("name",c),r.append("email",I),N&&r.append("username",N),r.append("avatar_type",m),m==="custom"&&T?r.append("avatar_file",T):r.append("avatar_template",p);let g=route("api.profile.v1.update",n.user.uuid);D.post(g,r,{headers:{"Content-Type":"multipart/form-data"},cancelToken:new D.CancelToken(function(S){t.abort=S})}).then(o=>{if(o.status===200){te.reload();let f=o.data.result.data;U(f)}}).catch(o=>{var V;let f=(V=o.response)==null?void 0:V.data;f.errors&&R(f.errors),setTimeout(()=>{const J=document.querySelectorAll("#profile-forms .form--group.is--invalid");J.length>0&&Array.from(J).reduce((M,q)=>M.offsetTop>q.offsetTop?q:M).scrollIntoView({behavior:"smooth"})},100)}).finally(()=>{$(null);let o=document.getElementById("profile-submit");o&&(o.tagName.toLowerCase()==="button"&&o.removeAttribute("disabled"),o.innerHTML="Submit")})};return i.useEffect(()=>{if(!B){let a=x(void 0,p,c);j(a)}},[p,c]),i.useEffect(()=>{let a=x(n.user);j(a)},[]),e.jsxs(ie,{user:n.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e.jsx(se,{title:"Profile"}),e.jsx("form",{onSubmit:ae,id:"profile-forms",children:e.jsxs(ne,{className:" w-full",children:[e.jsx(oe,{children:e.jsx("div",{children:e.jsx(me,{children:e.jsx("div",{children:"Profile"})})})}),e.jsxs(ce,{children:[e.jsxs("div",{className:"flex flex-row gap-6 mb-4",children:[e.jsx("div",{className:" w-1/4",children:e.jsx("div",{className:"border rounded-md p-4 w-full aspect-square flex items-center justify-center",children:e.jsxs(H,{className:" cursor-pointer rounded-lg",children:[e.jsx(X,{src:ee,alt:"Avatar Preview"}),e.jsx(z,{className:" cursor-pointer rounded-lg",children:"EX"})]})})}),e.jsx("div",{className:" w-3/4",children:e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Type"}),e.jsxs(O,{onValueChange:a=>{E(a)},value:m,children:[e.jsx(K,{className:`dark:text-white ${s!=null&&s.avatar_type?" !border-red-500":""}`,children:e.jsx(Q,{placeholder:"Select an option",className:"dark:text-white"})}),e.jsx(W,{children:e.jsxs(Y,{children:[e.jsx(Z,{children:"Select avatar style"}),e.jsx(w,{value:"template",children:"Template"}),e.jsx(w,{value:"custom",children:"Custom"})]})})]}),e.jsx(d,{message:s==null?void 0:s.avatar_type})]})})]}),(()=>m==="template"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Avatar"}),e.jsxs(O,{onValueChange:a=>{_(a)},value:p,children:[e.jsx(K,{className:`dark:text-white ${s!=null&&s.avatar_template?" !border-red-500":""}`,children:e.jsx(Q,{placeholder:"Select an option",className:"dark:text-white"})}),e.jsx(W,{children:e.jsx(Y,{children:e.jsx(pe,{className:"p-0",children:e.jsxs("div",{className:"max-h-[10rem]",children:[e.jsx(Z,{children:"Select avatar"}),(()=>{let a=[];return Object.keys(C).map((t,r)=>t).forEach((t,r)=>{let g=x(void 0,t,c);a.push(e.jsx(w,{value:t,className:"flex w-full",children:e.jsxs("div",{className:"flex gap-4 flex-row items-center justify-between w-full",children:[e.jsx("span",{children:e.jsxs(H,{className:" cursor-pointer h-6 aspect-square rounded-md",children:[e.jsx(X,{src:g,alt:"@shadcn"}),e.jsx(z,{className:" cursor-pointer rounded-lg",children:"EX"})]})}),e.jsx("span",{children:re(t)})]})},t))}),a})()]})})})})]}),e.jsx(d,{message:s==null?void 0:s.avatar_template})]})}):m==="custom"?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Upload an Avatar"}),e.jsxs("div",{className:"!tw__border-inherit",children:[e.jsxs("label",{htmlFor:"input_profile-avatar_file",className:" p-4 rounded-md border-2 border-dashed flex items-center gap-4 cursor-pointer",children:[e.jsx("i",{className:"fa-solid fa-paperclip text-2xl -rotate-45"}),e.jsxs("div",{className:"",children:[e.jsx("input",{type:"file",id:"input_profile-avatar_file",onChange:a=>{var l,t;(l=a.target)!=null&&l.files&&v((t=a.target)==null?void 0:t.files[0]),b(a.target.value)},className:"hidden",accept:"image/jpeg,image/jpg,image/png,image/svg"}),e.jsx("div",{className:`tw__font-bold mb-1 ${u?" underline":""}`,id:"input_profile-avatar_label_helper",children:u?u.split(/(\\|\/)/g).pop():"Choose Image"}),e.jsx("div",{className:"tw__font-light text-xs",children:"JPG/JPEG, PNG or SVG. Max size of 512kb"})]})]}),(()=>u?e.jsx(e.Fragment,{children:e.jsx(y,{variant:"link",className:"px-0 text-red-500 py-1 !h-auto leading-none",onClick:()=>{let a=document.getElementById("input_profile-avatar_file");a&&(console.log(a),a.value="",v([]),b(""))},children:"Remove"})}):e.jsx(e.Fragment,{}))()]})]})}):e.jsx(e.Fragment,{}))(),e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Name"}),e.jsx(A,{value:c,onChange:a=>k(a.target.value),placeholder:"Name",className:`${s!=null&&s.name?" !border-red-500":""}`}),e.jsx(d,{message:s==null?void 0:s.name})]}),e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Email"}),e.jsx(A,{form:I,onChange:a=>P(a.target.value),placeholder:"Email",className:`${s!=null&&s.email?" !border-red-500":""}`}),e.jsx(d,{message:s==null?void 0:s.email})]}),e.jsxs("div",{className:"form--group",children:[e.jsx("label",{className:"form--label",children:"Username"}),e.jsx(A,{value:N,onChange:a=>L(a.target.value),placeholder:"Username",className:`${s!=null&&s.username?" !border-red-500":""}`}),e.jsx(d,{message:s==null?void 0:s.username})]})]}),e.jsx(de,{className:"justify-end",children:e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsx(y,{type:"button",variant:"ghost",onClick:()=>{U()},children:"Reset"}),e.jsx(y,{id:"profile-submit",children:"Submit"})]})})]})})]})}export{_e as default};
