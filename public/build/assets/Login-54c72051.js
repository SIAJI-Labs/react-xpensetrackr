import{r as m,j as e,W as $,a as E,d as I,y as L}from"./app-3219e993.js";import{G as C}from"./PublicLayout-3d7dcb8c.js";import{A as B}from"./ApplicationLogo-64046a15.js";import{I as g}from"./InputError-fdb1885c.js";import{C as _,a as A}from"./card-2453daec.js";import{$ as M,_ as T,c as k,a as D,B as P}from"./button-83616b50.js";import{I as w}from"./input-94b2405b.js";const R=m.forwardRef((t,i)=>m.createElement(M.label,T({},t,{ref:i,onMouseDown:s=>{var r;(r=t.onMouseDown)===null||r===void 0||r.call(t,s),!s.defaultPrevented&&s.detail>1&&s.preventDefault()}}))),b=R,S=D("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),p=m.forwardRef(({className:t,...i},s)=>e.jsx(b,{ref:s,className:k(S(),t),...i}));p.displayName=b.displayName;function F({className:t="",...i}){return e.jsx("input",{...i,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}function J({status:t,canResetPassword:i}){const{data:s,setData:r,post:j,processing:H,errors:o,reset:y}=$({email:"",password:"",remember:!1});m.useEffect(()=>()=>{y("password")},[]);const N=a=>{a.preventDefault(),j(route("login"))};let l="fa-eye";const v=()=>{var n,d,c,u,x,f,h;((n=document.getElementById("auth-password"))==null?void 0:n.getAttribute("type"))==="password"?((d=document.getElementById("auth-password_icon"))==null||d.classList.remove(l),l="fa-eye-slash",(c=document.getElementById("auth-password_icon"))==null||c.classList.add(l),(u=document.getElementById("auth-password"))==null||u.setAttribute("type","text")):((x=document.getElementById("auth-password_icon"))==null||x.classList.remove(l),l="fa-eye",(f=document.getElementById("auth-password_icon"))==null||f.classList.add(l),(h=document.getElementById("auth-password"))==null||h.setAttribute("type","password"))};return e.jsxs(C,{children:[e.jsx(E,{title:"Login"}),e.jsx("section",{className:" min-h-screen w-full flex items-center justify-center",children:e.jsxs("form",{onSubmit:N,className:" w-[400px]",children:[e.jsx("div",{className:"",children:e.jsx(I,{href:route("public.index"),children:e.jsx(B,{fontSizeMain:" text-3xl"})})}),e.jsx(_,{className:" mt-4",children:e.jsxs(A,{className:" pt-6",children:[e.jsx("h2",{className:" font-semibold text-lg text-center mb-6",children:"Sign-in to your account"}),e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(p,{htmlFor:"auth-email",children:"Email / Username"}),e.jsx(w,{type:"text",id:"auth-email",name:"email",value:s.email,placeholder:"Email / Username",className:` ${o.email?"border-destructive":null} `,onChange:a=>r("email",a.target.value)}),o.email?e.jsx(g,{message:`*${o.email}`,className:" italic"}):null]}),e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(p,{htmlFor:"auth-password",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(w,{type:"password",id:"auth-password",name:"password",value:s.password,placeholder:"Password",className:` ${o.password?"border-destructive":null} pr-12`,onChange:a=>r("password",a.target.value)}),e.jsx("div",{className:" absolute right-4 top-1/2 -translate-y-1/2",children:e.jsx("span",{id:"auth-password_icon",className:` fa-solid ${l} cursor-pointer`,onClick:v})})]}),o.password?e.jsx(g,{message:`*${o.password}`,className:" italic"}):null]}),e.jsx("div",{className:" flex flex-row justify-between",children:e.jsxs("div",{className:"items-center flex space-x-2",children:[e.jsx(F,{id:"auth-remember",className:" text-primary focus:ring-primary",checked:s.remember,onChange:a=>r("remember",a.target.checked)}),e.jsx("div",{className:"grid gap-1.5 leading-none",children:e.jsx("label",{htmlFor:"auth-remember",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Remember me?"})})]})}),e.jsx("div",{className:" w-full flex flex-col gap-2",children:e.jsx(P,{type:"submit",className:" w-full",onClick:a=>{let n=a.target;if(n){let d=n.innerHTML;n.innerHTML='<span class=" flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin-pulse"></i>Loading</span>';const c=()=>{d&&(n.innerHTML=d)};L.on("finish",u=>{c()})}},children:"Sign In"})})]})]})})]})})]})}export{J as default};
