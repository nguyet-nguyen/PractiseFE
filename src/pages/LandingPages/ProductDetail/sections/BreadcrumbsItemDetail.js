import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllItemsInCart, getProductDetail} from "../../../../features/Api";

const BreadcrumbsItemDetail = () => {
    let params = useParams();
    const [itemDetail, setItemDetail] = useState();
    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetail(params.id)
            .then(res => {
                setItemDetail(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
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
                    </div>
                </div>
            </header>
            {itemDetail ?
                <nav className="container h-auto mx-auto px-4 py-3 md:py-8 md:px-32 rounded-md w-full">
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
                            <Link to="/user-profile" className="text-gray-800 hover:text-amber-700">
                                All Items
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
                        {itemDetail.name}
                    </span>
                        </li>
                    </ol>
                </nav>
                : null
            }

        </div>



    );
}

export default BreadcrumbsItemDetail;