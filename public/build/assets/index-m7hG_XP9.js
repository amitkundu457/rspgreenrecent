import{W as c,j as e,a as r}from"./app-Cn1PjxUx.js";import{N as o}from"./notyf.min-DLu_xjpT.js";import{H as x,N as m}from"./Nav-BNNd6Nrg.js";import{i as h}from"./index-BxkI7NKl.js";import"./iconBase-BPFLjw48.js";import"./index-mSteYAay.js";const l=new o;function y({sales:a}){const d=t=>t.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" "),{delete:i}=c();function n(t){event.preventDefault(),confirm("Are you sure you want to delete this sale?")&&i(route("sales.destroy",t),{onSuccess:()=>{l.success("Sales deleted successfully!")},onError:()=>{l.error("Failed to delete sales.")}})}return e.jsxs("div",{className:"w-[83.2%] ml-[11.5rem] absolute right-0 overflow-hidden",children:[e.jsx(x,{}),e.jsx(m,{}),e.jsxs("div",{className:"p-6 bg-white rounded-lg shadow",children:[e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("input",{type:"text",placeholder:"Search data...",className:"w-[60%] p-2 border border-gray-300 rounded-md"}),e.jsx(r,{href:"sales/add",className:"px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600",children:"Add Sales"})]}),e.jsxs("table",{className:"w-full border border-collapse table-auto",children:[e.jsx("thead",{className:"text-white bg-gray-700",children:e.jsxs("tr",{children:[e.jsx("th",{className:"p-3 text-left border",children:"Bill No."}),e.jsx("th",{className:"p-3 text-left border",children:"Customer Name"}),e.jsx("th",{className:"p-3 text-left border",children:"Date"}),e.jsx("th",{className:"p-3 text-left border",children:"Billing Address"}),e.jsx("th",{className:"p-3 text-left border",children:"Status"}),e.jsx("th",{className:"p-3 text-left border",children:"Type"}),e.jsx("th",{className:"p-3 text-center border",children:"Actions"})]})}),e.jsx("tbody",{children:a&&a.map((t,s)=>e.jsxs("tr",{children:[e.jsx("td",{className:"p-3",children:t.bill_no}),e.jsx("td",{className:"p-3",children:t.name}),e.jsx("td",{className:"p-3",children:t.date}),e.jsx("td",{className:"p-3",children:t.billing_address}),e.jsx("td",{className:"p-3",children:d(t.status)}),e.jsx("td",{className:"p-3",children:t.invoice_type==="pi"?"Proforma Invoice":t.invoice_type==="tax"?"Tax Invoice":"Cash Invoice"}),e.jsxs("td",{className:"flex gap-1 p-3",children:[e.jsx(r,{href:route("sale.print",t.id),className:"flex items-center gap-1 px-2 py-1 text-sm font-medium text-white rounded bg-emerald-500",children:e.jsx("span",{children:e.jsx(h,{})})}),e.jsx(r,{href:`/sales/${t.id}/edit`,className:"flex items-center gap-1 px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded",children:e.jsx("span",{children:"Edit"})}),e.jsx("button",{type:"button",onClick:()=>n(t.id),className:"flex items-center gap-1 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded",children:e.jsx("span",{children:"Delete"})})]})]}))})]})]})]})}export{y as default};