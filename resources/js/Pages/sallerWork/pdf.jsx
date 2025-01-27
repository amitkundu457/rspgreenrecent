import { Link } from "@inertiajs/react";
import React from "react";

function WorkOrderPrint({ client }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 bg-white border rounded-lg shadow-md">
            {/* Company Header */}
            <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <img
                            src="/path-to-logo.png"
                            alt="Company Logo"
                            className="h-12"
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold">
                            RSP Green Development & Laboratories Pvt. Ltd.
                        </h1>
                        <p>
                            An ISO 9001: 2015 & ISO 14001: 2015 Certified
                            Company
                        </p>
                        <p className="text-red-600 font-semibold">
                            QCI-NABET ACCREDITED ENVIRONMENTAL CONSULTANT
                        </p>
                        <p>CIN No: U74999WB2017PTC219565</p>
                    </div>
                    <div>
                        <p className="text-sm">
                            <strong>Date:</strong> {client.date_of_wo}
                        </p>
                    </div>
                </div>
            </div>

            {/* Work Order Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <p>
                        <strong>To:</strong>
                    </p>
                    <p>{client.seller_name}</p>
                    <p>{client.seller_address}</p>
                    <p>
                        <strong>Contact Person:</strong>{" "}
                        {client.contact_person_name}
                    </p>
                </div>
                <div className="text-right">
                    <p>
                        <strong>Work Order Date:</strong> {client.date_of_wo}
                    </p>
                </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Subject:</h2>
                <p>{client.subject}</p>
            </div>

            {/* Job Details Table */}
            <div className="mb-6">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">
                                Sr No
                            </th>
                            <th className="border px-4 py-2 text-left">Task</th>
                            <th className="border px-4 py-2 text-left">Qty</th>
                            <th className="border px-4 py-2 text-left">UOM</th>
                            <th className="border px-4 py-2 text-left">Rate</th>
                            <th className="border px-4 py-2 text-left">
                                Amount
                            </th>
                            <th className="border px-4 py-2 text-left">
                                HSN Code
                            </th>
                            <th className="border px-4 py-2 text-left">GST</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">{client.task}</td>
                            <td className="border px-4 py-2">
                                {client.quantity}
                            </td>
                            <td className="border px-4 py-2">
                                {client.uom || "N/A"}
                            </td>
                            <td className="border px-4 py-2">{client.rate}</td>
                            <td className="border px-4 py-2">
                                {client.amount}
                            </td>
                            <td className="border px-4 py-2">
                                {client.hsn_code || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                                {client.gst_rate !== null
                                    ? `${client.gst_rate}%`
                                    : "N/A"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold">
                    Terms & Conditions Agreed Upon:
                </h2>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>
                        Software to be developed considering existing features &
                        SOP shared.
                    </li>
                    <li>
                        Bank Payment integration for EDC & Online Gateway
                        location-wise for all sites.
                    </li>
                    <li>
                        Development timelines: 90 days including internal
                        testing.
                    </li>
                    <li>Reporting formats to be shared by DRIL.</li>
                    <li>
                        Logs for website & devices to capture any errors,
                        accessible by DRIL.
                    </li>
                </ul>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={handlePrint}
                >
                    Print
                </button>
                <Link
                    href="/clients-workOrder"
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                    Close
                </Link>
            </div>
        </div>
    );
}

export default WorkOrderPrint;
