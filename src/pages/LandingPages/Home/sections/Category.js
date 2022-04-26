import React, { useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Category = ({categoryList}) => {

    return (
        <div id="categoryHome">
            <h3 className="text-color uppercase text-center font-semibold md:text-3xl text-xl">Product's Categories</h3>
            <p className="text-color text-center mb-4 text-base product-desc">All products are warranted for 12 months</p>
            <div className="flex flex-wrap md:justify-center justify-start">
                {categoryList && categoryList.map((category, index) =>
                    (index > 0) ?
                        <div key={category.id} className={`flex md:flex-wrap md:w-1/5 w-1/2 flex-col category category-${index}`}>
                            <div className="w-full p-2 md:p-4">
                                <div className="text-center">
                                    <Link to={`/all-items/${category.id}`}>
                                        <div className="category-image relative overflow-hidden
                                         mx-auto md:w-56 md:h-56 w-32 h-32 md:mb-4 mb-2 ">
                                            <img
                                                src={category.image}
                                                className="rounded-full w-full h-full image block"
                                                alt="Avatar"
                                            />
                                            <div className="overlay bg-gray-800 rounded-full opacity-0 inset-0 absolute h-full w-full"> </div>
                                        </div>
                                        <h5 className="md:text-xl text-base font-semibold leading-tight text-color hover:text-amber-700">{category.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div> : ''
                )}
            </div>
        </div>



    );
}

export default Category;