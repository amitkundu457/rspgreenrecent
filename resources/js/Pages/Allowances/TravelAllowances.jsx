import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Nav from "@/Layouts/Nav";
import Header from "@/Layouts/Header";
import { Link } from "@inertiajs/react";

export default function TravelAllowances({ user, notif, allEmployees, us }) {
    const { travelAllowances } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showExtraPayment, setShowExtraPayment] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedTA, setSelectedTA] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [extraPayment, setExtraPayment] = useState(false);
    const openRejectModal = (ta) => {
        setSelectedTA(ta);
        setIsRejectModalOpen(true);
    };
    const [expenseData, setExpenseData] = useState({
        expenseAmount: "",
        expenseReason: "",
        expenseReceipt: null,
    });
    const formData = new FormData();
    const handleSubmitod = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(); // Ensure it's declared
        // formData.append("employee_id", data.employee_id);
        formData.append("amount", data.amount);
        // formData.append("destination", data.destination);
        // formData.append("travel_date", data.travel_date);
        formData.append("reason", data.reason);
        // formData.append("payment_by", data.payment_by);
        
        // if (data.document_path) {
        //     formData.append("document_path", data.document_path);
        // }
        
        // if (extraPayment) {
        //     formData.append("extra_payment", data.extra_payment || "");
        // }
    
        try {
            await axios.post("/store-expense", formData);
            alert("Successfully submitted!");
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({ ...expenseData, [name]: value });
    };

    const handleFileUpload = (e) => {
        setExpenseData({ ...expenseData, expenseReceipt: e.target.files[0] });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Prepare FormData for file upload
       
    };

    const closeRejectModal = () => {
        setIsRejectModalOpen(false);
        setRejectionReason("");
    };

    const handleReject = () => {
        console.log("Rejected ID:", selectedTA?.id, "Reason:", rejectionReason);
        closeRejectModal();
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
        id: "",
        employee_id: "",
        employee_name: "", // Store employee name too
        employee_id: "", // Store employee name too
        amount: "", // Advance Payment
        destination: "",
        travel_date: "",
        reason: "",
        document: null,
        document_path: null,
        payment_by: "",
        payment_mode: "Cash",
        extra_payment: "", // Extra Payment
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
                    <h1 className="text-2xl font-bold">
                        Travel Allowances Advance
                    </h1>
                    <Link href="/travelreq">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                            <span className="text-lg mr-2">+</span>{" "}
                            {us !== 1
                                ? "Add Request for Payment"
                                : "Show all Payment Request"}
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
 
                     {/* Extra Payment Radio Buttons */}
                     <div className="flex items-center space-x-4">
                         <span className="font-semibold">Extra Payment:</span>
                         <label className="flex items-center space-x-2">
                             <input
                                 type="radio"
                                 name="extraPayment"
                                 value="yes"
                                 checked={extraPayment}
                                 onChange={() => setExtraPayment(true)}
                             />
                             <span>Yes</span>
                         </label>
                         <label className="flex items-center space-x-2">
                             <input
                                 type="radio"
                                 name="extraPayment"
                                 value="no"
                                 checked={!extraPayment}
                                 onChange={() => setExtraPayment(false)}
                             />
                             <span>No</span>
                         </label>
                     </div>
 
                     {/* Extra Payment Input Field */}
                     {extraPayment && (
                         <input
                             type="number"
                             placeholder="Extra Payment Amount"
                             value={data.extra_payment || ""}
                             onChange={(e) => setData("extra_payment", e.target.value)}
                             className="w-full p-2 border rounded-md"
                         />
                     )}
 
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
            {us !== 1 && travelAllowances?.length > 0 && (
                <div className="w-[97%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
                    <h2 className="text-xl font-bold mb-4">
                        All Travel Allowances
                    </h2>
                    <div className="p-4 bg-white shadow rounded-lg mt-6">
                        <h2 className="text-xl font-bold mb-4">Submit Travel Expense</h2>
                        <form onSubmit={handleSubmitod} className="space-y-4">
                            <div>
                                <label className="block font-semibold">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Reason</label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded mt-1"
                                    required
                                ></textarea>
                            </div>
                            {/* <div>
                                <label className="block font-semibold">Upload Receipt</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </div> */}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit Expense
                            </button>
                        </form>
                    </div>
                    {/* <table className="w-full border-collapse border border-gray-300">
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
                                    Destination
                                </th> 
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
                            {travelAllowances.length > 0 ? (
                                travelAllowances.map((ta) => (
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
                                            {ta.destination}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {ta.payment_by}
                                        </td> 
                                        <td className="border px-4 py-2">
                                            {ta.payment_mode}
                                        </td> 
                                        <td className="border px-4 py-2">
                                            {ta.extra_payment || "N/A"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {ta.document_path ? (
                                                <a
                                                    href={ta.document_path}
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
                                                {ta.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="text-center py-4"
                                    >
                                        No travel allowances found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table> */}
                </div>
            )}
        </div>
    );
}
