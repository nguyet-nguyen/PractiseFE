import React, {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
import {numberFormat} from "../../Home/function/FormatMoney";
import {
    getAllItemsInCart,
    removeItemFromCart,
    updateCart,
} from "../../../../features/Api";
import Loading from "../../../../Loading";

const ShoppingCart = () => {
    const [itemsInCart, setItemsInCart] = useState([]);
    const [itemsInCartDefault, setItemsInCartDefault] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [idItemDel, setIdItemDel] = useState();
    const [showEmpty, setShowEmpty] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllItems();
    }, []);

    const increase = (item) => {
        if (item.amount < item.totalAmount) {
            item.amount = Number(item.amount) + 1;
            onUpdateCart(item);
        }
    };

    //decrease counter
    const decrease = (item) => {
        if (item.amount > 1) {
            const quantity = item.amount - 1;
            item.amount = quantity;
            onUpdateCart(item);
        }
    };

    const changeQuantity = (e, item) => {
        const quantity = e.target.value;

        if (quantity > item.totalAmount) {
            item.amount = item.totalAmount;
        } else if (quantity == 0) {
            item.amount = 1;
        } else {
            item.amount = quantity;
        }
        onUpdateCart(item);
    };

    // Set id you want to remove from shopping cart
    const setIdYouWantToDel = (id) => {
        setIdItemDel(id);
    };

    // Remove item from shopping cart
    const onRemoveItem = (id) => {
        setShowSpinner(true);

        removeItemFromCart(id)
            .then((res) => {
                const index = itemsInCart.findIndex((item) => item.id === id);
                if (index !== -1) {
                    itemsInCart.splice(index, 1);
                    updateTotal(itemsInCart);
                    setShowSpinner(false);
                    if(itemsInCart.length <= 3){
                        setShowMore(false);
                        setShowLess(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onUpdateCart = (item) => {
        setShowSpinner(true);
        const total = item.unitPrice * item.amount;
        const data = {
            amount: item.amount,
            total: total,
        };

        updateCart(item.id, data)
            .then((res) => {
                getAllItems();
                setShowSpinner(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllItems = () => {
        getAllItemsInCart()
            .then((res) => {
                setItemsInCartDefault(res.data);
                if(res.data.length > 3){
                    const items = res.data.slice(0, 3);
                    setItemsInCart(items);
                    setShowMore(true);
                    setShowLess(false);
                }else{
                    setItemsInCart(res.data);
                    setShowMore(false);
                    setShowLess(false);
                }

                if (res.data.length > 0) {
                    setShowEmpty(false);
                } else if (res.data.length == 0) {
                    setShowEmpty(true);
                }
                setLoading(true)
                updateShippingFee(res.data);
                updateTotal(res.data);
            })
            .catch((err) => {
                console.log(err);
                setLoading(true)
            });
    };

    const viewMore = () => {
        setItemsInCart(itemsInCartDefault);
        setShowMore(false);
        setShowLess(true);
    };

    const viewLess = (allItems) => {
        const items = allItems.slice(0, 3);
        setItemsInCart(items);
        setShowMore(true);
        setShowLess(false);
    };

    // Update shipping fee
    const updateShippingFee = (allItems) => {
        const sum = allItems.reduce(
            (partialSum, item) => partialSum + item.price,
            0
        );
        console.log(sum);
    
        if (sum < 500) {
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

    return itemsInCart.length > 0 ? (
        <div className="relative">
            <div className="px-4 md:px-3">
                <p className="lg:text-4xl text-3xl font-black leading-10 text-[#63584c] py-3">
                    Shopping Cart
                </p>
            </div>

                {loading?
                    <div className="flex lg:flex-row flex-col" id="cart">
                        <div className="lg:w-2/3 md:w-8/12 w-full px-4 py-2 bg-white h-auto">
                            <label className="inline-flex items-center">
                            </label>
                            {itemsInCart.map((item) => (
                                <div
                                    key={item.id}
                                    className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-100"
                                >
                                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                                        <Link to={`/all-items/item-detail/${item.idProduct}`}>
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
                                        </Link>
                                    </div>
                                    <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                        <div className="flex items-center justify-between w-full md:pt-0 pt-4">
                                            <Link to={`/all-items/item-detail/${item.idProduct}`}>
                                                <p className="text-lg uppercase font-black leading-none text-gray-800 ">
                                                    {item.name}
                                                </p>
                                            </Link>

                                            {/* Input quantity */}
                                            <div
                                                className="flex ml-5 w-28 h-10  bg-white
                             border-amber-700 mt-1"
                                            >
                                                {/* Button - */}
                                                <button
                                                    data-action="decrement"
                                                    onClick={() => decrease(item)}
                                                    className="border-amber-600 border-2 rounded-l-lg bg-white text-gray-600 hover:text-white hover:bg-amber-600
                                        h-full w-20 cursor-pointer outline-none"
                                                >
                                                    <span className="m-auto text-2xl font-thin">−</span>
                                                </button>
                                                {/* Input quantity */}
                                                <input
                                                    type="number"
                                                    className="border-amber-600 border-t-2 border-b-2 outline-none focus:outline-none text-center w-full bg-white
                                       font-semibold text-md hover:text-black focus:text-black
                                        md:text-basecursor-default flex items-center text-gray-700"
                                                    onChange={(e) => changeQuantity(e, item)}
                                                    value={item.amount}
                                                    max={item.totalAmount}
                                                    min={1}
                                                />
                                                {/* Button + */}
                                                <button
                                                    data-action="increment"
                                                    onClick={() => increase(item)}
                                                    className="border-amber-600 border-2 bg-white text-gray-600 hover:text-white hover:bg-amber-600 rounded-r-lg
                                         h-full w-20 cursor-pointer"
                                                >
                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-base font-semibold leading-3 text-gray-600  pt-2 pb-5">
                                            {numberFormat(item.unitPrice)}
                                        </p>
                                        <div className="flex items-center pb-8">
                                            <p className="text-sm font-semibold capitalize leading-3 text-gray-500  pr-3">
                                                {item.color}
                                            </p>
                                            <p className="text-sm font-semibold uppercase leading-3 text-gray-500  border-l border-gray-300 pl-3">
                                                {item.size}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between w-full md:pt-0 pt-4">
                                            <button
                                                className="text-sm leading-3 underline text-red-500 cursor-pointer mt-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalRemoveItem"
                                                onClick={() => setIdYouWantToDel(item.id)}
                                            >
                                                Remove
                                            </button>
                                            <div
                                                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                                                id="modalRemoveItem"
                                                tabIndex={-1}
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-modal="true"
                                                role="dialog"
                                            >
                                                <div
                                                    className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                                                    <div
                                                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                                        <div
                                                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                                            <h5
                                                                className="text-xl font-medium uppercase leading-normal text-amber-700"
                                                                id="exampleModalScrollableLabel"
                                                            >
                                                                Warning
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                            />
                                                        </div>
                                                        <div className="modal-body relative p-4">
                                                            <p>Are you sure you want to remove this item ?</p>
                                                        </div>
                                                        <div
                                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                            <button
                                                                type="button"
                                                                className="inline-block px-6 py-2 border-2 border-neutral-800 text-neutral-800 font-medium text-xs
                              leading-tight uppercase rounded hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-0 transition
                              duration-150 ease-in-out mr-4"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-block px-6 py-2 border-2 border-amber-500 text-amber-600 font-medium text-xs
                              leading-tight uppercase rounded hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-0 transition
                              duration-150 ease-in-out"
                                                                data-bs-dismiss="modal"
                                                                onClick={() => onRemoveItem(idItemDel)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-md font-bold leading-3 text-gray-800">
                                                {numberFormat(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {showMore &&  <button
                                className="leading-3 float-right underline font-bold text-md text-amber-600 cursor-pointer mt-2"
                                onClick={() => viewMore()}
                            >
                                View more
                                <i class="fa fa-arrow-circle-o-down ml-2" aria-hidden="true"></i>
                            </button>}
                            {showLess &&  <button
                                className="leading-3 float-right underline font-bold text-md text-amber-600 cursor-pointer mt-2"
                                onClick={() => viewLess(itemsInCartDefault)}
                            >
                                View less
                                <i class="fa fa-arrow-circle-o-down ml-2" aria-hidden="true"></i>
                            </button>}
                        </div>
                      
                        <div className="lg:w-1/3 lg:ml-20 md:w-8/12 w-full bg-gray-100  h-full">
                            <div
                                className="flex flex-col h-auto lg:px-8 md:px-7 px-4 lg:py-16 md:py-8 py-6 justify-between overflow-y-auto">
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
                                            {shippingFee == 0 ? "Free" : numberFormat(shippingFee)}
                                        </p>
                                    </div>
                                    {subtotal < 500 && (
                                        <p className="text-sm  font-semibold leading-normal italic text-amber-700 mb-3 ">
                                            ( Shipping is free if you order $500.00 or more.
                                            )
                                        </p>)}

                                </div>
                                <div>
                                    <div
                                        className="flex items-center pb-6 justify-between lg:pt-12 py-5 pt-20 border-t border-gray-300">
                                        <p className="text-xl font-bold leading-normal text-gray-800">
                                            Total ( {itemsInCart.length}{" "}
                                            {itemsInCart.length > 1 ? "items" : "item"} )
                                        </p>
                                        <p className="text-xl font-bold leading-normal text-right text-gray-800 ">
                                            {showSpinner ?
                                                <div
                                                    className="spinner-border animate-spin inline-block w-5 h-5 border-3 rounded-full"
                                                    role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : `${numberFormat(subtotal + shippingFee)}`}
                                        </p>
                                    </div>
                                    <Link to="/checkout">
                                        <button className="text-lg leading-none w-full py-5 bg-amber-500 hover:bg-amber-600
                 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-800 text-white">
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Loading/>
                }
        </div>
    ) : (
        showEmpty && (<div className="text-center">
            <i
                className={`fa fa-shopping-cart mr-7 text-9xl text-amber-500`}
                aria-hidden="true"
            ></i>
            <p className="font-bold text-2xl capitalize mt-7">Your cart is empty</p>
            <p className="font-bold text-lg text-gray-400 mt-3 break-all">
                Looks like you haven't added anything to your cart yet
            </p>
            <div className="py-6 px-3 mt-32 sm:mt-0">
                <Link
                    to="/all-items"
                    className="bg-amber-500 active:bg-amber-600 w-1/4 h-10 py-2.5 uppercase text-white font-bold hover:shadow-md shadow text-sm   rounded-md outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{transition: "all .15s ease"}}
                >
                    Shop Now
                </Link>
            </div>
        </div>)

    );
};

export default ShoppingCart;
