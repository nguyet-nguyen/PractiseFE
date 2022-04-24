import Loading from "Loading";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserOrderDetail, addOrderPayPal } from "../../../../features/Api";
import { numberFormat } from "../../Home/function/FormatMoney";

const OrdDetail = () => {
  const [order, setOrder] = useState();

  const [subtotal, setSubtotal] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPaymentFailed, setShowPaymentFailed] = useState(false);

  let params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserOrderDetail(params.id)
      .then((res) => {
        setOrder(res.data);
        const sum = res.data.items.reduce(
          (partialSum, item) => partialSum + item.price,
          0
        );
        setSubtotal(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const continueToPay = async (order) => {
    setShowSpinner(true);
    const dataPayment = {
      recipientName: order.recipientName,
      recipientEmail: order.recipientEmail,
      recipientPhone: order.recipientPhone,
      addressDelivery: order.addressDelivery,
      shippingCost: order.shippingCost,
      paymentMethod: "paypal",
    };
    if(order.status == 5){
      addOrderPayPal(dataPayment)
      .then((response) => {
        setShowSpinner(false);
        window.open(response.data.url,"_self");
      })
      .catch((err) => {
        alert(err.data);
        setShowPaymentFailed(true);
        setShowSpinner(false);
      });
    }
  };

  const onShowOrdDetail = () => {
    setShowPaymentFailed(false);
  };

  return (
    <>
    {showPaymentFailed ? (
        <div className="w-full px-3 text-center">
          <i
            className={`fa fa-frown-o text-9xl text-amber-500`}
            aria-hidden="true"
          ></i>
          <p className="font-bold text-xl uppercase mt-5">Sorry</p>
          <p className=" text-lg text-gray-500 mt-3 break-all">
            Looks like your payment failed
          </p>
          <p className="text-lg text-gray-500  mt-1">Please payment again </p>
          <div className="py-6 px-3 mt-32 sm:mt-0">
            <button
              onClick={() => {onShowOrdDetail()}}
              className="bg-amber-500 active:bg-amber-600 w-1/4 h-10 py-2.5 uppercase text-white font-bold hover:shadow-md shadow text-sm   rounded-md outline-none focus:outline-none sm:mr-2 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Return to Order Detail
            </button>
          </div>
        </div>
      ) : (<>
      {order ? (
        <>
          <div className="px-4 md:px-3">
          
            <div className="flex lg:flex-row flex-col py-4" id="cart">
                <div className="lg:w-1/2 w-full bg-white h-auto">
                  <p className="lg:text-4xl text-3xl font-black leading-10 text-[#63584c]">
                    Order Detail
                  </p>
                </div>
                { order.status == 5 && <div className="lg:w-1/2 lg:text-right lg:pt-0 pt-4 lg:ml-30 w-full h-full">
                  <button
                    type="button"
                    onClick={() => continueToPay(order)}
                    className="inline-block px-4 -mr-4 py-2.5 lg:mb-0 mb-3 bg-amber-500 hover:bg-amber-600 text-white 
                            font-medium text-xs leading-tight uppercase rounded-md hover:shadow-md shadow"
                  >
                    <i className="fa fa-paypal pr-2" aria-hidden="true"></i>
                    Continue to payment
                    {showSpinner && (
                      <div
                        className="spinner-border animate-spin inline-block w-3 h-3 border-3 ml-2 rounded-full"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </div> }
                
              </div>
          </div>

          <div className="w-full mx-2 bg-white lg:h-auto border-2 border-gray-200 rounded-lg ">
            <div className="px-10 py-8">
              <div className="flex lg:flex-row flex-col" id="cart">
                <div className="lg:w-1/2 w-full py-2 bg-white h-auto">
                  <p className="text-base font-black leading-none text-gray-700 mb-2">
                    Order number
                  </p>
                  <p className="text-base font-black leading-none text-gray-400 mb-2 ">
                    #{order.id}
                  </p>
                  <p className="text-base font-black leading-none text-gray-700 mb-2">
                    Order Date
                  </p>
                  <p className="text-base font-black leading-none text-gray-400 lg:mb-0 mb-2">
                    {order.orderDate}
                  </p>
                </div>

                <div className="lg:w-1/2 lg:text-right lg:pt-0 pt-4 lg:ml-20 w-full  h-full">
                  <p className="text-base font-black leading-none text-gray-700 mb-2">
                    Delivery Information
                  </p>
                  <p className="text-base font-black leading-none text-gray-400 mb-2">
                    {order.recipientName}
                  </p>
                  <p className="text-base font-black leading-none text-gray-400 mb-2">
                    {order.recipientEmail}
                  </p>
                  <p className="text-base font-black leading-none text-gray-400 mb-2 ">
                    {order.recipientPhone}
                  </p>
                  <p className="text-base font-black leading-none text-gray-400">
                    {order.addressDelivery}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 py-2 px-10">
              <div className="flex items-center justify-around w-full pt-2">
                {order.status != 3 && (
                  <p className="lg:text-lg text-xs capitalize font-black leading-none text-gray-800 ">
                    Pending
                    {order.status == 5 && (
                      <span className="bg-amber-500 rounded-lg text-xs lg:p-1 lg:ml-2 ml-1">
                        <i
                          className={`fa fa-check text-white text-center`}
                          aria-hidden="true"
                        ></i>
                      </span>
                    )}
                  </p>
                )}

                {order.status != 3 && (
                  <p className="lg:text-lg text-xs capitalize font-black leading-none text-gray-800 ">
                    Approved
                    {order.status == 1 && (
                      <span className="bg-amber-500 rounded-lg text-xs lg:p-1 lg:ml-2 ml-1">
                        <i
                          className={`fa fa-check text-white text-center`}
                          aria-hidden="true"
                        ></i>
                      </span>
                    )}
                  </p>
                )}

                {order.status != 3 && (
                  <p className="lg:text-lg text-xs capitalize font-black leading-none text-gray-800 ">
                    Shipping
                    {order.status == 2 && (
                      <span className="bg-amber-500 rounded-lg text-xs lg:p-1 lg:ml-2 ml-1">
                        <i
                          className={`fa fa-check text-white text-center`}
                          aria-hidden="true"
                        ></i>
                      </span>
                    )}
                  </p>
                )}

                {order.status != 3 && (
                  <p className="lg:text-lg text-xs capitalize font-black leading-none text-gray-800 ">
                    Completed
                    {order.status == 4 && (
                      <span className="bg-amber-500 rounded-lg text-xs lg:p-1 lg:ml-2 ml-1">
                        <i
                          className={`fa fa-check text-white text-center`}
                          aria-hidden="true"
                        ></i>
                      </span>
                    )}
                  </p>
                )}

                {order.status == 3 && (
                  <p className="text-lg uppercase font-black leading-none text-gray-800 ">
                    Order Canceled
                    <i
                      className={`fa fa-close text-red-500 pl-2 text-center`}
                      aria-hidden="true"
                    ></i>
                  </p>
                )}
              </div>

              {order.status == 5 && (
                <div className="w-full bg-gray-200 h-4 my-7 rounded-md">
                  <div className="bg-amber-500 text-center lg:text-sm text-xs font-medium h-5 text-white rounded-md w-1/4">
                    Step 1
                  </div>
                </div>
              )}
              {order.status == 1 && (
                <div className="w-full bg-gray-200 h-4 my-7 rounded-md">
                  <div className="bg-amber-500 text-right lg:pr-36 pr-7 lg:text-sm text-xs font-medium h-5 text-white rounded-md w-2/4">
                    Step 2
                  </div>
                </div>
              )}
              {order.status == 2 && (
                <div className="w-full bg-gray-200 h-4 my-7 rounded-md">
                  <div className="bg-amber-500 text-right lg:pr-32 pr-5 lg:text-sm text-xs font-medium h-5 text-white rounded-md w-3/4">
                    Step 3
                  </div>
                </div>
              )}
              {order.status == 4 && (
                <div className="w-full bg-gray-200 h-4 my-7 rounded-md">
                  <div className="bg-amber-500 text-right lg:pr-32 pr-3 lg:text-sm text-xs font-medium h-5 text-white rounded-md w-full">
                    Delivered
                  </div>
                </div>
              )}
            </div>

            {order.items &&
              order.items.map((item) => (
                <Link  key={item.id} to={`/all-items/item-detail/${item.idProduct}`}>
                <div
                  className="md:flex items-strech px-10 py-8 md:py-10 lg:py-8 border-t border-gray-100"
                >
                  <div className="md:w-4/12 2xl:w-1/12 w-full">
                    
                      <img
                        src={item.image[0]}
                        alt="product image"
                        className="h-full object-center object-cover md:block hidden"
                      />
                      <img
                        src={item.image[0]}
                        alt="product image"
                        className="md:hidden w-full h-full object-center object-cover"
                      />
                    
                  </div>
                  <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-11/12 flex flex-col justify-center">
                    <div className="flex items-center justify-between w-full md:pt-0 pt-4">
                      <p className="text-md uppercase font-black leading-none text-gray-800 ">
                        {item.name}
                      </p>
                      <p className="text-md uppercase font-black leading-none text-amber-800 ">
                        {numberFormat(item.price)}
                      </p>
                    </div>
                    <p className="text-base font-semibold leading-3 text-gray-600  py-5">
                      {numberFormat(item.unitPrice)} x {item.amount}
                    </p>
                    <div className="flex items-center ">
                      <p className="text-sm font-semibold capitalize leading-3 text-gray-500  pr-3">
                        {item.color}
                      </p>
                      <p className="text-sm font-semibold uppercase leading-3 text-gray-500  border-l border-gray-300 pl-3">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            <div className="bg-gray-100 p-4">
              <div className="flex lg:flex-row flex-col" id="cart">
                <div className="lg:w-2/3 md:w-8/12 w-full px-4 py-2"></div>

                <div className="lg:w-1/3 lg:ml-20 md:w-8/12 w-full bg-gray-100 h-auto">
                  <div className="flex flex-col h-auto md:px-7 px-4 py-6 justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between pb-5">
                        <p className="text-base font-semibold leading-none text-gray-500 ">
                          Subtotal
                        </p>
                        <p className="text-base  font-bold leading-none text-gray-700 ">
                          {numberFormat(subtotal)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between py-5 border-t border-gray-300">
                        <p className="text-base  font-semibold leading-none text-gray-500 ">
                          Shipping
                        </p>
                        <p className="text-base  font-bold leading-none text-gray-700">
                          {order.shippingCost == 0
                            ? "Free"
                            : numberFormat(order.shippingCost)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center pb-6 justify-between pt-6 py-5 border-t border-gray-300">
                        <p className="text-xl font-bold leading-normal text-gray-800">
                          Total ( {order.items.length}
                          {order.items.length > 1 ? " items" : " item"} )
                        </p>
                        <p className="text-xl font-bold leading-normal text-right text-amber-600 ">
                          {numberFormat(order.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      </>)}
      
    </>
  );
};

export default OrdDetail;
