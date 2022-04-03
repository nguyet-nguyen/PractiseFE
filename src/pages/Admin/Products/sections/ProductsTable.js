import $ from 'jquery'
import dt from 'datatables.net'

$.DataTable = dt
import React, {useEffect} from "react";


const PeoductsTable = () => {
    useEffect(() => {
            $('#usersTable').DataTable({
                "bDestroy": true,
            });
        }
    )

    let data = [
        {
            id: 1,
            name: "Tiger Nixon",
            category: "System Architect",
            aa: "Edinburgh",
            amount: "5421",
            date: "2011/04/25",
            price: "$320,800",
        },
        {
            id: 2,
            name: "Minh Nguyet",
            category: "Front-end Developer",
            aa: "Edinburgh",
            amount: "5421",
            date: "2011/04/25",
            price: "$640,000",
        }
    ];

    return (
        <table id="usersTable" className="display">
            <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(d => (
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.aa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.price}</td>
                    </tr>
                ))
            }

            </tbody>
            <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
            </tfoot>
        </table>
    )
}

export default PeoductsTable;