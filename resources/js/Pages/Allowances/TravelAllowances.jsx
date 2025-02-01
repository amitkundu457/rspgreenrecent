import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";
import { Link } from "@inertiajs/react";

export default function TravelAllowances({ user, notif }) {
    const { travelAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showExtraPayment, setShowExtraPayment] = useState(false);

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
        amount: "", // Advance Payment
        destination: "",
        travel_date: "",
        reason: "",
        document: null,
        payment_by: "",
        payment_mode: "Cash",
        extra_payment: "", // Extra Payment
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Find an existing allowance by employee name
        const existingAllowance = travelAllowances.find(
            (allowance) => allowance.employee_name === data.employee_name
        );
    
        // Calculate totalAmount (advance + extra payment)
        let totalAmount = parseFloat(data.amount);
        if (existingAllowance) {
            // Sum the extra payment with the existing allowance amount
            totalAmount += parseFloat(data.extra_payment || 0);
            setData(prevData => ({
                ...prevData,
                amount: totalAmount, // Update the amount with the sum
            }));
        } else {
            // Calculate the amount as original + extra payment
            totalAmount = parseFloat(data.amount) + parseFloat(data.extra_payment || 0);
            setData(prevData => ({
                ...prevData,
                amount: totalAmount, // Set the total amount
            }));
        }
    
        // Handle form submission (either edit or create)
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
            amount: allowance.amount, // Only advance payment
            destination: allowance.destination,
            travel_date: allowance.travel_date,
            reason: allowance.reason,
            document: null,
            payment_by: allowance.payment_by,
            payment_mode: "Cash",
            extra_payment: allowance.extra_payment || "", // Extra payment
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this allowance?")) {
            destroy(route("travel-allowances.destroy", id));
        }
    };

    const updateStatus = (id, status) => {
        post(route("travel-allowances.updateStatus", { id, status }), {
            onSuccess: () => {},
        });
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav />
            <div className="p-8 bg-white rounded-b-md">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Travel Allowances Advance</h1>
                    <Link href="/travelreq">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                            <span className="text-lg mr-2">+</span> Add Request for Payment
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={data.employee_name}
                        onChange={(e) => setData("employee_name", e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Advance Payment"
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
                        <>
                            <input
                                type="number"
                                placeholder="Extra Payment"
                                value={data.extra_payment}
                                onChange={(e) => setData("extra_payment", e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                            <div className="mt-2">
                                <strong>Total Amount: </strong> Rs {parseFloat(data.amount) + parseFloat(data.extra_payment || 0)}
                            </div>
                        </>
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

                {/* Travel Allowances Table */}
                <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Employee Name</th>
                            <th className="border px-4 py-2">Advance Payment</th>
                            <th className="border px-4 py-2">Destination</th>
                            <th className="border px-4 py-2">Travel Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Payment By</th>
                            <th className="border px-4 py-2">Payment Mode</th>
                            <th className="border px-4 py-2">Extra Payment</th>
                            <th className="border px-4 py-2">Document</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelAllowances.length > 0 ? (
                            travelAllowances.map((ta) => (
                                <tr key={ta.id} className="border">
                                    <td className="border px-4 py-2">{ta.employee_name}</td>
                                    <td className="border px-4 py-2">Rs {ta.amount}</td>
                                    <td className="border px-4 py-2">{ta.destination}</td>
                                    <td className="border px-4 py-2">{ta.travel_date}</td>
                                    <td className="border px-4 py-2">{ta.reason}</td>
                                    <td className="border px-4 py-2">{ta.payment_by}</td>
                                    <td className="border px-4 py-2">{ta.payment_mode}</td>
                                    <td className="border px-4 py-2">{ta.extra_payment || "N/A"}</td>
                                    <td className="border px-4 py-2">{ta.document_path ? "View" : "No Document"}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {ta.status === "approved" && (
                                            <span className="text-green-600">Approved</span>
                                        )}
                                        {ta.status === "rejected" && (
                                            <span className="text-red-600">Rejected</span>
                                        )}
                                        {ta.status === "pending" && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                                    onClick={() => updateStatus(ta.id, "approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                    onClick={() => updateStatus(ta.id, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 flex justify-center space-x-4">
                                        <button onClick={() => handleEdit(ta)}>Edit</button>
                                        <button onClick={() => handleDelete(ta.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center py-4">
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
