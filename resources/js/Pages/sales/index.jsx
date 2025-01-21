import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const SellerWorkOrderIndex = ({ workOrders }) => {
    const [editMode, setEditMode] = useState(false);

    const { data, setData, post, put, reset, errors } = useForm({
        id: null,
        seller_name: '',
        seller_address: '',
        date_of_wo: '',
        subject: '',
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle form submission
    const handleSave = (e) => {
        e.preventDefault();

        if (data.id) {
            put(`/seller-work-orders/${data.id}`, {
                onSuccess: () => resetForm(),
            });
        } else {
            post('/seller-work-orders', {
                onSuccess: () => resetForm(),
            });
        }
    };

    // Reset form and close inline form
    const resetForm = () => {
        reset();
        setEditMode(false);
    };

    // Handle edit button click
    const handleEdit = (order) => {
        setData(order); // Populate form with selected work order
        setEditMode(true);
    };

    // Handle delete button click
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this work order?')) {
        post(`/seller-work-orders/${id}`);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Work Orders</h1>
            <button
                onClick={() => {
                    resetForm();
                    setEditMode(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
            >
                Create New Work Order
            </button>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Seller Name</th>
                        <th className="border border-gray-300 p-2">Seller Address</th>
                        <th className="border border-gray-300 p-2">Date of WO</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border border-gray-300 p-2">{order.seller_name}</td>
                            <td className="border border-gray-300 p-2">{order.seller_address}</td>
                            <td className="border border-gray-300 p-2">{order.date_of_wo}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => handleEdit(order)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Inline Form */}
            {editMode && (
                <div className="mt-6 p-4 border border-gray-300 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {data.id ? 'Edit Work Order' : 'Create Work Order'}
                    </h2>
                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1">
                                <label className="block text-gray-700 mb-2">Seller Name</label>
                                <input
                                    type="text"
                                    name="seller_name"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={data.seller_name}
                                    onChange={handleInputChange}
                                />
                                {errors.seller_name && (
                                    <span className="text-red-500 text-sm">{errors.seller_name}</span>
                                )}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 mb-2">Seller Address</label>
                                <input
                                    type="text"
                                    name="seller_address"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={data.seller_address}
                                    onChange={handleInputChange}
                                />
                                {errors.seller_address && (
                                    <span className="text-red-500 text-sm">{errors.seller_address}</span>
                                )}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 mb-2">Date of WO</label>
                                <input
                                    type="date"
                                    name="date_of_wo"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={data.date_of_wo}
                                    onChange={handleInputChange}
                                />
                                {errors.date_of_wo && (
                                    <span className="text-red-500 text-sm">{errors.date_of_wo}</span>
                                )}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={data.subject}
                                    onChange={handleInputChange}
                                />
                                {errors.subject && (
                                    <span className="text-red-500 text-sm">{errors.subject}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SellerWorkOrderIndex;
