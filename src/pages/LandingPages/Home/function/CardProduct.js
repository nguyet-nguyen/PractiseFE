import React from "react";
import {numberFormat} from "../function/FormatMoney";
import {Link} from "react-router-dom";

const CardProduct = ({proList, homePage, hotDeal}) => {
    if (!homePage)
        return proList ? (
            <>
                {proList && proList.map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} mx-auto w-full h-84 p-2 border bg-white rounded-lg md:w-72 hover:shadow-lg 
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
                                             <i className="fa fa-eye text-amber-600 font-bold pl-1 " aria-hidden="true"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto text-center py-2 px-2">
                                <Link to={`/all-items/item-detail/${product.id}`}
                                      className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
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
                {proList && proList.slice(0, 8).map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} mx-auto w-full h-84 p-2 border bg-white rounded-lg md:w-72 hover:shadow-lg 
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
                                              className="block w-9 bg-white hover:bg-amber-600 mx-auto
                                            border-2 border-amber-600 hover:border-inherit p-1 rounded
                                            uppercase font-small icon-seemore">
                                            <i className="fa fa-eye text-amber-600 font-bold pl-1 " aria-hidden="true"></i>
                                        </Link>
                                    </div>

                                </div>
                                {hotDeal ==true ?

                                    <span
                                        className="px-2 z-50 p-1 rounded-full border border-white absolute top-1 right-1 bg-amber-600
                                            text-white font-semibold text-sm flex align-center flex items-center opacity-90
                                            w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                        {product.totalQuantity} sold
                                          </span>
                                    : null
                                }

                            </div>
                            <div className="mx-auto text-center py-2 px-2">
                                <Link to={`/all-items/item-detail/${product.id}`}
                                      className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
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