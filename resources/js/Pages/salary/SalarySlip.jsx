import React, { useState, useRef } from "react";
import jsPDF from "jspdf";

const SalarySlip = ({ combinedData, data }) => {
    const slipRef = useRef(null);

    // Format currency
    const formatToCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(amount || 0);

    // Handle PDF download
    const handleDownloadPDF = () => {
        const doc = new jsPDF("p", "pt", "a3");
        const content = slipRef.current;

        doc.html(content, {
            callback: (pdf) => {
                pdf.save("SalarySlip.pdf");
            },
            x: 20,
            y: 20,
            width: 550,
        });
    };

    return (
        <div>
            {/* Salary Slip */}
            <div
                ref={slipRef}
                className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg rounded-lg"
            >
                {Array.isArray(combinedData) && combinedData.length > 0 ? (
                    combinedData.map((employee) => {
                        const {
                            employee_id,
                            employeeName,
                            generate_date,
                            total_amount = 0,
                            approved_by,
                            approved_date,
                        } = employee;

                        const matchedData = data.find(
                            (item) => item.id === employee_id
                        );

                        // Extract deduction amounts (default to 0 if not available)
                        let leaveDeduction = parseFloat(matchedData?.leave_deduction_amount) || 0;
                        let lateDeduction = parseFloat(matchedData?.late_deduction_amount) || 0;
                        let loanDeduction = parseFloat(matchedData?.loan_amount) || 0;
                        let advanceLoanDeduction = parseFloat(matchedData?.advance_loan_amount) || 0;

                        // Total deductions
                        const totalDeductions = leaveDeduction + lateDeduction + loanDeduction + advanceLoanDeduction;

                        // Calculate net salary
                        let netSalary = total_amount - totalDeductions;
                        netSalary = Math.round(netSalary * 100) / 100;

                        return (
                            <div
                                key={employee_id}
                                className="mb-8 bg-white shadow-md rounded-lg overflow-hidden"
                            >
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                                        <tr>
                                            <th className="px-6 py-3 border border-gray-300">Field</th>
                                            <th className="px-6 py-3 border border-gray-300">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-800">
                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Employee ID</td>
                                            <td className="px-6 py-3 border border-gray-300">
                                                {matchedData?.employee_id || "N/A"}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-50 hover:bg-blue-100">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Employee Name</td>
                                            <td className="px-6 py-3 border border-gray-300 font-bold text-indigo-600">
                                                {matchedData?.employee_name || "N/A"}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Salary Date</td>
                                            <td className="px-6 py-3 border border-gray-300">{generate_date || "N/A"}</td>
                                        </tr>
                                        <tr className="bg-blue-50 hover:bg-blue-100">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Basic Salary</td>
                                            <td className="px-6 py-3 border border-gray-300 font-bold text-green-600">
                                                {formatToCurrency(total_amount)}
                                            </td>
                                        </tr>

                                        {/* Deduction Fields */}
                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Leave Deduction</td>
                                            <td className="px-6 py-3 border border-gray-300 font-semibold text-red-600">
                                                {formatToCurrency(leaveDeduction)}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-50 hover:bg-blue-100">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Late Deduction</td>
                                            <td className="px-6 py-3 border border-gray-300 font-semibold text-red-600">
                                                {formatToCurrency(lateDeduction)}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Loan Deduction</td>
                                            <td className="px-6 py-3 border border-gray-300 font-semibold text-red-600">
                                                {formatToCurrency(loanDeduction)}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-50 hover:bg-blue-100">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Advance Loan Deduction</td>
                                            <td className="px-6 py-3 border border-gray-300 font-semibold text-red-600">
                                                {formatToCurrency(advanceLoanDeduction)}
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Total Deductions</td>
                                            <td className="px-6 py-3 border border-gray-300 font-semibold text-red-600">
                                                {formatToCurrency(totalDeductions)}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-50 hover:bg-blue-100">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Net Salary</td>
                                            <td className="px-6 py-3 border border-gray-300 font-bold text-green-700">
                                                {formatToCurrency(netSalary)}
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-blue-50">
                                            <td className="px-6 py-3 border border-gray-300 font-semibold">Approved By</td>
                                            <td className="px-6 py-3 border border-gray-300">{approved_by || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-700 text-lg">No employee data available.</p>
                )}
            </div>

            {/* Download PDF Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleDownloadPDF}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Download Salary Slip (PDF)
                </button>
            </div>
        </div>
    );
};

export default SalarySlip;
