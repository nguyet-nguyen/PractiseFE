import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  addOrder,
  getAllItemsInCart,
  getUserInfo,
} from "../../../../features/Api";
import CustomPopupMessage from "../../../CustomPopupMess";
import { numberFormat } from "../../Home/function/FormatMoney";
import Loading from "../../../../Loading";

const CheckoutForm = () => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;
  const navigate = useNavigate();

  useEffect(() => {
    getAllItems();
    getUserInformation(userId);
  }, []);

  const getAllItems = () => {
    getAllItemsInCart()
      .then((res) => {
        setLoading(true);
        setItemsInCart(res.data);
        updateShippingFee(res.data);
        updateTotal(res.data);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  };

  // Update shipping fee
  const updateShippingFee = (allItems) => {
    const qtyTotal = allItems.reduce(
      (partialSum, item) => partialSum + item.amount,
      0
    );
    if (qtyTotal < 5) {
      setShippingFee(20);
    } else {
      setShippingFee(0);
    }
  };

  // Update total
  const updateTotal = (allItems) => {
    const sum = allItems.reduce(
      (partialSum, item) => partialSum + item.price,
      0
    );
    setSubtotal(sum);
  };

  const getUserInformation = (userId) => {
    getUserInfo(userId)
      .then((response) => {
        setValue("recipientName", response.data.name);
        setValue("recipientPhone", response.data.phone);
        setValue("recipientEmail", response.data.email);
        setValue("addressDelivery", response.data.address);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const onSubmit = async (data, e) => {
    setShowSpinner(true);
    const dataCheckout = {
      "recipientName": data.recipientName,
      "recipientEmail": data.recipientEmail,
      "recipientPhone": data.recipientPhone,
      "addressDelivery": data.addressDelivery,
      "shippingCost": shippingFee
    };
    addOrder(dataCheckout)
      .then((response) => {
        setShowSpinner(false);
        $("#modalCheckoutSuccess").modal("show");
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const goShopping = () => {
    $("#modalCheckoutSuccess").modal("hide");
    navigate("/all-items");

  }

  const goListCustomerOrds = () => {
    $("#modalCheckoutSuccess").modal("hide");
    navigate("/user-profile");
  }

  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <div className="lg:w-3/5 md:w-8/12 w-full lg:h-screen h-auto bg-indigo-50 px-12">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your shipping and payment details below.
            </div>
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div className="rounded-md">
            <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-6">
                  Shipping & Billing Information
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <div className="flex border-b border-gray-200">
                    <div className="w-1/7 text-center flex items-center justify-center ">
                      <span className="text-right px-2">
                        Name<span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`w-6/7 pl-4 py-2 outline-none`}
                      placeholder="Your Name"
                      id="recipientName"
                      name="recipientName"
                      {...register("recipientName", { required: true })}
                    />
                  </div>

                  {errors.recipientName &&
                    errors.recipientName.type === "required" && (
                      <p className="text-red-500 my-3 ml-3 text-xs italic">
                        Value required
                      </p>
                    )}

                  <div className="flex border-b border-gray-200">
                    <div className="w-1/7 text-center flex items-center justify-center ">
                      <span className="text-right px-2">
                        Phone<span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`w-6/7 pl-4 py-2 outline-none`}
                      placeholder="Your Phone Number"
                      id="recipientPhone"
                      name="recipientPhone"
                      {...register("recipientPhone", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                      })}
                    />
                  </div>

                  {errors.recipientPhone &&
                    errors.recipientPhone.type === "required" && (
                      <p className="text-red-500 text-xs my-3 ml-3 italic">
                        Value required
                      </p>
                    )}
                  {errors.recipientPhone &&
                    errors.recipientPhone.type === "minLength" && (
                      <p className="text-red-500 my-3 ml-3 text-xs italic">
                        PhoneNumber is 10 characters
                      </p>
                    )}
                  {errors.recipientPhone &&
                    errors.recipientPhone.type === "maxLength" && (
                      <p className="text-red-500 my-3 ml-3 text-xs italic">
                        PhoneNumber is 10 characters
                      </p>
                    )}

                  <div className="flex border-b border-gray-200">
                    <div className="w-1/7 text-center flex items-center justify-center ">
                      <span className="text-right px-2">
                        Email<span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`w-80 pl-4 py-2 outline-none`}
                      placeholder="Email"
                      id="recipientEmail"
                      name="recipientEmail"
                      {...register("recipientEmail", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                  </div>
                  {errors.recipientEmail &&
                    errors.recipientEmail.type === "required" && (
                      <p className="text-red-500 my-3 ml-3 text-xs italic">
                        Value required
                      </p>
                    )}
                  {errors.recipientEmail &&
                    errors.recipientEmail.type === "pattern" && (
                      <p className="text-red-500 my-3 ml-3 text-xs italic">
                        Invalid email
                      </p>
                    )}

                  <div className="flex">
                    <div className="w-2/7 text-center flex items-center justify-center ">
                      <span className="text-right px-2">
                        Address<span className="text-red-500">*</span>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={`w-full pl-4 py-2 outline-none`}
                      placeholder="Address"
                      id="addressDelivery"
                      name="addressDelivery"
                      {...register("addressDelivery", { required: true })}
                    />
                  </div>
                  {errors.addressDelivery &&
                    errors.addressDelivery.type === "required" && (
                      <p className="text-red-500 text-xs my-3 ml-3 italic">
                        Value required
                      </p>
                    )}
                </fieldset>
              </section>
              <button className="submit-button mt-4 uppercase px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white focus:outline-none w-full text-xl font-semibold transition-colors">
                Order
                {showSpinner && <div class="spinner-border animate-spin inline-block w-5 h-5 border-3 ml-2 rounded-full" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>}
              </button>
            </form>
          </div>
        </div>
        <div className="relative lg:w-2/5 lg:ml-10 md:w-8/12">
          {loading ?
              <div className=" w-full  h-full bg-white">
                <h1 className="py-6 border-b-2 text-xl uppercase text-gray-600 px-8">
                  Order Summary
                </h1>
                <ul className="py-6 border-b space-y-6 px-8">
                  {itemsInCart.map((item) => (
                      <Link to={`/all-items/item-detail/${item.idProduct}`}>
                        <li key={item.id} className="grid grid-cols-7 gap-2 border-b-1">
                          <div className="col-span-1 self-center">
                            <img
                                src={item.images[0]}
                                alt="Product Image"
                                className="rounded w-full"
                            />
                          </div>
                          <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 uppercase text-md font-semi-bold">
                      {item.name}
                    </span>
                            <div className="flex items-center pt-2">
                              <p className="text-sm font-semibold capitalize leading-3 text-gray-500 pr-3">
                                {item.color}
                              </p>
                              <p className="text-sm font-semibold uppercase leading-3 text-gray-500  border-l border-gray-300 pl-3">
                                {item.size}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-3 pt-3">
                            <div className="flex items-center text-sm justify-between">
                      <span className="text-gray-500">
                        {item.amount} x {numberFormat(item.unitPrice)}
                      </span>
                              <span className="text-gray-700 font-semibold inline-block">
                        {numberFormat(item.price)}
                      </span>
                            </div>
                          </div>
                        </li>
                      </Link>
                  ))}
                </ul>
                <div className="px-8 border-b">
                  <div className="flex justify-between uppercase py-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-700">
                {numberFormat(subtotal)}
              </span>
                  </div>
                  <div className="flex justify-between uppercase py-4 text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-amber-500">
                {shippingFee == 0 ? "Free" : numberFormat(shippingFee)}
              </span>
                  </div>
                </div>
                <div className="font-semibold text-xl uppercase px-8 flex justify-between py-8 text-amber-500">
                  <span>Total</span>
                  <span>{numberFormat(subtotal + shippingFee)}</span>
                </div>
              </div>
              : <Loading />
          }
        </div>


      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalCheckoutSuccess"
        tabIndex="-1"
        aria-labelledby="modalCheckoutSuccessLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative text-center">
              <div className="w-full px-3">
                <i
                  className={`fa fa-check-circle-o text-5xl text-amber-500`}
                  aria-hidden="true"
                ></i>
                <p className="font-bold text-xl uppercase mt-5">
                  Thank you for your order
                </p>
                <p className="text-base mt-2">
                  Your order has been approved
                </p>
                <p className="text-base  mt-1">
                  We'll send you an email with order details and tracking information.{" "}
                </p>
              </div>

            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-between p-4 mt-2 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5  border border-amber-500 text-amber-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:border-amber-600 hover:shadow-lg focus:border-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:border-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={goShopping}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-amber-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={goListCustomerOrds}
              >
                View Order List
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
