import React, {useState} from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import ProductsTable from "./sections/ProductsTable";
import {Link} from "react-router-dom";

const Products = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <main>

                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="flex space-x-2 justify-center">
                                <Link to="/admin/products/add-product"
                                      type="button"
                                      data-mdb-ripple="true"
                                      data-mdb-ripple-color="light"
                                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition
                                duration-150 ease-in-out"
                                >Add Product
                                </Link>
                            </div>
                            <ProductsTable/>
                        </div>


                </main>
            </div>
        </div>
    )
}

export default Products;