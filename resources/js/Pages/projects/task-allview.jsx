import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // Icons
import { MdSupervisorAccount } from "react-icons/md"; // Team Leader Icon

const EditProject = ({ allEmployees, tasksss, tls }) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        employeeId: "",
        taskTime: "",
    });

    const totalTaskTime = employeeList.reduce(
        (sum, emp) => sum + emp.taskTime,
        0
    );

    const handleSaveEmployee = () => {
        const selectedEmployee = allEmployees.find(
            (emp) => emp.id.toString() === newEmployee.employeeId
        );

        if (selectedEmployee && newEmployee.taskTime) {
            const newTaskTime = Number(newEmployee.taskTime);
            const newTotalTime =
                totalTaskTime +
                newTaskTime -
                (editIndex !== null ? employeeList[editIndex].taskTime : 0);

            if (newTotalTime > tasksss.estimate_hours) {
                alert(
                    `Estimated hours exceeded! Total time is ${newTotalTime}, exceeding the limit of ${tasksss.estimate_hours}.`
                );
                return;
            }

            let updatedList = [...employeeList];
            if (editIndex !== null) {
                updatedList[editIndex] = {
                    ...selectedEmployee,
                    taskTime: newTaskTime,
                };
            } else {
                updatedList.push({
                    ...selectedEmployee,
                    taskTime: newTaskTime,
                });
            }

            setEmployeeList(updatedList);
            setNewEmployee({ employeeId: "", taskTime: "" });
            setShowModal(false);
            setEditIndex(null);
        } else {
            alert("Please select an employee and enter a valid task time.");
        }
    };

    const handleDeleteEmployee = (id) => {
        setEmployeeList(employeeList.filter((emp) => emp.id !== id));
    };

    const handleEditEmployee = (index) => {
        setNewEmployee({
            employeeId: employeeList[index].id.toString(),
            taskTime: employeeList[index].taskTime.toString(),
        });
        setEditIndex(index);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col w-full md:w-[85%] ml-[12rem]">
            <Header />
            <Nav />
            <div className="p-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8 ml-8">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Manage Employees
                    </h2>
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                        onClick={() => {
                            setNewEmployee({ employeeId: "", taskTime: "" });
                            setEditIndex(null);
                            setShowModal(true);
                        }}
                    >
                        Add Employee
                    </button>
                </div>

                {/* Team Leader Section */}
                <div className="flex items-center justify-start ml-8 mb-8 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md">
                    <MdSupervisorAccount className="text-blue-600 text-3xl mr-3" />
                    <p className="text-xl font-semibold text-gray-800">
                        <span className="text-blue-700 font-bold">
                            Team Leader:{" "}
                        </span>
                        {tls.length > 0 ? tls[0].name : "N/A"}
                    </p>
                </div>

                {/* Employee Table */}
                <table className="min-w-full bg-white shadow-lg rounded-lg ml-4">
                    <thead>
                        <tr className="border-b bg-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">
                                Employee Name
                            </th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">
                                Task Time (hours)
                            </th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">
                                Department
                            </th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map((emp, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-100"
                            >
                                <td className="py-3 px-4">
                                    {emp.employee_name}
                                </td>
                                <td className="py-3 px-4">
                                    {emp.taskTime} hours
                                </td>
                                <td className="py-3 px-4">
                                    {emp.designation_name}
                                </td>
                                <td className="py-3 px-4 text-center flex justify-center gap-3">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() =>
                                            handleEditEmployee(index)
                                        }
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() =>
                                            handleDeleteEmployee(emp.id)
                                        }
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total Task Time */}
                <div className="bg-white shadow-lg rounded-lg ml-4 mt-6 p-4">
                    <p className="text-xl font-semibold text-gray-700">
                        Total time: {tasksss.estimate_hours} / Total Task Time:{" "}
                        <span className="text-blue-500">{totalTaskTime}</span>{" "}
                        hours
                    </p>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                {editIndex !== null
                                    ? "Edit Employee"
                                    : "Add Employee"}
                            </h3>

                            {/* Employee Dropdown */}
                            <label className="block mb-2 text-gray-700">
                                Employee Name:
                            </label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={newEmployee.employeeId}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        employeeId: e.target.value,
                                    })
                                }
                                disabled={editIndex !== null}
                            >
                                <option value="">Select Employee</option>
                                {allEmployees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.employee_name} -{" "}
                                        {emp.designation_name}
                                    </option>
                                ))}
                            </select>

                            {/* Task Time Input */}
                            <label className="block mt-4 mb-2 text-gray-700">
                                Task Time (hours):
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={newEmployee.taskTime}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        taskTime: e.target.value,
                                    })
                                }
                            />

                            {/* Buttons */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditIndex(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    onClick={handleSaveEmployee}
                                >
                                    {editIndex !== null ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditProject;
