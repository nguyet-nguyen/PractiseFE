import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../../../../features/Api";
import ModalUpdateAvatar from "../sections/ModalUpdateAvatar";
import { cities, districts, wards } from "../../../../address";
import { updateUserInfo, getAllItemsInCart } from "../../../../features/Api";
import { ToastContainer, toast } from "react-toastify";
import CustomPopupMessage from "../../../CustomPopupMess";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [addressArray, setAddressArray] = useState();
  const [itemsInCart, setItemsInCart] = useState([]);

  const [city, setCity] = useState({ id: cities[0].id, name: cities[0].name });
  const [district, setDistrict] = useState({
    id: districts[0].id,
    name: districts[0].name,
  });
  const [ward, setWard] = useState({ id: wards[0].id, name: wards[0].name });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;

  useEffect(() => {
    getUserInformation(userId);

    // Get total items
    getAllItemsInCart()
      .then((res) => {
        setItemsInCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeCityId = (id) => {
    let cityName;
    cities.map((city) => {
      if (city.id == id) {
        cityName = city.name;
      }
    });
    setCity({ id: id, name: cityName });
  };
  const changeDistrictId = (id) => {
    let districtName;
    districts.map((dis) => {
      if (dis.id == id) {
        districtName = dis.name;
      }
    });
    setDistrict({ id: id, name: districtName });
  };

  const changeWar = (id) => {
    let wardName;
    wards.map((ward) => {
      if (ward.id == id) {
        wardName = ward.name;
      }
    });
    setWard({ id: id, name: wardName });
  };

  const onSubmit = async (data, e) => {
    let address =
      city.name +
      " - " +
      district.name +
      " - " +
      ward.name +
      " - " +
      data.addressDetail;

    console.log(data);

    const dataUpdate = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: address,
    };

    updateUserInfo(userId, dataUpdate)
      .then((response) => {
        getUserInformation(userId);
        $("#modalUpdateUserInfo").modal("hide");
        toast(<CustomPopupMessage mess="Update user information successfully!" icon="check"/>);
        
      })
      .catch((err) => {
        alert(err.data);
      });

    e.target.reset();
  };

  const getUserInformation = (userId) => {
    getUserInfo(userId)
    .then((response) => {
      setUserInfo(response.data);
      const addressArr = response.data.address.split(" - ");
      setAddressArray(addressArr);
      setValue("name", response.data.name);
      setValue("phone", response.data.phone);
      setValue("email", response.data.email);
      setValue("addressDetail", addressArr[3]);

      const cityObj = cities.find(x => x.name === addressArr[0]);
      setCity(cityObj);
      const distObj = districts.find(x => x.name === addressArr[1]);
      setDistrict(distObj);
      const wardObj = wards.find(x => x.name === addressArr[2]);
      setWard(wardObj);
    })
    .catch((err) => {
      console.warn(err);
    });

  }
  
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
                      <button
                        className="icon_change h-6 w-7 pt-1 text-sm bg-amber-400 hover:bg-amber-500 text-white rounded-xl leading-tight text-center absolute m-10 mb-4 mr-20 z-50 cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUpdateAvatar"
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                      <img
                        alt="user avatar"
                        src={userInfo.image}
                        className="shadow-xl rounded-full h-40 w-56 align-middle border-none absolute -m-16 -ml-20 lg:-ml-20"
                        style={{ maxWidth: "150px", height: "150px" }}
                      />
                    </div>
                    <ModalUpdateAvatar userInfo={userInfo} />
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
                        <Link to="/shopping-cart">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700 hover:text-amber-600">
                          {itemsInCart.length}
                        </span>
                        </Link>
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
                    Edit Information
                  </button>
                </div>
                {/* <!-- Modal --> */}
                <div
                  className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                  id="modalUpdateUserInfo"
                  tabIndex="-1"
                  aria-labelledby="modalUpdateUserInfoLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5
                          className="text-xl font-medium leading-normal pl-8 text-gray-800"
                          id="modalUpdateUserInfoLabel"
                        >
                          User Information
                        </h5>
                        <button
                          type="button"
                          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form
                        className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="modal-body relative p-4">
                          <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Username
                              </label>
                              <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                  <i
                                    className="fa fa-user-circle-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <input
                                  type="text"
                                  className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.name &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  placeholder="username"
                                  id="name"
                                  name="name"
                                  // defaultValue={userInfo.name}
                                  {...register("name", { required: true })}
                                />
                              </div>
                              {errors.name &&
                                errors.name.type === "required" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    Value required
                                  </p>
                                )}
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Phone
                              </label>
                              <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                  <i
                                    className="fa fa-phone"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <input
                                  type="phone"
                                  className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.phone &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  placeholder="0933549878"
                                  id="phone"
                                  name="phone"
                                  {...register("phone", {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 10,
                                  })}
                                />
                              </div>
                              {errors.phone &&
                                errors.phone.type === "required" && (
                                  <p className="text-red-500 text-xs mt-3 italic">
                                    Value required
                                  </p>
                                )}
                              {errors.phone &&
                                errors.phone.type === "minLength" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    PhoneNumber is 10 characters
                                  </p>
                                )}
                              {errors.phone &&
                                errors.phone.type === "maxLength" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    PhoneNumber is 10 characters
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Email
                              </label>
                              <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                  <i
                                    className="fa fa-envelope-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <input
                                  type="email"
                                  className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.email &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  placeholder="youremail@example.com"
                                  id="email"
                                  name="email"
                                  {...register("email", {
                                    required: true,
                                    pattern:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  })}
                                />
                              </div>
                              {errors.email &&
                                errors.email.type === "required" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    Value required
                                  </p>
                                )}
                              {errors.email &&
                                errors.email.type === "pattern" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    Invalid email
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex -mx-3">
                            <div className="w-1/3 px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Province/City
                              </label>
                              <div className="flex justify-end">
                                <select
                                  className={`w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.city &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  id="city"
                                  name="city"
                                  type="text"
                                  onClick={(e) => changeCityId(e.target.value)}
                                >
                                  {cities.map((cities) => (
                                    <option value={cities.id} selected={city.id === cities.id}>
                                      {cities.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="w-1/3 px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                District
                              </label>
                              <div className="flex justify-end">
                                <select
                                  className={`w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.district &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  id="district"
                                  name="district"
                                  type="text"
                                  
                                  onClick={(e) =>
                                    changeDistrictId(e.target.value)
                                  }
                                >
                                  {districts.map((dist) =>
                                    dist.idCity == city.id ? (
                                      <option value={dist.id} selected={district.id == dist.id}>
                                        {dist.name}
                                      </option>
                                    ) : null
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className="w-1/3 px-3 mb-5">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Ward/Commune
                              </label>
                              <div className="flex justify-end">
                                <select
                                  className={`w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.wards &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  id="ward"
                                  name="ward"
                                  type="text"
                                  onChange={(e) => changeWar(e.target.value)}
                                >
                                  {wards.map((w) =>
                                    w.idDistrict == district.id ? (
                                      <option value={w.id} selected={ward.id == w.id }>
                                        {w.name}
                                      </option>
                                    ) : null
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="flex -mx-3">
                            <div className="w-full px-3">
                              <label
                                htmlFor=""
                                className="text-xs font-semibold px-1"
                              >
                                Address
                              </label>
                              <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                  <i
                                    className="fa fa-location-arrow"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <textarea
                                  id="addressDetail"
                                  name="addressDetail"
                                  className={`w-full h-16 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                              errors.addressDetail &&
                                              "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                            }`}
                                  placeholder="Your address"
                                  {...register("addressDetail", {
                                    required: true,
                                  })}
                                />
                              </div>
                              {errors.addressDetail &&
                                errors.addressDetail.type === "required" && (
                                  <p className="text-red-500 mt-3 text-xs italic">
                                    Value required
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="inline-block px-6 py-2.5 bg-amber-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
      <ToastContainer />
    </>
  );
};

export default Profile;
