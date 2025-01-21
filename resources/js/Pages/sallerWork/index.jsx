import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import axios from "axios";
import { Link, useForm } from "@inertiajs/react";

const Index = ({ workOrders,user, notif,user_type}) => {
  const { data, setData, post, put, reset, processing } = useForm({
    id: null,
    seller_name: '',
    seller_address: '',
    date_of_wo: '',
    subject: '',
    contact_person_name: '',
    job_details: '',
    task: '',
    quantity: '',
    uom: '',
    rate: '',
    amount: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get("/seller-work-orders");
      setWorkOrders(response.data);
    } catch (error) {
      console.error("Error fetching work orders:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateWorkOrder();
    } else {
      await createWorkOrder();
    }
  };

  const createWorkOrder = async () => {
    try {
      const formDataObject = new FormData();
      Object.keys(data).forEach((key) => {
        formDataObject.append(key, data[key]);
      });

      const response = await axios.post("/seller-work-orders", formDataObject);
      setWorkOrders([...workOrders, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error creating work order:", error);
    }
  };

  const updateWorkOrder = async () => {
    try {
      const formDataObject = new FormData();
      Object.keys(data).forEach((key) => {
        formDataObject.append(key, data[key]);
      });

      const response = await axios.put(
        `/seller-work-orders/${data.id}`,
        formDataObject
      );

      setWorkOrders(
        workOrders.map((wo) =>
          wo.id === data.id ? response.data : wo
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating work order:", error);
    }
  };

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setShowModal(false);
  };

  const handleEdit = (workOrder) => {
    setData(workOrder);
    setIsEditing(true);
    setShowModal(true);
  };

  const deleteWorkOrder = async (id) => {
    try {
      await axios.delete(`/seller-work-orders/${id}`);
      setWorkOrders(workOrders.filter((wo) => wo.id !== id));
    } catch (error) {
      console.error("Error deleting work order:", error);
    }
  };

  return (
    <div className="w-[85%] absolute right-0 overflow-hidden bg-gray-100 min-h-screen">
      <Header user={user} notif={notif} />
      <Nav user_type={user_type} />
      <div className="p-8 bg-white rounded-b-md">
        <h1 className="text-xl font-bold mb-4">Manage Work Orders</h1>
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Work Order
        </button>

        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit}>
        {/* Add all input fields */}
        {[
          "seller_name",
          "seller_address",
          "date_of_wo",
          "subject",
          "contact_person_name",
          "job_details",
          "task",
          "quantity",
          
          "rate",
          "amount",
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block mb-2 capitalize">
              {field.replace(/_/g, " ")}
            </label>
            <input
              type={field === "date_of_wo" ? "date" : "text"}
              name={field}
              value={data[field]}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
              required
            />
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={processing}
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        {/* Table with new fields */}
        <table className="w-full border text-left bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Seller Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Date of WO</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Contact Person</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((workOrder) => (
              <tr key={workOrder.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{workOrder.seller_name}</td>
                <td className="border px-4 py-2">{workOrder.seller_address}</td>
                <td className="border px-4 py-2">{workOrder.date_of_wo}</td>
                <td className="border px-4 py-2">{workOrder.subject}</td>
                <td className="border px-4 py-2">{workOrder.contact_person_name}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(workOrder)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteWorkOrder(workOrder.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                  <Link
                    href={`/clients-workOrder/${workOrder.id}/show`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaFilePdf />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
