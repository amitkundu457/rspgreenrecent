import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import SalarySlip from "./SalarySlip";
import { Link } from "@inertiajs/react";

const SalaryPage = ({
    user,
    notif,
    user_type,
    salary,
    deductions,
    deductionsss,
    combinedData,
    employees,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState("All Employees");
    const [selectedMonth, setSelectedMonth] = useState("2025-01");
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState(null);
    const printRef = useRef();
    console.log("ggggg", combinedData);

    // Map employee IDs to their names and employee types for quick lookup
    const nameMap = employees.reduce((acc, emp) => {
        acc[emp.id] = { name: emp.name, type: emp.employee_type }; // Assuming employee_type exists
        return acc;
    }, {});

    // Calculate per day and hourly salary amounts
    useEffect(() => {
        const calculateSalaries = () => {
            const updatedSalaries = salary?.map((sal) => {
                const generateDate = new Date(sal.generate_date);
                const daysInMonth = new Date(
                    generateDate.getFullYear(),
                    generateDate.getMonth() + 1,
                    0
                ).getDate();

                const totalAmount = parseFloat(sal.total_amount);
                const perDaySalary = totalAmount / daysInMonth;
                const hourlySalary = totalAmount / (daysInMonth * 8);

                return {
                    ...sal,
                    perDaySalary: perDaySalary.toFixed(2),
                    hourlySalary: hourlySalary.toFixed(2),
                };
            });
            setFilteredSalaries(updatedSalaries);
        };

        calculateSalaries();
    }, [salary]);

    // Filter salaries by selected employee and month
    const handleSearch = () => {
        const filtered = salary.filter((sal) => {
            const matchesEmployee =
                selectedEmployee === "All Employees" ||
                sal.employee_id ===
                    employees.find((emp) => emp.name === selectedEmployee)?.id;
            const matchesMonth =
                !selectedMonth || sal.generate_date.startsWith(selectedMonth);
            return matchesEmployee && matchesMonth;
        });
        setFilteredSalaries(filtered);
    };

    // React To Print Setup
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div className="flex flex-col w-full ml-[11.5rem]">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="px-[5rem] py-4 w-full">
                {!selectedSalary ? (
                    <>
                        <div className="flex items-center space-x-4 mb-6">
                            <select
                                className="border p-2 rounded"
                                value={selectedEmployee}
                                onChange={(e) =>
                                    setSelectedEmployee(e.target.value)
                                }
                            >
                                <option value="All Employees">
                                    All Employees
                                </option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.name}>
                                        {emp.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="month"
                                className="border p-2 rounded"
                                value={selectedMonth}
                                onChange={(e) =>
                                    setSelectedMonth(e.target.value)
                                }
                            />
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>

                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">
                                        Employee Name
                                    </th>
                                    <th className="border p-2">
                                        Employee Type
                                    </th>
                                    <th className="border p-2">
                                        Salary Generate Date
                                    </th>
                                    <th className="border p-2">Net Amount</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((sal) => {
                                    const employee = nameMap[sal.employee_id];
                                    console.log("jhgf", employee);
                                    return (
                                        <tr key={sal.id}>
                                            <td className="border p-2">
                                                {employee
                                                    ? employee.name
                                                    : "Pinaki Ray"}
                                            </td>
                                            <td className="border p-2">
                                                {employee
                                                    ? employee.type
                                                    : "Permanent"}
                                            </td>
                                            <td className="border p-2">
                                                {sal.generate_date}
                                            </td>
                                            <td className="border p-2">
                                                {sal.total_amount}
                                            </td>
                                            <td className="border p-2">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mr-2"
                                                    onClick={() =>
                                                        setSelectedSalary({
                                                            ...sal,
                                                            employeeName:
                                                                employee
                                                                    ? employee.name
                                                                    : "Unknown Employee",
                                                            employeeType:
                                                                employee
                                                                    ? employee.type
                                                                    : "Unknown Type",
                                                            employeeId:
                                                                sal.employee_id,
                                                            deductions:
                                                                deductionsss,
                                                        })
                                                    }
                                                    title="View salary details"
                                                >
                                                    View Details
                                                </button>
                                                <Link
                                                    href={`/all-salary/print/${sal.employee_id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                                    title="Download PDF"
                                                >
                                                    PDF
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div>
                        {/* <button
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                            onClick={handlePrint}
                        >
                            Print Salary Slip
                        </button> */}
                        <button
                            className="bg-gray-500 text-white p-2 rounded mt-4 ml-2"
                            onClick={() => setSelectedSalary(null)}
                        >
                            Back to List
                        </button>
                        <div ref={printRef}>
                            <SalarySlip
                                combinedData={[selectedSalary]}
                                deductions={deductions}
                                signatureName={selectedSalary.employeeName}
                                salary={salary}
                                data={combinedData}
                                employeeId={selectedSalary.employeeId}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryPage;
