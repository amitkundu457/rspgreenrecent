import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai"; // Icon for delete

const EditProject = ({ allEmployees }) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ employeeId: "", taskTime: "" });

    const handleAddEmployee = () => {
        const selectedEmployee = allEmployees.find(emp => emp.id.toString() === newEmployee.employeeId);

        if (selectedEmployee && newEmployee.taskTime) {
            setEmployeeList([
                ...employeeList,
                { ...selectedEmployee, taskTime: Number(newEmployee.taskTime) }
            ]);
            setNewEmployee({ employeeId: "", taskTime: "" });
            setShowModal(false);
        } else {
            alert("Please select an employee and enter a valid task time.");
        }
    };

    const handleDeleteEmployee = (id) => {
        setEmployeeList(employeeList.filter(emp => emp.id !== id));
    };

    const totalTaskTime = employeeList.reduce((sum, emp) => sum + emp.taskTime, 0);

    return (
        <div className="flex flex-col w-full md:w-[85%] ml-[12rem]">
            <Header />
            <Nav />
            <div className="p-8">
            <div className="flex justify-between items-center mb-8 ml-8">
    <h2 className="text-3xl font-semibold text-gray-800">Manage Employees</h2>
    <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
        onClick={() => setShowModal(true)}
    >
        Add Employee
    </button>
</div>



                {/* Employee List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {employeeList.map((emp, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xl font-semibold text-gray-800">{emp.employee_name}</p>
                                    <p className="text-gray-600">
                                        <strong>Task Time:</strong> {emp.taskTime} hours
                                    </p>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700 transition duration-300"
                                    onClick={() => handleDeleteEmployee(emp.id)}
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Task Time */}
                <div className="bg-blue-100 p-4 rounded-lg mb-6">
                    <p className="text-xl font-semibold text-gray-700">
                        Total Task Time: <span className="text-blue-500">{totalTaskTime}</span> hours
                    </p>
                </div>

                {/* Add Employee Button */}
               

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-96 transition-all duration-300 transform scale-95 hover:scale-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Employee</h3>

                            {/* Employee Dropdown */}
                            <label className="block mb-2 text-gray-700">Employee Name:</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={newEmployee.employeeId}
                                onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                            >
                                <option value="">Select Employee</option>
                                {allEmployees?.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.employee_name} - {emp.designation_name}
                                    </option>
                                ))}
                            </select>

                            {/* Task Time Input */}
                            <label className="block mt-4 mb-2 text-gray-700">Task Time (hours):</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={newEmployee.taskTime}
                                onChange={(e) => setNewEmployee({ ...newEmployee, taskTime: e.target.value })}
                            />

                            {/* Buttons */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                    onClick={handleAddEmployee}
                                >
                                    Save
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
