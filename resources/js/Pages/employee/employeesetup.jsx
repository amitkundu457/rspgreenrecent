import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const TableComponent = ({
    user,
    notif,
    user_type,
    branchesa,
    searchEmpCount,
    employees,
    holiday
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [employeess,setEmployees] =useState(null);
    const [branches, setBranches] = useState([]);
    const locations = ["Location1", "Location2", "Location3"]; // Example array of locations
    console.log("kjhgf",holiday)
    
    const notyf = new Notyf();

    const { data, setData, post, reset, errors } = useForm({
        b_name: "",
        transfer_to: "",
        location_name:"",
        location_id:''
    });

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get("/branches");
            setBranches(response.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    const openModal = (branch = null) => {
        setIsModalOpen(true);
        setData("b_name", branch ? branch.b_name : "");
        setSelectedBranchId(branch ? branch.id : null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBranchId(null);
        reset("b_name");
    };

    const openTransferModal = (branchId) => {
        setIsTransferModalOpen(true);
        setData("current_branch", branchId);
        console.log("Branch ID:", branchId);
    };

    const closeTransferModal = () => {
        setIsTransferModalOpen(false);
        reset("transfer_to");
    };

    const handleCreateOrUpdateBranch = (e) => {
        e.preventDefault();
        const endpoint = data.selectedBranchId
            ? `/branches-update/${selectedBranchId}`
            : "/branches";
        post(endpoint, {
            onSuccess: () => {
                notyf.success(
                    selectedBranchId
                        ? "Branch updated successfully!"
                        : "Branch created successfully!"
                );
                fetchBranches();
                closeModal();
            },
            onError: () => {
                notyf.error("An error occurred while saving the branch.");
            },
        });
    };

    const handleTransferBranch = async (e) => {
        e.preventDefault();
    
        // Check if the employee is already in the target branch
        if (data.current_branch === data.transfer_to) {
            notyf.error("Employee is already in this branch.");
            return;
        }
    
        console.log("Transfer Data:", {
            current_branch: data.current_branch,
            transfer_to: data.transfer_to,
            employee_id: data.employee_id,
        });
    
        try {
            const response = await axios.post(`/branches-transfer/${data.current_branch}`, {
                transfer_to: data.transfer_to,
                employee_id: data.employee_id,
            });
    
            if (response.data.success) {
                notyf.success(response.data.success);
    
                // Close the modal
                closeTransferModal();
    
                // Optionally update the employees list
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((emp) => emp.id !== data.employee_id)
                );
    
                // Reload the page to reflect changes
                window.location.reload();
            }
        } catch (error) {
            if (error.response?.data?.error) {
                notyf.error(error.response.data.error);
            } else {
                notyf.error("An error occurred while transferring the employee.");
            }
            console.error(error);
        }
    };
    ;
    
    
    
    
    
    
    const handleDeleteBranch = async (id, hasEmployees) => {
        if (hasEmployees) {
            notyf.error("This branch has employees, so deletion is not allowed.");
            return;
        } else if (confirm("Are you sure you want to delete this branch?")) {
            try {
                console.log("Attempting to delete branch with ID:", id); 
                await axios.delete(`/branches/${id}`);
                notyf.success("Branch deleted successfully!");
                
                window.location.reload();
                setBranches(prevBranches => {
                    if (Array.isArray(prevBranches)) {
                        return prevBranches.filter(branch => branch.id !== id);
                    } else {
                        return []; 
                    }
                });
            } catch (error) {
                console.error("Error deleting branch:", error);
                if (error.response && error.response.status === 404) {
                    notyf.error("Branch not found. Deletion failed.");
                } else {
                    notyf.error("An error occurred while deleting the branch.");
                }
            }
        }
    };
    
    
    

    return (
        <div className="w-[85.2%] absolute right-0">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="flex px-9">
                <Sidebar />
                <div className="flex-1 p-6 bg-gray-100">
                    <div className="flex justify-between">
                        <h1 className="mb-4 text-2xl font-bold">
                            Manage Branch
                        </h1>
                        <button
                            onClick={() => openModal()}
                            className="p-2 text-teal-900 underline rounded-md"
                        >
                            Create Branch
                        </button>
                    </div>

                    <div className="mt-3">
    <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2 text-left border-b">
                    Branch Name
                </th>
                {/* <th className="px-4 py-2 text-left border-b">
                    Quantity
                </th> */}
                <th className="px-4 py-2 text-left border-b">
                 Total Employees 
                </th>
                <th className="px-4 py-2 text-right border-b">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {branchesa.map((branch) => (
                <tr
                    key={branch.id}
                    className="transition duration-200 hover:bg-gray-100"
                >
                    <td className="px-4 py-2 border-b">
                        {branch.name}
                    </td>
                    <td className="px-4 py-2 text-center border-b">
                        {branch.empCount}
                    </td>
                    <td className="px-4 py-2 text-right border-b">
                        <button
                            onClick={() => openModal(branch)}
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Edit
                        </button>
                        {branch.empCount !== 0 && (
                            <button
                                onClick={() => openTransferModal(branch.id)}
                                className="ml-4 text-green-600 underline hover:text-green-800"
                            >
                                Transfer
                            </button>
                        )}
                        <button
                            onClick={() => handleDeleteBranch(branch.id, branch.empCount > 0)}
                            className="ml-4 text-red-600 underline hover:text-red-800"
                        >
                            Delete
                        </button>
                    </td>
                   
                </tr>
            ))}
        </tbody>
    </table>
</div>

                </div>
            </div>
            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold">
                        {selectedBranchId ? "Edit Branch" : "Create New Branch"}
                    </h2>
                    <form
                        onSubmit={handleCreateOrUpdateBranch}
                        className="mt-4"
                    >
                        <label className="block mb-2">
                            Branch Name:
                            <input
                                type="text"
                                value={data.b_name}
                                onChange={(e) =>
                                    setData("b_name", e.target.value)
                                }
                                className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                        <label className="block mb-2">
    Location:
    <select
        value={data.location_id}
        onChange={(e) => setData("location_id", e.target.value)}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
    >
        <option value="">Select a location</option>
        {holiday.map((item, index) => (
            <option key={item.id || index} value={item.id}>
                {item.name}
            </option>
        ))}
    </select>
</label>

                        <button
                            type="submit"
                            className="p-2 mt-4 text-white bg-blue-600 rounded-md"
                        >
                            {selectedBranchId
                                ? "Update Branch"
                                : "Create Branch"}
                        </button>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="p-2 mt-2 text-white bg-red-600 rounded-md"
                        >
                            Close
                        </button>
                    </form>
                </div>
            </Modal>

            {/* Transfer Modal */}
            <Modal show={isTransferModalOpen} onClose={closeTransferModal}>
    <div className="p-6">
        <h2 className="text-lg font-bold">Transfer Branch</h2>
        <form onSubmit={handleTransferBranch} className="mt-4">
            <label className="block mb-2">
                Transfer To:
                <select
                    value={data.transfer_to}
                    onChange={(e) => setData("transfer_to", e.target.value)}
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                >
                    <option value="" disabled>
                        Select a branch
                    </option>
                    {branchesa
                        ?.filter((branch) => branch.id !== data.current_branch)
                        .map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                </select>
            </label>

            {/* Quantity Input Field */}
            <label className="block mb-2 mt-4">
    Select Employee:
    <select
        value={data.employee_id}
        onChange={(e) => setData("employee_id", e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md"
    >
        <option value="" disabled>
            Select an employee
        </option>
        {employees
            // ?.filter((employee) => employee.branch_id === data.current_branch)
            .map((employee) => (
                <option key={employee.id} value={employee.id}>
                    {employee.name}
                </option>
            ))}
    </select>
</label>



            <button
                type="submit"
                className="p-2 mt-2 text-white bg-green-600 rounded-md"
            >
                Transfer
            </button>
            <button
                onClick={closeTransferModal}
                type="button"
                className="p-2 mt-2 text-white bg-red-600 rounded-md"
            >
                Close
            </button>
        </form>
    </div>
</Modal>

        </div>
    );
};

export default TableComponent;