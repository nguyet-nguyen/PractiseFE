
import React, { useEffect, useState } from "react";
import { getProductDetail, addToCart, getAllItemsInCart } from "../../../../features/Api";
import { useParams, useNavigate } from "react-router-dom";
import { numberFormat } from "../../Home/function/FormatMoney";
import Loading from "../../../../Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomPopupMessage from "../../../CustomPopupMess";

const ItemDetail = () => {
    let params = useParams();
    const [itemDetail, setItemDetail] = useState();
    const [itemsInCart, setItemsInCart] = useState([]);
    const [sizeState, setSizeState] = useState();
    const [sizeAmount, setSizeAmount] = useState(1);
    const [counter, setCounter] = useState(1);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetail(params.id)
            .then(res => {
                setItemDetail(res.data);
                setSizeState(res.data.items[0].id);
                setSizeAmount(res.data.items[0].amount);
                if(token){
                    getAllItemsInCart()
                    .then((res) => {
                        setItemsInCart(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const increase = () => {
        if (counter < sizeAmount) {
            setCounter(Number(counter) + 1);
        }
    };

    //decrease counter
    const decrease = () => {
        if (counter > 1) {
            setCounter(count => count - 1);
        }
    };

    const changeSize = (id) => {
        setSizeState(Number(id));

        itemDetail.items.map((size) => {
            if (size.id == id) {
                setSizeAmount(size.amount);
                if (counter > size.amount) {
                    setCounter(size.amount);
                }
            }
        })
    };

    const changeQuantity = (e) => {
        const quantity = e.target.value;
        if (quantity > sizeAmount) {
            setCounter(sizeAmount);
        }
        // else if (quantity == 0) {
        //     setCounter(1);
        // }
        else {
            setCounter(quantity);
        }
    }

    const onAddToCart = (item) => {
        if(token){ 
            setShowSpinner(true);
            const existingItem = itemsInCart.find((i) => {
                return i.idProductItem == sizeState;
            });
            if(existingItem){
                const totalQtyOrd = existingItem.amount + counter;
                if (existingItem.totalAmount < totalQtyOrd) {
                    toast(<CustomPopupMessage mess={`The product's quantity for this order has been exceeded`} icon="exclamation-circle"
                    titleColor="red"
                    iconColor="red"/>);

                    setShowSpinner(false);
                }else{
                    const total = itemDetail.price * counter;
                    const data = {
                    "productItem": sizeState,
                    "amount": counter,
                    "total": total
                    };
                addToCart(data)
                    .then(res => {
                        toast(<CustomPopupMessage mess={`${itemDetail.name} has been added to your cart.`} icon="check-circle"
                        titleColor="amber"
                        iconColor="amber"/>);
                        setShowSpinner(false);    
                    })
                    .catch(err => {
                        console.log(err);
                        setShowSpinner(false);    
                    })
                }
            }
             else {
                const total = itemDetail.price * counter;
                const data = {
                    "productItem": sizeState,
                    "amount": counter,
                    "total": total
                };
                addToCart(data)
                    .then(res => {
                        toast(<CustomPopupMessage mess={`${itemDetail.name} has been added to your cart.`} icon="check-circle"
                        titleColor="amber"
                        iconColor="amber"/>);
                        setShowSpinner(false);    
                    })
                    .catch(err => {
                        console.log(err);
                        setShowSpinner(false);    
                    })
            }
        }else{
            $("#modalWarningToken").modal("show");
        }
      

    }

    const goBack = () => {
        $("#modalWarningToken").modal("hide");
    }
    
    const goSignInPage = () => {
        $("#modalWarningToken").modal("hide");
        navigate("/pages/authentication/sign-in");
    }

    return (
        itemDetail ?
            <section id="ProductDetail" className="text-gray-600 body-font overflow-hidden ItemDetail rounded-lg">
                <div className="container p-10 mx-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-auto">
                        <div
                            id="carouselDarkVariant"
                            className="itemDetail-image carousel slide carousel-fade carousel-dark relative"
                            data-bs-ride="carousel">
                            {/* Indicators */}
                            <div
                                className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                                {itemDetail && itemDetail.images.map((image, index) =>
                                    <button key={index} data-bs-target="#carouselDarkVariant" data-bs-slide-to={index}
                                        className="active"
                                        aria-current="true" aria-label="Slide 1"
                                    />
                                )}
                            </div>
                            <div className="carousel-inner relative w-full h-full overflow-hidden rounded-lg">
                                {itemDetail && itemDetail.images.map((image, index) => (
                                    <div
                                    key={index}
                                        className={`image-detail carousel-item relative  float-left w-full h-full ${index == 0 ? "active" : ""} `}>
                                        <img
                                            src={image}
                                            className="block w-full h-full object-top object-cover"
                                            alt="Motorbike Smoke"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev text-white absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon inline-block bg-no-repeat"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next text-white absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"
                                data-bs-target="#carouselDarkVariant"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon inline-block bg-no-repeat"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* ------------------------------------------------------------- */}
                        <div className="w-full md:pl-10 md:py-5 mt-4 md:mt-0">
                            <p className="text-sm text-gray-500 uppercase mb-5">
                                Material: {itemDetail.material}
                            </p>
                            <h2 className="text-gray-900 text-3xl font-bold uppercase mb-5">
                                {itemDetail.name}
                            </h2>
                            <h2 className="text-amber-700 text-3xl font-bold mb-5">
                                {numberFormat(itemDetail.price)}
                            </h2>

                            <div className="border-solid border-b-2 border-gray-100 my-5"></div>
                            <div className="flex">
                                <span className="mr-2 text-base text-gray-500">Color: </span>
                                <span className="text-base capitalize text-amber-700">{itemDetail.color}</span>
                            </div>
                            <div className="flex">
                                <span className="mr-2 capitalize text-base text-gray-500">Category: </span>
                                <span className="text-base text-amber-700">{itemDetail.category}</span>
                            </div>
                            <div className="flex justify-between my-6 items-center">

                                <div className="flex items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select onChange={e => changeSize(e.target.value)} className="rounded border appearance-none border-amber-600 py-2 focus:outline-none
                                    focus:ring-2 focus:ring-amber-500 focus:border-amber-600 text-base pl-3 pr-10">
                                            {itemDetail && itemDetail.items.map((size) => (
                                                <option key={size.id} id={size.id} value={size.id}>{size.size}</option>
                                            ))}
                                        </select>
                                        <span
                                            className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex">
                                    {sizeAmount==0 && <span className="mr-2 text-base rotate-12 font-semibold text-red-500 border-2 border-red-500 p-2 uppercase">Sold out</span>}
                                    {sizeAmount != 0 && <span className="mr-2 text-base text-gray-500">Amount items:</span>}
                                    {itemDetail && sizeAmount !=0 && itemDetail.items.map((size) => (
                                        <span key={size.id} className="text-base text-bold text-amber-700">
                                            {size.id == sizeState && size.amount}
                                        </span>

                                    ))}
                                </div>

                            </div>


                            <div className="flex my-6 items-center">
                                <label className="text-gray-700 text-sm font-semibold">Quantity
                                </label>
                                <div className="flex ml-5 w-40 h-10  bg-white
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
                                        value={counter} max={sizeAmount} min={1}
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


                            <div className="flex justify-center mb-8">
                                <button
                                    type="button"
                                    onClick={() => onAddToCart(itemDetail)}
                                    disabled= {sizeAmount==0}
                                    className="inline-block px-6 py-4 border-2 border-amber-600 text-amber-600 font-semibold text-base leading-tight
                                 uppercase rounded-full w-full
                                hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-0
                                transition duration-150 ease-in-out disabled:bg-gray-300 disabled:text-white disabled:border-gray-300">
                                    Add to cart
                                    {showSpinner && <div className="spinner-border animate-spin inline-block w-4 h-4 border-3 ml-2 rounded-full" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}
                                </button>

                                
                            </div>
                            <p className="text-base text-gray-500 ">
                                {itemDetail.description}
                            </p>
                        </div>
                    </div>
                </div>
                   {/* <!-- Modal --> */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalWarningToken"
        tabIndex="-1"
        aria-labelledby="modalWarningTokenLabel"
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
                  className={`fa fa-frown-o text-5xl text-amber-500`}
                  aria-hidden="true"
                ></i>
                <p className="font-bold text-xl uppercase mt-5">
                  Sorry
                </p>
                <p className="text-base mt-2">
                    As an unlogged user you can not add more products to cart. 
                </p>
                <p className="text-base  mt-1">
                    Please sign in to continue add to cart process.{" "} 
                </p>
              </div>
              
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-between p-4 mt-2 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5  border border-amber-500 text-amber-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:border-amber-600 hover:shadow-lg focus:border-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:border-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={goBack}
              >
                Back
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-amber-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={goSignInPage}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
            </section>
            : <Loading />

    );
}

export default ItemDetail;
