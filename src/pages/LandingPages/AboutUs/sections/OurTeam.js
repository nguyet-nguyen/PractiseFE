import React from "react";
import "react-toastify/dist/ReactToastify.css";
import jamesAvatar from "../../../../assets/images/about-us/james.jpg";
import moonAvatar from "../../../../assets/images/about-us/moon.jpg";
import kaAvatar from "../../../../assets/images/about-us/ka.jpg";

const OurTeam = () => {
  return (
    <section className="relative py-10 overflow-hidden">
      <img
        className="hidden lg:block absolute inset-x-0 bottom-0 mb-96"
        src="zospace-assets/lines/line-two-montain.svg"
        alt=""
      />
      <div className="relative container px-4 mt-20 -mb-20 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-20 text-center text-5xl font-bold font-heading text-amber-600">
            Our Team
          </h2>
          <div className="flex flex-wrap justify-center -mx-10 mb-20">
            <div className="w-full lg:w-1/3 px-8 mb-20 lg:mb-0">
              <div>
                <img
                  className="mb-8 w-full h-112 lg:h-80 object-cover object-top"
                  src={jamesAvatar}
                  alt=""
                />
                <a
                  className="inline-block w-full p-7 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-lg transition duration-200"
                  href="#"
                >
                  <h3 className="mb-2 text-xl text-white font-bold font-heading">
                    Tan Thanh (James)
                  </h3>
                  <p className=" text-lg text-white font-bold">Backend Developer</p>
                
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-8 mb-20 lg:mb-0">
              <div className="lg:mt-24">
                <img
                  className="mb-8 w-full h-112 lg:h-80 object-cover object-top"
                  src={moonAvatar}
                  alt=""
                />
                <a
                  className="inline-block w-full p-7 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-lg transition duration-200"
                  href="#"
                >
                  <h3 className="mb-2 text-xl text-white font-bold font-heading">
                    Minh Nguyet (Moon)
                  </h3>
                  <p className=" text-lg text-white font-bold">Frontend Developer</p>
               
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-8">
              <div>
                <img
                  className="mb-8 w-full h-112 lg:h-80 object-cover object-top"
                  src={kaAvatar}
                  alt=""
                />
                <a
                  className="inline-block w-full p-7 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-lg transition duration-200"
                  href="#"
                >
                  <h3 className="mb-2 text-xl text-white font-bold font-heading">
                    Kieu Anh (KA)
                  </h3>
                  <p className=" text-lg text-white font-bold">Frontend Developer</p>
                 
                </a>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
