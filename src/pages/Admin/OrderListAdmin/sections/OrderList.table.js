import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllOrderListAdmin,
  UpdateStatusOrderList,
} from "../../../../features/Api";
import { Link } from "react-router-dom";
import Loading from "../../../../Loading";
import { numberFormat } from "../../../LandingPages/Home/function/FormatMoney";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CustomPopupMessage from "../../../CustomPopupMess";
import DataTable from "react-data-table-component";

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

  const onChangeStatusApproved = (id, status) => {
    const data = {
      status: 2,
      reasonCancel: "",
    };
    UpdateStatusOrderList(data, id)
      .then((res) => {
        console.log(res.data);
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
    const dataUpdate = {
      status: 3,
      reasonCancel: data.reasonCancel1,
    };
    console.log(data.reasonCancel1)

    UpdateStatusOrderList(dataUpdate, idOrderCancel)
      .then((res) => {
        console.log(res.data);
        $("#modalCancelOrd").modal("hide");
        toast(
          <CustomPopupMessage
            mess="This order has been cancelled successfully!"
            icon="check"
          />
        );
      })
      .catch((err) => {
        console.log(err);
      });
    getAllOrder();

    e.target.reset();
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
      name: 'No',
      sortable: true,
      width: '100px',
      selector: row => row.no,
    },
    {
      name: 'Date At',
      sortable: true,
      selector: row => row.orderDate,
      width: "150px"
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.recipientName,
      width: "150px"
    },
    {
      name: 'Eamil',
      sortable: true,
      selector: row => row.recipientEmail,
      width: "150px"
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.recipientPhone,
      width: "150px"
    },
    {
      name: 'Amount',
      sortable: true,
      selector: row => row.amount,
      width: "150px"
    },
    // {
    //   name: 'Avatar',
    //   selector: row => <div><img src={row.avatar}/></div>,
    //   disableFilters: true,
    //   width: "120px"
    // },
  ];
  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "rgb(30 41 59)",
        font: "bold"
      },
    },
  };
  const data = []
  for (let i = 0; i < orderlist.length; i++) {
    const order = {
      no: i + 1,
      id:  orderlist[i].id,
      orderDate:  orderlist[i].orderDate,
      recipientName: orderlist[i].recipientName,
      recipientEmail: orderlist[i].recipientEmail,
      recipientPhone: orderlist[i].recipientPhone,
      amount: orderlist[i].amount,
    }
    data.push(order);
  }
  return (
    <>
      <div className="px-4 py-8 w-full w-9xl mx-auto">
        <h2 className="font-bold text-4xl text-slate-800 uppercase mb-5">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> orders list
        </h2>
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
      {/*---------------------------------------------*/}
        <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            progressPending={pending}
            // progressComponent={<Loading />}
        />
      {/*---------------------------------------------*/}
      </div>

      <ToastContainer />
    </>
  );
};
export default OrderListTable;
