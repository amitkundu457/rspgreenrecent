import{W as P,r as i,j as e,Y as _,a as F}from"./app-Cn1PjxUx.js";import{G as S}from"./GuestLayout-DBtr2GlK.js";import{T as l,I as o}from"./TextInput-CobvPpbm.js";import{I as n}from"./InputLabel-CoCJ7Ra-.js";import{P as q}from"./PrimaryButton-DXnEJQEc.js";import{F as x,a as j}from"./index-BxkI7NKl.js";import"./iconBase-BPFLjw48.js";function D(){const{data:a,setData:t,post:g,processing:f,errors:r,reset:w}=P({name:"",email:"",phone:"",address:"",password:"",password_confirmation:"",source:"",commission:"",website:"",business_type:"",agentname:""}),[d,b]=i.useState(!1),[c,v]=i.useState(!1),[u,N]=i.useState(!1),[h,p]=i.useState(""),[y,m]=i.useState(!1),C=s=>{if(s.preventDefault(),p(""),!u){p("Please accept the terms and conditions to register.");return}m(!0)},k=()=>{m(!1),g(route("register"),{onFinish:()=>w("password","password_confirmation")})};return e.jsxs(S,{children:[e.jsx(_,{title:"Register"}),e.jsxs("form",{onSubmit:C,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(n,{htmlFor:"name",value:"Name"}),e.jsx(l,{id:"name",name:"name",value:a.name,className:"block w-full mt-1",autoComplete:"name",isFocused:!0,onChange:s=>t("name",s.target.value),required:!0}),e.jsx(o,{message:r.name,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"phone",value:"Phone Number"}),e.jsx(l,{id:"phone",type:"number",name:"phone",value:a.phone,className:"block w-full mt-1",autoComplete:"phone",onChange:s=>t("phone",s.target.value),required:!0}),e.jsx(o,{message:r.phone,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",type:"email",name:"email",value:a.email,className:"block w-full mt-1",autoComplete:"username",onChange:s=>t("email",s.target.value),required:!0}),e.jsx(o,{message:r.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"source",value:"Project"}),e.jsxs("select",{id:"source",name:"source",value:a.source,onChange:s=>t("source",s.target.value),className:"block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",required:!0,children:[e.jsx("option",{value:"",children:"Select an option"}),e.jsx("option",{value:"self",children:"Project 1"}),e.jsx("option",{value:"social media",children:"Project 2"}),e.jsx("option",{value:"website",children:"Project 3"}),e.jsx("option",{value:"other",children:"Project 4"})]}),e.jsx(o,{message:r.source,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"business_type",value:"Business Type"}),e.jsx(l,{id:"business_type",name:"business_type",value:a.business_type,className:"block w-full mt-1",onChange:s=>t("business_type",s.target.value),required:!0}),e.jsx(o,{message:r.business_type,className:"mt-2"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(n,{htmlFor:"password",value:"Password"}),e.jsx(l,{id:"password",type:d?"text":"password",name:"password",value:a.password,className:"block w-full mt-1 pr-12",autoComplete:"new-password",onChange:s=>t("password",s.target.value),required:!0}),e.jsx("button",{type:"button",onClick:()=>b(s=>!s),className:"absolute right-3 inset-y-0 flex items-center justify-center text-gray-500",children:d?e.jsx(x,{className:"w-5 h-5"}):e.jsx(j,{className:"w-5 h-5"})}),e.jsx(o,{message:r.password,className:"mt-2"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(n,{htmlFor:"password_confirmation",value:"Confirm Password"}),e.jsx(l,{id:"password_confirmation",type:c?"text":"password",name:"password_confirmation",value:a.password_confirmation,className:"block w-full mt-1 pr-12",autoComplete:"new-password",onChange:s=>t("password_confirmation",s.target.value),required:!0}),e.jsx("button",{type:"button",onClick:()=>v(s=>!s),className:"absolute right-3 inset-y-0 flex items-center justify-center text-gray-500",children:c?e.jsx(x,{className:"w-5 h-5"}):e.jsx(j,{className:"w-5 h-5"})}),e.jsx(o,{message:r.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(n,{htmlFor:"address",value:"Address"}),e.jsx("textarea",{id:"address",name:"address",value:a.address,className:"block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",onChange:s=>t("address",s.target.value),required:!0}),e.jsx(o,{message:r.address,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",checked:u,onChange:s=>N(s.target.checked),className:"mr-2"}),e.jsx("span",{className:"text-sm",children:"I agree to the terms and conditions."})]}),h&&e.jsx("p",{className:"mt-2 text-sm text-red-600",children:h}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[e.jsx(F,{href:route("login"),className:"text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e.jsx(q,{className:"ml-4",disabled:f,children:"Register"})]})]}),y&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"max-w-lg p-6 bg-white rounded-lg shadow-lg",children:[e.jsx("h2",{className:"mb-4 text-lg font-semibold",children:"Terms and Conditions"}),e.jsx("p",{className:"mb-4",children:"Please review and accept the terms and conditions to proceed with registration."}),e.jsxs("div",{className:"flex justify-end space-x-2",children:[e.jsx("button",{className:"px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400",onClick:()=>m(!1),children:"Cancel"}),e.jsx("button",{className:"px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600",onClick:k,children:"Accept & Submit"})]})]})})]})}export{D as default};