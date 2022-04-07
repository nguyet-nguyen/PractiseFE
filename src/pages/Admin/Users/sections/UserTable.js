import "./../../../../assets/css/jquery.dataTables.css"
import $ from 'jquery'
import dt from 'datatables.net'
$.DataTable = dt
import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../../features/Api";
import {Link} from "react-router-dom";
import Loading from "../../../../Loading";

const UsersTable = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        },[]);
    console.log(users);
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex space-x-2 justify-between">
                <Link to="/admin/products/add-product"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition
                                duration-150 ease-in-out">Add Product
                </Link>
                <div className="xl:w-96">
                    <div className="input-group relative flex flex-wrap items-stretch w-full">
                        <input
                            // onChange={searchProduct}
                            type="search"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="button"
                            id="button-addon2"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="search"
                                className="w-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {users ?
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-8 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden rounded-md">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-slate-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            roles
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            actions
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            address
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users && users.map((user, index) => (
                                        <tr className={`${user.roles == "bg-white" ? "bg-slate-400" : "bg-white"}
                                         border-b-2 border-black-800 border-solid`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {user.phone}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {user.roles}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                            </td>
                                            <td className="text-sm w-50 text-gray-900 font-light px-6 py-4
                                            whitespace-normal">
                                                {user.address}
                                            </td>

                                        </tr>
                                    ))}

                                    </tbody>
                                    <tfoot className="border-b bg-slate-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            no
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            roles
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            actions
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 uppercase">
                                            address
                                        </th>

                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loading/>}
        </div>

    )
}

export default UsersTable;