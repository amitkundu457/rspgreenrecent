import React, { useRef } from "react";

const SalaryPrint = React.forwardRef(({ combinedData }, ref) => {
    const printRef = useRef();
    console.log("aabbcc", combinedData);

    const handlePrint = () => {
        const content = printRef.current;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(content.outerHTML);
        printWindow.document.close();
        printWindow.print();
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div>
            {/* Back Button */}
            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={handleBack}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Back
                </button>
            </div>

            {/* Salary Slip */}
            <div
                ref={printRef}
                style={{
                    fontFamily: "Arial, sans-serif",
                    width: "8.5in",
                    margin: "0 auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                {combinedData.map((data, index) => {
                    const basicSalary = Number(data.basic_salary) || 0;
                    const allowance = basicSalary * 0.2;
                    const lateDeduction =
                        Number(data.late_deduction_amount) || 0;
                    const leaveDeduction =
                        Number(data.leave_deduction_amount) || 0;
                    const totalDeductions = lateDeduction + leaveDeduction;
                    const totalEarnings = basicSalary + allowance;
                    const netSalary = totalEarnings - totalDeductions;

                    return (
                        <div key={index}>
                            <div
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <h2
                                    style={{
                                        margin: "0",
                                        color: "#007BFF",
                                        fontSize: "24px",
                                    }}
                                >
                                    RSP GLOBAL
                                </h2>
                                <p style={{ margin: "0", fontSize: "14px" }}>
                                    Salary Slip:{" "}
                                    {new Date().toLocaleDateString()}
                                </p>
                            </div>

                            <table
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    fontSize: "14px",
                                }}
                            >
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Employee ID:</strong>{" "}
                                            {data.employee_id}
                                        </td>
                                        <td>
                                            <strong>Name:</strong>{" "}
                                            {data.employee_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Department-ID:</strong>{" "}
                                            {data.department_id}
                                        </td>
                                        <td>
                                            <strong>Designation-ID:</strong>{" "}
                                            {data.designation_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Date of joining:</strong>{" "}
                                            {data.joinning_date}
                                        </td>
                                        <td>
                                            <strong>Salary Date:</strong>{" "}
                                            {new Date().toLocaleDateString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3
                                style={{
                                    marginBottom: "10px",
                                    color: "#007BFF",
                                }}
                            >
                                Earnings
                            </h3>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    marginBottom: "20px",
                                    fontSize: "14px",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Type
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Title
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Basic Salary
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Basic
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {basicSalary.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Allowance
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            20% of Basic
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {allowance.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3
                                style={{
                                    marginBottom: "10px",
                                    color: "#007BFF",
                                }}
                            >
                                Deductions
                            </h3>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    marginBottom: "20px",
                                    fontSize: "14px",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Type
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Title
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Late Deduction
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Late Penalty
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {lateDeduction.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Leave Deduction
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            Unpaid Leave
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {leaveDeduction.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3
                                style={{
                                    marginBottom: "10px",
                                    color: "#007BFF",
                                }}
                            >
                                Summary
                            </h3>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: "14px",
                                }}
                            >
                                <tbody>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Total Earnings
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {totalEarnings.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Total Deductions
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            {totalDeductions.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Net Salary
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                color: "#4CAF50",
                                            }}
                                        >
                                            {netSalary.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>

            {/* Centered Print Button */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    onClick={handlePrint}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Print Salary Slip
                </button>
            </div>
        </div>
    );
});

export default SalaryPrint;
