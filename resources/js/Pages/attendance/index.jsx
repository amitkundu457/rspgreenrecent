import Modal from "@/Components/Modal";
import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import { useForm } from "@inertiajs/inertia-react";
import React, { Fragment, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import Notyf styles
import axios from "axios";

const notyf = new Notyf();

const Attendance = ({
    user,
    notif,
    user_type,
    documents,
    employees,
    attendances,
}) => {
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState();
    const { post, put, data, setData, processing, errors } = useForm({
        employee_id: "",
        date: "",
        in_time: "",
        out_time: "",
        total_time:""
    });

    async function editAttd(id) {
        setEditId(id);
        await axios.get(`/attendances/${id}`).then((res) => {
            setData({
                employee_id: res.data.employee_id,
                date: res.data.date,
                in_time: res.data.in_time,
                out_time: res.data.out_time,
            });
        });
    }

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const time = new Date();
        time.setHours(hours, minutes); // Set the time

        return time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Ensures 12-hour format with AM/PM
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("attendances.store"), {
            onSuccess() {
                notyf.success("Attendance Added");
            },
        });
    }

    function handleUpdate(e) {
        e.preventDefault();
        put(`/attendances/${editId}`, {
            onSuccess() {
                notyf.success("Attendance updated");
            },
        });
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`/attendances/${id}`);
            notyf.success("Attendance deleted successfully.");
        } catch (error) {
            console.error(error);
        }
    }

    // Calculate the office time (difference between in_time and out_time)
    function calculateOfficeTime(inTime, outTime) {
        const [inHours, inMinutes] = inTime.split(":").map(Number);
        const [outHours, outMinutes] = outTime.split(":").map(Number);

        const inDate = new Date();
        inDate.setHours(inHours, inMinutes);

        const outDate = new Date();
        outDate.setHours(outHours, outMinutes);

        const difference = (outDate - inDate) / 1000 / 60; // Difference in minutes

        const hours = Math.floor(difference / 60);
        const minutes = difference % 60;

        return `${hours}h ${minutes}m`;
    }

    return (
        <div className="w-[85.2%] ml-[11.5rem]">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <Modal show={modal} maxWidth="lg">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg">Create Attendance</h1>
                        <button onClick={() => setModal(false)}>
                            <FaXmark />
                        </button>
                    </div>
                    <hr />
                    <div className="py-4">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex flex-col text-sm gap-y-2">
                                <label htmlFor="">Employee</label>
                                <select
                                    name="employee_id"
                                    onChange={(e) =>
                                        setData("employee_id", e.target.value)
                                    }
                                    value={data.employee_id}
                                    className="form-select rounded text-sm"
                                >
                                    <option value="">-- Select Employee --</option>
                                    {employees.map((emp, index) => (
                                        <option key={index} value={emp.id}>
                                            {emp.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col text-sm gap-y-2">
                                <label htmlFor="">Attendance Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    value={data.date}
                                    className="form-input rounded text-sm"
                                />
                            </div>
                            <div className="flex flex-col text-sm gap-y-2">
                                <label htmlFor="">In Time</label>
                                <input
                                    type="time"
                                    name="in_time"
                                    onChange={(e) =>
                                        setData("in_time", e.target.value)
                                    }
                                    value={data.in_time}
                                    className="form-input rounded text-sm"
                                />
                            </div>
                            <div className="flex flex-col text-sm gap-y-2">
                                <label htmlFor="">Out Time</label>
                                <input
                                    type="time"
                                    name="out_time"
                                    onChange={(e) =>
                                        setData("out_time", e.target.value)
                                    }
                                    value={data.out_time}
                                    className="form-input rounded text-sm"
                                />
                            </div>
                            <div className="flex justify-center text-sm gap-y-2">
                                <button
                                    type="submit"
                                    className="py-2 px-5 rounded bg-blue-500 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="w-full px-9">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl px-9">Manage Attendance</h1>
                    {/* Office hours display */}
                    <div className="text-sm px-4 py-2 rounded bg-gray-200">
                        <strong>Office Hours: 10:00 AM - 6:00 PM</strong>
                    </div>
                    <button
                        onClick={() => setModal(true)}
                        className="text-sm px-4 py-2 rounded text-white bg-blue-500"
                    >
                        Create Attendance
                    </button>
                </div>
                <div className="py-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-2 bg-slate-600 text-white text-left pl-4 rounded-l">
                                    #
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2">
                                    Employee Name
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2">
                                    Attendance Date
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2">
                                    Clock In
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2">
                                    Clock Out
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2">
                                    Working Hours
                                </th>
                                <th className="py-2 bg-slate-600 text-white text-left pl-2 rounded-r">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances &&
                                attendances.map((a, i) => (
                                    <Fragment key={i}>
                                        <tr>
                                            <td className="py-2 pl-4 text-sm">
                                                {i + 1}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                {a.name}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                {new Date(
                                                    a.date
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                {formatTime(a.in_time)}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                {formatTime(a.out_time)}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                {calculateOfficeTime(
                                                    a.in_time,
                                                    a.out_time
                                                )}
                                            </td>
                                            <td className="py-2 pl-2 text-sm">
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEdit(true);
                                                            editAttd(a.id);
                                                        }}
                                                        className="px-2 py-2 bg-blue-500 rounded text-white"
                                                    >
                                                        <FaPencil />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(a.id)
                                                        }
                                                        className="px-2 py-2 bg-red-500 rounded text-white"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                        </tbody>
                    </table>
                    <Modal show={edit} maxWidth="lg">
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg">Edit Attendance</h1>
                                <button onClick={() => setEdit(false)}>
                                    <FaXmark />
                                </button>
                            </div>
                            <hr />
                            <div className="py-4">
                                <form onSubmit={handleUpdate} className="space-y-3">
                                    <div className="flex flex-col text-sm gap-y-2">
                                        <label htmlFor="">Employee</label>
                                        <select
                                            name="employee_id"
                                            onChange={(e) =>
                                                setData("employee_id", e.target.value)
                                            }
                                            value={data.employee_id}
                                            className="form-select rounded text-sm"
                                        >
                                            <option value="">-- Select Employee --</option>
                                            {employees.map((emp, index) => (
                                                <option key={index} value={emp.id}>
                                                    {emp.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col text-sm gap-y-2">
                                        <label htmlFor="">Attendance Date</label>
                                        <input
                                            type="date"
                                            onChange={(e) =>
                                                setData("date", e.target.value)
                                            }
                                            value={data.date}
                                            className="form-input rounded text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col text-sm gap-y-2">
                                        <label htmlFor="">In Time</label>
                                        <input
                                            type="time"
                                            onChange={(e) =>
                                                setData("in_time", e.target.value)
                                            }
                                            value={data.in_time}
                                            className="form-input rounded text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col text-sm gap-y-2">
                                        <label htmlFor="">Out Time</label>
                                        <input
                                            type="time"
                                            onChange={(e) =>
                                                setData("out_time", e.target.value)
                                            }
                                            value={data.out_time}
                                            className="form-input rounded text-sm"
                                        />
                                    </div>
                                    <div className="flex justify-center text-sm gap-y-2">
                                        <button
                                            type="submit"
                                            className="py-2 px-5 rounded bg-blue-500 text-white"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Attendance;