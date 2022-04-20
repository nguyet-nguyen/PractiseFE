import {Fragment, useEffect, useState} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {Link} from "react-router-dom";
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    SupportIcon,
    XIcon,
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'
import logoName from "./../../../../src/assets/images/logos/logo-name.png"
import {getAllCategory, getCountItemsInCart} from "../../../features/Api";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 150 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
};

function DefaultNavbar() {

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    useEffect(() => {
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    })
    const solutions = []
    categoryList.forEach(item => {
        solutions.push({
            name: item.name,
            href: `/all-items/${item.id}`
        })
    })

    const [countItemCart, setCountItemCart] = useState(0);
    useEffect(() => {
        getCountItemsInCart()
            .then((response) => {
                setCountItemCart(response.data.count);
                console.log(countItemCart);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const token = localStorage.getItem("token");
    const users = JSON.parse(localStorage.getItem("userInfo"));
    const SignOut = () => {
        try {
            localStorage.clear();
            navigate("/");
        } catch {
            console.log("loi");
        }
    };
    const [activeLink, setActiveLink] = useState(1);
    const changeStateHeader = (e) => {
        setActiveLink(e)
    }
    return (
        <Popover
            className="header-section z-10 hover:bg-white bg-transparent transition ease-in-out absolute top-0 right-0 left-0">
            <div className="w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/" className="flex justify-start items-center">
                            <img
                                className="w-20"
                                src={logoName}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center
                        justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none
                        focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:text-amber-600">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden md:flex items-center space-x-10">
                        <Link  to="/" >
                            <button className={`font-semibold ${activeLink==1? "text-amber-600 text-base hover:text-amber-700"
                                : "text-gray-600 text-sm hover:text-gray-900"}`} onClick={()=> changeStateHeader(1)}>
                                Home
                            </button>

                        </Link>
                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-600',
                                            ' rounded-md inline-flex items-center text-sm font-semibold ' +
                                            'focus:ring-offset-2'
                                        )}
                                    >
                                        <span className={`font-semibold ${activeLink==2? "text-amber-600 text-base hover:text-amber-700"
                                            : "text-gray-600 text-sm hover:text-gray-900"}`}>Item List</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-900' : 'text-gray-600',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div
                                                className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div
                                                    className="relative grid grid-cols-2 gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {solutions.map((item) => (
                                                        <Link

                                                            key={item.name}
                                                            to={item.href}
                                                            className="-m-3 p-3 flex items-center rounded-lg">

                                                            <button
                                                                onClick={()=> changeStateHeader(2)}
                                                                className="ml-3 text-sm font-medium text-gray-900 hover:text-amber-600">{item.name}</button>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        <Link to="/aboutus" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                            <button className={`font-semibold ${activeLink==3? "text-amber-600 text-base hover:text-amber-700"
                                : "text-gray-600 text-sm hover:text-gray-900"}`} onClick={()=> changeStateHeader(3)}>
                                About Us
                            </button>

                        </Link>
                    </Popover.Group>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        {token ?
                            <>
                                <div className="flex justify-center">
                                    <Link to="/shopping-cart">
                                        <div className="inline-flex items-center relative w-fit mr-8">
                                            <div
                                                className="absolute inline-block top-0 right-0
                                    bottom-auto left-auto translate-x-1/3 -translate-y-0
                                     rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1.5 px-2
                                      text-xs leading-none text-center whitespace-nowrap align-baseline
                                       font-bold bg-white border-2 border-amber-600 text-amber-600 rounded-full z-10"
                                            >
                                                {countItemCart}
                                            </div>
                                            <div
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                                className="inline-block px-2 py-2.5 text-white
                                        text-xs leading-tight uppercase rounded
                                        focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg
                                         transition duration-150 ease-in-out"
                                            >
                                                <i
                                                    className={`fa fa-shopping-cart pr-2 text-amber-600 text-2xl`}
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="dropdown relative">
                                        <button
                                            className="active:border-none"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={users.image}
                                                className="rounded-full border-2 border-amber-600 w-10 shadow-lg"
                                                alt="Avatar"
                                            />
                                        </button>
                                        <ul
                                            className=" dropdown-menu min-w-max absolute hidden bg-white text-base
                                                 z-50 float-left list-none text-left rounded-lg shadow-lg mt-1 hidden
                                                 m-0 bg-clip-padding border-none"
                                            aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <Link
                                                    className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                                                        bg-transparent border-b-2 border-gray-100 text-gray-700 hover:text-amber-600
                                                        focus:bg-white focus:text-amber-600"
                                                    to="/user-profile"
                                                >
                                                    Your profile
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    onClick={SignOut}
                                                    className=" dropdown-item text-sm py-2 px-4 font-normal
                                                block w-full whitespace-nowrap
                                                        bg-transparent text-gray-700 hover:text-amber-600
                                                        focus:bg-white focus:text-amber-600"
                                                >
                                                    Sign Out
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </>
                            : <>
                                <Link to="/pages/authentication/sign-in" className="font-semibold border-2 border-amber-600 px-3 py-1.5
                        rounded-md text-amber-700 bg-white hover:bg-amber-600 text-sm hover:text-white ">
                                    Sign in
                                </Link>
                                <Link to="/pages/authentication/sign-up"
                                      className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5
                            border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600
                            hover:bg-amber-800"
                                >
                                    Sign up
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus
                               className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div
                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Link to="/" className="flex justify-start items-center">
                                        <img
                                            className="w-16"
                                            src={logoName}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center
                                    justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none
                                    focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:text-amber-600">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {solutions.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                        >
                            <span
                                className="ml-3 text-sm font-medium text-gray-900">{item.name}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <Popover.Group as="nav" className="md:hidden flex justify-center py-5 items-center">
                            <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 mr-5">
                                Home
                            </Link>
                            <Link to="/aboutus" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                                About Us
                            </Link>
                        </Popover.Group>
                        <div className="py-6 px-5 space-y-6">
                            {!token ?
                                <div>
                                    <Link to="/pages/authentication/sign-in"
                                          className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5
                            border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600
                            hover:bg-amber-800"
                                    >
                                        Sign in
                                    </Link>
                                    <p className="mt-6 text-center text-sm font-medium text-gray-500">
                                        Existing customer?{" "}
                                        <Link to="/pages/authentication/sign-up"
                                              className="text-amber-600 hover:text-amber-500">
                                            Sign up
                                        </Link>
                                    </p>
                                </div> : (

                                    <div className="flex justify-center">
                                        <Link to="/shopping-cart">
                                            <div className="inline-flex items-center relative w-fit mr-8">
                                                <div
                                                    className="absolute inline-block top-0 right-0
                                    bottom-auto left-auto translate-x-1/3 -translate-y-0
                                     rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1.5 px-2
                                      text-xs leading-none text-center whitespace-nowrap align-baseline
                                       font-bold bg-white border-2 border-amber-600 text-amber-600 rounded-full z-10"
                                                >
                                                    {countItemCart}
                                                </div>
                                                <div
                                                    data-mdb-ripple="true"
                                                    data-mdb-ripple-color="light"
                                                    className="inline-block px-2 py-2.5 text-white
                                        text-xs leading-tight uppercase rounded
                                        focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg
                                         transition duration-150 ease-in-out"
                                                >
                                                    <i
                                                        className={`fa fa-shopping-cart pr-2 text-amber-600 text-2xl`}
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="dropdown relative">
                                            <button
                                                className="active:border-none"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <img
                                                    src={users.image}
                                                    className="rounded-full border-2 border-amber-600 w-10 shadow-lg"
                                                    alt="Avatar"
                                                />
                                            </button>
                                            <ul
                                                className=" dropdown-menu min-w-max absolute hidden bg-white text-base
                                                 z-50 float-left list-none text-left rounded-lg shadow-lg mt-1 hidden
                                                 m-0 bg-clip-padding border-none"
                                                aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <Link
                                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                                                        bg-transparent border-b-2 border-gray-100 text-gray-700 hover:text-amber-600
                                                        focus:bg-white focus:text-amber-600"
                                                        to="/user-profile"
                                                    >
                                                        Your profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        onClick={SignOut}
                                                        className=" dropdown-item text-sm py-2 px-4 font-normal
                                                block w-full whitespace-nowrap
                                                        bg-transparent text-gray-700 hover:text-amber-600
                                                        focus:bg-white focus:text-amber-600"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>

    );
}

export default DefaultNavbar;
