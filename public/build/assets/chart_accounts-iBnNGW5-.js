import{r,W as C,j as e}from"./app-Cn1PjxUx.js";import{H as S,N as E}from"./Nav-BNNd6Nrg.js";import"./iconBase-BPFLjw48.js";import"./index-BxkI7NKl.js";import"./index-mSteYAay.js";const O=({accountGroups:p,category:c,type:b})=>{const[g,o]=r.useState(!1),[n,j]=r.useState(!1),[k,x]=r.useState(null),[y,N]=r.useState([]),{data:a,setData:d,post:f,put:v,reset:m,clearErrors:w,errors:l}=C({id:"",code:"",name:"",type_id:"",category_id:"",status:"Enabled"}),h=(s=null)=>{w(),j(!!s),s?(x(s),d({id:s.id,code:s.code,name:s.name,type_id:s.type_id,category_id:s.category_id,status:s.status})):m(),o(!0)},i=()=>{o(!1),m(),x(null)},_=s=>{s.preventDefault(),n?v(`/chart-accounts/${a.id}`,{onSuccess:()=>i()}):f("/chart-accounts",{onSuccess:()=>i()})};return r.useEffect(()=>{const s=a.type_id?parseInt(a.type_id,10):null,t=c.filter(u=>u.type_id===s||u.type_id===null);N(t)},[a.type_id,c]),e.jsxs("div",{className:"w-[83.2%] absolute right-0 overflow-hidden",children:[e.jsx(S,{}),e.jsx(E,{}),e.jsxs("div",{className:"min-h-screen p-6 bg-gray-50",children:[e.jsx("h1",{className:"mb-6 text-2xl font-bold",children:"Manage Chart of Accounts"}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:()=>h(),className:"px-4 py-2 text-white bg-green-600 rounded-md shadow hover:bg-green-700",children:"Add New Account"})}),p.map(s=>e.jsxs("div",{className:"mb-8",children:[e.jsx("h3",{className:"mb-4 text-xl font-semibold",children:s.title}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full bg-white rounded-lg shadow table-auto",children:[e.jsx("thead",{className:"bg-gray-200",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left",children:"Code"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Name"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Status"}),e.jsx("th",{className:"px-4 py-2 text-center",children:"Action"})]})}),e.jsx("tbody",{children:s.accounts.map(t=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"px-4 py-2",children:t.code}),e.jsx("td",{className:"px-4 py-2",children:t.name}),e.jsx("td",{className:"px-4 py-2",children:t.type}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("span",{className:`px-3 py-1 text-sm rounded-full ${t.status==="Enabled"?"bg-green-100 text-green-700":"bg-gray-200 text-gray-700"}`,children:t.status})}),e.jsxs("td",{className:"px-4 py-2 text-center",children:[e.jsx("button",{onClick:()=>h(t),className:"mr-4 text-blue-600 hover:text-blue-900",children:"Edit"}),e.jsx("button",{onClick:()=>handleDelete(t.id),className:"text-red-600 hover:text-red-900",children:"Delete"})]})]},t.id))})]})})]},s.title)),g&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"relative p-6 bg-white rounded-md shadow-lg w-96",children:[e.jsx("h2",{className:"mb-4 text-xl font-bold",children:n?"Edit Account":"Add New Account"}),e.jsxs("form",{onSubmit:_,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Code"}),e.jsx("input",{type:"text",value:a.code,onChange:s=>d("code",s.target.value),className:"w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"}),l.code&&e.jsx("span",{className:"text-sm text-red-600",children:l.code})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Name"}),e.jsx("input",{type:"text",value:a.name,onChange:s=>d("name",s.target.value),className:"w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"}),l.name&&e.jsx("span",{className:"text-sm text-red-600",children:l.name})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Type"}),e.jsxs("select",{value:a.type_id,onChange:s=>d("type_id",s.target.value),className:"w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500",children:[e.jsx("option",{value:"",children:"Select account type"}),b.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),l.type_id&&e.jsx("span",{className:"text-sm text-red-600",children:l.type_id})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Category"}),e.jsxs("select",{value:a.category_id,onChange:s=>d("category_id",s.target.value),className:"w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500",children:[e.jsx("option",{value:"",children:"Select category"}),y.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),l.category_id&&e.jsx("span",{className:"text-sm text-red-600",children:l.category_id})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Status"}),e.jsxs("select",{value:a.status,onChange:s=>d("status",s.target.value),className:"w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500",children:[e.jsx("option",{value:"Enabled",children:"Enabled"}),e.jsx("option",{value:"Disabled",children:"Disabled"})]})]}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx("button",{type:"button",onClick:i,className:"px-4 py-2 text-gray-700 bg-gray-300 rounded-md shadow hover:bg-gray-400",children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700",children:n?"Update":"Create"})]})]})]})})]})]})};export{O as default};