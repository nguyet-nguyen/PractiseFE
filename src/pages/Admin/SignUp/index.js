import {cities, district, ward} from "../../../address";
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {SignUpApi} from "../../../features/Api";
import {Link, useNavigate} from 'react-router-dom';

const SignUpAdmin = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data, e) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("address", "aaaaaaaa");
        console.log(formData);
        SignUpApi(formData).then(response => {
            // navigate('/pages/authentication/sign-in');
            console.log(response.data);
        })
            .catch(err => {
                    alert(err.data);
                }
            )
        // e.target.reset();

    }
    console.log(`Bearer ${window.localStorage.getItem('token')}`)
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
            <div
                className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
                style={{maxWidth: "1000px"}}
            >
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/3 ">
                        <img className="w-full h-full"
                             src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                             alt=""/>
                    </div>
                    <form className="w-full md:w-2/3 py-8 px-5 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-7">
                            <h1 className="font-bold text-3xl text-gray-900">Add Admin</h1>
                            <p>Enter admin information to register</p>
                        </div>
                        <div>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Username
                                    </label>
                                    <div className="flex">
                                        <div
                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                            placeholder="username"
                                            id="name"
                                            name="name"
                                            {...register("name", {required: true})}
                                        />
                                    </div>
                                    {errors.name && errors.name.type === "required" &&
                                        <p className="text-red-500 mt-3 text-xs italic">value required</p>}
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Password
                                    </label>
                                    <div className="flex">
                                        <div
                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </div>
                                        <input
                                            type="password"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                            placeholder="************"
                                            id="password"
                                            name="password"
                                            {...register("password", {required: true, minLength: 8, maxLength: 20})}
                                        />
                                    </div>
                                    {errors.password && errors.password.type === "required" &&
                                        <p className="mt-3 text-red-500 text-xs italic">value required</p>}
                                    {errors.password && errors.password.type === 'minLength' &&
                                        <p className="mt-3 text-red-500 text-xs italic">no less than 8 characters</p>}
                                    {errors.password && errors.password.type === 'maxLength' &&
                                        <p className="mt-3 text-red-500 text-xs italic">no more than 20 characters</p>}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Email
                                    </label>
                                    <div className="flex">
                                        <div
                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                        </div>
                                        <input
                                            type="email"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                            placeholder="youremail@example.com"
                                            id="email"
                                            name='email'
                                            {...register("email", {
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            })}
                                        />
                                    </div>
                                    {errors.email && errors.email.type === 'required' &&
                                        <p className="text-red-500 mt-3 text-xs italic">Value required</p>}
                                    {errors.email && errors.email.type === 'pattern' &&
                                        <p className="text-red-500 mt-3 text-xs italic">Invalid email</p>}
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Phone
                                    </label>
                                    <div className="flex">
                                        <div
                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                        </div>
                                        <input
                                            type="phone"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                            placeholder="0933549878"
                                            id="phone"
                                            name='phone'
                                            {...register("phone", {required: true, minLength: 10, maxLength: 10})}

                                        />
                                    </div>
                                    {errors.phone && errors.phone.type === "required" &&
                                        <p className="text-red-500 text-xs mt-3 italic">Value required</p>}
                                    {errors.phone && errors.phone.type === 'minLength' &&
                                        <p className="text-red-500 mt-3 text-xs italic">PhoneNumber is 10
                                            characters</p>}
                                    {errors.phone && errors.phone.type === 'maxLength' &&
                                        <p className="text-red-500 mt-3 text-xs italic">PhoneNumber is 10
                                            characters</p>}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-1/3 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Province/City
                                    </label>
                                    <div className="flex justify-end">
                                        <select className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                                id="city"
                                                name='city'
                                                type="text"
                                                onClick={e => changeId(e.target.value)}>
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
                                        <select className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                                id="district"
                                                name='district'
                                                type="text"
                                                onClick={e => changeCountryId(e.target.value)}>
                                            {district.map((district) => (
                                                <option value={district.id}>{district.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-1/3 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Ward/Commune
                                    </label>
                                    <div className="flex justify-end">
                                        <select className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                                id="ward"
                                                name='ward'
                                                type="text"
                                                onClick={e => changeCountryId(e.target.value)}>
                                            {ward.map((ward) => (
                                                <option value={ward.id}>{ward.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Address
                                    </label>
                                    <div className="flex">
                                        <div
                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i class="fa fa-location-arrow" aria-hidden="true"></i>
                                        </div>
                                        <textarea
                                            className=" w-full h-20 resize-none -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600"
                                            placeholder="Your address"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Avatar
                                    </label>
                                    <div class="flex items-center justify-center w-full">
                                        <label
                                            class="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                            <div class="flex flex-col items-center justify-center pt-2">
                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Attach a file</p>
                                            </div>
                                            <input id="image" name="image" type="file" {...register('image')}
                                                   className="ml-8 text-sm"/>
                                        </label>


                                    </div>
                                </div>
                            </div>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-2">
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white active:bg-indigo-700 text-sm font-bold uppercase px-6 py-3
                           rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full">
                                        CREATE NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpAdmin;
