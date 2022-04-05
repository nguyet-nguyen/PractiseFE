import { getAllCategory } from "features/Api";
import React, { useState, useEffect } from 'react';
import CardProduct from "pages/LandingPages/Home/function/CardProduct";
import { requestFilterCategory } from "features/Api";
import Loading from "../../../../Loading";
const ListPage = ({ sidebarOpen, setSidebarOpen,categoryList}) => {
    const [productListFilter, setProductListFilter] = useState([]);

    useEffect(() => {
        setLoading(true);
        requestFilterCategory()
            .then(response => {
                setLoading(false)
                setProductListFilter(response.data);
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }, []);
    const [loading, setLoading] = useState(false);
    const getcategoryId = (e) => {
        setLoading(true);
        const data = {
            category: e.target.value,
        }
        requestFilterCategory(data)
            .then(response => {
                setLoading(false)
                setProductListFilter(response.data);
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div id="listPage-productList">
            { loading ? <Loading /> : "" }
            <button
                className="lg:hidden buttonSideNav bg-amber-600 p-2 rounded-r-md 
                text-white"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex justify-between">
                <h2 className="font-bold text-color leading-tight text-3xl mb-2 text-center uppercase">All Items</h2>
                <div className="w-52 w-full">
                    <select onChange={getcategoryId}
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none capitalize"
                        aria-label="Default select example">
                        {categoryList.map((category) =>
                            <option id={category.id} value={category.id} className="p-2 m-2 capitalize">{category.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-6 md:mt-6 mt-3">
                <CardProduct proList={productListFilter} />
            </div>
        </div>
    );
}

export default ListPage;