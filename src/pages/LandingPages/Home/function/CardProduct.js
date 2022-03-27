import React from "react";
import { numberFormat } from "../function/FormatMoney";
const CardProduct = ({ proList, catList }) => {

    return (
        <>
            {proList.map((product) =>
                <div className="w-full h-84 p-3 border bg-white rounded-lg md:w-80 hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="bg-gray-400 h-auto rounded-t-lg relative card-product">
                        <a href="#!">
                            <div className="card-product-img">
                                <img className="image-card"
                                src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                                alt=""
                            />
                            </div>
                            
                        </a>
                       
                        <div className="flex justify-center items-center px-2 pb-2 card-icon absolute">
                            <div className="w-1/2 p-2">
                                <button className="block w-full bg-white hover:bg-amber-600
                                          border-2 border-amber-600 hover:border-inherit p-1 rounded uppercase font-poppins font-small">
                                    <svg className="h-6 w-6 stroke-amber-600 hover:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-1/2 p-2">
                                <button className="block w-full bg-white hover:bg-amber-600
                                          border-2 border-amber-600 hover:border-inherit p-1 rounded uppercase font-poppins font-small">
                                    <svg className="h-6 w-6 stroke-amber-600 hover:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-start px-2 pt-2">
                        <div className="p-2 flex-grow">
                            <h1 className="text-base text-color font-semibold">{product.name}</h1>
                            <p className="text-gray-500 text-sm font-semibold">
                                {catList.map((category) =>
                                    (category.id === product.categoryId) ? category.name : ""
                                )}
                            </p>
                        </div>
                        <div className="p-2 text-right">
                            <div className="text-amber-700 font-bold text-base">
                                {numberFormat(product.price)}
                            </div>
                            {/* <div className="text-xs text-gray-500 line-through font-poppins">
                                            $80
                                        </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CardProduct;