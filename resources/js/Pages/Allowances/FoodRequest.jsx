import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function TravelAllowances({ user, user_type, notif }) {
    const { travelAllowances, us } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedTA, setSelectedTA] = useState(null);

    const handleRejectClick = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleRejectConfirm = () => {
        if (!rejectionReason.trim()) {
            alert("Please enter a reason for rejection.");
            return;
        }

        // Call API or handle status update with rejection reason
        console.log("Rejected ID:", selectedId, "Reason:", rejectionReason);

        // Close the modal after submission
        setIsModalOpen(false);
        setRejectionReason("");
    };

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

        formData.append("employee_id", data.employee_id); // Add employee_id
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
            const response = await axios.put(
                `/travel-allowances/${id}/status`,
                { status }
            );
            console.log("Status updated successfully:", response.data);
        } catch (error) {
            console.error(
                "Error updating status:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="p-8 bg-white rounded-b-md">
                <h1 className="text-2xl font-bold mb-6">
                    Extra Food Allowances
                </h1>

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
                            onChange={(e) => setData("amount", e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />

                        <input
                            type="file"
                            onChange={(e) =>
                                setData("document", e.target.files[0])
                            }
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

            {/* Display Travel Allowances */}
            {us === 1 && ( // Only show the form if `us` is not 1
                <div className="p-8 bg-white rounded-md mt-6">
                    <h2 className="text-xl font-bold mb-4">
                        Food Allowance List
                    </h2>
                    {travelAllowances && travelAllowances.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">
                                        Employee Id
                                    </th>
                                    <th className="border px-4 py-2">
                                        Employee Name
                                    </th>
                                    <th className="border px-4 py-2">
                                        Advance Payment
                                    </th>
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Reason</th>
                                    <th className="border px-4 py-2">
                                        Payment Mode
                                    </th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {travelAllowances.map((ta) => (
                                    <tr key={ta.id} className="border">
                                        <td className="border px-4 py-2">
                                            EMP0000{ta.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {ta.employee_name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            Rs {ta.amount}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {ta.travel_date}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {ta.reason}
                                        </td>
                                        <td className="border px-4 py-2">
                                            Cash
                                        </td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded ${
                                                    ta.status === "Approved"
                                                        ? "bg-green-500 text-white"
                                                        : ta.status ===
                                                          "Rejected"
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
                                                onClick={() => {
                                                    setSelectedTA(ta); // Set the selected travel allowance
                                                    setRejectModalOpen(true); // Open the reject modal
                                                }}
                                            >
                                                Reject
                                            </button>
                                            <Link
                                                href={`/view-all-document/${ta.id}`}
                                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                                                title="View Details"
                                                onClick={() =>
                                                    console.log(
                                                        `Navigating to details of ID: ${ta.id}`
                                                    )
                                                }
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Food allowances found.</p>
                    )}

                    {/* Modal for Reject Reason */}
                    {isRejectModalOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-4">
                                    Reject Travel Allowance for{" "}
                                    {selectedTA?.employee_name}
                                </h3>
                                <p>
                                    Are you sure you want to reject the travel
                                    allowance for {selectedTA?.employee_name}?
                                </p>

                                <div className="mt-4">
                                    <label
                                        htmlFor="rejectionReason"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Rejection Reason
                                    </label>
                                    <textarea
                                        id="rejectionReason"
                                        placeholder="Enter reason for rejection"
                                        value={rejectionReason}
                                        onChange={(e) =>
                                            setRejectionReason(e.target.value)
                                        } // Update the reason
                                        className="w-full p-2 border rounded-md"
                                        rows="3"
                                    />
                                </div>

                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded"
                                        onClick={() =>
                                            setRejectModalOpen(false)
                                        } // Close the modal
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => {
                                            // Only proceed if there's a rejection reason
                                            if (rejectionReason.trim() === "") {
                                                alert(
                                                    "Please provide a rejection reason."
                                                );
                                                return;
                                            }
                                            handleStatusChange(
                                                selectedTA.id,
                                                "Rejected",
                                                rejectionReason
                                            ); // Pass rejection reason
                                            setRejectModalOpen(false); // Close the modal
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
