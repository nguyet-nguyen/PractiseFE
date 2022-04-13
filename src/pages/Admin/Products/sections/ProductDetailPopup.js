import React from "react";
import Loading from "../../../../Loading";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";

const ProductDetailPopup = (products) => {
    console.log(products.products)

    return (
        products.products ?
            <div
                className="modal fade fixed top-0 left-0 hidden w-full max-h-min outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModalLg" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h2 className="font-bold text-3xl text-gray-900 uppercase">
                                Product Detail Information
                            </h2>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative">
                            {/*-----------------------------------------------*/}
                            <div className="min-w-screen flex items-center justify-center">
                                <div
                                    className="text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                                    <div className="md:flex w-full">
                                        <form className="w-full md:w-full py-8 px-5 md:px-10">
                                            <div>
                                                <div className="grid grid-cols-3 gap-4 -mx-3 mb-5">
                                                    {products.products && products.products.image.map((image, index) => (
                                                        <img
                                                            src={image}
                                                            className="p-1 h-60 w-full bg-white border rounded"
                                                            alt="..."
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex -mx-3">
                                                    <div className="w-2/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Product's Name
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-product-hunt"
                                                                   aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={products.products.name}
                                                                   id="name"
                                                                   name="name"/>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Color
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-paint-brush" aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={products.products.color}
                                                                   id="color"
                                                                   name="color"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex -mx-3">
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Price
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-money" aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="number" min="0"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={products.products.price}
                                                                   id="price"
                                                                   name='price'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Material
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={products.products.material}
                                                                   id="material"
                                                                   name='material'/>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Category
                                                        </label>
                                                        <div className="flex justify-end">
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   placeholder="Category"
                                                                   value={products.products.category}
                                                                   id="category"
                                                                   name='category'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/*    <div className="flex -mx-3">*/}
                                            {/*        {products.products && products.products.items.map((size) => (*/}
                                            {/*            <div className="w-1/3 px-3 mb-5">*/}
                                            {/*                <label htmlFor="" className="text-xs font-semibold px-1">*/}
                                            {/*                    {size.size}*/}
                                            {/*                </label>*/}
                                            {/*                <div className="flex">*/}
                                            {/*                    <div*/}
                                            {/*                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">*/}
                                            {/*                        <i className="fa fa-money" aria-hidden="true"></i>*/}
                                            {/*                    </div>*/}
                                            {/*                    <input disabled*/}
                                            {/*                           type="number" min="0"*/}
                                            {/*                           className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200*/}
                                            {/*outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}*/}
                                            {/*                           value={size.price}*/}
                                            {/*                           id="price"*/}
                                            {/*                           name='price'*/}
                                            {/*                    />*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*        ))}*/}

                                            {/*        <div className="w-1/3 px-3 mb-5">*/}
                                            {/*            <label htmlFor="" className="text-xs font-semibold px-1">*/}
                                            {/*                Material*/}
                                            {/*            </label>*/}
                                            {/*            <div className="flex">*/}
                                            {/*                <div*/}
                                            {/*                    className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">*/}
                                            {/*                    <i className="fa fa-info-circle" aria-hidden="true"></i>*/}
                                            {/*                </div>*/}
                                            {/*                <input disabled*/}
                                            {/*                       type="text"*/}
                                            {/*                       className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200*/}
                                            {/*outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}*/}
                                            {/*                       value={products.products.material}*/}
                                            {/*                       id="material"*/}
                                            {/*                       name='material'/>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*        <div className="w-1/3 px-3 mb-5">*/}
                                            {/*            <label htmlFor="" className="text-xs font-semibold px-1">*/}
                                            {/*                Category*/}
                                            {/*            </label>*/}
                                            {/*            <div className="flex justify-end">*/}
                                            {/*                <input disabled*/}
                                            {/*                       type="text"*/}
                                            {/*                       className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200*/}
                                            {/*outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}*/}
                                            {/*                       placeholder="category"*/}
                                            {/*                       value={products.products.category}*/}
                                            {/*                       id="category"*/}
                                            {/*                       name='category'/>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}

                                                <div className="flex -mx-3">
                                                    <div className="w-full px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Product's Description
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                                            </div>
                                                            <textarea id="description" name="description" disabled
                                                                      className={`w-full h-20 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                      value={products.products.description}
                                                                      placeholder="Product's Decription"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*----------------------------------------------------------*/}
                        </div>
                    </div>
                </div>
            </div>
            : null
    )
}
export default ProductDetailPopup;