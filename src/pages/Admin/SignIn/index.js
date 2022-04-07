import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInApiRole, SignInApiToken } from "../../../features/Api";
import { useNavigate } from 'react-router-dom';

function SignInAdmin() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [messErr, setMessErr] = useState("")


    const onSubmit = async (data, e) => {
        const bodyToken = {
            username: data.email,
            password: data.password,
        };
        SignInApiToken(bodyToken).then(response => {
            localStorage.setItem("token", response.data.token);
            navigate('/admin/dashboard');
        })
            .catch(err => {
                console.log(err);
                setMessErr(err.message)
            }
            )
        const bodyRole = {
            email: data.email,
        }
        SignInApiRole(bodyRole)
            .then(response => {
                localStorage.setItem("userInfo", JSON.stringify(response.data));
            }).catch(err => {
                console.log(err);
            })
    }
    const [showMess, setShowMess] = useState(true);


    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-slate-800"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/images/register_bg.png") + ")",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center my-3">
                                            <h6 className="text-slate-700 uppercase text-xl md:text-2xl font-bold">
                                                Sign in for Admin
                                            </h6>
                                            {(!showMess || messErr != "") ? (
                                                <div
                                                    className="bg-red-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto
                                            bg-clip-padding rounded-lg block mb-3 mt-3"
                                                    id="static-example" role="alert" aria-live="assertive"
                                                    aria-atomic="true"
                                                    data-mdb-autohide="false">
                                                    <div
                                                        className="bg-red-600 flex justify-end items-center py-2 px-3 border-red-500 rounded-t-lg">
                                                        <div className="flex items-center">
                                                            <button type="button" onClick={() => {
                                                                setShowMess(true);
                                                                setMessErr("");
                                                            }}
                                                                className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none
                                                            rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100
                                                            hover:text-white hover:opacity-75 hover:no-underline"
                                                                data-mdb-dismiss="toast" aria-label="Close"></button>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 bg-red-600 rounded-b-lg break-words text-white">
                                                        Email or Password in correct !!!!!!!
                                                    </div>
                                                </div>
                                            ) : null}

                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-username"
                                                >
                                                    Email
                                                    <span className="text-red-500 ml-1">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="name"
                                                    id="email"
                                                    name='email'
                                                    className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white 
                                                    rounded text-sm shadow focus:outline-none focus:ring w-full
                                                    ${errors.email && "border-red-600 ring-red-500 focus:ring-red-500 focus:border-red-600 border-1"}
                                                    `}
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                    {...register("email", {
                                                        required: true,
                                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                                    })}
                                                />
                                                {errors.email && errors.email.type === 'required' &&
                                                    <p className="text-red-500 mt-3 text-xs italic">Value required</p>}
                                                {errors.email && errors.email.type === 'pattern' &&
                                                    <p className="text-red-500 mt-3 text-xs italic">Invalid email</p>}
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                    <span className="text-red-500 ml-1">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white 
                                                    rounded text-sm shadow focus:outline-none focus:ring w-full
                                                    ${errors.password && "border-red-600 ring-red-500 focus:ring-red-500 focus:border-red-600 border-1"}
                                                    `}
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    {...register("password", { required: true, minLength: 8, maxLength: 20 })}
                                                />
                                                {errors.password && errors.password.type === "required" &&
                                                    <p className="mt-3 text-red-500 text-xs italic">value required</p>}
                                                {errors.password && errors.password.type === 'minLength' &&
                                                    <p className="mt-3 text-red-500 text-xs italic">no less than 8
                                                        characters</p>}
                                                {errors.password && errors.password.type === 'maxLength' &&
                                                    <p className="mt-3 text-red-500 text-xs italic">no more than 20
                                                        characters</p>}
                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                                        style={{ transition: "all .15s ease" }}
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-indigo-500 text-white active:bg-indigo-700 text-sm font-bold uppercase px-6 py-3
                           rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="submit"
                                                    style={{ transition: "all .15s ease" }}>
                                                    Sign In
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default SignInAdmin;
