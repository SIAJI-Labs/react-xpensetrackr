import{W as d,r as p,j as s,a as l}from"./app-f9c29e53.js";import{G as c}from"./GuestLayout-5ed2a43a.js";import{I as u}from"./InputError-1e33d69f.js";import{I as f}from"./InputLabel-cea389c4.js";import{P as x}from"./PrimaryButton-0569ec03.js";import{T as w}from"./TextInput-ead6b7db.js";/* empty css            */function y(){const{data:a,setData:e,post:t,processing:o,errors:m,reset:i}=d({password:""});p.useEffect(()=>()=>{i("password")},[]);const n=r=>{r.preventDefault(),t(route("password.confirm"))};return s.jsxs(c,{children:[s.jsx(l,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),s.jsxs("form",{onSubmit:n,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(f,{htmlFor:"password",value:"Password"}),s.jsx(w,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>e("password",r.target.value)}),s.jsx(u,{message:m.password,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(x,{className:"ml-4",disabled:o,children:"Confirm"})})]})]})}export{y as default};