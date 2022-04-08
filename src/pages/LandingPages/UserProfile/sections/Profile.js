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
      phone: data.phone,
      address: address,
    };

    updateUserInfo(userId, dataUpdate)
      .then((response) => {
        getUserInformation(userId);
        $("#modalUpdateUserInfo").modal("hide");
        toast(
          <CustomPopupMessage
            mess="Update user information successfully!"
            icon="check"
          />
        );
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
        setValue("phone", response.data.phone);
        setValue("addressDetail", addressArr[3]);

        const cityObj = cities.find((x) => x.name === addressArr[0]);
        setCity(cityObj);
        const distObj = districts.find((x) => x.name === addressArr[1]);
        setDistrict(distObj);
        const wardObj = wards.find((x) => x.name === addressArr[2]);
        setWard(wardObj);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

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
                    <i className="fas fa-envelope mr-2 text-lg text-gray-500"></i>
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
                          className="text-xl font-medium leading-normal pl-8 text-gray-800 uppercase"
                          id="modalUpdateUserInfoLabel"
                        >
                          UPDATE User Information
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
                                    <option
                                      value={cities.id}
                                      selected={city.id === cities.id}
                                    >
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
                                      <option
                                        value={dist.id}
                                        selected={district.id == dist.id}
                                      >
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
                                      <option
                                        value={w.id}
                                        selected={ward.id == w.id}
                                      >
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
                    <div className="w-full px-4">
                      <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                        <div className="mb-5 md:mb-8">
                          <h2 className="text-2xl font-bold uppercase mb-4">
                            Order List
                          </h2>
                          <button className=" active:bg-amber-500 uppercase text-amber-500 border border-amber-500 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1">
                            Pending
                          </button>
                          <button className=" active:bg-blue-500 uppercase text-blue-500 border border-blue-500 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1">
                            Shipping
                          </button>
                          <button className=" active:bg-green-500 uppercase text-green-500 border border-green-500 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1">
                            Complete
                          </button>
                          <button className=" active:bg-red-500 uppercase text-red-500 border border-red-500 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1">
                            Decline
                          </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="p-4 border-2 shadow overflow-hidden rounded-lg h-auto">
                            <div className="h-60 mb-2  lg:h-48">
                              <div className="md:flex items-strech py-1">
                                <div className="pl-1 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                  <p className="text-base uppercase font-black leading-none text-gray-800 ">
                                    ORDER #123
                                  </p>
                                  <p className="text-sm font-semibold leading-3 text-gray-400  pt-2 pb-5">
                                    29 September 2022
                                  </p>
                                </div>
                                <div className="md:w-4/12 2xl:w-1/4 w-full">
                                  <Link to={`/all-items/item-detail/23`}>
                                    <img
                                      src=""
                                      alt="product image"
                                      className="h-full object-center object-cover md:block hidden"
                                    />
                                    <img
                                      src=""
                                      alt="product image"
                                      className="md:hidden w-full h-full object-center object-cover"
                                    />
                                  </Link>
                                </div>
                              </div>

                              <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-200">
                                <div className="md:w-4/12 2xl:w-2/12 w-full">
                                  <Link to={`/all-items/item-detail/23`}>
                                    <img
                                      src=""
                                      alt="product image"
                                      className="h-full object-center object-cover md:block hidden"
                                    />
                                    <img
                                      src=""
                                      alt="product image"
                                      className="md:hidden w-full h-full object-center object-cover"
                                    />
                                  </Link>
                                </div>
                                <div className="md:pl-3 lg:ml-7 md:w-8/12 2xl:w-10/12 flex flex-col justify-center">
                                  <p className="text-sm uppercase font-black leading-none text-gray-600 ">
                                    Name
                                  </p>

                                  <div className="flex items-center py-3">
                                    <p className="text-xs font-semibold leading-3 text-gray-400  pr-3">
                                      Purple
                                    </p>
                                    <p className="text-xs font-semibold leading-3 text-gray-400  border-l border-gray-300 pl-3">
                                      M
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between w-full md:pt-0 mt-3">
                                    <p className="text-sm font-bold leading-3 text-gray-800">
                                      $45.0
                                    </p>
                                    <p className="text-sm font-bold leading-3 text-gray-800">
                                      Qty : 23
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-200 py-4 px-1">
                              <span className="text-lg font-bold text-amber-600 dark:text-white">
                                $599
                              </span>
                              <div className="flex flex-col lg:flex-row justify-center">
                                <a
                                  href="#"
                                  className="active:bg-red-500 uppercase text-red-500 border border-red-500 focus:ring-4 hover:shadow-md shadow font-semibold rounded-md text-sm px-5 py-1.5 text-center lg:mr-2"
                                >
                                  <i
                                    className="fa fa-close"
                                    aria-hidden="true"
                                  ></i>
                                </a>

                                <a
                                  href="#"
                                  className="active:bg-green-500 uppercase text-green-500 border border-green-500 focus:ring-4 hover:shadow-md shadow font-semibold rounded-md text-sm px-5 py-1.5 text-center lg:mr-2"
                                >
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <a
                                  href="#"
                                  className="active:bg-gray-500 uppercase text-gray-500 border border-gray-500 focus:ring-4 hover:shadow-md shadow font-semibold rounded-md text-sm px-5 py-1.5 text-center"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                              {/* <div className="flex lg:flex-row flex-col justify-center">
                                <a
                                  className="= cursor-default uppercase text-green-500 border border-green-500  font-semibold rounded-md text-sm px-5 py-1.5 text-center lg:mr-2"
                                >
                                  <i
                                    className="fa fa-check pr-2"
                                    aria-hidden="true"
                                  ></i>
                                  Complete 
                                </a>
                                <a
                                  href="#"
                                  className="active:bg-gray-500 uppercase text-gray-500 border border-gray-500 focus:ring-4 hover:shadow-md shadow font-semibold rounded-md text-sm px-5 py-1.5 text-center"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
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
