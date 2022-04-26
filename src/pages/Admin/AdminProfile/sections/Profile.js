import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cities, districts, wards } from "../../../../address";
import { getUserInfo, updateUserInfo } from "../../../../features/Api";
import Loading from "../../../../Loading";
import CustomPopupMessage from "../../../CustomPopupMess";
import ModalUpdateAvatar from "../sections/ModalUpdateAvatar";

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const [addressArray, setAddressArray] = useState();

  const [city, setCity] = useState({ id: cities[0].id, name: cities[0].name });
  const [district, setDistrict] = useState({
    id: districts[0].id,
    name: districts[0].name,
  });
  const [ward, setWard] = useState({ id: wards[0].id, name: wards[0].name });
  const [showSpinnerUpdate, setShowSpinnerUpdate] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").id;

  useEffect(() => {
    getUserInformation(userId);
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
    setShowSpinnerUpdate(true);

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
    $("#modalUpdateUserInfo").modal("hide");

    updateUserInfo(userId, dataUpdate)
      .then((response) => {
        getUserInformation(userId);
        toast(
          <CustomPopupMessage
            mess="Update user information successfully!"
            icon="check-circle"
            titleColor="amber"
            iconColor="amber"
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
        console.log(response.data);
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

        setShowSpinnerUpdate(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return userInfo ? (
    <main className="profile-page ">
      <section className="relative pt-12 ">
        <div className="container mx-auto lg:px-80">
          <div className="relative flex flex-col min-w-0 break-words bg-slate-100 items-center justify-center mb-6 shadow-xl rounded-sm mt-28">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    {/* <!-- Button trigger modal --> */}
                    <button
                      className="icon_change h-7 w-7 text-sm bg-amber-400 hover:bg-amber-500 text-white rounded-xl leading-tight text-center absolute m-10 mb-4 mr-20 z-50 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modalUpdateAvatar"
                    >
                      <i className="fa fa-pencil text-xs" aria-hidden="true"></i>
                    </button>
                    <img
                      alt="user avatar"
                      src={userInfo.image}
                      className="shadow-xl rounded-full h-40 w-56 align-middle border-none absolute -m-16 -ml-20 lg:-ml-20"
                      style={{ maxWidth: "150px", height: "150px" }}
                    />
                  </div>
                  <ModalUpdateAvatar userInfo={userInfo} getUserInformation={getUserInformation}/>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center "></div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
              </div>
              <div className="text-center mt-28">
                <h3 className="text-4xl font-semibold leading-normal text-center mb-2 text-gray-800">
                  {userInfo.name}
                </h3>
                <div className="text-md leading-normal mt-0 mb-2 text-gray-500 font-bold lowercase">
                  <i className="fas fa-envelope mr-2 text-lg text-gray-500"></i>{" "}
                  {userInfo.email}
                </div>
                <div className="mb-2 text-gray-700 mt-4">
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
                  className="mb-20 inline-block px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-semibold leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#modalUpdateUserInfo"
                >
                  Edit Information
                  {showSpinnerUpdate && (
                    <div
                      className="spinner-border animate-spin inline-block w-4 h-4 border-3 ml-2 rounded-full"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
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
                  <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                      <h5
                        className="text-xl font-medium leading-normal pl-8 text-amber-600 uppercase"
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
                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <select
                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
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
                                    key={cities.id}
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

                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <select
                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
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
                                      key={dist.id}
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

                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <select
                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
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
                                      key={w.id}
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
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <Loading adminPage={true} />
  );
};

export default Profile;
