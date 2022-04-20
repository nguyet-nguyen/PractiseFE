import React from 'react'
import banner from "./../../../../assets/images/logos/banner.jpg"

export default function BannerHomepage() {
    return (
            <div className="relative overflow-hidden bg-no-repeat bg-cover w-full my-16">
                <img src={banner} className="w-full h-auto hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
            </div>

    )
}
