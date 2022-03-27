import React from "react";
import { Link } from "react-router-dom";
function Category() {
    const categoryList = [
        {
            id: 1,
            name: 'Men',

        },
        {
            id: 2,
            name: 'Women',
        },
        {
            id: 3,
            name: 'Unisex',
        },
        {
            id: 4,
            name: 'Unisex 1',
        },
        {
            id: 5,
            name: 'Unisex 1',
        },
    ];
    return (
        <section className="overflow-hidden">
            <div className="container px-5 py-2 mx-auto md:py-12 md:px-32">
                <h3 className="text-color uppercase text-center font-semibold md:text-3xl text-xl">Product's Categories</h3>
                <p className="text-color text-center mb-4 text-base">All products are warranted for 12 months</p>
                <div className="flex flex-wrap justify-center">
                    {categoryList.map((category) =>
                        <div className="flex md:flex-wrap md:w-1/5 w-1/2 flex-col category">
                            <div className="w-full p-2 md:p-4">
                                <div className="text-center">
                                    <Link to="/product-list-page">
                                        <div className="category-image mx-auto relative w-full">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                                className="rounded-full w-32 md:mb-4 mb-2 mx-auto image block"
                                                alt="Avatar"
                                            />
                                            <div class="overlay bg-gray-800 rounded-full opacity-0 inset-0 absolute h-full w-full"> </div>
                                            
                                        </div>
                                        <h5 className="md:text-xl text-lg font-semibold leading-tight mb-2 text-color">{category.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
}

export default Category;