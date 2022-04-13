import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllOrderListAdmin,
  UpdateStatusOrderList,
} from "../../../../features/Api";
import Loading from "../../../../Loading";
import CustomPopupMessage from "../../../CustomPopupMess";

const OrderListTable = () => {
  const [orderlist, setOrderlist] = useState([]);
  const [searchData, setSearchList] = useState();
  const [idOrderCancel, setIdOrderCancel] = useState();
  const [pending, setPending] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getAllOrderListAdmin()
      .then((res) => {
        setOrderlist(res.data.data);
        setSearchList(res.data.data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
      });
  }, [getAllOrderListAdmin]);
  const searchProduct = (e) => {
    let searchList = [];
    let searchKey = e.target.value;
    orderlist.forEach((order) => {
      if (
        order.recipientEmail.toString().toLowerCase().indexOf(searchKey) > -1 ||
        order.recipientPhone.toString().toLowerCase().indexOf(searchKey) > -1 ||
        order.addressDelivery.toString().toLowerCase().indexOf(searchKey) >
          -1 ||
        order.status.toString().toLowerCase().indexOf(searchKey) > -1 ||
        order.amount.toString().toLowerCase().indexOf(searchKey) > -1 ||
        order.totalPrice.toString().toLowerCase().indexOf(searchKey) > -1
      ) {
        searchList.push(order);
      }
    });
    setOrderlist(searchList);
    if (searchKey == null || searchKey == "" || searchKey.isEmpty()) {
      setOrderlist(searchData);
    }
  };

  const onChangeStatusDelivery = (id) => {
    const data = {
      status: 2,
      reasonCancel: "",
    };
    UpdateStatusOrderList(data, id)
      .then((res) => {
        console.log(res.data);
        toast(
          <CustomPopupMessage
            mess="This order are shipping"
            icon="check-circle"
            titleColor="indigo"
            iconColor="indigo"
          />
        );
      })
      .catch((err) => {
        console.log(err);
      });
    getAllOrder();
  };

  // Set order id you want to cancel
  const setIdYouWantToCancel = (id) => {
    setIdOrderCancel(id);
  };
  // Update status for order cancel
  const onSubmit = async (data, e) => {
    console.log(data);
    const dataUpdate = {
      status: 3,
      reasonCancel: data.reasonCancel2,
    };
    UpdateStatusOrderList(dataUpdate, idOrderCancel)
      .then((res) => {
        $("#modalCancelOrd").modal("hide");
        toast(
          <CustomPopupMessage
            mess="This order has been cancelled successfully!"
            icon="check-circle"
            titleColor="indigo"
            iconColor="indigo"
          />
        );
      })
      .catch((err) => {
        console.log(err);
      });
    getAllOrder();
  };

  const getAllOrder = () => {
    getAllOrderListAdmin()
      .then((res) => {
        setOrderlist(res.data.data);
        setSearchList(res.data.data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
      });
  };
  const columns = [
    {
      name: "No",
      sortable: true,
      width: "100px",
      selector: (row) => row.no,
    },
    {
      name: "Date At",
      sortable: true,
      selector: (row) => row.orderDate,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.recipientEmail,
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row.recipientPhone,
    },
    {
      name: "Amount",
      sortable: true,
      width: "150px",
      selector: (row) => row.amount,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (
        <>
          {row.status == "Approved" ? (
            <span
              className="inline-block px-4 py-2.5 text-amber-600
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {row.status}
            </span>
          ) : null}
          {row.status == "Delivery" ? (
            <span
              className="inline-block px-4 py-2.5 text-blue-600
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {row.status}
            </span>
          ) : null}
          {row.status == "Canceled" ? (
            <span
              className="inline-block px-4 py-2.5 text-red-600
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {row.status}
            </span>
          ) : null}
          {row.status == "Completed" ? (
            <span
              className="inline-block px-4 py-2.5 text-green-600
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {row.status}
            </span>
          ) : null}
        </>
      ),
    },
    {
      key: "action",
      id: "actionId",
      text: "Action",
      className: "action",
      align: "left",
      width: "300px",
      sortable: false,
      cell: (order) => {
        return (
          <>
            {order.status == "Approved" ? (
              <>
                <button
                  type="button"
                  onClick={() => onChangeStatusDelivery(order.id, 2)}
                  className="inline-block mr-2 px-4 py-2.5 bg-blue-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
                >
                  Delivery
                </button>
              </>
            ) : null}
            {order.status == "Delivery" || order.status == "Approved" ? (
              <>
                <button
                  type="button"
                  className="inline-block px-4 py-2.5 bg-red-600 text-white
                                                            font-medium text-xs leading-tight uppercase rounded shadow-md"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCancelOrd"
                  onClick={() => setIdYouWantToCancel(order.id)}
                >
                  Cancel
                </button>
                {/* <!-- Modal --> */}
              </>
            ) : null}
            <Link to={`/admin/orders-list/order-detail/${order.id}`}>
              <button
                type="button"
                className="inline-block lg:ml-2 ml-0 px-4 py-2.5 bg-purple-600 text-white
                                                                font-medium text-xs leading-tight uppercase rounded shadow-md"
              >
                Detail
              </button>
            </Link>
          </>
        );
      },
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "rgb(30 41 59)",
        font: "bold",
      },
    },
  };
  const data = [];
  for (let i = 0; i < orderlist.length; i++) {
    const order = {
      no: i + 1,
      id: orderlist[i].id,
      orderDate: orderlist[i].orderDate,
      recipientName: orderlist[i].recipientName,
      recipientEmail: orderlist[i].recipientEmail,
      recipientPhone: orderlist[i].recipientPhone,
      status: orderlist[i].status,
      amount: orderlist[i].amount,
    };
    data.push(order);
  }
  return (
    <>
      <div className="px-4 py-8 w-full w-9xl mx-auto">
        <h2 className="font-bold text-4xl text-slate-800 uppercase mb-5">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> orders list
        </h2>
        <div className="flex space-x-2 justify-end mb-5">
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
        {/*---------------------------------------------*/}
        {pending ? (
          <Loading adminPage={true} />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            progressPending={pending}
            // progressComponent={<Loading />}
          />
        )}

        {/*---------------------------------------------*/}
        <div
          className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="modalCancelOrd"
          tabIndex="-1"
          aria-labelledby="modalCancelOrdLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal pl-8 text-gray-800 uppercase"
                  id="modalCancelOrdLabel"
                >
                    <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                <h5
                                    className="text-xl font-medium leading-normal pl-8 text-gray-800 uppercase"
                                    id="modalCancelOrdLabel"
                                >
                                    Order Canceled
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form
                                className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="modal-body relative p-4">
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3">
                                            <div className="flex">
                                                  <textarea
                                                      id="reasonCancel2"
                                                      name="reasonCancel2"
                                                      className={`w-full h-16 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 }`}
                                                      placeholder="Reason For Order Cancellation"
                                                      {...register(
                                                          "reasonCancel2",
                                                          {
                                                          }
                                                      )}
                                                  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button
                                        type="button"
                                        className="inline-block px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-block px-6 border-2 py-2.5 bg-red-600 text-white font-medium
                                              text-xs leading-tight uppercase rounded shadow-md hover:bg-white
                                              hover:border-red-600 hover:shadow-lg hover:text-red-600
                                              focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0
                                               active:shadow-lg transition duration-150 ease-in-out ml-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderListTable;
