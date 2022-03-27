import React from "react";
const ProductDetail = () => {
    return (
        <div className="container my-24 px-10 mx-auto">
            <section className="mb-32 text-gray-800">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Projects we are proud of
                </h2>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0 md:px-6">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide relative"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={0}
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={1}
                                    aria-label="Slide 2"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={2}
                                    aria-label="Slide 3"
                                />
                            </div>
                            <div className="carousel-inner relative w-full overflow-hidden">
                                <div className="carousel-item active float-left w-full relative product-img">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                                        className="block w-full image-card"
                                        alt="Wild Landscape"
                                    />
                                </div>
                                <div className="carousel-item float-left w-full relative product-img">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                                        className="block w-full image-card"
                                        alt="Camera"
                                    />
                                </div>
                                <div className="carousel-item float-left w-full relative product-img">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                                        className="block w-full image-card"
                                        alt="Exotic Fruits"
                                    />
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev"
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
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon inline-block bg-no-repeat"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                    <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 md:px-6">
                    <div class=" border-solid border-b-2 border-neutral-300"></div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default ProductDetail;