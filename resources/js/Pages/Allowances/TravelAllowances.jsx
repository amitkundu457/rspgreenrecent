import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";
import { Link } from "@inertiajs/react";

export default function TravelAllowances({ user, notif, allEmployees, us }) {
    const { travelAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showExtraPayment, setShowExtraPayment] = useState(false);
    console.log("jhgfdfgh", us);
    console.log("Employees:", allEmployees);

    const { data, setData, post, put, processing, reset } = useForm({
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

    return (
        <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
            <Header user={user} notif={notif} />
            <Nav />
            <div className="p-8 bg-white rounded-b-md">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Travel Allowances Advance</h1>
                    
                    {
  us !== 1 ? (
    <Link href="/travelreq">
      <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
        <span className="text-lg mr-2">+</span> Add Request for Payment
      </button>
    </Link>
  ) : (
    <Link href="/travelreq">
    <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
      <span className="text-lg mr-2">+</span> Show all Payment Request
    </button>
    </Link>
  )
}

                </div>
                {us === 1 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select
                            value={data.employee_id}
                            onChange={(e) => {
                                const selectedEmployee = allEmployees.find(
                                    (emp) => emp.id === parseInt(e.target.value)
                                );
                                setData({
                                    ...data,
                                    employee_id: selectedEmployee?.id || "",
                                });
                            }}
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

                        {!showExtraPayment && (
                            <input
                                type="number"
                                placeholder="Advance Payment"
                                value={data.amount}
                                onChange={(e) => setData("amount", e.target.value)}
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        )}

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

                        <div className="flex items-center space-x-4">
                            <label className="font-medium">Extra Payment?</label>
                            <input
                                type="radio"
                                id="extra-payment-yes"
                                name="extra_payment"
                                checked={showExtraPayment}
                                onChange={() => setShowExtraPayment(true)}
                            />
                            <label htmlFor="extra-payment-yes">Yes</label>
                            <input
                                type="radio"
                                id="extra-payment-no"
                                name="extra_payment"
                                checked={!showExtraPayment}
                                onChange={() => {
                                    setShowExtraPayment(false);
                                    setData("extra_payment", "");
                                }}
                            />
                            <label htmlFor="extra-payment-no">No</label>
                        </div>

                        {showExtraPayment && (
                            <input
                                type="number"
                                placeholder="Extra Payment"
                                value={data.extra_payment}
                                onChange={(e) => setData("extra_payment", e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        )}

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
        </div>
    );
}
