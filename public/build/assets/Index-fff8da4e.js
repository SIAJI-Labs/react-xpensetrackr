import{j as e,a as f,d as x}from"./app-40004788.js";import{S as p}from"./SystemLayout-88a534e5.js";import{u as g}from"./button-bea93b78.js";import{T as h}from"./TemplateNoData-e01bfc3c.js";import{C as u,a as j,b as y}from"./card-26f007fd.js";/* empty css            */import"./check-52942dd2.js";import"./index-14986e37.js";import"./ApplicationLogo-eff473df.js";/* empty css              */import"./scroll-area-a9786e46.js";import"./theme-toggle-29e5209d.js";import"./input-37e80c12.js";import"./ApplicationLogoMask-e3678fcb.js";function H({auth:m}){return g(),e.jsxs(p,{user:m.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Setting"}),children:[e.jsx(f,{title:"Setting"}),(()=>{let n=[],o=[{name:null,description:null,items:[{name:"Profile",description:"Change name, password, etc",icon:"fa-solid fa-circle-user",link:route("sys.profile.index")}]},{name:"Master Data",description:null,items:[{name:"Category",description:"Manage your Category",icon:"fa-solid fa-bookmark",link:route("sys.category.index")},{name:"Tags",description:"Manage your Tags",icon:"fa-solid fa-tags",link:route("sys.tags.index")}]},{name:"General",description:null,items:[{name:"Notification",description:"Handle your notification preferences",icon:"fa-solid fa-bell",link:route("sys.setting.notification.index")},{name:"Timezone",description:"Select your timezone",icon:"fa-solid fa-user-clock",link:route("sys.setting.timezone.index")}]}];return o.length>0&&o.forEach((t,s)=>{if(t.items){let a=[];if(t.items.forEach((i,r)=>{let c=null;i.description&&(c=e.jsx("span",{className:" text-sm opacity-75 leading-none",children:i.description}));let d=null;i.icon&&(d=e.jsx("div",{className:" flex flex-row gap-4 items-center justify-center w-1/12",children:e.jsx("i",{className:` text-xl ${i.icon}`})}));let l=e.jsxs("div",{className:` flex flex-row gap-4 p-4 ${i.link?"":" opacity-50 cursor-not-allowed"}`,children:[d,e.jsxs("div",{className:" flex flex-col gap-1",children:[e.jsx("span",{className:" font-semibold leading-none",children:i.name}),c]})]},`setting-${s}_${r}`);i.link&&(l=e.jsx(x,{href:i.link,children:l},`link_setting-${s}_${r}`)),a.push(l)}),a.length>0){let i=null;t.name&&(i=e.jsx("span",{className:" font-normal dark:text-white",children:t.name})),n.push(e.jsxs("div",{className:" flex flex-col gap-1",children:[i,e.jsx("div",{className:" flex flex-col overflow-hidden rounded-md border bg-white dark:bg-background dark:text-white",children:a})]},`setting-${s}`))}}}),n.length>0?e.jsx("div",{className:" flex flex-col gap-6",children:n}):e.jsx(u,{children:e.jsxs(j,{children:[e.jsx(y,{className:" pb-0"}),e.jsx(h,{})]})})})()]})}export{H as default};