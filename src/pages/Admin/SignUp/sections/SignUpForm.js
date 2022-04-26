import {cities, districts, wards} from "../../../../address";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {
    checkIfEmailExists,
    CreateUsers,
} from "../../../../features/Api";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import CustomPopupMessage from "../../../CustomPopupMess";
import imgAddNewAdmin from "../../../../assets/images/accounts/add-new-admin.png"

const SignUpAdminForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [city, setCity] = useState({id: cities[0].id, name: cities[0].name});
    const [district, setDistrict] = useState({
        id: districts[0].id,
        name: districts[0].name,
    });
    const [ward, setWard] = useState({id: wards[0].id, name: wards[0].name});
    const [validEmailMess, setValidEmailMess] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const changeCityId = (id) => {
        let cityName;
        cities.map((city) => {
            if (city.id == id) {
                cityName = city.name;
            }
        });
        setCity({id: id, name: cityName});
    };
    const changeDistrictId = (id) => {
        let districtName;
        districts.map((dis) => {
            if (dis.id == id) {
                districtName = dis.name;
            }
        });
        setDistrict({id: id, name: districtName});
    };

    const changeWar = (id) => {
        let wardName;
        wards.map((ward) => {
            if (ward.id == id) {
                wardName = ward.name;
            }
        });
        setWard({id: id, name: wardName});
    };
    const validateEmail = (e) => {
        const email = e.target.value;
        const data = {email: email};

        checkIfEmailExists(data)
            .then((response) => {
                if (response.data) {
                    setValidEmailMess(true);
                } else {
                    setValidEmailMess(false);
                }
            })
            .catch((err) => {
                alert(err.data);
            });
    };
    const [errConfirmPass, setErrConfirmPass] = useState(false);
    const onSubmit = async (data, e) => {
        setShowSpinner(true);

        let address =
            city.name +
            " - " +
            district.name +
            " - " +
            ward.name +
            " - " +
            data.addressDetail;
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("address", address);
        console.log(address);
        if (data.password == data.confirmPassword) {
            CreateUsers(formData)
                .then((response) => {
                    setShowSpinner(false);
                    navigate("/admin/users-list/admin");
                    toast(
                        <CustomPopupMessage
                            mess={response.data.message}
                            icon="check-circle"
                            titleColor="amber"
                            iconColor="amber"
                        />
                    );
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.data);
                });
        } else {
            setErrConfirmPass(true);
            setShowSpinner(false);
        }
    };

    return (
        <div>
            <nav className="rounded-md w-full mx-6 md:my-5 my-2">
                <ol className="list-reset flex">
                    <li>
                        <Link to="/admin/users-list/admin" className="text-gray-800 hover:text-amber-700">
                            Admins
                        </Link>
                    </li>
                    <li className="flex items-center"><span className="text-gray-500 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </span></li>
                    <li>
                    <Link to="/admin/sign-up" className="text-amber-700 hover:text-amber-800">
                        Add Admin
                    </Link>
                    </li>
                </ol>
            </nav>
            <div className="min-w-screen flex items-center justify-center px-5 pt-3 pb-6">
                <div
                    className="bg-gray-100 text-gray-500 rounded-sm shadow-xl w-full overflow-hidden"
                    style={{maxWidth: "1000px"}}
                >
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/3 ">
                            <img
                                className="w-full h-full"
                                src={imgAddNewAdmin}
                                alt=""
                            />
                        </div>
                        <form
                            className="w-full md:w-2/3 py-5 px-5 md:px-10"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="text-center mb-4">
                                <h1 className="font-semibold text-2xl text-gray-900">
                                    Create New Admin
                                </h1>
                                <p className="text-sm">
                                    Enter admin's information to create new admin
                                </p>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Full Name
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                                    errors.name &&
                                                    "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                                }`}
                                                placeholder="Full Name"
                                                id="name"
                                                name="name"
                                                {...register("name", {required: true})}
                                            />
                                        </div>
                                        {errors.name && errors.name.type === "required" && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                Value required
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Phone
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
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
                                                Value required
                                            </p>
                                        )}
                                        {errors.phone && errors.phone.type === "minLength" && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                PhoneNumber is 10 characters
                                            </p>
                                        )}
                                        {errors.phone && errors.phone.type === "maxLength" && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                PhoneNumber is 10 characters
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Password
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                            </div>
                                            <input
                                                type="password"
                                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                                    errors.password &&
                                                    "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                                }`}
                                                placeholder="************"
                                                id="password"
                                                name="password"
                                                {...register("password", {
                                                    required: true,
                                                    minLength: 8,
                                                    maxLength: 20,
                                                })}
                                            />
                                        </div>
                                        {errors.password && errors.password.type === "required" && (
                                            <p className="mt-3 text-red-500 text-xs italic">
                                                Value required
                                            </p>
                                        )}
                                        {errors.password && errors.password.type === "minLength" && (
                                            <p className="mt-3 text-red-500 text-xs italic">
                                                no less than 8 characters
                                            </p>
                                        )}
                                        {errors.password && errors.password.type === "maxLength" && (
                                            <p className="mt-3 text-red-500 text-xs italic">
                                                no more than 20 characters
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Confirm password
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                            </div>
                                            <input
                                                type="password"
                                                className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                                    errors.confirmPassword &&
                                                    "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                                }`}
                                                placeholder="************"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                {...register("confirmPassword", {
                                                    required: true,
                                                    minLength: 8,
                                                    maxLength: 20,
                                                })}
                                            />
                                        </div>
                                        {errors.confirmPassword &&
                                            errors.confirmPassword.type === "required" && (
                                                <p className="mt-3 text-red-500 text-xs italic">
                                                    Value required
                                                </p>
                                            )}
                                        {errors.confirmPassword &&
                                            errors.confirmPassword.type === "minLength" && (
                                                <p className="mt-3 text-red-500 text-xs italic">
                                                    no less than 8 characters
                                                </p>
                                            )}
                                        {errors.confirmPassword &&
                                            errors.confirmPassword.type === "maxLength" && (
                                                <p className="mt-3 text-red-500 text-xs italic">
                                                    no more than 20 characters
                                                </p>
                                            )}
                                        {errConfirmPass == true ? (
                                            <p className="mt-3 text-red-500 text-xs italic">
                                                Passwords must be same, Please try again !
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Email
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
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
                                                onBlur={(e) => validateEmail(e)}
                                            />
                                        </div>
                                        {errors.email && errors.email.type === "required" && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                Value required
                                            </p>
                                        )}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                Invalid email
                                            </p>
                                        )}
                                        {validEmailMess && (
                                            <p className="text-red-500 mt-3 text-xs italic">
                                                Email is already in use
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-1/3 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Province/City
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i
                                                    className="fa fa-map-marker"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <select
                                                className={`w-full -ml-10 pl-8 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
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
                                                    <option key={cities.id} value={cities.id}>{cities.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-1/3 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            District
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i
                                                    className="fa fa-map-marker"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <select
                                                className={`w-full -ml-10 pl-8 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
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
                                                        <option key={district.id} value={district.id}>{district.name}</option>
                                                    ) : null
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-1/3 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Ward/Commune
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i
                                                    className="fa fa-map-marker"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <select
                                                className={`w-full -ml-10 pl-8 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
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
                                                        <option key={ward.id} value={ward.id}>{ward.name}</option>
                                                    ) : null
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Address
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div
                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i
                                                    className="fa fa-location-arrow"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <textarea
                                                id="addressDetail"
                                                name="addressDetail"
                                                className={`w-full h-20 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${
                                                    errors.addressDetail &&
                                                    "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"
                                                }`}
                                                placeholder="Your address"
                                                {...register("addressDetail", {required: true})}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Avatar
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                className="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                <div className="flex flex-col items-center justify-center pt-2">
                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Attach a file
                                                    </p>
                                                </div>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    accept=".jpg, .png"
                                                    type="file"
                                                    {...register("image")}
                                                    className="ml-8 text-sm"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <button
                                            className="block w-full uppercase max-w-xs mx-auto bg-amber-500 border-2 border-amber-500 text-white
                                        hover:bg-amber-600 focus:bg-amber-600 focus:text-white hover:text-white rounded-lg px-3 py-3 font-semibold"
                                        >
                                            Add New Admin
                                            {showSpinner && (
                                                <div
                                                    className="spinner-border animate-spin inline-block w-4 h-4 border-3 ml-2 rounded-full"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUpAdminForm;
