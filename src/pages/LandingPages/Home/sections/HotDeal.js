import React, { useState, useEffect } from "react";
import CardProduct from "../function/CardProduct";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../../features/Api";

function HotDeal() {
    const [productList, setproductList] = useState([]);

    useEffect(() => {

        getAllProducts()
            .then((response) => {
                setproductList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    },[]);
    return (
        <section id="HotDealHome">
            <div className="md:flex md:justify-between md:items-center md:flex-wrap justify-start items-center w-full mb-2">
                <span className="md:text-3xl text-xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 stroke-amber-600 fill-amber-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-color">Hot Deals</span>
                </span>
                <Link to="/product-list-page" className="md:flex items-center transition duration-300 ease-in-out hover:text-amber-600 hidden">
                    See All Product
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
            <div className="border-solid border-b-2 border-neutral-100"></div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-6 md:mt-6 mt-3">
                <CardProduct proList={productList} homePage={true} />
            </div>
            <div className="flex justify-center items-c md:hidden">
                <button type="button" className="inline-block px-6 py-2 mt-5 border-2 border-amber-700 text-amber-700 font-medium 
                    text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
                    transition duration-100 ease-in-out">See More</button>
            </div>
        </section>
    );
}

export default HotDeal;
