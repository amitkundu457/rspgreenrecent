import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";

export default function TravelAllowances() {
    const { travelAllowances } = usePage().props; // Fetch data from Laravel
    const [editing, setEditing] = useState(null);

    // Inertia form handler
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
        destination: "",
        travel_date: "",
        reason: "",
        document: null,
    });

    // Handle Create & Update
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route("travel-allowances.update", data.id), {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post(route("travel-allowances.store"), {
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
            destination: allowance.destination,
            travel_date: allowance.travel_date,
            reason: allowance.reason,
            document: null,
        });
    };

    // Handle Delete
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this allowance?")) {
            destroy(route("travel-allowances.destroy", id));
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header />
            <Nav />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">Travel Allowances</h1>

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
                        type="text"
                        placeholder="Destination"
                        value={data.destination}
                        onChange={(e) => setData("destination", e.target.value)}
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

                {/* Table Display */}
                <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Employee Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Destination</th>
                            <th className="border px-4 py-2">Travel Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Document</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelAllowances.length > 0 ? (
                            travelAllowances.map((ta) => (
                                <tr key={ta.id} className="border">
                                    <td className="border px-4 py-2">
                                        {ta.employee_name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        Rs{ta.amount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.destination}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.travel_date}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.reason}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.document_path ? (
                                            <a
                                                href={`/storage/${ta.document_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                View Document
                                            </a>
                                        ) : (
                                            "No Document"
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center space-x-4">
                                        <button
                                            onClick={() => handleEdit(ta)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ta.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No travel allowances found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
