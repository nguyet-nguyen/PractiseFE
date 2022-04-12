import $ from 'jquery'
import dt from 'datatables.net'

$.DataTable = dt
import React, {Fragment, useEffect, useState} from "react";
import {
    DeleteProduct,
    getAllProductsAdmin,
    getProductDetail,
    UpdateProductItems
} from "../../../../features/Api";
import DataTable from 'react-data-table-component';
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";
import Loading from "../../../../Loading";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const ProductsTable = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [productList, setProductList] = useState([]);
    const [searchData, setSearchList] = useState();
    const [idDelete, setIdDelete] = useState();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getAllProductsAdmin()
            .then((response) => {
                setProductList(response.data.data);
                setSearchList(response.data.data);
                setPending(false);
            })
            .catch((err) => {
                console.warn(err);
                setPending(false);
            });
    }, [getAllProductsAdmin]);
    const getIdDelete = (id) => {
        setIdDelete(id);
    }
    const onHandDel = async (idDelete) => {
        DeleteProduct(idDelete);
        setProductList(productList.filter((x)=> x.id != idDelete))
    };
    const searchProduct = (e) => {
        let searchList = [];
        let searchKey = e.target.value;
        setPending(false);
        productList.forEach(product => {
            if ((product.name.toString().toLowerCase().indexOf(searchKey) > -1)
                || (product.category.toString().toLowerCase().indexOf(searchKey) > -1)
                || (product.color.toString().toLowerCase().indexOf(searchKey) > -1)
                || (product.price.toString().toLowerCase().indexOf(searchKey) > -1)
            ) {
                searchList.push(product);
            }
        })
        setProductList(searchList);
        if (searchKey == null || searchKey == "" || searchKey.isEmpty()) {
            setProductList(searchData);
        }
    }
    const [itemDetail, setItemDetail] = useState([]);
    const getDetailproduct = (id) => {
        getProductDetail(id)
            .then(res => {
                setItemDetail(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onSubmit = async (data, e) => {
        if (!data.SizeL) {
            data.SizeL = 0;
        }
        const body = [
            {size: 1, amount: data.SizeS},
            {size: 2, amount: data.SizeM},
            {size: 3, amount: data.SizeL}
        ];
        UpdateProductItems(body, itemDetail.id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.data);
            })
        getAllProductsAdmin()
            .then((response) => {
                setProductList(response.data);
                setPending(false);
            })
            .catch((err) => {
                console.warn(err);
                setPending(false);
            });
    };
    if (itemDetail.items != null) {
        itemDetail.items.forEach(size => {
            setValue(`Size${size.size}`, size.amount);
        })
    }

    const columns = [
        {
            name: 'No',
            sortable: true,
            width: '100px',
            selector: row => row.no,
        },
        {
            name: 'Name',
            sortable: true,
            selector: row => row.name,
        },
        {
            name: 'Price',
            sortable: true,
            selector: row => row.price,
        },
        {
            name: 'Color',
            sortable: true,
            selector: row => row.color,
        },
        {
            name: 'Category',
            sortable: true,
            selector: row => row.category,
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 100,
            align: "left",
            sortable: false,
            cell: (record) => {
                return (
                    <>
                        <button type="button"
                                onClick={() => getDetailproduct(record.id)}
                                className="inline-block px-6 py-2 border-2 border-green-800
                                                    text-green-800 font-medium text-xs leading-tight uppercase
                                                    rounded hover:bg-green-800 hover:text-white focus:outline-none
                                                    focus:ring-0 transition duration-150 ease-in-out"
                                data-bs-toggle="modal" data-bs-target="#exampleModalLg">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                        <Link to={`/admin/products/update-product/${record.id}`}
                              className="mx-4 inline-block px-6 py-2 border-2 border-yellow-600
                                                    text-yellow-600 font-medium text-xs leading-tight uppercase
                                                    rounded hover:bg-yellow-600 hover:text-white focus:outline-none
                                                    focus:ring-0 transition duration-150 ease-in-out">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                        <button type="button" className="px-6 py-2.5 bg-white text-red-700 font-medium text-xs
                                            leading-tight uppercase border-2 border-red-700 rounded shadow-md hover:bg-red-700 hover:text-white
                                            hover:shadow-lg  focus:shadow-lg focus:outline-none
                                            focus:ring-0 transition duration-150
                                            ease-in-out"
                                typebutton="edit" size="small"
                                data-bs-toggle="modal" data-bs-target="#modalDeleteUser"
                                onClick={() => getIdDelete(record.id)}
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </>


                );
            },
        },
    ];
    const customStyles = {
        headCells: {
            style: {
                color: "white",
                background: "rgb(30 41 59)",
                font: "bold"
            },
        },
    };
    const data = []
    for (let i = 0; i < productList.length; i++) {
        const product = {
            no: i + 1,
            id:  productList[i].id,
            name: productList[i].name,
            price: numberFormat(productList[i].price),
            color: productList[i].color,
            category: productList[i].category,
        }
        data.push(product);
    }


    return (
        <>
            <div className="flex space-x-2 justify-between mb-4">
                <Link to="/admin/products/add-product"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition
                                duration-150 ease-in-out">Add Product
                </Link>
                <div className="xl:w-96">
                    <div className="input-group relative flex flex-wrap items-stretch w-full">
                        <input
                            onChange={searchProduct}
                            type="search"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="button"
                            id="button-addon2"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="search"
                                className="w-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                progressPending={pending}
                progressComponent={<Loading/>}
                pagination
            />
            {/*------------------------------product-----------------------------*/}
            <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModalLg" tabIndex="-1" aria-labelledby="exampleModalLgLabel" aria-modal="true"
                role="dialog">
                <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h2 className="font-bold text-3xl text-gray-900 uppercase">
                                Product Detail infomation
                            </h2>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body relative">
                            {/*-----------------------------------------------*/}
                            <div className="min-w-screen flex items-center justify-center">
                                <div
                                    className="text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
                                    <div className="md:flex w-full">
                                        <form className="w-full md:w-full py-8 px-5 md:px-10"
                                              onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                <div className="grid grid-cols-3 gap-4 -mx-3 mb-5">
                                                    {itemDetail.images ? itemDetail.images.map((image, index) => (
                                                        <img
                                                            src={image}
                                                            className="p-1 h-60 w-full bg-white border rounded"
                                                            alt="..."
                                                        />
                                                    )) : null}
                                                </div>
                                                <div className="flex -mx-3">
                                                    <div className="w-2/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Product's Name
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-product-hunt"
                                                                   aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={itemDetail.name}
                                                                   id="name"
                                                                   name="name"/>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Color
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-paint-brush"
                                                                   aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={itemDetail.color}
                                                                   id="color"
                                                                   name="color"/>
                                                        </div>
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
                                                            <input disabled
                                                                   type="number" min="0"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={itemDetail.price}
                                                                   id="price"
                                                                   name='price'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Material
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-info-circle"
                                                                   aria-hidden="true"></i>
                                                            </div>
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   value={itemDetail.material}
                                                                   id="material"
                                                                   name='material'/>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3 px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Category
                                                        </label>
                                                        <div className="flex justify-end">
                                                            <input disabled
                                                                   type="text"
                                                                   className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                   placeholder="category"
                                                                   value={itemDetail.category}
                                                                   id="category"
                                                                   name='category'/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex -mx-3">
                                                    {itemDetail.items && itemDetail.items.map((size) => (
                                                        <div className="w-1/3 px-3 mb-5">
                                                            <label htmlFor=""
                                                                   className="text-xs font-semibold px-1">
                                                                Size {size.size}
                                                            </label>
                                                            <div className="flex">
                                                                <div
                                                                    className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                    <i className="fa fa-money"
                                                                       aria-hidden="true"></i>
                                                                </div>
                                                                <input

                                                                    type="number" min="0"
                                                                    className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                    id={`Size${size.size}`}
                                                                    name={`Size${size.size}`}
                                                                    {...register(`Size${size.size}`, {required: true})}
                                                                />
                                                            </div>
                                                            {errors.SizeS && errors.SizeS.type === "required" &&
                                                                <p className="text-red-500 text-xs mt-3 italic">Value
                                                                    required</p>}
                                                            {errors.SizeM && errors.SizeM.type === "required" &&
                                                                <p className="text-red-500 text-xs mt-3 italic">Value
                                                                    required</p>}
                                                            {errors.SizeL && errors.SizeL.type === "required" &&
                                                                <p className="text-red-500 text-xs mt-3 italic">Value
                                                                    required</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex -mx-3">
                                                    <div className="w-full px-3 mb-5">
                                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                                            Product's Decription
                                                        </label>
                                                        <div className="flex">
                                                            <div
                                                                className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                <i className="fa fa-file-text-o"
                                                                   aria-hidden="true"></i>
                                                            </div>
                                                            <textarea id="description" name="description" disabled
                                                                      className={`w-full h-20 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                            outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600`}
                                                                      value={itemDetail.description}
                                                                      placeholder="Product's Decription"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                <button type="button" className="inline-block px-6 py-2 border-2 border-neutral-800 text-neutral-800 font-medium text-xs
                                                    leading-tight uppercase rounded hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-0 transition
                                                duration-150 ease-in-out mr-4"
                                                        data-bs-dismiss="modal">cancel
                                                </button>
                                                <button type="submit"
                                                        className=" px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 font-medium
                                                text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg
                                                hover:text-white  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                                                 active:shadow-lg transition duration-150 ease-in-out ml-1
                                                 disabled:opacity-70"
                                                        data-bs-dismiss="modal"
                                                >Save changes
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*----------------------------------------------------------*/}
                        </div>
                    </div>
                </div>
            </div>
            {/*------------------------------product-----------------------------*/}

            <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="modalDeleteUser" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-modal="true"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800"
                                id="exampleModalScrollableLabel">
                                DELETE
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body relative p-4">
                            <p>Are you sure you want to delete this item ?</p>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" className="inline-block px-6 py-2 border-2 border-neutral-800 text-neutral-800 font-medium text-xs
  leading-tight uppercase rounded hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-0 transition
  duration-150 ease-in-out mr-4" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs
  leading-tight uppercase rounded hover:bg-red-700 hover:text-white focus:outline-none focus:ring-0 transition
  duration-150 ease-in-out" data-bs-dismiss="modal" onClick={() => onHandDel(idDelete)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductsTable;