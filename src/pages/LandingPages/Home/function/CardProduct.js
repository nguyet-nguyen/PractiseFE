import React from "react";
import { numberFormat } from "../function/FormatMoney";
import { Link } from "react-router-dom";

const CardProduct = ({ proList, homePage }) => {
    console.log(proList)
    if (!homePage)
        return proList ? (
            <>
                {proList.map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} w-full h-84 p-2 border bg-white rounded-lg md:w-72 hover:shadow-lg 
                    transition duration-300 ease-in-out`}>
                        <Link to={`/all-items/item-detail/${product.id}`}>
                        <div className="bg-gray-400 h-auto rounded-t-lg relative card-product">
                            <Link to={`/all-items/item-detail/${product.id}`} className="card-product-img">
                                <img className="image-card hover:opacity-75"
                                    src={product.image[0]}
                                    alt=""
                                />
                            </Link>

                            <div className="flex justify-center items-center px-2 pb-2 card-icon absolute">
                                <div className="w-full p-2">
                                    <Link to={`/all-items/item-detail/${product.id}`}
                                          className="block w-9 bg-white hover:bg-amber-600
                                            border-2 border-amber-600 hover:border-inherit p-1 rounded
                                            uppercase font-small icon-seemore">
                                        <svg className="h-6 w-6 stroke-amber-600"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </Link>
                                </div>
                                {/*<div className="w-1/2 p-2">*/}
                                {/*    /!*<button className="block w-full bg-white hover:bg-amber-600*!/*/}
                                {/*    /!*        border-2 border-amber-600 hover:border-inherit p-1 rounded uppercase font-small">*!/*/}
                                {/*    /!*    <svg className="h-6 w-6 stroke-amber-600 hover:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>*!/*/}
                                {/*    /!*        <path strokeLinecap="round" strokeLinejoin="round"*!/*/}
                                {/*    /!*            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />*!/*/}
                                {/*    /!*    </svg>*!/*/}
                                {/*    /!*</button>*!/*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="mx-auto text-center py-2 px-2">
                            <Link to={`/all-items/item-detail/${product.id}`} className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
                                {product.name}
                            </Link>
                            <p className="productPrice font-bold md:text-base text-sm lining-nums text-amber-700">
                                {numberFormat(product.price)}
                            </p>
                        </div>
                        </Link>
                    </div>
                )}
            </>
        ) : null
    else
        return proList ? (
            <>
                {proList.slice(0, 8).map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} w-full h-84 p-2 border bg-white rounded-lg md:w-72 hover:shadow-lg 
                    transition duration-300 ease-in-out`}>
                        <Link to={`/all-items/item-detail/${product.id}`}>
                            <div className="bg-gray-400 h-auto rounded-t-lg relative card-product">
                                <Link to={`/all-items/item-detail/${product.id}`} className="card-product-img">
                                    <img className="image-card hover:opacity-75"
                                         src={product.image[0]}
                                         alt=""
                                    />
                                </Link>

                                <div className="flex justify-center items-center px-2 pb-2 card-icon absolute">
                                    <div className="w-full p-2">
                                        <Link to={`/all-items/item-detail/${product.id}`}
                                              className="block w-9 bg-white hover:bg-amber-600
                                            border-2 border-amber-600 hover:border-inherit p-1 rounded
                                            uppercase font-small icon-seemore">
                                            <svg className="h-6 w-6 stroke-amber-600"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </Link>
                                    </div>
                                    {/*<div className="w-1/2 p-2">*/}
                                    {/*    /!*<button className="block w-full bg-white hover:bg-amber-600*!/*/}
                                    {/*    /!*        border-2 border-amber-600 hover:border-inherit p-1 rounded uppercase font-small">*!/*/}
                                    {/*    /!*    <svg className="h-6 w-6 stroke-amber-600 hover:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>*!/*/}
                                    {/*    /!*        <path strokeLinecap="round" strokeLinejoin="round"*!/*/}
                                    {/*    /!*            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />*!/*/}
                                    {/*    /!*    </svg>*!/*/}
                                    {/*    /!*</button>*!/*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="mx-auto text-center py-2 px-2">
                                <Link to={`/all-items/item-detail/${product.id}`} className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
                                    {product.name}
                                </Link>
                                <p className="productPrice font-bold md:text-base text-sm lining-nums text-amber-700">
                                    {numberFormat(product.price)}
                                </p>
                            </div>
                        </Link>
                    </div>
                )}
            </>
        ) : null
}

export default CardProduct;