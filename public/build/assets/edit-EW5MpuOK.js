import{W as j,j as e,a as f}from"./app-Cn1PjxUx.js";import{H as b,N as v,I as y}from"./Nav-BNNd6Nrg.js";import{N}from"./notyf.min-DLu_xjpT.js";import"./iconBase-BPFLjw48.js";import"./index-BxkI7NKl.js";import"./index-mSteYAay.js";const i=new N,D=({employees:g,user_type:c,user:o,notif:m,deal:s})=>{const{data:n,setData:p,put:u,errors:r}=j({deal_name:s.deal_name||"",phone:s.phone||"",price:s.price||"",clients:s.clients||""}),l=a=>{p(a.target.name,a.target.value)},h=a=>{a.preventDefault(),u(`/deal/${s.id}`,{onSuccess:()=>{i.success("Deal Edited successfully")},onError:t=>{typeof t=="object"&&t!==null?Object.entries(t).forEach(([w,d])=>{Array.isArray(d)?d.forEach(x=>i.error(x)):i.error(d)}):i.error("An unexpected error occurred.")}})};return e.jsxs("div",{className:"w-[85.2%] ml-[11.5rem]",children:[e.jsx(b,{user:o,notif:m}),e.jsx(v,{user_type:c}),e.jsxs("div",{className:"px-[10rem] grid border-blue-950 rounded-b-md space-y-3",children:[e.jsx("div",{className:"flex justify-end",children:e.jsxs(f,{href:"/deal",className:"flex p-1 px-4 space-x-2 text-white rounded-md bg-slate-600",children:[e.jsx("span",{className:"grid place-items-center",children:e.jsx(y,{})}),e.jsx("span",{children:"back"})]})}),e.jsxs("form",{onSubmit:h,className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"deal_name",children:"Deal Name"}),e.jsx("input",{id:"deal_name",className:"w-full rounded-lg",name:"deal_name",type:"text",value:n.deal_name,onChange:l,required:!0}),r.deal_name&&e.jsx("div",{children:r.deal_name})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"phone",children:"Phone"}),e.jsx("input",{id:"phone",className:"w-full rounded-lg",name:"phone",type:"tel",value:n.phone,onChange:l,required:!0}),r.phone&&e.jsx("div",{children:r.phone})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"price",children:"Price"}),e.jsx("input",{id:"price",className:"w-full rounded-lg",name:"price",type:"number",value:n.price,onChange:l,required:!0}),r.price&&e.jsx("div",{children:r.price})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"clients",children:"Clients"}),e.jsx("input",{id:"clients",className:"w-full rounded-lg",name:"clients",type:"text",value:n.clients,onChange:l,required:!0}),r.clients&&e.jsx("div",{children:r.clients})]}),e.jsx("button",{type:"submit",className:"bg-[#0A1B3F] p-2 rounded-md text-white w-[20%]",children:"Edit"})]})]})]})};export{D as default};