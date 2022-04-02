import React from "react";

const ShoppingCart = () => {
  return (
    <>
      <div className="px-4 md:px-3">
        <p className="lg:text-4xl text-3xl font-black leading-10 text-[#63584c] dark:text-white py-3">
          Shopping Cart
        </p>
      </div>
      <div className="flex lg:flex-row flex-col" id="cart">
        <div className="lg:w-2/3 md:w-8/12 w-full px-4 py-2 bg-white dark:bg-gray-800 lg:h-screen h-auto">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-6 h-7   accent-amber-300 border-0 rounded-md focus:ring-0 mr-7"
              defaultChecked
            />
            <span className="text-lg font-semibold leading-3 text-gray-600 py-5">
              Select All
            </span>
          </label>
          <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-100">
            <input
              type="checkbox"
              className="w-6 h-7 accent-amber-300 border-0 rounded-md focus:ring-0 mr-7"
              defaultChecked
            />
            <div className="md:w-4/12 2xl:w-1/4 w-full">
              <img
                src="https://media.gucci.com/style/HEXEAF2DC_Center_0_0_800x800/1643239845/688610_XJD7W_9061_002_100_0000_Light-Jersey-zip-jacket-with-Web.jpg"
                alt="Dress1"
                className="h-full object-center object-cover md:block hidden"
              />
              <img
                src="https://media.gucci.com/style/HEXEAF2DC_Center_0_0_800x800/1643239845/688610_XJD7W_9061_002_100_0000_Light-Jersey-zip-jacket-with-Web.jpg"
                alt="Dress1"
                className="md:hidden w-full h-full object-center object-cover"
              />
            </div>
            <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p className="text-base font-semibold leading-3 text-gray-600 dark:text-white md:pt-0 pt-4">
                ID12
              </p>
              <div className="flex items-center justify-between w-full py-3">
                <p className="text-lg font-black leading-none text-gray-800 dark:text-white">
                  Light Jersey zip jacket
                </p>
                <select
                  aria-label="Select quantity"
                  className="py-2 px-1 border rounded-md mr-6  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="flex items-center pb-8">
                <p className="text-sm font-semibold leading-3 text-gray-500 dark:text-white pr-3">
                  White
                </p>
                <p className="text-sm font-semibold leading-3 text-gray-500 dark:text-white border-l border-gray-300 pl-3">
                  Large
                </p>
              </div>

              <div className="flex items-center pt-7">
                <p className="text-md font-bold leading-3 text-gray-800 dark:text-white">
                  $20.00
                </p>
                <p className="text-sm leading-3 underline text-red-500 pl-5 cursor-pointer">
                  Remove
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-100">
            <input
              type="checkbox"
              className="w-6 h-7 accent-amber-300 border-0 rounded-md focus:ring-0 mr-7"
              defaultChecked
            />
            <div className="md:w-4/12 2xl:w-1/4 w-full">
              <img
                src="https://media.gucci.com/style/HEXEAF2DC_Center_0_0_800x800/1643239849/688613_XJD6C_9061_002_100_0000_Light-Jersey-shorts-with-Web.jpg"
                alt="Light-Jersey-short"
                className="h-full object-center object-cover md:block hidden"
              />
              <img
                src="https://media.gucci.com/style/HEXEAF2DC_Center_0_0_800x800/1643239849/688613_XJD6C_9061_002_100_0000_Light-Jersey-shorts-with-Web.jpg"
                alt="Light-Jersey-short"
                className="md:hidden w-full h-full object-center object-cover"
              />
            </div>
            <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p className="text-base font-semibold leading-3 text-gray-600 dark:text-white md:pt-0 pt-4">
                ID12
              </p>
              <div className="flex items-center justify-between w-full py-3">
                <p className="text-lg font-black leading-none text-gray-800 dark:text-white">
                  Light Jersey short
                </p>
                <select
                  aria-label="Select quantity"
                  className="py-2 px-1 border rounded-md mr-6  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="flex items-center pb-8">
                <p className="text-sm font-semibold leading-3 text-gray-500 dark:text-white pr-3">
                  White
                </p>
                <p className="text-sm font-semibold leading-3 text-gray-500 dark:text-white border-l border-gray-300 pl-3">
                  Large
                </p>
              </div>

              <div className="flex items-center pt-7">
                <p className="text-md font-bold leading-3 text-gray-800 dark:text-white">
                  $20.00
                </p>
                <p className="text-sm leading-3 underline text-red-500 pl-5 cursor-pointer">
                  Remove
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 lg:ml-20 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
          <div className="flex flex-col h-auto lg:px-8 md:px-7 px-4 lg:py-16 md:py-8 py-6 justify-between overflow-y-auto">
            <div>
              <p className="lg:text-2xl text-xl font-bold leading-9 text-gray-800 dark:text-white">
                Order Summary
              </p>
              <div className="flex items-center justify-between pt-12 pb-5">
                <p className="text-base font-semibold leading-none text-gray-500 dark:text-white">
                  Subtotal
                </p>
                <p className="text-base  font-bold leading-none text-gray-700 dark:text-white">
                  $20
                </p>
              </div>
              <div className="flex items-center justify-between py-5 border-t border-gray-300">
                <p className="text-base  font-semibold leading-none text-gray-500 dark:text-white">
                  Shipping
                </p>
                <p className="text-base  font-bold leading-none text-gray-700 dark:text-white">
                  $10
                </p>
              </div>
              <div className="flex items-center justify-between py-5 border-t border-gray-300">
                <p className="text-base  font-semibold leading-none text-gray-500 dark:text-white">
                  Tax
                </p>
                <p className="text-base  font-bold leading-none text-gray-700 dark:text-white">
                  $10
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center pb-6 justify-between lg:pt-12 py-5 pt-20 border-t border-gray-300">
                <p className="text-xl font-bold leading-normal text-gray-800 dark:text-white">
                  Total
                </p>
                <p className="text-xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                  $240
                </p>
              </div>
              <button className="text-lg leading-none w-full py-5 bg-amber-500 hover:bg-amber-600 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-800 text-white dark:hover:bg-amber-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
