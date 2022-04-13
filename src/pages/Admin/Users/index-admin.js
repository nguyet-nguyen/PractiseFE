import React, {Component, useState} from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import UsersTable from "./sections/UserTable";
import AdminTable from "./sections/AdminTable";

const Admins = () => {

    const dataSet = [
        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],

    ];
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
                        <table className="display" width="100%" >
                        </table>
                        <AdminTable/>
                    </div>
                </main>
            </div>
        </div>
    );


}

export default Admins;