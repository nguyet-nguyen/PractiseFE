import React from "react";
import "react-toastify/dist/ReactToastify.css";
import logoName from "../../../../assets/images/logos/logo-name.png";

const IntroLogoName = () => {
  return (
    <section class="relative py-16 overflow-hidden border-b-gray-200 border-b-2">
    <img class="absolute top-0 right-0 -mr-80 -mt-80" src="zospace-assets/lines/circle.svg" alt="" />
    <img class="hidden lg:block absolute bottom-0 left-0 w-96" src="zospace-assets/lines/half-double-circle.svg" alt="" />
    <div class="relative container px-4 mx-auto">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-20 lg:mb-32">
          <h2 class="mt-12 text-5xl font-bold font-heading text-amber-600">Why is "ANT"?</h2>
        </div>
        <div class="relative flex flex-wrap mx-7 mb-20">
          <div class="w-full px-5 mb-12 lg:mb-0">
            <div class="flex flex-wrap -mx-4 lg:mx-0">
              <div class="w-full lg:w-1/3 px-4 pb-20 lg:pb-0">
                <img class="w-50 h-20 mx-auto object-cover" src={logoName} alt="" />
              </div>
              <div class="w-full lg:w-2/3 px-4">
                <div class="relative inline-block mb-8 p-8 border-4 border-amber-500 rounded-lg">
                  <p class="mb-8 text-lg text-gray-400 font-semibold">We collaborate on the first letter of our names. <br/>
                  Anh is the letter A, Nguyet is the letter N, and<br/>  Thanh is the letter T.</p>
                 
                </div>
              </div>
            </div>
          </div>
     
        </div>
     
      </div>
    </div>
  </section>
  );
};

export default IntroLogoName;
