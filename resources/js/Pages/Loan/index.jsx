import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

const LoanManagement = ({ user, user_type, notif, loans, us }) => {
    const [loanData, setLoanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data, setData, post, reset } = useForm({
        employee_name: "",
        registration: "",
        amount: "",
        repayment_terms: "onetime",
        start_date: "",
        end_date: "",
        months: 2,
        monthly_installment: "",
        document: null,
        status: "Pending",
        reason: "",
        duration_months: "",
    });

    const [documentName, setDocumentName] = useState("");
    const [documentPreview, setDocumentPreview] = useState(null);

    useEffect(() => {
        fetchLoans();
    }, []);

    useEffect(() => {
        if (data.repayment_terms === "monthly" && data.amount && data.months) {
            const installment = (data.amount / data.months).toFixed(0);
            setData("monthly_installment", installment);
        } else {
            setData("monthly_installment", "");
        }
    }, [data.amount, data.months, data.repayment_terms]);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/loans");
            setLoanData(response.data);
        } catch (error) {
            console.error("Error fetching loan data:", error);
            alert("An error occurred while fetching loan data.");
        } finally {
            setLoading(false);
        }
    };

    const handleRepaymentChange = (e) => {
        const repaymentType = e.target.value;
        setData("repayment_terms", repaymentType);
        if (repaymentType === "onetime") {
            setData("start_date", "");
            setData("end_date", "");
            setData("monthly_installment", "");
            setData("months", 2);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("document", file);
        setDocumentName(file.name);

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDocumentPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setDocumentPreview(null);
        }
    };

    const handleSubmit = () => {
        post("/loans", {
            onSuccess: () => {
                alert("Loan added successfully!");
                fetchLoans();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                alert("An error occurred while adding the loan.");
            },
        });
    };
    const handleStatusUpdate = async (loanId, status) => {
        const validStatuses = ["Approved", "Rejected"]; // Add other valid statuses if needed
        if (!validStatuses.includes(status)) {
            console.error("Invalid status:", status);
            alert("The selected status is invalid.");
            return;
        }

        try {
            const response = await axios.put(`/loans/${loanId}`, { status }); // Corrected: Added backticks for the URL
            if (response.status === 200) {
                console.log("Status updated successfully");
            } else {
                console.error("Error response data:", response.data);
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating the status.");
        }
    };

    return (
        <div className="w-[85.2%] absolute right-0 overflow-hidden">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-xl max-w-5xl">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                    Loan Management Portal
                </h1>

                {us === 1 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Employee Name
                                </label>
                                <input
                                    type="text"
                                    value={data.employee_name}
                                    onChange={(e) =>
                                        setData("employee_name", e.target.value)
                                    }
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    value={data.registration}
                                    onChange={(e) =>
                                        setData("registration", e.target.value)
                                    }
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Loan Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Repayment Type
                                </label>
                                <div className="flex items-center mt-2 space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="repayment_terms"
                                            value="onetime"
                                            checked={
                                                data.repayment_terms ===
                                                "onetime"
                                            }
                                            onChange={handleRepaymentChange}
                                            className="h-4 w-4"
                                        />
                                        <span>One-Time</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="repayment_terms"
                                            value="monthly"
                                            checked={
                                                data.repayment_terms ===
                                                "monthly"
                                            }
                                            onChange={handleRepaymentChange}
                                            className="h-4 w-4"
                                        />
                                        <span>Monthly</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {data.repayment_terms === "monthly" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Installment Months
                                        </label>
                                        <select
                                            value={data.months}
                                            onChange={(e) =>
                                                setData(
                                                    "months",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {Array.from(
                                                { length: 11 },
                                                (_, i) => (
                                                    <option
                                                        key={i + 2}
                                                        value={i + 2}
                                                    >
                                                        {i + 2} Months
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Monthly Installment
                                        </label>
                                        <input
                                            type="text"
                                            value={data.monthly_installment}
                                            readOnly
                                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Start Date
                                </label>
                                <DatePicker
                                    selected={data.start_date}
                                    onChange={(date) =>
                                        setData("start_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    End Date
                                </label>
                                <DatePicker
                                    selected={data.end_date}
                                    onChange={(date) =>
                                        setData("end_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Document
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {documentName && (
                            <div className="mt-2 text-sm text-gray-600">
                                Uploaded Document: {documentName}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Reason for Loan
                            </label>
                            <textarea
                                value={data.reason}
                                onChange={(e) =>
                                    setData("reason", e.target.value)
                                }
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : null}
                            Submit Loan
                        </button>
                    </div>
                ) : null}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Existing Loans
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-blue-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Employee Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Designation
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase">
                                        Status
                                    </th>
                                    {/* Only show the "Actions" column if there's at least one pending loan */}
                                    {loans.some(
                                        (loan) =>
                                            loan.status?.toLowerCase() ===
                                            "pending"
                                    ) && (
                                        <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loans.map((loan) => (
                                    <tr
                                        key={loan.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.employee_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.registration}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(
                                                loan.start_date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(
                                                loan.end_date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                                    loan.status?.toLowerCase() ===
                                                    "approved"
                                                        ? "bg-blue-600"
                                                        : loan.status?.toLowerCase() ===
                                                          "rejected"
                                                        ? "bg-gray-600"
                                                        : "bg-orange-500"
                                                }`}
                                            >
                                                {loan.status}
                                            </span>
                                        </td>
                                        {/* Only show the "Actions" column for pending loans */}
                                        {loans.some(
                                            (loan) =>
                                                loan.status?.toLowerCase() ===
                                                "pending"
                                        ) && (
                                            <td className="px-6 py-4 flex justify-center items-center space-x-2">
                                                {loan.status?.toLowerCase() ===
                                                    "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    loan.id,
                                                                    "Approved"
                                                                )
                                                            }
                                                            className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
                                                            title="Approve"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    loan.id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                            className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
                                                            title="Reject"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanManagement;