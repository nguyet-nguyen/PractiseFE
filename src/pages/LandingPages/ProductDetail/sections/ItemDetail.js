import React, {useEffect, useState} from "react";
import {getProductDetail} from "../../../../features/Api";
import {useParams} from "react-router-dom";
import {numberFormat} from "../../Home/function/FormatMoney";
import Loading from "../../../../Loading";

const ItemDetail = () => {
    let params = useParams();
    const [itemDetail, setItemDetail] = useState();
    const [sizeState, setSizeState] = useState();
    const [sizeAmount, setSizeAmount] = useState(1);

    useEffect(() => {
        getProductDetail(params.id)
            .then(res => {
                setItemDetail(res.data);
                setSizeState(res.data.items[0].id);
                setSizeAmount(res.data.items[0].amount)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const [counter, setCounter] = useState(1);
    const increase = () => {
        if (counter < sizeAmount)
        setCounter(count => count + 1);
    };
    //decrease counter
    const decrease = () => {
        if (counter >0){
            setCounter(count => count - 1);
        }
    };
    const changeSize = (id) => {
        setSizeState(id);

        itemDetail.items.map((size) => {
            if (size.id == id){
                setSizeAmount(size.amount)
            }
        })

    };
    //console.log(itemDetail);
    return (
        itemDetail ?
            <section className="text-gray-600 body-font overflow-hidden ItemDetail rounded-lg">
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
                                    <button data-bs-target="#carouselDarkVariant" data-bs-slide-to={index}
                                            className="active"
                                            aria-current="true" aria-label="Slide 1"
                                    />
                                )}
                            </div>
                            <div className="carousel-inner relative w-full h-full overflow-hidden rounded-lg">
                                {itemDetail && itemDetail.images.map((image, index) => (
                                    <div
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
                                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="prev"
                            >
                            <span
                                className="carousel-control-prev-icon inline-block bg-no-repeat"
                                aria-hidden="true"
                            />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
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
                                <span className="text-base text-amber-700">{itemDetail.color}</span>
                            </div>
                            <div className="flex justify-between my-6 items-center">

                                <div className="flex items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select onChange={e => changeSize(e.target.value)} className="rounded border appearance-none border-amber-600 py-2 focus:outline-none
                                    focus:ring-2 focus:ring-amber-500 focus:border-amber-600 text-base pl-3 pr-10">
                                            {itemDetail && itemDetail.items.map((size) => (
                                                <option id={size.id} value={size.id}>{size.size}</option>
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
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                    </span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="mr-2 text-base text-gray-500">Amount items:</span>
                                    {itemDetail && itemDetail.items.map((size) => (
                                        <span className="text-base text-bold text-amber-700">
                                        {size.id == sizeState && size.amount}
                                    </span>

                                    ))}
                                </div>

                            </div>


                            <div className="flex my-6 items-center">
                                <label className="text-gray-700 text-sm font-semibold">Counter
                                    Input
                                </label>
                                <div className="flex ml-5 w-40 h-10  bg-white
                             border-amber-700 mt-1">
                                    <button data-action="decrement"
                                            onClick={decrease}
                                            className="border-amber-600 border-2 rounded-l-lg bg-white text-gray-600 hover:text-white hover:bg-amber-600
                                        h-full w-20 cursor-pointer outline-none">
                                        <span className="m-auto text-2xl font-thin">−</span>
                                    </button>
                                    <input type="number"
                                           className="border-amber-600 border-t-2 border-b-2 outline-none focus:outline-none text-center w-full bg-white
                                       font-semibold text-md hover:text-black focus:text-black
                                        md:text-basecursor-default flex items-center text-gray-700 outline-none"
                                           value={counter} max={sizeAmount} min={0}/>
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
                                    className="inline-block px-6 py-4 border-2 border-amber-600 text-amber-600 font-semibold text-base leading-tight
                                 uppercase rounded-full w-full
                                hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-0
                                transition duration-150 ease-in-out">
                                    Add to cart
                                </button>
                            </div>
                            <p className="text-base text-gray-500 ">
                                {itemDetail.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            : <Loading/>
    );
}

export default ItemDetail;