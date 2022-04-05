import Sidebar from "../../Sidebar";
import Header from "../../Header";
import React, {useState,useEffect} from "react";
import {cities, districts, wards} from "../../../../address";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {CreateProducts, getAllCategory} from "../../../../features/Api";
import {image} from "tailwindcss/lib/util/dataTypes";

const AddProductForm = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const imageArray = [];


    const onSubmit = async (data, e) => {
        // -----image-------------
        const sizes = [
            {"size": 1, "amount": data.sizeS},
            {"size": 2, "amount": data.sizeM},
            {"size": 3, "amount": data.sizeL}
        ];
        // const imageCheck = ["127.0.0.1/uploads/images/Capture-624adf7b511b1.jpg"];
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("name", data.name);
        formData.append("color", data.color);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("material", data.material);
        formData.append("productItems", sizes);
        for (let i = 0; i < data.images.length; i++) {
            formData.append(`images[${i}]`, data.images[i]);
            console.log(data.images[i]);
        }


        CreateProducts(formData).then(response => {
            // navigate('/pages/authentication/sign-in');
            console.log(response.data);

        })
            .catch(err => {
                    alert(err.data);
                }
            )

    };
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <main>
                    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                        <div
                            className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
                            style={{maxWidth: "800px"}}>
                            <div className="md:flex w-full">
                                <form className="w-full md:w-full py-8 px-5 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="text-center mb-7">
                                        <h1 className="font-bold text-3xl text-gray-900">Add Product</h1>
                                        <p>Enter product information to register</p>
                                    </div>
                                    <div>
                                        <div className="flex -mx-3">
                                            <div className="w-2/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Product's Name
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-product-hunt" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.name && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="Product's Name"
                                                        id="name"
                                                        name="name"
                                                        {...register("name", {required: true})}/>
                                                </div>
                                                {errors.name && errors.name.type === "required" &&
                                                    <p className="text-red-500 mt-3 text-xs italic">value required</p>}
                                            </div>
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Color
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-paint-brush" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.color && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="color"
                                                        id="color"
                                                        name="color"
                                                        {...register("color", {required: true})}
                                                    />
                                                </div>
                                                {errors.color && errors.color.type === "required" &&
                                                    <p className="mt-3 text-red-500 text-xs italic">value required</p>}
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Price
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-money" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="number" min="0"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.price && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="price"
                                                        id="price"
                                                        name='price'
                                                        {...register("price", {
                                                            required: true,
                                                        })}
                                                    />
                                                </div>
                                                {errors.money && errors.money.type === 'required' &&
                                                    <p className="text-red-500 mt-3 text-xs italic">Value required</p>}

                                            </div>
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Material
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.material && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="material"
                                                        id="material"
                                                        name='material'
                                                        {...register("material", {required: true})}

                                                    />
                                                </div>
                                                {errors.material && errors.material.type === "required" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">Value required</p>}
                                            </div>
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Category
                                                </label>
                                                <div className="flex justify-end">
                                                    <select className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.categoryList && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                            id="category" name="category"
                                                            {...register("category",)}
                                                            type="text">
                                                        {categoryList.map((category, i) => (
                                                            i === 0 ? "" :
                                                                <option value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Amount of S size
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-database" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.SizeS && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="Amount of S size"
                                                        id="SizeS"
                                                        name='SizeS'
                                                        {...register("SizeS", {required: true, min: 0})}

                                                    />
                                                </div>
                                                {errors.SizeS && errors.SizeS.type === "required" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">Value required</p>}
                                                {errors.SizeS && errors.SizeS.type === "min" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">quantity must be
                                                        greater than 0</p>}

                                            </div>
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Amount of M size
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-database" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.SizeM && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="Amount of M size"
                                                        id="SizeM"
                                                        name='SizeM'
                                                        {...register("SizeM", {required: true, min: 0})}

                                                    />
                                                </div>
                                                {errors.SizeM && errors.SizeM.type === "required" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">Value required</p>}
                                                {errors.SizeM && errors.SizeM.type === "min" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">quantity must be
                                                        greater than 0</p>}
                                            </div>
                                            <div className="w-1/3 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Amount of L size
                                                </label>
                                                <div className="flex">
                                                    <div
                                                        className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <i className="fa fa-database" aria-hidden="true"></i>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.SizeL && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                        placeholder="Amount of L size"
                                                        id="SizeL"
                                                        name='SizeL'
                                                        {...register("SizeL", {required: true, min: 0})}

                                                    />
                                                </div>
                                                {errors.SizeL && errors.SizeL.type === "required" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">Value required</p>}
                                                {errors.SizeL && errors.SizeL.type === "min" &&
                                                    <p className="text-red-500 text-xs mt-3 italic">quantity must be
                                                        greater than 0</p>}
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
                                                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                                    </div>
                                                    <textarea id="description" name="description"
                                                              className={`w-full h-20 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.description && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                              placeholder="Product's Decription"
                                                              {...register("description")}/>
                                                </div>
                                            </div>
                                            <div className="w-1/2 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">
                                                    Avatar
                                                </label>
                                                <div className="flex items-center justify-center w-full">
                                                    <label
                                                        className="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                        <div className="flex flex-col items-center justify-center pt-2">
                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                Attach a file</p>
                                                        </div>
                                                        <input id="images" name="images" multiple="multiple"
                                                               accept=".jpg, .png" type="file" {...register('images')}
                                                               className="ml-8 text-sm"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-2">
                                                <button
                                                    className="block w-full max-w-xs mx-auto bg-amber-600
                                                     hover:bg-amber-700 focus:bg-amber-700 text-white
                                                     rounded-lg px-3 py-3 font-semibold uppercase">
                                                    Add products
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    )
}
export default AddProductForm;