import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function TravelAllowances({ user, user_type, notif }) {
    const { travelAllowances, us } = usePage().props;
    const [editing, setEditing] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        employee_id: user?.id || "", // Send the logged-in user id as employee_id
        employee_name: "",
        amount: "",
        travel_date: "",
        reason: "",
        destination: "",
        payment_by: "",
        payment_mode: "Cash",
        extra_payment: "",
        document: null,
        status: "Pending",
        Destination_amount: "",
    });

    useEffect(() => {
        if (editing) {
            // Pre-fill data if editing an existing record
            const allowance = travelAllowances.find(
                (item) => item.id === editing
            );
            if (allowance) {
                setData({
                    ...data,
                    id: allowance.id,
                    employee_name: allowance.employee_name,
                    amount: allowance.amount,
                    travel_date: allowance.travel_date,
                    reason: allowance.reason,
                    destination: allowance.destination,
                    payment_by: allowance.payment_by,
                    extra_payment: allowance.extra_payment,
                    status: allowance.status,
                    document: null, // keep this null to re-upload a new document
                });
            }
        }
    }, [editing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("employee_id", data.employee_id);  // Add employee_id
        formData.append("employee_name", data.employee_name);
        formData.append("amount", data.amount);
        formData.append("travel_date", data.travel_date);
        formData.append("reason", data.reason);
        formData.append("destination", data.destination);
        formData.append("payment_by", data.payment_by);
        formData.append("payment_mode", data.payment_mode);
        formData.append("extra_payment", data.extra_payment);
        formData.append("status", data.status);
        if (data.document) {
            formData.append("document", data.document);
        }

        if (editing) {
            put(route("travel-allowances.update", data.id), {
                data: formData,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post(route("travel-allowances.store"), {
                data: formData,
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`/travel-allowances/${id}/status`, { status });
            console.log("Status updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">Extra Travel Allowances</h1>
                
                {/* Form to Create or Edit Travel Allowance */}
                {us !== 1 && ( // Only show the form if `us` is not 1
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        encType="multipart/form-data"
                    >
                        <input
                            type="text"
                            placeholder="Employee Name"
                            value={data.employee_name}
                            onChange={(e) => setData("employee_name", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="date"
                            value={data.travel_date}
                            onChange={(e) => setData("travel_date", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <textarea
                            placeholder="Reason"
                            value={data.reason}
                            onChange={(e) => setData("reason", e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="text"
                            placeholder="Destination"
                            value={data.destination}
                            onChange={(e) => setData("destination", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="number"
                            placeholder="Enter Your Amount"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="file"
                            onChange={(e) => setData("document", e.target.files[0])}
                            className="w-full p-2 border rounded-md"
                        />

                        <button
                            type="submit"
                            className={`w-full p-2 text-white rounded-md ${
                                processing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={processing}
                        >
                            {editing ? "Update" : "Create"}
                        </button>
                    </form>
                )}
            </div>

            {/* Display Travel Allowances */}
            <div className="p-8 bg-white rounded-md mt-6">
                <h2 className="text-xl font-bold mb-4">Travel Allowance List</h2>
                {travelAllowances && travelAllowances.length > 0 ? (
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Employee Name</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {travelAllowances.map((allowance) => (
                                <tr key={allowance.id}>
                                    <td className="px-4 py-2 border">{allowance.employee_name}</td>
                                    <td className="px-4 py-2 border">{allowance.amount}</td>
                                    <td className="px-4 py-2 border">{allowance.status}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => setEditing(allowance.id)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(allowance.id, allowance.status === "Pending" ? "Approved" : "Pending")}
                                            className="ml-2 text-green-500 hover:underline"
                                        >
                                            {allowance.status === "Pending" ? "Approve" : "Revert"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No travel allowances found.</p>
                )}
            </div>
        </div>
    );
}
