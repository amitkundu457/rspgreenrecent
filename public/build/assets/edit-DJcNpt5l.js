import{W as p,j as e}from"./app-Cn1PjxUx.js";import{N as u}from"./notyf.min-DLu_xjpT.js";import{H as h,N as j}from"./Nav-BNNd6Nrg.js";import"./iconBase-BPFLjw48.js";import"./index-BxkI7NKl.js";import"./index-mSteYAay.js";const c=new u;function C({complaint:a,customers:r,products:i,employees:o}){const{put:x,data:t,setData:d,errors:s,processing:f}=p({complaint_no:a.complaint_no,date:a.date,customer_id:a.customer_id,complaint_type:a.complaint_type,description:a.description,product_id:a.product_id,assigned_id:a.assigned_id,assigned_date:a.assigned_date,status:a.status,mobile_no:a.mobile_no,email:a.email,address:a.address});function m(l){l.preventDefault(),x(route("complaint.update",a.id),{onSuccess:()=>{c.success("complaint updated successfully!")},onError:()=>{c.error("Failed to add complaint. Please check your inputs.")}})}return e.jsxs("div",{className:"w-[83.2%] absolute right-0 overflow-hidden",children:[e.jsx(h,{}),e.jsx(j,{}),e.jsxs("div",{className:"max-w-5xl p-8 mx-auto bg-white rounded-lg shadow-md",children:[e.jsx("h2",{className:"mb-6 text-2xl font-bold text-gray-800",children:"Edit Complaint"}),e.jsxs("form",{onSubmit:m,className:"flex flex-wrap",children:[e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Complaint No."}),e.jsx("input",{onChange:l=>d("complaint_no",l.target.value),value:t.complaint_no,type:"text",className:"w-full rounded form-input",placeholder:"Enter complaint no"}),s.complaint_no&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.complaint_no})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Complaint Date"}),e.jsx("input",{type:"date",name:"date",onChange:l=>d("date",l.target.value),value:t.date,className:"w-full rounded form-input",placeholder:"Enter bill no"}),s.date&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.date})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Customer Name"}),e.jsxs("select",{name:"",onChange:l=>d("customer_id",l.target.value),value:t.customer_id,className:"w-full rounded form-select",id:"",children:[e.jsx("option",{value:"",children:"-- Select Customer --"}),r&&r.map((l,n)=>e.jsx("option",{value:l.id,children:l.name},n))]}),s.customer_id&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.customer_id})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Complaint Type"}),e.jsxs("select",{name:"",onChange:l=>d("complaint_type",l.target.value),value:t.complaint_type,className:"w-full rounded form-select",id:"",children:[e.jsx("option",{value:"0",children:"Under Warranty"}),e.jsx("option",{value:"1",children:"Warranty Expires"})]}),s.complaint_type&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.complaint_type})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Complaint Description"}),e.jsx("textarea",{name:"",onChange:l=>d("description",l.target.value),value:t.description,id:"",rows:3,className:"w-full rounded resize-none form-textarea",placeholder:"Enter billing address"}),s.description&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.description})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Product"}),e.jsxs("select",{name:"",onChange:l=>d("product_id",l.target.value),value:t.product_id,className:"w-full rounded form-select",id:"",children:[e.jsx("option",{value:"",children:"-- Select Product --"}),i&&i.map((l,n)=>e.jsx("option",{value:l.id,children:l.name},n))]}),s.product_id&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.product_id})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Assigned To"}),e.jsxs("select",{name:"",onChange:l=>d("assigned_id",l.target.value),value:t.assigned_id,className:"w-full rounded form-select",id:"",children:[e.jsx("option",{value:"",children:"-- Select Assigned --"}),o&&o.map((l,n)=>e.jsx("option",{value:l.id,children:l.name},n))]}),s.assigned_id&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.assigned_id})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Assigned Date"}),e.jsx("input",{type:"date",name:"date",onChange:l=>d("assigned_date",l.target.value),value:t.assigned_date,className:"w-full rounded form-input",placeholder:"Enter bill no"}),s.assigned_date&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.assigned_date})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Status"}),e.jsxs("select",{name:"",onChange:l=>d("status",l.target.value),value:t.status,className:"w-full rounded form-select",id:"",children:[e.jsx("option",{value:"0",children:"Open"}),e.jsx("option",{value:"1",children:"Progress"}),e.jsx("option",{value:"2",children:"Closed"})]}),s.status&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.status})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Mobile No"}),e.jsx("input",{type:"tel",onChange:l=>d("mobile_no",l.target.value),value:t.mobile_no,className:"w-full rounded form-input",placeholder:"Enter mobile no"}),s.mobile_no&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.mobile_no})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Email"}),e.jsx("input",{type:"email",onChange:l=>d("email",l.target.value),value:t.email,className:"w-full rounded form-input",placeholder:"Enter email"}),s.email&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.email})]}),e.jsxs("div",{className:"flex flex-col w-1/2 gap-2 p-2",children:[e.jsx("label",{htmlFor:"",children:"Address"}),e.jsx("textarea",{name:"",onChange:l=>d("address",l.target.value),value:t.address,id:"",rows:3,className:"w-full rounded resize-none form-textarea",placeholder:"Enter address"}),s.address&&e.jsx("p",{className:"mt-1 text-xs text-red-500",children:s.address})]}),e.jsx("div",{className:"w-full py-5",children:e.jsx("button",{className:"px-6 py-2 text-sm font-medium text-white rounded bg-rose-600",children:"Edit Complaint"})})]})]})]})}export{C as default};