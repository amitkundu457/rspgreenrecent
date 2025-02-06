import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    FaCheck,
    FaTimes,
    FaSpinner,
    FaEdit,
    FaTrashAlt,
} from "react-icons/fa";

const LoanManagement = ({
    user,
    user_type,
    notif,
    loans,
    us,
    advanceloans,
    employees,
}) => {
    const [loanData, setLoanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editLoan, setEditLoan] = useState(null); // For edit functionality
    console.log("aaa", employees);

    const { data, setData, post, put, reset } = useForm({
        borrower_name: "",
        loan_amount: "",
        loan_date: null,
        due_date: null,
        remarks: "",
        Payable_Amount: "",
        Remaining_Amount: "",
    });

    const formatDateForDatabase = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/advanceloan");
            setLoanData(response.data);
        } catch (error) {
            console.error("Error fetching loan data:", error);
            alert("An error occurred while fetching loan data.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        const formattedLoanDate = formatDateForDatabase(data.loan_date);
        const formattedDueDate = formatDateForDatabase(data.due_date);

        post("/advanceloan", {
            data: {
                ...data,
                loan_date: formattedLoanDate,
                due_date: formattedDueDate,
            },
            onSuccess: () => {
                alert("Advance salary added successfully!");
                fetchLoans();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                alert("An error occurred while adding the loan.");
            },
        });
    };

    const handleEdit = (loan) => {
        setEditLoan(loan);
        setData({
            borrower_name: loan.borrower_name,
            loan_amount: loan.loan_amount,
            loan_date: new Date(loan.loan_date),
            remarks: loan.remarks,
            Payable_Amount: loan.payable_amount,
            Remaining_Amount: loan.remaining_amount,
        });
    };

    const handleUpdate = () => {
        const formattedLoanDate = formatDateForDatabase(data.loan_date);
        const formattedDueDate = formatDateForDatabase(data.due_date);

        put(`/advanceloan/${editLoan.id}`, {
            data: {
                ...data,
                loan_date: formattedLoanDate,
                due_date: formattedDueDate,
            },
            onSuccess: () => {
                alert("Loan updated successfully!");
                fetchLoans();
                setEditLoan(null);
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                alert("An error occurred while updating the loan.");
            },
        });
    };

    const handleDelete = async (loanId) => {
        if (window.confirm("Are you sure you want to delete this loan?")) {
            try {
                await axios.delete(`/advanceloan/${loanId}`);
                alert("Loan deleted successfully!");
                fetchLoans();
            } catch (error) {
                console.error("Error deleting loan:", error);
                alert("An error occurred while deleting the loan.");
            }
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    return (
        <div className="w-[85.2%] absolute right-0 overflow-hidden">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-xl max-w-5xl">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                    Advance Salary
                </h1>

                {us !== 1 && (
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Select Employee */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Employee
                                </label>
                                <select
                                    value={data.employee_id}
                                    onChange={(e) => {
                                        const selectedEmployee = employees.find(
                                            (emp) =>
                                                emp.employee_id ===
                                                e.target.value
                                        );
                                        if (selectedEmployee) {
                                            setData(
                                                "employee_id",
                                                selectedEmployee.employee_id
                                            );
                                            setData(
                                                "borrower_name",
                                                selectedEmployee.name
                                            );
                                            setData(
                                                "loan_amount",
                                                selectedEmployee.basic_salary
                                            );
                                        }
                                    }}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select an Employee</option>
                                    {employees.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.employee_id}
                                        >
                                            {employee.name} -{" "}
                                            {employee.employee_id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Salary Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Salary Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.loan_amount}
                                    onChange={(e) =>
                                        setData("loan_amount", e.target.value)
                                    }
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Payable Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Payable Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.payable_amount}
                                    onChange={(e) => {
                                        const payable = Number(e.target.value);
                                        const salary = Number(data.loan_amount);
                                        setData("payable_amount", payable);
                                        setData(
                                            "remaining_amount",
                                            salary - payable
                                        );
                                    }}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Remaining Amount (Read-Only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Remaining Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.remaining_amount || 0}
                                    readOnly
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Payment Date
                                </label>
                                <DatePicker
                                    selected={data.loan_date}
                                    onChange={(date) =>
                                        setData("loan_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Remarks */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Remarks
                            </label>
                            <textarea
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={editLoan ? handleUpdate : handleSubmit}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : null}
                            {editLoan ? "Update Loan" : "Submit"}
                        </button>
                    </div>
                )}

                {/* Existing Loans Table */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Existing Advance Salary
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-blue-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Employee ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Employee Name
                                    </th>

                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Payable Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Remarks
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {advanceloans.map((loan) => (
                                    <tr
                                        key={loan.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            EMP00000{loan.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.borrower_name}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.loan_amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.remarks}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <button
                                                onClick={() => handleEdit(loan)}
                                                className="text-blue-500 mr-2"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(loan.id)
                                                }
                                                className="text-red-500"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
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
