import { getAllCategory } from "features/Api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Category() {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    });
    return (
        <section className="overflow-hidden">
            <div className="container px-5 py-2 mx-auto md:py-12 md:px-32">
                <h3 className="text-color uppercase text-center font-semibold md:text-3xl text-xl">Product's Categories</h3>
                <p className="text-color text-center mb-4 text-base">All products are warranted for 12 months</p>
                <div className="flex flex-wrap justify-center">
                    {categoryList.map((category, index) =>
                    (index > 0) ?
                        <div className="flex md:flex-wrap md:w-1/5 w-1/2 flex-col category">
                            <div className="w-full p-2 md:p-4">
                                <div className="text-center">
                                    <Link to="/product-list-page">
                                        <div className="category-image mx-auto relative w-56 h-56 md:mb-4 mb-2">
                                            <img
                                                src={category.image}
                                                className="rounded-full w-full h-full image block"
                                                alt="Avatar"
                                            />
                                            <div class="overlay bg-gray-800 rounded-full opacity-0 inset-0 absolute h-full w-full"> </div>
                                        </div>
                                        <h5 className="md:text-xl text-lg font-semibold leading-tight text-color hover:text-amber-700">{category.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div> : ''
                    )}
                </div>
            </div>
        </section>
    );
}

export default Category;