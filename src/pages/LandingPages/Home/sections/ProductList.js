import React from "react";
import CardProduct from "../function/CardProduct";
import { Link } from "react-router-dom";

function ProductList() {
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
    const productList = [
        {
            id: 1,
            name: 'Item 1',
            price: 300000,
            categoryId: 1
        },
        {
            id: 2,
            name: 'Item 2',
            price: 300000,
            categoryId: 2
        },
        {
            id: 3,
            name: 'Item 3',
            price: 300000,
            categoryId: 1
        },
        {
            id: 4,
            name: 'Item 4',
            price: 300000,
            categoryId: 2
        },
        {
            id: 5,
            name: 'Item 5',
            price: 300000,
            categoryId: 2
        },
        {
            id: 6,
            name: 'Item 6',
            price: 300000,
            categoryId: 1
        },
    ];
    return (
        <section>
            <div className="container min-h-screen mx-auto">
                <div className="w-96 my-12 h-auto transition-all rounded-lg md:w-full p-4">
                    {/* <div className="relative">
                        <input
                            className="w-full h-12 text-sm outline-none border mt-3 rounded-lg transition-all pl-7 pr-20 focus:border-blue-600"
                            type="text"
                            placeholder="Search tasks like product pages,product photos etc."
                        />
                        <i className="absolute top-7 text-[#bfc6cd] left-2 fa fa-search" />
                        <button className="absolute right-2 rounded-lg cursor-pointer transition-all hover:bg-blue-900 top-4 h-10 w-16 bg-blue-500 text-white text-sm">
                            Search
                        </button>
                    </div> */}
                    <div className="md:flex md:justify-between md:items-center md:flex-wrap justify-start items-center w-full px-16 mb-2">
                        <span className="md:text-3xl text-xl font-bold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 stroke-amber-600 fill-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-color">New Items</span>
                        </span>
                        <Link to="/product-list-page" className="md:flex items-center transition duration-300 ease-in-out hover:text-amber-600 hidden">
                            See All Product
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className="border-solid border-b-2 border-neutral-100 mx-16"></div>
                   
                    <div className="md:flex md:justify-evenly md:flex-wrap gap-6 md:mt-6 mt-3">
                        <CardProduct proList={productList} catList={categoryList} />
                    </div>
                    <div className="flex justify-center items-c md:hidden">
                        <button type="button" class="inline-block px-6 py-2 mt-5 border-2 border-amber-700 text-amber-700 font-medium 
                    text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
                    transition duration-100 ease-in-out">See More</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductList;
