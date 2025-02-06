import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";
import { Link } from "@inertiajs/react";

export default function TravelAllowances({ user, notif, allEmployees, us }) {
    const { travelAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showExtraPayment, setShowExtraPayment] = useState(false);
    
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        id: "",
        employee_id: "",
        amount: "",
        destination: "",
        travel_date: "",
        reason: "",
        document_path: null,
        payment_by: "",
        payment_mode: "Cash",
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
        setData({ ...allowance });
        setShowExtraPayment(!!allowance.extra_payment);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this record?")) {
            destroy(route("travel-allowances.destroy", id), {
                onSuccess: () => reset(),
            });
        }
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
                            <span className="text-lg mr-2">+</span> {us !== 1 ? "Add Request for Payment" : "Show all Payment Request"}
                        </button>
                    </Link>
                </div>
                {us === 1 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select
                            value={data.employee_id}
                            onChange={(e) => setData("employee_id", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select Employee</option>
                            {allEmployees?.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_name}
                                </option>
                            ))}
                        </select>

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

                        <input
                            type="file"
                            onChange={(e) => setData("document_path", e.target.files[0])}
                            className="w-full p-2 border rounded-md"
                        />

                        <button
                            type="submit"
                            className={`w-full p-2 text-white rounded-md ${processing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                            disabled={processing}
                        >
                            {editing ? "Update" : "Create"}
                        </button>
                    </form>
                )}
            </div>
            {us !== 1 && travelAllowances?.length > 0 && (
                <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Destination</th>
                            <th className="border p-2">Payment By</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelAllowances.map((item) => (
                            <tr key={item.id} className="border">
                                <td className="border p-2">{item.amount}</td>
                                <td className="border p-2">{item.destination}</td>
                                <td className="border p-2">{item.payment_by}</td>
                                <td className={`border p-2 ${item.status === "Rejected" ? "text-red-500" : "text-green-500"}`}>
                                    {item.status}
                                </td>
                                <td className="border p-2 flex space-x-2">
                                    <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
