import React, { useState, useEffect } from "react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import axios from "axios";

const Index = ({ clients, user, notif, user_type }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        client_name: "",
        client_address: "",
        client_phone_no: "",
        client_work_order: "",
        work_order_date: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    // Fetch data on initial render
    useEffect(() => {
        fetchWorkOrders();
    }, []);

    const fetchWorkOrders = async () => {
        try {
            const response = await axios.get("/clients-workOrder");
            setWorkOrders(response.data);
        } catch (error) {
            console.error("Error fetching work orders:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateWorkOrder();
        } else {
            await createWorkOrder();
        }
    };

    const createWorkOrder = async () => {
        try {
            const response = await axios.post("/clients-workOrder", formData);
            setWorkOrders([...workOrders, response.data]);
            setFormData({
                id: null,
                client_name: "",
                client_address: "",
                client_phone_no: "",
                client_work_order: "",
                work_order_date: "",
            });
            setShowForm(false); // Hide form after submission
        } catch (error) {
            console.error("Error creating work order:", error);
        }
    };

    const updateWorkOrder = async () => {
        try {
            const response = await axios.put(
                `/clients-workOrder/${formData.id}`,
                formData
            );
            setWorkOrders(
                workOrders.map((wo) =>
                    wo.id === formData.id ? response.data : wo
                )
            );
            setFormData({
                id: null,
                client_name: "",
                client_address: "",
                client_phone_no: "",
                client_work_order: "",
                work_order_date: "",
            });
            setIsEditing(false);
            setShowForm(false); // Hide form after update
        } catch (error) {
            console.error("Error updating work order:", error);
        }
    };

    const deleteWorkOrder = async (id) => {
        try {
            await axios.delete(`/clients-workOrder/${id}`);
            setWorkOrders(workOrders.filter((wo) => wo.id !== id));
        } catch (error) {
            console.error("Error deleting work order:", error);
        }
    };

    const handleEdit = (workOrder) => {
        setFormData(workOrder);
        setIsEditing(true);
        setShowForm(true); // Show form when editing
    };

    return (
        <div className="w-[85.2%] absolute right-0 overflow-hidden">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-xl font-bold mb-4">Manage Work Orders</h1>

                {/* Button to toggle form visibility */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    {showForm ? "Cancel" : "Create Work Order"}
                </button>

                {/* Form Section */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        {/* Client Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Client Name
                            </label>
                            <input
                                type="text"
                                name="client_name"
                                value={formData.client_name}
                                onChange={handleInputChange}
                                className="border w-full p-2 rounded"
                                required
                            />
                        </div>

                        {/* Client Address */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Client Address
                            </label>
                            <input
                                type="text"
                                name="client_address"
                                value={formData.client_address}
                                onChange={handleInputChange}
                                className="border w-full p-2 rounded"
                                required
                            />
                        </div>

                        {/* Client Phone Number */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Client Phone No
                            </label>
                            <input
                                type="text"
                                name="client_phone_no"
                                value={formData.client_phone_no}
                                onChange={handleInputChange}
                                className="border w-full p-2 rounded"
                                maxLength="15"
                                required
                            />
                        </div>

                        {/* Client Work Order */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Client Work Order
                            </label>
                            <input
                                type="text"
                                name="client_work_order"
                                value={formData.client_work_order}
                                onChange={handleInputChange}
                                className="border w-full p-2 rounded"
                                maxLength="255"
                                required
                            />
                        </div>

                        {/* Work Order Date */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Work Order Date
                            </label>
                            <input
                                type="date"
                                name="work_order_date"
                                value={formData.work_order_date}
                                onChange={handleInputChange}
                                className="border w-full p-2 rounded"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {isEditing ? "Update" : "Create"} Work Order
                        </button>
                    </form>
                )}

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">
                                    Client Name
                                </th>
                                <th className="px-4 py-2 border">
                                    Client Address
                                </th>
                                <th className="px-4 py-2 border">
                                    Client Phone No
                                </th>
                                <th className="px-4 py-2 border">Work Order</th>
                                <th className="px-4 py-2 border">
                                    Work Order Date
                                </th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((workOrder) => (
                                <tr
                                    key={workOrder.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2 border">
                                        {workOrder.id}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {workOrder.client_name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {workOrder.client_address}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {workOrder.client_phone_no}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {workOrder.client_work_order}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {workOrder.work_order_date}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() =>
                                                handleEdit(workOrder)
                                            }
                                            className="text-blue-500 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteWorkOrder(workOrder.id)
                                            }
                                            className="text-red-500"
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
    );
};

export default Index;
