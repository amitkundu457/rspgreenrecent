import{W as I,r as d,q as D,j as e}from"./app-Cn1PjxUx.js";import{H as W,N as $}from"./Nav-BNNd6Nrg.js";import{C}from"./choices.min-ec-rIN-5.js";import{N as M}from"./notyf.min-DLu_xjpT.js";import{j as X,b as G}from"./index-BxkI7NKl.js";import"./iconBase-BPFLjw48.js";import"./index-mSteYAay.js";const m=new M,se=({employees:y,projects:h,taskcategory:J,user:E,user_type:k,notif:F,stages:p,tls:S})=>{var b,v,_;const{data:n,setData:c,post:A,errors:f}=I({task_name:"",estimate_hours:"",sdate:"",edate:"",leader_id:[],employee_id:[],employee_hours:{},status:"",priority:0,rate:"",project_id:h.length>0?h[0].id:""});console.log("kjhbgv",p);const[u,x]=d.useState([{name:"",description:"",ammount:0}]),R=()=>{x([...u,{name:"",description:"",ammount:0}])},P=s=>{x(u.filter((a,t)=>t!==s))},T=(s,a,t)=>{const l=[...u];l[s][a]=t;{const o=p.find(i=>i.name===t);l[s].ammount=o?o.ammount:0}x(l)},{props:j}=D(),N=d.useRef(null),g=d.useRef(null);((b=j.auth.user.roles[0])==null?void 0:b.name)==="admin"&&d.useEffect(()=>{const s=new C(N.current,{removeItemButton:!0,searchEnabled:!0}),a=new C(g.current,{removeItemButton:!0,searchEnabled:!0});return()=>{s.destroy(),a.destroy()}},[]);const r=s=>{const{name:a,value:t}=s.target;c(l=>({...l,[a]:t}))},L=s=>{const a=Array.from(s.target.selectedOptions,t=>t.value);c("employee_id",a),c(t=>{const l={...t.employee_hours};return a.forEach(o=>{l[o]||(l[o]="")}),{...t,employee_hours:l}})},O=s=>{const a=Array.from(s.target.selectedOptions,t=>t.value);c("leader_id",a)},H=(s,a)=>{c(t=>({...t,employee_hours:{...t.employee_hours,[s]:a}}))},z=async s=>{s.preventDefault();const a=parseInt(n.project_id);if(!h.find(l=>l.id===a)){m.error("Selected project not found.");return}parseFloat(n.estimate_hours),A("/task-store",{data:n,onSuccess:()=>{m.success("Task created successfully with notification sent.")},onError:l=>{typeof l=="object"&&l!==null?Object.entries(l).forEach(([o,i])=>{Array.isArray(i)?i.forEach(q=>m.error(q)):m.error(i)}):m.error("An unexpected error occurred.")}})},w=n.task_name.replace(/\u00A0/g," ").trim(),B=()=>{const s={key:"rzp_test_XaqbXFTW6WTuAK",amount:100,currency:"INR",name:"Acme Corp",description:"Test Transaction",image:"https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",handler:function(t){Inertia.post("/payment-success",t)},prefill:{name:"John Doe",email:"john.doe@example.com",contact:"9000090000"},notes:{address:"Corporate Office"},theme:{color:"#3399cc"}};new window.Razorpay(s).open()};return e.jsxs("div",{className:"w-[85.2%] ml-[12rem]",children:[e.jsx(W,{user:E,notif:F}),e.jsx($,{user_type:k}),e.jsx("div",{className:"flex flex-col gap-6",children:e.jsx("div",{className:"flex items-center justify-between"})}),e.jsx("div",{className:"p-3 table-section",children:e.jsxs("form",{onSubmit:z,className:"px-[8rem] flex flex-wrap",children:[e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"task_name",children:"Project Name"}),e.jsx("input",{type:"text",name:"task_name",className:"w-full rounded-lg",value:n.task_name,onChange:r}),f.name&&e.jsx("div",{children:f.name})]}),e.jsx("div",{className:"w-1/2 p-2",children:w!=="NON-BILLABLE"&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"rate",children:"Rate"}),e.jsx("input",{className:"w-full rounded-lg",id:"rate",name:"rate",type:"number",value:n.rate,onChange:r})]})}),e.jsx("div",{className:"w-1/2 p-2",children:w!=="NON-BILLABLE"&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"estimate_hours",children:"Estimate Hours"}),e.jsx("input",{className:"w-full rounded-lg",id:"estimate_hours",name:"estimate_hours",type:"number",value:n.estimate_hours,onChange:r})]})}),((v=j.auth.user.roles[0])==null?void 0:v.name)==="admin"&&e.jsxs(d.Fragment,{children:[e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"employee_id",children:"Team Leader"}),e.jsxs("select",{ref:N,multiple:!0,name:"leader_id",id:"leader_id",value:n.leader_id,onChange:O,className:"w-full rounded-lg",children:[e.jsx("option",{value:"",children:"Select Employee"}),S.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"employee_id",children:"Employee Assign"}),e.jsxs("select",{ref:g,multiple:!0,name:"employee_id",id:"employee_id",value:n.employee_id,onChange:L,className:"w-full rounded-lg",children:[e.jsx("option",{value:"",children:"Select Employee"}),y.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]})]}),n.employee_id.length>0&&e.jsx("div",{className:"w-1/2 p-2",children:n.employee_id.map(s=>{var a;return e.jsxs("div",{children:[e.jsxs("label",{htmlFor:`employee_hours_${s}`,children:["Hours for"," ",(a=y.find(t=>t.id===parseInt(s)))==null?void 0:a.name," ",":"]}),e.jsx("input",{className:"w-full rounded-lg",type:"number",id:`employee_hours_${s}`,name:`employee_hours_${s}`,value:n.employee_hours[s]||"",onChange:t=>H(s,t.target.value)})]},s)})}),e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"sdate",children:"Start Date"}),e.jsx("input",{className:"w-full rounded-lg",id:"sdate",name:"sdate",type:"date",value:n.sdate,onChange:r,required:!0})]}),e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"edate",children:"End Date"}),e.jsx("input",{className:"w-full rounded-lg",id:"edate",name:"edate",type:"date",value:n.edate,onChange:r,required:!0})]}),e.jsxs("div",{className:"w-1/2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Priority"}),e.jsxs("select",{id:"",className:"w-full rounded-lg",name:"priority",value:n.priority,onChange:r,children:[e.jsx("option",{value:"",children:"-- Select Priority --"}),e.jsx("option",{value:"0",children:"Low"}),e.jsx("option",{value:"1",children:"Medium"}),e.jsx("option",{value:"2",children:"High"})]})]}),((_=j.auth.user.roles[0])==null?void 0:_.name)==="admin"&&e.jsxs("div",{className:"w-full p-2",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"text-lg font-semibold",children:"Project Stage"}),e.jsx("button",{type:"button",onClick:R,className:"text-sm font-semibold bg-blue-500 text-white px-4 py-2 rounded",children:"Add New"})]}),e.jsxs("table",{className:"my-2 w-full text-left",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-3 py-2 bg-gray-600 text-white rounded-l",children:"#"}),e.jsx("th",{className:"px-3 py-2 bg-gray-600 text-white",children:"Name"}),e.jsx("th",{className:"px-3 py-2 bg-gray-600 text-white",children:"Payment"}),e.jsx("th",{className:"px-3 py-2 bg-gray-600 text-white rounded-r",children:"Action"})]})}),e.jsx("tbody",{children:u.map((s,a)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:a+1}),e.jsx("td",{className:"px-3 py-2",children:e.jsxs("select",{className:"w-full rounded form-select",value:s.name,onChange:t=>{const l=t.target.value;console.log("Selected Option:",l),T(a,"name",l)},children:[e.jsx("option",{value:"",disabled:!0,children:"Select a name"}),p.map(t=>e.jsx("option",{value:t.name,children:t.name},t.id))]})}),e.jsx("td",{className:"px-3 py-2",children:e.jsx("input",{type:"text",className:"w-full rounded form-input",value:s.ammount,readOnly:!0})}),e.jsx("td",{className:"px-3 py-2",children:e.jsxs("div",{className:"space-x-2",children:[e.jsx("button",{className:"px-2 py-2 text-indigo-500",type:"button",onClick:()=>B(),children:e.jsx(X,{})}),e.jsx("button",{className:"px-2 py-2 text-red-500",type:"button",onClick:()=>P(a),children:e.jsx(G,{})})]})})]},a))})]})]}),e.jsx("div",{className:"w-full p-2",children:e.jsx("button",{type:"submit",className:"bg-blue-600 p-2 rounded-md text-white w-[30%]",children:"Create"})})]})})]})};export{se as default};