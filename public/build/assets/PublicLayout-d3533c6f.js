import{e as o,j as e,a as i}from"./app-f9c29e53.js";import{a as r,T as n,o as m}from"./ApplicationLogo-c2b51e2d.js";function d({children:t}){return o.interceptors.response.use(s=>s,s=>{if(s.response&&s.response.data){let a=s.response.data;"message"in a&&a.message==="Unauthenticated."&&r("419: Token Missmatch",{description:"Please refresh the page",action:{label:"Refresh",onClick:()=>location.reload()},duration:void 0})}throw s}),e.jsxs(n,{defaultTheme:"light",storageKey:"xtrackr-theme",children:[e.jsxs(i,{children:[e.jsx("meta",{name:"description",content:"Simplify your expenses, maximize your control"}),e.jsx("link",{rel:"icon",type:"image/x-icon",href:"/assets/images/favicon.svg"}),e.jsx("meta",{name:"theme-color",media:"(prefers-color-scheme: light)",content:"#ffffff"}),e.jsx("meta",{name:"theme-color",media:"(prefers-color-scheme: dark)",content:"#55799d"})]}),e.jsxs("div",{className:"min-h-[100dvh] w-full bg-slate-50 dark:bg-background",children:[t,e.jsx(m,{})]})]})}export{d as G};
