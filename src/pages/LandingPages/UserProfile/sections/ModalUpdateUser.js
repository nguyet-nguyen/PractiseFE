import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cities, districts, wards } from "../../../../address";
import { updateUserInfo } from "../../../../features/Api";

const ModalUpdateUser = ({ userInfo }) => {
  if (userInfo.address) {
    const addressArray = userInfo.address.split(" - ");
    console.log(addressArray);
  }

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

  setValue("name", userInfo.name);
  setValue("phone", userInfo.phone);
  setValue("email", userInfo.email);

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

    updateUserInfo(userInfo.id, dataUpdate)
      .then((response) => {
        console.log(response.data);
        $("#modalUpdateUserInfo").modal("hide");
        toast.success("Update successfully!");
      })
      .catch((err) => {
        alert(err.data);
      });

    e.target.reset();
  };

  return (
    <>
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
                    <label htmlFor="" className="text-xs font-semibold px-1">
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
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * Value required
                      </p>
                    )}
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
                      Phone
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="fa fa-phone" aria-hidden="true"></i>
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
                    {errors.phone && errors.phone.type === "required" && (
                      <p className="text-red-500 text-xs mt-3 italic">
                        * Value required
                      </p>
                    )}
                    {errors.phone && errors.phone.type === "minLength" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * PhoneNumber is 10 characters
                      </p>
                    )}
                    {errors.phone && errors.phone.type === "maxLength" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * PhoneNumber is 10 characters
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
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
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                      />
                    </div>
                    {errors.email && errors.email.type === "required" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * Value required
                      </p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * Invalid email
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/3 px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
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
                          <option value={cities.id}>{cities.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3 px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
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
                        onClick={(e) => changeDistrictId(e.target.value)}
                      >
                        {districts.map((district) =>
                          district.idCity == city.id ? (
                            <option value={district.id}>{district.name}</option>
                          ) : null
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3 px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
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
                        {wards.map((ward) =>
                          ward.idDistrict == district.id ? (
                            <option value={ward.id}>{ward.name}</option>
                          ) : null
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label htmlFor="" className="text-xs font-semibold px-1">
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
                    {errors.addressDetail && errors.addressDetail.type === "required" && (
                      <p className="text-red-500 mt-3 text-xs italic">
                        * Value required
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
      <ToastContainer />
    </>
  );
};

export default ModalUpdateUser;
