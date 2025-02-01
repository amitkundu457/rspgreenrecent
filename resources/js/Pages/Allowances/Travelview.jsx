import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React from "react";

const TravelView = ({ travelAllowance, user, notif, user_type }) => {
  if (!travelAllowance) {
    return <p className="text-center text-red-500">No travel allowance found.</p>;
  }

  return (
    <div className="w-[85.2%] absolute right-0 overflow-hidden p-6">
      <Header user={user} notif={notif} />
      <Nav user_type={user_type} />

      {/* Travel Allowance Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Travel Allowance Details</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Employee Name:</strong> {travelAllowance.employee_name}</p>
          <p><strong>Advance:</strong> ₹{travelAllowance.amount}</p>
          <p><strong>Destination:</strong> {travelAllowance.destination}</p>
          <p><strong>Travel Date:</strong> {travelAllowance.travel_date}</p>
          <p><strong>Reason:</strong> {travelAllowance.reason}</p>
          <p><strong>Payment By:</strong> {travelAllowance.payment_by}</p>
          <p><strong>Extra Payment:</strong> ₹{travelAllowance.extra_payment}</p>
          <p><strong>Status:</strong> {travelAllowance.status ?? "Pending"}</p>
        </div>

        {/* Document Display */}
        {travelAllowance.document_path && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Travel Document:</h3>
            <img
              src={`/storage/${travelAllowance.document_path}`} 
              alt="Travel Document"
              className="mt-2 w-48 h-48 object-cover rounded-md border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelView;
