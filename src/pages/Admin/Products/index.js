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

            <ProductsTable/>


                </main>
            </div>
        </div>
    )
}

export default Products;