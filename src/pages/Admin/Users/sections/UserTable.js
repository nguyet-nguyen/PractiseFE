import "./../../../../assets/css/jquery.dataTables.css"
import $ from 'jquery'
import dt from 'datatables.net'
$.DataTable = dt
import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../../features/Api";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        $('#usersTable').DataTable( {
            users: users,
            columns: [
                { users: 'name' },
                { users: 'email' },
                { users: 'phone' },
                { users: 'address' }
            ]
        } );

        },[]);

    // let users = [
    //     {
    //         id: 1,
    //         name: "Tiger Nixon",
    //         category: "System Architect",
    //         aa: "Edinburgh",
    //         amount: "5421",
    //         date: "2011/04/25",
    //         price: "$320,800",
    //     },
    //     {
    //         id: 2,
    //         name: "Minh Nguyet",
    //         category: "Front-end Developer",
    //         aa: "Edinburgh",
    //         amount: "5421",
    //         date: "2011/04/25",
    //         price: "$640,000",
    //     }
    // ];

    console.log(users[0]);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table id="usersTable" className="display min-w-full text-center" >
                            <thead className="border-b bg-gray-800">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-white px-6 py-4"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-white px-6 py-4"
                                >
                                    First
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-white px-6 py-4"
                                >
                                    Last
                                </th>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-white px-6 py-4"
                                >
                                    Handle
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((d,index) =>
                                <tr className="bg-white border-b" key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {d.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {d.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {d.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {d.address}
                                    </td>
                                </tr>
                            )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UsersTable;