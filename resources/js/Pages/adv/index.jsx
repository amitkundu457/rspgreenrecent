import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSpinner } from "react-icons/fa";

const LoanManagement = ({
    user,
    user_type,
    notif,
    us,
    employees,
    advanceloans,
}) => {
    const [loanData, setLoanData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data, setData, post, reset } = useForm({
        user_id: "",
        borrower_name: "",
        loan_amount: "",
        loan_date: null,
        due_date: null,
        remarks: "",
        payable_amount: "",
        remaining_amount: "",
    });
    console.log("Employees Data:", employees);

    const formatDateForDatabase = (date) => {
        if (!date) return null;
        return date.toISOString().split("T")[0];
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
        post("/advanceloan", {
            data: {
                ...data,
                loan_date: formatDateForDatabase(data.loan_date),
                due_date: formatDateForDatabase(data.due_date),
            },
            onSuccess: () => {
                alert("Advance loan added successfully!");
                fetchLoans();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                alert("An error occurred while adding the loan.");
            },
        });
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
                    Advance Loan
                </h1>
                {us !== 1 && (
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Employee
                                </label>
                                <select
                                    value={data.id || ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        console.log("Selected ID:", selectedId);

                                        if (!selectedId) return; // Prevent errors if empty

                                        const selectedEmployee =
                                            employees?.find(
                                                (emp) =>
                                                    emp.id.toString() ===
                                                    selectedId
                                            );

                                        console.log(
                                            "Selected Employee:",
                                            selectedEmployee
                                        );

                                        if (selectedEmployee) {
                                            setData((prevData) => ({
                                                ...prevData,
                                                id: selectedEmployee.id, // Store id instead of user_id
                                                borrower_name:
                                                    selectedEmployee.name,
                                                loan_amount:
                                                    selectedEmployee.basic_salary,
                                            }));
                                        }
                                    }}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select an Employee</option>
                                    {employees?.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.name} -{" "}
                                            {employee.employee_id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Loan Amount
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Payable Amount
                                </label>
                                <input
                                    type="number"
                                    value={data.payable_amount}
                                    onChange={(e) => {
                                        const payable = Number(e.target.value);
                                        const salary =
                                            Number(data.loan_amount) || 0;
                                        setData({
                                            ...data,
                                            payable_amount: payable,
                                            remaining_amount: salary - payable,
                                        });
                                    }}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Loan Date
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Due Date
                                </label>
                                <DatePicker
                                    selected={data.due_date}
                                    onChange={(date) =>
                                        setData("due_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
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
                        <button
                            onClick={handleSubmit}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : null}
                            Submit
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
                                    {/* <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
                                        Actions
                                    </th> */}
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
                                            {loan.payable_amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {loan.remarks}
                                        </td>
                                        {/* <td className="px-6 py-4 text-sm text-gray-700">
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
                                        </td> */}
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
