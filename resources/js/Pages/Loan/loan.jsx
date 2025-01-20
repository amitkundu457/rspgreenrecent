import React from 'react';

const LoanTable = ({ loans }) => (
  <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl max-w-4xl">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Loans</h2>
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border-b py-2">Employee</th>
          <th className="border-b py-2">Amount</th>
          <th className="border-b py-2">Repayment Terms</th>
          <th className="border-b py-2">Start Date</th>
          <th className="border-b py-2">End Date</th>
          <th className="border-b py-2">Installment</th>
        </tr>
      </thead>
      <tbody>
        {loans.length > 0 ? (
          loans.map((loan) => (
            <tr key={loan.id}>
              <td className="border-b py-2">{loan.employee_name}</td>
              <td className="border-b py-2">{loan.amount}</td>
              <td className="border-b py-2">{loan.repayment_terms}</td>
              <td className="border-b py-2">{loan.start_date}</td>
              <td className="border-b py-2">{loan.end_date}</td>
              <td className="border-b py-2">{loan.monthly_installment}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4">No loans available.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default LoanTable;
