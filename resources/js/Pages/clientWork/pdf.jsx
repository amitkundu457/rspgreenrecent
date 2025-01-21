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
