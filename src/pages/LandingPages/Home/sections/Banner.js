import React from 'react'
import banner from "./../../../../assets/images/logos/banner.JPG"

export default function Banner() {
    return (
        <div className='container mx-auto flex justify-center'>
            <div class="relative overflow-hidden bg-no-repeat bg-cover max-w-6xl">
                <img src={banner} class="max-w-full h-auto hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
            </div>
        </div>

    )
}
