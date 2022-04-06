import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getUserInfo } from "../../../../features/Api";
import ModalUpdateUser from "../sections/ModalUpdateUser";
import ModalUpdateAvatar from "../sections/ModalUpdateAvatar";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;

  useEffect(() => {
    getUserInfo(userId)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  },);

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url(" + require("assets/images/user-profile/bg-1.png") + ")",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-20 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {/* <!-- Button trigger modal --> */}
                      <button className="icon_change h-6 w-7 pt-1 text-sm bg-amber-400 hover:bg-amber-500 text-white rounded-xl leading-tight text-center absolute m-10 mb-4 mr-20 z-50 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modalUpdateAvatar">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                      <img
                        alt="user avatar"
                        src={userInfo.image}
                        className="shadow-xl rounded-full h-40 w-56 align-middle border-none absolute -m-16 -ml-20 lg:-ml-20"
                        style={{ maxWidth: "150px", height: "150px"}}
                      />
                    </div>
                    <ModalUpdateAvatar userInfo = {userInfo} />
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Link
                        to="/"
                        className="bg-amber-500 active:bg-amber-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">
                          Items In Cart
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-4xl font-semibold leading-normal text-center mb-2 text-gray-800">
                    {userInfo.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-gray-500"></i>{" "}
                    {userInfo.email}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-phone mr-2 text-lg text-gray-500"></i>
                    {userInfo.phone}
                  </div>
                  <div className="mb-4 text-gray-700">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                    {userInfo.address}
                  </div>
                </div>
                <div className="text-center">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="mb-2 inline-block px-6 py-2.5 bg-none text-amber-500 font-semibold leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#modalUpdateUserInfo"
                  >
                    Show more
                  </button>
                </div>

               <ModalUpdateUser userInfo = {userInfo} />

                <div className="mt-8 py-10 border-t border-gray-300">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        Order List
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
