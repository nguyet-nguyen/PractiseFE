import React, { useState, useEffect } from "react";
import CardProduct from "../function/CardProduct";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../../features/Api";
import { getAllCategory } from "features/Api";

function ProductList() {
    const [productList, setproductList] = useState();
    const [categoryList, setCategoryList] = useState();
    const [productListFilter, setProductListFilter] = useState(productList);

    useEffect(() => {
        getAllProducts()
            .then((response) => {
                setproductList(response.data);
                setProductListFilter(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);
    var arrProduct = [];
    const getcategoryId = (e) => {
        // console.log(e.target.value);
        productList.forEach((item) => {
            if (item.category == e.target.value) {
                arrProduct.push(item);
            } else if (e.target.value == "All Items") {
                arrProduct.push(item);
            };
        });
        setProductListFilter(arrProduct);
    }
    return (
            <div id="productListHome" className="md:mt-16 mt-5">
                <div className="flex justify-between items-center md:flex-wrap  w-full mb-2">
                    <span className="md:text-3xl text-xl font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 stroke-amber-600 fill-amber-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-color">New Items</span>
                    </span>
                    <ul className="nav nav-tabs md:flex flex-col md:flex-row flex-wrap list-none 
                    border-b-0 pl-0 hidden" id="tabs-tab"
                        role="tablist">
                        {categoryList && categoryList.map((category, index) =>
                            <li className="nav-item nav-category mx-2" role="presentation" onClick={getcategoryId}>
                                <button type="button" className={`nav-link block font-semibold text-sm leading-tight uppercase border-x-0 
                               border-t-0 border-b-2 hover:border-amber-600 focus:border-amber-600
                               border-transparent px-6 py-3 hover:border-transparent hover:text-amber-700 focus:text-amber-700
                               focus:border-transparent ${(index == 0) ? "active" : ""}`} id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
                                    aria-selected="true" value={category.name}>{category.name}</button>
                            </li>
                        )}
                    </ul>
                    <div className="flex justify-center md:hidden">
                        <div className="xl:w-96">
                            <select onChange={getcategoryId} className="form-select appearance-none block w-full px-5 py-1.5 text-base font-medium 
                            text-amber-600 bg-white bg-clip-padding bg-no-repeat border border-2 capitalize
                            border-solid border-amber-600 rounded transition ease-in-out mx-2 focus:text-white
                            focus:bg-white focus:text-amber-600 focus:border-amber-600 focus:outline-none focus:shadow-inner" aria-label="Default select example">
                                {categoryList && categoryList.map((category) =>
                                <option id={category.id} value={category.name} className="p-2 m-2 capitalize">{category.name}</option>
                            )}
                            </select>
                        </div>
                    </div>

                    <Link to="/all-items" className="md:flex items-center transition duration-300 ease-in-out hover:text-amber-600 hidden">
                        See All Product
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-6 md:mt-6 mt-3">
                    <CardProduct proList={productListFilter} homePage={true} />
                </div>
                <div className="flex justify-center items-c md:hidden">
                    <Link to="/all-items/1" type="button" className="inline-block px-6 py-2 mt-5 border-2 border-amber-700 text-amber-700 font-medium
                    text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 
                    transition duration-100 ease-in-out">See More</Link>
                </div>
            </div>
    );
}

export default ProductList;
