const ItemDetail = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden ItemDetail rounded-lg">
            <div className="container p-10 mx-auto">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-auto">
                    {/* <img
                        alt="ecommerce"
                        className="md:w-1/2 w-full md:h-auto h-64 object-cover object-center rounded"
                        src="https://dummyimage.com/400x400"
                        ----------
                    /> */}
                    {/* ------------------------------------------------------- */}
                    <div
                        id="carouselDarkVariant"
                        className="itemDetail-image carousel slide carousel-fade carousel-dark relative"
                        data-bs-ride="carousel"
                    >
                        {/* Indicators */}
                        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                            <button data-bs-target="#carouselDarkVariant" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1"
                            />
                            <button data-bs-target="#carouselDarkVariant" data-bs-slide-to={1} aria-label="Slide 1"
                            />
                            <button data-bs-target="#carouselDarkVariant" data-bs-slide-to={2} aria-label="Slide 1"
                            />
                        </div>
                        <div className="carousel-inner relative w-full h-full overflow-hidden rounded-lg">
                            <div className="carousel-item active relative float-left w-full h-full">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp"
                                    className="block w-full h-full object-top object-cover"
                                    alt="Motorbike Smoke"
                                />
                              
                            </div>
                            <div className="carousel-item relative float-left w-full h-full">
                                <img
                                   src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp"
                                    className="block w-full h-full object-top object-cover"
                                    alt="Motorbike Smoke"
                                />
                              
                            </div>
                            <div className="carousel-item relative float-left w-full h-full">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp"
                                    className="block w-full h-full object-top object-cover"
                                    alt="Motorbike Smoke"
                                />
                              
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                            type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon inline-block bg-no-repeat"
                                aria-hidden="true"
                            />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                            type="button"
                            data-bs-target="#carouselDarkVariant"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon inline-block bg-no-repeat"
                                aria-hidden="true"
                            />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* ------------------------------------------------------------- */}
                    <div className="w-full md:pl-10 md:py-5 mt-4 md:mt-0">
                        <p className="text-sm text-gray-500 uppercase mb-5">
                            Brand:
                        </p>
                        <h2 className="text-gray-900 text-3xl font-bold uppercase mb-5">
                            The Catcher in the Rye
                        </h2>
                        <h2 className="text-amber-700 text-3xl font-bold mb-5">
                            $200000
                        </h2>

                        <div className="border-solid border-b-2 border-gray-100 my-5"></div>
                        <div className="flex">
                            <span className="mr-2 text-base text-gray-500">Color: </span>
                            <span className="text-base text-amber-700">Blue</span>
                        </div>
                        <div className="flex justify-between my-6 items-center">

                            <div className="flex items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-amber-600 py-2 focus:outline-none 
                                    focus:ring-2 focus:ring-amber-500 focus:border-amber-600 text-base pl-3 pr-10">
                                        <option>SM</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="mr-2 text-base text-gray-500">Amount status:</span>
                                <span className="text-base text-amber-700">50 items</span>
                            </div>

                        </div>
                        <div className="flex justify-center mb-8">
                            <button
                                type="button"
                                className="inline-block px-6 py-4 border-2 border-amber-600 text-amber-600 font-semibold text-base leading-tight
                                 uppercase rounded-full w-full
                                hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-0 
                                transition duration-150 ease-in-out">
                                Add to cart
                            </button>
                        </div>
                        <p className="text-base text-gray-500 ">
                            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps
                            cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
                            tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean
                            shorts keytar banjo tattooed umami cardigan.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ItemDetail;