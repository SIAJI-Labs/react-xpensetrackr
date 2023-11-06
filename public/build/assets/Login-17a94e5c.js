import{j as e,r as i,W as E,a as I,d}from"./app-5552f331.js";import{G as B}from"./PublicLayout-1d27cc3b.js";import{A as C}from"./ApplicationLogo-fc7a4aa2.js";import{I as w}from"./InputError-5b8a31bf.js";import{C as L,a as _}from"./card-1260b71b.js";import{I as j}from"./input-50ab338a.js";import{$ as A,_ as D,c as P,a as k,B as R}from"./button-e62a8511.js";function S({className:a="",...o}){return e.jsx("input",{...o,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}const F=i.forwardRef((a,o)=>i.createElement(A.label,D({},a,{ref:o,onMouseDown:s=>{var r;(r=a.onMouseDown)===null||r===void 0||r.call(a,s),!s.defaultPrevented&&s.detail>1&&s.preventDefault()}}))),b=F,M=k("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=i.forwardRef(({className:a,...o},s)=>e.jsx(b,{ref:s,className:P(M(),a),...o}));c.displayName=b.displayName;function J({status:a,canResetPassword:o}){const{data:s,setData:r,post:y,processing:G,errors:n,reset:N}=E({email:"",password:"",remember:!1});i.useEffect(()=>()=>{N("password")},[]);const v=t=>{t.preventDefault(),y(route("login"))};let l="fa-eye";const $=()=>{var m,u,p,x,f,h,g;((m=document.getElementById("auth-password"))==null?void 0:m.getAttribute("type"))==="password"?((u=document.getElementById("auth-password_icon"))==null||u.classList.remove(l),l="fa-eye-slash",(p=document.getElementById("auth-password_icon"))==null||p.classList.add(l),(x=document.getElementById("auth-password"))==null||x.setAttribute("type","text")):((f=document.getElementById("auth-password_icon"))==null||f.classList.remove(l),l="fa-eye",(h=document.getElementById("auth-password_icon"))==null||h.classList.add(l),(g=document.getElementById("auth-password"))==null||g.setAttribute("type","password"))};return e.jsxs(B,{children:[e.jsx(I,{title:"Login"}),e.jsx("section",{className:" min-h-screen w-full flex items-center justify-center",children:e.jsxs("form",{onSubmit:v,className:" w-[400px]",children:[e.jsx("div",{className:"",children:e.jsx(d,{href:route("public.index"),children:e.jsx(C,{fontSizeMain:" text-3xl"})})}),e.jsx(L,{className:" mt-4",children:e.jsxs(_,{className:" pt-6",children:[e.jsx("h2",{className:" font-semibold text-lg text-center mb-6",children:"Sign-in to your account"}),e.jsxs("div",{className:" flex flex-col gap-4",children:[e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(c,{htmlFor:"auth-email",children:"Email / Username"}),e.jsx(j,{type:"text",id:"auth-email",name:"email",value:s.email,placeholder:"Email / Username",className:` ${n.email?"border-destructive":null} `,onChange:t=>r("email",t.target.value)}),n.email?e.jsx(w,{message:`*${n.email}`,className:" italic"}):null]}),e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(c,{htmlFor:"auth-password",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx(j,{type:"password",id:"auth-password",name:"password",value:s.password,placeholder:"Password",className:` ${n.password?"border-destructive":null} pr-12`,onChange:t=>r("password",t.target.value)}),e.jsx("div",{className:" absolute right-4 top-1/2 -translate-y-1/2",children:e.jsx("span",{id:"auth-password_icon",className:` fa-solid ${l} cursor-pointer`,onClick:$})})]}),n.password?e.jsx(w,{message:`*${n.password}`,className:" italic"}):null]}),e.jsxs("div",{className:" flex flex-row justify-between",children:[e.jsxs("div",{className:"items-center flex space-x-2",children:[e.jsx(S,{id:"auth-remember",className:" text-primary focus:ring-primary",checked:s.remember,onChange:t=>r("remember",t.target.checked)}),e.jsx("div",{className:"grid gap-1.5 leading-none",children:e.jsx("label",{htmlFor:"auth-remember",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Remember me?"})})]}),e.jsx(d,{href:route("password.request"),className:" text-sm",children:"Forgot Password"})]}),e.jsxs("div",{className:" w-full flex flex-col gap-2",children:[e.jsx(R,{type:"submit",className:" w-full",children:"Sign In"}),e.jsxs("span",{className:" text-sm",children:["Didn't have an account yet? ",e.jsx("strong",{children:e.jsx(d,{href:route("register"),children:"Sign up"})})," now"]})]})]})]})})]})})]})}export{J as default};
