import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Profile from './sections/Profile';

const AdminProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className=" w-full max-w-9xl">
                        {/* Profile */}
                        <Profile />
                    </div>
                </main>


            </div>
        </div>
    );
}
export default AdminProfile;