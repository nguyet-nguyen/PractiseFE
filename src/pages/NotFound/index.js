import React from "react";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
        <section class="relative py-20 2xl:py-40  overflow-hidden">
            <img class="absolute top-0 right-0 md:-mr-96 md:-mt-112" src="zospace-assets/lines/circle.svg" alt="" />
            <img class="absolute top-0 right-0 h-40 lg:h-80 lg:mr-64 lg:mt-24" src="zospace-assets/images/five-stars.svg" alt="" />
            <img class="hidden lg:block absolute top-0 left-0 h-64 -ml-10" src="zospace-assets/images/amber-double-circle.svg" alt="" />
            <img class="absolute bottom-0 left-0 h-80" src="zospace-assets/lines/half-double-circle.svg" alt="" />
            <div class="relative container px-4 mx-auto">
                <div class="max-w-3xl mx-auto">
                <div class="max-w-xl">
                    <a class="inline-block text-amber-600 text-xl font-bold" href="#">
                    <img class="h-7" src="zospace-assets/logos/zospace-logo.svg" alt="" width="auto" />
                    </a>
                    <i
                        className={`fa fa-frown-o text-6xl text-amber-600`}
                        aria-hidden="true"
                    ></i>
                    <h2 class="mt-8 mb-14 text-5xl font-bold font-heading text-amber-600">Sorry, we can&apos;t find that page or something has gone wrong...</h2>
                    <button onClick={() => navigate(-1)} type="button" class="inline-block px-12 py-4 text-lg bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-md transition duration-200" >Go back</button>
                </div>
                </div>
            </div>
            </section>
        </>
    
    );
};

export default NotFound;
