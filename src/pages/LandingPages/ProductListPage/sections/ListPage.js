import {getAllCategory, getAllProducts, getAllUsers} from "features/Api";
import React, {useState, useEffect, useRef} from 'react';
import CardProduct from "pages/LandingPages/Home/function/CardProduct";
import {requestFilterCategory} from "features/Api";
import Loading from "../../../../Loading";
import {useLocation, useNavigate} from "react-router-dom";
import {numberFormat} from "pages/LandingPages/Home/function/FormatMoney";
import {useParams} from "react-router-dom";
import {Navigate} from 'react-router-dom';
import emptyList from "./../../../../../src/assets/images/logos/emptyList.JPG"

const ListPage = ({sidebarOpen, setSidebarOpen, categoryList}) => {
    const location = useLocation();
    const {pathname} = location;
    let params = useParams();
    const navigate = useNavigate();
    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}) => {
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
    // ----------------------------------
    const [productListFilter, setProductListFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageItem, setPageItem] = useState(1);
    const [cate, setCate] = useState(params.id);
    useEffect(() => {
        setLoading(true);
        requestFilterCategory(data, pageItem, 6)
            .then((response) => {
                if (response.data.data.length <= 0) {
                    setCate(1);
                    navigate("/all-items/1");
                } else if (response.data.data.length > 0) {
                    setCate(params.id);
                }
                setLoading(false);
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }

            })
            .catch((err) => {
                setLoading(false)
                console.warn(err);
            });
    }, []);
    // -------------pagination--------------
    const changePage = (item) => {
        setPageItem(item)
        requestFilterCategory(data, item, 6)
            .then((response) => {
                setProductListFilter(response.data.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }
    const changePagePrevious = (item) => {
        if (item >= 1) {
            setPageItem(item)
            requestFilterCategory(data, item, 6)
                .then((response) => {
                    setProductListFilter(response.data.data);
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
    }
    const changePageNext = (item) => {
        if (item <= page) {
            setPageItem(item)
            requestFilterCategory(data, item, 6)
                .then((response) => {
                    setProductListFilter(response.data.data);
                })
                .catch((err) => {
                    console.warn(err);
                });
        }
    }
    // ----------------filter-----------------
    const [sort, setSort] = useState("");

    const [priceState, setPriceState] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState("");
    const [search, setSearch] = useState("");
    const data = {
        sort: sort,
        category: cate,
        minPrice: minPrice,
        maxPrice: maxPrice,
        keyword: search,
    }
    const getcategoryId = (e) => {
        setCate(e.target.value);
        navigate(`/all-items/${e.target.value}`);
        const data = {
            sort: sort,
            category: e.target.value,
            minPrice: minPrice,
            maxPrice: maxPrice,
            keyword: search,
        }
        requestFilterCategory(data, pageItem, 6).then(response => {
            setProductListFilter(response.data.data);
            if (response.data.total % 6 == 0) {
                setPage(response.data.total / 6);
            } else {
                setPage(Math.floor((response.data.total / 6)) + 1);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const getPriceLevel = (e) => {
        setPriceState(e.target.value);
        if (e.target.value == 1) {
            setMinPrice("");
            setMaxPrice("");
            const data = {
                sort: sort,
                category: cate,
                minPrice: "",
                maxPrice: "",
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (e.target.value == 2) {
            setMinPrice(0);
            setMaxPrice(10);
            const data = {
                sort: sort,
                category: cate,
                minPrice: 0,
                maxPrice: 10,
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (e.target.value == 3) {
            setMinPrice(10);
            setMaxPrice(20);
            const data = {
                sort: sort,
                category: cate,
                minPrice: 10,
                maxPrice: 20,
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (e.target.value == 4) {
            setMinPrice(20);
            setMaxPrice(30);
            const data = {
                sort: sort,
                category: cate,
                minPrice: 20,
                maxPrice: 30,
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (e.target.value == 5) {
            setMinPrice(30);
            setMaxPrice(40);
            const data = {
                sort: sort,
                category: cate,
                minPrice: 30,
                maxPrice: 40,
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (e.target.value == 6) {
            setMinPrice(40);
            setMaxPrice("");
            const data = {
                sort: sort,
                category: cate,
                minPrice: 40,
                maxPrice: "",
                keyword: search,
            }
            requestFilterCategory(data, pageItem, 6).then(response => {
                setProductListFilter(response.data.data);
                if (response.data.total % 6 == 0) {
                    setPage(response.data.total / 6);
                } else {
                    setPage(Math.floor((response.data.total / 6)) + 1);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const getSortLevel = (e) => {
        setSort(e.target.value);
        const data = {
            sort: e.target.value,
            category: cate,
            minPrice: minPrice,
            maxPrice: maxPrice,
            keyword: search,
        }
        requestFilterCategory(data, pageItem, 6).then(response => {
            setProductListFilter(response.data.data);
            if (response.data.total % 6 == 0) {
                setPage(response.data.total / 6);
            } else {
                setPage(Math.floor((response.data.total / 6)) + 1);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const priceLevel = [
        {
            id: 1
        },
        {
            id: 2,
            minPrice: 0,
            maxPrice: 10,
        },
        {
            id: 3,
            minPrice: 10,
            maxPrice: 20,
        },
        {
            id: 4,
            minPrice: 20,
            maxPrice: 30,
        },
        {
            id: 5,
            minPrice: 30,
            maxPrice: 40,
        },
        {
            id: 6,
            minPrice: 40,
        },
    ];
    const sortLevel = [
        {
            id: 1,
            name: "createdAt-DESC",
            description: "Latest items",
        },
        {
            id: 2,
            name: "createdAt-ASC",
            description: "Oldest items",
        },
        {
            id: 3,
            name: "price-DESC",
            description: "High - Low Price"
        },
        {
            id: 4,
            name: "price-ASC",
            description: "Low - High Price",
        }
    ]
    const searchProduct = (e) => {
        setSearch(e.target.value);
        const data = {
            sort: sort,
            category: cate,
            minPrice: minPrice,
            maxPrice: maxPrice,
            keyword: e.target.value,
        }
        requestFilterCategory(data, pageItem, 6).then(response => {
            setProductListFilter(response.data.data);
            if (response.data.total % 6 == 0) {
                setPage(response.data.total / 6);
            } else {
                setPage(Math.floor((response.data.total / 6)) + 1);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div id="listPage-productList">
            <div className="grid md:grid-cols-4 grid-cols-1">
                <div className="md:mt-14 mt-0">
                    <div className='-left-4'>
                        <div
                            id="sidebar"
                            ref={sidebar}
                            className={`flex flex-col items-center justify-center absolute bg-white z-40 
                            left-0 top-0 lg:static lg:left-auto lg:top-auto
                 lg:translate-x-0 transform h-auto overflow-y-scroll lg:overflow-y-auto no-scrollbar lg:w-72 
                 md:w-auto
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
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Links */}
                            <div className="border-2 rounded-md border-solid border-zinc-300 xl:p-5 md-p-3">
                                {/* Pages group */}

                                <div>
                                    <h3 className="uppercase text-slate-500 font-bold flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                                        </svg>
                                        <span
                                            className="text-amber-700 ml-3 text-lg lg:hidden lg:sidebar-expanded:block 2xl:block uppercase">All Categories</span>
                                    </h3>
                                    <ul className="mt-3">
                                        {categoryList && categoryList.map((category) =>
                                            <li key={category.id} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                                <div className="form-check">
                                                    <input
                                                        checked={cate == category.id}
                                                        onChange={(e) => getcategoryId(e)}
                                                        className="form-check-input appearance-none rounded-full h-4 w-4
                                                border border-gray-300 bg-white checked:bg-amber-600
                                                checked:border-amber-600 focus:outline-none
                                                transition duration-200 mt-1
                                                align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="radio"
                                                        name="category"
                                                        value={category.id}
                                                        id={category.id}
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                                        </svg>
                                        <span
                                            className="text-amber-700 ml-3 text-lg lg:hidden lg:sidebar-expanded:block 2xl:block uppercase">price level</span>
                                    </h3>
                                    <ul className="mt-3">
                                        {priceLevel.map((price, index) =>
                                            <li key={price.id} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/dashboard' && 'bg-slate-900'}`}>
                                                {index == 0
                                                    ?
                                                    <div className="form-check">
                                                        <input
                                                            checked={priceState == price.id}
                                                            onChange={(e) => getPriceLevel(e)}
                                                            className="form-check-input appearance-none rounded-full h-4 w-4
                                                border border-gray-300 bg-white checked:bg-amber-600
                                                checked:border-amber-600 focus:outline-none
                                                transition duration-200 mt-1
                                                align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                            type="radio"
                                                            name="price"
                                                            value={price.id}
                                                            id={price.id}
                                                        />
                                                        <label
                                                            className="form-check-label inline-block text-gray-800 capitalize"
                                                            htmlFor="flexCheckDefault">
                                                            At all
                                                        </label>
                                                    </div>
                                                    :
                                                    (index == 1 || index == 5) ?
                                                        <div className="form-check">
                                                            <input
                                                                checked={priceState == price.id}
                                                                onChange={(e) => getPriceLevel(e)}
                                                                className="form-check-input appearance-none rounded-full h-4 w-4
                                                border border-gray-300 bg-white checked:bg-amber-600
                                                checked:border-amber-600 focus:outline-none
                                                transition duration-200 mt-1
                                                align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                                type="radio"
                                                                name="price"
                                                                value={price.id}
                                                                id={price.id}
                                                            />
                                                            {index == 1 ?
                                                                <label
                                                                    className="form-check-label inline-block text-gray-800 capitalize"
                                                                    htmlFor="flexCheckDefault">
                                                                    Under {numberFormat(price.maxPrice)}
                                                                </label>
                                                                :
                                                                <label
                                                                    className="form-check-label inline-block text-gray-800 capitalize"
                                                                    htmlFor="flexCheckDefault">
                                                                    Over {numberFormat(price.minPrice)}
                                                                </label>
                                                            }

                                                        </div>
                                                        :
                                                        <div className="form-check">
                                                            <input
                                                                onChange={(e) => getPriceLevel(e)}
                                                                className="form-check-input appearance-none rounded-full h-4 w-4
                                                border border-gray-300 bg-white checked:bg-amber-600
                                                checked:border-amber-600 focus:outline-none
                                                transition duration-200 mt-1
                                                align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                                type="radio"
                                                                name="price"
                                                                value={price.id}
                                                                id={price.id}
                                                            />
                                                            <label
                                                                className="form-check-label inline-block text-gray-800 capitalize"
                                                                htmlFor="flexCheckDefault">
                                                                {numberFormat(price.minPrice)} - {numberFormat(price.maxPrice)}
                                                            </label>
                                                        </div>
                                                }
                                            </li>
                                        )}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div>

                        <button
                            className="lg:hidden buttonSideNav bg-amber-600 p-2 rounded-r-md
                text-white"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-color leading-tight xl:text-3xl text-xl text-center uppercase">
                                All Items
                            </h2>
                            <form className="w-full max-w-sm bg-white xl:block hidden">
                                <div className="flex items-center rounded-full border-2 border-amber-600 px-5 py-2">
                                    <input
                                        onBlur={searchProduct}
                                        className="appearance-none bg-transparent border-none w-full
                                    text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none
                                    placeholder:text-center"
                                        type="text"
                                        placeholder="Search"
                                        aria-label="Full name"
                                    />
                                </div>
                            </form>

                            <div className="w-52 w-full">
                                <select onChange={getSortLevel}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none capitalize"
                                        aria-label="Default select example">
                                    {sortLevel.map((sort) =>
                                        <option key={sort.name} id={sort.name} value={sort.name}
                                                className="p-2 m-2 capitalize">{sort.description}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {loading ? <Loading/> :
                        <>
                            {productListFilter && productListFilter.length > 0 ?
                                (<div className="grid md:grid-cols-3 grid-cols-2 gap-6 md:mt-6 mt-3">
                                        <CardProduct proList={productListFilter}/>
                                    </div>
                                )
                                : (
                                    <div className="flex justify-center">
                                        <div className="flex flex-col mt-12">
                                            <img
                                                src={emptyList}
                                                className="max-w-sm h-auto"
                                                alt=""
                                            />
                                            <p className="text-2xl mx-auto text-amber-600 mt-3">Your collection list is empty!</p>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-5 mr-4">
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination">
                        <button
                            onClick={() => changePagePrevious(pageItem - 1)}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-amber-600
                                bg-white text-sm font-medium text-amber-600 hover:text-white hover:bg-amber-600">
                            <span className="sr-only">Previous</span>
                            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                        </button>
                        {Array.from(Array(page), (e, item) => {
                            return <button
                                onClick={() => changePage(item + 1)}
                                className={`z-10 border-amber-600 relative
                                 inline-flex items-center px-4 py-2 border text-sm font-medium hover:text-white 
                                 hover:bg-amber-600 ${(pageItem == (item + 1)) ? "text-white bg-amber-600" : "text-amber-600 bg-white"}`}>{item + 1}
                            </button>
                        })}
                        <button onClick={() => changePageNext(pageItem + 1)}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-amber-600
                                bg-white text-sm font-medium text-amber-600 hover:text-white hover:bg-amber-600">
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>


    );
}

export default ListPage;