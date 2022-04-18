import { Link } from "react-router-dom";

const BreadcrumbsCheckout = () => {
    return (
        <nav className="rounded-md w-full mx-4 md:mb-10 mb-5">
            <ol className="list-reset flex">
                <li>
                    <Link to="/" className="text-gray-800 hover:text-amber-700">
                        Homepage
                    </Link>
                </li>
                <li className="flex items-center"><span className="text-gray-500 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span></li>
                <li>
                    <Link to="/shopping-cart" className="text-gray-800 hover:text-amber-700">
                        Shopping Cart
                    </Link>
                </li>
                <li className="flex items-center"><span className="text-gray-500 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span></li>
                <li>
                    <span className="text-amber-700">
                        Checkout
                    </span>
                </li>
            </ol>
        </nav>
    );
}

export default BreadcrumbsCheckout;
