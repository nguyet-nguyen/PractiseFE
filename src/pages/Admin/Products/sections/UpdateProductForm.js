import Sidebar from "../../Sidebar";
import Header from "../../Header";
import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getAllCategory, getProductDetail, UpdateProduct} from "../../../../features/Api";
import CustomPopupMessage from "../../../CustomPopupMess";
import {toast} from "react-toastify";
import Loading from "../../../../Loading";

const UpdateProductForm = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const [messErr, setMessErr] = useState("");
    let params = useParams();
    const [itemDetail, setItemDetail] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getProductDetail(params.id)
            .then(res => {
                setItemDetail(res.data);
                setLoading(true);
            })
            .catch(err => {
                console.log(err);
                setLoading(true);
            })
        // --------cate-----------------
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    setValue("name", itemDetail.name);
    setValue("color", itemDetail.color);
    setValue("description", itemDetail.description);
    setValue("price", itemDetail.price);
    setValue("material", itemDetail.material);
    const onSubmit = async (data, e) => {
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("name", data.name);
        formData.append("color", data.color);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("material", data.material);
        [...data.images].map(f => formData.append("images[]", f));
        UpdateProduct(formData, itemDetail.id).then(response => {
            console.log(response.data);
            navigate("/admin/products");
            toast(
                <CustomPopupMessage
                    mess="This product has been updated successfully!"
                    icon="check-circle"
                    titleColor="amber"
                    iconColor="amber"
                />
            );
        })
            .catch(err => {
                    console.log(err);
                    setMessErr(err.message);
                }
            )
    };
    const [showMess, setShowMess] = useState(true);
    const colorProduct = [
        {
            id: 1,
            name: "Black",
        },
        {
            id: 2,
            name: "Blue",
        },
        {
            id: 3,
            name: "Green",
        },
        {
            id: 4,
            name: "Yellow",
        },
        {
            id: 5,
            name: "Red",
        },
        {
            id: 6,
            name: "Gray",
        },
        {
            id: 7,
            name: "Brown",
        },
        {
            id: 8,
            name: "White",
        },
    ]
    const materialProduct = [
        {
            id: 1,
            name: "Wool",
        },
        {
            id: 2,
            name: "Silk",
        },
        {
            id: 3,
            name: "Leather",
        },
        {
            id: 4,
            name: "Polyester",
        },
        {
            id: 5,
            name: "Polyamide",
        },
        {
            id: 6,
            name: "Cotton",
        },
        {
            id: 7,
            name: "Satin",
        },
    ]
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                {loading ?
                    <main>
                        <nav className="rounded-md w-full mx-6 md:my-5 my-2">
                            <ol className="list-reset flex">
                                <li>
                                    <Link to="/admin/products" className="text-gray-800 hover:text-amber-700">
                                        Product List
                                    </Link>
                                </li>
                                <li className="flex items-center"><span className="text-gray-500 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                        <path fillRule="evenodd"
                              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </span></li>
                                <li>
                    <span className="text-amber-700">
                        Update Product
                    </span>
                                </li>
                            </ol>
                        </nav>
                        <div className="min-w-screen flex items-center justify-center px-5 pt-3 pb-6">
                            <div
                                className="bg-gray-100 text-gray-500 rounded-sm shadow-xl w-full overflow-hidden"
                                style={{maxWidth: "800px"}}>
                                <div className="md:flex w-full">
                                    <form className="w-full md:w-full py-8 px-5 md:px-10"
                                          onSubmit={handleSubmit(onSubmit)}>
                                        <div className="text-center mb-7">
                                            <h1 className="font-bold text-3xl text-amber-600 uppercase">Update
                                                Product</h1>
                                            <p>Enter product information</p>

                                            {(!showMess || messErr != "") ? (
                                                <div
                                                    className="bg-red-600 shadow-lg mx-auto w-full text-sm pointer-events-auto
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
                                                                    data-mdb-dismiss="toast"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="p-3 bg-red-600 rounded-b-lg break-words text-white uppercase">
                                                        Product update fail
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <div className="flex -mx-3">
                                                <div className="w-2/3 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Product's Name
                                                        <span className="text-red-500 ml-1">*</span>
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
                                                        <p className="text-red-500 mt-3 text-xs italic">value
                                                            required</p>}
                                                </div>
                                                <div className="w-1/3 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Color
                                                        <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="flex justify-end">
                                                        <div
                                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                            <i className="fa fa-paint-brush" aria-hidden="true"></i>
                                                        </div>
                                                        <select className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.categoryList && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                                id="color" name="color"
                                                                {...register("color",)}
                                                                type="text">
                                                            {colorProduct.map((cate) => (
                                                                itemDetail.color == cate.name ?
                                                                    <option key={cate.name} value={cate.name}
                                                                            selected>{cate.name}</option>
                                                                    : <option key={cate.name}
                                                                              value={cate.name}>{cate.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-1/3 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Price
                                                        <span className="text-red-500 ml-1">*</span>
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
                                                        <p className="text-red-500 mt-3 text-xs italic">Value
                                                            required</p>}

                                                </div>
                                                <div className="w-1/3 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Material
                                                        <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="flex justify-end">
                                                        <div
                                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                            <i className="fa fa-tag" aria-hidden="true"></i>
                                                        </div>
                                                        <select className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.categoryList && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                                id="material" name="material"
                                                                {...register("material",)}
                                                                type="text">
                                                            {materialProduct.map((cate) => (
                                                                itemDetail.material == cate.name ?
                                                                    <option key={cate.name} value={cate.name}
                                                                            selected>{cate.name}</option>
                                                                    : <option key={cate.name}
                                                                              value={cate.name}>{cate.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                    {errors.material && errors.material.type === "required" &&
                                                        <p className="text-red-500 text-xs mt-3 italic">Value
                                                            required</p>}
                                                </div>
                                                <div className="w-1/3 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Category
                                                        <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="flex justify-end">
                                                        <div
                                                            className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                        </div>
                                                        <select className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600
                                            ${errors.categoryList && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}
                                                                id="category" name="category"
                                                                {...register("category",)}
                                                                type="text">
                                                            {categoryList.map((cate, i) => (
                                                                i === 0 ? "" :
                                                                    itemDetail.category == cate.name ?
                                                                        <option
                                                                            key={cate.id}
                                                                            value={cate.id}
                                                                            selected>{cate.name}</option>
                                                                        : <option key={cate.id}
                                                                                  value={cate.id}>{cate.name}</option>

                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex -mx-3">
                                                <div className="w-1/2 px-3 mb-5">
                                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                                        Product's Decription
                                                        <span className="text-red-500 ml-1">*</span>
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
                                                        Product images
                                                        <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            className="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                            <div
                                                                className="flex flex-col items-center justify-center pt-2">
                                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                    Attach a file</p>
                                                            </div>
                                                            <input id="images" name="images" multiple="multiple"
                                                                   accept=".jpg, .png"
                                                                   type="file" {...register('images')}
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
                                                        Update product
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                    : <Loading adminPage={true}/>
                }

            </div>
        </div>
    )
}
export default UpdateProductForm;