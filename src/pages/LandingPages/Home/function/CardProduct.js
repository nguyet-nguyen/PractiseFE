import React from "react";
import {numberFormat} from "../function/FormatMoney";
import {Link} from "react-router-dom";

const CardProduct = ({proList, homePage, hotDeal}) => {
    if (!homePage)
        return proList ? (
            <>
                {proList && proList.map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} mx-auto w-full h-84 p-2 bg-white 
                    transition duration-300 ease-in-out`}>
                        <Link to={`/all-items/item-detail/${product.id}`}>
                            <div className="category-image relative overflow-hidden w-60 w-72 mx-auto rounded-md">
                                <img className="w-full h-full image block"
                                     src={product.image[0]}
                                     alt=""
                                />
                            </div>
                        </Link>
                        <div className="mx-auto text-center py-2 px-2">
                            <Link to={`/all-items/item-detail/${product.id}`}
                                  className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
                                {product.name}
                            </Link>
                            <p className="productPrice font-bold md:text-base text-sm lining-nums text-amber-700">
                                {numberFormat(product.price)}
                            </p>
                        </div>
                    </div>
                )}
            </>
        ) : null
    else
        return proList ? (
            <>
                {proList && proList.slice(0, 8).map((product, index) =>
                    <div key={product.id} className={`ProductCard cardProduct-${index} mx-auto w-full h-84 p-2 bg-white 
                    transition duration-300 ease-in-out`}>
                        <Link to={`/all-items/item-detail/${product.id}`}>
                            <div className="category-image relative overflow-hidden w-60 w-72 mx-auto rounded-md">
                                <img className="w-full h-full image block"
                                     src={product.image[0]}
                                     alt=""
                                />
                                {hotDeal == true ?
                                    <span
                                        className="px-2 z-50 p-1 rounded-md border absolute top-2 right-2 bg-amber-600
                                            text-white font-semibold text-sm align-center flex items-center opacity-90
                                            w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                        {product.totalQuantity} sold
                                          </span>
                                    : <span
                                        className="px-2 z-50 p-1 rounded-md border absolute top-2 right-2 bg-amber-600
                                            text-white font-semibold text-sm align-center flex items-center opacity-90
                                            w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                        New
                                          </span>
                                }
                            </div>

                        </Link>
                        <div className="mx-auto text-center py-2 px-2">
                            <Link to={`/all-items/item-detail/${product.id}`}
                                  className="productName md:text-base text-xs text-color font-semibold hover:text-amber-700 uppercase">
                                {product.name}
                            </Link>
                            <p className="productPrice font-bold md:text-base text-sm lining-nums text-amber-700">
                                {numberFormat(product.price)}
                            </p>
                        </div>
                    </div>
                )}
            </>
        ) : null
}

export default CardProduct;