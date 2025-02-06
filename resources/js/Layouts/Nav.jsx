import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {
    FaUserCircle,
    FaTasks,
    FaUsers,
    FaTachometerAlt,
    FaEye,
} from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { MdHolidayVillage } from "react-icons/md";
import { FaHandPaper } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
// import { MdHolidayVillage } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import DropdownMenu from "@/Components/DropdownMenu";
import { FaSearchPlus } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
const Nav = ({ user_type, usrrr }) => {
    const [permissions, setPermissions] = useState([]);
    const [toggle, SetToggle] = useState(true);
    const { props, url } = usePage();
    console.log("User Roles:", props.auth.user.roles);

    useEffect(() => {
        if (Array.isArray(user_type)) {
            setPermissions(user_type);
        } else {
            console.error("Expected user_type to be an array:", user_type);
        }
    }, [user_type]);

    const menuitems = [
        { name: "employees", link: "/employees", perm: "create_role" },

        { name: "leave management", link: "/leave-index", perm: "view_leave" },
        { name: "Loan Management", link: "/loans", perm: "view_employee" },
        {
            name: "Advance-Salary Management",
            link: "/advanceloan",
            perm: "view_employee",
        },
        { name: "employee setup", link: "/branches", perm: "create_role" },
        // { name: "attendance", link: "/attendance", perm: "view_attendance" },
        { name: "Salary generate", link: "/salaries", perm: "view_salary" },
        { name: "Attendance", link: "/attendance", perm: "view_employee" },
        // { name: "Generate Titles", link: "/titles", perm: "view_salary" },

        {
            name: "Salary generator employee wise",
            link: "/all-salary",
            perm: "view_salary",
        },

        {
            name: "Salary deduction",
            link: "/deductions",
            perm: "view_employee",
        },

        // {
        //     name: "office time",
        //     link: "/office-hours",
        //     perm: "view_leave" ,
        // },

        // { name: "payroll", link: "/payroll", perm: "view_payroll" },
    ];

    const userPermissions = ["view_employee", "view_leaves", "view_attendance"]; // Example permissions
    const accessibleItems = menuitems.filter((item) =>
        userPermissions.includes(item.permission)
    );

    return (
        <nav className="grid p-5 place-items-center">
            <div
                className={
                    toggle
                        ? "modal menu fixed transition delay-700 block duration-700 ease-in shadow-md bg-white w-[17%] justify-end slide-right-to-left left-0 bottom-0 top-0"
                        : "modal menu absolute hidden bg-gray-800 w-[10rem] duration-700 ease-in-out delay-700 justify-end bottom-0 top-0"
                }
            >
                <ul>
                    <div className="p-2 logo">
                        <img
                            src="/SCS-01-removebg-preview.png"
                            alt="Description"
                            className="w-[85%]"
                        />
                    </div>
                    <li
                        className={
                            url === "/dashboard"
                                ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                : "p-2 text-black text-[0.9rem]"
                        }
                    >
                        <Link
                            href="/dashboard"
                            className="flex items-center space-x-2"
                        >
                            {" "}
                            <span>
                                {" "}
                                <FaTachometerAlt />
                            </span>{" "}
                            <span>Dashboard</span>{" "}
                        </Link>
                    </li>
                    {(props.auth.user.roles[0]?.name === "admin" ||
                        permissions.includes("view_employee")) && (
                        <DropdownMenu
                            icon={<FaHome />}
                            name={"HRMS & Payroll"}
                            items={menuitems}
                        />
                    )}

                    {props.auth.user.roles[0]?.name === "view_task" && (
                        <li
                            className={
                                url === "/Quotation"
                                    ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                    : "p-2 text-black text-[0.9rem]"
                            }
                        >
                            <Link
                                href="/leave-index"
                                className="flex space-x-2"
                            >
                                {" "}
                                <span>
                                    {" "}
                                    <FaHandPaper />
                                </span>{" "}
                                <span>Leave management</span>{" "}
                            </Link>
                        </li>
                    )}
                    {/* <li
                        className={
                            url === "/complaint"
                                ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                : "p-2 text-black text-[0.9rem]"
                        }
                    >
                        <Link href="/complaint" className="flex space-x-2">
                            {" "}
                            <span>
                                {" "}
                                <FaHandPaper />
                            </span>{" "}
                            <span>complaint</span>{" "}
                        </Link>
                    </li> */}
                    {props.auth.user.roles[0]?.name === "admin" && (
                        <DropdownMenu
                            icon={<FaUsers />}
                            name={"Account System"}
                            items={[
                                { name: "Invoice", link: "/sales" },
                                { name: "Income", link: "/income" },
                                {
                                    name: "Expense",
                                    link: "/amc-expense-index",
                                    perm: "view_purchase",
                                },
                                {
                                    name: "Accounting Setup",
                                    link: "/tax",
                                    perm: "view_tax",
                                },
                            ]}
                        />
                    )}
                    {props.auth.user.roles[0]?.name === "admin" && (
                        <DropdownMenu
                            icon={<FaUsers />}
                            name={"Work Order"}
                            items={[
                                {
                                    name: "Client Work-Order",
                                    link: "/clients-workOrder",
                                },
                                {
                                    name: "Seller Work-Order",
                                    link: "/seller-work-orders",
                                },
                            ]}
                        />
                    )}
                    <DropdownMenu
                        icon={<FaFolderClosed />}
                        name={"Project Management"}
                        items={[
                            {
                                name: "Timesheet",
                                link: "/daily-status",
                                perm: "view_timsheet",
                                hide: !(
                                    props.auth.user.roles[0]?.name ===
                                        "admin" ||
                                    permissions.includes("view_timsheet")
                                ), // Will hide unless the role is "admin" or has 'view_timsheet' permission
                            },
                            {
                                name: "Projects",
                                link: "/projects-task",
                                perm: "view_project",
                                hide: !(
                                    permissions.includes("view_project") ||
                                    props.auth.user.roles[0]?.name === "admin"
                                ),
                            },
                            {
                                name: "Add Employee",
                                link: "/task-assingbyadmin",
                                perm: "view_project",
                                hide: !(
                                    permissions.includes("view_project") ||
                                    props.auth.user.roles[0]?.name === "admin"
                                ),
                            },
                            { name: "Reports", link: "/reports-get" },
                            {
                                name: "project-stages",
                                link: "/project-all-stages",
                                hide: !(
                                    permissions.includes("view_project") ||
                                    props.auth.user.roles[0]?.name === "admin"
                                ),
                            },
                        ]}
                    />
                    {permissions.includes("admin") ||
                    permissions.includes("view_employee") ? (
                        <DropdownMenu
                            icon={<MdAddTask />}
                            name="Allowance"
                            items={[
                                {
                                    name: "Travel Allowance",
                                    link: "/travel-allowances",
                                    perm: "view_employee",
                                },
                                {
                                    name: "Food Allowance",
                                    link: "/food-allowances",
                                    perm: "view_employee",
                                },
                            ]}
                        />
                    ) : null}

                    {permissions.includes("admin") ||
                    permissions.includes("view_employee") ? (
                        <DropdownMenu
                            icon={<MdHolidayVillage />}
                            name="Holiday"
                            items={[
                                {
                                    name: "Holiday-location",
                                    link: "/holiday-locationswise",
                                    perm: "view_employee",
                                },
                                {
                                    name: "Holiday List",
                                    link: "/holidays-location",
                                    perm: "view_employee",
                                },
                                {
                                    name: "Holiday Calendar",
                                    link: "/holidays-calender",
                                    perm: "view_employee",
                                },
                            ]}
                        />
                    ) : null}

                    {props.auth.user.roles[0]?.name === "admin" && (
                        <DropdownMenu
                            icon={<FaFolderClosed />}
                            name={"User Management"}
                            items={[
                                { name: "Customer", link: "/clients" },
                                {
                                    name: " Lead Stages",
                                    link: "/lead-stages",
                                    perm: "view_contracts",
                                },
                                {
                                    name: "Leads ",
                                    link: "/lead",
                                    perm: "view_leads",
                                },
                                {
                                    name: "Deals",
                                    link: "/deal",
                                    perm: "view_deals",
                                },
                                //  { name: 'Timesheet', link: '/daily-status' },
                                // { name: 'Tasks', link: '/projects-task' },
                                // { name: 'Task Calendar', link: '/taskcalendar' },
                                // { name: 'Reports', link: '/reports-get' }
                            ]}
                        />
                    )}
                    {/* {props.auth.user.roles[0]?.name === "admin" && (
                        <DropdownMenu
                            icon={<FaFolderClosed />}
                            name={"CRM"}
                            items={[
                                // {
                                //     name: "Project",
                                //     link: "/lead-sources",
                                //     perm: "view_contracts",
                                // },
                              
                                {
                                    name: "Contract",
                                    link: "/contract",
                                    perm: "view_contracts",
                                },
                                
                                // { name: 'Reports', link: '/reports-get' }
                            ]}
                        />
                    )} */}
                    {props.auth.user.roles[0]?.name === "admin" && (
                        <DropdownMenu
                            icon={<FaFolderClosed />}
                            name={"Invetory Management"}
                            items={[
                                {
                                    name: "Services",
                                    link: "/product-services",
                                    perm: "view_service",
                                },
                                // { name: 'Deals', link: '/projects-task' },
                                // { name: 'Contract', link: '/taskcalendar' },
                                // { name: 'Reports', link: '/reports-get' }
                            ]}
                        />
                    )}
                    {props.auth.user.roles[0]?.name === "admin" && (
                        <li
                            className={
                                url === "/roles-permission-details"
                                    ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                    : "p-2 text-black text-[0.9rem]"
                            }
                        >
                            <Link
                                href="/roles-permission-details"
                                className="flex space-x-2"
                            >
                                {" "}
                                <span>
                                    {" "}
                                    <FaHandPaper />
                                </span>{" "}
                                <span>Roles</span>{" "}
                            </Link>
                        </li>
                    )}
                    {props.auth.user.roles[0]?.name === "admin" && (
                        <li
                            className={
                                url === "/enquiry"
                                    ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                    : "p-2 text-black text-[0.9rem]"
                            }
                        >
                            <Link href="/enquiry" className="flex space-x-2">
                                {" "}
                                <span>
                                    {" "}
                                    <FaSearchPlus />
                                </span>{" "}
                                <span>Enquiry</span>{" "}
                            </Link>
                        </li>
                    )}
                    {permissions.includes("admin") ||
                    permissions.includes("view_employee") ? (
                        <li
                            className={
                                url === "/Quotation"
                                    ? "active bg-[#0A1B3F] p-2 px-5 text-[0.9rem] text-white"
                                    : "p-2 text-black text-[0.9rem]"
                            }
                        >
                            <Link href="/Quotation" className="flex space-x-2">
                                <span>
                                    <FaHandPaper />
                                </span>
                                <span>Quotation</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
