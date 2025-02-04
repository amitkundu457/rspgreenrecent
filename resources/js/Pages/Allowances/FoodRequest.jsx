import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import { Link } from "@inertiajs/react";

export default function FoodAllowances() {
    const { foodAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    console.log("aakkhh", foodAllowances);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        id: "",
        employee_name: "",
        amount: "",
        travel_date: "",
        reason: "",
        payment_by: "", // New field for Payment By
        payment_mode: "Cash", // New field for Payment Mode
        extra_payment: "", // New field for Extra Payment
        document: null,
        status: "Pending", // New status field
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("employee_name", data.employee_name);
        formData.append("amount", data.amount);
        formData.append("travel_date", data.travel_date);
        formData.append("reason", data.reason);
        formData.append("payment_by", data.payment_by); // Append Payment By field
        formData.append("payment_mode", data.payment_mode); // Append Payment Mode field
        formData.append("extra_payment", data.extra_payment); // Append Extra Payment field
        formData.append("status", data.status);
        if (data.document) {
            formData.append("document", data.document);
        }

        if (editing) {
            put(route("food-allowances.update", data.id), {
                data: formData,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post(route("food-allowances.store"), {
                data: formData,
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleStatusChange = (id, status) => {
        put(route("food-allowances.update", id), {
            data: { status },
            onSuccess: () => {
                console.log(`Status updated to ${status}`);
            },
        });
    };

    const handleEdit = (fa) => {
        setEditing(fa.id);
        setData({
            id: fa.id,
            employee_name: fa.employee_name,
            amount: fa.amount,
            travel_date: fa.travel_date,
            reason: fa.reason,
            payment_by: fa.payment_by,
            payment_mode: fa.payment_mode,
            extra_payment: fa.extra_payment,
            document: null,
            status: fa.status,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            destroy(route("food-allowances.destroy", id), {
                onSuccess: () => {
                    console.log("Deleted successfully.");
                },
            });
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header />
            <Nav />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">
                    Extra Food Allowances
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={data.employee_name}
                        onChange={(e) =>
                            setData("employee_name", e.target.value)
                        }
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
                        placeholder="Payment By"
                        value={data.payment_by}
                        onChange={(e) => setData("payment_by", e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                    <select
                        value={data.payment_mode}
                        onChange={(e) =>
                            setData("payment_mode", e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Extra Payment"
                        value={data.extra_payment}
                        onChange={(e) =>
                            setData("extra_payment", e.target.value)
                        }
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
                            processing
                                ? "bg-gray-400"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={processing}
                    >
                        {editing ? "Update" : "Create"}
                    </button>
                </form>

                <div className="overflow-y-auto max-h-[400px] mt-6">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">
                                    Employee Id
                                </th>
                                <th className="border px-4 py-2">
                                    Advance payment
                                </th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Reason</th>
                                <th className="border px-4 py-2">Payment By</th>
                                <th className="border px-4 py-2">
                                    Payment Mode
                                </th>
                                <th className="border px-4 py-2">
                                    Extra Payment
                                </th>
                                <th className="border px-4 py-2">Document</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodAllowances?.length > 0 ? (
                                foodAllowances.map((fa) => (
                                    <tr key={fa.id} className="border">
                                        <td className="border px-4 py-2">
                                            EMP0000{fa.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            Rs{fa.amount}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.travel_date}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.reason}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.payment_by}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.payment_mode}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.extra_payment}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.document_path ? (
                                                <a
                                                    href={`/storage/${fa.document_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    View Document
                                                </a>
                                            ) : (
                                                "No Document"
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {fa.status || "Pending"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(fa)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(fa.id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="text-center py-4"
                                    >
                                        No food allowances found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
