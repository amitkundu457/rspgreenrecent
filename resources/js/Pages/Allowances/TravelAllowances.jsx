import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";

export default function TravelAllowances({ user, notif, user_type }) {
    const { travelAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showExtraPayment, setShowExtraPayment] = useState(false); // State for extra payment

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
        payment_by: "",
        payment_mode: "Cash", // Default payment mode
        extra_payment: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route("travel-allowances.update", data.id), {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setShowExtraPayment(false);
                },
            });
        } else {
            post(route("travel-allowances.store"), {
                onSuccess: () => {
                    reset();
                    setShowExtraPayment(false);
                },
            });
        }
    };

    const handleEdit = (allowance) => {
        setEditing(allowance.id);
        setShowExtraPayment(!!allowance.extra_payment);
        setData({
            id: allowance.id,
            employee_name: allowance.employee_name,
            amount: allowance.amount,
            destination: allowance.destination,
            travel_date: allowance.travel_date,
            reason: allowance.reason,
            document: null,
            payment_by: allowance.payment_by,
            payment_mode: "Cash",
            extra_payment: allowance.extra_payment || "",
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this allowance?")) {
            destroy(route("travel-allowances.destroy", id));
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">
                    Travel Allowances Advance
                </h1>

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
                        type="text"
                        placeholder="Payment By"
                        value={data.payment_by}
                        onChange={(e) => setData("payment_by", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />

                    {/* Extra Payment Toggle */}
                    <div className="flex items-center space-x-4">
                        <label className="font-medium">Extra Payment?</label>
                        <input
                            type="radio"
                            id="extra-payment-yes"
                            name="extra_payment"
                            checked={showExtraPayment}
                            onChange={() => {
                                setShowExtraPayment(true);
                                setData("payment_mode", "Cash"); // Always cash
                            }}
                        />
                        <label htmlFor="extra-payment-yes">Yes</label>

                        <input
                            type="radio"
                            id="extra-payment-no"
                            name="extra_payment"
                            checked={!showExtraPayment}
                            onChange={() => {
                                setShowExtraPayment(false);
                                setData("extra_payment", ""); // Reset extra payment
                            }}
                        />
                        <label htmlFor="extra-payment-no">No</label>
                    </div>

                    {/* Extra Payment Input (Conditional) */}
                    {showExtraPayment && (
                        <input
                            type="number"
                            placeholder="Extra Payment"
                            value={data.extra_payment}
                            onChange={(e) =>
                                setData("extra_payment", e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                        />
                    )}

                    {/* File Upload */}
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
                                setShowExtraPayment(false);
                            }}
                            className="w-full p-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Employee Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Destination</th>
                            <th className="border px-4 py-2">Travel Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Payment By</th>
                            <th className="border px-4 py-2">Payment Mode</th>
                            <th className="border px-4 py-2">Extra Payment</th>
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
                                        {ta.payment_by}
                                    </td>
                                    <td className="border px-4 py-2">Cash</td>
                                    <td className="border px-4 py-2">
                                        {ta.extra_payment || "N/A"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.document_path
                                            ? "View"
                                            : "No Document"}
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center space-x-4">
                                        <button onClick={() => handleEdit(ta)}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ta.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
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
