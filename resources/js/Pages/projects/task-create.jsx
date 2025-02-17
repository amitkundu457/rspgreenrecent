import Header from "@/Layouts/Header";
import Nav from "@/Layouts/Nav";
import React, { useState, useRef, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import Notyf styles
import { FaRupeeSign, FaTrash, FaWallet } from "react-icons/fa";
import { Fragment } from "react";
import { Button } from "@headlessui/react";
import { AiOutlinePlus } from "react-icons/ai";

const notyf = new Notyf();

const TaskCreate = ({
    employees,
    projects,
    taskcategory,
    user,
    user_type,
    notif,
    stages,
    tls,
    allEmployees,
    designation,
}) => {
    const { data, setData, post, errors } = useForm({
        task_name: "",
        estimate_hours: "",
        sdate: "",
        edate: "",
        leader_id: [],
        employee_id: [], // Initialize as an array
        employee_hours: {}, // New object to store hours for each employee
        status: "",
        priority: 0,
        rate: "",
        project_id: projects.length > 0 ? projects[0].id : "",
    });
    // console.log("ygtfdghjk", tls);
    console.log("employee details", allEmployees);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]); // Stores multiple employees
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const totalHoursLimit = 12;
    const timeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const addEmployee = () => {
        const time = parseInt(selectedTime, 10);
        const newTotalHours =
            selectedEmployees.reduce((sum, emp) => sum + emp.time, 0) + time;

        if (newTotalHours > totalHoursLimit) {
            alert(
                `Total hours exceeded! Assigned: ${newTotalHours} hours, Limit: ${totalHoursLimit} hours`
            );
            return;
        }

        const newEmployee = {
            id: selectedEmployee,
            name: allEmployees.find(
                (emp) => emp.id === parseInt(selectedEmployee)
            )?.employee_name,
            time,
        };

        setSelectedEmployees([...selectedEmployees, newEmployee]);
        setIsOpen(false);
        setSelectedEmployee("");
        setSelectedTime("");
    };

    const [rows, setRows] = useState([
        { name: "", description: "", ammount: 0 },
    ]); // Initial row
    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedEmployee, setSelectedEmployee] = useState("");
    // const [selectedTime, setSelectedTime] = useState("");

    const handleAddRow = () => {
        setRows([...rows, { name: "", description: "", ammount: 0 }]); // Add a new row
    };

    const handleDeleteRow = (index) => {
        setRows(rows.filter((_, rowIndex) => rowIndex !== index)); // Remove row by index
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        // If name is changed, autofill the ammount based on selected stage
        if (field === "name") {
            const selectedStage = stages.find((stage) => stage.name === value);
            // Ensure we reference 'ammount' instead of 'amount'
            newRows[index].ammount = selectedStage ? selectedStage.ammount : 0;
        }
        setRows(newRows);
    };
    const [formData, setFormData] = useState({
        employee_id: [], // Must be an array
        time_allocation: "",
    });

    const handleMultipleSelectChanges = (e) => {
        const selectedValues = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setFormData((prev) => ({ ...prev, employee_id: selectedValues }));
    };
    const employeeName = allEmployees.find(
        (emp) => emp.id === selectedEmployee
    )?.employee_name;

    const { props } = usePage();

    const projectSelectRef = useRef(null); // Ref for project select
    const employeeSelectRef = useRef(null); // Ref for employee select
    if (props.auth.user.roles[0]?.name === "admin") {
        useEffect(() => {
            // const employeeChoicesInstance = new Choices(
            //     employeeSelectRef.current,
            //     {
            //         removeItemButton: true,
            //         searchEnabled: true,
            //     }
            // );

            // Cleanup on unmount
            return () => {
                // projectChoicesInstance.destroy();
                // employeeChoicesInstance.destroy();
            };
        }, []);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMultipleSelectChange = (e) => {
        const selectedEmployees = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setData("employee_id", selectedEmployees);

        // Initialize employee hours when employees are selected
        setData((prevData) => {
            const newEmployeeHours = { ...prevData.employee_hours };
            selectedEmployees.forEach((employeeId) => {
                if (!newEmployeeHours[employeeId]) {
                    newEmployeeHours[employeeId] = ""; // Add default value
                }
            });
            return { ...prevData, employee_hours: newEmployeeHours };
        });
    };

    const handleTeamLeader = (e) => {
        const selectedEmployees = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setData("leader_id", selectedEmployees);

        // Initialize employee hours when employees are selected
        // setData((prevData) => {
        //     const newEmployeeHours = { ...prevData.employee_hours };
        //     selectedEmployees.forEach((employeeId) => {
        //         if (!newEmployeeHours[employeeId]) {
        //             newEmployeeHours[employeeId] = ""; // Add default value
        //         }
        //     });
        //     return { ...prevData, employee_hours: newEmployeeHours };
        // });
    };

    const handleEmployeeHoursChange = (employeeId, hours) => {
        setData((prevData) => ({
            ...prevData,
            employee_hours: {
                ...prevData.employee_hours,
                [employeeId]: hours, // Update hours for specific employee
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const selectedProjectId = parseInt(data.project_id);
        const selectedProject = projects.find(
            (project) => project.id === selectedProjectId
        );

        if (!selectedProject) {
            notyf.error("Selected project not found.");
            return;
        }

        const estimateHours = parseFloat(data.estimate_hours);

        // try {
        //     const response = await axios.get(
        //         `/project-tasks/${selectedProjectId}/total-hours`
        //     );
        //     const totalExistingHours = parseFloat(response.data.total_hours);

        //     const totalHours = totalExistingHours + estimateHours;
        //     const projectEstimateTime = parseFloat(
        //         selectedProject.estimate_time
        //     );

        //     if (totalHours > projectEstimateTime) {
        //         notyf.error(
        //             `Total hours exceed the allowed limit for the project. Maximum allowed: ${projectEstimateTime} hours.`
        //         );
        //         return;
        //     }

        post("/task-store", {
            data,
            onSuccess: () => {
                notyf.success(
                    "Task created successfully with notification sent."
                );
            },
            onError: (errors) => {
                if (typeof errors === "object" && errors !== null) {
                    Object.entries(errors).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            value.forEach((message) => notyf.error(message));
                        } else {
                            notyf.error(value);
                        }
                    });
                } else {
                    notyf.error("An unexpected error occurred.");
                }
            },
        });
        // } catch (error) {
        //     notyf.error(
        //         "Failed to validate project hours. Please try again later."
        //     );
        // }
    };

    const normalizedTaskName = data.task_name
        .replace(/\u00A0/g, " ") // Replace non-breaking spaces with regular spaces
        .trim();

    // useEffect(() => {
    //     // Dynamically load the Razorpay Checkout script
    //     const script = document.createElement("script");
    //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //     script.async = true;
    //     script.onload = () => console.log("Razorpay script loaded successfully.");
    //     document.body.appendChild(script);

    //     return () => {
    //         // Clean up the script when the component unmounts
    //         document.body.removeChild(script);
    //     };
    // }, []);
    const handlePayment = () => {
        const options = {
            key: "rzp_test_XaqbXFTW6WTuAK", // Razorpay Key
            amount: 100, // Amount in currency subunits (e.g., 5000 = ₹50)
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
            // order_id: "order_IluGWxBm9U8zJ8",
            handler: function (response) {
                // Send payment details to backend
                Inertia.post("/payment-success", response);
            },
            prefill: {
                name: "John Doe",
                email: "john.doe@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="w-[85.2%] ml-[12rem]">
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between"></div>
            </div>
            <div className="p-3 table-section">
                <form
                    onSubmit={handleSubmit}
                    className="px-[8rem] flex flex-wrap"
                >
                    {/* <div>
                        <label htmlFor="project_id">Project Name</label>
                        <select
                            ref={projectSelectRef}
                            className='w-full rounded-lg'
                            name="project_id"
                            value={data.project_id}
                            onChange={handleChange}
                        >
                            <option value="">Select project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>{project.title}</option>
                            ))}
                        </select>
                    </div> */}
                    <div className="w-1/2 p-2">
                        <label htmlFor="task_name">Project Name</label>
                        {/* <select
                            className="w-full rounded-lg"
                            name="task_name"
                            value={data.task_name}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            {taskcategory.map((tasks) => (
                                <option key={tasks.id} value={tasks.tname}>
                                    {tasks.tname}
                                </option>
                            ))}
                        </select> */}
                        <input
                            type="text"
                            name="task_name"
                            className="w-full rounded-lg"
                            value={data.task_name}
                            onChange={handleChange}
                        />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div className="w-1/2 p-2">
                        {normalizedTaskName !== "NON-BILLABLE" && (
                            <>
                                <label htmlFor="rate">Rate</label>
                                <input
                                    className="w-full rounded-lg"
                                    id="rate"
                                    name="rate"
                                    type="number"
                                    value={data.rate}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </div>
                    <div className="w-1/2 p-2">
                        {normalizedTaskName !== "NON-BILLABLE" && (
                            <>
                                <label htmlFor="estimate_hours">
                                    Estimate Hours
                                </label>
                                <input
                                    className="w-full rounded-lg"
                                    id="estimate_hours"
                                    name="estimate_hours"
                                    type="number"
                                    value={data.estimate_hours}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </div>

                    {props.auth.user.roles[0]?.name === "admin" && (
                        <Fragment>
                            {/* <div className="w-1/2 p-2">
                                <label htmlFor="employee_id">Team Leader</label>
                                <select
                                    ref={projectSelectRef}
                                    multiple
                                    name="leader_id"
                                    id="leader_id"
                                    value={data.leader_id}
                                    onChange={handleTeamLeader}
                                    className="w-full rounded-lg"
                                >
                                    <option value="">Select Employee</option>
                                    {tls.map((tl) => (
                                        <option key={tl.id} value={tl.id}>
                                            {tl.name}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                        </Fragment>
                    )}

                    {/* Dynamic input fields for employee hours */}
                    {data.employee_id.length > 0 && (
                        <div className="w-1/2 p-2">
                            {data.employee_id.map((employeeId) => (
                                <div key={employeeId}>
                                    <label
                                        htmlFor={`employee_hours_${employeeId}`}
                                    >
                                        Hours for{" "}
                                        {
                                            employees.find(
                                                (emp) =>
                                                    emp.id ===
                                                    parseInt(employeeId)
                                            )?.name
                                        }{" "}
                                        :
                                    </label>
                                    <input
                                        className="w-full rounded-lg"
                                        type="number"
                                        id={`employee_hours_${employeeId}`}
                                        name={`employee_hours_${employeeId}`}
                                        value={
                                            data.employee_hours[employeeId] ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleEmployeeHoursChange(
                                                employeeId,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="w-1/2 p-2">
                        <label htmlFor="sdate">Start Date</label>
                        <input
                            className="w-full rounded-lg"
                            id="sdate"
                            name="sdate"
                            type="date"
                            value={data.sdate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label htmlFor="edate">End Date</label>
                        <input
                            className="w-full rounded-lg"
                            id="edate"
                            name="edate"
                            type="date"
                            value={data.edate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label htmlFor="">Priority</label>
                        <select
                            id=""
                            className="w-full rounded-lg"
                            name="priority"
                            value={data.priority}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Priority --</option>
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                        </select>
                    </div>

                    {props.auth.user.roles[0]?.name === "admin" && (
                        <div className="w-full p-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">
                                    Project Stage
                                </h1>
                                <button
                                    type="button"
                                    onClick={handleAddRow}
                                    className="text-sm font-semibold bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Add New
                                </button>
                            </div>
                            <table className="my-2 w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2 bg-gray-600 text-white rounded-l">
                                            #
                                        </th>
                                        <th className="px-3 py-2 bg-gray-600 text-white">
                                            Name
                                        </th>
                                        <th className="px-3 py-2 bg-gray-600 text-white">
                                            Payment
                                        </th>
                                        <th className="px-3 py-2 bg-gray-600 text-white rounded-r">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-2">
                                                <select
                                                    className="w-full rounded form-select"
                                                    value={row.name}
                                                    onChange={(e) => {
                                                        const selectedOption =
                                                            e.target.value;
                                                        console.log(
                                                            "Selected Option:",
                                                            selectedOption
                                                        );
                                                        handleInputChange(
                                                            index,
                                                            "name",
                                                            selectedOption
                                                        );
                                                    }}
                                                >
                                                    <option value="" disabled>
                                                        Select a name
                                                    </option>
                                                    {stages.map((stage) => (
                                                        <option
                                                            key={stage.id}
                                                            value={stage.name}
                                                        >
                                                            {stage.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-3 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full rounded form-input"
                                                    value={row.ammount} // autofilled amount
                                                    readOnly
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="space-x-2">
                                                    <button
                                                        className="px-2 py-2 text-indigo-500"
                                                        type="button"
                                                        onClick={() =>
                                                            handlePayment(index)
                                                        }
                                                    >
                                                        <FaWallet />
                                                    </button>
                                                    <button
                                                        className="px-2 py-2 text-red-500"
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteRow(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="w-full p-2">
                        <button
                            type="submit"
                            className="bg-blue-600 p-2 rounded-md text-white w-[30%]"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskCreate;
