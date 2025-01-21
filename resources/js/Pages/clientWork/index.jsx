import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import axios from "axios";
import { Link, useForm } from "@inertiajs/react";

const Index = ({ clients, user, notif, user_type }) => {
  const { data, setData, post, put, reset, processing } = useForm({
    id: null,
    client_name: "",
    client_address: "",
    client_phone_no: "",
    client_work_order: "",
    work_order_date: "",
    document: null,
  });

  const [workOrders, setWorkOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get("/clients-workOrder");
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

      const response = await axios.post("/clients-workOrder", formDataObject);
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
        `/clients-workOrder/${data.id}`,
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
      await axios.delete(`/clients-workOrder/${id}`);
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
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">
                {isEditing ? "" : ""}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="client_name"
                    value={data.client_name}
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Address</label>
                  <input
                    type="text"
                    name="client_address"
                    value={data.client_address}
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone No</label>
                  <input
                    type="text"
                    name="client_phone_no"
                    value={data.client_phone_no}
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Work Title</label>
                  <input
                    type="text"
                    name="client_work_order"
                    value={data.client_work_order}
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Work Order Date</label>
                  <input
                    type="date"
                    name="work_order_date"
                    value={data.work_order_date}
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Document</label>
                  <input
                    type="file"
                    name="document"
                    onChange={handleInputChange}
                    className="border w-full p-2 rounded"
                  />
                </div>
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

        <table className="w-full border text-left bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone No</th>
              <th className="border px-4 py-2">Work Order Title</th>
              <th className="border px-4 py-2">Work Order Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((workOrder) => (
              <tr key={workOrder.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{workOrder.client_name}</td>
                <td className="border px-4 py-2">{workOrder.client_address}</td>
                <td className="border px-4 py-2">{workOrder.client_phone_no}</td>
                <td className="border px-4 py-2">{workOrder.client_work_order}</td>
                <td className="border px-4 py-2">{workOrder.work_order_date}</td>
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
