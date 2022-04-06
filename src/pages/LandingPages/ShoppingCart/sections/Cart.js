import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { numberFormat } from "../../Home/function/FormatMoney";
import { getAllItemsInCart } from "../../../../features/Api";

const ShoppingCart = () => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [sizeAmount, setSizeAmount] = useState(1);
  const [counter, setCounter] = useState();
  const [subtotal, setSubtotal] = useState();
  const [shippingFee, setShippingFee] = useState(20);

  useEffect(() => {
    getAllItemsInCart()
      .then(res => {
        setItemsInCart(res.data);
        const allItems = res.data;
        for (let i = 0; i < allItems.length; i++) {
          allItems[i].isSelected = false;
        }
        const sum = allItems.reduce((partialSum, item) => partialSum + item.price, 0);
        setSubtotal(sum);

      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const increase = () => {

  };
  //decrease counter
  const decrease = () => {

  };

  const changeQuantity = (e) => {

  }

  return (
    <>
      <div className="px-4 md:px-3">
        <p className="lg:text-4xl text-3xl font-black leading-10 text-[#63584c] py-3">
          Shopping Cart
        </p>
      </div>
      <div className="flex lg:flex-row flex-col" id="cart">
        <div className="lg:w-2/3 md:w-8/12 w-full px-4 py-2 bg-white lg:h-screen h-auto">
          <label className="inline-flex items-center">
            {/* <input
              type="checkbox"
              className="w-6 h-7   accent-amber-300 border-0 rounded-md focus:ring-0 mr-7"
              defaultChecked = {isCheckedAll}
              onClick = {onSelectAll}

            />
            <span className="text-lg font-semibold leading-3 text-gray-600 py-5">
              Select All
            </span> */}
          </label>
          {itemsInCart.map((item) =>
            <div key={item.id} className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-100">
              {/* <input
              type="checkbox"    
              value={item.id}
              className="w-6 h-7 accent-amber-300 border-0 rounded-md focus:ring-0 mr-7"
              defaultChecked = {item.isSelected}
              onClick = {onSelect}

            /> */}
              <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  src={item.images[0]}
                  alt="product image"
                  className="h-full object-center object-cover md:block hidden"
                />
                <img
                  src={item.images[0]}
                  alt="product image"
                  className="md:hidden w-full h-full object-center object-cover"
                />
              </div>
              <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">

                <div className="flex items-center justify-between w-full md:pt-0 pt-4">
                  <p className="text-lg uppercase font-black leading-none text-gray-800 ">
                    {item.name}
                  </p>

                  {/* Input quantity */}
                  <div className="flex ml-5 w-28 h-10  bg-white
                             border-amber-700 mt-1">
                    {/* Button - */}
                    <button data-action="decrement"
                      onClick={decrease}
                      className="border-amber-600 border-2 rounded-l-lg bg-white text-gray-600 hover:text-white hover:bg-amber-600
                                        h-full w-20 cursor-pointer outline-none"
                    >

                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    {/* Input quantity */}
                    <input type="number"
                      className="border-amber-600 border-t-2 border-b-2 outline-none focus:outline-none text-center w-full bg-white
                                       font-semibold text-md hover:text-black focus:text-black
                                        md:text-basecursor-default flex items-center text-gray-700"
                      onChange={(e) => changeQuantity(e)}
                      value={item.amount} max={sizeAmount} min={1}
                    />
                    {/* Button + */}
                    <button data-action="increment"
                      onClick={increase}
                      className="border-amber-600 border-2 bg-white text-gray-600 hover:text-white hover:bg-amber-600 rounded-r-lg
                                         h-full w-20 cursor-pointer">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                <p className="text-base font-semibold leading-3 text-gray-600  pt-2 pb-5">
                  {numberFormat(item.unitPrice)}
                </p>
                <div className="flex items-center pb-8">
                  <p className="text-sm font-semibold leading-3 text-gray-500  pr-3">
                    {item.color}
                  </p>
                  <p className="text-sm font-semibold leading-3 text-gray-500  border-l border-gray-300 pl-3">
                    {item.size}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full md:pt-0 pt-4">

                  <p className="text-sm leading-3 underline text-red-500 cursor-pointer mt-2">
                    Remove
                  </p>

                  <p className="text-md font-bold leading-3 text-gray-800">
                    {numberFormat(item.price)}
                  </p>

                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-1/3 lg:ml-20 md:w-8/12 w-full bg-gray-100  h-full">
          <div className="flex flex-col h-auto lg:px-8 md:px-7 px-4 lg:py-16 md:py-8 py-6 justify-between overflow-y-auto">
            <div>
              <p className="lg:text-2xl text-xl font-bold leading-9 text-gray-800 ">
                Order Summary
              </p>
              <div className="flex items-center justify-between pt-12 pb-5">
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
                  {numberFormat(shippingFee)}
                </p>
              </div>

            </div>
            <div>
              <div className="flex items-center pb-6 justify-between lg:pt-12 py-5 pt-20 border-t border-gray-300">
                <p className="text-xl font-bold leading-normal text-gray-800">
                  Total
                </p>
                <p className="text-xl font-bold leading-normal text-right text-gray-800 ">
                  {numberFormat(subtotal + shippingFee)}
                </p>
              </div>
              <button className="text-lg leading-none w-full py-5 bg-amber-500 hover:bg-amber-600 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-800 text-white">
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
