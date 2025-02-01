import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";

export default function FoodAllowances() {
    const { foodAllowances } = usePage().props; // Fetch data from Laravel controller
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
        id: "",
        employee_name: "",
        amount: "",
        food_date: "",
        reason: "",
        document: null,
    });

    // Handle Create & Update
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route("food-allowances.update", data.id), {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post(route("food-allowances.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    // Handle Edit
    const handleEdit = (allowance) => {
        setEditing(allowance.id);
        setData({
            id: allowance.id,
            employee_name: allowance.employee_name,
            amount: allowance.amount,
            food_date: allowance.food_date,
            reason: allowance.reason,
            document: null,
        });
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this allowance?")) {
            destroy(route("food-allowances.destroy", id));
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header />
            <Nav />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">Food Allowances</h1>

                {/* Create & Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        type="number"
                        placeholder="Amount"
                        value={data.amount}
                        onChange={(e) => setData("amount", e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="date"
                        value={data.food_date}
                        onChange={(e) => setData("food_date", e.target.value)}
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

                    {editing && (
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setEditing(null);
                            }}
                            className="w-full p-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {/* Table Display with All Fields */}
                <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Employee Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Food Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Document</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodAllowances.length > 0 ? (
                            foodAllowances.map((fa) => (
                                <tr key={fa.id} className="border">
                                    <td className="border px-4 py-2">
                                        {fa.employee_name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        Rs{fa.amount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {fa.food_date}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {fa.reason || "N/A"}
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
                                    <td className="border px-4 py-2 flex justify-center space-x-4">
                                        <button
                                            onClick={() => handleEdit(fa)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(fa.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No food allowances found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
