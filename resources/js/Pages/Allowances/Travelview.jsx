import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React from "react";

const TravelView = ({ travelAllowance, user, notif, user_type }) => {
    if (!travelAllowance) {
        return (
            <p className="text-center text-red-500">
                No travel allowance found.
            </p>
        );
    }

    // Fixed expenses set to ₹50
    const expenses = 50;
    const advanceAmount = travelAllowance.amount;

    // Calculate surplus: Advance - Expenses
    const surplus = advanceAmount - expenses;

    return (
        <div className="w-[85.2%] absolute right-0 overflow-hidden p-6">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />

            {/* Travel Allowance Details */}
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Travel Allowance Details
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    <p>
                        <strong>Advance:</strong> ₹{advanceAmount}
                    </p>
                    <p>
                        <strong>Destination:</strong> {travelAllowance.destination}
                    </p>
                    <p>
                        <strong>Travel Date:</strong> {travelAllowance.travel_date}
                    </p>
                    <p>
                        <strong>Payment By:</strong> {travelAllowance.payment_by}
                    </p>
                    <p>
                        <strong>Status:</strong> {travelAllowance.status ?? "Pending"}
                    </p>
                    <p>
                        <strong>Expenses:</strong> ₹{expenses}
                    </p>
                    <p>
                        <strong>Surplus:</strong>{" "}
                        <span className={surplus < 0 ? "text-red-500" : "text-green-500"}>
                            ₹{surplus}
                        </span>
                    </p>
                    <p>
                        <strong>Reason:</strong> aa
                    </p>
                </div>

                {/* Documents Display */}
                {travelAllowance.documents?.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Travel Documents:</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {travelAllowance.documents.map((document, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        src={`/storage/${document.document_path}`}
                                        alt={`Travel Document ${index + 1}`}
                                        className="mt-2 w-48 h-48 object-cover rounded-md border"
                                    />
                                    <p className="mt-2 text-center text-sm">
                                        {document.document_name || `Document ${index + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelView;


