import React from 'react';

const LoanDetail = ({ loan }) => {
  if (!loan) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Loan Details for Loan ID: {loan.id}</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-lg">Employee Name:</p>
          <p className="text-lg text-gray-700">{loan.employee_name}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">Loan Amount:</p>
          <p className="text-lg text-gray-700">Rs : {loan.amount}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">Start Date:</p>
          <p className="text-lg text-gray-700">{new Date(loan.start_date).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">End Date:</p>
          <p className="text-lg text-gray-700">{new Date(loan.end_date).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">Status:</p>
          <p className="text-lg text-gray-700">{loan.status}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">Reason:</p>
          <p className="text-lg text-gray-700">{loan.reason}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-lg">Repayment Terms:</p>
          <p className="text-lg text-gray-700">{loan.repayment_terms}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">Documents:</p>
          <a
            href={loan.document}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-lg"
          >
            View Document
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
