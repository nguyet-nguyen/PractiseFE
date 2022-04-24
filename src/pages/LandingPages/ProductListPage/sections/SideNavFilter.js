import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getAllCategory } from "features/Api";
import { requestFilterCategory } from "features/Api";

const SideNavFilter = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded);
        if (sidebarExpanded) {
            document.querySelector('body').classList.add('sidebar-expanded');
        } else {
            document.querySelector('body').classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);
    const [categoryList, setCategoryList] = useState([]);
    getAllCategory()
        .then((response) => {
            setCategoryList(response.data);
        })
        .catch((err) => {
            console.warn(err);
        });
    requestFilterCategory()
        .then(response => {
            setProductListFilter(response.data);
        })
        .catch(err => {
            console.log(err)
        })
    const getcategoryId = (e) => {
        const data = {
            category: e.target.value,
        }
        requestFilterCategory(data)
            .then(response => {
                setProductListFilter(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='-left-4'>
            <div className={`md:fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col items-center justify-center absolute bg-white z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto
                 lg:translate-x-0 transform h-auto overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 
                 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 transition-all 
                 duration-200 ease-in-out  ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
                {/* Sidebar header */}
                <div className="flex justify-between items-center pr-3 sm:px-2 hidden">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-slate-500 hover:text-slate-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                </div>
                
                {/* Links */}
                <div className="border-2 rounded-md border-solid border-zinc-300 p-5">
                    {/* Pages group */}

                    <div>
                        <h3 className="uppercase text-slate-500 font-bold flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                            <span className="text-amber-700 ml-3 text-lg lg:hidden lg:sidebar-expanded:block 2xl:block uppercase">All Categories</span>
                        </h3>
                        <ul className="mt-3">
                            {categoryList.map((category) =>
                            <li key={category.id} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                                        rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                                        transition duration-200 mt-1 align-top bg-no-repeat bg-center 
                                        bg-contain float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        defaultValue=""
                                        id={`category-${category.id}`}
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800 capitalize"
                                        htmlFor="flexCheckDefault"
                                    >
                                        {category.name}
                                    </label>
                                </div>
                            </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="uppercase text-slate-500 font-bold flex mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                            <span className="text-amber-700 ml-3 text-lg lg:hidden lg:sidebar-expanded:block 2xl:block uppercase">price level</span>
                        </h3>
                        <ul className="mt-3">
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                                        rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                                        transition duration-200 mt-1 align-top bg-no-repeat bg-center 
                                        bg-contain float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        defaultValue=""
                                        id={1}
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800 capitalize"
                                        htmlFor="flexCheckDefault">
                                        Under 1.000.000đ
                                    </label>
                                </div>
                            </li>
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                                        rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                                        transition duration-200 mt-1 align-top bg-no-repeat bg-center 
                                        bg-contain float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        defaultValue=""
                                        id={2}
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800 capitalize"
                                        htmlFor="flexCheckDefault">
                                        1.000.000đ - 3.000.000đ
                                    </label>
                                </div>
                            </li>
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 
                                        rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                                        transition duration-200 mt-1 align-top bg-no-repeat bg-center 
                                        bg-contain float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        defaultValue=""
                                        id={3}
                                    />
                                    <label
                                        className="form-check-label inline-block text-gray-800 capitalize"
                                        htmlFor="flexCheckDefault">
                                        3.000.000đ - 5.000.000đ
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavFilter;