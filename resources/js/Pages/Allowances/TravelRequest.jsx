import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import { Link } from "@inertiajs/react";

export default function TravelAllowances({ user, user_type, notif }) {
    const { travelAllowances, us } = usePage().props;
    const [editing, setEditing] = useState(null);
    console.log("aakkhh", travelAllowances);
    console.log("jhgfdfgh", us);

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
        destination: "",
        payment_by: "",
        payment_mode: "Cash",
        extra_payment: "",
        document: null,
        status: "Pending",
        Destination_amount: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

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

    const handleStatusChange = (id, status) => {
        put(route("travel-allowances.update", id), {
            data: { status },
            onSuccess: () => {
                console.log(`Status updated to ${status}`);
            },
        });
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">
                    Extra Travel Allowances
                </h1>
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
                            onChange={(e) =>
                                setData("employee_name", e.target.value)
                            }
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="date"
                            value={data.travel_date}
                            onChange={(e) =>
                                setData("travel_date", e.target.value)
                            }
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
                            onChange={(e) =>
                                setData("destination", e.target.value)
                            }
                            required
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            placeholder="Enter Your Amount"
                            value={data.amount}
                            onChange={(e) =>
                                setData("amount", e.target.value)
                            }
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
                                processing
                                    ? "bg-gray-400"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={processing}
                        >
                            {editing ? "Update" : "Create"}
                        </button>
                    </form>
                )}
            </div>
            <div className="overflow-y-auto max-h-[400px] mt-6">
                <table className="w-full border-collapse border border-gray-300 px-15">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">
                                Employee Id
                            </th>
                            {/* <th className="border px-4 py-2">
                                Advance payment
                            </th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">
                                Destination
                            </th> */}
                            <th className="border px-4 py-2">Payment By</th>
                            <th className="border px-4 py-2">
                                Payment Mode
                            </th>
                            <th className="border px-4 py-2">
                                Extra Payment
                            </th>
                            {/* <th className="border px-4 py-2">Document</th> */}
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelAllowances.length > 0 ? (
                            travelAllowances.map((ta) => (
                                <tr key={ta.id} className="border">
                                    <td className="border px-4 py-2">
                                        EMP0000{ta.id}
                                    </td>
                                    {/* <td className="border px-4 py-2">
                                        Rs{ta.amount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.travel_date}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.reason}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.destination}
                                    </td> */}
                                    <td className="border px-4 py-2">
                                        {ta.payment_by}
                                    </td>
                                    <td className="border px-4 py-2">
                                        Cash
                                    </td>
                                    <td className="border px-4 py-2">
                                        {ta.extra_payment}
                                    </td>
                                    {/* <td className="border px-4 py-2">
                                        {ta.document_path ? (
                                            <a
                                                href={`/storage/${ta.document_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Document
                                            </a>
                                        ) : (
                                            "No Document"
                                        )}
                                    </td> */}
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                ta.status === "Approved"
                                                    ? "bg-green-500 text-white"
                                                    : ta.status === "Rejected"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            {ta.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 flex space-x-2">
                                        <button
                                            className="px-3 py-1 bg-green-500 text-white rounded"
                                            onClick={() =>
                                                handleStatusChange(
                                                    ta.id,
                                                    "Approved"
                                                )
                                            }
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                            onClick={() =>
                                                handleStatusChange(
                                                    ta.id,
                                                    "Rejected"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                        <Link
                                            href={`/view-all-document/${ta.id}`}
                                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                                            title="View Details"
                                            onClick={() =>
                                                console.log(
                                                    `Navigating to loan details of loan ID: ${ta.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="11"
                                    className="text-center py-4"
                                >
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
