import { Link } from "react-router-dom";

const BreadcrumbsItemDetail = () => {
    return (
        <div>

            <header>
                <div
                    className="relative overflow-hidden bg-no-repeat bg-cover breadcrumbsItemDetail"
                    style={{
                        backgroundPosition: "50%",
                        height: 350
                    }}>
                    <div
                        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center px-6 md:px-12">
                            <h3 className="text-3xl text-white font-bold mb-8 uppercase">Items Name</h3>
                                <ol className="list-reset flex text-white">
                                    <li>
                                        <Link to="/" className="font-medium text-white hover:text-amber-100">
                                            Homepage
                                        </Link>
                                    </li>
                                    <li className="flex items-center"><span className="text-white mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span></li>
                                    <li>
                                        <Link to="/all-items" className="font-medium text-white hover:text-amber-100">
                                            All Items
                                        </Link>
                                    </li>
                                    <li className="flex items-center"><span className="font-medium text-white mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span></li>


                                    <li>
                                        <span className="text-amber-100">
                                            Item Name
                                        </span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background image */}
            </header>


        </div>



    );
}

export default BreadcrumbsItemDetail;