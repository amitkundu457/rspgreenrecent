import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { MdLockClock } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

import axios from 'axios';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Leave = ({ leave, user, user_type, notif }) => {
    const [permissions, setPermissions] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredLeave, setFilteredLeave] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [modal, setModal] = useState(false);
   const  [toggle,setToggle]=useState(null)
    useEffect(() => {
        if (Array.isArray(user_type)) {
            setPermissions(user_type);
        } else {
            console.error('Expected user_type to be an array:', user_type);
        }
    }, [user_type]);

    useEffect(() => {
        // Filter leave data based on the search query
        const filtered = leave.filter(emp =>
            emp.name.toLowerCase().includes(query.toLowerCase()) ||
            emp.type_name.toLowerCase().includes(query.toLowerCase()) ||
            emp.reason.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLeave(filtered);
    }, [query, leave]);

    // Pagination logic
    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentLeave = filteredLeave.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Page numbers
    const totalPages = Math.ceil(filteredLeave.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleSearch = (event) => {
        setQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when search query changes
    };

    const handleApprove = async (id) => {
        try {
            await axios.post(`/leave-approve/${id}`);
            alert('Leave approved successfully');
            window.location.reload();
        } catch (error) {
            console.error('There was an error approving the leave!', error);
        }
    };

    const handleReject = async (id) => {
        try {
            // alert(id)
            await axios.post(`/leave-reject/${id}`);
            alert('Leave rejected successfully');
            window.location.reload();
        } catch (error) {
            console.error('There was an error rejecting the leave!', error);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this leave?')) {
            try {
                await axios.get(`/leave-store-delete/${id}`);
                alert('Leave deleted successfully');
                window.location.reload();
            } catch (error) {
                console.error('There was an error deleting the leave!', error);
            }
        }
    };

    const calculateTotalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
        return diffDays;
    };
    const handleToggle = (id) => {
        setToggle(toggle === id ? null : id);
    };
    return (
        <div className='w-[85.2%] absolute right-0 overflow-hidden'>
            <Header user={user} notif={notif} />
            <Nav user_type={user_type} />

            {/* Modal */}
            <div className={`modal absolute top-0 left-0 w-full h-full transition-all duration-500 bg-black/50 flex justify-center items-center ${modal ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className='w-2/5 p-4 px-6 bg-white rounded-md'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-semibold'>Modal header</h1>
                        <button onClick={() => setModal(false)}><FaXmark /></button>
                    </div>
                    <hr className='my-2' />
                    <form action="#" className='py-3 space-y-5'>
                        <div className="flex flex-col gap-2 form-group">
                            <label htmlFor="start-date" className='text-sm font-medium'>Start Date</label>
                            <input id="start-date" type="date" className='rounded form-input' />
                        </div>
                        <div className="flex flex-col gap-2 form-group">
                            <label htmlFor="end-date" className='text-sm font-medium'>End Date</label>
                            <input id="end-date" type="date" className='rounded form-input' />
                        </div>
                        <div className="flex flex-col gap-2 form-group">
                            <label htmlFor="number" className='text-sm font-medium'>Number</label>
                            <input id="number" type="number" className='rounded form-input' />
                        </div>
                        <div>
                            <button className='px-8 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='px-8 table-section'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search employees..."
                        className='w-1/3 p-2 border rounded-md'
                    />
                    <div className='flex space-x-3'>
                        <div className='grid p-2 mt-2 text-black rounded-lg place-items-center'>
                            <Link href='leave-create' className='underline'>Add New</Link>
                        </div>
                        {permissions.includes('view_leave_type') && (
                            <div className='grid p-2 mt-2 text-black rounded-lg place-items-center'>
                                <Link href='leave-type'>Leave Type</Link>
                            </div>
                        )}
                    </div>
                </div>

                <br />

                <table className="table w-full p-4 border">
                    <thead className='border bg-[#0A1B3F] text-white'>
                        <tr>
                            <th className='p-3 text-left border'>Employee Name</th>
                            <th className='p-3 text-left border'>Leave Type</th>
                            <th className='p-3 text-left border'>Applied On</th>
                            <th className='p-3 text-left border'>Start Date</th>
                            <th className='p-3 text-left border'>End Date</th>
                            <th className='p-3 text-left border'>Total Days</th>
                            <th className='p-3 text-left border'>Leave Reason</th>
                            <th className='p-3 text-left border'>Extra Leave</th>
                            <th className='p-3 text-left border'>Status</th>
                            <th className='p-3 text-left border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeave.length > 0 ? (
                            currentLeave.map(emp => (
                                <tr key={emp.id}>
                                    <td className='p-3 border'>{emp.name}</td>
                                    <td className='p-3 border'>{emp.type_name}</td>
                                    <td className='p-3 border'>{formatDate(emp.created_at)}</td>
                                    <td className='p-3 border'>{emp.sdate}</td>
                                    <td className='p-3 border'>{emp.edate}</td>
                                    <td className='p-3 border'>{calculateTotalDays(emp.sdate, emp.edate)}</td>
                                    <td className='p-3 border'>{emp.reason}</td>
                                    <td className='p-3 border'>
                                        {/* { emp.checkbox_checked} */}
                                        {emp.is_unpaid === 1 ? (
                                            <p className='text-[0.7rem] text-center'>Unpaid</p>
                                        ) : (
                                            <p className='text-[0.7rem] text-center'>Paid</p>
                                        )}
                                    </td>
                                    <td className='p-3 border relative' onClick={() => handleToggle(emp.id)}>
                                        {user==="Admin" ? (
                                            <div className="relative">
                                                <button
                                                    className={emp.status === 0?"px-2 py-1 m-1 text-blue-700  rounded transition-colors duration-300 ease-in-out ":emp.status === 1?"px-2 py-1 m-1 text-red-700  rounded transition-colors duration-300 ease-in-out ":emp.status === 2?"px-2 py-1 m-1 text-gray-700  rounded transition-colors duration-300 ease-in-out ":''}
                                                    onClick={() => handleToggle(emp.id)}
                                                >
                                                    { emp.status === 0?"Approve":emp.status === 1?"Reject":emp.status === 2?"pending":''}
                                                </button>
                                                <div
                                                    className={`absolute left-0 top-0  h-[6rem] z-40 mt-9 bg-white rounded shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${toggle === emp.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                                                >
                                                    <div className="">
                                                        <p  onClick={() => handleApprove(emp.id)} className="text-gray-800 p-2 hover:text-green-500 cursor-pointer ">Approve</p>
                                                        <hr/>
                                                        <p  onClick={() => handleReject(emp.id)} className="text-gray-800 p-2 hover:text-red-500 cursor-pointer">Reject</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                             emp.status === 0?<span className="text-blue-500">Approve</span>:emp.status === 1?<span className="text-red-700">Reject</span>:emp.status === 2?<span className="text-gray-900">pending</span>:''
                                        )}
                                    </td>


                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]'
                                                  href={`leave-store-edit/${emp.id}`}><FaEdit/></Link>
                                            <button className='text-red-800 text-[1.5rem]'
                                                    onClick={(e) => handleDelete(e, emp.id)}><RiDeleteBinLine/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-4 text-center">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className='flex justify-between mt-4'>
                    {/* <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className='px-4 py-2 text-white bg-blue-500 rounded'
                    >
                        Previous
                    </button> */}
                    <div className='flex items-center space-x-2'>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-4 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    {/* <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 text-white bg-blue-500 rounded'
                    >
                        Next
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Leave;
