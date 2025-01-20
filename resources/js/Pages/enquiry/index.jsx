import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";

const RequestInquiryForm = ({ user, user_type, notif, quotes }) => {
    const [inquiries, setInquiries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { data, setData, post, put, errors, reset } = useForm({
        source: "Direct",
        name: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
        document: null,
    });

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await axios.get("/enquiry");
                setInquiries(response.data);
            } catch (err) {
                setError("Error fetching inquiries.");
            }
        };
        fetchInquiries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (editingIndex !== null) {
                const response = await put(
                    `/enquiry/${inquiries[editingIndex].id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                const updatedInquiries = inquiries.map((inquiry, index) =>
                    index === editingIndex ? response.data : inquiry
                );
                setInquiries(updatedInquiries);
            } else {
                const response = await post("/enquiry", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setInquiries([...inquiries, response.data]);
            }
            reset();
            setIsFormOpen(false);
            setEditingIndex(null);
        } catch (err) {
            setError("Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setData("document", e.target.files[0]);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await axios.delete(`/enquiry/${id}`);
                setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
            } catch (error) {
                console.error("Error deleting inquiry", error);
            }
        }
    };

    return (
        <div className="w-[85.2%] ml-[11.5rem] absolute right-0">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="container mx-auto p-4">
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center shadow hover:bg-green-600"
                        onClick={() => setIsFormOpen(!isFormOpen)}
                    >
                        <FaPlus className="mr-2" />
                        {isFormOpen ? "Close Form" : "Request An Inquiry"}
                    </button>
                </div>

                {isFormOpen && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
                            {editingIndex !== null
                                ? "Edit Inquiry"
                                : "Request An Inquiry"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select
                                    name="source"
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={data.source}
                                    onChange={(e) =>
                                        setData("source", e.target.value)
                                    }
                                >
                                    <option value="">Select Source</option>
                                    <option value="Direct">Direct</option>
                                    <option value="Quotation">Quotation</option>
                                    <option value="Tender">Tender</option>
                                </select>

                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name *"
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email id *"
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="Contact No *"
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={data.contact}
                                        onChange={(e) =>
                                            setData("contact", e.target.value)
                                        }
                                    />
                                </>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Document
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Your message here.."
                                className="border border-gray-300 rounded p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="4"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading
                                    ? "Submitting..."
                                    : editingIndex !== null
                                    ? "Update Inquiry"
                                    : "Submit"}
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Inquiries List</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">
                                    Source
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Name
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Email
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Contact
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Subject
                                </th>
                                <th className="border border-gray-300 p-2">
                                    Message
                                </th>
                                {/* <th className="border border-gray-300 p-2">
                                    Document
                                </th> */}
                                <th className="border border-gray-300 p-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((inquiry, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.source}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.name || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.email || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.contact || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.subject || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {inquiry.message || "-"}
                                    </td>
                                    {/* <td className="border border-gray-300 p-2">
                                        {inquiry.document ? (
                                            <a
                                                href={inquiry.document}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Document
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td> */}
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                            onClick={() =>
                                                setEditingIndex(index)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(inquiry.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RequestInquiryForm;
