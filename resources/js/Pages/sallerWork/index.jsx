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
        contact_person_name: '',
        job_details: '',
        task: '',
        quantity: '',
        uom: '',
        rate: '',
        amount: '',
        hsn_code: '',
        gst_rate: '',
        total_with_gst: '',
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle form submit (create or update)
    const handleSave = (e) => {
        e.preventDefault();

        if (data.id) {
            // Edit mode: Update the work order
            put(`/seller-work-orders/${data.id}`, {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            // Create mode: Create a new work order
            post('/seller-work-orders', {
                onSuccess: () => {
                    resetForm();
                },
            });
        }
    };

    // Reset form and toggle off modal
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
            Inertia.delete(`/seller-work-orders/${id}`);
        }
    };

    return (
        <div>
            <h1>Seller Work Orders</h1>
            <button onClick={() => setEditMode(true)}>Create New Work Order</button>

            {/* Modal for creating or editing work order */}
            {editMode && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        background: '#fff',
                        border: '1px solid #ccc',
                        zIndex: 1000,
                    }}
                >
                    <h2>{data.id ? 'Edit Work Order' : 'Create Work Order'}</h2>
                    <form onSubmit={handleSave}>
                        <input
                            type="text"
                            name="seller_name"
                            placeholder="Seller Name"
                            value={data.seller_name}
                            onChange={handleInputChange}
                        />
                        {errors.seller_name && <div style={{ color: 'red' }}>{errors.seller_name}</div>}

                        <input
                            type="text"
                            name="seller_address"
                            placeholder="Seller Address"
                            value={data.seller_address}
                            onChange={handleInputChange}
                        />
                        {errors.seller_address && <div style={{ color: 'red' }}>{errors.seller_address}</div>}

                        <input
                            type="date"
                            name="date_of_wo"
                            value={data.date_of_wo}
                            onChange={handleInputChange}
                        />
                        {errors.date_of_wo && <div style={{ color: 'red' }}>{errors.date_of_wo}</div>}

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={data.subject}
                            onChange={handleInputChange}
                        />
                        {errors.subject && <div style={{ color: 'red' }}>{errors.subject}</div>}

                        {/* Additional fields here */}
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => resetForm()}>Cancel</button>
                    </form>
                </div>
            )}

            {/* Table displaying work orders */}
            <table>
                <thead>
                    <tr>
                        <th>Seller Name</th>
                        <th>Seller Address</th>
                        <th>Date of WO</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.seller_name}</td>
                            <td>{order.seller_address}</td>
                            <td>{order.date_of_wo}</td>
                            <td>
                                <button onClick={() => handleEdit(order)}>Edit</button>
                                <button onClick={() => handleDelete(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerWorkOrderIndex;
