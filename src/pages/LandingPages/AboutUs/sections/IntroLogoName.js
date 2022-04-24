import React from "react";
import "react-toastify/dist/ReactToastify.css";
import logoName from "../../../../assets/images/logos/logo-name.png";

const IntroLogoName = () => {
  return (
    <section className="relative lg:py-10 overflow-hidden border-b-gray-200 border-b-2">
    <img className="absolute top-0 right-0 -mr-80 -mt-80" src="zospace-assets/lines/circle.svg" alt="" />
    <img className="hidden lg:block absolute bottom-0 left-0 w-96" src="zospace-assets/lines/half-double-circle.svg" alt="" />
    <div className="relative container px-4 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 lg:mb-32">
          <h2 className="mt-12 text-5xl font-bold font-heading text-amber-600">Why is "ANT"?</h2>
        </div>
        <div className="relative flex flex-wrap mx-7 ">
          <div className="w-full px-5 mb-12 lg:mb-0">
            <div className="flex flex-wrap -mx-4 lg:mx-0">
              <div className="w-full lg:w-1/3 px-4 pb-20 lg:pb-0">
                <img className="w-50 h-14 lg:h-20 mx-auto object-cover" src={logoName} alt="" />
              </div>
              <div className="w-full lg:w-2/3 px-4">
                <div className="relative inline-block mb-8 p-8 border-4 border-amber-500 rounded-lg">
                  <p className="mb-8 text-lg text-gray-400 font-semibold">We collaborate on the first letter of our names. <br/>
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
