import React, {useEffect, useState} from "react";
import {getAllOrderListAdmin, UpdateStatusOrderList} from "../../../../features/Api";
import {Link} from "react-router-dom";
import Loading from "../../../../Loading";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";

const OrderListTable = () => {
    const [orderlist, setOrderlist] = useState();
    const [searchData, setSearchList] = useState();
    const [page, setPage] = useState(1);
    const [pageItem, setPageItem] = useState(1);
    useEffect(() => {
        getAllOrderListAdmin(pageItem, 2)
            .then((res) => {
                setOrderlist(res.data.data);
                setSearchList(res.data.data);
                if (res.data.total % 2 == 0) {
                    setPage(res.data.total / 2);
                } else {
                    setPage(Math.floor((res.data.total / 2)) + 1);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [getAllOrderListAdmin]);
    const searchProduct = (e) => {
        let searchList = [];
        let searchKey = e.target.value;
        orderlist.forEach(order => {
            if ((order.recipientEmail.toString().toLowerCase().indexOf(searchKey) > -1)
                || (order.recipientPhone.toString().toLowerCase().indexOf(searchKey) > -1)
                || (order.addressDelivery.toString().toLowerCase().indexOf(searchKey) > -1)
                || (order.status.toString().toLowerCase().indexOf(searchKey) > -1)
                || ((order.amount).toString().toLowerCase().indexOf(searchKey) > -1)
                || ((order.totalPrice).toString().toLowerCase().indexOf(searchKey) > -1)
            ) {
                searchList.push(order);
            }
        })
        setOrderlist(searchList);
        if (searchKey == null || searchKey == "" || searchKey.isEmpty()) {
            setOrderlist(searchData);
        }
    }


    const changePage = (item) => {
        setPageItem(item)
        getAllOrderListAdmin(item, 2)
            .then((response) => {
                setOrderlist(response.data.data);
                setSearchList(res.data.data);
            })
            .catch((err) => {
                console.warn(err);
            });
        console.log(item);
    }
    const changePagePrevious = (item) => {
        if (item >= 1) {
            setPageItem(item)
            getAllOrderListAdmin(item, 2)
                .then((response) => {
                    setOrderlist(response.data.data);
                    setSearchList(response.data.data);
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
        console.log(item);
    }
    const changePageNext = (item) => {
        if (item <= page) {
            setPageItem(item)
            getAllOrderListAdmin(item, 2)
                .then((response) => {
                    setOrderlist(response.data.data);
                    setSearchList(response.data.data);
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
    }
    const onChangeStatusApproved = (id,status) => {
        console.log(id);
        let data;
        if (status ==  2) {
            data = {
                status: 2,
            }
        } else if (status == 3) {
            data = {
                status: 3,
            }
        }
        UpdateStatusOrderList(data,id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        getAllOrderListAdmin(pageItem, 2)
            .then((res) => {
                setOrderlist(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <div className="px-4 py-8 w-full w-9xl mx-auto">
                <h2 className="font-bold text-4xl text-slate-800 uppercase mb-5">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> orders list</h2>
                <div className="flex space-x-2 justify-end">
                    <div className="xl:w-96">
                        <div className="input-group relative flex flex-wrap items-stretch w-full">
                            <input
                                onChange={searchProduct}
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
                {orderlist ?
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-8 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden rounded-md">
                                    <table className="min-w-full text-center table-fixed">
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
                                                date at
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-left font-medium text-white px-6 py-4 uppercase">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-left font-medium text-white px-6 py-4 uppercase">
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
                                                amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                actions
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderlist && orderlist.map((order, index) => (
                                            <tr className={`bg-white border-b-2 border-black-800 border-solid`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                                                    {order.orderDate}
                                                </td>
                                                <td className="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                                    {order.recipientName}
                                                </td>
                                                <td className="text-sm text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
                                                    {order.recipientEmail}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.recipientPhone}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.amount}
                                                </td>
                                                <td className="text-sm w-50 text-gray-900 font-light px-6 py-4
                                            whitespace-normal">
                                                    {numberFormat(order.totalPrice)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.status == "Pending" ?
                                                        <span
                                                            className="inline-block px-4 py-2.5 bg-amber-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                        {order.status}
                                                    </span> : null
                                                    }
                                                    {order.status == "Approved" ?
                                                        <span
                                                            className="inline-block px-4 py-2.5 bg-blue-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                        {order.status}
                                                    </span> : null
                                                    }
                                                    {order.status == "Canceled" ?
                                                        <span
                                                            className="inline-block px-4 py-2.5 bg-red-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                        {order.status}
                                                    </span> : null
                                                    }
                                                    {order.status == "Completed" ?
                                                        <span
                                                            className="inline-block px-4 py-2.5 bg-green-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                        {order.status}
                                                    </span> : null
                                                    }
                                                </td>
                                                <td className="text-right text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link to={`/admin/orders-list/order-detail/${order.id}`}>
                                                        <button type="button"
                                                                className="inline-block mr-2 px-4 py-2.5 bg-purple-600 text-white
                                                                font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                            Detail
                                                        </button>
                                                    </Link>
                                                    {order.status == "Pending" ? (
                                                            <>
                                                                <button type="button"
                                                                        onClick={() => onChangeStatusApproved(order.id,2)}
                                                                        className="inline-block mr-2 px-4 py-2.5 bg-blue-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                                    Approve
                                                                </button>
                                                                <button type="button"
                                                                        onClick={() => onChangeStatusApproved(order.id,3)}
                                                                        className="inline-block px-4 py-2.5 bg-red-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )
                                                        : null
                                                    }
                                                    {order.status == "Approved" ? (
                                                            <>
                                                                <button type="button"
                                                                        onClick={() => onChangeStatusApproved(order.id,3)}
                                                                        className="inline-block px-4 py-2.5 bg-red-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md">
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )
                                                        : null
                                                    }
                                                </td>

                                            </tr>
                                        ))}

                                        </tbody>
                                        <tfoot className="border-b bg-slate-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                date at
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-left font-medium text-white px-6 py-4 uppercase">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm text-left font-medium text-white px-6 py-4 uppercase">
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
                                                amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                actions
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

            <div className="bg-white px-4 flex items-center justify-between sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300
                    text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300
                     text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:justify-end sm:justify-end">
                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination">
                            <button
                                onClick={() => changePagePrevious(pageItem - 1)}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-600
                                bg-white text-sm font-medium text-gray-500 hover:text-white hover:bg-slate-500">
                                <span className="sr-only">Previous</span>
                                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                            </button>
                            {Array.from(Array(page), (e, item) => {
                                return <button
                                    onClick={() => changePage(item + 1)}
                                    className={`z-10 border-slate-600 relative
                                 inline-flex items-center px-4 py-2 border text-sm font-medium hover:text-white 
                                 hover:bg-slate-500 ${(pageItem == (item + 1)) ? "text-white bg-slate-500" : "text-slate-600 bg-white"}`}>{item + 1}
                                </button>
                            })}
                            <button onClick={() => changePageNext(pageItem + 1)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-600
                                bg-white text-sm font-medium text-gray-500 hover:text-white hover:bg-slate-500">
                                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    )
}
export default OrderListTable;
