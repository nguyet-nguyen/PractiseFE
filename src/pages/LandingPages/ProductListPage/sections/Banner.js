import React from "react";
import bannerProduct from "./../../../../assets/images/logos/banner-product-list-page.JPG"  

const BannerProductList = () => {
    return (
        <div className="w-full banner-productList">
            <img src={bannerProduct} className="w-full h-auto" alt="..." />
        </div>
    )
}

export default BannerProductList;