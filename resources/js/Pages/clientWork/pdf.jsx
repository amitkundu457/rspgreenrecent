import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import React from 'react';

function WorkOrderPrint({ client, documentPath, user, notif, user_type }) {
  const handlePrint = () => {
    const contentToPrint = document.getElementById('pdf-content');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Work Order</title></head><body>');
    printWindow.document.write(contentToPrint.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleViewDocument = () => {
    const documentUrl = `http://127.0.0.1:8000/${documentPath}`;
    window.open(documentUrl, '_blank');
  };

  return (
    <div className="">
      {/* Navigation */}
      <Header />
      <Nav />

      {/* Work Order Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-extrabold uppercase text-green-600">
            RSP Green Development & Laboratories Pvt. Ltd.
          </h1>
          {/* <p className="text-sm text-gray-500">Excellence in Development & Research</p> */}
        </div>

        {/* Client Information */}
        <div className="mb-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Client Details:</h2>
          <p>
            <strong className="text-gray-600">Client Name:</strong> {client.client_name}
          </p>
          <p>
            <strong className="text-gray-600">Client Address:</strong> {client.client_address}
          </p>
          <p>
            <strong className="text-gray-600">Phone Number:</strong> {client.client_phone_no}
          </p>
          <p>
            <strong className="text-gray-600">Work Order Description:</strong> {client.client_work_order}
          </p>
        </div>

        {/* Document Section */}
        {documentPath && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Work Order Document:</h2>
            <button
              onClick={handleViewDocument}
              className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-300"
            >
              View Work Order
            </button>
          </div>
        )}

        {/* Buttons */}
        {/* <div className="text-center mt-8">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-300 mr-4"
          >
            Print Work Order
          </button>
          {documentPath && (
            <button
              onClick={handleViewDocument}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-900 transition-all duration-300"
            >
              View Document
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default WorkOrderPrint;
// import { Link } from '@inertiajs/react';
// import React from 'react';

// function WorkOrderPrint({ client }) {
//   const handlePrint = () => {
//     window.print();
//   };

//   console.log("Client Data:", client);

//   return (
//     <div className="p-6 bg-white border rounded-lg shadow-md">
//       {/* Company Header */}
//       <div className="p-8 max-w-4xl mx-auto s">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         {/* Left Logo and Title */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="path-to-rsp-logo.png"
//             alt="RSP Logo"
//             className="h-16 w-auto"
//           />
//           <div>
//             <p className="font-bold text-lg">RSP Green Development & Laboratories Pvt. Ltd.</p>
//             <p className="text-sm">An ISO 9001: 2015 & ISO 14001: 2015 Certified Company</p>
//           </div>
//         </div>
//         {/* Right Logo */}
//         <img
//           src="path-to-qci-nabet-logo.png"
//           alt="QCI NABET Logo"
//           className="h-16 w-auto"
//         />
//       </div>

//       {/* PO Details */}
//       <div className="mb-6">
//         <p className="font-bold text-lg">P.O No: RSP/Admin/24-25/284</p>
//         <p className="font-bold text-lg text-red-600">
//           QCI-NABET ACCREDITED ENVIRONMENTAL CONSULTANT
//         </p>
//         <p className="text-sm">CIN NO: U74999WB2017PTC219565</p>
//       </div>

//       {/* Contact Section */}
//       <div className="mb-6">
//         <p className="text-sm">To,</p>
//         <p className="font-bold">Equiconsulting Services Private Limited</p>
//         <p className="text-sm">
//           A.P. Nagar, Sonarpur, Dist. 24 Pgs (s), Sonarpur
//         </p>
//         <p className="text-sm">WB, India PIN Code: 700150</p>
//         <p className="text-sm">Contact no: 9831186569</p>
//         <p className="text-sm">Email ID: provrsp@gmail.com</p>
//       </div>

//       {/* Date Section */}
      
//     </div>

//       {/* Work Order Header */}
//       <div className="flex justify-between items-center mb-6 border-b pb-4">
//         <div>
//           <p><strong>To:</strong></p>
//           <p>{client.client_name}</p>
//           <p>{client.client_address}</p>
//           <p><strong>Phone:</strong> {client.client_phone_no}</p>
//         </div>
//         <div className="text-right">
        
//           <p><strong>Work Order Date:</strong> {client.work_order_date}</p>
//         </div>
//       </div>

//       {/* Subject */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold">Subject:</h2>
//         <p>Work Order for the Development of Integrated Ticketing System</p>
//       </div>

//       {/* Job Details Table */}
//       <div className="mb-6">
//         <table className="w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Sr No</th>
//               <th className="border px-4 py-2 text-left">Task</th>
//               <th className="border px-4 py-2 text-left">Qty</th>
//               <th className="border px-4 py-2 text-left">UOM</th>
//               <th className="border px-4 py-2 text-left">Rate</th>
//               <th className="border px-4 py-2 text-left">Amount</th>
//               <th className="border px-4 py-2 text-left">HSN Code</th>
//               <th className="border px-4 py-2 text-left">GST</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2">1</td>
//               <td className="border px-4 py-2">{client.client_work_order}</td>
//               <td className="border px-4 py-2">1</td>
//               <td className="border px-4 py-2">Job</td>
//               <td className="border px-4 py-2">-</td>
//               <td className="border px-4 py-2">-</td>
//               <td className="border px-4 py-2">-</td>
//               <td className="border px-4 py-2">18%</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Terms and Conditions */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold">Terms & Conditions Agreed Upon:</h2>
//         <ul className="list-disc ml-6 mt-2 space-y-2">
//           <li>Software to be developed considering existing features & SOP shared.</li>
//           <li>Bank Payment integration for EDC & Online Gateway location-wise for all sites.</li>
//           <li>Development timelines: 90 days including internal testing.</li>
//           <li>Reporting formats to be shared by DRIL.</li>
//           <li>Logs for website & devices to capture any errors, accessible by DRIL.</li>
//         </ul>
//       </div>

//       {/* Document Section */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold">Document:</h2>
//         <p>
//           <a
//             href={`/work_order_documents/${client.id}.pdf`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline"
//           >
//             View Work Order Document
//           </a>
//         </p>
//       </div>

//       {/* Footer Buttons */}
//       <div className="flex justify-end mt-4 space-x-2">
//         <button
//           className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//           onClick={handlePrint}
//         >
//           Print
//         </button>
//         <Link
//           href="/clients-workOrder"
//           className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//         >
//           Close
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default WorkOrderPrint;

